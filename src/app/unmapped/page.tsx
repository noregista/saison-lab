'use client';

import { useState, useMemo, useEffect } from 'react';
import { Search, Globe, X, Menu } from 'lucide-react';
import { countries, Country } from './data/countries';

// basePath
const basePath = '/saison-lab';

type Lang = 'en' | 'jp';

const translations = {
    en: {
        title: 'Unmapped Memories',
        search: 'Search countries...',
        population: 'Population',
        area: 'Area',
        specialty: 'Specialty',
        exports: 'Exports',
        taboo: 'Taboo',
        lifespan: 'Average Lifespan',
        selectCountry: 'Select a territory to view its records',
        warning: '⚠ These records may be incomplete or corrupted',
        countries: 'Territories',
    },
    jp: {
        title: '地図にない記憶',
        search: '国を検索...',
        population: '人口',
        area: '面積',
        specialty: '名物',
        exports: '輸出品',
        taboo: '禁忌',
        lifespan: '平均生存期間',
        selectCountry: '領土を選択して記録を閲覧',
        warning: '⚠ これらの記録は不完全または破損している可能性があります',
        countries: '領土一覧',
    },
};

export default function UnmappedPage() {
    const [lang, setLang] = useState<Lang>('jp');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isGlitching, setIsGlitching] = useState(false);
    const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

    const t = translations[lang];

    // Filter countries by search (both languages)
    const filteredCountries = useMemo(() => {
        if (!searchQuery.trim()) return countries;
        const q = searchQuery.toLowerCase();
        return countries.filter(c =>
            c.name.en.toLowerCase().includes(q) ||
            c.name.jp.includes(q)
        );
    }, [searchQuery]);

    // Language switch with glitch effect
    const switchLang = () => {
        setIsGlitching(true);
        setTimeout(() => {
            setLang(lang === 'en' ? 'jp' : 'en');
            setTimeout(() => setIsGlitching(false), 200);
        }, 150);
    };

    // Close sidebar on country select (mobile)
    const selectCountry = (country: Country) => {
        setSelectedCountry(country);
        setIsSidebarOpen(false);
    };

    return (
        <div className={`min-h-screen bg-[#1a1a1f] text-[#c8c8d0] ${lang === 'jp' ? 'font-serif' : 'font-serif'} ${isGlitching ? 'animate-glitch' : ''}`}>
            {/* Glitch overlay */}
            {isGlitching && (
                <div className="fixed inset-0 z-50 pointer-events-none">
                    <div className="absolute inset-0 bg-[#1a1a1f] opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#8b5a5a33] to-transparent animate-scanline" />
                </div>
            )}

            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-40 bg-[#1a1a1f]/95 backdrop-blur border-b border-[#3a3a45]">
                <div className="flex items-center justify-between px-4 py-4 max-w-7xl mx-auto">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="lg:hidden p-2 hover:bg-[#252530] rounded transition-colors"
                        >
                            <Menu size={20} />
                        </button>
                        <h1 className={`text-xl md:text-2xl font-bold tracking-wide ${lang === 'jp' ? 'font-noto-serif' : 'font-playfair'}`}>
                            <span className="text-[#8b5a5a]">{t.title}</span>
                        </h1>
                    </div>

                    <button
                        onClick={switchLang}
                        className="flex items-center gap-2 px-4 py-2 bg-[#252530] hover:bg-[#3a3a45] border border-[#3a3a45] rounded transition-all hover:scale-105 group"
                    >
                        <Globe size={16} className="group-hover:animate-spin" />
                        <span className="text-sm">{lang === 'en' ? '日本語' : 'English'}</span>
                    </button>
                </div>
            </header>

            <div className="flex pt-16">
                {/* Sidebar */}
                <aside className={`fixed lg:static inset-y-0 left-0 z-30 w-72 bg-[#1a1a1f] border-r border-[#3a3a45] transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} pt-16 lg:pt-0`}>
                    <div className="p-4 border-b border-[#3a3a45]">
                        <h2 className="text-sm text-[#8b5a5a] mb-3 uppercase tracking-widest">{t.countries}</h2>
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6a6a75]" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={t.search}
                                className="w-full pl-10 pr-4 py-2 bg-[#252530] border border-[#3a3a45] rounded text-sm placeholder:text-[#6a6a75] focus:outline-none focus:border-[#8b5a5a] transition-colors"
                            />
                        </div>
                    </div>

                    <div className="overflow-y-auto h-[calc(100vh-180px)] scrollbar-thin scrollbar-thumb-[#3a3a45]">
                        {filteredCountries.map((country) => (
                            <button
                                key={country.id}
                                onClick={() => selectCountry(country)}
                                onMouseEnter={() => setHoveredCountry(country.id)}
                                onMouseLeave={() => setHoveredCountry(null)}
                                className={`w-full text-left px-4 py-3 border-b border-[#252530] transition-all hover:bg-[#252530] hover:pl-6 ${selectedCountry?.id === country.id ? 'bg-[#252530] border-l-2 border-l-[#8b5a5a]' : ''} ${hoveredCountry === country.id ? 'animate-shake' : ''}`}
                            >
                                <div className="text-sm font-medium">{lang === 'en' ? country.name.en : country.name.jp}</div>
                                <div className="text-xs text-[#6a6a75] mt-1">{country.region.toUpperCase()}</div>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Backdrop for mobile sidebar */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main content */}
                <main className="flex-1 min-h-[calc(100vh-64px)]">
                    {selectedCountry ? (
                        <div className="p-6 max-w-4xl mx-auto animate-fadeIn">
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedCountry(null)}
                                className="mb-4 p-2 hover:bg-[#252530] rounded transition-colors"
                            >
                                <X size={20} />
                            </button>

                            {/* Country name with glitch effect on hover */}
                            <h2 className="text-3xl md:text-4xl font-bold mb-2 hover:animate-textGlitch transition-all">
                                {lang === 'en' ? selectedCountry.name.en : selectedCountry.name.jp}
                            </h2>
                            <p className="text-sm text-[#6a6a75] mb-8 uppercase tracking-widest">
                                {selectedCountry.region}
                            </p>

                            {/* Warning */}
                            <div className="mb-8 p-4 bg-[#252530] border border-[#8b5a5a33] rounded text-sm text-[#8b5a5a]">
                                {t.warning}
                            </div>

                            {/* Details grid */}
                            <div className="grid gap-6 md:grid-cols-2">
                                <DetailCard label={t.population} value={selectedCountry.population} />
                                <DetailCard label={t.area} value={selectedCountry.area} />
                                <DetailCard label={t.specialty} value={lang === 'en' ? selectedCountry.specialty.en : selectedCountry.specialty.jp} />
                                <DetailCard label={t.exports} value={lang === 'en' ? selectedCountry.exports.en : selectedCountry.exports.jp} />
                                <DetailCard label={t.lifespan} value={lang === 'en' ? selectedCountry.lifespan.en : selectedCountry.lifespan.jp} isWarning />
                                <DetailCard label={t.taboo} value={lang === 'en' ? selectedCountry.taboo.en : selectedCountry.taboo.jp} isTaboo />
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                            <Globe size={80} className="text-[#3a3a45] mb-6" />
                            <p className="text-lg text-[#6a6a75] max-w-md">{t.selectCountry}</p>
                        </div>
                    )}
                </main>
            </div>

            {/* Creepy CSS styles */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;700&family=Playfair+Display:wght@400;700&display=swap');

        .font-noto-serif { font-family: 'Noto Serif JP', serif; }
        .font-playfair { font-family: 'Playfair Display', serif; }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-1px); }
          75% { transform: translateX(1px); }
        }
        .animate-shake { animation: shake 0.1s ease-in-out; }

        @keyframes glitch {
          0% { filter: none; }
          20% { filter: hue-rotate(90deg) saturate(200%); }
          40% { filter: invert(100%); }
          60% { filter: hue-rotate(180deg); }
          80% { filter: none; }
          100% { filter: none; }
        }
        .animate-glitch { animation: glitch 0.3s steps(5); }

        @keyframes textGlitch {
          0% { text-shadow: none; }
          25% { text-shadow: -2px 0 #8b5a5a, 2px 0 #5a5a8b; }
          50% { text-shadow: 2px 0 #8b5a5a, -2px 0 #5a5a8b; }
          75% { text-shadow: -1px 0 #8b8b5a; }
          100% { text-shadow: none; }
        }
        .hover\\:animate-textGlitch:hover { animation: textGlitch 0.2s steps(4); }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        .animate-scanline { animation: scanline 0.15s linear; }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.4s ease-out; }

        .scrollbar-thin::-webkit-scrollbar { width: 6px; }
        .scrollbar-thin::-webkit-scrollbar-track { background: #1a1a1f; }
        .scrollbar-thin::-webkit-scrollbar-thumb { background: #3a3a45; border-radius: 3px; }
      `}</style>
        </div>
    );
}

// Detail card component
function DetailCard({ label, value, isWarning, isTaboo }: { label: string; value: string; isWarning?: boolean; isTaboo?: boolean }) {
    return (
        <div className={`p-4 bg-[#252530] border rounded transition-all hover:border-[#4a4a5a] group ${isTaboo ? 'border-[#8b5a5a55]' : 'border-[#3a3a45]'}`}>
            <div className="text-xs text-[#6a6a75] uppercase tracking-widest mb-2">{label}</div>
            <div className={`text-lg group-hover:animate-shake ${isWarning ? 'text-[#8b8b5a]' : ''} ${isTaboo ? 'text-[#8b5a5a]' : ''}`}>
                {value}
            </div>
        </div>
    );
}
