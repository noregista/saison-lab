'use client';

import Link from 'next/link';

interface HeaderProps {
    lang: 'jp' | 'en';
    setLang: (lang: 'jp' | 'en') => void;
}

const texts = {
    jp: {
        title: '戦時日記',
        subtitle: '有事初日のSNS記録',
        back: 'Saison Labへ',
    },
    en: {
        title: 'WAR DIARY',
        subtitle: 'Social Media Records from Day One',
        back: 'Back to Saison Lab',
    },
};

// Warning Pulse SVG Icon
const WarningIcon = () => (
    <svg viewBox="0 0 24 24" className="w-8 h-8 animate-pulse" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#ef4444" strokeWidth="2" />
        <path d="M12 8v4" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
        <circle cx="12" cy="16" r="1" fill="#ef4444" />
    </svg>
);

export function Header({ lang, setLang }: HeaderProps) {
    const t = texts[lang];

    return (
        <header className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-gray-800 px-4 py-3">
            <div className="max-w-xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <WarningIcon />
                    <div>
                        <h1 className="text-xl font-bold text-red-500">{t.title}</h1>
                        <p className="text-xs text-gray-500">{t.subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                        className="text-sm text-gray-400 hover:text-white border border-gray-700 px-2 py-1 rounded"
                    >
                        {lang === 'jp' ? 'EN' : 'JP'}
                    </button>
                    <Link
                        href="/"
                        className="text-sm text-gray-400 hover:text-white"
                    >
                        {t.back}
                    </Link>
                </div>
            </div>
        </header>
    );
}
