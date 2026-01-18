// NAME LAB - 語根辞書
// 意図: 各言語・文化圏の語根データベース

import { Root } from './types';

// 意図: Fantasy向け語根（ラテン語、ギリシャ語、ケルト語系）
export const fantasyRoots: Root[] = [
    // 自然要素
    { root: 'ignis', origin: 'latin', meaning: { jp: '炎', en: 'fire' }, examples: ['Ignar', 'Ignael'], keywords: ['fire', 'flame', '炎', '火'] },
    { root: 'pyr', origin: 'greek', meaning: { jp: '炎', en: 'fire' }, examples: ['Pyros', 'Pyriel'], keywords: ['fire', '炎'] },
    { root: 'aqua', origin: 'latin', meaning: { jp: '水', en: 'water' }, examples: ['Aquaris', 'Aquiel'], keywords: ['water', '水'] },
    { root: 'hydro', origin: 'greek', meaning: { jp: '水', en: 'water' }, examples: ['Hydria', 'Hydron'], keywords: ['water', '水'] },
    { root: 'terra', origin: 'latin', meaning: { jp: '大地', en: 'earth' }, examples: ['Terran', 'Terrael'], keywords: ['earth', 'land', '地', '大地'] },
    { root: 'aer', origin: 'latin', meaning: { jp: '風/空気', en: 'air' }, examples: ['Aeris', 'Aerion'], keywords: ['wind', 'air', '風', '空'] },
    { root: 'zephyr', origin: 'greek', meaning: { jp: '西風', en: 'west wind' }, examples: ['Zephyros', 'Zephira'], keywords: ['wind', '風'] },
    { root: 'lux', origin: 'latin', meaning: { jp: '光', en: 'light' }, examples: ['Luxia', 'Luxor'], keywords: ['light', '光'] },
    { root: 'nox', origin: 'latin', meaning: { jp: '夜/闇', en: 'night' }, examples: ['Noxis', 'Noxiel'], keywords: ['night', 'dark', '夜', '闇'] },
    { root: 'umbra', origin: 'latin', meaning: { jp: '影', en: 'shadow' }, examples: ['Umbris', 'Umbral'], keywords: ['shadow', '影'] },
    { root: 'stella', origin: 'latin', meaning: { jp: '星', en: 'star' }, examples: ['Stellara', 'Stellion'], keywords: ['star', '星'] },
    { root: 'luna', origin: 'latin', meaning: { jp: '月', en: 'moon' }, examples: ['Lunara', 'Lunael'], keywords: ['moon', '月'] },
    { root: 'sol', origin: 'latin', meaning: { jp: '太陽', en: 'sun' }, examples: ['Solaris', 'Solion'], keywords: ['sun', '太陽'] },
    // 感情・概念
    { root: 'spero', origin: 'latin', meaning: { jp: '希望', en: 'hope' }, examples: ['Spera', 'Esperion'], keywords: ['hope', '希望'] },
    { root: 'fort', origin: 'latin', meaning: { jp: '強さ', en: 'strength' }, examples: ['Fortis', 'Fortael'], keywords: ['strength', 'power', '力', '強'] },
    { root: 'soph', origin: 'greek', meaning: { jp: '知恵', en: 'wisdom' }, examples: ['Sophia', 'Sophiel'], keywords: ['wisdom', 'wise', '知恵', '賢'] },
    { root: 'amor', origin: 'latin', meaning: { jp: '愛', en: 'love' }, examples: ['Amoria', 'Amoris'], keywords: ['love', '愛'] },
    { root: 'vit', origin: 'latin', meaning: { jp: '生命', en: 'life' }, examples: ['Vitara', 'Vitalion'], keywords: ['life', 'vital', '生命', '命'] },
    { root: 'mort', origin: 'latin', meaning: { jp: '死', en: 'death' }, examples: ['Mortis', 'Mortael'], keywords: ['death', '死'] },
    // 生物
    { root: 'draco', origin: 'latin', meaning: { jp: '龍', en: 'dragon' }, examples: ['Dracon', 'Dracael'], keywords: ['dragon', '龍', 'ドラゴン'] },
    { root: 'lupus', origin: 'latin', meaning: { jp: '狼', en: 'wolf' }, examples: ['Lupis', 'Lupael'], keywords: ['wolf', '狼'] },
    { root: 'aquila', origin: 'latin', meaning: { jp: '鷲', en: 'eagle' }, examples: ['Aquilon', 'Aquilara'], keywords: ['eagle', '鷲'] },
    { root: 'phoenix', origin: 'greek', meaning: { jp: '不死鳥', en: 'phoenix' }, examples: ['Phoenia', 'Phoenixis'], keywords: ['phoenix', '不死鳥', '鳳凰'] },
    { root: 'serp', origin: 'latin', meaning: { jp: '蛇', en: 'serpent' }, examples: ['Serpius', 'Serpael'], keywords: ['serpent', 'snake', '蛇'] },
    // ケルト系
    { root: 'cael', origin: 'celtic', meaning: { jp: '天/空', en: 'heaven/sky' }, examples: ['Caelum', 'Caelia'], keywords: ['sky', 'heaven', '天', '空'] },
    { root: 'bran', origin: 'celtic', meaning: { jp: '烏', en: 'raven' }, examples: ['Branwen', 'Branor'], keywords: ['raven', 'crow', '烏'] },
    { root: 'mael', origin: 'celtic', meaning: { jp: '王子', en: 'prince' }, examples: ['Maelorn', 'Maelia'], keywords: ['prince', 'noble', '王子'] },
    { root: 'fae', origin: 'celtic', meaning: { jp: '妖精', en: 'fairy' }, examples: ['Faelyn', 'Faeris'], keywords: ['fairy', 'fae', '妖精'] },
];

