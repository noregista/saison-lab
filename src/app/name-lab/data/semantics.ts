// NAME LAB - 意味論辞書
// 意図: キーワードから関連する語根へのマッピング

import { SemanticEntry, Translations } from './types';

// 意図: 意味論エントリ
export const semanticDictionary: SemanticEntry[] = [
    // 自然要素
    { keyword: 'fire', translations: { jp: '炎', en: 'fire' }, relatedRoots: ['ignis', 'pyr', '炎'], relatedKeywords: ['flame', 'blaze', 'burn'], category: 'nature' },
    { keyword: 'water', translations: { jp: '水', en: 'water' }, relatedRoots: ['aqua', 'hydro', '水'], relatedKeywords: ['ocean', 'river', 'rain'], category: 'nature' },
    { keyword: 'wind', translations: { jp: '風', en: 'wind' }, relatedRoots: ['aer', 'zephyr', '風'], relatedKeywords: ['air', 'storm', 'breeze'], category: 'nature' },
    { keyword: 'earth', translations: { jp: '大地', en: 'earth' }, relatedRoots: ['terra', '地'], relatedKeywords: ['land', 'soil', 'ground'], category: 'nature' },
    { keyword: 'light', translations: { jp: '光', en: 'light' }, relatedRoots: ['lux', '光'], relatedKeywords: ['bright', 'shine', 'radiant'], category: 'nature' },
    { keyword: 'dark', translations: { jp: '闇', en: 'darkness' }, relatedRoots: ['nox', 'umbra', '影'], relatedKeywords: ['shadow', 'night', 'void'], category: 'nature' },
    { keyword: 'thunder', translations: { jp: '雷', en: 'thunder' }, relatedRoots: ['ion', '雷'], relatedKeywords: ['lightning', 'storm', 'electric'], category: 'nature' },
    { keyword: 'ice', translations: { jp: '氷', en: 'ice' }, relatedRoots: ['cryo', '氷'], relatedKeywords: ['frost', 'frozen', 'cold'], category: 'nature' },

    // 天体
    { keyword: 'star', translations: { jp: '星', en: 'star' }, relatedRoots: ['stella', 'astra', '星'], relatedKeywords: ['celestial', 'cosmic', 'stellar'], category: 'celestial' },
    { keyword: 'moon', translations: { jp: '月', en: 'moon' }, relatedRoots: ['luna', '月'], relatedKeywords: ['lunar', 'night', 'crescent'], category: 'celestial' },
    { keyword: 'sun', translations: { jp: '太陽', en: 'sun' }, relatedRoots: ['sol', '日'], relatedKeywords: ['solar', 'dawn', 'bright'], category: 'celestial' },
    { keyword: 'galaxy', translations: { jp: '銀河', en: 'galaxy' }, relatedRoots: ['nova', 'astra'], relatedKeywords: ['cosmic', 'space', 'universe'], category: 'celestial' },

    // 感情・概念
    { keyword: 'hope', translations: { jp: '希望', en: 'hope' }, relatedRoots: ['spero', '望'], relatedKeywords: ['wish', 'dream', 'faith'], category: 'emotion' },
    { keyword: 'strength', translations: { jp: '力', en: 'strength' }, relatedRoots: ['fort', '力'], relatedKeywords: ['power', 'might', 'strong'], category: 'emotion' },
    { keyword: 'wisdom', translations: { jp: '知恵', en: 'wisdom' }, relatedRoots: ['soph', '智'], relatedKeywords: ['wise', 'knowledge', 'sage'], category: 'emotion' },
    { keyword: 'love', translations: { jp: '愛', en: 'love' }, relatedRoots: ['amor', '愛'], relatedKeywords: ['heart', 'passion', 'care'], category: 'emotion' },
    { keyword: 'courage', translations: { jp: '勇気', en: 'courage' }, relatedRoots: ['fort', '勇'], relatedKeywords: ['brave', 'bold', 'valor'], category: 'emotion' },
    { keyword: 'solitude', translations: { jp: '孤独', en: 'solitude' }, relatedRoots: ['solo', '孤'], relatedKeywords: ['alone', 'lonely', 'silence'], category: 'emotion' },
    { keyword: 'death', translations: { jp: '死', en: 'death' }, relatedRoots: ['mort', '死'], relatedKeywords: ['end', 'dark', 'eternal'], category: 'emotion' },
    { keyword: 'life', translations: { jp: '生命', en: 'life' }, relatedRoots: ['vit', 'bio', '命'], relatedKeywords: ['living', 'vital', 'soul'], category: 'emotion' },
    { keyword: 'dream', translations: { jp: '夢', en: 'dream' }, relatedRoots: ['夢', '幻'], relatedKeywords: ['illusion', 'fantasy', 'vision'], category: 'emotion' },

    // 生物
    { keyword: 'dragon', translations: { jp: '龍', en: 'dragon' }, relatedRoots: ['draco', '龍'], relatedKeywords: ['serpent', 'beast', 'fire'], category: 'creature' },
    { keyword: 'wolf', translations: { jp: '狼', en: 'wolf' }, relatedRoots: ['lupus', '狼'], relatedKeywords: ['fang', 'pack', 'hunt'], category: 'creature' },
    { keyword: 'phoenix', translations: { jp: '不死鳥', en: 'phoenix' }, relatedRoots: ['phoenix', '鳳凰'], relatedKeywords: ['rebirth', 'fire', 'eternal'], category: 'creature' },
    { keyword: 'eagle', translations: { jp: '鷲', en: 'eagle' }, relatedRoots: ['aquila', '鷹'], relatedKeywords: ['sky', 'soar', 'king'], category: 'creature' },
    { keyword: 'snake', translations: { jp: '蛇', en: 'serpent' }, relatedRoots: ['serp', '蛇'], relatedKeywords: ['viper', 'coil', 'venom'], category: 'creature' },
    { keyword: 'raven', translations: { jp: '烏', en: 'raven' }, relatedRoots: ['bran', '烏'], relatedKeywords: ['crow', 'dark', 'omen'], category: 'creature' },

    // 時間・空間
    { keyword: 'eternity', translations: { jp: '永遠', en: 'eternity' }, relatedRoots: ['chrono', '永'], relatedKeywords: ['forever', 'endless', 'infinite'], category: 'time' },
    { keyword: 'dawn', translations: { jp: '夜明け', en: 'dawn' }, relatedRoots: ['sol', '暁'], relatedKeywords: ['sunrise', 'morning', 'new'], category: 'time' },
    { keyword: 'dusk', translations: { jp: '黄昏', en: 'dusk' }, relatedRoots: ['nox', '夕'], relatedKeywords: ['twilight', 'evening', 'sunset'], category: 'time' },
    { keyword: 'void', translations: { jp: '虚空', en: 'void' }, relatedRoots: ['void', '空'], relatedKeywords: ['empty', 'abyss', 'null'], category: 'time' },
];

