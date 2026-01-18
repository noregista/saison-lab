/**
 * 流体シミュレーション（Fluid Solver）
 * 
 * Navier-Stokes方程式の簡易実装。
 * パーティクルが流体のように滑らかに流れる効果を実現。
 * 
 * 数学的背景:
 * ∂v/∂t + (v·∇)v = -∇p + ν∇²v
 * 
 * 実装意図:
 * - パフォーマンス最適化のため低解像度（64×64または128×128）で計算
 * - 描画時にバイリニア補間で滑らかに表示
 * - 拡散・移流・圧力解法の3ステップで更新
 */

import { clamp } from '../utils/math';

// ============================================================
// 流体ソルバー設定
// ============================================================
export interface FluidConfig {
    /** グリッドサイズ（正方形） */
    gridSize: number;
    /** 拡散係数（粘性） */
    diffusion: number;
    /** 粘性係数 */
    viscosity: number;
    /** 時間ステップ */
    dt: number;
    /** 反復回数（精度とパフォーマンスのトレードオフ） */
    iterations: number;
}

// ============================================================
// デフォルト設定
// 低解像度で計算し、パフォーマンスを確保
// ============================================================
export const DEFAULT_FLUID_CONFIG: FluidConfig = {
    gridSize: 64,       // 64×64グリッド（4096セル）
    diffusion: 0.0001,  // わずかな拡散
    viscosity: 0.0001,  // わずかな粘性
    dt: 0.1,            // 時間ステップ
    iterations: 4,      // ガウス・ザイデル法の反復回数
};

// ============================================================
// 流体ソルバークラス
// ============================================================
export class FluidSolver {
    private config: FluidConfig;
    private size: number;
    private totalCells: number;

    // 速度場（X方向）
    private vx: Float32Array;
    private vx0: Float32Array;

    // 速度場（Y方向）
    private vy: Float32Array;
    private vy0: Float32Array;

    // 密度場（可視化用）
    private density: Float32Array;
    private density0: Float32Array;

    constructor(config: Partial<FluidConfig> = {}) {
        this.config = { ...DEFAULT_FLUID_CONFIG, ...config };
        this.size = this.config.gridSize;
        this.totalCells = this.size * this.size;

        // 配列初期化
        this.vx = new Float32Array(this.totalCells);
        this.vx0 = new Float32Array(this.totalCells);
        this.vy = new Float32Array(this.totalCells);
        this.vy0 = new Float32Array(this.totalCells);
        this.density = new Float32Array(this.totalCells);
        this.density0 = new Float32Array(this.totalCells);
    }

    /**
     * 2Dインデックスを1D配列インデックスに変換
     */
    private idx(x: number, y: number): number {
        const ix = clamp(Math.floor(x), 0, this.size - 1);
        const iy = clamp(Math.floor(y), 0, this.size - 1);
        return ix + iy * this.size;
    }

    /**
     * 特定のセルに力を加える
     * マウス/タッチ位置を正規化座標（0-1）で渡す
     */
    public addForce(
        normX: number,
        normY: number,
        forceX: number,
        forceY: number,
        amount: number = 100
    ): void {
        const x = normX * this.size;
        const y = normY * this.size;
        const index = this.idx(x, y);

        this.vx0[index] += forceX;
        this.vy0[index] += forceY;
        this.density0[index] += amount;
    }

    /**
     * 密度を加える
     */
    public addDensity(normX: number, normY: number, amount: number): void {
        const x = normX * this.size;
        const y = normY * this.size;
        const index = this.idx(x, y);
        this.density0[index] += amount;
    }

    /**
     * シミュレーションを1ステップ進める
     *
     * ステップ順序の意図:
     * 1. 速度の拡散 - 粘性による速度のぼかし
     * 2. 速度の移流 - 速度場に沿って速度を運ぶ
     * 3. 圧力解法 - 非圧縮性を保つ（質量保存）
     * 4. 密度の処理 - 可視化用の密度場を更新
     */
    public step(): void {
        const dt = this.config.dt;
        const visc = this.config.viscosity;
        const diff = this.config.diffusion;
        const iter = this.config.iterations;

        // 速度の拡散
        this.diffuse(1, this.vx0, this.vx, visc, dt, iter);
        this.diffuse(2, this.vy0, this.vy, visc, dt, iter);

        // 圧力解法（投影）
        this.project(this.vx0, this.vy0, this.vx, this.vy, iter);

        // 速度の移流
        this.advect(1, this.vx, this.vx0, this.vx0, this.vy0, dt);
        this.advect(2, this.vy, this.vy0, this.vx0, this.vy0, dt);

        // 圧力解法（投影）
        this.project(this.vx, this.vy, this.vx0, this.vy0, iter);

        // 密度の拡散と移流
        this.diffuse(0, this.density0, this.density, diff, dt, iter);
        this.advect(0, this.density, this.density0, this.vx, this.vy, dt);
    }

