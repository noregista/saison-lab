'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Link from 'next/link';
import { teas, categories, caffeineLabels, type Tea, type TeaCategory } from './data';

// ============================================================
// カラーパレット定義
// Calming & Scientific（アースカラー）テーマ
// ============================================================
const colors = {
    primary: '#5D9B4B',    // Deep Green
    secondary: '#8B4513',  // Amber/Brown
    accent: '#D4A574',     // Light Brown
    bgDark: '#0F1410',
    bgCard: '#1A211C',
    text: '#E8E4DF',
    muted: '#6B7260',
};

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        title: 'THE BREW',
        subtitle: 'ザ・ブリュー',
        back: '← Saison Lab',
        search: 'お茶を検索...',
        allCategories: 'すべて',
        temp: '温度',
        time: '時間',
        origin: '産地',
        caffeine: 'カフェイン',
        tips: 'ポイント',
        start: '開始',
        stop: '停止',
        reset: 'リセット',
        done: '完成！',
        selectTea: 'お茶を選択してください',
        teasCount: '種類',
        celsius: '℃',
        fahrenheit: '°F',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
        copyright: '© 2026 Saison Lab',
    },
    en: {
        title: 'THE BREW',
        subtitle: 'Tea Guide',
        back: '← Saison Lab',
        search: 'Search teas...',
        allCategories: 'All',
        temp: 'Temperature',
        time: 'Time',
        origin: 'Origin',
        caffeine: 'Caffeine',
        tips: 'Tips',
        start: 'Start',
        stop: 'Stop',
        reset: 'Reset',
        done: 'Done!',
        selectTea: 'Select a tea',
        teasCount: 'types',
        celsius: '℃',
        fahrenheit: '°F',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
        copyright: '© 2026 Saison Lab',
    },
};

// 摂氏から華氏への変換
const celsiusToFahrenheit = (c: number): number => Math.round((c * 9) / 5 + 32);

