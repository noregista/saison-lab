'use client';

import Link from 'next/link';

export default function CuisineLabPage() {
    return (
        <main className="min-h-screen relative flex flex-col items-center justify-center text-white font-sans">
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center"
                style={{ backgroundImage: 'url("/cuisine-lab/bg-restaurant.png")' }}
            >
                <div className="absolute inset-0 bg-black/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 text-center p-8 bg-black/30 backdrop-blur-md rounded-xl border border-white/20">
                <h1 className="text-5xl font-bold mb-4 tracking-wider">CUISINE LAB</h1>
                <p className="text-xl opacity-90 mb-8">Exploring the World's Finest Flavors</p>
                <Link href="/" className="px-6 py-2 bg-white/10 hover:bg-white/20 transition-colors rounded-full text-sm uppercase tracking-widest border border-white/30">
                    Back to Lab
                </Link>
            </div>
        </main>
    );
}
