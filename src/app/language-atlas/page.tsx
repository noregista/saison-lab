'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { languages, countryNames } from './data';

// ============================================================
// カラーパレット定義
// Blueprint / Scientific（設計図・科学的）テーマ
// ============================================================
const colors = {
    primary: '#3B82F6',    // Blue
    secondary: '#1E40AF',  // Dark Blue
    accent: '#50C878',     // Saison Green
    bgDark: '#0A0E14',
    bgCard: '#111827',
    bgMap: '#0F172A',
    text: '#E5E7EB',
    grid: '#1E3A5F',
};

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        title: 'LANGUAGE ATLAS',
        subtitle: '言語図鑑',
        back: '← Saison Lab',
        search: '言語を検索...',
        speakers: '話者数',
        countries: '公用語国',
        family: '語族',
        funFact: '豆知識',
        selectLanguage: '言語を選択してください',
        languagesCount: '言語',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
        copyright: '© 2026 Saison Lab',
    },
    en: {
        title: 'LANGUAGE ATLAS',
        subtitle: 'World Languages',
        back: '← Saison Lab',
        search: 'Search languages...',
        speakers: 'Speakers',
        countries: 'Official in',
        family: 'Language Family',
        funFact: 'Fun Fact',
        selectLanguage: 'Select a language',
        languagesCount: 'languages',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
        copyright: '© 2026 Saison Lab',
    },
};

// ============================================================
// 簡略化SVG世界地図データ
// 主要地域のパス（軽量化のため簡略化）
// ============================================================
const worldRegions = [
    { id: 'NA', name: 'North America', d: 'M50,80 L150,60 L180,100 L160,150 L100,160 L40,130 Z', countries: ['US', 'CA', 'MX', 'CU', 'DO', 'HT'] },
    { id: 'SA', name: 'South America', d: 'M100,170 L140,170 L160,220 L140,300 L100,310 L80,250 Z', countries: ['BR', 'AR', 'CO', 'PE', 'VE', 'CL', 'EC'] },
    { id: 'EU', name: 'Europe', d: 'M230,70 L300,50 L320,80 L310,130 L260,140 L220,110 Z', countries: ['GB', 'FR', 'DE', 'ES', 'IT', 'PT', 'NL', 'BE', 'CH', 'AT', 'IE', 'LU', 'LI', 'SM', 'VA'] },
    { id: 'AF', name: 'Africa', d: 'M230,150 L310,140 L340,200 L310,300 L250,310 L210,260 L220,190 Z', countries: ['EG', 'ZA', 'MA', 'DZ', 'SD', 'LY', 'TZ', 'KE', 'UG', 'AO', 'MZ', 'SN', 'CI', 'ML', 'CM', 'MG', 'RW', 'CD', 'CV'] },
    { id: 'ME', name: 'Middle East', d: 'M320,100 L380,90 L400,140 L370,170 L310,150 Z', countries: ['SA', 'AE', 'IQ', 'SY', 'JO', 'TR', 'CY'] },
    { id: 'AS', name: 'Asia', d: 'M380,60 L520,50 L560,120 L520,180 L420,200 L360,160 L370,100 Z', countries: ['CN', 'JP', 'KR', 'KP', 'IN', 'RU', 'BY', 'KZ', 'KG', 'NP', 'SG', 'MY', 'PH', 'TW', 'FJ'] },
    { id: 'OC', name: 'Oceania', d: 'M480,220 L560,200 L580,260 L530,290 L470,270 Z', countries: ['AU', 'NZ'] },
];

