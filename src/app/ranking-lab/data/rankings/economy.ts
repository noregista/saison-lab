/**
 * RANKING LAB - Economy Rankings Data
 * 経済関連ランキング
 */

import { RankingData } from '../types';

// ============================================================
// 名目GDP（国別）
// ============================================================
export const gdpNominal: RankingData = {
    meta: {
        id: 'gdp-nominal',
        title: { jp: '名目GDP（国別）', en: 'Nominal GDP by Country' },
        description: {
            jp: '各国の名目国内総生産（GDP）ランキング',
            en: 'Gross Domestic Product (GDP) at current prices'
        },
        asOfDate: '2024-12-31',
        source: {
            name: 'IMF World Economic Outlook',
            url: 'https://www.imf.org/external/datamapper/NGDPD@WEO',
            accessedAt: '2025-10-15',
        },
        unit: { jp: '10億米ドル', en: 'Billion USD' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: 'アメリカ', en: 'United States', code: 'US', flag: '🇺🇸' }, value: 28781 },
        { rank: 2, country: { jp: '中国', en: 'China', code: 'CN', flag: '🇨🇳' }, value: 18532 },
        { rank: 3, country: { jp: '日本', en: 'Japan', code: 'JP', flag: '🇯🇵' }, value: 4110 },
        { rank: 4, country: { jp: 'ドイツ', en: 'Germany', code: 'DE', flag: '🇩🇪' }, value: 4591 },
        { rank: 5, country: { jp: 'インド', en: 'India', code: 'IN', flag: '🇮🇳' }, value: 3937 },
        { rank: 6, country: { jp: 'イギリス', en: 'United Kingdom', code: 'GB', flag: '🇬🇧' }, value: 3495 },
        { rank: 7, country: { jp: 'フランス', en: 'France', code: 'FR', flag: '🇫🇷' }, value: 3130 },
        { rank: 8, country: { jp: 'イタリア', en: 'Italy', code: 'IT', flag: '🇮🇹' }, value: 2328 },
        { rank: 9, country: { jp: 'ブラジル', en: 'Brazil', code: 'BR', flag: '🇧🇷' }, value: 2331 },
        { rank: 10, country: { jp: 'カナダ', en: 'Canada', code: 'CA', flag: '🇨🇦' }, value: 2242 },
    ],
};

// ============================================================
// 一人当たりGDP
// ============================================================
export const gdpPerCapita: RankingData = {
    meta: {
        id: 'gdp-per-capita',
        title: { jp: '一人当たりGDP', en: 'GDP per Capita' },
        description: {
            jp: '国民一人当たりの国内総生産',
            en: 'GDP divided by total population'
        },
        asOfDate: '2024-12-31',
        source: {
            name: 'IMF World Economic Outlook',
            url: 'https://www.imf.org/external/datamapper/NGDPDPC@WEO',
            accessedAt: '2025-10-15',
        },
        unit: { jp: '米ドル', en: 'USD' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: 'ルクセンブルク', en: 'Luxembourg', code: 'LU', flag: '🇱🇺' }, value: 143743 },
        { rank: 2, country: { jp: 'アイルランド', en: 'Ireland', code: 'IE', flag: '🇮🇪' }, value: 106059 },
        { rank: 3, country: { jp: 'スイス', en: 'Switzerland', code: 'CH', flag: '🇨🇭' }, value: 99994 },
        { rank: 4, country: { jp: 'ノルウェー', en: 'Norway', code: 'NO', flag: '🇳🇴' }, value: 94660 },
        { rank: 5, country: { jp: 'シンガポール', en: 'Singapore', code: 'SG', flag: '🇸🇬' }, value: 91100 },
        { rank: 6, country: { jp: 'アメリカ', en: 'United States', code: 'US', flag: '🇺🇸' }, value: 85373 },
        { rank: 7, country: { jp: 'アイスランド', en: 'Iceland', code: 'IS', flag: '🇮🇸' }, value: 84595 },
        { rank: 8, country: { jp: 'カタール', en: 'Qatar', code: 'QA', flag: '🇶🇦' }, value: 81968 },
        { rank: 9, country: { jp: 'デンマーク', en: 'Denmark', code: 'DK', flag: '🇩🇰' }, value: 68827 },
        { rank: 10, country: { jp: 'オーストラリア', en: 'Australia', code: 'AU', flag: '🇦🇺' }, value: 65366 },
    ],
};
