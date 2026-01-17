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
                backgroundImage: 'url("/edo-war-diary/bg-paper.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
            }}
        >
            <Header lang={lang} setLang={setLang} />
            {/* Ad Placeholder */}
            <div className="max-w-3xl mx-auto px-6 py-2">
                <div className="bg-amber-200/50 border-2 border-dashed border-amber-700/50 rounded-lg px-4 py-3 text-center text-amber-700/70 text-xs" style={{ fontFamily: 'serif' }}>
                    📢 {lang === 'jp' ? '広告表示欄' : 'Ad Display Area'}
                </div>
            </div>
            <Kawaraban lang={lang} />
        </main>
    );
}
