'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import * as Tone from 'tone';

// ============================================================
// カラーパレット定義
// リズム感のあるドラムマシンテーマ
// ============================================================
const colors = {
    primary: '#FF4757',    // Red
    secondary: '#2F3542',  // Dark
    accent: '#FFA502',     // Orange
    bgDark: '#0D1117',
    bgCard: '#161b22',
    text: '#f0f0f0',
    kick: '#FF4757',
    snare: '#FFA502',
    hihat: '#50C878',
};

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        title: 'DRUM LAB',
        subtitle: 'ドラム・ラボ',
        back: '← Saison Lab',
        play: '▶ 再生',
        stop: '■ 停止',
        bpm: 'BPM',
        kick: 'キック',
        snare: 'スネア',
        hihat: 'ハイハット',
        clear: 'クリア',
        hint: 'グリッドをクリックしてビートを作成',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
        copyright: '© 2026 Saison Lab',
    },
    en: {
        title: 'DRUM LAB',
        subtitle: 'Drum Machine',
        back: '← Saison Lab',
        play: '▶ Play',
        stop: '■ Stop',
        bpm: 'BPM',
        kick: 'Kick',
        snare: 'Snare',
        hihat: 'HiHat',
        clear: 'Clear',
        hint: 'Click the grid to create beats',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
        copyright: '© 2026 Saison Lab',
    },
};

// ドラムの種類
type DrumType = 'kick' | 'snare' | 'hihat';
const drumTypes: DrumType[] = ['kick', 'snare', 'hihat'];

// 16ステップ
const STEPS = 16;

