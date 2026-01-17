// KANJI LAB - kanjiapi.dev API クライアント
// 意図: kanjiapi.dev への API 呼び出しを一元管理し、エラーハンドリングとキャッシュを提供

import { KanjiDetail, ReadingSearchResult, KanjiWord } from '../types/kanji';

const API_BASE_URL = 'https://kanjiapi.dev/v1';

// 意図: シンプルなメモリキャッシュでAPI呼び出しを最適化
const cache = new Map<string, { data: unknown; timestamp: number }>();
const CACHE_TTL = 1000 * 60 * 30; // 30分

/**
 * キャッシュ付きフェッチ関数
 * 意図: 同じリクエストの重複を防ぎ、パフォーマンスを向上
 */
async function fetchWithCache<T>(url: string): Promise<T> {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data as T;
  }

  const response = await fetch(url);
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('NOT_FOUND');
    }
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  cache.set(url, { data, timestamp: Date.now() });
  return data as T;
}

/**
 * 漢字詳細を取得
 * 意図: 単一の漢字の詳細情報（読み、意味、画数など）を取得
 */
export async function getKanjiDetail(kanji: string): Promise<KanjiDetail> {
  return fetchWithCache<KanjiDetail>(`${API_BASE_URL}/kanji/${encodeURIComponent(kanji)}`);
}

/**
 * 読みから漢字を検索
 * 意図: ひらがな/カタカナの読みから該当する漢字リストを取得
 */
export async function searchByReading(reading: string): Promise<ReadingSearchResult> {
  return fetchWithCache<ReadingSearchResult>(`${API_BASE_URL}/reading/${encodeURIComponent(reading)}`);
}

/**
 * 漢字の熟語を取得
 * 意図: 指定した漢字を含む熟語リストを取得
 */
export async function getKanjiWords(kanji: string): Promise<KanjiWord[]> {
  return fetchWithCache<KanjiWord[]>(`${API_BASE_URL}/words/${encodeURIComponent(kanji)}`);
}

/**
 * 学年別の漢字リストを取得
 * 意図: 小学校1-6年で学ぶ漢字をグレード別に取得
 */
export async function getKanjiByGrade(grade: number): Promise<string[]> {
  if (grade < 1 || grade > 6) {
    throw new Error('Grade must be between 1 and 6');
  }
  return fetchWithCache<string[]>(`${API_BASE_URL}/kanji/grade-${grade}`);
}

/**
 * JLPTレベル別の漢字リストを取得
 * 意図: JLPT N5-N1 レベルの漢字を取得
 */
export async function getKanjiByJlpt(level: number): Promise<string[]> {
  if (level < 1 || level > 5) {
    throw new Error('JLPT level must be between 1 and 5');
  }
  return fetchWithCache<string[]>(`${API_BASE_URL}/kanji/jlpt-${level}`);
}

/**
 * 全常用漢字リストを取得
 * 意図: 常用漢字（約2,136字）のリストを取得
 */
export async function getAllJoyoKanji(): Promise<string[]> {
  return fetchWithCache<string[]>(`${API_BASE_URL}/kanji/joyo`);
}

/**
 * 全人名用漢字リストを取得
 * 意図: 人名用漢字のリストを取得
 */
export async function getAllJinmeiyoKanji(): Promise<string[]> {
  return fetchWithCache<string[]>(`${API_BASE_URL}/kanji/jinmeiyo`);
}

/**
 * 複数の漢字の詳細を一括取得
 * 意図: 検索結果表示時に複数漢字の情報を効率的に取得
 */
export async function getMultipleKanjiDetails(kanjiList: string[]): Promise<KanjiDetail[]> {
  const promises = kanjiList.map(kanji => 
    getKanjiDetail(kanji).catch(() => null)
  );
  const results = await Promise.all(promises);
  return results.filter((r): r is KanjiDetail => r !== null);
}

/**
 * 入力文字列が漢字かどうかを判定
 * 意図: 検索入力のタイプを判別して適切なAPI呼び出しを選択
 */
export function isKanji(char: string): boolean {
  const code = char.charCodeAt(0);
  // CJK統合漢字の範囲
  return (code >= 0x4e00 && code <= 0x9faf) ||
         (code >= 0x3400 && code <= 0x4dbf) ||
         (code >= 0x20000 && code <= 0x2a6df);
}

/**
 * 入力文字列がひらがなかどうかを判定
 */
export function isHiragana(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x3040 && code <= 0x309f;
}

/**
 * 入力文字列がカタカナかどうかを判定
 */
export function isKatakana(char: string): boolean {
  const code = char.charCodeAt(0);
  return code >= 0x30a0 && code <= 0x30ff;
}

/**
 * カタカナをひらがなに変換
 * 意図: API検索用に入力を正規化
 */
export function katakanaToHiragana(str: string): string {
  return str.replace(/[\u30a1-\u30f6]/g, (match) =>
    String.fromCharCode(match.charCodeAt(0) - 0x60)
  );
}
