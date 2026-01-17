/**
 * RANKING LAB - Geography Rankings Data
 * 地理関連ランキング
 */

import { RankingData } from '../types';

// ============================================================
// 面積
// ============================================================
export const area: RankingData = {
    meta: {
        id: 'area',
        title: { jp: '国土面積', en: 'Land Area' },
        description: {
            jp: '国別の総面積ランキング',
            en: 'Total area by country'
        },
        asOfDate: '2024-01-01',
        source: {
            name: 'CIA World Factbook',
            url: 'https://www.cia.gov/the-world-factbook/',
            accessedAt: '2025-08-01',
        },
        unit: { jp: '千km²', en: '1000 km²' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: 'ロシア', en: 'Russia', code: 'RU', flag: '🇷🇺' }, value: 17098 },
        { rank: 2, country: { jp: 'カナダ', en: 'Canada', code: 'CA', flag: '🇨🇦' }, value: 9985 },
        { rank: 3, country: { jp: 'アメリカ', en: 'United States', code: 'US', flag: '🇺🇸' }, value: 9834 },
        { rank: 4, country: { jp: '中国', en: 'China', code: 'CN', flag: '🇨🇳' }, value: 9597 },
        { rank: 5, country: { jp: 'ブラジル', en: 'Brazil', code: 'BR', flag: '🇧🇷' }, value: 8516 },
        { rank: 6, country: { jp: 'オーストラリア', en: 'Australia', code: 'AU', flag: '🇦🇺' }, value: 7692 },
        { rank: 7, country: { jp: 'インド', en: 'India', code: 'IN', flag: '🇮🇳' }, value: 3287 },
        { rank: 8, country: { jp: 'アルゼンチン', en: 'Argentina', code: 'AR', flag: '🇦🇷' }, value: 2780 },
        { rank: 9, country: { jp: 'カザフスタン', en: 'Kazakhstan', code: 'KZ', flag: '🇰🇿' }, value: 2725 },
        { rank: 10, country: { jp: 'アルジェリア', en: 'Algeria', code: 'DZ', flag: '🇩🇿' }, value: 2382 },
    ],
};

// ============================================================
// 海岸線長
// ============================================================
export const coastline: RankingData = {
    meta: {
        id: 'coastline',
        title: { jp: '海岸線の長さ', en: 'Coastline Length' },
        description: {
            jp: '海岸線の総延長距離',
            en: 'Total length of coastline'
        },
        asOfDate: '2024-01-01',
        source: {
            name: 'CIA World Factbook',
            url: 'https://www.cia.gov/the-world-factbook/',
            accessedAt: '2025-08-01',
        },
        unit: { jp: 'km', en: 'km' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: 'カナダ', en: 'Canada', code: 'CA', flag: '🇨🇦' }, value: 202080 },
        { rank: 2, country: { jp: 'インドネシア', en: 'Indonesia', code: 'ID', flag: '🇮🇩' }, value: 54716 },
        { rank: 3, country: { jp: 'ノルウェー', en: 'Norway', code: 'NO', flag: '🇳🇴' }, value: 25148 },
        { rank: 4, country: { jp: 'ロシア', en: 'Russia', code: 'RU', flag: '🇷🇺' }, value: 37653 },
        { rank: 5, country: { jp: 'フィリピン', en: 'Philippines', code: 'PH', flag: '🇵🇭' }, value: 36289 },
        { rank: 6, country: { jp: '日本', en: 'Japan', code: 'JP', flag: '🇯🇵' }, value: 29751 },
        { rank: 7, country: { jp: 'オーストラリア', en: 'Australia', code: 'AU', flag: '🇦🇺' }, value: 25760 },
        { rank: 8, country: { jp: 'アメリカ', en: 'United States', code: 'US', flag: '🇺🇸' }, value: 19924 },
        { rank: 9, country: { jp: 'ニュージーランド', en: 'New Zealand', code: 'NZ', flag: '🇳🇿' }, value: 15134 },
        { rank: 10, country: { jp: '中国', en: 'China', code: 'CN', flag: '🇨🇳' }, value: 14500 },
    ],
};
