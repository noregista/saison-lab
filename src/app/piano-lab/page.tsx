'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import * as Tone from 'tone';

// ============================================================
// カラーパレット定義
// エメラルドグリーンアクセントのミニマルテーマ
// ============================================================
const colors = {
    accent: '#50C878',
    gold: '#D4AF37',
    light: {
        bg: '#FDFBF7',
        text: '#1a1a1a',
        whiteKey: '#FFFFFF',
        whiteKeyActive: '#E8E8E8',
        blackKey: '#1a1a1a',
        blackKeyActive: '#2D2D2D',
        card: '#ffffff',
    },
    dark: {
        bg: '#0D1117',
        text: '#f0f0f0',
        whiteKey: '#E8E8E8',
        whiteKeyActive: '#D0D0D0',
        blackKey: '#2D2D2D',
        blackKeyActive: '#404040',
        card: '#161b22',
    },
};

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        title: 'PIANO LAB',
        subtitle: 'ピアノ・ラボ',
        back: '← Saison Lab',
        octave: 'オクターブ',
        volume: '音量',
        guide: '操作ガイド',
        guideWhite: 'A S D F G H J K L ; \' : 白鍵',
        guideBlack: 'W E T Y U O P : 黒鍵',
        guideOctave: '← → : オクターブ変更',
        guideSustain: 'Space : サステイン',
        loading: '音源読み込み中...',
        ready: '準備完了！キーボードまたはタッチで演奏できます',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
        copyright: '© 2026 Saison Lab',
    },
    en: {
        title: 'PIANO LAB',
        subtitle: 'Virtual Piano',
        back: '← Saison Lab',
        octave: 'Octave',
        volume: 'Volume',
        guide: 'Keyboard Guide',
        guideWhite: 'A S D F G H J K L ; \' : White keys',
        guideBlack: 'W E T Y U O P : Black keys',
        guideOctave: '← → : Change octave',
        guideSustain: 'Space : Sustain',
        loading: 'Loading sounds...',
        ready: 'Ready! Play with keyboard or touch',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
        copyright: '© 2026 Saison Lab',
    },
};

// ============================================================
// キーマッピング定義
// PCキーボード → 音名マッピング（2オクターブ）
// ============================================================
const keyMap: Record<string, { note: string; isBlack: boolean }> = {
    // 白鍵
    a: { note: 'C', isBlack: false },
    s: { note: 'D', isBlack: false },
    d: { note: 'E', isBlack: false },
    f: { note: 'F', isBlack: false },
    g: { note: 'G', isBlack: false },
    h: { note: 'A', isBlack: false },
    j: { note: 'B', isBlack: false },
    k: { note: 'C+', isBlack: false }, // 次のオクターブ
    l: { note: 'D+', isBlack: false },
    ';': { note: 'E+', isBlack: false },
    "'": { note: 'F+', isBlack: false },
    // 黒鍵
    w: { note: 'C#', isBlack: true },
    e: { note: 'D#', isBlack: true },
    t: { note: 'F#', isBlack: true },
    y: { note: 'G#', isBlack: true },
    u: { note: 'A#', isBlack: true },
    o: { note: 'C#+', isBlack: true },
    p: { note: 'D#+', isBlack: true },
};

// 鍵盤表示用の配列（視覚的な順序）
const pianoKeys = [
    { note: 'C', key: 'A', isBlack: false },
    { note: 'C#', key: 'W', isBlack: true },
    { note: 'D', key: 'S', isBlack: false },
    { note: 'D#', key: 'E', isBlack: true },
    { note: 'E', key: 'D', isBlack: false },
    { note: 'F', key: 'F', isBlack: false },
    { note: 'F#', key: 'T', isBlack: true },
    { note: 'G', key: 'G', isBlack: false },
    { note: 'G#', key: 'Y', isBlack: true },
    { note: 'A', key: 'H', isBlack: false },
    { note: 'A#', key: 'U', isBlack: true },
    { note: 'B', key: 'J', isBlack: false },
    { note: 'C+', key: 'K', isBlack: false, nextOctave: true },
    { note: 'C#+', key: 'O', isBlack: true, nextOctave: true },
    { note: 'D+', key: 'L', isBlack: false, nextOctave: true },
    { note: 'D#+', key: 'P', isBlack: true, nextOctave: true },
    { note: 'E+', key: ';', isBlack: false, nextOctave: true },
    { note: 'F+', key: "'", isBlack: false, nextOctave: true },
];

