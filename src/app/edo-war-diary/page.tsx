'use client';

import { useState } from 'react';
import { Kawaraban } from '@/components/edo-war-diary/Kawaraban';
import { Header } from '@/components/edo-war-diary/Header';

export default function EdoWarDiaryPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');

    return (
        <main
            className="min-h-screen"
            style={{
                backgroundColor: '#f5e6c8',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E")`,
            }}
        >
            <Header lang={lang} setLang={setLang} />
            {/* Ad Placeholder */}
            <div className="max-w-3xl mx-auto px-6 py-2">
                <div className="bg-amber-100/50 border-2 border-amber-800/30 rounded-lg px-4 py-2 text-center text-amber-700/50 text-xs" style={{ fontFamily: 'serif' }}>
                    {lang === 'jp' ? '広告表示欄' : 'Ad Display Area'}
                </div>
            </div>
            <Kawaraban lang={lang} />
        </main>
    );
}
