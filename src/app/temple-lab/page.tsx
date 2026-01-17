'use client';

import Link from 'next/link';

export default function TempleLabPage() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center text-white font-serif">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("/temple-lab/bg-ink.jpg")' }}
            >
                <div className="absolute inset-0 bg-stone-900/40 mix-blend-multiply" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center p-12 bg-white/10 backdrop-blur-sm rounded-sm border-y-2 border-white/40">
                <h1 className="text-6xl font-thin mb-4 tracking-[0.2em]">TEMPLE LAB</h1>
                <p className="text-xl opacity-80 mb-8 tracking-widest font-light">Digital Zen Archives</p>
                <Link href="/" className="px-8 py-3 bg-transparent hover:bg-white/10 transition-colors text-sm uppercase tracking-widest border border-white/40">
                    Enter
                </Link>
            </div>
        </main>
    );
}
