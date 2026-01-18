// NAME LAB - Sound-to-Color マッパー
// 意図: 名前の響きからHSLカラーを算出

import { HSLColor, NamePersonality } from '../data/types';

// 意図: 母音→色相マッピング
const vowelToHue: Record<string, number> = {
    'a': 0,      // 赤系（開放的、情熱）
    'i': 60,     // 黄系（鋭い、知性）
    'u': 180,    // シアン系（深み、神秘）
    'e': 120,    // 緑系（調和、自然）
    'o': 270,    // 紫系（荘厳、高貴）
};

// 意図: 子音→彩度・明度修飾
const consonantModifier: Record<string, { saturation: number; lightness: number }> = {
    // 強い子音（濁音系）→ 高彩度・低明度
    'k': { saturation: +10, lightness: -5 },
    'g': { saturation: +15, lightness: -10 },
    'd': { saturation: +15, lightness: -8 },
    'b': { saturation: +12, lightness: -7 },
    't': { saturation: +8, lightness: -3 },
    'p': { saturation: +10, lightness: -5 },
    'z': { saturation: +18, lightness: -12 },
    'v': { saturation: +12, lightness: -6 },
    // 柔らかい子音 → 低彩度・高明度
    's': { saturation: -5, lightness: +5 },
    'n': { saturation: -8, lightness: +8 },
    'm': { saturation: -10, lightness: +10 },
    'r': { saturation: 0, lightness: +3 },
    'l': { saturation: -5, lightness: +7 },
    'h': { saturation: -8, lightness: +10 },
    'w': { saturation: -6, lightness: +8 },
    'y': { saturation: -3, lightness: +5 },
    'f': { saturation: -4, lightness: +6 },
    // 特殊
    'x': { saturation: +20, lightness: -15 },
    'q': { saturation: +15, lightness: -10 },
};

// 意図: 数値をクランプ
const clamp = (value: number, min: number, max: number): number => {
    return Math.max(min, Math.min(max, value));
};

// 意図: 名前からHSLカラーを算出
export const nameToColor = (name: string): HSLColor => {
    const vowels = name.match(/[aiueoAIUEO]/g) || [];
    const consonants = name.match(/[^aiueoAIUEO\s]/g) || [];

    // 母音が無い場合はデフォルト
    if (vowels.length === 0) {
        return { h: 200, s: 60, l: 50 };
    }

    // 母音の平均色相を計算
    let hueSum = 0;
    vowels.forEach(v => {
        const h = vowelToHue[v.toLowerCase()];
        if (h !== undefined) {
            hueSum += h;
        }
    });
    let hue = hueSum / vowels.length;

    // 子音による修飾
    let saturation = 60;
    let lightness = 50;
    consonants.forEach(c => {
        const mod = consonantModifier[c.toLowerCase()];
        if (mod) {
            saturation += mod.saturation / consonants.length;
            lightness += mod.lightness / consonants.length;
        }
    });

    return {
        h: Math.round(hue) % 360,
        s: clamp(Math.round(saturation), 30, 90),
        l: clamp(Math.round(lightness), 30, 70),
    };
};

// 意図: HSLをCSS文字列に変換
export const hslToString = (color: HSLColor): string => {
    return `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
};

// 意図: 名前の性格を推定
export const guessPersonality = (name: string): NamePersonality => {
    const lowerName = name.toLowerCase();

    // 強い子音が多い → 力強い/獰猛
    const strongConsonants = (lowerName.match(/[kgdbtpzx]/g) || []).length;
    const softConsonants = (lowerName.match(/[snmlrhwy]/g) || []).length;
    const length = name.length;

    if (strongConsonants > softConsonants * 1.5) {
        return strongConsonants > 3 ? 'fierce' : 'powerful';
    }

    if (softConsonants > strongConsonants * 1.5) {
        return softConsonants > 3 ? 'gentle' : 'elegant';
    }

    // 長い名前はより知的/神秘的
    if (length > 6) {
        return 'wise';
    }

    // 短い名前は神秘的
    if (length <= 4) {
        return 'mysterious';
    }

    // デフォルト
    return 'elegant';
};

// 意図: 性格に対応するフォントウェイト
export const getPersonalityFont = (personality: NamePersonality): { weight: number; style: string } => {
    switch (personality) {
        case 'powerful':
            return { weight: 900, style: 'normal' };
        case 'fierce':
            return { weight: 800, style: 'normal' };
        case 'elegant':
            return { weight: 400, style: 'normal' };
        case 'gentle':
            return { weight: 300, style: 'normal' };
        case 'mysterious':
            return { weight: 500, style: 'italic' };
        case 'wise':
            return { weight: 600, style: 'normal' };
        default:
            return { weight: 400, style: 'normal' };
    }
};
