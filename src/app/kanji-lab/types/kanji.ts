// KANJI LAB - TypeScript型定義
// 意図: kanjiapi.dev のレスポンス形式に準拠した型を定義

/**
 * 漢字詳細情報
 * kanjiapi.dev /v1/kanji/{character} のレスポンス形式
 */
export interface KanjiDetail {
  /** 漢字一文字 */
  kanji: string;
  /** 学年 (1-6, または null) */
  grade: number | null;
  /** 画数 */
  stroke_count: number;
  /** 英語での意味リスト */
  meanings: string[];
  /** 音読みリスト */
  kun_readings: string[];
  /** 訓読みリスト */
  on_readings: string[];
  /** 名前での読みリスト */
  name_readings: string[];
  /** JLPTレベル (1-5, または null) */
  jlpt: number | null;
  /** Unicode コードポイント */
  unicode: string;
  /** ヘボン式ローマ字（追加情報） */
  heisig_en?: string;
}

/**
 * 読み検索結果
 * kanjiapi.dev /v1/reading/{reading} のレスポンス形式
 */
export interface ReadingSearchResult {
  /** 検索した読み */
  reading: string;
  /** 該当する漢字の主要な読みとするもの */
  main_kanji: string[];
  /** 該当する漢字の名前読み */
  name_kanji: string[];
}

/**
 * 熟語情報
 * kanjiapi.dev /v1/words/{character} のレスポンス形式
 */
export interface KanjiWord {
  /** 表記バリアント */
  variants: {
    written: string;
    pronounced: string;
    priorities: string[];
  }[];
  /** 意味リスト */
  meanings: {
    glosses: string[];
  }[];
}

/**
 * 部首情報
 */
export interface Radical {
  /** 部首番号 (1-214) */
  number: number;
  /** 部首文字 */
  radical: string;
  /** 部首名（日本語） */
  name_jp: string;
  /** 部首名（英語） */
  name_en: string;
  /** 画数 */
  strokes: number;
}

/**
 * 検索フィルター状態
 */
export interface SearchFilters {
  /** 検索クエリ（読みまたは漢字） */
  query: string;
  /** 画数フィルター (null で無効) */
  strokeCount: number | null;
  /** 選択された部首 (null で無効) */
  radical: string | null;
  /** JLPTレベルフィルター (null で無効) */
  jlptLevel: number | null;
  /** 学年フィルター (null で無効) */
  grade: number | null;
}

/**
 * API呼び出し状態
 */
export interface ApiState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * 言語設定
 */
export type Language = 'jp' | 'en';

/**
 * 翻訳テキスト
 */
export interface Translations {
  title: string;
  subtitle: string;
  description: string;
  searchPlaceholder: string;
  strokeCount: string;
  radical: string;
  jlptLevel: string;
  grade: string;
  meanings: string;
  kunReadings: string;
  onReadings: string;
  words: string;
  strokeOrder: string;
  noResults: string;
  loading: string;
  back: string;
  all: string;
  gradePrefix: string;
  adText: string;
}
