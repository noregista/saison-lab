// RHYME LAB - 統合韻検索エンジン
// 意図: 日本語と英語の韻検索を統合して提供

import { extractVowelPattern, findRhymes, RhymeResult } from './japaneseRhyme';
import { fetchEnglishRhymes, EnglishRhymeResult } from './englishRhyme';
import { JAPANESE_DICTIONARY } from './dictionary';

export type Language = 'jp' | 'en';

export interface UnifiedRhymeResult {
    word: string;
    reading?: string;
    vowelPattern?: string;
    score: number;
    matchType: 'perfect' | 'similar' | 'partial';
}

/**
 * 入力が日本語か英語かを判定
 * 意図: ひらがな/カタカナ/漢字が含まれていれば日本語と判定
 */
export function detectLanguage(input: string): Language {
    const japaneseRegex = /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/;
    return japaneseRegex.test(input) ? 'jp' : 'en';
}

/**
 * 韻検索を実行
 * 意図: 言語に応じて適切なエンジンを呼び出す
 */
export async function searchRhymes(
    input: string,
    limit: number = 10
): Promise<{ results: UnifiedRhymeResult[]; language: Language; inputPattern?: string }> {
    const trimmedInput = input.trim();
    if (!trimmedInput) {
        return { results: [], language: 'jp' };
    }

    const language = detectLanguage(trimmedInput);

    if (language === 'jp') {
        const inputPattern = extractVowelPattern(trimmedInput);
        const results = findRhymes(inputPattern, JAPANESE_DICTIONARY, limit);
        return {
            results: results.map(r => ({
                word: r.word,
                reading: r.reading,
                vowelPattern: r.vowelPattern,
                score: r.score,
                matchType: r.matchType,
            })),
            language,
            inputPattern,
        };
    } else {
        const englishResults = await fetchEnglishRhymes(trimmedInput, limit);
        return {
            results: englishResults.map((r, idx) => ({
                word: r.word,
                score: r.score,
                matchType: idx < 3 ? 'perfect' : idx < 7 ? 'similar' : 'partial',
            })),
            language,
        };
    }
}
