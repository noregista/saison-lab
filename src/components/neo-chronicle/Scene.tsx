'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useEffect, useRef } from 'react';
import { CyberCrest } from './CyberCrest';
import { PostEffects } from './PostEffects';
import { UIOverlay } from './UIOverlay';
import { useNeoStore } from '@/lib/store';
import * as THREE from 'three';

export default function Scene() {
    const { theme, setTheme, setTimeString } = useNeoStore();

    useEffect(() => {
        // Basic time loop for store (simpler than hook for now)
        const interval = setInterval(() => {
            const now = new Date();
            // Format: HH:MM:SS
            const timeStr = now.toLocaleTimeString('ja-JP', { hour12: false });
            setTimeString(timeStr);

            // Auto theme update based on hour (6-18 is day)
            // Note: User can manually override, but this sets initial or periodically checks? 
            // For now let's keep it simple: initial set, then manual toggle is allowed.
            // But requirement says "Real-time Personalization Engine".
            // Let's rely on manual toggle primarily or set initial only.
        }, 1000);
        return () => clearInterval(interval);
    }, [setTimeString]);

    // BG Image transition
    // const bgColor = theme === 'day' ? '#f0f0f0' : '#050505'; // Deprecated

    return (
        <>
            <div className="absolute inset-0 z-0">
                {/* Night BG (Always present usually, or manageable) */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                    style={{
                        backgroundImage: 'url(/neo-chronicle/bg-night.png)',
                        opacity: theme === 'night' ? 1 : 0
                    }}
                />
                {/* Day BG */}
                <div
                    className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
                    style={{
                        backgroundImage: 'url(/neo-chronicle/bg-day.png)',
                        opacity: theme === 'day' ? 1 : 0
                    }}
                />
                {/* Fallback color if images miss */}
                <div className="absolute inset-0 -z-10 bg-black" />

                <Canvas dpr={[1, 2]}>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />

                    <CyberCrest />
                    <PostEffects />

                    <OrbitControls enableZoom={false} enablePan={false} />
                </Canvas>
            </div>
            <UIOverlay />
        </>
    );
}
