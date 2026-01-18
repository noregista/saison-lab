'use client';

// NAME LAB - メインページ
// 意図: 世界観に没入する「召喚体験」で唯一無二の名前を生成

import { useState, useCallback, useRef, useEffect } from 'react';
import Link from 'next/link';
import { WorldCategory, GeneratedName, Language, FilterSettings } from './data/types';
import { translations } from './data/semantics';
import { generateNames, generateSingleName } from './utils/generator';
import { hslToString, getPersonalityFont } from './utils/colorMapper';

// 意図: 背景画像マップ
const backgroundImages: Record<WorldCategory, string> = {
    fantasy: '/name-lab/bg-fantasy.png',
    sf: '/name-lab/bg-sf.png',
    japanese: '/name-lab/bg-japanese.png',
};

// 意図: カテゴリカラー
const categoryColors: Record<WorldCategory, string> = {
    fantasy: '#8B5CF6',
    sf: '#06B6D4',
    japanese: '#64748B',
};

export default function NameLabPage() {
    // 意図: 状態管理
    const [lang, setLang] = useState<Language>('jp');
    const [category, setCategory] = useState<WorldCategory>('fantasy');
    const [keyword, setKeyword] = useState('');
    const [syllableMin, setSyllableMin] = useState(2);
    const [syllableMax, setSyllableMax] = useState(5);
    const [isBulkMode, setIsBulkMode] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedNames, setGeneratedNames] = useState<GeneratedName[]>([]);
    const [selectedName, setSelectedName] = useState<GeneratedName | null>(null);
    const [favorites, setFavorites] = useState<GeneratedName[]>([]);
    const [showSummonEffect, setShowSummonEffect] = useState(false);

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const t = translations[lang];

    // 意図: 召喚エフェクトをCanvas描画
    const drawSummonEffect = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
        const centerX = width / 2;
        const centerY = height / 2;
        let frame = 0;
        const maxFrames = 60;

        const animate = () => {
            if (frame >= maxFrames) {
                setShowSummonEffect(false);
                return;
            }

            ctx.clearRect(0, 0, width, height);
            const progress = frame / maxFrames;

            if (category === 'fantasy') {
                // 魔法陣エフェクト
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.rotate(progress * Math.PI * 4);

                // 外円
                ctx.beginPath();
                ctx.arc(0, 0, 80 + progress * 50, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(139, 92, 246, ${0.8 - progress * 0.5})`;
                ctx.lineWidth = 3;
                ctx.stroke();

                // 内円
                ctx.beginPath();
                ctx.arc(0, 0, 40 + progress * 20, 0, Math.PI * 2);
                ctx.strokeStyle = `rgba(167, 139, 250, ${0.9 - progress * 0.5})`;
                ctx.lineWidth = 2;
                ctx.stroke();

                // 光の粒子
                for (let i = 0; i < 12; i++) {
                    const angle = (i / 12) * Math.PI * 2;
                    const dist = 100 * (1 - progress);
                    const x = Math.cos(angle) * dist;
                    const y = Math.sin(angle) * dist;

                    ctx.beginPath();
                    ctx.arc(x, y, 4 * (1 - progress), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.8 - progress * 0.5})`;
                    ctx.fill();
                }

                ctx.restore();
            } else if (category === 'sf') {
                // グリッチエフェクト
                const glitchIntensity = (1 - progress) * 20;

                // スキャンライン
                for (let y = 0; y < height; y += 4) {
                    if (Math.random() > 0.7) {
                        ctx.fillStyle = `rgba(6, 182, 212, ${0.1 * (1 - progress)})`;
                        ctx.fillRect(0, y, width, 2);
                    }
                }

                // ホログラムボックス
                ctx.save();
                ctx.translate(centerX, centerY);
                ctx.strokeStyle = `rgba(6, 182, 212, ${0.8 - progress * 0.5})`;
                ctx.lineWidth = 2;

                const boxSize = 60 + progress * 40;
                ctx.strokeRect(-boxSize / 2 + (Math.random() - 0.5) * glitchIntensity,
                    -boxSize / 2 + (Math.random() - 0.5) * glitchIntensity,
                    boxSize, boxSize);
                ctx.restore();
            } else {
                // 墨エフェクト
                ctx.save();
                ctx.translate(centerX, centerY);

                // 墨の滲み
                const radius = progress * 100;
                const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, radius);
                gradient.addColorStop(0, `rgba(30, 30, 30, ${0.8 - progress * 0.6})`);
                gradient.addColorStop(0.5, `rgba(60, 60, 60, ${0.4 - progress * 0.3})`);
                gradient.addColorStop(1, 'rgba(100, 100, 100, 0)');

                ctx.beginPath();
                ctx.arc(0, 0, radius, 0, Math.PI * 2);
                ctx.fillStyle = gradient;
                ctx.fill();

                // 飛沫
                for (let i = 0; i < 8; i++) {
                    const angle = (i / 8) * Math.PI * 2 + progress * Math.PI;
                    const dist = 50 + progress * 80;
                    const x = Math.cos(angle) * dist;
                    const y = Math.sin(angle) * dist;

                    ctx.beginPath();
                    ctx.arc(x, y, 3 * (1 - progress), 0, Math.PI * 2);
                    ctx.fillStyle = `rgba(30, 30, 30, ${0.6 - progress * 0.5})`;
                    ctx.fill();
                }

                ctx.restore();
            }

            frame++;
            requestAnimationFrame(animate);
        };

        animate();
    }, [category]);

    // 意図: 召喚エフェクト開始
    useEffect(() => {
        if (showSummonEffect && canvasRef.current) {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
                drawSummonEffect(ctx, canvas.width, canvas.height);
            }
        }
    }, [showSummonEffect, drawSummonEffect]);

    // 意図: 単一召喚
    const handleSummon = useCallback(() => {
        setIsGenerating(true);
        setShowSummonEffect(true);

        setTimeout(() => {
            const name = generateSingleName(category, keyword || undefined);
            if (name) {
                setSelectedName(name);
                setGeneratedNames([name]);
            }
            setIsGenerating(false);
        }, 1000);
    }, [category, keyword]);

    // 意図: 大量生成
    const handleBulkGenerate = useCallback(() => {
        setIsGenerating(true);

        const filters: FilterSettings = {
            syllableMin,
            syllableMax,
            keywords: keyword ? [keyword] : [],
            excludePatterns: [],
        };

        setTimeout(() => {
            const names = generateNames(category, 100, keyword || undefined, filters);
            setGeneratedNames(names);
            setSelectedName(null);
            setIsGenerating(false);
        }, 500);
    }, [category, keyword, syllableMin, syllableMax]);

    // 意図: 名前をクリップボードにコピー
    const copyToClipboard = (name: string) => {
        navigator.clipboard.writeText(name);
    };

    // 意図: お気に入りに追加
    const addToFavorites = (name: GeneratedName) => {
        if (!favorites.find(f => f.name === name.name)) {
            setFavorites([...favorites, name]);
        }
    };

    // 意図: CSV出力
    const exportCSV = () => {
        const csv = generatedNames.map(n =>
            `"${n.name}","${n.meaning.jp}","${n.meaning.en}","${n.origin.join('/')}"`
        ).join('\n');
        const blob = new Blob([`Name,Meaning_JP,Meaning_EN,Origin\n${csv}`], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'name-lab-export.csv';
        a.click();
    };

    // 意図: 性格の翻訳
    const getPersonalityLabel = (personality: string): string => {
        const key = `personality${personality.charAt(0).toUpperCase() + personality.slice(1)}` as keyof typeof t;
        return t[key] || personality;
    };

    return (
        <main className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#0a0a0a' }}>
            {/* 意図: 動的背景画像 */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
                style={{
                    backgroundImage: `url("${backgroundImages[category]}")`,
                    opacity: 0.4,
                }}
            />

            {/* 意図: 召喚エフェクトCanvas */}
            {showSummonEffect && (
                <canvas
                    ref={canvasRef}
                    className="absolute inset-0 z-30 pointer-events-none"
                />
            )}

            {/* 意図: コンテンツラッパー */}
            <div className="relative z-10">
                {/* Header */}
                <header className="sticky top-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-lg transition-colors"
                                    style={{ backgroundColor: categoryColors[category] }}
                                >
                                    {category === 'fantasy' ? '✨' : category === 'sf' ? '🔮' : '筆'}
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-white">{t.title}</h1>
                                    <p className="text-xs text-white/60">{t.subtitle}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                {/* 言語切替 */}
                                <div className="flex bg-white/10 rounded-full p-1">
                                    <button
                                        onClick={() => setLang('jp')}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'jp' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
                                    >
                                        JP
                                    </button>
                                    <button
                                        onClick={() => setLang('en')}
                                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'en' ? 'bg-white text-black' : 'text-white/70 hover:text-white'}`}
                                    >
                                        EN
                                    </button>
                                </div>
                                <Link href="/" className="text-sm text-white/60 hover:text-white transition-colors">
                                    {t.back}
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 意図: カテゴリ選択 */}
                <div className="max-w-6xl mx-auto px-4 py-6">
                    <div className="flex justify-center gap-4 mb-6">
                        {(['fantasy', 'sf', 'japanese'] as WorldCategory[]).map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategory(cat)}
                                className={`px-6 py-3 rounded-xl font-medium transition-all transform hover:scale-105 ${category === cat
                                    ? 'text-white shadow-lg'
                                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                                    }`}
                                style={category === cat ? { backgroundColor: categoryColors[cat] } : {}}
                            >
                                {cat === 'fantasy' ? t.categoryFantasy : cat === 'sf' ? t.categorySF : t.categoryJapanese}
                            </button>
                        ))}
                    </div>

                    {/* 意図: 広告エリア1（魔法の額縁スタイル） */}
                    <div
                        className="rounded-xl px-4 py-3 text-center text-sm mb-6 border-2"
                        style={{
                            borderColor: categoryColors[category],
                            backgroundColor: `${categoryColors[category]}10`,
                            color: categoryColors[category],
                        }}
                    >
                        {category === 'fantasy' ? '✨ 魔法の額縁 ✨' : category === 'sf' ? '[ DATA CONSOLE ]' : '〜 古代の巻物 〜'} — {t.adText} (728×90)
                    </div>

                    {/* 意図: 検索・フィルター */}
                    <div className="bg-white/5 rounded-2xl p-6 mb-6 backdrop-blur-sm border border-white/10">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                            {/* キーワード入力 */}
                            <div className="lg:col-span-2">
                                <label className="block text-sm text-white/60 mb-2">{t.filterKeywords}</label>
                                <input
                                    type="text"
                                    value={keyword}
                                    onChange={(e) => setKeyword(e.target.value)}
                                    placeholder={t.searchPlaceholder}
                                    className="w-full px-4 py-3 bg-black/50 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-white/50 transition-colors"
                                />
                            </div>

                            {/* 音節数 */}
                            <div>
                                <label className="block text-sm text-white/60 mb-2">{t.filterSyllables}</label>
                                <div className="flex gap-2">
                                    <select
                                        value={syllableMin}
                                        onChange={(e) => setSyllableMin(Number(e.target.value))}
                                        className="flex-1 px-3 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:outline-none"
                                    >
                                        {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                    <span className="text-white/40 self-center">〜</span>
                                    <select
                                        value={syllableMax}
                                        onChange={(e) => setSyllableMax(Number(e.target.value))}
                                        className="flex-1 px-3 py-3 bg-black/50 border border-white/20 rounded-xl text-white focus:outline-none"
                                    >
                                        {[2, 3, 4, 5, 6, 7, 8].map(n => <option key={n} value={n}>{n}</option>)}
                                    </select>
                                </div>
                            </div>

                            {/* モード切替 */}
                            <div>
                                <label className="block text-sm text-white/60 mb-2">Mode</label>
                                <button
                                    onClick={() => setIsBulkMode(!isBulkMode)}
                                    className={`w-full px-4 py-3 rounded-xl font-medium transition-all ${isBulkMode
                                        ? 'bg-amber-500 text-black'
                                        : 'bg-white/10 text-white/70 hover:bg-white/20'
                                        }`}
                                >
                                    {isBulkMode ? t.bulkModeButton : t.singleModeButton}
                                </button>
                            </div>
                        </div>

                        {/* 生成ボタン */}
                        <button
                            onClick={isBulkMode ? handleBulkGenerate : handleSummon}
                            disabled={isGenerating}
                            className="w-full py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{ backgroundColor: categoryColors[category], color: 'white' }}
                        >
                            {isGenerating ? t.generating : t.generateButton}
                        </button>
                    </div>

                    {/* 意図: 結果表示 */}
                    {!isBulkMode && selectedName && (
                        <div className="bg-white/5 rounded-2xl p-8 mb-6 backdrop-blur-sm border border-white/10 text-center">
                            {/* 召喚された名前 */}
                            <div
                                className="text-5xl md:text-7xl font-bold mb-4 transition-all"
                                style={{
                                    color: hslToString(selectedName.color),
                                    fontWeight: getPersonalityFont(selectedName.personality).weight,
                                    fontStyle: getPersonalityFont(selectedName.personality).style,
                                }}
                            >
                                {selectedName.name}
                            </div>

                            {selectedName.reading && selectedName.reading !== selectedName.name && (
                                <p className="text-white/60 mb-4">{selectedName.reading}</p>
                            )}

                            {/* 属性情報 */}
                            <div className="flex flex-wrap justify-center gap-3 mb-6">
                                <span
                                    className="px-4 py-2 rounded-full text-sm"
                                    style={{ backgroundColor: `${hslToString(selectedName.color)}30`, color: hslToString(selectedName.color) }}
                                >
                                    {t.meaningLabel}: {selectedName.meaning[lang]}
                                </span>
                                <span className="px-4 py-2 rounded-full text-sm bg-white/10 text-white/80">
                                    {t.originLabel}: {selectedName.origin.join(', ')}
                                </span>
                                <span className="px-4 py-2 rounded-full text-sm bg-white/10 text-white/80">
                                    {t.personalityLabel}: {getPersonalityLabel(selectedName.personality)}
                                </span>
                            </div>

                            {/* アクションボタン */}
                            <div className="flex justify-center gap-3">
                                <button
                                    onClick={() => copyToClipboard(selectedName.name)}
                                    className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white/80 transition-colors"
                                >
                                    📋 {t.copyButton}
                                </button>
                                <button
                                    onClick={() => addToFavorites(selectedName)}
                                    className="px-6 py-2 bg-amber-500/20 hover:bg-amber-500/30 rounded-full text-amber-400 transition-colors"
                                >
                                    ⭐ {t.favoriteButton}
                                </button>
                            </div>

                            {/* 警告表示 */}
                            {selectedName.warnings && selectedName.warnings.length > 0 && (
                                <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-xl">
                                    <p className="text-red-400 text-sm">⚠️ {selectedName.warnings.join(', ')}</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 意図: 大量生成結果グリッド */}
                    {isBulkMode && generatedNames.length > 0 && (
                        <div className="bg-white/5 rounded-2xl p-6 mb-6 backdrop-blur-sm border border-white/10">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold text-white">
                                    {generatedNames.length} {lang === 'jp' ? '件の名前' : 'names'}
                                </h2>
                                <button
                                    onClick={exportCSV}
                                    className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 rounded-full text-green-400 text-sm transition-colors"
                                >
                                    📥 {t.exportCSV}
                                </button>
                            </div>

                            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-8 xl:grid-cols-10 gap-2">
                                {generatedNames.map((name, idx) => (
                                    <button
                                        key={`${name.name}-${idx}`}
                                        onClick={() => setSelectedName(name)}
                                        className="p-3 rounded-xl text-center transition-all hover:scale-105 border border-transparent hover:border-white/20"
                                        style={{ backgroundColor: `${hslToString(name.color)}20` }}
                                    >
                                        <span
                                            className="block font-medium truncate"
                                            style={{ color: hslToString(name.color) }}
                                        >
                                            {name.name}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 意図: 結果なし */}
                    {generatedNames.length === 0 && !isGenerating && (
                        <div className="text-center py-16 text-white/40">
                            <span className="text-6xl mb-4 block">
                                {category === 'fantasy' ? '🔮' : category === 'sf' ? '💫' : '🌸'}
                            </span>
                            <p>{t.description}</p>
                        </div>
                    )}

                    {/* 意図: お気に入りリスト */}
                    {favorites.length > 0 && (
                        <div className="bg-amber-500/10 rounded-2xl p-6 mb-6 border border-amber-500/30">
                            <h3 className="text-lg font-bold text-amber-400 mb-4">⭐ {t.favoriteButton} ({favorites.length})</h3>
                            <div className="flex flex-wrap gap-2">
                                {favorites.map((fav, idx) => (
                                    <span
                                        key={`fav-${idx}`}
                                        className="px-4 py-2 rounded-full text-sm cursor-pointer hover:bg-amber-500/20 transition-colors"
                                        style={{ backgroundColor: `${hslToString(fav.color)}20`, color: hslToString(fav.color) }}
                                        onClick={() => copyToClipboard(fav.name)}
                                    >
                                        {fav.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* 意図: 広告エリア2 */}
                    <div
                        className="rounded-xl px-4 py-6 text-center text-sm mb-6 border-2"
                        style={{
                            borderColor: categoryColors[category],
                            backgroundColor: `${categoryColors[category]}10`,
                            color: categoryColors[category],
                        }}
                    >
                        {t.adText} (300×250)
                    </div>
                </div>

                {/* Footer */}
                <footer className="bg-black/80 border-t border-white/10 py-6">
                    <div className="max-w-6xl mx-auto text-center text-white/50 text-sm">
                        <p>© 2026 Saison Lab. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </main>
    );
}
