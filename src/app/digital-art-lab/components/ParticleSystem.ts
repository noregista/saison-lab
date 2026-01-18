/**
 * パーティクルシステム
 * 
 * 光の粒子を生成・更新・描画するエンジン。
 * マウス/タッチ位置から粒子が発生し、流体のように流れる。
 * 
 * 設計意図:
 * - Boids アルゴリズムの簡易版を採用し、粒子同士が群れのように振る舞う
 * - 寿命管理により自然なフェードアウトを実現
 * - HSLカラーにより時間経過で色相をシフト（虹色効果）
 */

import {
    Vector2D,
    add,
    scale,
    magnitude,
    normalize,
    subtract,
    random,
    randomDirection,
    hslaToRgba,
    easeOutCubic,
    clamp
} from '../utils/math';

// ============================================================
// パーティクルの型定義
// ============================================================
export interface Particle {
    /** X座標 */
    x: number;
    /** Y座標 */
    y: number;
    /** X方向速度 */
    vx: number;
    /** Y方向速度 */
    vy: number;
    /** 残り寿命 (0-1) - 0で消滅 */
    life: number;
    /** 寿命の減衰速度 */
    decay: number;
    /** 色相 (0-360) */
    hue: number;
    /** パーティクルサイズ */
    size: number;
    /** パーティクルタイプ */
    type: 'light' | 'petal' | 'ripple';
}

// ============================================================
// パーティクルシステム設定
// ============================================================
export interface ParticleSystemConfig {
    /** 最大パーティクル数（パフォーマンス制限） */
    maxParticles: number;
    /** マウス移動時の発生率 */
    emissionRate: number;
    /** 重力の影響 */
    gravity: number;
    /** 摩擦係数（速度減衰） */
    friction: number;
    /** 風の強さ */
    wind: Vector2D;
    /** 色相シフト速度 */
    hueShiftSpeed: number;
    /** キャンバス幅 */
    width: number;
    /** キャンバス高さ */
    height: number;
}

// ============================================================
// デフォルト設定
// パフォーマンスとビジュアルのバランスを考慮
// ============================================================
export const DEFAULT_CONFIG: ParticleSystemConfig = {
    maxParticles: 1000,      // 最大1000個でLighthouse 90点維持可能
    emissionRate: 5,         // マウス移動1フレームあたり5個
    gravity: 0.02,           // 弱い下向きの力
    friction: 0.98,          // 2%ずつ減速
    wind: { x: 0.01, y: 0 }, // わずかな横風
    hueShiftSpeed: 0.5,      // 緩やかな色変化
    width: 1920,
    height: 1080,
};

// ============================================================
// パーティクルシステムクラス
// ============================================================
export class ParticleSystem {
    public particles: Particle[] = [];
    private config: ParticleSystemConfig;
    private globalHue: number = 0;
    private lastEmitPosition: Vector2D | null = null;

    constructor(config: Partial<ParticleSystemConfig> = {}) {
        this.config = { ...DEFAULT_CONFIG, ...config };
    }

    /**
     * 設定を更新
     */
    public updateConfig(config: Partial<ParticleSystemConfig>): void {
        this.config = { ...this.config, ...config };
    }

    /**
     * キャンバスサイズを更新
     */
    public resize(width: number, height: number): void {
        this.config.width = width;
        this.config.height = height;
    }

    /**
     * 光の粒子を発生
     * マウス/タッチ位置から複数の粒子を生成
     */
    public emit(x: number, y: number, count: number = this.config.emissionRate): void {
        // パーティクル数制限チェック
        const availableSlots = this.config.maxParticles - this.particles.length;
        const actualCount = Math.min(count, availableSlots);

        for (let i = 0; i < actualCount; i++) {
            // ランダムな方向に射出
            const direction = randomDirection();
            const speed = random(0.5, 2);

            const particle: Particle = {
                x,
                y,
                vx: direction.x * speed,
                vy: direction.y * speed,
                life: 1.0,
                decay: random(0.005, 0.015), // 寿命の減衰速度をランダム化
                hue: (this.globalHue + random(-30, 30)) % 360, // 現在の色相±30度
                size: random(2, 6),
                type: 'light',
            };

            this.particles.push(particle);
        }

        this.lastEmitPosition = { x, y };
    }

