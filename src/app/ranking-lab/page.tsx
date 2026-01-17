'use client';

/**
 * RANKING LAB - Main Page
 * 世界ランキング図鑑
 */

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { categories } from './data/categories';
import { allRankings, rankingsByCategory } from './data';
import { getDataStatus, statusLabels, RankingData } from './data/types';

// ============================================================
// カラーパレット
// ============================================================
const colors = {
    primary: '#10B981',     // Emerald
    secondary: '#3B82F6',   // Blue
    bgDark: '#0D1117',
    bgCard: '#161b22',
    text: '#f0f0f0',
    textMuted: '#8b949e',
    border: 'rgba(80,200,120,0.2)',
};

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        title: 'RANKING LAB',
        subtitle: 'ランキング・ラボ',
        description: '世界のあらゆるランキングを比較',
        back: '← Saison Lab',
        asOf: '時点',
        source: '出典',
        showChart: 'チャートを表示',
        hideChart: 'チャートを隠す',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
        copyright: '© 2026 Saison Lab',
        dataNote: '※ 各データは記載の基準日時点のものです。最新性を保証するものではありません。',
    },
    en: {
        title: 'RANKING LAB',
        subtitle: 'World Rankings',
        description: 'Compare rankings from around the world',
        back: '← Saison Lab',
        asOf: 'As of',
        source: 'Source',
        showChart: 'Show Chart',
        hideChart: 'Hide Chart',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
        copyright: '© 2026 Saison Lab',
        dataNote: '* Data reflects the specified reference date and may not be current.',
    },
};

type Language = 'jp' | 'en';

