'use client';

// FRUIT LAB - メインページ
// 意図: Fresh & Scientificデザインで世界のフルーツを探索できるデジタル図鑑

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { fruits, translations, DATA_YEAR, LAST_UPDATED, getFruitsByExport, getFruitsByCategory, searchFruits } from './data/fruits';
import { Language, Fruit, FruitCategory } from './data/types';

// 意図: カテゴリフィルターの定義
const categories: { id: string; labelKey: keyof typeof translations.jp }[] = [
    { id: 'all', labelKey: 'filterAll' },
    { id: 'citrus', labelKey: 'filterCitrus' },
    { id: 'tropical', labelKey: 'filterTropical' },
    { id: 'berry', labelKey: 'filterBerry' },
    { id: 'pome', labelKey: 'filterPome' },
    { id: 'stone', labelKey: 'filterStone' },
    { id: 'other', labelKey: 'filterOther' },
];

export default function FruitLabPage() {
    // 意図: 状態管理
    const [lang, setLang] = useState<Language>('jp');
    const [query, setQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedFruit, setSelectedFruit] = useState<Fruit | null>(null);
    const [showRanking, setShowRanking] = useState(false);
    const [compareIds, setCompareIds] = useState<string[]>([]);
    const [showComparison, setShowComparison] = useState(false);

    const t = translations[lang];

    // 意図: フィルタリング結果の計算
    const filteredFruits = useMemo(() => {
        let result = fruits;
        if (selectedCategory !== 'all') {
            result = getFruitsByCategory(selectedCategory);
        }
        if (query.trim()) {
            result = result.filter(f =>
                f.name[lang].toLowerCase().includes(query.toLowerCase()) ||
                f.scientificName.toLowerCase().includes(query.toLowerCase())
            );
        }
        return result;
    }, [selectedCategory, query, lang]);

    // 意図: 輸出量ランキング（TOP10）
    const topExporters = useMemo(() => getFruitsByExport().slice(0, 10), []);

    // 意図: フルーツカードクリック
    const handleFruitClick = useCallback((fruit: Fruit) => {
        setSelectedFruit(fruit);
    }, []);

    // 意図: 詳細モーダルを閉じる
    const closeDetail = useCallback(() => {
        setSelectedFruit(null);
    }, []);

    // 意図: 比較リストへの追加/削除
    const toggleCompare = useCallback((e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        setCompareIds(prev => {
            if (prev.includes(id)) {
                return prev.filter(item => item !== id);
            }
            if (prev.length >= 3) return prev; // 最大3つまで
            return [...prev, id];
        });
    }, []);

    // 意図: 比較対象のフルーツデータを取得
    const compareFruits = useMemo(() => {
        return fruits.filter(f => compareIds.includes(f.id));
    }, [compareIds]);

    // 意図: 輸出量を万トン単位でフォーマット
    const formatTonnes = (tonnes: number): string => {
        return (tonnes / 10000).toFixed(1);
    };

    // 意図: 最大輸出量（チャートのスケール基準）
    const maxExport = topExporters[0]?.exportData.totalGlobalTonnes || 1;

    return (
        <main className="min-h-screen relative bg-gradient-to-br from-green-50 to-yellow-50">
            {/* 意図: 背景画像オーバーレイ */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-10 pointer-events-none"
                style={{ backgroundImage: 'url("/fruit-lab/bg-lab.png")' }}
            />

            {/* 意図: コンテンツラッパー */}
            <div className="relative z-10">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-green-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {/* 意図: ロゴアイコン */}
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-2xl shadow-lg shadow-green-200">
                                    🍎
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-green-800">{t.title}</h1>
                                    <p className="text-xs text-green-600">{t.subtitle}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* 意図: データ基準日バッジ */}
                                <div className="hidden sm:flex items-center gap-2 bg-green-100 rounded-full px-3 py-1 text-xs text-green-700">
                                    <span>📊 {DATA_YEAR}{t.exportYear}</span>
                                    <span className="opacity-50">|</span>
                                    <span>📅 {t.lastUpdated}: {LAST_UPDATED}</span>
                                </div>
                                {/* 意図: 言語切替 */}
                                <div className="flex bg-green-100 rounded-full p-1">
                                    <button
                                        onClick={() => setLang('jp')}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'jp' ? 'bg-green-600 text-white' : 'text-green-700 hover:text-green-900'}`}
                                    >
                                        JP
                                    </button>
                                    <button
                                        onClick={() => setLang('en')}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'en' ? 'bg-green-600 text-white' : 'text-green-700 hover:text-green-900'}`}
                                    >
                                        EN
                                    </button>
                                </div>
                                <Link
                                    href="/"
                                    className="text-sm text-green-600 hover:text-green-800 transition-colors"
                                >
                                    {t.back}
                                </Link>
                            </div>
                        </div>

                        {/* 意図: 検索バー */}
                        <div className="relative mb-4">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 text-lg">🔍</span>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder={t.searchPlaceholder}
                                className="w-full py-3 px-4 pl-12 bg-white border border-green-200 rounded-xl text-green-900 placeholder-green-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                aria-label={t.searchPlaceholder}
                            />
                        </div>

                        {/* 意図: カテゴリフィルター */}
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${selectedCategory === cat.id
                                        ? 'bg-green-600 text-white shadow-md'
                                        : 'bg-white border border-green-200 text-green-700 hover:border-green-400'
                                        }`}
                                >
                                    {t[cat.labelKey]}
                                </button>
                            ))}
                            {/* 意図: ランキング表示トグル */}
                            <button
                                onClick={() => setShowRanking(!showRanking)}
                                className={`ml-auto px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${showRanking
                                    ? 'bg-yellow-500 text-white shadow-md'
                                    : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                    }`}
                            >
                                📊 {t.exportRanking}
                            </button>
                        </div>
                    </div>
                </header>

                {/* 意図: 広告エリア1 */}
                <div className="max-w-7xl mx-auto px-4 my-6">
                    <div className="bg-white/80 border-2 border-dashed border-green-300 rounded-xl px-4 py-3 text-center text-green-500 text-sm">
                        📢 {t.adText} (728×90)
                    </div>
                </div>

                {/* 意図: メインコンテンツ */}
                <div className="max-w-7xl mx-auto px-4 pb-8">
                    {/* 意図: 輸出量ランキングチャート */}
                    {showRanking && (
                        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-green-100">
                            <h2 className="text-xl font-bold text-green-800 mb-6 flex items-center gap-2">
                                🌍 {t.exportRanking} TOP10
                                <span className="text-sm font-normal text-green-500">({DATA_YEAR})</span>
                            </h2>
                            <div className="space-y-3">
                                {topExporters.map((fruit, index) => (
                                    <div
                                        key={fruit.id}
                                        className="flex items-center gap-3 group cursor-pointer"
                                        onClick={() => handleFruitClick(fruit)}
                                    >
                                        <span className="w-6 text-center font-bold text-green-600">{index + 1}</span>
                                        <span className="text-2xl">{fruit.emoji}</span>
                                        <span className="w-24 text-sm font-medium text-green-800 truncate">
                                            {fruit.name[lang]}
                                        </span>
                                        <div className="flex-1 h-8 bg-green-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                                                style={{
                                                    width: `${(fruit.exportData.totalGlobalTonnes / maxExport) * 100}%`,
                                                    backgroundColor: fruit.color,
                                                }}
                                            />
                                        </div>
                                        <span className="w-24 text-right text-sm font-bold" style={{ color: fruit.color }}>
                                            {formatTonnes(fruit.exportData.totalGlobalTonnes)} {t.tonnes}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 意図: フルーツカードグリッド */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {filteredFruits.map((fruit) => (
                            <button
                                key={fruit.id}
                                onClick={() => handleFruitClick(fruit)}
                                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 border border-green-100 text-left"
                            >
                                {/* 意図: フルーツ画像 */}
                                <div
                                    className="aspect-square relative overflow-hidden"
                                    style={{ backgroundColor: `${fruit.color}15` }}
                                >
                                    <Image
                                        src={fruit.imageUrl}
                                        alt={fruit.name[lang]}
                                        fill
                                        className="object-cover group-hover:scale-110 transition-transform duration-300"
                                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, 20vw"
                                        loading="lazy"
                                    />
                                    <div className="absolute top-2 right-2 flex flex-col gap-2">
                                        <div className="text-2xl drop-shadow-md">
                                            {fruit.emoji}
                                        </div>
                                        {/* 意図: 比較選択ボタン */}
                                        <div
                                            onClick={(e) => toggleCompare(e, fruit.id)}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${compareIds.includes(fruit.id)
                                                ? 'bg-green-600 border-green-600 text-white'
                                                : 'bg-white/80 border-green-200 text-green-400 hover:border-green-600 hover:text-green-600'
                                                }`}
                                        >
                                            {compareIds.includes(fruit.id) ? '✓' : '+'}
                                        </div>
                                    </div>
                                </div>
                                {/* 意図: カード情報 */}
                                <div className="p-3">
                                    <h3 className="font-bold text-green-800 truncate">{fruit.name[lang]}</h3>
                                    <p className="text-xs text-green-500 italic truncate">{fruit.scientificName}</p>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-xs px-2 py-0.5 rounded-full text-white" style={{ backgroundColor: fruit.color }}>
                                            {formatTonnes(fruit.exportData.totalGlobalTonnes)}M t
                                        </span>
                                        <span className="text-[10px] text-green-400">
                                            {compareIds.includes(fruit.id) ? (lang === 'jp' ? '対象中' : 'Selected') : ''}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* 意図: 結果なし */}
                    {filteredFruits.length === 0 && (
                        <div className="text-center py-16 text-green-500">
                            <span className="text-6xl mb-4 block">🔍</span>
                            <p>{lang === 'jp' ? '該当するフルーツが見つかりません' : 'No fruits found'}</p>
                        </div>
                    )}

                    {/* 意図: 広告エリア2 */}
                    <div className="mt-8 bg-white/80 border-2 border-dashed border-green-300 rounded-xl px-4 py-6 text-center text-green-500 text-sm">
                        📢 {t.adText} (300×250)
                    </div>
                </div>

                {/* 意図: フルーツ詳細モーダル */}
                {selectedFruit && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                        onClick={closeDetail}
                    >
                        <div
                            className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative animate-fadeIn"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* 意図: ヘッダー部分 */}
                            <div
                                className="relative h-48 rounded-t-2xl overflow-hidden"
                                style={{ backgroundColor: `${selectedFruit.color}30` }}
                            >
                                <Image
                                    src={selectedFruit.imageUrl}
                                    alt={selectedFruit.name[lang]}
                                    fill
                                    className="object-contain p-4"
                                />
                                <button
                                    onClick={closeDetail}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition-all shadow-lg"
                                    aria-label="Close"
                                >
                                    ✕
                                </button>
                                <div className="absolute bottom-4 left-4 text-5xl drop-shadow-lg">
                                    {selectedFruit.emoji}
                                </div>
                            </div>

                            {/* 意図: 詳細コンテンツ */}
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-green-800 mb-1">
                                    {selectedFruit.name[lang]}
                                </h2>
                                <p className="text-sm text-green-600 italic mb-4">
                                    {selectedFruit.scientificName}
                                </p>

                                {/* 意図: 基本情報 */}
                                <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="bg-green-50 rounded-xl p-4">
                                        <p className="text-xs text-green-600 mb-1">{t.family}</p>
                                        <p className="font-medium text-green-800">{selectedFruit.family[lang]}</p>
                                    </div>
                                    <div className="bg-green-50 rounded-xl p-4">
                                        <p className="text-xs text-green-600 mb-1">{t.origin}</p>
                                        <p className="font-medium text-green-800">
                                            {selectedFruit.origin.map(o => o[lang]).join(', ')}
                                        </p>
                                    </div>
                                </div>

                                {/* 意図: 説明 */}
                                <p className="text-green-700 mb-6">{selectedFruit.description[lang]}</p>

                                {/* 意図: 栄養成分 */}
                                <h3 className="text-lg font-bold text-green-800 mb-3">🍽️ {lang === 'jp' ? '栄養成分（100gあたり）' : 'Nutrition (per 100g)'}</h3>
                                <div className="grid grid-cols-4 gap-2 mb-6">
                                    <div className="bg-yellow-50 rounded-xl p-3 text-center">
                                        <p className="text-2xl font-bold text-yellow-600">{selectedFruit.nutrition.calories}</p>
                                        <p className="text-xs text-yellow-700">kcal</p>
                                    </div>
                                    <div className="bg-pink-50 rounded-xl p-3 text-center">
                                        <p className="text-2xl font-bold text-pink-600">{selectedFruit.nutrition.sugar}g</p>
                                        <p className="text-xs text-pink-700">{t.sugar}</p>
                                    </div>
                                    <div className="bg-amber-50 rounded-xl p-3 text-center">
                                        <p className="text-2xl font-bold text-amber-600">{selectedFruit.nutrition.fiber}g</p>
                                        <p className="text-xs text-amber-700">{t.fiber}</p>
                                    </div>
                                    <div className="bg-orange-50 rounded-xl p-3 text-center">
                                        <p className="text-2xl font-bold text-orange-600">{selectedFruit.nutrition.vitaminC}</p>
                                        <p className="text-xs text-orange-700">mg VitC</p>
                                    </div>
                                </div>

                                {/* 意図: 輸出データ */}
                                <h3 className="text-lg font-bold text-green-800 mb-3">
                                    🌍 {t.topExporters} ({selectedFruit.exportData.year})
                                </h3>
                                <div className="space-y-2 mb-4">
                                    {selectedFruit.exportData.topCountries.map((country, idx) => (
                                        <div key={country.code} className="flex items-center gap-3">
                                            <span className="w-6 text-center font-bold text-green-600">{idx + 1}</span>
                                            <span className="flex-1 text-green-800">{country.name[lang]}</span>
                                            <div className="w-32 h-4 bg-green-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full"
                                                    style={{
                                                        width: `${country.percentage}%`,
                                                        backgroundColor: selectedFruit.color,
                                                    }}
                                                />
                                            </div>
                                            <span className="w-16 text-right text-sm font-bold text-green-700">
                                                {country.percentage}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-sm text-green-600 text-center">
                                    {lang === 'jp' ? '世界総輸出量' : 'World Total'}: {formatTonnes(selectedFruit.exportData.totalGlobalTonnes)} {t.tonnes}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* 意図: 広告エリア3 */}
                <div className="max-w-7xl mx-auto px-4 pb-8">
                    <div className="bg-white/80 border-2 border-dashed border-green-300 rounded-xl px-4 py-3 text-center text-green-500 text-sm">
                        📢 {t.adText} (728×90)
                    </div>
                </div>

                {/* 意図: 比較スティッキーバー */}
                {compareIds.length > 0 && (
                    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[80] animate-fadeIn">
                        <div className="bg-white/90 backdrop-blur-md border border-green-200 rounded-2xl shadow-2xl p-3 flex items-center gap-4 min-w-[300px]">
                            <div className="flex -space-x-2 overflow-hidden">
                                {compareFruits.map(fruit => (
                                    <div
                                        key={fruit.id}
                                        className="w-10 h-10 rounded-full border-2 border-white bg-green-50 flex items-center justify-center text-xl shadow-sm relative group"
                                    >
                                        {fruit.emoji}
                                        <button
                                            onClick={(e) => toggleCompare(e, fruit.id)}
                                            className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] rounded-full hidden group-hover:flex items-center justify-center"
                                        >✕</button>
                                    </div>
                                ))}
                                {Array.from({ length: 3 - compareIds.length }).map((_, i) => (
                                    <div
                                        key={`empty-${i}`}
                                        className="w-10 h-10 rounded-full border-2 border-dashed border-green-200 bg-white/50 flex items-center justify-center text-green-300 text-xs"
                                    >
                                        +
                                    </div>
                                ))}
                            </div>
                            <div className="h-8 w-px bg-green-200" />
                            <button
                                onClick={() => setShowComparison(true)}
                                className={`px-6 py-2 rounded-xl font-bold transition-all ${compareIds.length >= 2
                                    ? 'bg-green-600 text-white hover:bg-green-700 shadow-md transform hover:scale-105'
                                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                    }`}
                                disabled={compareIds.length < 2}
                            >
                                {t.compare} ({compareIds.length})
                            </button>
                            <button
                                onClick={() => setCompareIds([])}
                                className="w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                )}

                {/* 意図: 比較モーダル */}
                {showComparison && (
                    <div
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[110] p-4"
                        onClick={() => setShowComparison(false)}
                    >
                        <div
                            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative animate-fadeIn flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-green-100 flex items-center justify-between bg-green-50/50">
                                <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
                                    🧪 {t.compare}
                                </h2>
                                <button
                                    onClick={() => setShowComparison(false)}
                                    className="w-10 h-10 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
                                >
                                    ✕
                                </button>
                            </div>

                            {/* Table Container */}
                            <div className="flex-1 overflow-x-auto p-6">
                                <table className="w-full min-w-[600px] border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="sticky left-0 z-20 bg-white p-4 text-left border-b-2 border-green-100 w-40"></th>
                                            {compareFruits.map(fruit => (
                                                <th key={fruit.id} className="p-4 border-b-2 border-green-100 transition-all">
                                                    <div className="flex flex-col items-center">
                                                        <span className="text-4xl mb-2">{fruit.emoji}</span>
                                                        <span className="font-bold text-green-800">{fruit.name[lang]}</span>
                                                    </div>
                                                </th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-green-50">
                                        {/* カロリー */}
                                        <tr className="hover:bg-green-50 transition-colors">
                                            <td className="sticky left-0 z-20 bg-white p-4 font-bold text-green-700 border-r border-green-50">⚡ {t.calories}</td>
                                            {compareFruits.map(fruit => (
                                                <td key={fruit.id} className="p-4 text-center text-green-900 font-medium">
                                                    {fruit.nutrition.calories} <span className="text-xs text-green-500">kcal</span>
                                                </td>
                                            ))}
                                        </tr>
                                        {/* 糖質 */}
                                        <tr className="hover:bg-green-50 transition-colors">
                                            <td className="sticky left-0 z-20 bg-white p-4 font-bold text-green-700 border-r border-green-50">🍬 {t.sugar}</td>
                                            {compareFruits.map(fruit => (
                                                <td key={fruit.id} className="p-4 text-center text-green-900 font-medium">
                                                    {fruit.nutrition.sugar} <span className="text-xs text-green-500">g</span>
                                                </td>
                                            ))}
                                        </tr>
                                        {/* 食物繊維 */}
                                        <tr className="hover:bg-green-50 transition-colors">
                                            <td className="sticky left-0 z-20 bg-white p-4 font-bold text-green-700 border-r border-green-50">🥗 {t.fiber}</td>
                                            {compareFruits.map(fruit => (
                                                <td key={fruit.id} className="p-4 text-center text-green-900 font-medium">
                                                    {fruit.nutrition.fiber} <span className="text-xs text-green-500">g</span>
                                                </td>
                                            ))}
                                        </tr>
                                        {/* ビタミンC */}
                                        <tr className="hover:bg-green-50 transition-colors">
                                            <td className="sticky left-0 z-20 bg-white p-4 font-bold text-green-700 border-r border-green-50">🍊 {t.vitaminC}</td>
                                            {compareFruits.map(fruit => (
                                                <td key={fruit.id} className="p-4 text-center text-green-900 font-medium">
                                                    {fruit.nutrition.vitaminC} <span className="text-xs text-green-500">mg</span>
                                                </td>
                                            ))}
                                        </tr>
                                        {/* 世界総輸出量 */}
                                        <tr className="hover:bg-green-50 transition-colors">
                                            <td className="sticky left-0 z-20 bg-white p-4 font-bold text-green-700 border-r border-green-50">🌍 {t.exportRanking}</td>
                                            {compareFruits.map(fruit => (
                                                <td key={fruit.id} className="p-4 text-center text-green-900 font-medium">
                                                    {formatTonnes(fruit.exportData.totalGlobalTonnes)} <span className="text-xs text-green-500">{t.tonnes}</span>
                                                </td>
                                            ))}
                                        </tr>
                                        {/* 原産地 */}
                                        <tr className="hover:bg-green-50 transition-colors">
                                            <td className="sticky left-0 z-20 bg-white p-4 font-bold text-green-700 border-r border-green-50">📍 {t.origin}</td>
                                            {compareFruits.map(fruit => (
                                                <td key={fruit.id} className="p-4 text-center text-green-700 text-sm">
                                                    {fruit.origin.map(o => o[lang]).join('\n')}
                                                </td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Footer */}
                            <div className="p-6 text-center text-xs text-green-500 bg-green-50/30">
                                {lang === 'jp' ? '※栄養素は可食部100gあたりの数値です。' : '* Nutrition facts are per 100g of edible portion.'}
                            </div>
                        </div>
                    </div>
                )}

                {/* Footer */}
                <footer className="bg-white/90 border-t border-green-200 py-6">
                    <div className="max-w-7xl mx-auto text-center text-green-600 text-sm">
                        <p>© 2026 Saison Lab. All rights reserved.</p>
                        <p className="mt-2 text-xs text-green-500">
                            {lang === 'jp'
                                ? '※輸出データはFAO統計（2023年）を参考にした推定値です'
                                : '* Export data is estimated based on FAO statistics (2023)'}
                        </p>
                        <div className="mt-3 flex justify-center gap-4">
                            <a href="#" className="text-green-500 hover:text-green-700 transition-colors">{t.privacy}</a>
                            <span className="text-green-300">|</span>
                            <a href="#" className="text-green-500 hover:text-green-700 transition-colors">{t.disclaimer}</a>
                        </div>
                    </div>
                </footer>

                {/* 意図: アニメーション用スタイル */}
                <style jsx global>{`
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    .animate-fadeIn {
                        animation: fadeIn 0.3s ease-out;
                    }
                `}</style>
            </div>
        </main>
    );
}
