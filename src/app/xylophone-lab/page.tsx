'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import * as Tone from 'tone';

// ============================================================
// カラーパレット定義
// Creative Material・カラフルな木琴テーマ
// ============================================================
const colors = {
    primary: '#FF6B6B',    // Coral
    secondary: '#4ECDC4',  // Teal
    accent: '#FFE66D',     // Yellow
    bgDark: '#1a1a2e',
    bgCard: '#16213e',
    text: '#f0f0f0',
};

// 鍵盤の色（虹色グラデーション）
const keyColors = [
    '#FF6B6B', // C - Red
    '#FF8E53', // D - Orange
    '#FFE66D', // E - Yellow
    '#4ECDC4', // F - Teal
    '#45B7D1', // G - Light Blue
    '#6C5CE7', // A - Purple
    '#A29BFE', // B - Lavender
    '#FF6B6B', // C - Red (高オクターブ)
    '#FF8E53', // D
    '#FFE66D', // E
    '#4ECDC4', // F
    '#45B7D1', // G
];

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        title: 'XYLOPHONE LAB',
        subtitle: '木琴ラボ',
        back: '← Saison Lab',
        instrument: '音色',
        wood: '木琴',
        metal: '鉄琴',
        volume: '音量',
        demo: 'デモ演奏',
        twinkle: 'きらきら星',
        tulip: 'チューリップ',
        hint: 'キーをタップして演奏',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
        copyright: '© 2026 Saison Lab',
    },
    en: {
        title: 'XYLOPHONE LAB',
        subtitle: 'Virtual Xylophone',
        back: '← Saison Lab',
        instrument: 'Instrument',
        wood: 'Xylophone',
        metal: 'Glockenspiel',
        volume: 'Volume',
        demo: 'Demo',
        twinkle: 'Twinkle Star',
        tulip: 'Tulip',
        hint: 'Tap keys to play',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
        copyright: '© 2026 Saison Lab',
    },
};

// デモメロディ定義
type MelodyKey = 'twinkle' | 'tulip';
const demoMelodies: Record<MelodyKey, { note: string; duration: number }[]> = {
    twinkle: [
        { note: 'C4', duration: 400 }, { note: 'C4', duration: 400 },
        { note: 'G4', duration: 400 }, { note: 'G4', duration: 400 },
        { note: 'A4', duration: 400 }, { note: 'A4', duration: 400 },
        { note: 'G4', duration: 800 },
        { note: 'F4', duration: 400 }, { note: 'F4', duration: 400 },
        { note: 'E4', duration: 400 }, { note: 'E4', duration: 400 },
        { note: 'D4', duration: 400 }, { note: 'D4', duration: 400 },
        { note: 'C4', duration: 800 },
    ],
    tulip: [
        { note: 'C4', duration: 400 }, { note: 'D4', duration: 400 },
        { note: 'E4', duration: 800 },
        { note: 'C4', duration: 400 }, { note: 'D4', duration: 400 },
        { note: 'E4', duration: 800 },
        { note: 'G4', duration: 400 }, { note: 'E4', duration: 400 },
        { note: 'D4', duration: 400 }, { note: 'C4', duration: 400 },
        { note: 'D4', duration: 400 }, { note: 'E4', duration: 400 },
        { note: 'D4', duration: 800 },
    ],
};

// 音階定義
const notes = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5', 'D5', 'E5', 'F5', 'G5'];
const noteLabels = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C', 'D', 'E', 'F', 'G'];

type InstrumentType = 'wood' | 'metal';

// 波紋エフェクト用の型
interface Ripple {
    id: number;
    x: number;
    y: number;
    color: string;
}

