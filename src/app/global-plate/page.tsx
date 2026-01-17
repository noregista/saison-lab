/**
 * GLOBAL PLATE - Saison Lab統合版メインページ
 * Intent: 主食の一覧表示、検索、フィルタリング機能を統合したメインUI
 * Note: framer-motion非依存、1ファイル完結型
 */

'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';

// 言語タイプ定義
type Language = 'jp' | 'en';

// 多言語対応テキスト
interface LocalizedText {
    jp: string;
    en: string;
}

// 主食カテゴリの列挙型
type StapleFoodCategory = 'cereal' | 'tuber' | 'legume' | 'starchy_plant';

// 栄養情報の構造
interface NutritionInfo {
    calories: number;
    carbs: number;
    protein: number;
    fiber: number;
}

// 地域分布情報
interface Region {
    countryCode: string;
    importance: 'primary' | 'secondary' | 'minor';
}

// 代表料理の構造
interface Dish {
    id: string;
    name: LocalizedText;
    country: string;
    description: LocalizedText;
}

// 主食データのメイン構造
interface StapleFood {
    id: string;
    name: LocalizedText;
    emoji: string;
    category: StapleFoodCategory;
    origin: string[];
    nutrition: NutritionInfo;
    history: LocalizedText;
    cookingMethods: LocalizedText[];
    featuredDishes: Dish[];
    regions: Region[];
}

// カテゴリ情報
interface CategoryInfo {
    id: StapleFoodCategory;
    name: LocalizedText;
    emoji: string;
    color: string;
}

// UI文字列
const uiStrings = {
    siteName: { jp: 'GLOBAL PLATE | グローバル・プレート', en: 'GLOBAL PLATE' },
    siteTagline: { jp: '世界の主食を、一枚の皿から', en: 'Explore the World\'s Staple Foods' },
    search: { jp: '主食を検索...', en: 'Search staple foods...' },
    categoryAll: { jp: 'すべて', en: 'All' },
    origin: { jp: '原産地', en: 'Origin' },
    history: { jp: '歴史', en: 'History' },
    nutrition: { jp: '栄養成分（100gあたり）', en: 'Nutrition (per 100g)' },
    calories: { jp: 'カロリー', en: 'Calories' },
    carbs: { jp: '炭水化物', en: 'Carbohydrates' },
    protein: { jp: 'タンパク質', en: 'Protein' },
    fiber: { jp: '食物繊維', en: 'Dietary Fiber' },
    cookingMethods: { jp: '調理法', en: 'Cooking Methods' },
    featuredDishes: { jp: '代表料理', en: 'Featured Dishes' },
    noResults: { jp: '該当する主食が見つかりませんでした', en: 'No staple foods found' },
    closeModal: { jp: '閉じる', en: 'Close' },
    backToHome: { jp: 'ホームに戻る', en: 'Back to Home' },
    mapHint: { jp: '💡 地域をクリックしてフィルタリング', en: '💡 Click a region to filter' },
};

// カテゴリ情報
const categories: CategoryInfo[] = [
    { id: 'cereal', name: { jp: '穀類', en: 'Cereals' }, emoji: '🌾', color: 'bg-amber-500' },
    { id: 'tuber', name: { jp: '芋類', en: 'Tubers' }, emoji: '🥔', color: 'bg-orange-500' },
    { id: 'legume', name: { jp: '豆類', en: 'Legumes' }, emoji: '🫘', color: 'bg-green-600' },
    { id: 'starchy_plant', name: { jp: '葉茎類', en: 'Starchy Plants' }, emoji: '🌿', color: 'bg-emerald-500' },
];