// 意図: SF向け語根（ギリシャ語、造語系）
export const sfRoots: Root[] = [
    { root: 'neo', origin: 'greek', meaning: { jp: '新しい', en: 'new' }, examples: ['Neon', 'Neora'], keywords: ['new', '新'] },
    { root: 'cyber', origin: 'greek', meaning: { jp: '電脳', en: 'cyber' }, examples: ['Cyberix', 'Cybera'], keywords: ['cyber', 'digital', '電脳'] },
    { root: 'tech', origin: 'greek', meaning: { jp: '技術', en: 'technology' }, examples: ['Techna', 'Technos'], keywords: ['tech', '技術'] },
    { root: 'quantum', origin: 'latin', meaning: { jp: '量子', en: 'quantum' }, examples: ['Quantis', 'Quantara'], keywords: ['quantum', '量子'] },
    { root: 'nova', origin: 'latin', meaning: { jp: '新星', en: 'nova' }, examples: ['Novara', 'Novarix'], keywords: ['nova', 'star', '新星'] },
    { root: 'helix', origin: 'greek', meaning: { jp: '螺旋', en: 'helix' }, examples: ['Helixia', 'Helixon'], keywords: ['helix', 'spiral', '螺旋'] },
    { root: 'nexus', origin: 'latin', meaning: { jp: '結節点', en: 'nexus' }, examples: ['Nexara', 'Nexion'], keywords: ['nexus', 'link', '接続'] },
    { root: 'proto', origin: 'greek', meaning: { jp: '原初', en: 'proto' }, examples: ['Proteus', 'Protara'], keywords: ['proto', 'first', '原初'] },
    { root: 'astra', origin: 'latin', meaning: { jp: '星', en: 'star' }, examples: ['Astraea', 'Astrion'], keywords: ['star', 'astral', '星'] },
    { root: 'void', origin: 'latin', meaning: { jp: '虚空', en: 'void' }, examples: ['Voidra', 'Voidex'], keywords: ['void', 'empty', '虚空'] },
    { root: 'chrono', origin: 'greek', meaning: { jp: '時間', en: 'time' }, examples: ['Chronos', 'Chronara'], keywords: ['time', '時間'] },
    { root: 'nano', origin: 'greek', meaning: { jp: '極小', en: 'nano' }, examples: ['Nanora', 'Nanex'], keywords: ['nano', 'small', '極小'] },
    { root: 'synth', origin: 'greek', meaning: { jp: '合成', en: 'synthesis' }, examples: ['Synthia', 'Synthex'], keywords: ['synth', '合成'] },
    { root: 'bio', origin: 'greek', meaning: { jp: '生命', en: 'life' }, examples: ['Biora', 'Bionix'], keywords: ['bio', 'life', '生命'] },
    { root: 'core', origin: 'latin', meaning: { jp: '核心', en: 'core' }, examples: ['Corex', 'Corael'], keywords: ['core', '核'] },
    { root: 'data', origin: 'latin', meaning: { jp: 'データ', en: 'data' }, examples: ['Datara', 'Datrix'], keywords: ['data', 'データ'] },
    { root: 'zero', origin: 'arabic', meaning: { jp: '零', en: 'zero' }, examples: ['Zerox', 'Zerael'], keywords: ['zero', '零'] },
    { root: 'ion', origin: 'greek', meaning: { jp: 'イオン', en: 'ion' }, examples: ['Ionara', 'Ionex'], keywords: ['ion', 'イオン'] },
];

