// RHYME LAB - 日本語韻検索ロジック
// 意図: ひらがな/カタカナを母音パターンに変換し、韻の一致度を計算する

export function katakanaToHiragana(str: string): string {
    return str.replace(/[\u30A1-\u30F6]/g, (char) => {
        return String.fromCharCode(char.charCodeAt(0) - 0x60);
    });
}

const HIRAGANA_TO_VOWEL: Record<string, string> = {
    'あ': 'a', 'い': 'i', 'う': 'u', 'え': 'e', 'お': 'o',
    'か': 'a', 'き': 'i', 'く': 'u', 'け': 'e', 'こ': 'o',
    'が': 'a', 'ぎ': 'i', 'ぐ': 'u', 'げ': 'e', 'ご': 'o',
    'さ': 'a', 'し': 'i', 'す': 'u', 'せ': 'e', 'そ': 'o',
    'ざ': 'a', 'じ': 'i', 'ず': 'u', 'ぜ': 'e', 'ぞ': 'o',
    'た': 'a', 'ち': 'i', 'つ': 'u', 'て': 'e', 'と': 'o',
    'だ': 'a', 'ぢ': 'i', 'づ': 'u', 'で': 'e', 'ど': 'o',
    'な': 'a', 'に': 'i', 'ぬ': 'u', 'ね': 'e', 'の': 'o',
    'は': 'a', 'ひ': 'i', 'ふ': 'u', 'へ': 'e', 'ほ': 'o',
    'ば': 'a', 'び': 'i', 'ぶ': 'u', 'べ': 'e', 'ぼ': 'o',
    'ぱ': 'a', 'ぴ': 'i', 'ぷ': 'u', 'ぺ': 'e', 'ぽ': 'o',
    'ま': 'a', 'み': 'i', 'む': 'u', 'め': 'e', 'も': 'o',
    'や': 'a', 'ゆ': 'u', 'よ': 'o',
    'ら': 'a', 'り': 'i', 'る': 'u', 'れ': 'e', 'ろ': 'o',
    'わ': 'a', 'を': 'o', 'ん': 'n',
    'ゃ': 'a', 'ゅ': 'u', 'ょ': 'o',
    'っ': '', 'ー': '',
    'ぁ': 'a', 'ぃ': 'i', 'ぅ': 'u', 'ぇ': 'e', 'ぉ': 'o',
};

export function extractVowelPattern(input: string): string {
    const hiragana = katakanaToHiragana(input);
    let vowels = '';
    for (const char of hiragana) {
        const vowel = HIRAGANA_TO_VOWEL[char];
        if (vowel !== undefined) vowels += vowel;
    }
    return vowels;
}

export function calculateRhymeScore(pattern1: string, pattern2: string): number {
    if (!pattern1 || !pattern2) return 0;
    let score = 0;
    const len1 = pattern1.length;
    const len2 = pattern2.length;
    const minLen = Math.min(len1, len2);
    for (let i = 0; i < minLen; i++) {
        if (pattern1[len1 - 1 - i] === pattern2[len2 - 1 - i]) {
            score++;
        } else {
            break;
        }
    }
    return score;
}

export type RhymeMatchType = 'perfect' | 'similar' | 'partial';

export function getRhymeMatchType(score: number, patternLength: number): RhymeMatchType {
    if (score >= patternLength && score >= 2) return 'perfect';
    if (score >= 2) return 'similar';
    return 'partial';
}

export interface RhymeResult {
    word: string;
    reading: string;
    vowelPattern: string;
    score: number;
    matchType: RhymeMatchType;
}

export function findRhymes(
    inputPattern: string,
    dictionary: Array<{ word: string; reading: string }>,
    limit: number = 10
): RhymeResult[] {
    if (!inputPattern) return [];
    const results: RhymeResult[] = [];
    for (const entry of dictionary) {
        const entryPattern = extractVowelPattern(entry.reading);
        const score = calculateRhymeScore(inputPattern, entryPattern);
        if (score >= 2) {
            results.push({
                word: entry.word,
                reading: entry.reading,
                vowelPattern: entryPattern,
                score,
                matchType: getRhymeMatchType(score, inputPattern.length),
            });
        }
    }
    results.sort((a, b) => b.score - a.score);
    return results.slice(0, limit);
}