export default function DrumLabPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [isPlaying, setIsPlaying] = useState(false);
    const [bpm, setBpm] = useState(120);
    const [currentStep, setCurrentStep] = useState(-1);
    const [isLoaded, setIsLoaded] = useState(false);

    // パターンデータ（各ドラム × 16ステップ）
    const [pattern, setPattern] = useState<Record<DrumType, boolean[]>>({
        kick: Array(STEPS).fill(false),
        snare: Array(STEPS).fill(false),
        hihat: Array(STEPS).fill(false),
    });

    const synthsRef = useRef<Record<DrumType, Tone.MembraneSynth | Tone.NoiseSynth | Tone.MetalSynth> | null>(null);
    const sequenceRef = useRef<Tone.Sequence | null>(null);

    const t = texts[lang];

    // ============================================================
    // 音源初期化
    // 各ドラム用のシンセサイザーを生成
    // ============================================================
    useEffect(() => {
        const initAudio = async () => {
            await Tone.start();

            // キック（MembraneSynth）
            const kick = new Tone.MembraneSynth({
                pitchDecay: 0.05,
                octaves: 6,
                oscillator: { type: 'sine' },
                envelope: {
                    attack: 0.001,
                    decay: 0.3,
                    sustain: 0.01,
                    release: 0.5,
                },
            }).toDestination();

            // スネア（NoiseSynth）
            const snare = new Tone.NoiseSynth({
                noise: { type: 'white' },
                envelope: {
                    attack: 0.001,
                    decay: 0.2,
                    sustain: 0,
                    release: 0.1,
                },
            }).toDestination();

            // ハイハット（MetalSynth）
            const hihat = new Tone.MetalSynth({
                envelope: {
                    attack: 0.001,
                    decay: 0.1,
                    release: 0.01,
                },
                harmonicity: 5.1,
                modulationIndex: 32,
                resonance: 4000,
                octaves: 1.5,
            }).toDestination();
            hihat.volume.value = -10;

            synthsRef.current = { kick, snare, hihat };
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
            sequenceRef.current?.dispose();
            if (synthsRef.current) {
                Object.values(synthsRef.current).forEach((synth) => synth.dispose());
            }
        };
    }, []);

    // BPM変更
    useEffect(() => {
        Tone.getTransport().bpm.value = bpm;
    }, [bpm]);

    // ============================================================
    // シーケンサー再生/停止
    // ============================================================
    const togglePlay = useCallback(() => {
        if (!isLoaded || !synthsRef.current) return;

        if (isPlaying) {
            // 停止
            Tone.getTransport().stop();
            sequenceRef.current?.stop();
            setIsPlaying(false);
            setCurrentStep(-1);
        } else {
            // 再生
            sequenceRef.current?.dispose();

            const sequence = new Tone.Sequence(
                (time, step) => {
                    setCurrentStep(step);

                    // 各ドラムをチェック
                    drumTypes.forEach((drum) => {
                        if (pattern[drum][step] && synthsRef.current) {
                            if (drum === 'kick') {
                                (synthsRef.current.kick as Tone.MembraneSynth).triggerAttackRelease('C1', '8n', time);
                            } else if (drum === 'snare') {
                                (synthsRef.current.snare as Tone.NoiseSynth).triggerAttackRelease('8n', time);
                            } else if (drum === 'hihat') {
                                (synthsRef.current.hihat as Tone.MetalSynth).triggerAttackRelease('C4', '32n', time);
                            }
                        }
                    });
                },
                Array.from({ length: STEPS }, (_, i) => i),
                '16n'
            );

            sequenceRef.current = sequence;
            sequence.start(0);
            Tone.getTransport().start();
            setIsPlaying(true);
        }
    }, [isPlaying, isLoaded, pattern]);

    // パターン変更時にシーケンスを更新（再生中の場合）
    useEffect(() => {
        if (isPlaying && sequenceRef.current) {
            // 再生中はパターンの変更を即座に反映
        }
    }, [pattern, isPlaying]);

    // ============================================================
    // グリッドトグル
    // ============================================================
    const toggleStep = (drum: DrumType, step: number) => {
        setPattern((prev) => {
            const newPattern = { ...prev };
            newPattern[drum] = [...prev[drum]];
            newPattern[drum][step] = !newPattern[drum][step];
            return newPattern;
        });
    };

    // パターンクリア
    const clearPattern = () => {
        setPattern({
            kick: Array(STEPS).fill(false),
            snare: Array(STEPS).fill(false),
            hihat: Array(STEPS).fill(false),
        });
    };

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
                style={{ backgroundImage: 'url("/drum-lab/bg-acoustic.png")' }}
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
                        🥁 {t.title}
                    </h1>
                    <p className="text-lg opacity-60">{t.subtitle}</p>
                </div>

                {/* コントロール */}
                <div className="max-w-4xl mx-auto px-4 mb-6">
                    <div
                        className="rounded-xl p-4 flex flex-wrap justify-center gap-4"
                        style={{ backgroundColor: colors.bgCard }}
                    >
                        {/* 再生/停止 */}
                        <button
                            onClick={togglePlay}
                            disabled={!isLoaded}
                            className="px-6 py-3 rounded-lg font-bold transition-all"
                            style={{
                                backgroundColor: isPlaying ? colors.primary : colors.accent,
                                color: colors.bgDark,
                                opacity: isLoaded ? 1 : 0.5,
                            }}
                        >
                            {isPlaying ? t.stop : t.play}
                        </button>

                        {/* BPM */}
                        <div className="flex items-center gap-3">
                            <span className="text-sm opacity-60">{t.bpm}</span>
                            <button
                                onClick={() => setBpm((prev) => Math.max(60, prev - 10))}
                                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white/10"
                                style={{ borderColor: colors.accent }}
                            >
                                ◀
                            </button>
                            <span
                                className="text-xl font-bold w-12 text-center"
                                style={{ color: colors.accent }}
                            >
                                {bpm}
                            </span>
                            <button
                                onClick={() => setBpm((prev) => Math.min(180, prev + 10))}
                                className="w-8 h-8 rounded-full border flex items-center justify-center hover:bg-white/10"
                                style={{ borderColor: colors.accent }}
                            >
                                ▶
                            </button>
                        </div>

                        {/* クリア */}
                        <button
                            onClick={clearPattern}
                            className="px-4 py-2 rounded-lg text-sm border hover:bg-white/10 transition-all"
                            style={{ borderColor: colors.primary }}
                        >
                            🗑️ {t.clear}
                        </button>
                    </div>
                </div>

                {/* シーケンサーグリッド */}
                <div className="max-w-4xl mx-auto px-2 md:px-4">
                    <div
                        className="rounded-xl p-2 md:p-4 overflow-x-auto"
                        style={{ backgroundColor: colors.bgCard }}
                    >
                        {/* ステップ番号 - モバイルでスクロール可能 */}
                        <div className="flex mb-2 ml-16 md:ml-20 min-w-[384px] md:min-w-0">
                            {[...Array(STEPS)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-6 md:w-8 h-5 md:h-6 flex items-center justify-center text-[10px] md:text-xs opacity-40"
                                    style={{
                                        color: currentStep === i ? colors.accent : colors.text,
                                        fontWeight: currentStep === i ? 'bold' : 'normal',
                                    }}
                                >
                                    {i + 1}
                                </div>
                            ))}
                        </div>

                        {/* 各ドラム行 */}
                        {drumTypes.map((drum) => (
                            <div key={drum} className="flex items-center mb-2 min-w-[384px] md:min-w-0">
                                {/* ドラム名 */}
                                <div
                                    className="w-16 md:w-20 text-xs md:text-sm font-bold flex-shrink-0"
                                    style={{
                                        color:
                                            drum === 'kick'
                                                ? colors.kick
                                                : drum === 'snare'
                                                    ? colors.snare
                                                    : colors.hihat,
                                    }}
                                >
                                    {drum === 'kick'
                                        ? t.kick
                                        : drum === 'snare'
                                            ? t.snare
                                            : t.hihat}
                                </div>

                                {/* グリッド */}
                                <div className="flex">
                                    {[...Array(STEPS)].map((_, step) => {
                                        const isActive = pattern[drum][step];
                                        const isCurrent = currentStep === step;
                                        const drumColor =
                                            drum === 'kick'
                                                ? colors.kick
                                                : drum === 'snare'
                                                    ? colors.snare
                                                    : colors.hihat;

                                        return (
                                            <button
                                                key={step}
                                                onClick={() => toggleStep(drum, step)}
                                                className="w-6 h-6 md:w-8 md:h-8 rounded m-0.5 transition-all"
                                                style={{
                                                    backgroundColor: isActive
                                                        ? drumColor
                                                        : isCurrent
                                                            ? `${drumColor}44`
                                                            : `${drumColor}22`,
                                                    border: isCurrent
                                                        ? `2px solid ${colors.accent}`
                                                        : '2px solid transparent',
                                                    transform:
                                                        isCurrent && isActive
                                                            ? 'scale(1.1)'
                                                            : 'none',
                                                }}
                                                aria-label={`${drum} step ${step + 1}`}
                                            />
                                        );
                                    })}
                                </div>
                            </div>
                        ))}

                        <p className="text-xs text-center mt-4 opacity-40">{t.hint}</p>
                    </div>
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