// ============================================================
// メインコンポーネント
// ============================================================
export default function PianoLabPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [isDark, setIsDark] = useState(true);
    const [octave, setOctave] = useState(4);
    const [volume, setVolume] = useState(0.7);
    const [isLoaded, setIsLoaded] = useState(false);
    const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
    const [sustainActive, setSustainActive] = useState(false);

    const synthRef = useRef<Tone.PolySynth | null>(null);
    const t = texts[lang];
    const theme = isDark ? colors.dark : colors.light;

    // ============================================================
    // 音源初期化
    // Tone.js PolySynthを使用（低レイテンシ）
    // ============================================================
    useEffect(() => {
        const initAudio = async () => {
            await Tone.start();
            synthRef.current = new Tone.PolySynth(Tone.Synth, {
                oscillator: { type: 'triangle' },
                envelope: {
                    attack: 0.005,
                    decay: 0.3,
                    sustain: 0.4,
                    release: 1.5,
                },
            }).toDestination();
            setIsLoaded(true);
        };

        // ユーザー操作時に初期化
        const handleFirstInteraction = () => {
            initAudio();
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('keydown', handleFirstInteraction);
            synthRef.current?.dispose();
        };
    }, []);

    // ボリューム変更時の反映
    useEffect(() => {
        if (synthRef.current) {
            synthRef.current.volume.value = Tone.gainToDb(volume);
        }
    }, [volume]);

    // ============================================================
    // 音符名からTone.js用の音符文字列を生成
    // ============================================================
    const getNoteString = useCallback(
        (note: string) => {
            const isNextOctave = note.includes('+');
            const baseNote = note.replace('+', '');
            const noteOctave = isNextOctave ? octave + 1 : octave;
            return `${baseNote}${noteOctave}`;
        },
        [octave]
    );

    // ============================================================
    // 音の発音
    // ============================================================
    const playNote = useCallback(
        (note: string) => {
            if (!synthRef.current || !isLoaded) return;
            const noteString = getNoteString(note);
            synthRef.current.triggerAttack(noteString);
        },
        [getNoteString, isLoaded]
    );

    // ============================================================
    // 音の停止
    // ============================================================
    const stopNote = useCallback(
        (note: string) => {
            if (!synthRef.current || sustainActive) return;
            const noteString = getNoteString(note);
            synthRef.current.triggerRelease(noteString);
        },
        [getNoteString, sustainActive]
    );

    // ============================================================
    // キーボードイベントハンドラ
    // ============================================================
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.repeat) return;

            // オクターブ変更
            if (e.key === 'ArrowLeft') {
                setOctave((prev) => Math.max(1, prev - 1));
                return;
            }
            if (e.key === 'ArrowRight') {
                setOctave((prev) => Math.min(7, prev + 1));
                return;
            }

            // サステインペダル
            if (e.key === ' ') {
                e.preventDefault();
                setSustainActive(true);
                return;
            }

            // 音符キー
            const key = e.key.toLowerCase();
            const mapping = keyMap[key];
            if (mapping && !activeKeys.has(mapping.note)) {
                setActiveKeys((prev) => new Set(prev).add(mapping.note));
                playNote(mapping.note);
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            // サステインペダル解除
            if (e.key === ' ') {
                setSustainActive(false);
                // サステイン解除時に全リリース
                if (synthRef.current) {
                    synthRef.current.releaseAll();
                }
                return;
            }

            const key = e.key.toLowerCase();
            const mapping = keyMap[key];
            if (mapping) {
                setActiveKeys((prev) => {
                    const next = new Set(prev);
                    next.delete(mapping.note);
                    return next;
                });
                stopNote(mapping.note);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
        };
    }, [activeKeys, playNote, stopNote]);

    // ============================================================
    // タッチ/クリックハンドラ
    // ============================================================
    const handleKeyPress = (note: string) => {
        if (!activeKeys.has(note)) {
            setActiveKeys((prev) => new Set(prev).add(note));
            playNote(note);
        }
    };

    const handleKeyRelease = (note: string) => {
        setActiveKeys((prev) => {
            const next = new Set(prev);
            next.delete(note);
            return next;
        });
        stopNote(note);
    };

    // ============================================================
    // レンダリング
    // ============================================================
    return (
        <main
            className="min-h-screen transition-colors duration-300 relative"
            style={{ backgroundColor: theme.bg, color: theme.text }}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-30 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("/piano-lab/bg-wood.png")' }}
            />
            {/* Content Wrapper */}
            <div className="relative z-10">
                {/* ヘッダー */}
                <header className="flex items-center justify-between p-4 max-w-4xl mx-auto">
                    <Link
                        href="/"
                        className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                    >
                        {t.back}
                    </Link>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsDark(!isDark)}
                            className="p-2 rounded-full hover:bg-white/10 transition-colors"
                            aria-label="Toggle theme"
                        >
                            {isDark ? '☀️' : '🌙'}
                        </button>
                        <button
                            onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                            className="px-3 py-1 text-sm border rounded-full hover:bg-white/10 transition-colors"
                            style={{ borderColor: colors.accent }}
                        >
                            {lang === 'jp' ? 'EN' : 'JP'}
                        </button>
                    </div>
                </header>

                {/* タイトル */}
                <div className="text-center py-8">
                    <h1
                        className="text-4xl md:text-5xl font-bold mb-2"
                        style={{ color: colors.accent }}
                    >
                        🎹 {t.title}
                    </h1>
                    <p className="text-lg opacity-60">{t.subtitle}</p>
                    <p className="text-sm mt-2 opacity-40">
                        {isLoaded ? t.ready : t.loading}
                    </p>
                </div>

                {/* ピアノ鍵盤 */}
                <div className="max-w-4xl mx-auto px-2 md:px-4">
                    <div
                        className="relative rounded-xl p-2 md:p-4 overflow-x-auto"
                        style={{ backgroundColor: theme.card }}
                    >
                        {/* 鍵盤コンテナ - モバイルでスクロール可能 */}
                        <div className="flex justify-center min-w-[540px] md:min-w-0">
                            <div className="relative flex">
                                {/* 白鍵 */}
                                {pianoKeys
                                    .filter((k) => !k.isBlack)
                                    .map((keyData, index) => {
                                        const isActive = activeKeys.has(keyData.note);
                                        return (
                                            <button
                                                key={keyData.note}
                                                className="relative w-12 md:w-14 h-40 md:h-48 border border-gray-300 rounded-b-lg transition-all duration-75 flex flex-col justify-end items-center pb-2"
                                                style={{
                                                    backgroundColor: isActive
                                                        ? colors.gold
                                                        : theme.whiteKey,
                                                    transform: isActive
                                                        ? 'translateY(2px)'
                                                        : 'none',
                                                    boxShadow: isActive
                                                        ? 'inset 0 -2px 5px rgba(0,0,0,0.2)'
                                                        : '0 2px 5px rgba(0,0,0,0.2)',
                                                }}
                                                onMouseDown={() =>
                                                    handleKeyPress(keyData.note)
                                                }
                                                onMouseUp={() =>
                                                    handleKeyRelease(keyData.note)
                                                }
                                                onMouseLeave={() =>
                                                    handleKeyRelease(keyData.note)
                                                }
                                                onTouchStart={(e) => {
                                                    e.preventDefault();
                                                    handleKeyPress(keyData.note);
                                                }}
                                                onTouchEnd={() =>
                                                    handleKeyRelease(keyData.note)
                                                }
                                                aria-label={`${keyData.note.replace('+', '')} ${keyData.nextOctave ? octave + 1 : octave} 白鍵`}
                                                role="button"
                                            >
                                                <span
                                                    className="text-xs font-mono opacity-50"
                                                    style={{ color: '#1a1a1a' }}
                                                >
                                                    {keyData.key}
                                                </span>
                                            </button>
                                        );
                                    })}

                                {/* 黒鍵（絶対位置で配置） */}
                                {pianoKeys
                                    .filter((k) => k.isBlack)
                                    .map((keyData) => {
                                        const isActive = activeKeys.has(keyData.note);
                                        // 黒鍵の位置計算（白鍵の間に配置）
                                        // モバイル: w-12 = 48px, デスクトップ: w-14 = 56px
                                        const whiteKeyWidth = 48; // モバイル基準
                                        const positions: Record<string, number> = {
                                            'C#': 0,
                                            'D#': 1,
                                            'F#': 3,
                                            'G#': 4,
                                            'A#': 5,
                                            'C#+': 7,
                                            'D#+': 8,
                                        };
                                        const pos = positions[keyData.note] ?? 0;
                                        const left = pos * whiteKeyWidth + whiteKeyWidth * 0.65;

                                        return (
                                            <button
                                                key={keyData.note}
                                                className="absolute w-8 md:w-9 h-24 md:h-28 rounded-b-lg transition-all duration-75 flex flex-col justify-end items-center pb-1 z-10"
                                                style={{
                                                    left: `${left}px`,
                                                    top: '16px',
                                                    backgroundColor: isActive
                                                        ? colors.gold
                                                        : theme.blackKey,
                                                    transform: isActive
                                                        ? 'translateY(2px)'
                                                        : 'none',
                                                    boxShadow: isActive
                                                        ? 'inset 0 -1px 3px rgba(0,0,0,0.3)'
                                                        : '0 3px 8px rgba(0,0,0,0.4)',
                                                }}
                                                onMouseDown={() =>
                                                    handleKeyPress(keyData.note)
                                                }
                                                onMouseUp={() =>
                                                    handleKeyRelease(keyData.note)
                                                }
                                                onMouseLeave={() =>
                                                    handleKeyRelease(keyData.note)
                                                }
                                                onTouchStart={(e) => {
                                                    e.preventDefault();
                                                    handleKeyPress(keyData.note);
                                                }}
                                                onTouchEnd={() =>
                                                    handleKeyRelease(keyData.note)
                                                }
                                                aria-label={`${keyData.note.replace('+', '')} ${keyData.nextOctave ? octave + 1 : octave} 黒鍵`}
                                                role="button"
                                            >
                                                <span
                                                    className="text-xs font-mono"
                                                    style={{ color: '#ffffff' }}
                                                >
                                                    {keyData.key}
                                                </span>
                                            </button>
                                        );
                                    })}
                            </div>
                        </div>
                    </div>

                    {/* コントロール */}
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
                        {/* オクターブ */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm opacity-60">{t.octave}</span>
                            <button
                                onClick={() => setOctave((prev) => Math.max(1, prev - 1))}
                                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white/10 transition-colors"
                                style={{ borderColor: colors.accent }}
                            >
                                ◀
                            </button>
                            <span
                                className="text-xl font-bold w-8 text-center"
                                style={{ color: colors.accent }}
                            >
                                {octave}
                            </span>
                            <button
                                onClick={() => setOctave((prev) => Math.min(7, prev + 1))}
                                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white/10 transition-colors"
                                style={{ borderColor: colors.accent }}
                            >
                                ▶
                            </button>
                        </div>

                        {/* ボリューム */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm opacity-60">{t.volume}</span>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                value={volume}
                                onChange={(e) => setVolume(parseFloat(e.target.value))}
                                className="w-32 accent-emerald-500"
                                aria-label="Volume"
                            />
                        </div>

                        {/* サステイン表示 */}
                        <div
                            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm"
                            style={{
                                backgroundColor: sustainActive
                                    ? colors.accent
                                    : 'transparent',
                                border: `1px solid ${colors.accent}`,
                            }}
                        >
                            🎛️ Sustain: {sustainActive ? 'ON' : 'OFF'}
                        </div>
                    </div>
                </div>

                {/* 広告エリア */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div
                        className="border-2 border-dashed rounded-lg px-4 py-8 text-center text-sm opacity-50"
                        style={{ borderColor: colors.accent }}
                    >
                        📢 Ad Display Area / 広告表示欄 (728x90)
                    </div>
                </div>

                {/* 操作ガイド */}
                <div className="max-w-4xl mx-auto px-4 pb-8">
                    <div
                        className="rounded-xl p-6"
                        style={{ backgroundColor: theme.card }}
                    >
                        <h2
                            className="text-lg font-bold mb-4 text-center"
                            style={{ color: colors.accent }}
                        >
                            📖 {t.guide}
                        </h2>
                        <div className="grid md:grid-cols-2 gap-2 text-sm opacity-80">
                            <p>• {t.guideWhite}</p>
                            <p>• {t.guideBlack}</p>
                            <p>• {t.guideOctave}</p>
                            <p>• {t.guideSustain}</p>
                        </div>
                    </div>
                </div>

                {/* フッター */}
                <footer
                    className="border-t py-6"
                    style={{ borderColor: `${colors.accent}33` }}
                >
                    <div className="max-w-4xl mx-auto px-4 text-center text-sm opacity-60">
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
            </div>
        </main>
    );
}
