/**
 * RANKING LAB - Population Rankings Data
 * 人口関連ランキング
 */

import { RankingData } from '../types';

// ============================================================
// 総人口
// ============================================================
export const population: RankingData = {
    meta: {
        id: 'population',
        title: { jp: '総人口', en: 'Total Population' },
        description: {
            jp: '国別の総人口ランキング',
            en: 'Population by country'
        },
        asOfDate: '2024-07-01',
        source: {
            name: 'United Nations Population Division',
            url: 'https://population.un.org/wpp/',
            accessedAt: '2025-09-01',
        },
        unit: { jp: '百万人', en: 'Million' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: 'インド', en: 'India', code: 'IN', flag: '🇮🇳' }, value: 1450 },
        { rank: 2, country: { jp: '中国', en: 'China', code: 'CN', flag: '🇨🇳' }, value: 1419 },
        { rank: 3, country: { jp: 'アメリカ', en: 'United States', code: 'US', flag: '🇺🇸' }, value: 341 },
        { rank: 4, country: { jp: 'インドネシア', en: 'Indonesia', code: 'ID', flag: '🇮🇩' }, value: 279 },
        { rank: 5, country: { jp: 'パキスタン', en: 'Pakistan', code: 'PK', flag: '🇵🇰' }, value: 240 },
        { rank: 6, country: { jp: 'ナイジェリア', en: 'Nigeria', code: 'NG', flag: '🇳🇬' }, value: 229 },
        { rank: 7, country: { jp: 'ブラジル', en: 'Brazil', code: 'BR', flag: '🇧🇷' }, value: 217 },
        { rank: 8, country: { jp: 'バングラデシュ', en: 'Bangladesh', code: 'BD', flag: '🇧🇩' }, value: 173 },
        { rank: 9, country: { jp: 'ロシア', en: 'Russia', code: 'RU', flag: '🇷🇺' }, value: 144 },
        { rank: 10, country: { jp: 'メキシコ', en: 'Mexico', code: 'MX', flag: '🇲🇽' }, value: 129 },
    ],
};

// ============================================================
// 人口密度
// ============================================================
export const populationDensity: RankingData = {
    meta: {
        id: 'population-density',
        title: { jp: '人口密度', en: 'Population Density' },
        description: {
            jp: '1平方キロメートルあたりの人口',
            en: 'People per square kilometer'
        },
        asOfDate: '2024-07-01',
        source: {
            name: 'World Bank',
            url: 'https://data.worldbank.org/indicator/EN.POP.DNST',
            accessedAt: '2025-09-01',
        },
        unit: { jp: '人/km²', en: 'per km²' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: 'モナコ', en: 'Monaco', code: 'MC', flag: '🇲🇨' }, value: 26337 },
        { rank: 2, country: { jp: 'シンガポール', en: 'Singapore', code: 'SG', flag: '🇸🇬' }, value: 8358 },
        { rank: 3, country: { jp: 'バーレーン', en: 'Bahrain', code: 'BH', flag: '🇧🇭' }, value: 2239 },
        { rank: 4, country: { jp: 'マルタ', en: 'Malta', code: 'MT', flag: '🇲🇹' }, value: 1685 },
        { rank: 5, country: { jp: 'モルディブ', en: 'Maldives', code: 'MV', flag: '🇲🇻' }, value: 1802 },
        { rank: 6, country: { jp: 'バングラデシュ', en: 'Bangladesh', code: 'BD', flag: '🇧🇩' }, value: 1265 },
        { rank: 7, country: { jp: 'レバノン', en: 'Lebanon', code: 'LB', flag: '🇱🇧' }, value: 667 },
        { rank: 8, country: { jp: '韓国', en: 'South Korea', code: 'KR', flag: '🇰🇷' }, value: 527 },
        { rank: 9, country: { jp: 'オランダ', en: 'Netherlands', code: 'NL', flag: '🇳🇱' }, value: 508 },
        { rank: 10, country: { jp: 'ルワンダ', en: 'Rwanda', code: 'RW', flag: '🇷🇼' }, value: 525 },
    ],
};
