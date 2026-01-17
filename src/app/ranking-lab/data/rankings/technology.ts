/**
 * RANKING LAB - Technology Rankings Data
 * 技術関連ランキング
 */

import { RankingData } from '../types';

// ============================================================
// 特許出願数
// ============================================================
export const patentApplications: RankingData = {
    meta: {
        id: 'patent-applications',
        title: { jp: '特許出願数', en: 'Patent Applications' },
        description: {
            jp: '年間の特許出願件数',
            en: 'Annual patent applications filed'
        },
        asOfDate: '2023-12-31',
        source: {
            name: 'WIPO Statistics Database',
            url: 'https://www.wipo.int/ipstats/',
            accessedAt: '2025-07-01',
        },
        unit: { jp: '件', en: 'applications' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: '中国', en: 'China', code: 'CN', flag: '🇨🇳' }, value: 1580000 },
        { rank: 2, country: { jp: 'アメリカ', en: 'United States', code: 'US', flag: '🇺🇸' }, value: 505539 },
        { rank: 3, country: { jp: '日本', en: 'Japan', code: 'JP', flag: '🇯🇵' }, value: 289530 },
        { rank: 4, country: { jp: '韓国', en: 'South Korea', code: 'KR', flag: '🇰🇷' }, value: 237998 },
        { rank: 5, country: { jp: 'ドイツ', en: 'Germany', code: 'DE', flag: '🇩🇪' }, value: 58568 },
        { rank: 6, country: { jp: 'インド', en: 'India', code: 'IN', flag: '🇮🇳' }, value: 64480 },
        { rank: 7, country: { jp: 'フランス', en: 'France', code: 'FR', flag: '🇫🇷' }, value: 14245 },
        { rank: 8, country: { jp: 'イギリス', en: 'United Kingdom', code: 'GB', flag: '🇬🇧' }, value: 13962 },
        { rank: 9, country: { jp: 'スイス', en: 'Switzerland', code: 'CH', flag: '🇨🇭' }, value: 7680 },
        { rank: 10, country: { jp: 'オランダ', en: 'Netherlands', code: 'NL', flag: '🇳🇱' }, value: 6890 },
    ],
};

// ============================================================
// インターネット普及率
// ============================================================
export const internetPenetration: RankingData = {
    meta: {
        id: 'internet-penetration',
        title: { jp: 'インターネット普及率', en: 'Internet Penetration' },
        description: {
            jp: '人口に対するインターネット利用者の割合',
            en: 'Percentage of population using the internet'
        },
        asOfDate: '2024-06-30',
        source: {
            name: 'ITU World Telecommunication/ICT Indicators',
            url: 'https://www.itu.int/en/ITU-D/Statistics/',
            accessedAt: '2025-06-01',
        },
        unit: { jp: '%', en: '%' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: 'アラブ首長国連邦', en: 'UAE', code: 'AE', flag: '🇦🇪' }, value: 99.0 },
        { rank: 2, country: { jp: 'デンマーク', en: 'Denmark', code: 'DK', flag: '🇩🇰' }, value: 98.9 },
        { rank: 3, country: { jp: 'アイスランド', en: 'Iceland', code: 'IS', flag: '🇮🇸' }, value: 98.6 },
        { rank: 4, country: { jp: 'スイス', en: 'Switzerland', code: 'CH', flag: '🇨🇭' }, value: 98.1 },
        { rank: 5, country: { jp: 'ルクセンブルク', en: 'Luxembourg', code: 'LU', flag: '🇱🇺' }, value: 98.0 },
        { rank: 6, country: { jp: 'ノルウェー', en: 'Norway', code: 'NO', flag: '🇳🇴' }, value: 97.8 },
        { rank: 7, country: { jp: '韓国', en: 'South Korea', code: 'KR', flag: '🇰🇷' }, value: 97.6 },
        { rank: 8, country: { jp: 'イギリス', en: 'United Kingdom', code: 'GB', flag: '🇬🇧' }, value: 97.5 },
        { rank: 9, country: { jp: 'オランダ', en: 'Netherlands', code: 'NL', flag: '🇳🇱' }, value: 97.3 },
        { rank: 10, country: { jp: 'スウェーデン', en: 'Sweden', code: 'SE', flag: '🇸🇪' }, value: 97.1 },
    ],
};
