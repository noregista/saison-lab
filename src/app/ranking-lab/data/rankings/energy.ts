/**
 * RANKING LAB - Energy Rankings Data
 * エネルギー関連ランキング
 */

import { RankingData } from '../types';

// ============================================================
// CO2排出量
// ============================================================
export const co2Emissions: RankingData = {
    meta: {
        id: 'co2-emissions',
        title: { jp: 'CO2排出量', en: 'CO2 Emissions' },
        description: {
            jp: '年間二酸化炭素排出量',
            en: 'Annual carbon dioxide emissions'
        },
        asOfDate: '2023-12-31',
        source: {
            name: 'Global Carbon Atlas',
            url: 'https://globalcarbonatlas.org/',
            accessedAt: '2025-06-01',
        },
        unit: { jp: '百万トン', en: 'Mt CO2' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: '中国', en: 'China', code: 'CN', flag: '🇨🇳' }, value: 11680 },
        { rank: 2, country: { jp: 'アメリカ', en: 'United States', code: 'US', flag: '🇺🇸' }, value: 4853 },
        { rank: 3, country: { jp: 'インド', en: 'India', code: 'IN', flag: '🇮🇳' }, value: 2830 },
        { rank: 4, country: { jp: 'ロシア', en: 'Russia', code: 'RU', flag: '🇷🇺' }, value: 1764 },
        { rank: 5, country: { jp: '日本', en: 'Japan', code: 'JP', flag: '🇯🇵' }, value: 1067 },
        { rank: 6, country: { jp: 'ドイツ', en: 'Germany', code: 'DE', flag: '🇩🇪' }, value: 674 },
        { rank: 7, country: { jp: 'イラン', en: 'Iran', code: 'IR', flag: '🇮🇷' }, value: 702 },
        { rank: 8, country: { jp: '韓国', en: 'South Korea', code: 'KR', flag: '🇰🇷' }, value: 616 },
        { rank: 9, country: { jp: 'サウジアラビア', en: 'Saudi Arabia', code: 'SA', flag: '🇸🇦' }, value: 586 },
        { rank: 10, country: { jp: 'インドネシア', en: 'Indonesia', code: 'ID', flag: '🇮🇩' }, value: 619 },
    ],
};

// ============================================================
// 再生可能エネルギー比率
// ============================================================
export const renewableEnergy: RankingData = {
    meta: {
        id: 'renewable-energy',
        title: { jp: '再生可能エネルギー比率', en: 'Renewable Energy Share' },
        description: {
            jp: '発電量に占める再生可能エネルギーの割合',
            en: 'Share of electricity from renewable sources'
        },
        asOfDate: '2023-12-31',
        source: {
            name: 'IEA Renewables Report',
            url: 'https://www.iea.org/reports/renewables',
            accessedAt: '2025-05-01',
        },
        unit: { jp: '%', en: '%' },
        lastUpdated: '2026-01-18',
    },
    entries: [
        { rank: 1, country: { jp: 'アイスランド', en: 'Iceland', code: 'IS', flag: '🇮🇸' }, value: 100.0 },
        { rank: 2, country: { jp: 'ノルウェー', en: 'Norway', code: 'NO', flag: '🇳🇴' }, value: 98.5 },
        { rank: 3, country: { jp: 'コスタリカ', en: 'Costa Rica', code: 'CR', flag: '🇨🇷' }, value: 98.1 },
        { rank: 4, country: { jp: 'ブラジル', en: 'Brazil', code: 'BR', flag: '🇧🇷' }, value: 87.0 },
        { rank: 5, country: { jp: 'ニュージーランド', en: 'New Zealand', code: 'NZ', flag: '🇳🇿' }, value: 84.6 },
        { rank: 6, country: { jp: 'オーストリア', en: 'Austria', code: 'AT', flag: '🇦🇹' }, value: 78.2 },
        { rank: 7, country: { jp: 'デンマーク', en: 'Denmark', code: 'DK', flag: '🇩🇰' }, value: 77.8 },
        { rank: 8, country: { jp: 'スウェーデン', en: 'Sweden', code: 'SE', flag: '🇸🇪' }, value: 75.4 },
        { rank: 9, country: { jp: 'ポルトガル', en: 'Portugal', code: 'PT', flag: '🇵🇹' }, value: 61.4 },
        { rank: 10, country: { jp: 'スイス', en: 'Switzerland', code: 'CH', flag: '🇨🇭' }, value: 59.6 },
    ],
};
