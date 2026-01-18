// NAME LAB - ネガティブチェック辞書
// 意図: 多言語での不適切語フィルター

// 意図: 不適切語パターン（部分一致でチェック）
// 注意: セキュリティのため最小限のパターンを定義、実運用時は別途APIを検討

interface NegativePattern {
    pattern: string;
    lang: string;
    severity: 'block' | 'warn';
}

// 意図: 基本的なNGパターン（実際の卑語はハッシュ化されたリストを使用推奨）
const negativePatterns: NegativePattern[] = [
    // 英語
    { pattern: 'ass', lang: 'en', severity: 'warn' },
    { pattern: 'damn', lang: 'en', severity: 'warn' },
    { pattern: 'hell', lang: 'en', severity: 'warn' },
    // ドイツ語
    { pattern: 'schei', lang: 'de', severity: 'warn' },
    // フランス語
    { pattern: 'merd', lang: 'fr', severity: 'warn' },
    // スペイン語
    { pattern: 'mier', lang: 'es', severity: 'warn' },
    // 日本語（ローマ字読み）
    { pattern: 'baka', lang: 'jp', severity: 'warn' },
    { pattern: 'kuso', lang: 'jp', severity: 'warn' },
];

// 意図: 名前をチェックし、警告リストを返す
export const checkNegativePatterns = (name: string): string[] => {
    const warnings: string[] = [];
    const lowerName = name.toLowerCase();

    for (const pattern of negativePatterns) {
        if (lowerName.includes(pattern.pattern)) {
            warnings.push(`[${pattern.lang.toUpperCase()}] /${pattern.pattern}/ detected (${pattern.severity})`);
        }
    }

    return warnings;
};

// 意図: ブロック対象かどうか
export const shouldBlockName = (name: string): boolean => {
    const lowerName = name.toLowerCase();
    return negativePatterns.some(p =>
        p.severity === 'block' && lowerName.includes(p.pattern)
    );
};

// 意図: 発音類似チェック（簡易版）
const phoneticallyRiskyPatterns = [
    'fuk', 'fak', 'sht', 'cnt', 'dik', 'kok',
];

export const checkPhoneticRisks = (name: string): string[] => {
    const warnings: string[] = [];
    const lowerName = name.toLowerCase();

    for (const pattern of phoneticallyRiskyPatterns) {
        if (lowerName.includes(pattern)) {
            warnings.push(`Phonetically risky: /${pattern}/`);
        }
    }

    return warnings;
};

// 意図: 総合チェック
export const validateName = (name: string): { valid: boolean; warnings: string[] } => {
    const patternWarnings = checkNegativePatterns(name);
    const phoneticWarnings = checkPhoneticRisks(name);
    const allWarnings = [...patternWarnings, ...phoneticWarnings];

    return {
        valid: !shouldBlockName(name),
        warnings: allWarnings,
    };
};
