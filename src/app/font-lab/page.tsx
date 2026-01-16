'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { toPng } from 'html-to-image';

// 100+ Google Fonts List
const FONTS = [
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Oswald', 'Raleway', 'Poppins', 'Merriweather',
    'Ubuntu', 'Playfair Display', 'Nunito', 'PT Sans', 'Rubik', 'Work Sans', 'Quicksand', 'Karla',
    'Mulish', 'Inter', 'Fira Sans', 'Barlow', 'Archivo', 'Source Sans Pro', 'Cabin', 'Heebo',
    'Libre Baskerville', 'PT Serif', 'Lora', 'Bitter', 'Crimson Text', 'EB Garamond', 'Cormorant Garamond',
    'Josefin Sans', 'Dancing Script', 'Pacifico', 'Caveat', 'Satisfy', 'Great Vibes', 'Sacramento',
    'Lobster', 'Abril Fatface', 'Permanent Marker', 'Righteous', 'Bangers', 'Bungee', 'Comfortaa',
    'Fredoka One', 'Anton', 'Russo One', 'Teko', 'Bebas Neue', 'Kanit', 'Titan One', 'Black Ops One',
    'Cinzel', 'Cinzel Decorative', 'Cormorant', 'Spectral', 'Alegreya', 'Alegreya Sans', 'Cardo',
    'Noto Sans', 'Noto Serif', 'IBM Plex Sans', 'IBM Plex Serif', 'IBM Plex Mono', 'JetBrains Mono',
    'Fira Code', 'Source Code Pro', 'Inconsolata', 'Space Mono', 'Cousine', 'Overpass Mono',
    'Archivo Black', 'Alfa Slab One', 'Staatliches', 'Secular One', 'Yanone Kaffeesatz', 'Fjalla One',
    'Pathway Gothic One', 'Saira Condensed', 'Barlow Condensed', 'Roboto Condensed', 'DM Sans',
    'DM Serif Display', 'DM Serif Text', 'Manrope', 'Space Grotesk', 'Sora', 'Outfit', 'Lexend',
    'Plus Jakarta Sans', 'Albert Sans', 'Figtree', 'Urbanist', 'Red Hat Display', 'Epilogue',
    'Be Vietnam Pro', 'Public Sans', 'Jost', 'Nunito Sans', 'Signika', 'Exo 2', 'Asap', 'Arimo',
    'Noto Sans JP', 'Noto Serif JP', 'M PLUS 1p', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Sawarabi Gothic',
    'Sawarabi Mincho', 'BIZ UDGothic', 'BIZ UDMincho', 'Zen Maru Gothic', 'Zen Kaku Gothic New'
];

const texts = {
    jp: {
        title: 'FONT LAB',
        subtitle: 'フォント・ラボ',
        description: '100種類以上のフォントを試せる素材工場',
        inputPlaceholder: 'Saison Lab',
        searchPlaceholder: 'フォントを検索...',
        downloadBtn: 'PNG保存',
        back: 'Saison Lab へ戻る',
    },
    en: {
        title: 'FONT LAB',
        subtitle: 'Font Laboratory',
        description: 'Material Factory with 100+ Fonts',
        inputPlaceholder: 'Saison Lab',
        searchPlaceholder: 'Search fonts...',
        downloadBtn: 'Save PNG',
        back: 'Back to Saison Lab',
    },
};

export default function FontLabPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [text, setText] = useState('Saison Lab');
    const [search, setSearch] = useState('');
    const [isDark, setIsDark] = useState(false);
    const t = texts[lang];

    const filteredFonts = FONTS.filter(font =>
        font.toLowerCase().includes(search.toLowerCase())
    );

    // Generate Google Fonts URL for all fonts
    const fontUrl = `https://fonts.googleapis.com/css2?family=${FONTS.map(f => f.replace(/ /g, '+')).join('&family=')}:wght@400;700&display=swap`;

    const handleDownload = useCallback(async (font: string, ref: HTMLDivElement | null) => {
        if (!ref) return;
        try {
            const dataUrl = await toPng(ref, {
                backgroundColor: 'transparent',
                pixelRatio: 2,
            });
            const link = document.createElement('a');
            link.download = `${font.replace(/ /g, '_')}_${text.replace(/ /g, '_')}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Download failed:', err);
        }
    }, [text]);

    return (
        <main className={`min-h-screen transition-colors ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* Google Fonts */}
            <link href={fontUrl} rel="stylesheet" />

            {/* Header */}
            <header className={`sticky top-0 z-50 backdrop-blur ${isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-gray-100/90 border-gray-300'} border-b px-4 py-4`}>
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${isDark ? 'bg-indigo-600' : 'bg-indigo-500'} text-white`}>
                                Aa
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">{t.title}</h1>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.subtitle}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Dark Mode Toggle */}
                            <button
                                onClick={() => setIsDark(!isDark)}
                                className={`px-3 py-1 rounded border text-sm ${isDark ? 'border-gray-600 hover:border-white' : 'border-gray-400 hover:border-black'}`}
                            >
                                {isDark ? '☀️' : '🌙'}
                            </button>
                            {/* Language Toggle */}
                            <button
                                onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                                className={`px-3 py-1 rounded border text-sm ${isDark ? 'border-gray-600 hover:border-white' : 'border-gray-400 hover:border-black'}`}
                            >
                                {lang === 'jp' ? 'EN' : 'JP'}
                            </button>
                            {/* Back Link */}
                            <Link
                                href="/"
                                className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
                            >
                                {t.back}
                            </Link>
                        </div>
                    </div>

                    {/* Ad Placeholder */}
                    <div className={`mb-4 border rounded-lg px-4 py-2 text-center text-xs ${isDark ? 'border-gray-700 text-gray-500' : 'border-gray-300 text-gray-400'}`}>
                        Ad Display Area
                    </div>

                    {/* Input Controls */}
                    <div className="flex flex-wrap gap-3">
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder={t.inputPlaceholder}
                            className={`flex-1 min-w-[200px] px-4 py-2 rounded-lg border text-lg ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                        />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder={t.searchPlaceholder}
                            className={`w-[200px] px-4 py-2 rounded-lg border ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-300'}`}
                        />
                    </div>
                </div>
            </header>

            {/* Font Grid */}
            <div className="max-w-6xl mx-auto p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredFonts.map((font) => (
                        <FontCard
                            key={font}
                            font={font}
                            text={text}
                            isDark={isDark}
                            downloadLabel={t.downloadBtn}
                            onDownload={handleDownload}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

// Font Card Component
function FontCard({
    font,
    text,
    isDark,
    downloadLabel,
    onDownload,
}: {
    font: string;
    text: string;
    isDark: boolean;
    downloadLabel: string;
    onDownload: (font: string, ref: HTMLDivElement | null) => void;
}) {
    const textRef = useRef<HTMLDivElement>(null);

    return (
        <div className={`rounded-xl p-4 flex flex-col gap-3 transition-all hover:scale-[1.02] ${isDark ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:shadow-lg'}`}>
            {/* Font Name */}
            <div className={`text-xs font-mono truncate ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                {font}
            </div>

            {/* Preview */}
            <div
                ref={textRef}
                className="text-2xl truncate py-2"
                style={{ fontFamily: `'${font}', sans-serif` }}
            >
                {text || 'Preview'}
            </div>

            {/* Download Button */}
            <button
                onClick={() => onDownload(font, textRef.current)}
                className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${isDark
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white'
                        : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                    }`}
            >
                {downloadLabel}
            </button>
        </div>
    );
}