    /**
     * 拡散（Diffusion）
     * 
     * ガウス・ザイデル法を使用して拡散方程式を解く
     * ∂ρ/∂t = ν∇²ρ
     * 
     * 意図: 値が周囲に広がる効果（熱伝導のような）
     */
    private diffuse(
        b: number,
        x: Float32Array,
        x0: Float32Array,
        diff: number,
        dt: number,
        iter: number
    ): void {
        const a = dt * diff * (this.size - 2) * (this.size - 2);
        this.linearSolve(b, x, x0, a, 1 + 6 * a, iter);
    }

    /**
     * 線形ソルバー（ガウス・ザイデル法）
     * 
     * 反復法で線形方程式を解く
     * 各セルの値を周囲6セルの平均に近づける
     */
    private linearSolve(
        b: number,
        x: Float32Array,
        x0: Float32Array,
        a: number,
        c: number,
        iter: number
    ): void {
        const cRecip = 1.0 / c;

        for (let k = 0; k < iter; k++) {
            for (let j = 1; j < this.size - 1; j++) {
                for (let i = 1; i < this.size - 1; i++) {
                    const idx = this.idx(i, j);
                    x[idx] =
                        (x0[idx] +
                            a *
                            (x[this.idx(i + 1, j)] +
                                x[this.idx(i - 1, j)] +
                                x[this.idx(i, j + 1)] +
                                x[this.idx(i, j - 1)])) *
                        cRecip;
                }
            }
            this.setBoundary(b, x);
        }
    }

    /**
     * 投影（Projection）
     * 
     * ヘルムホルツ・ホッジ分解を使用して速度場を非圧縮にする
     * 質量保存則: ∇·v = 0
     * 
     * 意図: 速度場から発散成分を除去し、渦を保持
     */
    private project(
        vx: Float32Array,
        vy: Float32Array,
        p: Float32Array,
        div: Float32Array,
        iter: number
    ): void {
        const h = 1.0 / this.size;

        // 発散を計算
        for (let j = 1; j < this.size - 1; j++) {
            for (let i = 1; i < this.size - 1; i++) {
                const idx = this.idx(i, j);
                div[idx] =
                    (-0.5 *
                        h *
                        (vx[this.idx(i + 1, j)] -
                            vx[this.idx(i - 1, j)] +
                            vy[this.idx(i, j + 1)] -
                            vy[this.idx(i, j - 1)]));
                p[idx] = 0;
            }
        }

        this.setBoundary(0, div);
        this.setBoundary(0, p);
        this.linearSolve(0, p, div, 1, 6, iter);

        // 速度から勾配を引く
        for (let j = 1; j < this.size - 1; j++) {
            for (let i = 1; i < this.size - 1; i++) {
                const idx = this.idx(i, j);
                vx[idx] -= 0.5 * (p[this.idx(i + 1, j)] - p[this.idx(i - 1, j)]) / h;
                vy[idx] -= 0.5 * (p[this.idx(i, j + 1)] - p[this.idx(i, j - 1)]) / h;
            }
        }

        this.setBoundary(1, vx);
        this.setBoundary(2, vy);
    }

