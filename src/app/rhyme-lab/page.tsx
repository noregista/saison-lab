'use client';

// RHYME LAB - メインページ
// 意図: Energetic Studio デザインコンセプトで韻検索UIを実装

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { searchRhymes, UnifiedRhymeResult, Language } from './utils/rhymeEngine';
import { extractVowelPattern } from './utils/japaneseRhyme';

// 意図: 多言語対応の翻訳データ
type UILanguage = 'jp' | 'en';
const translations: Record<UILanguage, Record<string, string>> = {
    jp: {
        title: 'RHYME LAB',
        subtitle: 'ライム・ラボ',
        description: '単語を入力して韻を踏める言葉を検索。ラップ、詩、キャッチコピー作成に。',
        searchPlaceholder: '韻を探したい単語を入力...',
        search: '検索',
        filter: 'フィルター',
        all: 'すべて',
        perfect: '完全一致',
        similar: '類似',
        partial: '部分一致',
        noResults: '韻が見つかりません',
        loading: '検索中...',
        back: '← Saison Lab',
        copied: 'コピーしました！',
        clickToCopy: 'クリックでコピー',
        vowelPattern: '母音パターン',
        inputPattern: '入力の母音',
        resultCount: '件の韻を発見',
        adText: '広告スペース',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
        tryExamples: '例を試す',
    },
    en: {
        title: 'RHYME LAB',
        subtitle: 'Rhyme Laboratory',
        description: 'Enter a word to find rhyming words. For rap, poetry, and copywriting.',
        searchPlaceholder: 'Enter a word to find rhymes...',
        search: 'Search',
        filter: 'Filter',
        all: 'All',
        perfect: 'Perfect',
        similar: 'Similar',
        partial: 'Partial',
        noResults: 'No rhymes found',
        loading: 'Searching...',
        back: '← Saison Lab',
        copied: 'Copied!',
        clickToCopy: 'Click to copy',
        vowelPattern: 'Vowel Pattern',
        inputPattern: 'Input vowels',
        resultCount: 'rhymes found',
        adText: 'Advertisement',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
        tryExamples: 'Try examples',
    },
};

// 意図: カラーパレット定義（Energetic Studioテーマ）
const colors = {
    primary: '#f97316', // オレンジ（エネルギッシュ）
    primaryDark: '#ea580c',
    accent: '#22d3ee', // シアン
    bgDark: '#0d1117',
    bgCard: '#161b22',
    border: 'rgba(249, 115, 22, 0.2)',
    text: '#f0f0f0',
    textMuted: '#8b949e',
};

