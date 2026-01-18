// FRUIT LAB - 型定義
// 意図: フルーツデータの型安全性を確保するための型定義

// 意図: 多言語テキスト用の型
export interface LocalizedText {
    jp: string;
    en: string;
}

// 意図: 言語切替用のキー
export type Language = 'jp' | 'en';

// 意図: フルーツカテゴリの分類
export type FruitCategory = 'citrus' | 'tropical' | 'berry' | 'pome' | 'stone' | 'other';

// 意図: 輸出国データの構造
export interface ExportCountry {
    code: string;           // ISO 3166-1 alpha-2 国コード
    name: LocalizedText;    // 国名（日英）
    tonnes: number;         // 輸出量（トン）
    percentage: number;     // 世界シェア（%）
}

// 意図: 輸出データの構造
export interface ExportData {
    year: number;                       // 統計基準年
    totalGlobalTonnes: number;          // 世界総輸出量
    topCountries: ExportCountry[];      // 上位輸出国
}

// 意図: 栄養成分データ（100gあたり）
export interface NutritionData {
    calories: number;       // カロリー（kcal）
    sugar: number;          // 糖質（g）
    fiber: number;          // 食物繊維（g）
    vitaminC: number;       // ビタミンC（mg）
}

// 意図: 旬の時期データ
export interface SeasonData {
    northern: string[];     // 北半球の旬（月名）
    southern: string[];     // 南半球の旬（月名）
}

// 意図: フルーツのメインデータ構造
export interface Fruit {
    id: string;                         // ユニークID
    name: LocalizedText;                // フルーツ名
    scientificName: string;             // 学名
    family: LocalizedText;              // 科名
    category: FruitCategory;            // カテゴリ
    emoji: string;                      // 絵文字アイコン
    color: string;                      // テーマカラー（HEX）
    origin: LocalizedText[];            // 原産地
    season: SeasonData;                 // 旬の時期
    description: LocalizedText;         // 特徴説明
    nutrition: NutritionData;           // 栄養成分
    exportData: ExportData;             // 輸出統計
    imageUrl: string;                   // 画像パス
}

// 意図: UI翻訳テキストの型
export interface Translations {
    title: string;
    subtitle: string;
    description: string;
    searchPlaceholder: string;
    filterAll: string;
    filterCitrus: string;
    filterTropical: string;
    filterBerry: string;
    filterPome: string;
    filterStone: string;
    filterOther: string;
    exportRanking: string;
    exportYear: string;
    lastUpdated: string;
    calories: string;
    sugar: string;
    fiber: string;
    vitaminC: string;
    season: string;
    scientific: string;
    family: string;
    origin: string;
    topExporters: string;
    worldShare: string;
    tonnes: string;
    compare: string;
    back: string;
    adText: string;
    privacy: string;
    disclaimer: string;
}
