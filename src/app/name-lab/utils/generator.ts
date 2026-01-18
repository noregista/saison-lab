// NAME LAB - 名前生成ロジック
// 意図: 語根を組み合わせて名前を生成

import { WorldCategory, GeneratedName, FilterSettings, RootOrigin, LocalizedText } from '../data/types';
import { fantasyRoots, sfRoots, japaneseRoots, searchRootsByKeyword } from '../data/roots';
import { searchByKeyword } from '../data/semantics';
import { validateName } from '../data/negativeCheck';
import { nameToColor, guessPersonality } from './colorMapper';

// 意図: Fantasy用接尾辞
const fantasySuffixes = ['is', 'el', 'ara', 'ion', 'iel', 'or', 'ia', 'ius', 'ael', 'wen', 'orn', 'yn'];
const fantasySuffixesForPrefix = ['ar', 'on', 'us', 'a', 'ra', 'ris', 'rex'];

// 意図: SF用接尾辞
const sfSuffixes = ['x', 'ex', 'ix', 'on', 'ara', 'rix', 'ion', 'os', 'a', 'ius'];
const sfPrefixes = ['neo-', 'cyber-', 'proto-', 'hyper-', 'ultra-', 'meta-', 'delta-', 'sigma-'];

// 意図: 和風用修飾
const japaneseModifiers = ['真', '白', '紅', '蒼', '黒', '銀', '金', '緋', '翠'];
const japaneseEndings = ['丸', '姫', '王', '神', '鬼', ''];

// 意図: 音節数を計算
const countSyllables = (name: string): number => {
    // 名前の母音数で近似
    const vowels = name.match(/[aiueoAIUEO]/gi) || [];
    return Math.max(1, vowels.length);
};

// 意図: Fantasy名を生成
const generateFantasyName = (keyword?: string): GeneratedName[] => {
    const results: GeneratedName[] = [];
    const roots = keyword ? searchRootsByKeyword(keyword, 'fantasy') : fantasyRoots;
    const usedRoots = roots.length > 0 ? roots : fantasyRoots.slice(0, 5);

    for (const root of usedRoots.slice(0, 10)) {
        // 語根 + 接尾辞
        for (const suffix of fantasySuffixes.slice(0, 3)) {
            const baseName = root.root.replace(/[^a-zA-Z]/g, '');
            if (baseName.length < 2) continue;

            const name = capitalize(baseName) + suffix;
            const validation = validateName(name);

            if (validation.valid) {
                results.push({
                    name,
                    meaning: root.meaning,
                    origin: [root.origin],
                    personality: guessPersonality(name),
                    color: nameToColor(name),
                    syllables: countSyllables(name),
                    keywords: root.keywords,
                    warnings: validation.warnings.length > 0 ? validation.warnings : undefined,
                });
            }
        }
    }

    return results;
};

// 意図: SF名を生成
const generateSFName = (keyword?: string): GeneratedName[] => {
    const results: GeneratedName[] = [];
    const roots = keyword ? searchRootsByKeyword(keyword, 'sf') : sfRoots;
    const usedRoots = roots.length > 0 ? roots : sfRoots.slice(0, 5);

    for (const root of usedRoots.slice(0, 10)) {
        // 語根 + SF接尾辞
        for (const suffix of sfSuffixes.slice(0, 2)) {
            const baseName = root.root.replace(/[^a-zA-Z]/g, '');
            if (baseName.length < 2) continue;

            const name = capitalize(baseName) + suffix;
            const validation = validateName(name);

            if (validation.valid) {
                results.push({
                    name,
                    meaning: root.meaning,
                    origin: [root.origin],
                    personality: guessPersonality(name),
                    color: nameToColor(name),
                    syllables: countSyllables(name),
                    keywords: root.keywords,
                    warnings: validation.warnings.length > 0 ? validation.warnings : undefined,
                });
            }
        }

        // プレフィックス + 語根
        const prefix = sfPrefixes[Math.floor(Math.random() * sfPrefixes.length)];
        const baseName = root.root.replace(/[^a-zA-Z]/g, '');
        if (baseName.length >= 2) {
            const name = prefix + capitalize(baseName);
            const validation = validateName(name);

            if (validation.valid) {
                results.push({
                    name,
                    meaning: root.meaning,
                    origin: [root.origin],
                    personality: guessPersonality(name),
                    color: nameToColor(name),
                    syllables: countSyllables(name),
                    keywords: root.keywords,
                    warnings: validation.warnings.length > 0 ? validation.warnings : undefined,
                });
            }
        }
    }

    return results;
};

