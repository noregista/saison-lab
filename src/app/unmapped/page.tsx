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
                        <div className="flex flex-col items-center justify-center h-full p-4 md:p-8">
                            <p className="text-sm text-[#6a6a75] mb-4 uppercase tracking-widest">{t.selectCountry}</p>
                            {/* Interactive World Map */}
                            <WorldMap
                                countries={countries}
                                onSelectCountry={selectCountry}
                                hoveredRegion={hoveredCountry}
                                onHoverRegion={setHoveredCountry}
                                lang={lang}
                            />
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

// Interactive World Map Component
function WorldMap({
    countries,
    onSelectCountry,
    hoveredRegion,
    onHoverRegion,
    lang
}: {
    countries: Country[];
    onSelectCountry: (c: Country) => void;
    hoveredRegion: string | null;
    onHoverRegion: (id: string | null) => void;
    lang: 'en' | 'jp';
}) {
    // Map regions to country groups
    const regionCountries = {
        europe: countries.filter(c => c.region === 'europe'),
        asia: countries.filter(c => c.region === 'asia'),
        africa: countries.filter(c => c.region === 'africa'),
        americas: countries.filter(c => c.region === 'americas'),
        oceania: countries.filter(c => c.region === 'oceania'),
    };

    const [tooltip, setTooltip] = useState<{ x: number; y: number; region: string; count: number } | null>(null);

    const handleRegionClick = (region: 'europe' | 'asia' | 'africa' | 'americas' | 'oceania') => {
        const regionList = regionCountries[region];
        if (regionList.length > 0) {
            // Select random country from region
            const randomCountry = regionList[Math.floor(Math.random() * regionList.length)];
            onSelectCountry(randomCountry);
        }
    };

    const handleMouseEnter = (e: React.MouseEvent, region: string, count: number) => {
        const rect = (e.target as SVGElement).getBoundingClientRect();
        setTooltip({ x: rect.x + rect.width / 2, y: rect.y - 10, region, count });
    };

    const handleMouseLeave = () => {
        setTooltip(null);
    };

    const regionNames = {
        europe: { en: 'Europe', jp: 'ヨーロッパ' },
        asia: { en: 'Asia', jp: 'アジア' },
        africa: { en: 'Africa', jp: 'アフリカ' },
        americas: { en: 'Americas', jp: 'アメリカ大陸' },
        oceania: { en: 'Oceania', jp: 'オセアニア' },
    };

    return (
        <div className="relative w-full max-w-4xl">
            {/* Tooltip */}
            {tooltip && (
                <div
                    className="fixed z-50 bg-[#252530] border border-[#8b5a5a55] rounded px-3 py-2 text-sm pointer-events-none transform -translate-x-1/2 -translate-y-full"
                    style={{ left: tooltip.x, top: tooltip.y }}
                >
                    <div className="font-bold text-[#8b5a5a]">{regionNames[tooltip.region as keyof typeof regionNames][lang]}</div>
                    <div className="text-[#6a6a75] text-xs">{tooltip.count} {lang === 'jp' ? '領土' : 'territories'}</div>
                </div>
            )}

            {/* SVG World Map - Simplified stylized version */}
            <svg viewBox="0 0 1000 500" className="w-full h-auto">
                {/* Background */}
                <rect width="1000" height="500" fill="#1a1a1f" />

                {/* Grid lines for atmosphere */}
                {Array.from({ length: 20 }).map((_, i) => (
                    <line key={`h${i}`} x1="0" y1={i * 25} x2="1000" y2={i * 25} stroke="#252530" strokeWidth="0.5" />
                ))}
                {Array.from({ length: 40 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * 25} y1="0" x2={i * 25} y2="500" stroke="#252530" strokeWidth="0.5" />
                ))}

                {/* Americas */}
                <g
                    className="cursor-pointer transition-all duration-300 hover:brightness-125"
                    onClick={() => handleRegionClick('americas')}
                    onMouseEnter={(e) => handleMouseEnter(e, 'americas', regionCountries.americas.length)}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* North America */}
                    <path
                        d="M50,80 L180,60 L220,100 L250,80 L280,120 L260,180 L220,200 L180,180 L150,220 L120,200 L100,160 L60,140 Z"
                        fill={hoveredRegion?.startsWith('americas') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                        className="transition-all duration-300"
                    />
                    {/* Central America */}
                    <path
                        d="M150,220 L170,240 L160,280 L140,300 L120,280 L130,250 Z"
                        fill={hoveredRegion?.startsWith('americas') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                    />
                    {/* South America */}
                    <path
                        d="M140,300 L180,320 L200,380 L180,450 L140,470 L100,420 L90,360 L110,320 Z"
                        fill={hoveredRegion?.startsWith('americas') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                    />
                    <text x="150" y="180" fill="#6a6a75" fontSize="12" textAnchor="middle" className="pointer-events-none">
                        {regionCountries.americas.length}
                    </text>
                </g>

                {/* Europe */}
                <g
                    className="cursor-pointer transition-all duration-300 hover:brightness-125"
                    onClick={() => handleRegionClick('europe')}
                    onMouseEnter={(e) => handleMouseEnter(e, 'europe', regionCountries.europe.length)}
                    onMouseLeave={handleMouseLeave}
                >
                    <path
                        d="M420,80 L480,60 L540,80 L560,120 L540,160 L500,180 L460,160 L420,140 L400,100 Z"
                        fill={hoveredRegion?.startsWith('europe') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                        className="transition-all duration-300"
                    />
                    {/* British Isles */}
                    <path
                        d="M400,80 L410,70 L420,90 L410,100 Z"
                        fill={hoveredRegion?.startsWith('europe') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                    />
                    {/* Scandinavia */}
                    <path
                        d="M460,30 L480,20 L500,40 L490,70 L470,60 Z"
                        fill={hoveredRegion?.startsWith('europe') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                    />
                    <text x="480" y="120" fill="#6a6a75" fontSize="12" textAnchor="middle" className="pointer-events-none">
                        {regionCountries.europe.length}
                    </text>
                </g>

                {/* Africa */}
                <g
                    className="cursor-pointer transition-all duration-300 hover:brightness-125"
                    onClick={() => handleRegionClick('africa')}
                    onMouseEnter={(e) => handleMouseEnter(e, 'africa', regionCountries.africa.length)}
                    onMouseLeave={handleMouseLeave}
                >
                    <path
                        d="M420,200 L500,180 L560,200 L580,280 L560,380 L500,420 L440,400 L420,320 L400,260 Z"
                        fill={hoveredRegion?.startsWith('africa') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                        className="transition-all duration-300"
                    />
                    {/* Madagascar */}
                    <path
                        d="M580,340 L600,330 L610,380 L590,400 Z"
                        fill={hoveredRegion?.startsWith('africa') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                    />
                    <text x="480" y="300" fill="#6a6a75" fontSize="12" textAnchor="middle" className="pointer-events-none">
                        {regionCountries.africa.length}
                    </text>
                </g>

                {/* Asia */}
                <g
                    className="cursor-pointer transition-all duration-300 hover:brightness-125"
                    onClick={() => handleRegionClick('asia')}
                    onMouseEnter={(e) => handleMouseEnter(e, 'asia', regionCountries.asia.length)}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Russia/Northern Asia */}
                    <path
                        d="M560,40 L900,30 L920,100 L880,140 L800,120 L700,140 L600,120 L560,80 Z"
                        fill={hoveredRegion?.startsWith('asia') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                        className="transition-all duration-300"
                    />
                    {/* Middle East & South Asia */}
                    <path
                        d="M560,160 L620,140 L680,160 L720,200 L700,260 L640,280 L580,260 L560,200 Z"
                        fill={hoveredRegion?.startsWith('asia') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                    />
                    {/* East Asia */}
                    <path
                        d="M720,140 L820,130 L860,180 L840,240 L780,260 L720,240 L700,200 Z"
                        fill={hoveredRegion?.startsWith('asia') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                    />
                    {/* Southeast Asia */}
                    <path
                        d="M720,260 L780,280 L800,340 L760,380 L700,360 L680,300 Z"
                        fill={hoveredRegion?.startsWith('asia') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                    />
                    {/* Japan */}
                    <path
                        d="M880,140 L900,130 L910,180 L890,200 L870,180 Z"
                        fill={hoveredRegion?.startsWith('asia') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                    />
                    <text x="750" y="180" fill="#6a6a75" fontSize="12" textAnchor="middle" className="pointer-events-none">
                        {regionCountries.asia.length}
                    </text>
                </g>

                {/* Oceania */}
                <g
                    className="cursor-pointer transition-all duration-300 hover:brightness-125"
                    onClick={() => handleRegionClick('oceania')}
                    onMouseEnter={(e) => handleMouseEnter(e, 'oceania', regionCountries.oceania.length)}
                    onMouseLeave={handleMouseLeave}
                >
                    {/* Australia */}
                    <path
                        d="M780,360 L880,340 L920,380 L900,440 L840,460 L780,440 L760,400 Z"
                        fill={hoveredRegion?.startsWith('oceania') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                        className="transition-all duration-300"
                    />
                    {/* New Zealand */}
                    <path
                        d="M940,420 L960,410 L970,450 L950,470 Z"
                        fill={hoveredRegion?.startsWith('oceania') ? '#4a4a5a' : '#3a3a45'}
                        stroke="#8b5a5a"
                        strokeWidth="1"
                    />
                    {/* Pacific Islands */}
                    <circle cx="950" cy="350" r="5" fill={hoveredRegion?.startsWith('oceania') ? '#4a4a5a' : '#3a3a45'} stroke="#8b5a5a" strokeWidth="1" />
                    <circle cx="920" cy="300" r="4" fill={hoveredRegion?.startsWith('oceania') ? '#4a4a5a' : '#3a3a45'} stroke="#8b5a5a" strokeWidth="1" />
                    <text x="850" y="400" fill="#6a6a75" fontSize="12" textAnchor="middle" className="pointer-events-none">
                        {regionCountries.oceania.length}
                    </text>
                </g>

                {/* Glitch overlay effect */}
                <rect width="1000" height="500" fill="url(#scanlines)" opacity="0.05" className="pointer-events-none" />
                <defs>
                    <pattern id="scanlines" width="4" height="4" patternUnits="userSpaceOnUse">
                        <line x1="0" y1="2" x2="4" y2="2" stroke="#8b5a5a" strokeWidth="1" />
                    </pattern>
                </defs>

                {/* Title text */}
                <text x="500" y="480" fill="#3a3a45" fontSize="10" textAnchor="middle" className="pointer-events-none uppercase tracking-widest">
                    {lang === 'jp' ? 'クリックして領土を選択' : 'Click a region to select territory'}
                </text>
            </svg>
        </div>
    );
}