// ============================================================
// ステータスバッジコンポーネント
// ============================================================
function StatusBadge({ status, lang }: { status: 'latest' | 'awaiting' | 'historical'; lang: Language }) {
    const label = statusLabels[status];
    const icons = { latest: '✓', awaiting: '⏳', historical: '📜' };

    return (
        <span
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${label.color}22`, color: label.color }}
        >
            {icons[status]} {lang === 'jp' ? label.jp : label.en}
        </span>
    );
}

// ============================================================
// ソースフッターコンポーネント
// ============================================================
function SourceFooter({
    meta,
    lang
}: {
    meta: RankingData['meta'];
    lang: Language;
}) {
    const t = texts[lang];
    const status = getDataStatus(meta.asOfDate);
    const dateStr = new Date(meta.asOfDate).toLocaleDateString(lang === 'jp' ? 'ja-JP' : 'en-US', {
        year: 'numeric',
        month: 'long',
    });

    return (
        <div className="flex flex-wrap items-center gap-2 text-xs mt-3 pt-3 border-t" style={{ borderColor: colors.border, color: colors.textMuted }}>
            <span>📅 {`${dateStr} ${t.asOf}`}</span>
            <span>|</span>
            <a
                href={meta.source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline flex items-center gap-1"
                style={{ color: colors.primary }}
            >
                🔗 {meta.source.name}
                <span className="text-[10px]">↗</span>
            </a>
            <span>|</span>
            <StatusBadge status={status} lang={lang} />
        </div>
    );
}

// ============================================================
// ランキングテーブルコンポーネント
// ============================================================
function RankingTable({
    ranking,
    lang,
    showChart,
    onToggleChart,
}: {
    ranking: RankingData;
    lang: Language;
    showChart: boolean;
    onToggleChart: () => void;
}) {
    const t = texts[lang];
    const maxValue = Math.max(...ranking.entries.map(e => e.value));

    return (
        <div
            className="rounded-2xl p-4 md:p-6 mb-6"
            style={{ backgroundColor: colors.bgCard, border: `1px solid ${colors.border}` }}
        >
            {/* ヘッダー */}
            <div className="flex flex-wrap justify-between items-start gap-2 mb-4">
                <div>
                    <h3 className="text-lg md:text-xl font-bold" style={{ color: colors.text }}>
                        {lang === 'jp' ? ranking.meta.title.jp : ranking.meta.title.en}
                    </h3>
                    <p className="text-sm mt-1" style={{ color: colors.textMuted }}>
                        {lang === 'jp' ? ranking.meta.description.jp : ranking.meta.description.en}
                    </p>
                </div>
                <button
                    onClick={onToggleChart}
                    className="px-3 py-1 text-xs rounded-full border transition-colors hover:bg-white/10"
                    style={{ borderColor: colors.primary, color: colors.primary }}
                >
                    📊 {showChart ? t.hideChart : t.showChart}
                </button>
            </div>

            {/* チャート（トグル表示） */}
            {showChart && (
                <div className="mb-4 p-4 rounded-xl" style={{ backgroundColor: colors.bgDark }}>
                    {ranking.entries.slice(0, 10).map((entry, idx) => (
                        <div key={entry.rank} className="flex items-center gap-2 mb-2">
                            <span className="w-6 text-xs text-right" style={{ color: colors.textMuted }}>
                                #{entry.rank}
                            </span>
                            <span className="w-8 text-lg">{entry.country.flag}</span>
                            <div className="flex-1">
                                <div
                                    className="h-5 rounded transition-all duration-500"
                                    style={{
                                        width: `${(entry.value / maxValue) * 100}%`,
                                        backgroundColor: categories.find(c => c.rankings.includes(ranking.meta.id))?.color || colors.primary,
                                        opacity: 1 - (idx * 0.05),
                                    }}
                                />
                            </div>
                            <span className="w-24 text-right text-sm font-mono" style={{ color: colors.text }}>
                                {entry.value.toLocaleString()}
                            </span>
                        </div>
                    ))}
                </div>
            )}

            {/* テーブル */}
            <div className="overflow-x-auto">
                <table className="w-full text-sm">
                    <thead>
                        <tr style={{ borderBottom: `1px solid ${colors.border}` }}>
                            <th className="text-left py-2 px-2 w-12" style={{ color: colors.textMuted }}>#</th>
                            <th className="text-left py-2 px-2" style={{ color: colors.textMuted }}>
                                {lang === 'jp' ? '国名' : 'Country'}
                            </th>
                            <th className="text-right py-2 px-2" style={{ color: colors.textMuted }}>
                                {lang === 'jp' ? ranking.meta.unit.jp : ranking.meta.unit.en}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {ranking.entries.map((entry) => (
                            <tr
                                key={entry.rank}
                                className="hover:bg-white/5 transition-colors"
                                style={{ borderBottom: `1px solid ${colors.border}` }}
                            >
                                <td className="py-3 px-2 font-bold" style={{ color: colors.primary }}>
                                    {entry.rank}
                                </td>
                                <td className="py-3 px-2">
                                    <span className="mr-2">{entry.country.flag}</span>
                                    <span style={{ color: colors.text }}>
                                        {lang === 'jp' ? entry.country.jp : entry.country.en}
                                    </span>
                                </td>
                                <td className="py-3 px-2 text-right font-mono" style={{ color: colors.text }}>
                                    {entry.value.toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ソースフッター */}
            <SourceFooter meta={ranking.meta} lang={lang} />
        </div>
    );
}

// ============================================================
// メインページコンポーネント
// ============================================================
export default function RankingLabPage() {
    const [lang, setLang] = useState<Language>('jp');
    const [activeCategory, setActiveCategory] = useState('economy');
    const [chartsVisible, setChartsVisible] = useState<Record<string, boolean>>({});

    const t = texts[lang];

    const currentRankings = useMemo(() => {
        return rankingsByCategory[activeCategory] || [];
    }, [activeCategory]);

    const toggleChart = (id: string) => {
        setChartsVisible(prev => ({ ...prev, [id]: !prev[id] }));
    };

    return (
        <main className="min-h-screen relative overflow-hidden" style={{ backgroundColor: colors.bgDark, color: colors.text }}>
            {/* ダイナミック背景 */}
            <div className="fixed inset-0 z-0 pointer-events-none transition-all duration-1000 ease-in-out">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-30 blur-[100px] scale-110"
                    style={{ backgroundImage: `url(${categories.find(c => c.id === activeCategory)?.image})` }}
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>

            <div className="relative z-10">
                {/* ヘッダー */}
                <header className="sticky top-0 z-50 backdrop-blur-xl px-4 py-4" style={{ backgroundColor: 'rgba(13,17,23,0.6)', borderBottom: `1px solid ${colors.border}` }}>
                    <div className="max-w-5xl mx-auto flex items-center justify-between">
                        <Link href="/" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
                            {t.back}
                        </Link>
                        <button
                            onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                            className="px-3 py-1 text-sm border rounded-full hover:bg-white/10 transition-colors"
                            style={{ borderColor: colors.primary }}
                        >
                            {lang === 'jp' ? 'EN' : 'JP'}
                        </button>
                    </div>
                </header>

                {/* タイトル */}
                <div className="text-center py-10 px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2" style={{ color: colors.primary }}>
                        📊 {t.title}
                    </h1>
                    <p className="text-lg opacity-60">{t.subtitle}</p>
                    <p className="text-sm mt-2 opacity-40">{t.description}</p>
                </div>

                {/* カテゴリタブ（画像カード） */}
                <div className="max-w-5xl mx-auto px-4 mb-12">
                    <div className="grid grid-cols-3 md:grid-cols-6 gap-2 md:gap-4">
                        {categories.map((cat) => {
                            const isActive = activeCategory === cat.id;
                            return (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`relative aspect-square md:aspect-[4/5] rounded-xl overflow-hidden transition-all duration-300 group border ${isActive ? 'ring-2 ring-white scale-105 shadow-xl' : 'opacity-70 hover:opacity-100 hover:scale-105'}`}
                                    style={{
                                        borderColor: isActive ? cat.color : `${cat.color}44`,
                                    }}
                                >
                                    {/* 背景画像 */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                        style={{ backgroundImage: `url(${cat.image})` }}
                                    />
                                    {/* オーバーレイ */}
                                    <div
                                        className="absolute inset-0 transition-colors duration-300"
                                        style={{ backgroundColor: isActive ? `${cat.color}66` : 'rgba(0,0,0,0.6)' }}
                                    />
                                    {/* コンテンツ */}
                                    <div className="absolute inset-0 flex flex-col items-center justify-center p-2 text-white">
                                        <span className="text-2xl md:text-3xl mb-1 md:mb-2 drop-shadow-md">{cat.icon}</span>
                                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-center drop-shadow-md leading-tight">
                                            {lang === 'jp' ? cat.name.jp : cat.name.en}
                                        </span>
                                    </div>

                                    {/* アクティブ時のインジケーター */}
                                    {isActive && (
                                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-white shadow-lg" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* ランキング表示エリア */}
                <div className="max-w-5xl mx-auto px-4 pb-8">
                    {currentRankings.map((ranking) => (
                        <RankingTable
                            key={ranking.meta.id}
                            ranking={ranking}
                            lang={lang}
                            showChart={chartsVisible[ranking.meta.id] || false}
                            onToggleChart={() => toggleChart(ranking.meta.id)}
                        />
                    ))}
                </div>

                {/* データ注釈 */}
                <div className="max-w-5xl mx-auto px-4 pb-8">
                    <p className="text-xs text-center" style={{ color: colors.textMuted }}>
                        {t.dataNote}
                    </p>
                </div>

                {/* 広告エリア */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div
                        className="border-2 border-dashed rounded-lg px-4 py-8 text-center text-sm opacity-50"
                        style={{ borderColor: colors.primary }}
                    >
                        📢 Ad Display Area / 広告表示欄 (728x90)
                    </div>
                </div>

                {/* フッター */}
                <footer className="border-t py-8" style={{ borderColor: colors.border }}>
                    <div className="max-w-5xl mx-auto px-4 text-center text-sm" style={{ color: colors.textMuted }}>
                        <div className="flex justify-center gap-4 mb-4">
                            <Link href="#" className="hover:opacity-100 transition-opacity">{t.privacy}</Link>
                            <Link href="#" className="hover:opacity-100 transition-opacity">{t.disclaimer}</Link>
                        </div>
                        <p>{t.copyright}</p>
                    </div>
                </footer>
            </div>
        </main>
    );
}
