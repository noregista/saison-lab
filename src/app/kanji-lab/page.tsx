'use client';

// KANJI LAB - メインページ
// 意図: Modern Studio デザインコンセプトで漢字検索UIを実装

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useKanjiSearch, useKanjiDetail } from './hooks/useKanjiSearch';
import { RADICALS, RADICALS_BY_STROKE } from './utils/radicals';
import { getKanjiWords } from './utils/kanjiApi';
import { Language, Translations, KanjiDetail, KanjiWord } from './types/kanji';

// 意図: 多言語対応の翻訳データ
const translations: Record<Language, Translations> = {
    jp: {
        title: '漢字ラボ',
        subtitle: 'KANJI LAB',
        description: '読み・画数・部首で漢字を検索。書き順・熟語・JLPTレベルも表示。',
        searchPlaceholder: '漢字・読み（ひらがな）で検索...',
        strokeCount: '画数',
        radical: '部首',
        jlptLevel: 'JLPTレベル',
        grade: '学年',
        meanings: '意味',
        kunReadings: '訓読み',
        onReadings: '音読み',
        words: '熟語',
        strokeOrder: '書き順',
        noResults: '該当する漢字が見つかりません',
        loading: '検索中...',
        back: '← Saison Lab',
        all: 'すべて',
        gradePrefix: '年',
        adText: '広告スペース',
    },
    en: {
        title: 'KANJI LAB',
        subtitle: 'Kanji Laboratory',
        description: 'Search kanji by reading, stroke count, and radical. View stroke order, vocabulary, and JLPT levels.',
        searchPlaceholder: 'Search by kanji or reading (hiragana)...',
        strokeCount: 'Strokes',
        radical: 'Radical',
        jlptLevel: 'JLPT',
        grade: 'Grade',
        meanings: 'Meanings',
        kunReadings: 'Kun',
        onReadings: 'On',
        words: 'Vocabulary',
        strokeOrder: 'Stroke Order',
        noResults: 'No kanji found',
        loading: 'Searching...',
        back: '← Saison Lab',
        all: 'All',
        gradePrefix: '',
        adText: 'Advertisement',
    },
};