// 主食データベース（16種）
const stapleFoods: StapleFood[] = [
    // ... (step 233と同じデータ) ...
    {
        id: 'rice', name: { jp: '米', en: 'Rice' }, emoji: '🍚', category: 'cereal',
        origin: ['中国', '東南アジア'], nutrition: { calories: 356, carbs: 77.1, protein: 6.1, fiber: 0.5 },
        history: { jp: '米は約1万年前に中国で栽培が始まり、現在では世界人口の半数以上の主食となっています。', en: 'Rice cultivation began in China about 10,000 years ago.' },
        cookingMethods: [{ jp: '炊飯', en: 'Steaming' }, { jp: '炒め', en: 'Stir-frying' }],
        featuredDishes: [
            { id: 'sushi', name: { jp: '寿司', en: 'Sushi' }, country: 'JP', description: { jp: '酢飯に新鮮な魚介類を合わせた日本料理', en: 'Japanese dish combining vinegared rice with fresh seafood' } },
            { id: 'biryani', name: { jp: 'ビリヤニ', en: 'Biryani' }, country: 'IN', description: { jp: 'スパイスで香り付けされた米料理', en: 'Aromatic rice dish layered with spices' } },
            { id: 'paella', name: { jp: 'パエリア', en: 'Paella' }, country: 'ES', description: { jp: 'サフラン風味のスペイン米料理', en: 'Spanish saffron-flavored rice dish' } },
        ],
        regions: [{ countryCode: 'CN', importance: 'primary' }, { countryCode: 'JP', importance: 'primary' }, { countryCode: 'IN', importance: 'primary' }],
    },
    {
        id: 'wheat', name: { jp: '小麦', en: 'Wheat' }, emoji: '🌾', category: 'cereal',
        origin: ['メソポタミア'], nutrition: { calories: 340, carbs: 72.0, protein: 12.6, fiber: 12.2 },
        history: { jp: '小麦は約1万年前にメソポタミアで栽培が始まった最も古い作物の一つ。', en: 'Wheat is one of the oldest cultivated crops, first grown in Mesopotamia about 10,000 years ago.' },
        cookingMethods: [{ jp: '製パン', en: 'Baking' }, { jp: '製麺', en: 'Noodle making' }],
        featuredDishes: [
            { id: 'pasta', name: { jp: 'パスタ', en: 'Pasta' }, country: 'IT', description: { jp: 'イタリアの麺料理', en: 'Italian noodle dish' } },
            { id: 'naan', name: { jp: 'ナン', en: 'Naan' }, country: 'IN', description: { jp: 'インドのパン', en: 'Indian bread' } },
        ],
        regions: [{ countryCode: 'US', importance: 'primary' }, { countryCode: 'FR', importance: 'primary' }],
    },
    {
        id: 'corn', name: { jp: 'トウモロコシ', en: 'Corn' }, emoji: '🌽', category: 'cereal',
        origin: ['メキシコ'], nutrition: { calories: 365, carbs: 74.3, protein: 9.4, fiber: 7.3 },
        history: { jp: 'トウモロコシは約9,000年前にメキシコで栽培化され、マヤ・アステカ文明の基盤となりました。', en: 'Corn was domesticated in Mexico about 9,000 years ago.' },
        cookingMethods: [{ jp: 'トルティーヤ', en: 'Tortilla making' }, { jp: '茹で', en: 'Boiling' }],
        featuredDishes: [
            { id: 'tacos', name: { jp: 'タコス', en: 'Tacos' }, country: 'MX', description: { jp: 'メキシコ料理', en: 'Mexican dish' } },
        ],
        regions: [{ countryCode: 'MX', importance: 'primary' }, { countryCode: 'US', importance: 'primary' }],
    },
    {
        id: 'potato', name: { jp: 'ジャガイモ', en: 'Potato' }, emoji: '🥔', category: 'tuber',
        origin: ['ペルー', 'ボリビア'], nutrition: { calories: 77, carbs: 17.5, protein: 2.0, fiber: 2.2 },
        history: { jp: 'ジャガイモは約8,000年前にアンデス地方で栽培化されました。', en: 'Potatoes were domesticated in the Andes about 8,000 years ago.' },
        cookingMethods: [{ jp: '茹で', en: 'Boiling' }, { jp: '揚げ', en: 'Frying' }],
        featuredDishes: [
            { id: 'frites', name: { jp: 'フライドポテト', en: 'French Fries' }, country: 'BE', description: { jp: 'ベルギー発祥', en: 'Belgian origin' } },
        ],
        regions: [{ countryCode: 'DE', importance: 'primary' }, { countryCode: 'RU', importance: 'primary' }],
    },
    {
        id: 'sweet-potato', name: { jp: 'サツマイモ', en: 'Sweet Potato' }, emoji: '🍠', category: 'tuber',
        origin: ['中央・南アメリカ'], nutrition: { calories: 86, carbs: 20.1, protein: 1.6, fiber: 3.0 },
        history: { jp: 'サツマイモは約5,000年前に中南米で栽培化されました。', en: 'Sweet potatoes were domesticated in Central/South America about 5,000 years ago.' },
        cookingMethods: [{ jp: '焼き', en: 'Roasting' }, { jp: '蒸し', en: 'Steaming' }],
        featuredDishes: [
            { id: 'daigakuimo', name: { jp: '大学芋', en: 'Daigakuimo' }, country: 'JP', description: { jp: '甘い蜜がけ', en: 'Candied sweet potato' } },
        ],
        regions: [{ countryCode: 'CN', importance: 'primary' }, { countryCode: 'JP', importance: 'primary' }],
    },
    {
        id: 'cassava', name: { jp: 'キャッサバ', en: 'Cassava' }, emoji: '🥔', category: 'tuber',
        origin: ['ブラジル'], nutrition: { calories: 160, carbs: 38.1, protein: 1.4, fiber: 1.8 },
        history: { jp: 'キャッサバは南米原産で、熱帯地域の重要な食糧源です。', en: 'Cassava originated in South America and is a vital food source in tropical regions.' },
        cookingMethods: [{ jp: '茹で', en: 'Boiling' }, { jp: '粉砕', en: 'Grinding' }],
        featuredDishes: [
            { id: 'tapioca', name: { jp: 'タピオカ', en: 'Tapioca' }, country: 'BR', description: { jp: 'キャッサバ澱粉のデザート', en: 'Cassava starch dessert' } },
        ],
        regions: [{ countryCode: 'NG', importance: 'primary' }, { countryCode: 'BR', importance: 'primary' }],
    },
    {
        id: 'soybean', name: { jp: '大豆', en: 'Soybean' }, emoji: '🫘', category: 'legume',
        origin: ['中国'], nutrition: { calories: 446, carbs: 30.2, protein: 36.5, fiber: 9.3 },
        history: { jp: '大豆は約5,000年前に中国で栽培化され、東アジアの食文化の基盤となりました。', en: 'Soybeans were domesticated in China about 5,000 years ago.' },
        cookingMethods: [{ jp: '発酵', en: 'Fermentation' }, { jp: '加工', en: 'Processing' }],
        featuredDishes: [
            { id: 'tofu', name: { jp: '豆腐', en: 'Tofu' }, country: 'JP', description: { jp: '大豆から作る凝固食品', en: 'Curdled soybean product' } },
            { id: 'miso', name: { jp: '味噌', en: 'Miso' }, country: 'JP', description: { jp: '発酵大豆ペースト', en: 'Fermented soybean paste' } },
        ],
        regions: [{ countryCode: 'CN', importance: 'primary' }, { countryCode: 'JP', importance: 'primary' }],
    },
    {
        id: 'chickpea', name: { jp: 'ひよこ豆', en: 'Chickpea' }, emoji: '🫘', category: 'legume',
        origin: ['トルコ南東部'], nutrition: { calories: 364, carbs: 60.7, protein: 19.3, fiber: 17.4 },
        history: { jp: 'ひよこ豆は約7,500年前に栽培化されました。', en: 'Chickpeas were domesticated about 7,500 years ago.' },
        cookingMethods: [{ jp: '茹で', en: 'Boiling' }, { jp: 'ペースト', en: 'Pureeing' }],
        featuredDishes: [
            { id: 'hummus', name: { jp: 'フムス', en: 'Hummus' }, country: 'LB', description: { jp: 'ひよこ豆のディップ', en: 'Chickpea dip' } },
            { id: 'falafel', name: { jp: 'ファラフェル', en: 'Falafel' }, country: 'EG', description: { jp: 'ひよこ豆のコロッケ', en: 'Fried chickpea balls' } },
        ],
        regions: [{ countryCode: 'IN', importance: 'primary' }, { countryCode: 'TR', importance: 'primary' }],
    },
    {
        id: 'plantain', name: { jp: 'プランテン', en: 'Plantain' }, emoji: '🍌', category: 'starchy_plant',
        origin: ['東南アジア'], nutrition: { calories: 122, carbs: 31.9, protein: 1.3, fiber: 2.3 },
        history: { jp: 'プランテンは東南アジア原産で、アフリカ経由でカリブ海と中南米に広まりました。', en: 'Plantains originated in Southeast Asia and spread to the Caribbean via Africa.' },
        cookingMethods: [{ jp: '揚げ', en: 'Frying' }, { jp: '茹で', en: 'Boiling' }],
        featuredDishes: [
            { id: 'mofongo', name: { jp: 'モフォンゴ', en: 'Mofongo' }, country: 'PR', description: { jp: 'プエルトリコ料理', en: 'Puerto Rican dish' } },
        ],
        regions: [{ countryCode: 'NG', importance: 'primary' }, { countryCode: 'CO', importance: 'primary' }],
    },
];

