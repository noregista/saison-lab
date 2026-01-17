// RHYME LAB - 英語韻検索ロジック（Datamuse API連携）
// 意図: Datamuse APIを使用して英語の韻を検索

export interface EnglishRhymeResult {
    word: string;
    score: number;
}

/**
 * Datamuse APIで英語の韻を検索
 * 意図: 無料・無認証のAPIで英語の完全韻を取得
 */
export async function fetchEnglishRhymes(
    word: string,
    limit: number = 10
): Promise<EnglishRhymeResult[]> {
    if (!word.trim()) return [];

    try {
        const url = `https://api.datamuse.com/words?rel_rhy=${encodeURIComponent(word)}&max=${limit}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }

        const data: Array<{ word: string; score: number }> = await response.json();
        return data.map(item => ({
            word: item.word,
            score: item.score,
        }));
    } catch (error) {
        console.error('Failed to fetch English rhymes:', error);
        return [];
    }
}
