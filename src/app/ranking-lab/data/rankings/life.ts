/**
 * RANKING LAB - Life Rankings Data
 * 生活関連ランキング
 */

import { RankingData } from '../types';

// ============================================================
// 平均寿命
// ============================================================
export const lifeExpectancy: RankingData = {
    meta: {
        id: 'life-expectancy',
        title: { jp: '平均寿命', en: 'Life Expectancy' },
        description: {
            jp: '出生時の平均余命',
            en: 'Life expectancy at birth'
        },
        asOfDate: '2023-12-31',
        source: {
            name: 'World Health Organization',
            url: 'https://www.who.int/data/gho',
            accessedAt: '2025-05-01',
        },
        unit: { jp: '歳', en: 'years' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: '日本', en: 'Japan', code: 'JP', flag: '🇯🇵' }, value: 84.3 },
        { rank: 2, country: { jp: 'スイス', en: 'Switzerland', code: 'CH', flag: '🇨🇭' }, value: 83.8 },
        { rank: 3, country: { jp: 'シンガポール', en: 'Singapore', code: 'SG', flag: '🇸🇬' }, value: 83.7 },
        { rank: 4, country: { jp: 'スペイン', en: 'Spain', code: 'ES', flag: '🇪🇸' }, value: 83.6 },
        { rank: 5, country: { jp: 'イタリア', en: 'Italy', code: 'IT', flag: '🇮🇹' }, value: 83.5 },
        { rank: 6, country: { jp: 'オーストラリア', en: 'Australia', code: 'AU', flag: '🇦🇺' }, value: 83.4 },
        { rank: 7, country: { jp: 'アイスランド', en: 'Iceland', code: 'IS', flag: '🇮🇸' }, value: 83.3 },
        { rank: 8, country: { jp: '韓国', en: 'South Korea', code: 'KR', flag: '🇰🇷' }, value: 83.2 },
        { rank: 9, country: { jp: 'イスラエル', en: 'Israel', code: 'IL', flag: '🇮🇱' }, value: 83.0 },
        { rank: 10, country: { jp: 'フランス', en: 'France', code: 'FR', flag: '🇫🇷' }, value: 82.9 },
    ],
};

// ============================================================
// 幸福度指数
// ============================================================
export const happinessIndex: RankingData = {
    meta: {
        id: 'happiness-index',
        title: { jp: '幸福度指数', en: 'Happiness Index' },
        description: {
            jp: '世界幸福度レポートによるスコア',
            en: 'World Happiness Report score'
        },
        asOfDate: '2024-03-20',
        source: {
            name: 'World Happiness Report',
            url: 'https://worldhappiness.report/',
            accessedAt: '2025-04-01',
        },
        unit: { jp: 'ポイント', en: 'points' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: 'フィンランド', en: 'Finland', code: 'FI', flag: '🇫🇮' }, value: 7.82 },
        { rank: 2, country: { jp: 'デンマーク', en: 'Denmark', code: 'DK', flag: '🇩🇰' }, value: 7.64 },
        { rank: 3, country: { jp: 'アイスランド', en: 'Iceland', code: 'IS', flag: '🇮🇸' }, value: 7.55 },
        { rank: 4, country: { jp: 'イスラエル', en: 'Israel', code: 'IL', flag: '🇮🇱' }, value: 7.47 },
        { rank: 5, country: { jp: 'オランダ', en: 'Netherlands', code: 'NL', flag: '🇳🇱' }, value: 7.42 },
        { rank: 6, country: { jp: 'スウェーデン', en: 'Sweden', code: 'SE', flag: '🇸🇪' }, value: 7.40 },
        { rank: 7, country: { jp: 'ノルウェー', en: 'Norway', code: 'NO', flag: '🇳🇴' }, value: 7.38 },
        { rank: 8, country: { jp: 'スイス', en: 'Switzerland', code: 'CH', flag: '🇨🇭' }, value: 7.24 },
        { rank: 9, country: { jp: 'ルクセンブルク', en: 'Luxembourg', code: 'LU', flag: '🇱🇺' }, value: 7.12 },
        { rank: 10, country: { jp: 'オーストラリア', en: 'Australia', code: 'AU', flag: '🇦🇺' }, value: 7.10 },
    ],
};