// Map Data
const worldRegions = [
    { code: 'NA', name: { jp: '北アメリカ', en: 'North America' }, path: 'M50,80 L150,80 L180,120 L150,180 L80,180 L40,140 Z', cx: 100, cy: 130 },
    { code: 'SA', name: { jp: '南アメリカ', en: 'South America' }, path: 'M100,200 L140,200 L160,280 L120,350 L80,320 L70,250 Z', cx: 110, cy: 270 },
    { code: 'EU', name: { jp: 'ヨーロッパ', en: 'Europe' }, path: 'M280,60 L350,50 L380,90 L360,130 L300,140 L270,100 Z', cx: 320, cy: 95 },
    { code: 'AF', name: { jp: 'アフリカ', en: 'Africa' }, path: 'M280,150 L350,140 L380,200 L360,300 L300,320 L260,280 L250,200 Z', cx: 310, cy: 220 },
    { code: 'AS', name: { jp: 'アジア', en: 'Asia' }, path: 'M380,50 L550,40 L580,120 L550,180 L450,200 L380,150 L360,100 Z', cx: 470, cy: 110 },
    { code: 'OC', name: { jp: 'オセアニア', en: 'Oceania' }, path: 'M500,250 L580,240 L600,290 L560,330 L500,310 Z', cx: 550, cy: 280 },
];