// 意図: 和風名を生成
const generateJapaneseName = (keyword?: string): GeneratedName[] => {
    const results: GeneratedName[] = [];
    const roots = keyword ? searchRootsByKeyword(keyword, 'japanese') : japaneseRoots;
    const usedRoots = roots.length > 0 ? roots : japaneseRoots.slice(0, 5);

    for (const root of usedRoots.slice(0, 10)) {
        // 修飾語 + 語根
        for (const modifier of japaneseModifiers.slice(0, 3)) {
            const name = modifier + root.root;

            results.push({
                name,
                reading: getJapaneseReading(name),
                meaning: root.meaning,
                origin: ['japanese'],
                personality: guessPersonality(name),
                color: nameToColor(name),
                syllables: name.length,
                keywords: root.keywords,
            });
        }

        // 語根 + 接尾
        for (const ending of japaneseEndings.slice(0, 2)) {
            if (!ending) continue;
            const name = root.root + ending;

            results.push({
                name,
                reading: getJapaneseReading(name),
                meaning: root.meaning,
                origin: ['japanese'],
                personality: guessPersonality(name),
                color: nameToColor(name),
                syllables: name.length,
                keywords: root.keywords,
            });
        }
    }

    return results;
};

// 意図: 日本語の読みを推定（簡易版）
const getJapaneseReading = (name: string): string => {
    // 実際にはIMEや辞書APIを使用するのが望ましい
    return name;
};

// 意図: 先頭を大文字に
const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// 意図: フィルタを適用
const applyFilters = (names: GeneratedName[], filters: FilterSettings): GeneratedName[] => {
    return names.filter(n => {
        // 音節数フィルタ
        if (n.syllables < filters.syllableMin || n.syllables > filters.syllableMax) {
            return false;
        }

        // 語尾母音フィルタ
        if (filters.endingVowel) {
            const lastChar = n.name.slice(-1).toLowerCase();
            if (lastChar !== filters.endingVowel.toLowerCase()) {
                return false;
            }
        }

        // 除外パターン
        for (const pattern of filters.excludePatterns) {
            if (n.name.toLowerCase().includes(pattern.toLowerCase())) {
                return false;
            }
        }

        return true;
    });
};

// 意図: 重複を除去
const removeDuplicates = (names: GeneratedName[]): GeneratedName[] => {
    const seen = new Set<string>();
    return names.filter(n => {
        const key = n.name.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
    });
};

// 意図: メイン生成関数
export const generateNames = (
    category: WorldCategory,
    count: number,
    keyword?: string,
    filters?: FilterSettings
): GeneratedName[] => {
    let results: GeneratedName[];

    switch (category) {
        case 'fantasy':
            results = generateFantasyName(keyword);
            break;
        case 'sf':
            results = generateSFName(keyword);
            break;
        case 'japanese':
            results = generateJapaneseName(keyword);
            break;
        default:
            results = generateFantasyName(keyword);
    }

    // 重複除去
    results = removeDuplicates(results);

    // フィルタ適用
    if (filters) {
        results = applyFilters(results, filters);
    }

    // シャッフル
    results = results.sort(() => Math.random() - 0.5);

    // 件数制限
    return results.slice(0, count);
};

// 意図: 単一の名前を回す（召喚モード用）
export const generateSingleName = (
    category: WorldCategory,
    keyword?: string
): GeneratedName | null => {
    const names = generateNames(category, 10, keyword);
    if (names.length === 0) return null;
    return names[Math.floor(Math.random() * names.length)];
};