// 秒をMM:SS形式に変換
const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export default function TheBrewPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<TeaCategory | 'all'>('all');
    const [selectedTea, setSelectedTea] = useState<string | null>(null);
    const [useCelsius, setUseCelsius] = useState(true);
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [timerComplete, setTimerComplete] = useState(false);

    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const t = texts[lang];

    // ============================================================
    // お茶フィルタリング
    // ============================================================
    const filteredTeas = useMemo(() => {
        let result = teas;

        // カテゴリフィルタ
        if (selectedCategory !== 'all') {
            result = result.filter((tea) => tea.category === selectedCategory);
        }

        // 検索フィルタ
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (tea) =>
                    tea.name.jp.toLowerCase().includes(query) ||
                    tea.name.en.toLowerCase().includes(query)
            );
        }

        return result;
    }, [searchQuery, selectedCategory]);

    // ============================================================
    // 選択お茶のデータ取得
    // ============================================================
    const selectedTeaData = useMemo(() => {
        return teas.find((tea) => tea.id === selectedTea);
    }, [selectedTea]);

    // お茶選択時にタイマーを初期化
    useEffect(() => {
        if (selectedTeaData) {
            setTimerSeconds(selectedTeaData.timeMin || 60);
            setIsTimerRunning(false);
            setTimerComplete(false);
        }
    }, [selectedTeaData]);

    // ============================================================
    // タイマーロジック
    // ============================================================
    useEffect(() => {
        if (isTimerRunning && timerSeconds > 0) {
            timerRef.current = setTimeout(() => {
                setTimerSeconds((prev) => prev - 1);
            }, 1000);
        } else if (isTimerRunning && timerSeconds === 0) {
            setIsTimerRunning(false);
            setTimerComplete(true);
            // 完了通知音（オプション）
            try {
                const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1sbGhqaGlqa2ptemJWXVteYGFiY2NkY2RjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2M=');
                audio.volume = 0.3;
                audio.play().catch(() => { });
            } catch {
                // 音声再生失敗は無視
            }
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        };
    }, [isTimerRunning, timerSeconds]);

    const startTimer = useCallback(() => {
        setIsTimerRunning(true);
        setTimerComplete(false);
    }, []);

    const stopTimer = useCallback(() => {
        setIsTimerRunning(false);
    }, []);

    const resetTimer = useCallback(() => {
        setIsTimerRunning(false);
        setTimerComplete(false);
        if (selectedTeaData) {
            setTimerSeconds(selectedTeaData.timeMin || 60);
        }
    }, [selectedTeaData]);

    // ============================================================
    // カテゴリ色取得
    // ============================================================
    const getCategoryColor = (categoryId: TeaCategory) => {
        return categories.find((c) => c.id === categoryId)?.color || colors.primary;
    };

    // ============================================================
    // レンダリング
    // ============================================================
    return (
        <main
            className="min-h-screen"
            style={{ backgroundColor: colors.bgDark, color: colors.text }}
        >
            {/* ヘッダー */}
            <header className="flex items-center justify-between p-4 max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                    {t.back}
                </Link>
                <button
                    onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                    className="px-3 py-1 text-sm border rounded-full hover:bg-white/10 transition-colors"
                    style={{ borderColor: colors.primary }}
                >
                    {lang === 'jp' ? 'EN' : 'JP'}
                </button>
            </header>

            {/* タイトル */}
            <div className="text-center py-6">
                <h1
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: colors.primary }}
                >
                    🍵 {t.title}
                </h1>
                <p className="text-lg opacity-60">{t.subtitle}</p>
                <p className="text-sm opacity-40 mt-1">
                    {teas.length} {t.teasCount}
                </p>
            </div>

            {/* メインコンテンツ */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* 左: お茶リスト */}
                    <div
                        className="rounded-xl p-4 lg:col-span-1"
                        style={{ backgroundColor: colors.bgCard }}
                    >
                        {/* 検索バー */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder={t.search}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg text-sm"
                                style={{
                                    backgroundColor: colors.bgDark,
                                    border: `1px solid ${colors.primary}44`,
                                    color: colors.text,
                                }}
                            />
                        </div>

                        {/* カテゴリフィルタ */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            <button
                                onClick={() => setSelectedCategory('all')}
                                className="px-3 py-1 rounded-full text-xs transition-all"
                                style={{
                                    backgroundColor:
                                        selectedCategory === 'all'
                                            ? colors.primary
                                            : `${colors.primary}22`,
                                    color:
                                        selectedCategory === 'all'
                                            ? colors.bgDark
                                            : colors.text,
                                }}
                            >
                                {t.allCategories}
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className="px-3 py-1 rounded-full text-xs transition-all"
                                    style={{
                                        backgroundColor:
                                            selectedCategory === cat.id
                                                ? cat.color
                                                : `${cat.color}22`,
                                        color:
                                            selectedCategory === cat.id
                                                ? colors.bgDark
                                                : colors.text,
                                    }}
                                >
                                    {cat.icon} {lang === 'jp' ? cat.name.jp : cat.name.en}
                                </button>
                            ))}
                        </div>

                        {/* お茶リスト */}
                        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                            {filteredTeas.map((tea) => {
                                const catColor = getCategoryColor(tea.category);
                                return (
                                    <button
                                        key={tea.id}
                                        onClick={() => setSelectedTea(tea.id)}
                                        className="w-full text-left px-4 py-3 rounded-lg transition-all"
                                        style={{
                                            backgroundColor:
                                                selectedTea === tea.id
                                                    ? catColor
                                                    : `${catColor}22`,
                                            color:
                                                selectedTea === tea.id
                                                    ? '#fff'
                                                    : colors.text,
                                        }}
                                    >
                                        <span className="font-bold">
                                            {lang === 'jp' ? tea.name.jp : tea.name.en}
                                        </span>
                                        <span className="text-xs ml-2 opacity-60">
                                            {lang === 'jp' ? tea.origin.jp : tea.origin.en}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 右: 詳細・抽出パネル */}
                    <div className="lg:col-span-2 space-y-4">
                        {selectedTeaData ? (
                            <>
                                {/* お茶情報 */}
                                <div
                                    className="rounded-xl p-6"
                                    style={{ backgroundColor: colors.bgCard }}
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div
                                            className="w-4 h-4 rounded-full"
                                            style={{
                                                backgroundColor: getCategoryColor(
                                                    selectedTeaData.category
                                                ),
                                            }}
                                        />
                                        <h2 className="text-2xl font-bold">
                                            {lang === 'jp'
                                                ? selectedTeaData.name.jp
                                                : selectedTeaData.name.en}
                                        </h2>
                                    </div>
                                    <p className="text-sm opacity-70 mb-4">
                                        {lang === 'jp'
                                            ? selectedTeaData.description.jp
                                            : selectedTeaData.description.en}
                                    </p>

                                    {/* 統計 */}
                                    <div className="grid grid-cols-2 gap-4">
                                        <div
                                            className="p-3 rounded-lg"
                                            style={{ backgroundColor: colors.bgDark }}
                                        >
                                            <p className="text-xs opacity-50">{t.origin}</p>
                                            <p className="font-bold">
                                                {lang === 'jp'
                                                    ? selectedTeaData.origin.jp
                                                    : selectedTeaData.origin.en}
                                            </p>
                                        </div>
                                        <div
                                            className="p-3 rounded-lg"
                                            style={{ backgroundColor: colors.bgDark }}
                                        >
                                            <p className="text-xs opacity-50">{t.caffeine}</p>
                                            <p className="font-bold">
                                                {lang === 'jp'
                                                    ? caffeineLabels[selectedTeaData.caffeine].jp
                                                    : caffeineLabels[selectedTeaData.caffeine].en}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* 抽出パラメータ・パネル */}
                                <div
                                    className="rounded-xl p-6"
                                    style={{ backgroundColor: colors.bgCard }}
                                >
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* 温度 */}
                                        <div
                                            className="p-4 rounded-lg text-center"
                                            style={{ backgroundColor: colors.bgDark }}
                                        >
                                            <p className="text-sm opacity-50 mb-2">
                                                🌡️ {t.temp}
                                            </p>
                                            <p
                                                className="text-3xl font-bold mb-2"
                                                style={{ color: colors.primary }}
                                            >
                                                {useCelsius
                                                    ? `${selectedTeaData.tempMin}-${selectedTeaData.tempMax}${t.celsius}`
                                                    : `${celsiusToFahrenheit(selectedTeaData.tempMin)}-${celsiusToFahrenheit(selectedTeaData.tempMax)}${t.fahrenheit}`}
                                            </p>
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => setUseCelsius(true)}
                                                    className="px-3 py-1 rounded text-xs"
                                                    style={{
                                                        backgroundColor: useCelsius
                                                            ? colors.primary
                                                            : `${colors.primary}22`,
                                                        color: useCelsius
                                                            ? colors.bgDark
                                                            : colors.text,
                                                    }}
                                                >
                                                    {t.celsius}
                                                </button>
                                                <button
                                                    onClick={() => setUseCelsius(false)}
                                                    className="px-3 py-1 rounded text-xs"
                                                    style={{
                                                        backgroundColor: !useCelsius
                                                            ? colors.secondary
                                                            : `${colors.secondary}22`,
                                                        color: !useCelsius
                                                            ? '#fff'
                                                            : colors.text,
                                                    }}
                                                >
                                                    {t.fahrenheit}
                                                </button>
                                            </div>
                                        </div>

                                        {/* タイマー */}
                                        <div
                                            className="p-4 rounded-lg text-center"
                                            style={{ backgroundColor: colors.bgDark }}
                                        >
                                            <p className="text-sm opacity-50 mb-2">
                                                ⏱️ {t.time}
                                            </p>
                                            <p
                                                className="text-4xl font-bold mb-2 font-mono"
                                                style={{
                                                    color: timerComplete
                                                        ? colors.primary
                                                        : isTimerRunning
                                                            ? colors.accent
                                                            : colors.text,
                                                }}
                                            >
                                                {timerComplete ? t.done : formatTime(timerSeconds)}
                                            </p>

                                            {/* プログレスバー */}
                                            {selectedTeaData.timeMin > 0 && (
                                                <div
                                                    className="w-full h-2 rounded mb-3"
                                                    style={{ backgroundColor: `${colors.primary}33` }}
                                                >
                                                    <div
                                                        className="h-2 rounded transition-all"
                                                        style={{
                                                            width: `${((selectedTeaData.timeMin - timerSeconds) /
                                                                    selectedTeaData.timeMin) *
                                                                100
                                                                }%`,
                                                            backgroundColor: colors.primary,
                                                        }}
                                                    />
                                                </div>
                                            )}

                                            {/* コントロール */}
                                            <div className="flex justify-center gap-2">
                                                {!isTimerRunning ? (
                                                    <button
                                                        onClick={startTimer}
                                                        disabled={
                                                            selectedTeaData.timeMin === 0 || timerComplete
                                                        }
                                                        className="px-4 py-2 rounded text-sm font-bold"
                                                        style={{
                                                            backgroundColor: colors.primary,
                                                            color: colors.bgDark,
                                                            opacity:
                                                                selectedTeaData.timeMin === 0 || timerComplete
                                                                    ? 0.5
                                                                    : 1,
                                                        }}
                                                    >
                                                        ▶ {t.start}
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={stopTimer}
                                                        className="px-4 py-2 rounded text-sm font-bold"
                                                        style={{
                                                            backgroundColor: colors.secondary,
                                                            color: '#fff',
                                                        }}
                                                    >
                                                        ⏸ {t.stop}
                                                    </button>
                                                )}
                                                <button
                                                    onClick={resetTimer}
                                                    className="px-4 py-2 rounded text-sm border"
                                                    style={{ borderColor: colors.muted }}
                                                >
                                                    ↻ {t.reset}
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tips */}
                                    <div
                                        className="mt-4 p-4 rounded-lg border-l-4"
                                        style={{
                                            backgroundColor: colors.bgDark,
                                            borderColor: colors.accent,
                                        }}
                                    >
                                        <p className="text-xs opacity-50 mb-1">💡 {t.tips}</p>
                                        <p className="text-sm">
                                            {lang === 'jp'
                                                ? selectedTeaData.tips.jp
                                                : selectedTeaData.tips.en}
                                        </p>
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div
                                className="rounded-xl p-12 text-center"
                                style={{ backgroundColor: colors.bgCard }}
                            >
                                <p className="text-6xl mb-4">🍃</p>
                                <p className="opacity-50">{t.selectTea}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 広告エリア */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div
                    className="border-2 border-dashed rounded-lg px-4 py-8 text-center text-sm opacity-50"
                    style={{ borderColor: colors.primary }}
                >
                    📢 Ad Display Area / 広告表示欄 (728x90)
                </div>
            </div>

            {/* フッター */}
            <footer
                className="border-t py-6"
                style={{ borderColor: `${colors.primary}33` }}
            >
                <div className="max-w-6xl mx-auto px-4 text-center text-sm opacity-60">
                    <div className="flex justify-center gap-4 mb-2">
                        <Link href="#" className="hover:opacity-100 transition-opacity">
                            {t.privacy}
                        </Link>
                        <Link href="#" className="hover:opacity-100 transition-opacity">
                            {t.disclaimer}
                        </Link>
                    </div>
                    <p>{t.copyright}</p>
                </div>
            </footer>

            {/* 非表示オーディオ要素 */}
            <audio ref={audioRef} />
        </main>
    );
}