const countryToRegion: Record<string, string> = {
    US: 'NA', CA: 'NA', MX: 'NA',
    BR: 'SA', AR: 'SA', PE: 'SA', CO: 'SA',
    GB: 'EU', FR: 'EU', DE: 'EU', IT: 'EU', ES: 'EU', PL: 'EU', RU: 'EU',
    NG: 'EU', GH: 'AF', ET: 'AF', ZA: 'AF', EG: 'AF',
    CN: 'AS', JP: 'AS', IN: 'AS', KR: 'AS', TH: 'AS', VN: 'AS', ID: 'AS', PH: 'AS', TR: 'AS', LB: 'AS',
    AU: 'OC', NZ: 'OC',
    PR: 'NA',
};

// ヘルパー関数
const getText = (text: LocalizedText, lang: Language): string => text[lang];
const getCategoryInfo = (id: StapleFoodCategory): CategoryInfo | undefined => categories.find(cat => cat.id === id);
const getFlagEmoji = (countryCode: string): string => {
    const codePoints = countryCode.toUpperCase().split('').map((char) => 0x1f1e6 - 65 + char.charCodeAt(0));
    return String.fromCodePoint(...codePoints);
};

// 検索・フィルタリング
const filterFoods = (foods: StapleFood[], category: StapleFoodCategory | null, query: string, lang: Language, selectedRegion: string | null): StapleFood[] => {
    let result = foods;
    if (category) result = result.filter(f => f.category === category);
    if (selectedRegion) {
        result = result.filter(f => f.regions.some(r => countryToRegion[r.countryCode] === selectedRegion));
    }
    if (query.trim()) {
        const q = query.toLowerCase();
        result = result.filter(f => f.name[lang].toLowerCase().includes(q) || f.name.jp.toLowerCase().includes(q) || f.name.en.toLowerCase().includes(q));
    }
    return result;
};

