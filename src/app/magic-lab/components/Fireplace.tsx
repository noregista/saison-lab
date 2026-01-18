'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * 暖炉コンポーネント
 * 
 * 意図: Canvas APIを使用してリアルな炎のアニメーションを描画
 * 特徴:
 * - パーティクルベースの炎シミュレーション
 * - クリック時に炎の色が変化
 * - GPU最適化のためrequestAnimationFrameを使用
 */

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
    color: string;
}

const FIRE_COLORS = {
    normal: ['#ff6b35', '#ff8c42', '#ffcc00', '#fff5e1'],
    blue: ['#4a90d9', '#63b3ed', '#90cdf4', '#ebf8ff'],
    green: ['#38a169', '#48bb78', '#68d391', '#c6f6d5'],
    purple: ['#805ad5', '#9f7aea', '#b794f4', '#e9d8fd'],
};

export default function Fireplace() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const [colorMode, setColorMode] = useState<keyof typeof FIRE_COLORS>('normal');

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Canvasサイズを設定
        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // パーティクル生成
        const createParticle = (): Particle => {
            const colors = FIRE_COLORS[colorMode];
            return {
                x: canvas.width / 2 + (Math.random() - 0.5) * 60,
                y: canvas.height - 20,
                vx: (Math.random() - 0.5) * 2,
                vy: -Math.random() * 3 - 2,
                life: 0,
                maxLife: Math.random() * 60 + 40,
                size: Math.random() * 15 + 10,
                color: colors[Math.floor(Math.random() * colors.length)],
            };
        };

        // アニメーションループ
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 新しいパーティクルを追加
            if (particlesRef.current.length < 50) {
                particlesRef.current.push(createParticle());
                particlesRef.current.push(createParticle());
            }

            // パーティクルを更新・描画
            particlesRef.current = particlesRef.current.filter(p => {
                p.x += p.vx;
                p.y += p.vy;
                p.vy -= 0.02; // 上昇加速
                p.life++;

                const lifeRatio = 1 - p.life / p.maxLife;
                const currentSize = p.size * lifeRatio;

                if (lifeRatio <= 0) return false;

                // 炎のグラデーション描画
                const gradient = ctx.createRadialGradient(
                    p.x, p.y, 0,
                    p.x, p.y, currentSize
                );
                gradient.addColorStop(0, p.color);
                gradient.addColorStop(0.5, p.color + '80');
                gradient.addColorStop(1, 'transparent');

                ctx.beginPath();
                ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                return true;
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener('resize', resizeCanvas);
        };
    }, [colorMode]);

    // クリックで色を変更
    const handleClick = () => {
        const modes = Object.keys(FIRE_COLORS) as (keyof typeof FIRE_COLORS)[];
        const currentIndex = modes.indexOf(colorMode);
        const nextIndex = (currentIndex + 1) % modes.length;
        setColorMode(modes[nextIndex]);
        particlesRef.current = []; // パーティクルをリセット
    };

    return (
        <div
            onClick={handleClick}
            style={{
                width: '100%',
                maxWidth: '250px',
                height: '180px',
                position: 'relative',
                cursor: 'pointer',
                borderRadius: '0.5rem',
                overflow: 'hidden',
            }}
            role="button"
            tabIndex={0}
            aria-label="Click to change fire color"
            onKeyDown={(e) => e.key === 'Enter' && handleClick()}
        >
            {/* 暖炉の枠 */}
            <div style={{
                position: 'absolute',
                inset: 0,
                border: '4px solid #3d2914',
                borderRadius: '0.5rem',
                background: 'linear-gradient(to top, #1a0f0a 0%, #2d1810 50%, transparent 100%)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.8)',
            }} />

            {/* 炎のCanvas */}
            <canvas
                ref={canvasRef}
                style={{
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    zIndex: 1,
                }}
            />

            {/* グロー効果 */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%)',
                width: '120px',
                height: '60px',
                background: `radial-gradient(ellipse, ${FIRE_COLORS[colorMode][0]}40 0%, transparent 70%)`,
                pointerEvents: 'none',
                animation: 'glow 2s ease-in-out infinite',
            }} />
        </div>
    );
}
