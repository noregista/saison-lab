'use client';

import Link from 'next/link';

export default function SushiLabPage() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center text-white font-serif">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("/sushi-lab/bg-seigaiha.jpg")' }}
            >
                <div className="absolute inset-0 bg-blue-900/30 mix-blend-overlay" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center p-10 bg-black/60 backdrop-blur-md rounded-lg border border-gold/30 shadow-2xl">
                <div className="mb-4 text-gold text-4xl">🍣</div>
                <h1 className="text-5xl font-bold mb-2 tracking-widest text-[#d4af37]">SUSHI LAB</h1>
                <p className="text-lg text-gray-200 mb-8 font-light italic">The Art of Edo-Mae</p>
                <Link href="/" className="px-6 py-2 bg-[#d4af37] text-black hover:bg-[#b5952f] transition-colors rounded text-sm font-bold uppercase tracking-wide">
                    Discover
                </Link>
            </div>
        </main>
    );
}