// 意図: 和風向け語根（日本語系）
export const japaneseRoots: Root[] = [
    // 自然
    { root: '風', origin: 'japanese', meaning: { jp: '風', en: 'wind' }, examples: ['風雅', '疾風'], keywords: ['wind', '風'] },
    { root: '月', origin: 'japanese', meaning: { jp: '月', en: 'moon' }, examples: ['月影', '皓月'], keywords: ['moon', '月'] },
    { root: '雪', origin: 'japanese', meaning: { jp: '雪', en: 'snow' }, examples: ['雪華', '初雪'], keywords: ['snow', '雪'] },
    { root: '花', origin: 'japanese', meaning: { jp: '花', en: 'flower' }, examples: ['花鶴', '桜花'], keywords: ['flower', '花'] },
    { root: '雲', origin: 'japanese', meaning: { jp: '雲', en: 'cloud' }, examples: ['雲海', '白雲'], keywords: ['cloud', '雲'] },
    { root: '影', origin: 'japanese', meaning: { jp: '影', en: 'shadow' }, examples: ['影月', '黒影'], keywords: ['shadow', '影'] },
    { root: '光', origin: 'japanese', meaning: { jp: '光', en: 'light' }, examples: ['光輝', '閃光'], keywords: ['light', '光'] },
    { root: '炎', origin: 'japanese', meaning: { jp: '炎', en: 'flame' }, examples: ['炎舞', '紅炎'], keywords: ['flame', 'fire', '炎'] },
    { root: '氷', origin: 'japanese', meaning: { jp: '氷', en: 'ice' }, examples: ['氷華', '氷鏡'], keywords: ['ice', '氷'] },
    { root: '雷', origin: 'japanese', meaning: { jp: '雷', en: 'thunder' }, examples: ['雷鳴', '迅雷'], keywords: ['thunder', '雷'] },
    // 概念
    { root: '夢', origin: 'japanese', meaning: { jp: '夢', en: 'dream' }, examples: ['夢幻', '白夢'], keywords: ['dream', '夢'] },
    { root: '幻', origin: 'japanese', meaning: { jp: '幻', en: 'illusion' }, examples: ['幻影', '幻想'], keywords: ['illusion', '幻'] },
    { root: '刃', origin: 'japanese', meaning: { jp: '刃', en: 'blade' }, examples: ['刃鬼', '銀刃'], keywords: ['blade', 'sword', '刃', '剣'] },
    { root: '鬼', origin: 'japanese', meaning: { jp: '鬼', en: 'demon' }, examples: ['鬼月', '羅刹'], keywords: ['demon', 'oni', '鬼'] },
    { root: '神', origin: 'japanese', meaning: { jp: '神', en: 'god/divine' }, examples: ['神威', '神楽'], keywords: ['god', 'divine', '神'] },
    { root: '魂', origin: 'japanese', meaning: { jp: '魂', en: 'soul' }, examples: ['魂魄', '闘魂'], keywords: ['soul', 'spirit', '魂'] },
    { root: '蓮', origin: 'japanese', meaning: { jp: '蓮', en: 'lotus' }, examples: ['蓮華', '白蓮'], keywords: ['lotus', '蓮'] },
    { root: '桜', origin: 'japanese', meaning: { jp: '桜', en: 'cherry blossom' }, examples: ['桜花', '夜桜'], keywords: ['cherry', 'sakura', '桜'] },
    { root: '龍', origin: 'japanese', meaning: { jp: '龍', en: 'dragon' }, examples: ['龍神', '青龍'], keywords: ['dragon', '龍'] },
    { root: '鶴', origin: 'japanese', meaning: { jp: '鶴', en: 'crane' }, examples: ['鶴姫', '白鶴'], keywords: ['crane', '鶴'] },
];

// 意図: 全語根を取得
export const getAllRoots = (category: 'fantasy' | 'sf' | 'japanese'): Root[] => {
    switch (category) {
        case 'fantasy': return fantasyRoots;
        case 'sf': return sfRoots;
        case 'japanese': return japaneseRoots;
    }
};

// 意図: キーワードで語根を検索
export const searchRootsByKeyword = (keyword: string, category: 'fantasy' | 'sf' | 'japanese'): Root[] => {
    const roots = getAllRoots(category);
    const kw = keyword.toLowerCase();
    return roots.filter(r =>
        r.keywords.some(k => k.toLowerCase().includes(kw)) ||
        r.meaning.jp.includes(keyword) ||
        r.meaning.en.toLowerCase().includes(kw)
    );
};