// 意図: キーワード検索
export const searchByKeyword = (keyword: string): SemanticEntry[] => {
    const kw = keyword.toLowerCase();
    return semanticDictionary.filter(e =>
        e.keyword.includes(kw) ||
        e.translations.jp.includes(keyword) ||
        e.relatedKeywords.some(rk => rk.includes(kw))
    );
};

// 意図: UI翻訳データ
export const translations: Record<'jp' | 'en', Translations> = {
    jp: {
        title: 'NAME LAB',
        subtitle: '創造的命名エンジン',
        description: 'Fantasy・SF・和風の世界観で唯一無二の名前を召喚せよ',
        categoryFantasy: 'Fantasy',
        categorySF: 'SF',
        categoryJapanese: '和風',
        generateButton: '召喚する',
        bulkModeButton: '大量生成モード',
        singleModeButton: '通常モード',
        filterSyllables: '音節数',
        filterKeywords: 'キーワード',
        filterEnding: '語尾の母音',
        meaningLabel: '意味',
        originLabel: '語源',
        personalityLabel: '性格',
        copyButton: 'コピー',
        favoriteButton: 'お気に入り',
        exportCSV: 'CSV出力',
        searchPlaceholder: 'キーワードで検索（例: 火, 希望, 龍）',
        generating: '召喚中...',
        noResults: '名前が見つかりません',
        back: '← Saison Lab',
        adText: '広告スペース',
        personalityPowerful: '力強い',
        personalityElegant: '優雅',
        personalityMysterious: '神秘的',
        personalityGentle: '穏やか',
        personalityFierce: '獰猛',
        personalityWise: '賢明',
    },
    en: {
        title: 'NAME LAB',
        subtitle: 'Creative Naming Engine',
        description: 'Summon unique names in Fantasy, SF, or Japanese styles',
        categoryFantasy: 'Fantasy',
        categorySF: 'SF',
        categoryJapanese: 'Japanese',
        generateButton: 'Summon',
        bulkModeButton: 'Bulk Mode',
        singleModeButton: 'Single Mode',
        filterSyllables: 'Syllables',
        filterKeywords: 'Keywords',
        filterEnding: 'Ending vowel',
        meaningLabel: 'Meaning',
        originLabel: 'Origin',
        personalityLabel: 'Personality',
        copyButton: 'Copy',
        favoriteButton: 'Favorite',
        exportCSV: 'Export CSV',
        searchPlaceholder: 'Search by keyword (e.g., fire, hope, dragon)',
        generating: 'Summoning...',
        noResults: 'No names found',
        back: '← Saison Lab',
        adText: 'Advertisement',
        personalityPowerful: 'Powerful',
        personalityElegant: 'Elegant',
        personalityMysterious: 'Mysterious',
        personalityGentle: 'Gentle',
        personalityFierce: 'Fierce',
        personalityWise: 'Wise',
    },
};
