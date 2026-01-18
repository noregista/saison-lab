// FRUIT LAB - フルーツデータ
// 意図: 15種のフルーツマスターデータ（2023年輸出統計基準）

import { Fruit, Translations } from './types';

// 意図: 統計データの基準年
export const DATA_YEAR = 2023;
export const LAST_UPDATED = '2026年1月';

// 意図: UI翻訳データ
export const translations: Record<'jp' | 'en', Translations> = {
    jp: {
        title: 'FRUIT LAB',
        subtitle: '世界フルーツ図鑑',
        description: '植物学的特徴と輸出統計で世界のフルーツを徹底比較',
        searchPlaceholder: 'フルーツ名で検索...',
        filterAll: 'すべて',
        filterCitrus: '柑橘類',
        filterTropical: '熱帯果物',
        filterBerry: 'ベリー類',
        filterPome: '仁果類',
        filterStone: '核果類',
        filterOther: 'その他',
        exportRanking: '輸出量ランキング',
        exportYear: '年時点のデータ',
        lastUpdated: '最終更新',
        calories: 'カロリー',
        sugar: '糖質',
        fiber: '食物繊維',
        vitaminC: 'ビタミンC',
        season: '旬の時期',
        scientific: '学名',
        family: '科名',
        origin: '原産地',
        topExporters: '主要輸出国',
        worldShare: '世界シェア',
        tonnes: '万トン',
        compare: '比較',
        back: '← Saison Lab',
        adText: '広告スペース',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
    },
    en: {
        title: 'FRUIT LAB',
        subtitle: 'World Fruit Encyclopedia',
        description: 'Compare fruits with botanical facts and export statistics',
        searchPlaceholder: 'Search fruits...',
        filterAll: 'All',
        filterCitrus: 'Citrus',
        filterTropical: 'Tropical',
        filterBerry: 'Berries',
        filterPome: 'Pome',
        filterStone: 'Stone',
        filterOther: 'Others',
        exportRanking: 'Export Ranking',
        exportYear: 'Data as of',
        lastUpdated: 'Last updated',
        calories: 'Calories',
        sugar: 'Sugar',
        fiber: 'Fiber',
        vitaminC: 'Vitamin C',
        season: 'Season',
        scientific: 'Scientific name',
        family: 'Family',
        origin: 'Origin',
        topExporters: 'Top Exporters',
        worldShare: 'World Share',
        tonnes: 'M tonnes',
        compare: 'Compare',
        back: '← Saison Lab',
        adText: 'Advertisement',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
    },
};

