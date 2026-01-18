'use client';

/**
 * アートキャンバスコンポーネント
 * 
 * パーティクルシステムと流体シミュレーションを統合し、
 * フルスクリーンのインタラクティブアート体験を提供。
 */

import { useRef, useEffect, useCallback, useState } from 'react';
import { ParticleSystem } from './ParticleSystem';
import { FluidSolver } from './FluidSolver';
import { AudioFeedback } from './AudioFeedback';
import { useInteraction, InteractionPoint } from '../hooks/useInteraction';
import { hslaToRgba } from '../utils/math';

// ============================================================
// Props定義
// ============================================================
interface ArtCanvasProps {
    backgroundImage?: string;
    audioEnabled: boolean;
    onAudioInit: () => void;
}

// ============================================================
// アートキャンバスコンポーネント
// ============================================================
export default function ArtCanvas({
    backgroundImage,
    audioEnabled,
    onAudioInit
}: ArtCanvasProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const bgCanvasRef = useRef<HTMLCanvasElement>(null);
    const particleSystemRef = useRef<ParticleSystem | null>(null);
    const fluidSolverRef = useRef<FluidSolver | null>(null);
    const audioRef = useRef<AudioFeedback | null>(null);
    const animationRef = useRef<number | null>(null);
    const bgImageRef = useRef<HTMLImageElement | null>(null);
    const [isReady, setIsReady] = useState(false);

    // ============================================================
    // 初期化
    // ============================================================
    useEffect(() => {
        // パーティクルシステム初期化
        particleSystemRef.current = new ParticleSystem({
            maxParticles: 1000,
            emissionRate: 8,
            gravity: 0.01,
            friction: 0.985,
            wind: { x: 0.005, y: 0 },
            hueShiftSpeed: 0.3,
        });

        // 流体ソルバー初期化
        fluidSolverRef.current = new FluidSolver({
            gridSize: 64,
            diffusion: 0.0001,
            viscosity: 0.00001,
            iterations: 4,
        });

        // オーディオフィードバック初期化
        audioRef.current = new AudioFeedback({
            baseFrequency: 220,
            frequencyRange: 440,
            volume: 0.15,
            attack: 0.01,
            release: 0.5,
        });

        setIsReady(true);

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            audioRef.current?.dispose();
        };
    }, []);

    // オーディオの有効/無効を反映
    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.setEnabled(audioEnabled);
        }
    }, [audioEnabled]);

    // ============================================================
    // 背景画像の読み込み
    // ============================================================
    useEffect(() => {
        if (backgroundImage) {
            const img = new Image();
            img.onload = () => {
                bgImageRef.current = img;
                drawBackground();
            };
            img.src = backgroundImage;
        }
    }, [backgroundImage]);

    // ============================================================
    // キャンバスサイズの調整
    // ============================================================
    useEffect(() => {
        const handleResize = () => {
            const canvas = canvasRef.current;
            const bgCanvas = bgCanvasRef.current;
            const container = containerRef.current;
            if (!canvas || !bgCanvas || !container) return;

            const width = window.innerWidth;
            const height = window.innerHeight;

            canvas.width = width;
            canvas.height = height;
            bgCanvas.width = width;
            bgCanvas.height = height;

            particleSystemRef.current?.resize(width, height);
            drawBackground();
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // ============================================================
    // 背景描画
    // ============================================================
    const drawBackground = useCallback(() => {
        const canvas = bgCanvasRef.current;
        const ctx = canvas?.getContext('2d');
        const img = bgImageRef.current;
        if (!canvas || !ctx) return;

        // 背景色
        ctx.fillStyle = '#0a0a1a';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (img) {
            // アスペクト比を維持してカバー
            const imgRatio = img.width / img.height;
            const canvasRatio = canvas.width / canvas.height;

            let drawWidth, drawHeight, drawX, drawY;

            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                drawX = 0;
                drawY = (canvas.height - drawHeight) / 2;
            } else {
                drawHeight = canvas.height;
                drawWidth = canvas.height * imgRatio;
                drawX = (canvas.width - drawWidth) / 2;
                drawY = 0;
            }

            // 少し暗くして描画
            ctx.globalAlpha = 0.6;
            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
            ctx.globalAlpha = 1;
        }
    }, []);

    // ============================================================
    // インタラクションハンドラー
    // ============================================================
    const handleInteractionStart = useCallback(async (point: InteractionPoint) => {
        // オーディオ初期化（最初のインタラクション時）
        if (audioRef.current && !audioRef.current.isEnabled()) {
            await audioRef.current.init();
            onAudioInit();
        }

        const ps = particleSystemRef.current;
        const fs = fluidSolverRef.current;

        if (ps) {
            // 花弁を散らす
            ps.emitPetals(point.x, point.y, 20);
            // 波紋を発生
            ps.emitRipple(point.x, point.y);
        }

        if (fs) {
            fs.addDensity(point.normX, point.normY, 200);
        }

        // オーディオトリガー
        if (audioRef.current && audioEnabled) {
            audioRef.current.trigger(point.normX, point.normY);
        }
    }, [audioEnabled, onAudioInit]);

    const handleInteractionMove = useCallback((point: InteractionPoint) => {
        const ps = particleSystemRef.current;
        const fs = fluidSolverRef.current;

        if (ps && point.isActive) {
            // 光の粒子を発生
            ps.emit(point.x, point.y, 5);
        } else if (ps) {
            // ホバー時は少なめに発生
            ps.emit(point.x, point.y, 1);
        }

        if (fs) {
            // 流体に力を加える
            const forceMultiplier = 0.5;
            fs.addForce(
                point.normX,
                point.normY,
                point.deltaX * forceMultiplier,
                point.deltaY * forceMultiplier,
                point.isActive ? 50 : 10
            );
        }
    }, []);

    // インタラクションフック
    useInteraction(containerRef as React.RefObject<HTMLElement>, {
        onStart: handleInteractionStart,
        onMove: handleInteractionMove,
    });

    // ============================================================
    // アニメーションループ
    // ============================================================
    useEffect(() => {
        if (!isReady) return;

        const animate = () => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext('2d');
            const ps = particleSystemRef.current;
            const fs = fluidSolverRef.current;

            if (!canvas || !ctx || !ps || !fs) {
                animationRef.current = requestAnimationFrame(animate);
                return;
            }

            // キャンバスをクリア
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // 流体シミュレーション更新
            fs.step();
            fs.decayDensity(0.995);

            // 流体場を可視化（淡い光のフィールド）
            const densityField = fs.getDensityField();
            const gridSize = fs.getGridSize();
            const cellWidth = canvas.width / gridSize;
            const cellHeight = canvas.height / gridSize;

            for (let j = 0; j < gridSize; j++) {
                for (let i = 0; i < gridSize; i++) {
                    const density = densityField[i + j * gridSize];
                    if (density > 0.1) {
                        const alpha = Math.min(density / 100, 0.3);
                        const hue = (ps.currentHue + i + j) % 360;

                        ctx.fillStyle = hslaToRgba(hue, 80, 60, alpha);
                        ctx.fillRect(
                            i * cellWidth,
                            j * cellHeight,
                            cellWidth + 1,
                            cellHeight + 1
                        );
                    }
                }
            }

            // 流体の速度をパーティクルに適用
            for (const particle of ps.particles) {
                const normX = particle.x / canvas.width;
                const normY = particle.y / canvas.height;
                const velocity = fs.getVelocity(normX, normY);
                particle.vx += velocity.vx * 0.5;
                particle.vy += velocity.vy * 0.5;
            }

            // パーティクルシステム更新
            ps.update();

            // パーティクル描画
            ps.draw(ctx);

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, [isReady]);

    // ============================================================
    // レンダリング
    // ============================================================
    return (
        <div
            ref={containerRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                cursor: 'crosshair',
                touchAction: 'none', // スクロール無効
            }}
        >
            {/* 背景キャンバス */}
            <canvas
                ref={bgCanvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 0,
                }}
            />

            {/* メインキャンバス（パーティクル描画用） */}
            <canvas
                ref={canvasRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                }}
            />
        </div>
    );
}