export default function KanjiLabPage() {
    const [lang, setLang] = useState<Language>('jp');
    const [selectedKanji, setSelectedKanji] = useState<string | null>(null);
    const [showRadicalPicker, setShowRadicalPicker] = useState(false);
    const [words, setWords] = useState<KanjiWord[]>([]);
    const [wordsLoading, setWordsLoading] = useState(false);

    const t = translations[lang];
    const { results, isLoading, error, filters, setFilters, clearFilters } = useKanjiSearch();
    const kanjiDetail = useKanjiDetail(selectedKanji);

    // 意図: 漢字選択時に熟語も取得
    const handleKanjiSelect = useCallback(async (kanji: string) => {
        setSelectedKanji(kanji);
        setWordsLoading(true);
        try {
            const kanjiWords = await getKanjiWords(kanji);
            setWords(kanjiWords.slice(0, 10)); // 最大10個
        } catch {
            setWords([]);
        } finally {
            setWordsLoading(false);
        }
    }, []);

    const closeDetail = useCallback(() => {
        setSelectedKanji(null);
        setWords([]);
    }, []);

    // 意図: 部首をグループ化して表示
    const radicalGroups = useMemo(() => {
        const groups: { strokes: number; radicals: typeof RADICALS }[] = [];
        Object.entries(RADICALS_BY_STROKE).forEach(([strokes, rads]) => {
            groups.push({ strokes: parseInt(strokes), radicals: rads });
        });
        return groups.sort((a, b) => a.strokes - b.strokes);
    }, []);

    return (
        <main className="min-h-screen bg-[#0d1117] text-white">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[rgba(13,17,23,0.9)] backdrop-blur-xl border-b border-[rgba(80,200,120,0.2)]">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            {/* 意図: 「漢」をモダンに図案化したアイコン */}
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-2xl font-bold text-white shadow-lg shadow-emerald-500/20">
                                漢
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-white">{t.title}</h1>
                                <p className="text-xs text-gray-400">{t.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* 言語切替 */}
                            <div className="flex bg-[#21262d] rounded-full p-1">
                                <button
                                    onClick={() => setLang('jp')}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'jp' ? 'bg-emerald-500 text-[#0d1117]' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    JP
                                </button>
                                <button
                                    onClick={() => setLang('en')}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'en' ? 'bg-emerald-500 text-[#0d1117]' : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    EN
                                </button>
                            </div>
                            <Link
                                href="/"
                                className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                {t.back}
                            </Link>
                        </div>
                    </div>

                    {/* 広告エリア 1 */}
                    <div className="mb-4 border-2 border-dashed border-[rgba(80,200,120,0.2)] rounded-xl px-4 py-3 text-center text-gray-500 bg-[#161b22]/50">
                        📢 {t.adText} (728×90)
                    </div>

                    {/* 検索バー */}
                    <div className="relative mb-4">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 text-lg">🔍</span>
                        <input
                            type="text"
                            value={filters.query}
                            onChange={(e) => setFilters({ query: e.target.value })}
                            placeholder={t.searchPlaceholder}
                            className="w-full py-3 px-4 pl-12 bg-[#161b22] border border-[rgba(80,200,120,0.2)] rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500 focus:shadow-[0_0_20px_rgba(80,200,120,0.2)] transition-all"
                            aria-label={t.searchPlaceholder}
                        />
                    </div>

                    {/* フィルター群 */}
                    <div className="flex flex-wrap gap-3">
                        {/* 画数フィルター */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-400">{t.strokeCount}:</label>
                            <select
                                value={filters.strokeCount ?? ''}
                                onChange={(e) => setFilters({ strokeCount: e.target.value ? parseInt(e.target.value) : null })}
                                className="bg-[#21262d] border border-[rgba(80,200,120,0.2)] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                                aria-label={t.strokeCount}
                            >
                                <option value="">{t.all}</option>
                                {Array.from({ length: 30 }, (_, i) => i + 1).map(n => (
                                    <option key={n} value={n}>{n}</option>
                                ))}
                            </select>
                        </div>

                        {/* JLPTフィルター */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-400">{t.jlptLevel}:</label>
                            <select
                                value={filters.jlptLevel ?? ''}
                                onChange={(e) => setFilters({ jlptLevel: e.target.value ? parseInt(e.target.value) : null, grade: null })}
                                className="bg-[#21262d] border border-[rgba(80,200,120,0.2)] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                                aria-label={t.jlptLevel}
                            >
                                <option value="">{t.all}</option>
                                {[5, 4, 3, 2, 1].map(n => (
                                    <option key={n} value={n}>N{n}</option>
                                ))}
                            </select>
                        </div>

                        {/* 学年フィルター */}
                        <div className="flex items-center gap-2">
                            <label className="text-sm text-gray-400">{t.grade}:</label>
                            <select
                                value={filters.grade ?? ''}
                                onChange={(e) => setFilters({ grade: e.target.value ? parseInt(e.target.value) : null, jlptLevel: null })}
                                className="bg-[#21262d] border border-[rgba(80,200,120,0.2)] rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500"
                                aria-label={t.grade}
                            >
                                <option value="">{t.all}</option>
                                {[1, 2, 3, 4, 5, 6].map(n => (
                                    <option key={n} value={n}>{n}{t.gradePrefix}</option>
                                ))}
                            </select>
                        </div>

                        {/* 部首選択ボタン */}
                        <button
                            onClick={() => setShowRadicalPicker(!showRadicalPicker)}
                            className={`px-3 py-1.5 rounded-lg text-sm border transition-all ${filters.radical
                                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                    : 'bg-[#21262d] border-[rgba(80,200,120,0.2)] text-gray-400 hover:border-emerald-500'
                                }`}
                        >
                            {t.radical}: {filters.radical || t.all}
                        </button>

                        {/* クリアボタン */}
                        {(filters.query || filters.strokeCount || filters.jlptLevel || filters.grade || filters.radical) && (
                            <button
                                onClick={clearFilters}
                                className="px-3 py-1.5 rounded-lg text-sm bg-red-500/20 border border-red-500/50 text-red-400 hover:bg-red-500/30 transition-all"
                            >
                                ✕ Clear
                            </button>
                        )}
                    </div>
                </div>

                {/* 部首ピッカー */}
                {showRadicalPicker && (
                    <div className="border-t border-[rgba(80,200,120,0.2)] bg-[#161b22] max-h-64 overflow-y-auto">
                        <div className="max-w-6xl mx-auto px-4 py-4">
                            <div className="flex flex-wrap gap-1">
                                <button
                                    onClick={() => {
                                        setFilters({ radical: null });
                                        setShowRadicalPicker(false);
                                    }}
                                    className="w-10 h-10 rounded bg-[#21262d] border border-[rgba(80,200,120,0.2)] text-gray-400 hover:border-emerald-500 transition-all text-sm"
                                >
                                    {t.all}
                                </button>
                                {RADICALS.slice(0, 100).map(rad => (
                                    <button
                                        key={rad.number}
                                        onClick={() => {
                                            setFilters({ radical: rad.radical });
                                            setShowRadicalPicker(false);
                                        }}
                                        className={`w-10 h-10 rounded border transition-all text-lg ${filters.radical === rad.radical
                                                ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                                                : 'bg-[#21262d] border-[rgba(80,200,120,0.2)] text-white hover:border-emerald-500'
                                            }`}
                                        title={`${rad.name_jp} (${rad.name_en})`}
                                    >
                                        {rad.radical}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </header>

            {/* メインコンテンツ */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* ローディング状態 */}
                {isLoading && (
                    <div className="text-center py-12">
                        <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-400">{t.loading}</p>
                    </div>
                )}

                {/* エラー表示 */}
                {error && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-red-400 text-center">
                        {error}
                    </div>
                )}

                {/* 検索結果グリッド */}
                {!isLoading && results.length > 0 && (
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3 animate-fadeIn">
                        {results.map((kanji) => (
                            <button
                                key={kanji.kanji}
                                onClick={() => handleKanjiSelect(kanji.kanji)}
                                className="aspect-square bg-[#161b22] border border-[rgba(80,200,120,0.2)] rounded-xl flex flex-col items-center justify-center hover:border-emerald-500 hover:shadow-[0_0_20px_rgba(80,200,120,0.2)] hover:scale-105 transition-all group"
                                aria-label={`${kanji.kanji} - ${kanji.meanings.join(', ')}`}
                            >
                                <span className="text-3xl font-serif text-white group-hover:text-emerald-400 transition-colors">
                                    {kanji.kanji}
                                </span>
                                <span className="text-xs text-gray-500 mt-1">{kanji.stroke_count}画</span>
                            </button>
                        ))}
                    </div>
                )}

                {/* 結果なし */}
                {!isLoading && results.length === 0 && (filters.query || filters.jlptLevel || filters.grade) && (
                    <div className="text-center py-12 text-gray-500">
                        <span className="text-5xl mb-4 block">📭</span>
                        {t.noResults}
                    </div>
                )}

                {/* 初期状態案内 */}
                {!isLoading && results.length === 0 && !filters.query && !filters.jlptLevel && !filters.grade && (
                    <div className="text-center py-16">
                        <span className="text-6xl mb-6 block">📚</span>
                        <h2 className="text-2xl font-bold text-white mb-2">{t.title}</h2>
                        <p className="text-gray-400 max-w-md mx-auto">{t.description}</p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <button
                                onClick={() => setFilters({ jlptLevel: 5 })}
                                className="px-4 py-2 bg-[#21262d] border border-[rgba(80,200,120,0.2)] rounded-lg text-gray-300 hover:border-emerald-500 transition-all"
                            >
                                JLPT N5
                            </button>
                            <button
                                onClick={() => setFilters({ grade: 1 })}
                                className="px-4 py-2 bg-[#21262d] border border-[rgba(80,200,120,0.2)] rounded-lg text-gray-300 hover:border-emerald-500 transition-all"
                            >
                                {lang === 'jp' ? '小学1年' : 'Grade 1'}
                            </button>
                            <button
                                onClick={() => setFilters({ query: 'あ' })}
                                className="px-4 py-2 bg-[#21262d] border border-[rgba(80,200,120,0.2)] rounded-lg text-gray-300 hover:border-emerald-500 transition-all"
                            >
                                {lang === 'jp' ? '「あ」で検索' : 'Search "あ"'}
                            </button>
                        </div>
                    </div>
                )}

                {/* 広告エリア 2 */}
                <div className="mt-8 border-2 border-dashed border-[rgba(80,200,120,0.2)] rounded-xl px-4 py-6 text-center text-gray-500 bg-[#161b22]/50">
                    📢 {t.adText} (300×250)
                </div>
            </div>

            {/* 漢字詳細モーダル */}
            {selectedKanji && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4"
                    onClick={closeDetail}
                >
                    <div
                        className="bg-[#161b22] border border-[rgba(80,200,120,0.2)] rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto p-6 relative animate-fadeIn"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* 閉じるボタン */}
                        <button
                            onClick={closeDetail}
                            className="absolute top-4 right-4 w-9 h-9 bg-[#21262d] border-none rounded-full text-gray-400 text-xl flex items-center justify-center hover:bg-red-500 hover:text-white transition-all"
                            aria-label="Close"
                        >
                            ✕
                        </button>

                        {kanjiDetail.isLoading ? (
                            <div className="text-center py-12">
                                <div className="animate-spin w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto"></div>
                            </div>
                        ) : kanjiDetail.data ? (
                            <>
                                {/* 漢字表示 */}
                                <div className="text-center mb-6">
                                    <span className="text-8xl font-serif text-emerald-400 block mb-2">
                                        {kanjiDetail.data.kanji}
                                    </span>
                                    <div className="flex justify-center gap-4 text-sm text-gray-400">
                                        <span>{kanjiDetail.data.stroke_count}画</span>
                                        {kanjiDetail.data.jlpt && <span>JLPT N{kanjiDetail.data.jlpt}</span>}
                                        {kanjiDetail.data.grade && <span>{lang === 'jp' ? `${kanjiDetail.data.grade}年` : `Grade ${kanjiDetail.data.grade}`}</span>}
                                    </div>
                                </div>

                                {/* 意味 */}
                                <div className="mb-4">
                                    <h3 className="text-sm font-bold text-gray-400 mb-2">{t.meanings}</h3>
                                    <p className="text-white">{kanjiDetail.data.meanings.join(', ')}</p>
                                </div>

                                {/* 読み */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 mb-2">{t.kunReadings}</h3>
                                        <p className="text-white text-sm">
                                            {kanjiDetail.data.kun_readings.length > 0
                                                ? kanjiDetail.data.kun_readings.join('、')
                                                : '-'}
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-gray-400 mb-2">{t.onReadings}</h3>
                                        <p className="text-white text-sm">
                                            {kanjiDetail.data.on_readings.length > 0
                                                ? kanjiDetail.data.on_readings.join('、')
                                                : '-'}
                                        </p>
                                    </div>
                                </div>

                                {/* 熟語 */}
                                <div className="mb-4">
                                    <h3 className="text-sm font-bold text-gray-400 mb-2">{t.words}</h3>
                                    {wordsLoading ? (
                                        <div className="text-gray-500 text-sm">{t.loading}</div>
                                    ) : words.length > 0 ? (
                                        <div className="flex flex-wrap gap-2">
                                            {words.map((word, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-2 py-1 bg-[#21262d] rounded text-sm text-white"
                                                    title={word.meanings[0]?.glosses.join(', ')}
                                                >
                                                    {word.variants[0]?.written}
                                                </span>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-sm">-</p>
                                    )}
                                </div>

                                {/* 書き順プレースホルダー */}
                                <div className="border-t border-[rgba(80,200,120,0.2)] pt-4 mt-4">
                                    <h3 className="text-sm font-bold text-gray-400 mb-2">{t.strokeOrder}</h3>
                                    <div className="bg-[#21262d] rounded-xl p-4 text-center text-gray-500 text-sm">
                                        🖌️ {lang === 'jp' ? '書き順アニメーション（準備中）' : 'Stroke order animation (coming soon)'}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="text-center py-12 text-gray-500">
                                {kanjiDetail.error || 'Error loading kanji details'}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* 広告エリア 3 */}
            <div className="max-w-6xl mx-auto px-4 pb-8">
                <div className="border-2 border-dashed border-[rgba(80,200,120,0.2)] rounded-xl px-4 py-3 text-center text-gray-500 bg-[#161b22]/50">
                    📢 {t.adText} (728×90)
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#161b22] border-t border-[rgba(80,200,120,0.2)] py-6">
                <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
                    <p>© 2026 Saison Lab. All rights reserved.</p>
                    <p className="mt-2 text-xs">
                        {lang === 'jp'
                            ? 'データ提供: kanjiapi.dev (CC BY-SA 4.0)'
                            : 'Data provided by kanjiapi.dev (CC BY-SA 4.0)'}
                    </p>
                </div>
            </footer>

            {/* 意図: フェードインアニメーション用のスタイル */}
            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
        </main>
    );
}