// World Map Component
const WorldMap = ({ lang, foods, onRegionClick }: { lang: Language, foods: StapleFood[], onRegionClick: (code: string) => void }) => {
    const getFoodCount = (regionCode: string) => {
        return foods.filter(food => food.regions.some(r => countryToRegion[r.countryCode] === regionCode)).length;
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto my-8">
            <svg viewBox="0 0 650 380" className="w-full h-auto drop-shadow-lg">
                <defs>
                    <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                        <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#D4A574" strokeWidth="0.5" opacity="0.1" />
                    </pattern>
                </defs>
                <rect width="650" height="380" fill="url(#grid)" rx="15" />

                {worldRegions.map((region) => {
                    const count = getFoodCount(region.code);
                    return (
                        <g key={region.code} onClick={() => onRegionClick(region.code)} className="cursor-pointer group hover:opacity-80 transition-opacity">
                            <path
                                d={region.path}
                                fill={count > 0 ? '#D4A574' : 'rgba(212, 165, 116, 0.2)'}
                                stroke="#8B7355"
                                strokeWidth="1.5"
                                className="transition-colors duration-300"
                            />
                            <text x={region.cx} y={region.cy} textAnchor="middle" fontSize="10" fill="#2D2926" className="pointer-events-none font-medium">
                                {region.name[lang]}
                            </text>
                            {count > 0 && (
                                <g>
                                    <circle cx={region.cx + 20} cy={region.cy - 10} r="10" fill="#6B9B37" />
                                    <text x={region.cx + 20} y={region.cy - 10} textAnchor="middle" dy="3" fill="white" fontSize="10" fontWeight="bold">{count}</text>
                                </g>
                            )}
                        </g>
                    );
                })}
            </svg>
            <p className="text-center text-xs text-[#8B7355] mt-2">{uiStrings.mapHint[lang]}</p>
        </div>
    );
};

