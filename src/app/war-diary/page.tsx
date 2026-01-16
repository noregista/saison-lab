'use client';

import { useState } from 'react';
import { Timeline } from '@/components/war-diary/Timeline';
import { Header } from '@/components/war-diary/Header';

export default function WarDiaryPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');

    return (
        <main className="min-h-screen bg-black text-white">
            <Header lang={lang} setLang={setLang} />
            <Timeline lang={lang} />
        </main>
    );
}
