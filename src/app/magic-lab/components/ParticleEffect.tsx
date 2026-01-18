'use client';

import { useEffect, useRef } from 'react';

/**
 * パーティクルエフェクトコンポーネント
 * 
 * 意図: 画面全体に浮遊する火の粉を描画して魔法の雰囲気を演出
 * 特徴:
 * - 軽量なパーティクルシステム
 * - ランダムな動きと明滅
 * - パフォーマンス最適化（少数パーティクル）
 */

interface Ember {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
    twinkleSpeed: number;
    twinklePhase: number;
}

export default function ParticleEffect() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // フルスクリーンサイズに設定
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // 火の粉パーティクルを初期化
        const embers: Ember[] = [];
        const EMBER_COUNT = 30; // パフォーマンスのため少なめ

        for (let i = 0; i < EMBER_COUNT; i++) {
            embers.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: -Math.random() * 0.8 - 0.2, // ゆっくり上昇
                size: Math.random() * 3 + 1,
                opacity: Math.random(),
                twinkleSpeed: Math.random() * 0.05 + 0.02,
                twinklePhase: Math.random() * Math.PI * 2,
            });
        }

        let animationId: number;
        let time = 0;

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            time += 1;

            embers.forEach(ember => {
                // 位置更新
                ember.x += ember.vx + Math.sin(time * 0.02 + ember.twinklePhase) * 0.3;
                ember.y += ember.vy;

                // 明滅効果
                ember.opacity = 0.3 + Math.sin(time * ember.twinkleSpeed + ember.twinklePhase) * 0.5 + 0.2;

                // 画面外に出たらリセット
                if (ember.y < -10) {
                    ember.y = canvas.height + 10;
                    ember.x = Math.random() * canvas.width;
                }
                if (ember.x < -10) ember.x = canvas.width + 10;
                if (ember.x > canvas.width + 10) ember.x = -10;

                // グロー効果付きで描画
                const gradient = ctx.createRadialGradient(
                    ember.x, ember.y, 0,
                    ember.x, ember.y, ember.size * 3
                );
                gradient.addColorStop(0, `rgba(255, 200, 80, ${ember.opacity})`);
                gradient.addColorStop(0.5, `rgba(255, 150, 50, ${ember.opacity * 0.5})`);
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(ember.x, ember.y, ember.size * 3, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // コアの明るい部分
                ctx.beginPath();
                ctx.arc(ember.x, ember.y, ember.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 240, 200, ${ember.opacity})`;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                inset: 0,
                pointerEvents: 'none',
                zIndex: 10,
            }}
            aria-hidden="true"
        />
    );
}