export default function RhymeLabPage() {
    const [lang, setLang] = useState<UILanguage>('jp');
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<UnifiedRhymeResult[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [inputPattern, setInputPattern] = useState('');
    const [detectedLang, setDetectedLang] = useState<Language>('jp');
    const [filter, setFilter] = useState<'all' | 'perfect' | 'similar' | 'partial'>('all');
    const [copiedWord, setCopiedWord] = useState<string | null>(null);
    const audioRef = useRef<AudioContext | null>(null);

    const t = translations[lang];

    // 意図: 成功音を再生
    const playSuccessSound = useCallback(() => {
        try {
            if (!audioRef.current) {
                audioRef.current = new AudioContext();
            }
            const ctx = audioRef.current;
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.frequency.setValueAtTime(880, ctx.currentTime);
            osc.frequency.setValueAtTime(1100, ctx.currentTime + 0.05);
            gain.gain.setValueAtTime(0.1, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.1);
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.1);
        } catch {
            // Audio not supported
        }
    }, []);

    // 意図: 韻検索を実行
    const handleSearch = useCallback(async () => {
        if (!query.trim()) return;
        setIsLoading(true);
        try {
            const { results: searchResults, language, inputPattern: pattern } = await searchRhymes(query, 10);
            setResults(searchResults);
            setDetectedLang(language);
            setInputPattern(pattern || '');
            if (searchResults.length > 0) {
                playSuccessSound();
            }
        } catch (error) {
            console.error('Search failed:', error);
            setResults([]);
        } finally {
            setIsLoading(false);
        }
    }, [query, playSuccessSound]);

    // 意図: Enterキーで検索
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    // 意図: クリップボードにコピー
    const handleCopy = useCallback(async (word: string) => {
        try {
            await navigator.clipboard.writeText(word);
            setCopiedWord(word);
            setTimeout(() => setCopiedWord(null), 1500);
        } catch {
            // Clipboard not supported
        }
    }, []);

    // 意図: フィルター適用
    const filteredResults = results.filter(r => {
        if (filter === 'all') return true;
        return r.matchType === filter;
    });

    // 意図: サンプル検索
    const handleExample = (example: string) => {
        setQuery(example);
        setTimeout(() => {
            searchRhymes(example, 10).then(({ results: r, language: l, inputPattern: p }) => {
                setResults(r);
                setDetectedLang(l);
                setInputPattern(p || '');
            });
        }, 100);
    };

    return (
        <main className="min-h-screen relative" style={{ background: colors.bgDark, color: colors.text }}>
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-20 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("/rhyme-lab/bg-studio.png")' }}
            />
            {/* Content Wrapper */}
            <div className="relative z-10">
                {/* Header */}
                <header className="sticky top-0 z-50 backdrop-blur-xl border-b" style={{
                    background: 'rgba(13,17,23,0.9)',
                    borderColor: colors.border
                }}>
                    <div className="max-w-4xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                {/* 意図: マイク＋音波モチーフのアイコン */}
                                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg" style={{
                                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                                    boxShadow: `0 0 20px ${colors.primary}40`
                                }}>
                                    🎤
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold">{t.title}</h1>
                                    <p className="text-xs" style={{ color: colors.textMuted }}>{t.subtitle}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* 言語切替 */}
                                <div className="flex rounded-full p-1" style={{ background: '#21262d' }}>
                                    <button
                                        onClick={() => setLang('jp')}
                                        className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                                        style={{
                                            background: lang === 'jp' ? colors.primary : 'transparent',
                                            color: lang === 'jp' ? colors.bgDark : colors.textMuted
                                        }}
                                    >
                                        JP
                                    </button>
                                    <button
                                        onClick={() => setLang('en')}
                                        className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
                                        style={{
                                            background: lang === 'en' ? colors.primary : 'transparent',
                                            color: lang === 'en' ? colors.bgDark : colors.textMuted
                                        }}
                                    >
                                        EN
                                    </button>
                                </div>
                                <Link
                                    href="/"
                                    className="text-sm transition-colors hover:opacity-80"
                                    style={{ color: colors.textMuted }}
                                >
                                    {t.back}
                                </Link>
                            </div>
                        </div>

                        {/* 広告エリア 1 */}
                        <div className="mb-4 border-2 border-dashed rounded-xl px-4 py-3 text-center text-sm" style={{
                            borderColor: colors.border,
                            color: colors.textMuted,
                            background: `${colors.bgCard}80`
                        }}>
                            📢 {t.adText} (728×90)
                        </div>

                        {/* 検索バー */}
                        <div className="flex gap-2 mb-4">
                            <div className="relative flex-1">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg">🔍</span>
                                <input
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder={t.searchPlaceholder}
                                    className="w-full py-3 px-4 pl-12 rounded-xl text-white transition-all focus:outline-none"
                                    style={{
                                        background: colors.bgCard,
                                        border: `1px solid ${colors.border}`,
                                    }}
                                    aria-label={t.searchPlaceholder}
                                />
                            </div>
                            <button
                                onClick={handleSearch}
                                disabled={isLoading}
                                className="px-6 py-3 rounded-xl font-bold transition-all hover:scale-105 disabled:opacity-50"
                                style={{
                                    background: `linear-gradient(135deg, ${colors.primary}, ${colors.primaryDark})`,
                                    color: colors.bgDark,
                                    boxShadow: `0 4px 15px ${colors.primary}40`
                                }}
                            >
                                {isLoading ? '...' : t.search}
                            </button>
                        </div>

                        {/* フィルター */}
                        <div className="flex flex-wrap gap-2">
                            {(['all', 'perfect', 'similar', 'partial'] as const).map((f) => (
                                <button
                                    key={f}
                                    onClick={() => setFilter(f)}
                                    className="px-3 py-1.5 rounded-lg text-sm transition-all"
                                    style={{
                                        background: filter === f ? `${colors.primary}30` : colors.bgCard,
                                        border: `1px solid ${filter === f ? colors.primary : colors.border}`,
                                        color: filter === f ? colors.primary : colors.textMuted
                                    }}
                                >
                                    {t[f]}
                                </button>
                            ))}
                        </div>
                    </div>
                </header>

                {/* メインコンテンツ */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    {/* ローディング */}
                    {isLoading && (
                        <div className="text-center py-12">
                            <div className="w-12 h-12 border-4 rounded-full mx-auto mb-4 animate-spin" style={{
                                borderColor: colors.primary,
                                borderTopColor: 'transparent'
                            }}></div>
                            <p style={{ color: colors.textMuted }}>{t.loading}</p>
                        </div>
                    )}

                    {/* 検索結果 */}
                    {!isLoading && results.length > 0 && (
                        <>
                            {/* 入力パターン表示（日本語のみ） */}
                            {detectedLang === 'jp' && inputPattern && (
                                <div className="mb-6 p-4 rounded-xl" style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}>
                                    <span style={{ color: colors.textMuted }}>{t.inputPattern}: </span>
                                    <span className="font-mono text-lg" style={{ color: colors.accent }}>{inputPattern}</span>
                                    <span className="ml-4" style={{ color: colors.textMuted }}>
                                        {filteredResults.length} {t.resultCount}
                                    </span>
                                </div>
                            )}

                            {/* 結果グリッド */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                {filteredResults.map((result, idx) => (
                                    <button
                                        key={`${result.word}-${idx}`}
                                        onClick={() => handleCopy(result.word)}
                                        className="relative p-4 rounded-xl text-center transition-all hover:scale-105 group"
                                        style={{
                                            background: colors.bgCard,
                                            border: `1px solid ${colors.border}`,
                                            animation: `fadeInUp 0.3s ease-out ${idx * 0.05}s both`
                                        }}
                                        title={t.clickToCopy}
                                    >
                                        {/* コピー成功表示 */}
                                        {copiedWord === result.word && (
                                            <div className="absolute inset-0 flex items-center justify-center rounded-xl" style={{
                                                background: `${colors.primary}ee`,
                                                color: colors.bgDark
                                            }}>
                                                ✓ {t.copied}
                                            </div>
                                        )}

                                        {/* マッチタイプバッジ */}
                                        <div className="absolute top-2 right-2 w-2 h-2 rounded-full" style={{
                                            background: result.matchType === 'perfect' ? '#22c55e' :
                                                result.matchType === 'similar' ? colors.primary : '#6b7280'
                                        }}></div>

                                        {/* 単語 */}
                                        <div className="text-xl font-bold mb-1 group-hover:scale-110 transition-transform" style={{ color: colors.text }}>
                                            {result.word}
                                        </div>

                                        {/* 読み（日本語のみ） */}
                                        {result.reading && (
                                            <div className="text-sm mb-1" style={{ color: colors.textMuted }}>
                                                {result.reading}
                                            </div>
                                        )}

                                        {/* 母音パターン */}
                                        {result.vowelPattern && (
                                            <div className="text-xs font-mono" style={{ color: colors.accent }}>
                                                {result.vowelPattern}
                                            </div>
                                        )}

                                        {/* コピーアイコン（ホバー時） */}
                                        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            📋
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </>
                    )}

                    {/* 結果なし */}
                    {!isLoading && query && results.length === 0 && (
                        <div className="text-center py-12" style={{ color: colors.textMuted }}>
                            <span className="text-5xl mb-4 block">🔇</span>
                            {t.noResults}
                        </div>
                    )}

                    {/* 初期状態 */}
                    {!isLoading && !query && results.length === 0 && (
                        <div className="text-center py-16">
                            <span className="text-6xl mb-6 block">🎤</span>
                            <h2 className="text-2xl font-bold mb-2">{t.title}</h2>
                            <p className="max-w-md mx-auto mb-8" style={{ color: colors.textMuted }}>{t.description}</p>
                            <div>
                                <p className="text-sm mb-3" style={{ color: colors.textMuted }}>{t.tryExamples}:</p>
                                <div className="flex flex-wrap justify-center gap-3">
                                    {lang === 'jp' ? (
                                        <>
                                            <button onClick={() => handleExample('さくら')} className="px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}>さくら</button>
                                            <button onClick={() => handleExample('ゆめ')} className="px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}>ゆめ</button>
                                            <button onClick={() => handleExample('あい')} className="px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}>あい</button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleExample('love')} className="px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}>love</button>
                                            <button onClick={() => handleExample('dream')} className="px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}>dream</button>
                                            <button onClick={() => handleExample('time')} className="px-4 py-2 rounded-lg transition-all hover:scale-105" style={{ background: colors.bgCard, border: `1px solid ${colors.border}` }}>time</button>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* 広告エリア 2 */}
                    <div className="mt-8 border-2 border-dashed rounded-xl px-4 py-6 text-center text-sm" style={{
                        borderColor: colors.border,
                        color: colors.textMuted,
                        background: `${colors.bgCard}80`
                    }}>
                        📢 {t.adText} (300×250)
                    </div>
                </div>

                {/* 広告エリア 3 */}
                <div className="max-w-4xl mx-auto px-4 pb-8">
                    <div className="border-2 border-dashed rounded-xl px-4 py-3 text-center text-sm" style={{
                        borderColor: colors.border,
                        color: colors.textMuted,
                        background: `${colors.bgCard}80`
                    }}>
                        📢 {t.adText} (728×90)
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t py-6" style={{ background: colors.bgCard, borderColor: colors.border }}>
                    <div className="max-w-4xl mx-auto text-center text-sm" style={{ color: colors.textMuted }}>
                        <p>© 2026 Saison Lab. All rights reserved.</p>
                    </div>
                </footer>

                {/* アニメーション用スタイル */}
                <style jsx global>{`
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
            </div>
        </main>
    );
}