export default function LanguageAtlasPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

    const t = texts[lang];

    // ============================================================
    // 言語フィルタリング
    // ============================================================
    const filteredLanguages = useMemo(() => {
        if (!searchQuery.trim()) return languages;
        const query = searchQuery.toLowerCase();
        return languages.filter(
            (l) =>
                l.name.jp.toLowerCase().includes(query) ||
                l.name.en.toLowerCase().includes(query) ||
                l.nativeName.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    // ============================================================
    // 選択言語のデータ取得
    // ============================================================
    const selectedLangData = useMemo(() => {
        return languages.find((l) => l.id === selectedLanguage);
    }, [selectedLanguage]);

    // ============================================================
    // 地域のハイライト判定
    // ============================================================
    const isRegionHighlighted = (regionCountries: string[]) => {
        if (!selectedLangData) return false;
        return regionCountries.some((c) => selectedLangData.countries.includes(c));
    };

    // ============================================================
    // レンダリング
    // ============================================================
    return (
        <main
            className="min-h-screen"
            style={{ backgroundColor: colors.bgDark, color: colors.text }}
        >
            {/* ヘッダー */}
            <header className="flex items-center justify-between p-4 max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                    {t.back}
                </Link>
                <button
                    onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                    className="px-3 py-1 text-sm border rounded-full hover:bg-white/10 transition-colors"
                    style={{ borderColor: colors.primary }}
                >
                    {lang === 'jp' ? 'EN' : 'JP'}
                </button>
            </header>

            {/* タイトル */}
            <div className="text-center py-6">
                <h1
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: colors.primary }}
                >
                    🌐 {t.title}
                </h1>
                <p className="text-lg opacity-60">{t.subtitle}</p>
                <p className="text-sm opacity-40 mt-1">
                    {languages.length} {t.languagesCount}
                </p>
            </div>

            {/* メインコンテンツ */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* 左: 言語リスト */}
                    <div
                        className="rounded-xl p-4 lg:col-span-1"
                        style={{ backgroundColor: colors.bgCard }}
                    >
                        {/* 検索バー */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder={t.search}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg text-sm"
                                style={{
                                    backgroundColor: colors.bgDark,
                                    border: `1px solid ${colors.primary}44`,
                                    color: colors.text,
                                }}
                            />
                        </div>

                        {/* 言語リスト */}
                        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                            {filteredLanguages.map((language) => (
                                <button
                                    key={language.id}
                                    onClick={() => setSelectedLanguage(language.id)}
                                    className="w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between"
                                    style={{
                                        backgroundColor:
                                            selectedLanguage === language.id
                                                ? language.color
                                                : `${language.color}22`,
                                        color:
                                            selectedLanguage === language.id
                                                ? '#fff'
                                                : colors.text,
                                    }}
                                >
                                    <div>
                                        <span className="font-bold">
                                            {lang === 'jp' ? language.name.jp : language.name.en}
                                        </span>
                                        <span className="text-xs ml-2 opacity-60">
                                            {language.nativeName}
                                        </span>
                                    </div>
                                    <span className="text-xs opacity-60">
                                        {lang === 'jp'
                                            ? language.speakersFormatted.jp
                                            : language.speakersFormatted.en}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* 右: 地図と詳細 */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* 世界地図 */}
                        <div
                            className="rounded-xl p-4 relative overflow-hidden"
                            style={{ backgroundColor: colors.bgMap }}
                        >
                            <svg
                                viewBox="0 0 600 320"
                                className="w-full h-auto"
                                style={{ filter: 'drop-shadow(0 0 10px rgba(59, 130, 246, 0.3))' }}
                            >
                                {/* グリッド線 */}
                                <defs>
                                    <pattern
                                        id="grid"
                                        width="40"
                                        height="40"
                                        patternUnits="userSpaceOnUse"
                                    >
                                        <path
                                            d="M 40 0 L 0 0 0 40"
                                            fill="none"
                                            stroke={colors.grid}
                                            strokeWidth="0.5"
                                        />
                                    </pattern>
                                </defs>
                                <rect width="600" height="320" fill="url(#grid)" />

                                {/* 地域パス */}
                                {worldRegions.map((region) => {
                                    const isHighlighted = isRegionHighlighted(region.countries);
                                    return (
                                        <path
                                            key={region.id}
                                            d={region.d}
                                            fill={
                                                isHighlighted
                                                    ? selectedLangData?.color || colors.primary
                                                    : `${colors.primary}33`
                                            }
                                            stroke={colors.primary}
                                            strokeWidth={isHighlighted ? 2 : 1}
                                            className="transition-all duration-300"
                                            style={{
                                                filter: isHighlighted
                                                    ? `drop-shadow(0 0 10px ${selectedLangData?.color || colors.primary})`
                                                    : 'none',
                                            }}
                                        />
                                    );
                                })}

                                {/* 地域ラベル */}
                                <text x="100" y="110" fill={colors.text} fontSize="10" opacity="0.5">NA</text>
                                <text x="115" y="240" fill={colors.text} fontSize="10" opacity="0.5">SA</text>
                                <text x="265" y="100" fill={colors.text} fontSize="10" opacity="0.5">EU</text>
                                <text x="265" y="220" fill={colors.text} fontSize="10" opacity="0.5">AF</text>
                                <text x="350" y="130" fill={colors.text} fontSize="10" opacity="0.5">ME</text>
                                <text x="450" y="120" fill={colors.text} fontSize="10" opacity="0.5">AS</text>
                                <text x="520" y="250" fill={colors.text} fontSize="10" opacity="0.5">OC</text>
                            </svg>

                            {/* 凡例 */}
                            {selectedLangData && (
                                <div
                                    className="absolute bottom-2 right-2 px-3 py-1 rounded text-sm"
                                    style={{ backgroundColor: selectedLangData.color }}
                                >
                                    {lang === 'jp' ? selectedLangData.name.jp : selectedLangData.name.en}
                                </div>
                            )}
                        </div>

                        {/* 詳細カード */}
                        <div
                            className="rounded-xl p-6"
                            style={{ backgroundColor: colors.bgCard }}
                        >
                            {selectedLangData ? (
                                <div className="space-y-4">
                                    {/* タイトル */}
                                    <div className="flex items-center gap-3">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{ backgroundColor: selectedLangData.color }}
                                        />
                                        <h2 className="text-2xl font-bold">
                                            {lang === 'jp'
                                                ? selectedLangData.name.jp
                                                : selectedLangData.name.en}
                                        </h2>
                                        <span className="text-lg opacity-60">
                                            {selectedLangData.nativeName}
                                        </span>
                                    </div>

                                    {/* 統計 */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div
                                            className="p-4 rounded-lg"
                                            style={{ backgroundColor: colors.bgDark }}
                                        >
                                            <p className="text-xs opacity-50 mb-1">{t.speakers}</p>
                                            <p
                                                className="text-xl font-bold"
                                                style={{ color: colors.accent }}
                                            >
                                                {lang === 'jp'
                                                    ? selectedLangData.speakersFormatted.jp
                                                    : selectedLangData.speakersFormatted.en}
                                            </p>
                                        </div>
                                        <div
                                            className="p-4 rounded-lg"
                                            style={{ backgroundColor: colors.bgDark }}
                                        >
                                            <p className="text-xs opacity-50 mb-1">{t.family}</p>
                                            <p className="text-lg font-bold">
                                                {lang === 'jp'
                                                    ? selectedLangData.family.jp
                                                    : selectedLangData.family.en}
                                            </p>
                                        </div>
                                    </div>

                                    {/* 公用語国 */}
                                    <div>
                                        <p className="text-sm opacity-50 mb-2">{t.countries}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedLangData.countries.map((code) => (
                                                <span
                                                    key={code}
                                                    className="px-2 py-1 rounded text-xs"
                                                    style={{
                                                        backgroundColor: `${selectedLangData.color}33`,
                                                        color: selectedLangData.color,
                                                    }}
                                                >
                                                    {lang === 'jp'
                                                        ? countryNames[code]?.jp || code
                                                        : countryNames[code]?.en || code}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* 豆知識 */}
                                    <div
                                        className="p-4 rounded-lg border-l-4"
                                        style={{
                                            backgroundColor: colors.bgDark,
                                            borderColor: colors.accent,
                                        }}
                                    >
                                        <p className="text-xs opacity-50 mb-1">💡 {t.funFact}</p>
                                        <p className="text-sm">
                                            {lang === 'jp'
                                                ? selectedLangData.funFact.jp
                                                : selectedLangData.funFact.en}
                                        </p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-12 opacity-50">
                                    <p className="text-4xl mb-4">🌍</p>
                                    <p>{t.selectLanguage}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* 広告エリア */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div
                    className="border-2 border-dashed rounded-lg px-4 py-8 text-center text-sm opacity-50"
                    style={{ borderColor: colors.primary }}
                >
                    📢 Ad Display Area / 広告表示欄 (728x90)
                </div>
            </div>

            {/* フッター */}
            <footer
                className="border-t py-6"
                style={{ borderColor: `${colors.primary}33` }}
            >
                <div className="max-w-6xl mx-auto px-4 text-center text-sm opacity-60">
                    <div className="flex justify-center gap-4 mb-2">
                        <Link href="#" className="hover:opacity-100 transition-opacity">
                            {t.privacy}
                        </Link>
                        <Link href="#" className="hover:opacity-100 transition-opacity">
                            {t.disclaimer}
                        </Link>
                    </div>
                    <p>{t.copyright}</p>
                </div>
            </footer>
        </main>
    );
}
