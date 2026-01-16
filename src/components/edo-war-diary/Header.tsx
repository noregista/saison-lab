'use client';

import Link from 'next/link';

interface HeaderProps {
    lang: 'jp' | 'en';
    setLang: (lang: 'jp' | 'en') => void;
}

const texts = {
    jp: {
        title: '江戸動乱之記録',
        subtitle: '瓦版・号外',
        back: '本陣へ戻る',
    },
    en: {
        title: 'EDO WAR DIARY',
        subtitle: 'Kawaraban Chronicles',
        back: 'Return to Main',
    },
};

// Mitsudomoe (三つ巴) SVG Icon
const MitsudomoeIcon = () => (
    <svg viewBox="0 0 100 100" className="w-12 h-12">
        <circle cx="50" cy="50" r="48" fill="none" stroke="#4a3728" strokeWidth="2" />
        <g fill="#4a3728">
            <path d="M50,10 A40,40 0 0,1 85,65 A20,20 0 0,1 50,50 A20,20 0 0,0 50,10" />
            <path d="M85,65 A40,40 0 0,1 15,65 A20,20 0 0,1 50,50 A20,20 0 0,0 85,65" transform="rotate(0,50,50)" />
            <path d="M15,65 A40,40 0 0,1 50,10 A20,20 0 0,1 50,50 A20,20 0 0,0 15,65" />
        </g>
    </svg>
);

export function Header({ lang, setLang }: HeaderProps) {
    const t = texts[lang];

    return (
        <header className="sticky top-0 z-50 border-b-4 border-double border-amber-900 px-4 py-4"
            style={{ backgroundColor: '#e8d5b0' }}>
            <div className="max-w-3xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <MitsudomoeIcon />
                    <div>
                        <h1 className="text-2xl font-bold text-amber-900" style={{ fontFamily: 'serif' }}>
                            {t.title}
                        </h1>
                        <p className="text-sm text-amber-700">{t.subtitle}</p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                        className="text-sm text-amber-800 hover:text-amber-600 border-2 border-amber-800 px-3 py-1 rounded"
                        style={{ fontFamily: 'serif' }}
                    >
                        {lang === 'jp' ? '英語' : '日本語'}
                    </button>
                    <Link
                        href="/"
                        className="text-sm text-amber-800 hover:text-amber-600"
                        style={{ fontFamily: 'serif' }}
                    >
                        {t.back}
                    </Link>
                </div>
            </div>
        </header>
    );
}