// 意図: 15種のフルーツマスターデータ
export const fruits: Fruit[] = [
    {
        id: 'banana',
        name: { jp: 'バナナ', en: 'Banana' },
        scientificName: 'Musa acuminata',
        family: { jp: 'バショウ科', en: 'Musaceae' },
        category: 'tropical',
        emoji: '🍌',
        color: '#FFE135',
        origin: [{ jp: '東南アジア', en: 'Southeast Asia' }],
        season: { northern: ['通年'], southern: ['通年'] },
        description: {
            jp: '世界で最も輸出量の多い果物。カリウムが豊富でエネルギー補給に最適。',
            en: 'The world\'s most exported fruit. Rich in potassium and perfect for energy.',
        },
        nutrition: { calories: 89, sugar: 12.2, fiber: 2.6, vitaminC: 8.7 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 21500000,
            topCountries: [
                { code: 'EC', name: { jp: 'エクアドル', en: 'Ecuador' }, tonnes: 6800000, percentage: 31.6 },
                { code: 'PH', name: { jp: 'フィリピン', en: 'Philippines' }, tonnes: 2900000, percentage: 13.5 },
                { code: 'CR', name: { jp: 'コスタリカ', en: 'Costa Rica' }, tonnes: 2400000, percentage: 11.2 },
            ],
        },
        imageUrl: '/fruit-lab/images/banana.png',
    },
    {
        id: 'apple',
        name: { jp: 'りんご', en: 'Apple' },
        scientificName: 'Malus domestica',
        family: { jp: 'バラ科', en: 'Rosaceae' },
        category: 'pome',
        emoji: '🍎',
        color: '#FF3B30',
        origin: [{ jp: '中央アジア', en: 'Central Asia' }],
        season: { northern: ['9月', '10月', '11月'], southern: ['3月', '4月', '5月'] },
        description: {
            jp: '世界中で愛される定番フルーツ。食物繊維とポリフェノールが豊富。',
            en: 'A classic fruit loved worldwide. Rich in fiber and polyphenols.',
        },
        nutrition: { calories: 52, sugar: 10.4, fiber: 2.4, vitaminC: 4.6 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 12300000,
            topCountries: [
                { code: 'CN', name: { jp: '中国', en: 'China' }, tonnes: 1100000, percentage: 8.9 },
                { code: 'IT', name: { jp: 'イタリア', en: 'Italy' }, tonnes: 980000, percentage: 8.0 },
                { code: 'US', name: { jp: 'アメリカ', en: 'United States' }, tonnes: 850000, percentage: 6.9 },
            ],
        },
        imageUrl: '/fruit-lab/images/apple.png',
    },
    {
        id: 'orange',
        name: { jp: 'オレンジ', en: 'Orange' },
        scientificName: 'Citrus sinensis',
        family: { jp: 'ミカン科', en: 'Rutaceae' },
        category: 'citrus',
        emoji: '🍊',
        color: '#FF9500',
        origin: [{ jp: '中国南部', en: 'Southern China' }],
        season: { northern: ['12月', '1月', '2月', '3月'], southern: ['6月', '7月', '8月', '9月'] },
        description: {
            jp: 'ビタミンCの代名詞。ジュースとしても世界中で親しまれている。',
            en: 'Synonymous with Vitamin C. Enjoyed worldwide as juice and fresh fruit.',
        },
        nutrition: { calories: 47, sugar: 9.4, fiber: 2.4, vitaminC: 53.2 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 10100000,
            topCountries: [
                { code: 'ES', name: { jp: 'スペイン', en: 'Spain' }, tonnes: 1600000, percentage: 15.8 },
                { code: 'ZA', name: { jp: '南アフリカ', en: 'South Africa' }, tonnes: 1400000, percentage: 13.9 },
                { code: 'EG', name: { jp: 'エジプト', en: 'Egypt' }, tonnes: 1200000, percentage: 11.9 },
            ],
        },
        imageUrl: '/fruit-lab/images/orange.png',
    },
    {
        id: 'grape',
        name: { jp: 'ぶどう', en: 'Grape' },
        scientificName: 'Vitis vinifera',
        family: { jp: 'ブドウ科', en: 'Vitaceae' },
        category: 'other',
        emoji: '🍇',
        color: '#5856D6',
        origin: [{ jp: '西アジア', en: 'Western Asia' }],
        season: { northern: ['8月', '9月', '10月'], southern: ['2月', '3月', '4月'] },
        description: {
            jp: 'ワインの原料としても有名。ポリフェノールとレスベラトロールが豊富。',
            en: 'Famous as wine ingredient. Rich in polyphenols and resveratrol.',
        },
        nutrition: { calories: 69, sugar: 15.5, fiber: 0.9, vitaminC: 3.2 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 8400000,
            topCountries: [
                { code: 'CL', name: { jp: 'チリ', en: 'Chile' }, tonnes: 850000, percentage: 10.1 },
                { code: 'US', name: { jp: 'アメリカ', en: 'United States' }, tonnes: 420000, percentage: 5.0 },
                { code: 'IT', name: { jp: 'イタリア', en: 'Italy' }, tonnes: 400000, percentage: 4.8 },
            ],
        },
        imageUrl: '/fruit-lab/images/grape.png',
    },
    {
        id: 'mango',
        name: { jp: 'マンゴー', en: 'Mango' },
        scientificName: 'Mangifera indica',
        family: { jp: 'ウルシ科', en: 'Anacardiaceae' },
        category: 'tropical',
        emoji: '🥭',
        color: '#FFCC00',
        origin: [{ jp: '南アジア', en: 'South Asia' }],
        season: { northern: ['5月', '6月', '7月', '8月'], southern: ['11月', '12月', '1月', '2月'] },
        description: {
            jp: 'トロピカルフルーツの王様。濃厚な甘みとβカロテンが特徴。',
            en: 'King of tropical fruits. Known for rich sweetness and beta-carotene.',
        },
        nutrition: { calories: 60, sugar: 13.7, fiber: 1.6, vitaminC: 36.4 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 2100000,
            topCountries: [
                { code: 'MX', name: { jp: 'メキシコ', en: 'Mexico' }, tonnes: 420000, percentage: 20.0 },
                { code: 'TH', name: { jp: 'タイ', en: 'Thailand' }, tonnes: 280000, percentage: 13.3 },
                { code: 'IN', name: { jp: 'インド', en: 'India' }, tonnes: 250000, percentage: 11.9 },
            ],
        },
        imageUrl: '/fruit-lab/images/mango.png',
    },
    {
        id: 'pineapple',
        name: { jp: 'パイナップル', en: 'Pineapple' },
        scientificName: 'Ananas comosus',
        family: { jp: 'パイナップル科', en: 'Bromeliaceae' },
        category: 'tropical',
        emoji: '🍍',
        color: '#FFD60A',
        origin: [{ jp: '南アメリカ', en: 'South America' }],
        season: { northern: ['通年'], southern: ['通年'] },
        description: {
            jp: 'ブロメラインという消化酵素を含む。酸味と甘みのバランスが絶妙。',
            en: 'Contains bromelain digestive enzyme. Perfect balance of sweet and sour.',
        },
        nutrition: { calories: 50, sugar: 9.9, fiber: 1.4, vitaminC: 47.8 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 3200000,
            topCountries: [
                { code: 'CR', name: { jp: 'コスタリカ', en: 'Costa Rica' }, tonnes: 2100000, percentage: 65.6 },
                { code: 'PH', name: { jp: 'フィリピン', en: 'Philippines' }, tonnes: 450000, percentage: 14.1 },
                { code: 'NL', name: { jp: 'オランダ', en: 'Netherlands' }, tonnes: 180000, percentage: 5.6 },
            ],
        },
        imageUrl: '/fruit-lab/images/pineapple.png',
    },
    {
        id: 'strawberry',
        name: { jp: 'いちご', en: 'Strawberry' },
        scientificName: 'Fragaria × ananassa',
        family: { jp: 'バラ科', en: 'Rosaceae' },
        category: 'berry',
        emoji: '🍓',
        color: '#FF2D55',
        origin: [{ jp: 'フランス（交配種）', en: 'France (hybrid)' }],
        season: { northern: ['4月', '5月', '6月'], southern: ['10月', '11月', '12月'] },
        description: {
            jp: 'ビタミンCがレモンより豊富。甘酸っぱい味わいと香りが人気。',
            en: 'Richer in Vitamin C than lemons. Popular for sweet-sour taste and aroma.',
        },
        nutrition: { calories: 32, sugar: 4.9, fiber: 2.0, vitaminC: 58.8 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 980000,
            topCountries: [
                { code: 'ES', name: { jp: 'スペイン', en: 'Spain' }, tonnes: 290000, percentage: 29.6 },
                { code: 'US', name: { jp: 'アメリカ', en: 'United States' }, tonnes: 120000, percentage: 12.2 },
                { code: 'MX', name: { jp: 'メキシコ', en: 'Mexico' }, tonnes: 110000, percentage: 11.2 },
            ],
        },
        imageUrl: '/fruit-lab/images/strawberry.png',
    },
    {
        id: 'peach',
        name: { jp: '桃', en: 'Peach' },
        scientificName: 'Prunus persica',
        family: { jp: 'バラ科', en: 'Rosaceae' },
        category: 'stone',
        emoji: '🍑',
        color: '#FFAFBD',
        origin: [{ jp: '中国', en: 'China' }],
        season: { northern: ['6月', '7月', '8月'], southern: ['12月', '1月', '2月'] },
        description: {
            jp: '甘くジューシーな夏の代表的フルーツ。カリウムと食物繊維が豊富。',
            en: 'Sweet and juicy summer fruit. Rich in potassium and dietary fiber.',
        },
        nutrition: { calories: 39, sugar: 8.4, fiber: 1.5, vitaminC: 6.6 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 1400000,
            topCountries: [
                { code: 'ES', name: { jp: 'スペイン', en: 'Spain' }, tonnes: 350000, percentage: 25.0 },
                { code: 'IT', name: { jp: 'イタリア', en: 'Italy' }, tonnes: 220000, percentage: 15.7 },
                { code: 'GR', name: { jp: 'ギリシャ', en: 'Greece' }, tonnes: 180000, percentage: 12.9 },
            ],
        },
        imageUrl: '/fruit-lab/images/peach.png',
    },
    {
        id: 'lemon',
        name: { jp: 'レモン', en: 'Lemon' },
        scientificName: 'Citrus limon',
        family: { jp: 'ミカン科', en: 'Rutaceae' },
        category: 'citrus',
        emoji: '🍋',
        color: '#FFFF00',
        origin: [{ jp: '北東インド', en: 'Northeast India' }],
        season: { northern: ['11月', '12月', '1月', '2月'], southern: ['5月', '6月', '7月', '8月'] },
        description: {
            jp: '料理や飲料に欠かせない柑橘類。クエン酸とビタミンCが豊富。',
            en: 'Essential citrus for cooking and beverages. Rich in citric acid and Vitamin C.',
        },
        nutrition: { calories: 29, sugar: 2.5, fiber: 2.8, vitaminC: 53.0 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 3800000,
            topCountries: [
                { code: 'ES', name: { jp: 'スペイン', en: 'Spain' }, tonnes: 680000, percentage: 17.9 },
                { code: 'MX', name: { jp: 'メキシコ', en: 'Mexico' }, tonnes: 620000, percentage: 16.3 },
                { code: 'TR', name: { jp: 'トルコ', en: 'Turkey' }, tonnes: 580000, percentage: 15.3 },
            ],
        },
        imageUrl: '/fruit-lab/images/lemon.png',
    },
    {
        id: 'blueberry',
        name: { jp: 'ブルーベリー', en: 'Blueberry' },
        scientificName: 'Vaccinium corymbosum',
        family: { jp: 'ツツジ科', en: 'Ericaceae' },
        category: 'berry',
        emoji: '🫐',
        color: '#4169E1',
        origin: [{ jp: '北アメリカ', en: 'North America' }],
        season: { northern: ['6月', '7月', '8月'], southern: ['12月', '1月', '2月'] },
        description: {
            jp: 'アントシアニンが目の健康をサポート。スーパーフードとして人気。',
            en: 'Anthocyanins support eye health. Popular as a superfood.',
        },
        nutrition: { calories: 57, sugar: 9.9, fiber: 2.4, vitaminC: 9.7 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 680000,
            topCountries: [
                { code: 'CL', name: { jp: 'チリ', en: 'Chile' }, tonnes: 180000, percentage: 26.5 },
                { code: 'PE', name: { jp: 'ペルー', en: 'Peru' }, tonnes: 150000, percentage: 22.1 },
                { code: 'US', name: { jp: 'アメリカ', en: 'United States' }, tonnes: 80000, percentage: 11.8 },
            ],
        },
        imageUrl: '/fruit-lab/images/blueberry.png',
    },
    {
        id: 'cherry',
        name: { jp: 'さくらんぼ', en: 'Cherry' },
        scientificName: 'Prunus avium',
        family: { jp: 'バラ科', en: 'Rosaceae' },
        category: 'stone',
        emoji: '🍒',
        color: '#DC143C',
        origin: [{ jp: '西アジア・ヨーロッパ', en: 'Western Asia & Europe' }],
        season: { northern: ['5月', '6月', '7月'], southern: ['11月', '12月', '1月'] },
        description: {
            jp: '初夏の高級フルーツ。抗酸化物質とメラトニンを含む。',
            en: 'Premium early summer fruit. Contains antioxidants and melatonin.',
        },
        nutrition: { calories: 63, sugar: 12.8, fiber: 2.1, vitaminC: 7.0 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 520000,
            topCountries: [
                { code: 'CL', name: { jp: 'チリ', en: 'Chile' }, tonnes: 230000, percentage: 44.2 },
                { code: 'US', name: { jp: 'アメリカ', en: 'United States' }, tonnes: 85000, percentage: 16.3 },
                { code: 'TR', name: { jp: 'トルコ', en: 'Turkey' }, tonnes: 60000, percentage: 11.5 },
            ],
        },
        imageUrl: '/fruit-lab/images/cherry.png',
    },
    {
        id: 'pear',
        name: { jp: '梨', en: 'Pear' },
        scientificName: 'Pyrus communis',
        family: { jp: 'バラ科', en: 'Rosaceae' },
        category: 'pome',
        emoji: '🍐',
        color: '#B4D455',
        origin: [{ jp: 'ヨーロッパ・西アジア', en: 'Europe & Western Asia' }],
        season: { northern: ['8月', '9月', '10月'], southern: ['2月', '3月', '4月'] },
        description: {
            jp: 'シャキシャキとした食感が特徴。低カロリーで水分が豊富。',
            en: 'Known for crisp texture. Low calorie and high in water content.',
        },
        nutrition: { calories: 57, sugar: 9.8, fiber: 3.1, vitaminC: 4.3 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 2800000,
            topCountries: [
                { code: 'CN', name: { jp: '中国', en: 'China' }, tonnes: 580000, percentage: 20.7 },
                { code: 'AR', name: { jp: 'アルゼンチン', en: 'Argentina' }, tonnes: 350000, percentage: 12.5 },
                { code: 'NL', name: { jp: 'オランダ', en: 'Netherlands' }, tonnes: 310000, percentage: 11.1 },
            ],
        },
        imageUrl: '/fruit-lab/images/pear.png',
    },
    {
        id: 'grapefruit',
        name: { jp: 'グレープフルーツ', en: 'Grapefruit' },
        scientificName: 'Citrus × paradisi',
        family: { jp: 'ミカン科', en: 'Rutaceae' },
        category: 'citrus',
        emoji: '🍊',
        color: '#FF6B6B',
        origin: [{ jp: 'バルバドス（交配種）', en: 'Barbados (hybrid)' }],
        season: { northern: ['11月', '12月', '1月', '2月', '3月'], southern: ['5月', '6月', '7月', '8月', '9月'] },
        description: {
            jp: 'ほろ苦さが特徴の大型柑橘類。ナリンギンという成分を含む。',
            en: 'Large citrus with bitter taste. Contains naringin compound.',
        },
        nutrition: { calories: 42, sugar: 6.9, fiber: 1.6, vitaminC: 31.2 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 1200000,
            topCountries: [
                { code: 'ZA', name: { jp: '南アフリカ', en: 'South Africa' }, tonnes: 350000, percentage: 29.2 },
                { code: 'TR', name: { jp: 'トルコ', en: 'Turkey' }, tonnes: 220000, percentage: 18.3 },
                { code: 'US', name: { jp: 'アメリカ', en: 'United States' }, tonnes: 150000, percentage: 12.5 },
            ],
        },
        imageUrl: '/fruit-lab/images/grapefruit.png',
    },
    {
        id: 'raspberry',
        name: { jp: 'ラズベリー', en: 'Raspberry' },
        scientificName: 'Rubus idaeus',
        family: { jp: 'バラ科', en: 'Rosaceae' },
        category: 'berry',
        emoji: '🫐',
        color: '#E30B5C',
        origin: [{ jp: 'ヨーロッパ・北アジア', en: 'Europe & Northern Asia' }],
        season: { northern: ['6月', '7月', '8月'], southern: ['12月', '1月', '2月'] },
        description: {
            jp: '繊細な風味と鮮やかな赤色が特徴。ケーキなどのスイーツに人気。',
            en: 'Known for delicate flavor and vibrant red color. Popular in desserts.',
        },
        nutrition: { calories: 52, sugar: 4.4, fiber: 6.5, vitaminC: 26.2 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 320000,
            topCountries: [
                { code: 'ES', name: { jp: 'スペイン', en: 'Spain' }, tonnes: 65000, percentage: 20.3 },
                { code: 'MX', name: { jp: 'メキシコ', en: 'Mexico' }, tonnes: 55000, percentage: 17.2 },
                { code: 'PL', name: { jp: 'ポーランド', en: 'Poland' }, tonnes: 40000, percentage: 12.5 },
            ],
        },
        imageUrl: '/fruit-lab/images/raspberry.png',
    },
    {
        id: 'papaya',
        name: { jp: 'パパイヤ', en: 'Papaya' },
        scientificName: 'Carica papaya',
        family: { jp: 'パパイヤ科', en: 'Caricaceae' },
        category: 'tropical',
        emoji: '🍈',
        color: '#FF7F50',
        origin: [{ jp: '中央アメリカ', en: 'Central America' }],
        season: { northern: ['通年'], southern: ['通年'] },
        description: {
            jp: 'パパインという消化酵素を豊富に含む。βカロテン含有量がトップクラス。',
            en: 'Rich in papain digestive enzyme. Top-class beta-carotene content.',
        },
        nutrition: { calories: 43, sugar: 7.8, fiber: 1.7, vitaminC: 60.9 },
        exportData: {
            year: 2023,
            totalGlobalTonnes: 380000,
            topCountries: [
                { code: 'MX', name: { jp: 'メキシコ', en: 'Mexico' }, tonnes: 180000, percentage: 47.4 },
                { code: 'GT', name: { jp: 'グアテマラ', en: 'Guatemala' }, tonnes: 55000, percentage: 14.5 },
                { code: 'BR', name: { jp: 'ブラジル', en: 'Brazil' }, tonnes: 35000, percentage: 9.2 },
            ],
        },
        imageUrl: '/fruit-lab/images/papaya.png',
    },
];

// 意図: 輸出量の降順でソート済みリストを取得
export const getFruitsByExport = (): Fruit[] => {
    return [...fruits].sort((a, b) => b.exportData.totalGlobalTonnes - a.exportData.totalGlobalTonnes);
};

// 意図: カテゴリでフィルタリング
export const getFruitsByCategory = (category: string): Fruit[] => {
    if (category === 'all') return fruits;
    return fruits.filter(f => f.category === category);
};

// 意図: 検索機能
export const searchFruits = (query: string, lang: 'jp' | 'en'): Fruit[] => {
    const q = query.toLowerCase();
    return fruits.filter(f =>
        f.name[lang].toLowerCase().includes(q) ||
        f.scientificName.toLowerCase().includes(q)
    );
};
