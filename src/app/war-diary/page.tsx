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
                <div className="bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 text-center text-gray-500 text-xs">
                    Ad Display Area
                </div>
            </div>
            <Timeline lang={lang} />
        </main>
    );
}