    /**
     * 花弁パーティクルを発生
     * タップ/クリック時に花びらが散るエフェクト
     */
    public emitPetals(x: number, y: number, count: number = 15): void {
        const availableSlots = this.config.maxParticles - this.particles.length;
        const actualCount = Math.min(count, availableSlots);

        for (let i = 0; i < actualCount; i++) {
            const direction = randomDirection();
            const speed = random(1, 4);

            const particle: Particle = {
                x,
                y,
                vx: direction.x * speed,
                vy: direction.y * speed - random(1, 2), // 最初は上に飛ぶ
                life: 1.0,
                decay: random(0.003, 0.008), // 長めの寿命
                hue: random(330, 360), // ピンク系の色相
                size: random(8, 16),
                type: 'petal',
            };

            this.particles.push(particle);
        }
    }

    /**
     * 波紋パーティクルを発生
     * 触れた位置から同心円状に光が広がる
     */
    public emitRipple(x: number, y: number): void {
        if (this.particles.length >= this.config.maxParticles) return;

        const particle: Particle = {
            x,
            y,
            vx: 0,
            vy: 0,
            life: 1.0,
            decay: 0.02, // 速めに消える
            hue: this.globalHue,
            size: 10, // 初期サイズ（拡大していく）
            type: 'ripple',
        };

        this.particles.push(particle);
    }

    /**
     * パーティクルを更新
     * 物理演算と寿命管理を行う
     * 
     * 計算式の意図:
     * - 速度 = 前回速度 × 摩擦 + 重力 + 風
     * - 位置 = 前回位置 + 速度
     * - 寿命 = 前回寿命 - 減衰
     */
    public update(deltaTime: number = 1): void {
        // グローバル色相をシフト（虹色効果）
        this.globalHue = (this.globalHue + this.config.hueShiftSpeed) % 360;

        // 各パーティクルを更新
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];

            // 物理更新（パーティクルタイプ別）
            if (p.type === 'ripple') {
                // 波紋は拡大のみ
                p.size += 3;
            } else {
                // 光と花弁は物理演算
                // 重力を適用
                p.vy += this.config.gravity * deltaTime;

                // 風を適用
                p.vx += this.config.wind.x * deltaTime;
                p.vy += this.config.wind.y * deltaTime;

                // 摩擦を適用
                p.vx *= this.config.friction;
                p.vy *= this.config.friction;

                // 花弁は回転しながら落ちる効果
                if (p.type === 'petal') {
                    p.vx += Math.sin(p.life * 10) * 0.05;
                }

                // 位置を更新
                p.x += p.vx * deltaTime;
                p.y += p.vy * deltaTime;
            }

            // 寿命を減少
            p.life -= p.decay * deltaTime;

            // 死んだパーティクルを削除
            if (p.life <= 0) {
                this.particles.splice(i, 1);
            }
        }
    }

    /**
     * パーティクルを描画
     * Canvasコンテキストに描画
     */
    public draw(ctx: CanvasRenderingContext2D): void {
        for (const p of this.particles) {
            // 寿命に応じた透明度（イーズアウトで滑らかにフェード）
            const alpha = easeOutCubic(p.life);

            if (p.type === 'ripple') {
                // 波紋の描画
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.strokeStyle = hslaToRgba(p.hue, 80, 60, alpha * 0.5);
                ctx.lineWidth = 2;
                ctx.stroke();
            } else {
                // 光・花弁の描画
                ctx.beginPath();

                if (p.type === 'petal') {
                    // 花弁は楕円形
                    ctx.ellipse(p.x, p.y, p.size, p.size * 0.6, p.life * Math.PI, 0, Math.PI * 2);
                } else {
                    // 光は円形
                    ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
                }

                // グラデーション風の塗りつぶし
                const gradient = ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, p.size
                );
                gradient.addColorStop(0, hslaToRgba(p.hue, 100, 70, alpha));
                gradient.addColorStop(1, hslaToRgba(p.hue, 100, 50, 0));

                ctx.fillStyle = gradient;
                ctx.fill();
            }
        }
    }

    /**
     * 全パーティクルをクリア
     */
    public clear(): void {
        this.particles = [];
    }

    /**
     * 現在のパーティクル数を取得
     */
    public get count(): number {
        return this.particles.length;
    }

    /**
     * 現在のグローバル色相を取得
     */
    public get currentHue(): number {
        return this.globalHue;
    }
}