export default function XylophoneLabPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [instrumentType, setInstrumentType] = useState<InstrumentType>('wood');
    const [volume, setVolume] = useState(0.7);
    const [isLoaded, setIsLoaded] = useState(false);
    const [ripples, setRipples] = useState<Ripple[]>([]);
    const [activeKeys, setActiveKeys] = useState<Set<number>>(new Set());

    const synthRef = useRef<Tone.PolySynth | null>(null);
    const rippleIdRef = useRef(0);

    const t = texts[lang];

    // ============================================================
    // 音源初期化
    // 木琴/鉄琴の音色をPolySynthで再現
    // ============================================================
    useEffect(() => {
        const initAudio = async () => {
            await Tone.start();

            // 打楽器的な減衰音
            synthRef.current = new Tone.PolySynth(Tone.Synth, {
                oscillator: {
                    type: instrumentType === 'wood' ? 'triangle' : 'sine',
                },
                envelope: {
                    attack: 0.001,
                    decay: instrumentType === 'wood' ? 0.3 : 0.8,
                    sustain: 0.1,
                    release: instrumentType === 'wood' ? 0.5 : 1.5,
                },
            }).toDestination();

            synthRef.current.volume.value = Tone.gainToDb(volume);
            setIsLoaded(true);
        };

        const handleFirstInteraction = () => {
            initAudio();
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);

        return () => {
            document.removeEventListener('click', handleFirstInteraction);
            document.removeEventListener('touchstart', handleFirstInteraction);
            synthRef.current?.dispose();
        };
    }, []);

    // 音色変更時の更新
    useEffect(() => {
        if (synthRef.current) {
            synthRef.current.set({
                oscillator: {
                    type: instrumentType === 'wood' ? 'triangle' : 'sine',
                },
                envelope: {
                    decay: instrumentType === 'wood' ? 0.3 : 0.8,
                    release: instrumentType === 'wood' ? 0.5 : 1.5,
                },
            });
        }
    }, [instrumentType]);

    // ボリューム変更時の更新
    useEffect(() => {
        if (synthRef.current) {
            synthRef.current.volume.value = Tone.gainToDb(volume);
        }
    }, [volume]);

    // ============================================================
    // 波紋エフェクト追加
    // ============================================================
    const addRipple = useCallback((x: number, y: number, color: string) => {
        const id = rippleIdRef.current++;
        setRipples((prev) => [...prev, { id, x, y, color }]);

        // 0.6秒後に削除
        setTimeout(() => {
            setRipples((prev) => prev.filter((r) => r.id !== id));
        }, 600);
    }, []);

    // ============================================================
    // 鍵盤押下
    // ============================================================
    const playNote = useCallback(
        (index: number, event: React.MouseEvent | React.TouchEvent) => {
            if (!synthRef.current || !isLoaded) return;

            const note = notes[index];
            synthRef.current.triggerAttackRelease(note, '8n');

            // アクティブ状態
            setActiveKeys((prev) => new Set(prev).add(index));
            setTimeout(() => {
                setActiveKeys((prev) => {
                    const next = new Set(prev);
                    next.delete(index);
                    return next;
                });
            }, 150);

            // 波紋エフェクト
            const rect = (event.target as HTMLElement).getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            addRipple(x, y, keyColors[index]);
        },
        [isLoaded, addRipple]
    );

    // ============================================================
    // デモメロディ再生
    // ============================================================
    const [isPlayingDemo, setIsPlayingDemo] = useState(false);

    const playMelody = useCallback((melodyKey: MelodyKey) => {
        if (!synthRef.current || !isLoaded || isPlayingDemo) return;

        setIsPlayingDemo(true);
        const melody = demoMelodies[melodyKey];
        let delay = 0;

        melody.forEach(({ note, duration }) => {
            setTimeout(() => {
                if (synthRef.current) {
                    synthRef.current.triggerAttackRelease(note, '8n');
                    const noteIndex = notes.indexOf(note);
                    if (noteIndex !== -1) {
                        setActiveKeys((prev) => new Set(prev).add(noteIndex));
                        setTimeout(() => {
                            setActiveKeys((prev) => {
                                const next = new Set(prev);
                                next.delete(noteIndex);
                                return next;
                            });
                        }, 150);
                    }
                }
            }, delay);
            delay += duration;
        });

        setTimeout(() => setIsPlayingDemo(false), delay);
    }, [isLoaded, isPlayingDemo]);

    // ============================================================
    // レンダリング
    // ============================================================
    return (
        <main
            className="min-h-screen relative"
            style={{ backgroundColor: colors.bgDark, color: colors.text }}
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-30 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'url("/xylophone-lab/bg-kids.png")' }}
            />
            {/* Content Wrapper */}
            <div className="relative z-10">
                {/* 波紋エフェクト */}
                {ripples.map((ripple) => (
                    <div
                        key={ripple.id}
                        className="fixed pointer-events-none rounded-full animate-ping"
                        style={{
                            left: ripple.x - 50,
                            top: ripple.y - 50,
                            width: 100,
                            height: 100,
                            backgroundColor: ripple.color,
                            opacity: 0.5,
                            zIndex: 100,
                        }}
                    />
                ))}

                {/* ヘッダー */}
                <header className="flex items-center justify-between p-4 max-w-4xl mx-auto">
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
                        🎵 {t.title}
                    </h1>
                    <p className="text-lg opacity-60">{t.subtitle}</p>
                </div>

                {/* コントロール */}
                <div className="max-w-4xl mx-auto px-4 mb-6">
                    <div
                        className="rounded-xl p-4 flex flex-wrap justify-center gap-6"
                        style={{ backgroundColor: colors.bgCard }}
                    >
                        {/* 音色切替 */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm opacity-60">{t.instrument}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setInstrumentType('wood')}
                                    className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                                    style={{
                                        backgroundColor:
                                            instrumentType === 'wood'
                                                ? colors.primary
                                                : `${colors.primary}22`,
                                        color:
                                            instrumentType === 'wood'
                                                ? colors.bgDark
                                                : colors.text,
                                    }}
                                >
                                    🪵 {t.wood}
                                </button>
                                <button
                                    onClick={() => setInstrumentType('metal')}
                                    className="px-4 py-2 rounded-lg text-sm font-bold transition-all"
                                    style={{
                                        backgroundColor:
                                            instrumentType === 'metal'
                                                ? colors.secondary
                                                : `${colors.secondary}22`,
                                        color:
                                            instrumentType === 'metal'
                                                ? colors.bgDark
                                                : colors.text,
                                    }}
                                >
                                    🔔 {t.metal}
                                </button>
                            </div>
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
                                className="w-32"
                                style={{ accentColor: colors.accent }}
                            />
                        </div>

                        {/* デモメロディ */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm opacity-60">{t.demo}</span>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => playMelody('twinkle')}
                                    disabled={isPlayingDemo}
                                    className="px-3 py-1.5 rounded-full text-xs border hover:bg-white/10 transition-all disabled:opacity-50"
                                    style={{ borderColor: colors.accent }}
                                >
                                    ⭐ {t.twinkle}
                                </button>
                                <button
                                    onClick={() => playMelody('tulip')}
                                    disabled={isPlayingDemo}
                                    className="px-3 py-1.5 rounded-full text-xs border hover:bg-white/10 transition-all disabled:opacity-50"
                                    style={{ borderColor: colors.accent }}
                                >
                                    🌷 {t.tulip}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 木琴鍵盤 */}
                <div className="max-w-4xl mx-auto px-4">
                    <div
                        className="rounded-xl p-6 overflow-x-auto"
                        style={{ backgroundColor: colors.bgCard }}
                    >
                        <div className="flex justify-center gap-1 md:gap-2 min-w-max">
                            {notes.map((note, index) => {
                                const isActive = activeKeys.has(index);
                                // 鍵盤の高さ（グラデーション）
                                const height = 180 - index * 8;

                                return (
                                    <button
                                        key={note}
                                        onClick={(e) => playNote(index, e)}
                                        onTouchStart={(e) => {
                                            e.preventDefault();
                                            playNote(index, e);
                                        }}
                                        className="flex flex-col items-center justify-end rounded-lg transition-all duration-75"
                                        style={{
                                            width: 50,
                                            height: height,
                                            backgroundColor: keyColors[index],
                                            transform: isActive
                                                ? 'translateY(4px) scale(0.95)'
                                                : 'none',
                                            boxShadow: isActive
                                                ? 'inset 0 -4px 10px rgba(0,0,0,0.3)'
                                                : `0 4px 15px ${keyColors[index]}66`,
                                        }}
                                        aria-label={`${noteLabels[index]} key`}
                                    >
                                        <span
                                            className="text-sm font-bold pb-2"
                                            style={{ color: colors.bgDark }}
                                        >
                                            {noteLabels[index]}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                        <p className="text-xs text-center mt-4 opacity-40">{t.hint}</p>
                    </div>
                </div>

                {/* 広告エリア */}
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <div
                        className="border-2 border-dashed rounded-lg px-4 py-8 text-center text-sm opacity-50"
                        style={{ borderColor: colors.secondary }}
                    >
                        📢 Ad Display Area / 広告表示欄 (728x90)
                    </div>
                </div>

                {/* フッター */}
                <footer
                    className="border-t py-6"
                    style={{ borderColor: `${colors.primary}33` }}
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
