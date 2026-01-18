// NAME LAB - 型定義
// 意図: 命名エンジンの型安全性を確保

// 意図: 多言語テキスト
export interface LocalizedText {
    jp: string;
    en: string;
}

// 意図: 言語キー
export type Language = 'jp' | 'en';

// 意図: 世界観カテゴリ
export type WorldCategory = 'fantasy' | 'sf' | 'japanese';

// 意図: 名前の性格属性
export type NamePersonality = 'powerful' | 'elegant' | 'mysterious' | 'gentle' | 'fierce' | 'wise';

// 意図: 語根の起源
export type RootOrigin = 'latin' | 'greek' | 'japanese' | 'germanic' | 'celtic' | 'arabic' | 'sanskrit';

// 意図: 語根データ
export interface Root {
    root: string;
    origin: RootOrigin;
    meaning: LocalizedText;
    examples: string[];
    keywords: string[];
}

// 意図: 意味論エントリ
export interface SemanticEntry {
    keyword: string;
    translations: LocalizedText;
    relatedRoots: string[];
    relatedKeywords: string[];
    category: 'nature' | 'emotion' | 'creature' | 'celestial' | 'time';
}

// 意図: 生成された名前
export interface GeneratedName {
    name: string;
    reading?: string;
    meaning: LocalizedText;
    origin: RootOrigin[];
    personality: NamePersonality;
    color: HSLColor;
    syllables: number;
    keywords: string[];
    warnings?: string[];
}

// 意図: HSLカラー
export interface HSLColor {
    h: number;
    s: number;
    l: number;
}

// 意図: フィルター設定
export interface FilterSettings {
    syllableMin: number;
    syllableMax: number;
    endingVowel?: string;
    keywords: string[];
    excludePatterns: string[];
}

// 意図: UI翻訳
export interface Translations {
    title: string;
    subtitle: string;
    description: string;
    categoryFantasy: string;
    categorySF: string;
    categoryJapanese: string;
    generateButton: string;
    bulkModeButton: string;
    singleModeButton: string;
    filterSyllables: string;
    filterKeywords: string;
    filterEnding: string;
    meaningLabel: string;
    originLabel: string;
    personalityLabel: string;
    copyButton: string;
    favoriteButton: string;
    exportCSV: string;
    searchPlaceholder: string;
    generating: string;
    noResults: string;
    back: string;
    adText: string;
    personalityPowerful: string;
    personalityElegant: string;
    personalityMysterious: string;
    personalityGentle: string;
    personalityFierce: string;
    personalityWise: string;
}