export default function GlobalPlatePage() {
    const [lang, setLang] = useState<Language>('jp');
    const [selectedCategory, setSelectedCategory] = useState<StapleFoodCategory | null>(null);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFood, setSelectedFood] = useState<StapleFood | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);

    const filteredFoods = useMemo(() =>
        filterFoods(stapleFoods, selectedCategory, searchQuery, lang, selectedRegion),
        [selectedCategory, searchQuery, lang, selectedRegion]);

    // モーダル表示中はスクロールロック
    useEffect(() => {
        if (selectedFood) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'auto';
        return () => { document.body.style.overflow = 'auto'; };
    }, [selectedFood]);

    return (
        <div className="min-h-screen font-sans" style={{ background: 'linear-gradient(135deg, #FAF7F2 0%, #F5F0E8 50%, #FAF7F2 100%)', color: '#2D2926' }}>
            {/* Header */}
            <header className="sticky top-0 z-40 bg-[rgba(250,247,242,0.9)] backdrop-blur-md border-b border-[#D4A574]/20 px-4 md:px-8 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center flex-wrap gap-4">
                    <Link href="/" className="flex items-center gap-3 no-underline">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A574] to-amber-600 p-1 shadow-lg">
                            <div className="w-full h-full rounded-full bg-[#FAF7F2] flex items-center justify-center text-lg">🍽️</div>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-[#2D2926] tracking-wide">GLOBAL PLATE</h1>
                            <p className="text-xs text-[#8B7355]">{lang === 'jp' ? 'グローバル・プレート' : 'World Staple Foods'}</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={uiStrings.search[lang]}
                            className="px-4 py-2 rounded-full bg-white/50 border border-[#D4A574]/30 text-[#2D2926] placeholder:text-[#8B7355]/60 focus:outline-none focus:ring-2 focus:ring-[#D4A574]/50 text-sm w-full md:w-48"
                        />
                        <div className="flex bg-[#D4A574]/20 rounded-full p-1 gap-1">
                            <button onClick={() => setLang('jp')} className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${lang === 'jp' ? 'bg-[#D4A574] text-white' : 'text-[#8B7355]'}`}>JP</button>
                            <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${lang === 'en' ? 'bg-[#D4A574] text-white' : 'text-[#8B7355]'}`}>EN</button>
                        </div>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Hero */}
                <section className="text-center py-8 animate-fadeIn">
                    <h2 className="text-3xl md:text-4xl font-bold text-[#2D2926] mb-4">{uiStrings.siteTagline[lang]}</h2>
                    <p className="text-[#8B7355] max-w-2xl mx-auto mb-8">{lang === 'jp' ? '米、小麦、トウモロコシ、芋類など、世界各地の主食の歴史と文化を探索しましょう。' : 'Discover the history and culture of staple foods around the world.'}</p>

                    <WorldMap lang={lang} foods={filteredFoods} onRegionClick={(code) => setSelectedRegion(prev => prev === code ? null : code)} />

                    {selectedRegion && (
                        <div className="mt-4">
                            <span className="inline-flex items-center gap-2 px-4 py-1 bg-[#D4A574] text-white rounded-full text-sm">
                                {worldRegions.find(r => r.code === selectedRegion)?.name[lang]} ✕
                                <button onClick={() => setSelectedRegion(null)} className="hover:text-black">Cancel</button>
                            </span>
                        </div>
                    )}
                </section>

                {/* Category Filter */}
                <section className="py-6 flex flex-wrap justify-center gap-3 border-t border-[#D4A574]/20 pt-8">
                    <button onClick={() => setSelectedCategory(null)} className={`px-5 py-2.5 rounded-full font-medium transition-all ${selectedCategory === null ? 'bg-[#D4A574] text-white shadow-lg' : 'bg-white/50 text-[#2D2926] hover:bg-[#D4A574]/20'}`}>{uiStrings.categoryAll[lang]}</button>
                    {categories.map((cat) => (
                        <button key={cat.id} onClick={() => setSelectedCategory(cat.id)} className={`px-5 py-2.5 rounded-full font-medium transition-all flex items-center gap-2 ${selectedCategory === cat.id ? `${cat.color} text-white shadow-lg` : 'bg-white/50 text-[#2D2926] hover:bg-[#D4A574]/20'}`}>
                            <span>{cat.emoji}</span><span>{getText(cat.name, lang)}</span>
                        </button>
                    ))}
                </section>

                {/* Food Grid */}
                <section className="py-8 min-h-[400px]">
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                            {[...Array(8)].map((_, i) => (
                                <div key={i} className="animate-pulse w-48 h-64">
                                    <div className="w-full h-48 rounded-full bg-[#D4A574]/20"></div>
                                    <div className="mt-4 h-5 bg-[#D4A574]/20 rounded w-24 mx-auto"></div>
                                </div>
                            ))}
                        </div>
                    ) : filteredFoods.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🍽️</div>
                            <p className="text-xl text-[#2D2926]">{uiStrings.noResults[lang]}</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
                            {filteredFoods.map((food) => {
                                const catInfo = getCategoryInfo(food.category);
                                return (
                                    <article key={food.id} onClick={() => setSelectedFood(food)} className="cursor-pointer group">
                                        <div className="relative w-48 h-48 mx-auto transition-transform duration-300 group-hover:scale-105">
                                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 shadow-xl border-4 border-amber-200/50" />
                                            <div className="absolute inset-4 rounded-full bg-gradient-to-br from-[#FAF7F2] to-amber-50 shadow-inner" />
                                            <div className="absolute inset-6 rounded-full flex items-center justify-center">
                                                <span className="text-5xl drop-shadow-sm">{food.emoji}</span>
                                            </div>
                                            {catInfo && <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full ${catInfo.color} flex items-center justify-center shadow-lg text-sm text-white`}>{catInfo.emoji}</div>}
                                        </div>
                                        <div className="mt-6 text-center">
                                            <h3 className="text-lg font-bold text-[#2D2926] group-hover:text-[#D4A574] transition-colors">{getText(food.name, lang)}</h3>
                                            <p className="text-xs text-[#8B7355] uppercase tracking-wider">{lang === 'en' ? getText(food.name, 'jp') : getText(food.name, 'en')}</p>
                                        </div>
                                        {/* Featured Dish Preview (Mobile hidden, shows on hover in concept but simplified here) */}
                                    </article>
                                );
                            })}
                        </div>
                    )}
                </section>

                {/* Back to Home */}
                <section className="py-8 text-center border-t border-[#D4A574]/20">
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#D4A574] text-white rounded-full font-medium hover:shadow-lg transition-all hover:-translate-y-0.5 no-underline">
                        ← {uiStrings.backToHome[lang]}
                    </Link>
                </section>
            </main>

            {/* Detail Modal */}
            {selectedFood && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fadeIn" onClick={() => setSelectedFood(null)}>
                    <div className="bg-[#FAF7F2] rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                        <button onClick={() => setSelectedFood(null)} className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#D4A574]/10 flex items-center justify-center text-[#2D2926] hover:bg-[#D4A574]/30 text-xl transition-colors">✕</button>

                        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                            <div className="relative w-32 h-32 flex-shrink-0">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 shadow-lg border-2 border-amber-200/50" />
                                <div className="absolute inset-0 flex items-center justify-center text-6xl">{selectedFood.emoji}</div>
                            </div>
                            <div className="text-center md:text-left">
                                <span className={`inline-block px-3 py-1 rounded-full text-xs text-white font-medium mb-2 ${getCategoryInfo(selectedFood.category)?.color}`}>{getText(getCategoryInfo(selectedFood.category)?.name || { jp: '', en: '' }, lang)}</span>
                                <h2 className="text-3xl font-bold text-[#2D2926] mb-1">{getText(selectedFood.name, lang)}</h2>
                                <p className="text-lg text-[#8B7355]">{lang === 'en' ? getText(selectedFood.name, 'jp') : getText(selectedFood.name, 'en')}</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Origin & History */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <section className="bg-white/50 p-4 rounded-2xl">
                                    <h3 className="text-sm font-bold text-[#8B7355] uppercase tracking-widest mb-2 flex items-center gap-2">📍 {uiStrings.origin[lang]}</h3>
                                    <p className="text-[#2D2926] font-medium">{selectedFood.origin.join(lang === 'jp' ? '、' : ', ')}</p>
                                </section>
                                <section className="bg-white/50 p-4 rounded-2xl">
                                    <h3 className="text-sm font-bold text-[#8B7355] uppercase tracking-widest mb-2 flex items-center gap-2">👨‍🍳 {uiStrings.cookingMethods[lang]}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedFood.cookingMethods.map((method, i) => (
                                            <span key={i} className="px-3 py-1 bg-[#D4A574]/20 rounded-full text-sm text-[#2D2926]">{getText(method, lang)}</span>
                                        ))}
                                    </div>
                                </section>
                            </div>

                            {/* History Text */}
                            <section>
                                <h3 className="text-lg font-bold text-[#2D2926] mb-3 border-b border-[#D4A574]/20 pb-2">📜 {uiStrings.history[lang]}</h3>
                                <p className="text-[#594a3a] leading-relaxed">{getText(selectedFood.history, lang)}</p>
                            </section>

                            {/* Nutrition */}
                            <section>
                                <h3 className="text-lg font-bold text-[#2D2926] mb-3 border-b border-[#D4A574]/20 pb-2">🔥 {uiStrings.nutrition[lang]}</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                    <div className="bg-white/60 rounded-xl p-3 text-center border border-[#D4A574]/10">
                                        <p className="text-2xl font-bold text-[#2D2926]">{selectedFood.nutrition.calories}</p>
                                        <p className="text-xs text-[#8B7355] font-medium mt-1">{uiStrings.calories[lang]} (kcal)</p>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3 text-center border border-[#D4A574]/10">
                                        <p className="text-2xl font-bold text-[#2D2926]">{selectedFood.nutrition.carbs}g</p>
                                        <p className="text-xs text-[#8B7355] font-medium mt-1">{uiStrings.carbs[lang]}</p>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3 text-center border border-[#D4A574]/10">
                                        <p className="text-2xl font-bold text-[#2D2926]">{selectedFood.nutrition.protein}g</p>
                                        <p className="text-xs text-[#8B7355] font-medium mt-1">{uiStrings.protein[lang]}</p>
                                    </div>
                                    <div className="bg-white/60 rounded-xl p-3 text-center border border-[#D4A574]/10">
                                        <p className="text-2xl font-bold text-[#2D2926]">{selectedFood.nutrition.fiber}g</p>
                                        <p className="text-xs text-[#8B7355] font-medium mt-1">{uiStrings.fiber[lang]}</p>
                                    </div>
                                </div>
                            </section>

                            {/* Featured Dishes */}
                            <section>
                                <h3 className="text-lg font-bold text-[#2D2926] mb-3 border-b border-[#D4A574]/20 pb-2">🥘 {uiStrings.featuredDishes[lang]}</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {selectedFood.featuredDishes.map((dish) => (
                                        <div key={dish.id} className="bg-white/80 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-2xl">{getFlagEmoji(dish.country)}</span>
                                                <h4 className="font-bold text-[#2D2926]">{getText(dish.name, lang)}</h4>
                                            </div>
                                            <p className="text-sm text-[#8B7355]">{getText(dish.description, lang)}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
        </div>
    );
}
