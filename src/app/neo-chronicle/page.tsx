'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Dynamic import for Three.js component to avoid SSR issues
const Scene = dynamic(() => import('@/components/neo-chronicle/Scene'), {
    ssr: false,
    loading: () => <div className="w-full h-screen bg-black text-white flex items-center justify-center font-mono">INITIALIZING NEO-CHRONICLE...</div>,
});

export default function NeoChroniclePage() {
    return (
        <main className="w-full h-screen relative overflow-hidden bg-black">
            <Suspense fallback={null}>
                <Scene />
            </Suspense>
        </main>
    );
}
