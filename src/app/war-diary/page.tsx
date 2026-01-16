'use client';

import { useState } from 'react';
import { Timeline } from '@/components/war-diary/Timeline';
import { Header } from '@/components/war-diary/Header';

export default function WarDiaryPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');

    return (
        <main className="min-h-screen bg-black text-white">
            <Header lang={lang} setLang={setLang} />
            {/* Ad Placeholder */}
            <div className="max-w-xl mx-auto px-4 py-2">
                <div className="bg-gray-800/50 border-2 border-dashed border-gray-600 rounded-lg px-4 py-3 text-center text-gray-400 text-xs">
                    📢 Ad Display Area / 広告表示欄
                </div>
            </div>
            <Timeline lang={lang} />
        </main>
    );
}