    /**
     * 移流（Advection）
     * 
     * セミラグランジュ法を使用
     * 各セルから速度に沿って逆方向に辿り、その位置の値を使う
     * 
     * 意図: 速度場に沿って値を運ぶ（風で煙が流れるような効果）
     */
    private advect(
        b: number,
        d: Float32Array,
        d0: Float32Array,
        vx: Float32Array,
        vy: Float32Array,
        dt: number
    ): void {
        const dt0 = dt * (this.size - 2);

        for (let j = 1; j < this.size - 1; j++) {
            for (let i = 1; i < this.size - 1; i++) {
                const idx = this.idx(i, j);

                // 逆方向に辿る
                let x = i - dt0 * vx[idx];
                let y = j - dt0 * vy[idx];

                // 範囲制限
                x = clamp(x, 0.5, this.size - 1.5);
                y = clamp(y, 0.5, this.size - 1.5);

                // バイリニア補間
                const i0 = Math.floor(x);
                const i1 = i0 + 1;
                const j0 = Math.floor(y);
                const j1 = j0 + 1;

                const s1 = x - i0;
                const s0 = 1 - s1;
                const t1 = y - j0;
                const t0 = 1 - t1;

                d[idx] =
                    s0 * (t0 * d0[this.idx(i0, j0)] + t1 * d0[this.idx(i0, j1)]) +
                    s1 * (t0 * d0[this.idx(i1, j0)] + t1 * d0[this.idx(i1, j1)]);
            }
        }

        this.setBoundary(b, d);
    }

    /**
     * 境界条件を設定
     * 
     * 意図:
     * - b=0: 密度など（境界で値をコピー）
     * - b=1: X速度（左右境界で反転）
     * - b=2: Y速度（上下境界で反転）
     */
    private setBoundary(b: number, x: Float32Array): void {
        const N = this.size - 2;

        for (let i = 1; i <= N; i++) {
            x[this.idx(i, 0)] = b === 2 ? -x[this.idx(i, 1)] : x[this.idx(i, 1)];
            x[this.idx(i, N + 1)] = b === 2 ? -x[this.idx(i, N)] : x[this.idx(i, N)];
            x[this.idx(0, i)] = b === 1 ? -x[this.idx(1, i)] : x[this.idx(1, i)];
            x[this.idx(N + 1, i)] = b === 1 ? -x[this.idx(N, i)] : x[this.idx(N, i)];
        }

        // 角を設定
        x[this.idx(0, 0)] = 0.5 * (x[this.idx(1, 0)] + x[this.idx(0, 1)]);
        x[this.idx(0, N + 1)] = 0.5 * (x[this.idx(1, N + 1)] + x[this.idx(0, N)]);
        x[this.idx(N + 1, 0)] = 0.5 * (x[this.idx(N, 0)] + x[this.idx(N + 1, 1)]);
        x[this.idx(N + 1, N + 1)] = 0.5 * (x[this.idx(N, N + 1)] + x[this.idx(N + 1, N)]);
    }

    /**
     * 特定位置の速度を取得（バイリニア補間）
     */
    public getVelocity(normX: number, normY: number): { vx: number; vy: number } {
        const x = normX * this.size;
        const y = normY * this.size;

        const i0 = Math.floor(x);
        const j0 = Math.floor(y);
        const i1 = Math.min(i0 + 1, this.size - 1);
        const j1 = Math.min(j0 + 1, this.size - 1);

        const s = x - i0;
        const t = y - j0;

        const vxVal =
            (1 - s) * (1 - t) * this.vx[this.idx(i0, j0)] +
            s * (1 - t) * this.vx[this.idx(i1, j0)] +
            (1 - s) * t * this.vx[this.idx(i0, j1)] +
            s * t * this.vx[this.idx(i1, j1)];

        const vyVal =
            (1 - s) * (1 - t) * this.vy[this.idx(i0, j0)] +
            s * (1 - t) * this.vy[this.idx(i1, j0)] +
            (1 - s) * t * this.vy[this.idx(i0, j1)] +
            s * t * this.vy[this.idx(i1, j1)];

        return { vx: vxVal, vy: vyVal };
    }

    /**
     * 特定位置の密度を取得
     */
    public getDensity(normX: number, normY: number): number {
        const x = normX * this.size;
        const y = normY * this.size;
        return this.density[this.idx(x, y)];
    }

    /**
     * 密度場全体を取得（可視化用）
     */
    public getDensityField(): Float32Array {
        return this.density;
    }

    /**
     * グリッドサイズを取得
     */
    public getGridSize(): number {
        return this.size;
    }

    /**
     * シミュレーションをリセット
     */
    public reset(): void {
        this.vx.fill(0);
        this.vx0.fill(0);
        this.vy.fill(0);
        this.vy0.fill(0);
        this.density.fill(0);
        this.density0.fill(0);
    }

    /**
     * 密度を徐々に減衰させる
     */
    public decayDensity(factor: number = 0.99): void {
        for (let i = 0; i < this.totalCells; i++) {
            this.density[i] *= factor;
            this.density0[i] *= factor;
        }
    }
}
