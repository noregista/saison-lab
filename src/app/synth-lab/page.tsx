'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import * as Tone from 'tone';

// ============================================================
// カラーパレット定義
// Energetic・電子的なシンセサイザーテーマ
// ============================================================
const colors = {
    primary: '#00D9FF',    // Cyan
    secondary: '#FF00D9',  // Magenta
    accent: '#00FF88',     // Neon Green
    bgDark: '#0D1117',
    bgCard: '#161b22',
    text: '#f0f0f0',
};

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        title: 'SYNTH LAB',
        subtitle: 'シンセ・ラボ',
        back: '← Saison Lab',
        waveform: '波形',
        sine: 'サイン波',
        sawtooth: '鋸歯状波',
        square: '矩形波',
        triangle: '三角波',
        frequency: '周波数',
        volume: '音量',
        xyPad: 'X-Y パッド',
        xyHint: 'ドラッグで操作（X=周波数、Y=音量）',
        oscilloscope: 'オシロスコープ',
        attack: 'Attack',
        release: 'Release',
        playing: '再生中...',
        ready: 'パッドをドラッグして演奏',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
        copyright: '© 2026 Saison Lab',
    },
    en: {
        title: 'SYNTH LAB',
        subtitle: 'Synthesizer',
        back: '← Saison Lab',
        waveform: 'Waveform',
        sine: 'Sine',
        sawtooth: 'Sawtooth',
        square: 'Square',
        triangle: 'Triangle',
        frequency: 'Frequency',
        volume: 'Volume',
        xyPad: 'X-Y Pad',
        xyHint: 'Drag to play (X=Freq, Y=Vol)',
        oscilloscope: 'Oscilloscope',
        attack: 'Attack',
        release: 'Release',
        playing: 'Playing...',
        ready: 'Drag the pad to play',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
        copyright: '© 2026 Saison Lab',
    },
};

type WaveType = 'sine' | 'sawtooth' | 'square' | 'triangle';

export default function SynthLabPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [waveType, setWaveType] = useState<WaveType>('sine');
    const [isPlaying, setIsPlaying] = useState(false);
    const [frequency, setFrequency] = useState(440);
    const [volume, setVolume] = useState(0.5);
    const [isLoaded, setIsLoaded] = useState(false);

    const synthRef = useRef<Tone.Synth | null>(null);
    const analyserRef = useRef<Tone.Analyser | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const animationRef = useRef<number | null>(null);

    const t = texts[lang];

    // ============================================================
    // 音源初期化
    // Tone.Synthとアナライザーを生成
    // ============================================================
    useEffect(() => {
        const initAudio = async () => {
            await Tone.start();

            // アナライザー（波形可視化用）
            analyserRef.current = new Tone.Analyser('waveform', 256);

            // シンセサイザー
            synthRef.current = new Tone.Synth({
                oscillator: { type: waveType },
                envelope: {
                    attack: 0.01,
                    decay: 0.1,
                    sustain: 0.5,
                    release: 0.5,
                },
            }).connect(analyserRef.current).toDestination();

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
            animationRef.current && cancelAnimationFrame(animationRef.current);
            synthRef.current?.dispose();
            analyserRef.current?.dispose();
        };
    }, []);

    // 波形タイプ変更時の更新
    useEffect(() => {
        if (synthRef.current) {
            synthRef.current.oscillator.type = waveType;
        }
    }, [waveType]);

    // ============================================================
    // オシロスコープ描画
    // Canvasにリアルタイム波形を表示
    // ============================================================
    const drawOscilloscope = useCallback(() => {
        const canvas = canvasRef.current;
        const analyser = analyserRef.current;
        if (!canvas || !analyser) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;

        // 背景クリア
        ctx.fillStyle = colors.bgDark;
        ctx.fillRect(0, 0, width, height);

        // グリッド線
        ctx.strokeStyle = `${colors.primary}22`;
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = (height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        // 波形データ取得
        const values = analyser.getValue() as Float32Array;

        // 波形描画
        ctx.strokeStyle = colors.primary;
        ctx.lineWidth = 2;
        ctx.beginPath();

        const sliceWidth = width / values.length;
        let x = 0;

        for (let i = 0; i < values.length; i++) {
            const v = (values[i] + 1) / 2;
            const y = v * height;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
            x += sliceWidth;
        }

        ctx.stroke();

        // 次フレーム
        animationRef.current = requestAnimationFrame(drawOscilloscope);
    }, []);

    useEffect(() => {
        if (isLoaded) {
            drawOscilloscope();
        }
        return () => {
            animationRef.current && cancelAnimationFrame(animationRef.current);
        };
    }, [isLoaded, drawOscilloscope]);

    // ============================================================
    // X-Yパッド操作
    // ============================================================
    const handlePadMove = useCallback(
        (clientX: number, clientY: number, rect: DOMRect) => {
            const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
            const y = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height));

            // X軸 → 周波数（100Hz〜2000Hz）
            const newFreq = 100 + x * 1900;
            setFrequency(Math.round(newFreq));

            // Y軸 → 音量
            setVolume(y);

            if (synthRef.current && isLoaded) {
                synthRef.current.volume.value = Tone.gainToDb(y);
                if (!isPlaying) {
                    synthRef.current.triggerAttack(newFreq);
                    setIsPlaying(true);
                } else {
                    synthRef.current.frequency.value = newFreq;
                }
            }
        },
        [isLoaded, isPlaying]
    );

    const handlePadEnd = useCallback(() => {
        if (synthRef.current && isPlaying) {
            synthRef.current.triggerRelease();
            setIsPlaying(false);
        }
    }, [isPlaying]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        handlePadMove(e.clientX, e.clientY, rect);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.buttons === 1) {
            const rect = e.currentTarget.getBoundingClientRect();
            handlePadMove(e.clientX, e.clientY, rect);
        }
    };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        handlePadMove(touch.clientX, touch.clientY, rect);
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
        e.preventDefault();
        const touch = e.touches[0];
        const rect = e.currentTarget.getBoundingClientRect();
        handlePadMove(touch.clientX, touch.clientY, rect);
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
                    🔊 {t.title}
                </h1>
                <p className="text-lg opacity-60">{t.subtitle}</p>
            </div>

            {/* メインコンテンツ */}
            <div className="max-w-4xl mx-auto px-4 space-y-6">
                {/* オシロスコープ */}
                <div
                    className="rounded-xl p-4 overflow-hidden"
                    style={{ backgroundColor: colors.bgCard }}
                >
                    <h2
                        className="text-sm font-bold mb-2 text-center"
                        style={{ color: colors.secondary }}
                    >
                        📈 {t.oscilloscope}
                    </h2>
                    <canvas
                        ref={canvasRef}
                        width={600}
                        height={150}
                        className="w-full rounded-lg"
                        style={{ border: `1px solid ${colors.primary}33` }}
                    />
                </div>

                {/* X-Yパッド + 波形選択 */}
                <div className="grid md:grid-cols-2 gap-4">
                    {/* X-Yパッド */}
                    <div
                        className="rounded-xl p-4"
                        style={{ backgroundColor: colors.bgCard }}
                    >
                        <h2
                            className="text-sm font-bold mb-2 text-center"
                            style={{ color: colors.accent }}
                        >
                            🎛️ {t.xyPad}
                        </h2>
                        <div
                            className="relative w-full aspect-square rounded-lg cursor-crosshair"
                            style={{
                                background: `linear-gradient(135deg, ${colors.bgDark} 0%, ${colors.primary}22 100%)`,
                                border: `2px solid ${isPlaying ? colors.accent : colors.primary}`,
                            }}
                            onMouseDown={handleMouseDown}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handlePadEnd}
                            onMouseLeave={handlePadEnd}
                            onTouchStart={handleTouchStart}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handlePadEnd}
                        >
                            {/* 位置インジケーター */}
                            <div
                                className="absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                                style={{
                                    left: `${((frequency - 100) / 1900) * 100}%`,
                                    top: `${(1 - volume) * 100}%`,
                                    backgroundColor: isPlaying ? colors.accent : colors.primary,
                                    boxShadow: isPlaying
                                        ? `0 0 20px ${colors.accent}`
                                        : 'none',
                                }}
                            />
                            {/* 軸ラベル */}
                            <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs opacity-50">
                                {t.frequency}: {frequency}Hz
                            </span>
                            <span
                                className="absolute left-2 top-1/2 -translate-y-1/2 text-xs opacity-50"
                                style={{ writingMode: 'vertical-rl' }}
                            >
                                {t.volume}: {Math.round(volume * 100)}%
                            </span>
                        </div>
                        <p className="text-xs text-center mt-2 opacity-40">
                            {isPlaying ? t.playing : t.xyHint}
                        </p>
                    </div>

                    {/* 波形選択 */}
                    <div
                        className="rounded-xl p-4"
                        style={{ backgroundColor: colors.bgCard }}
                    >
                        <h2
                            className="text-sm font-bold mb-4 text-center"
                            style={{ color: colors.secondary }}
                        >
                            〰️ {t.waveform}
                        </h2>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { type: 'sine' as WaveType, label: t.sine, icon: '∿' },
                                { type: 'sawtooth' as WaveType, label: t.sawtooth, icon: '⩘' },
                                { type: 'square' as WaveType, label: t.square, icon: '⊓' },
                                { type: 'triangle' as WaveType, label: t.triangle, icon: '△' },
                            ].map(({ type, label, icon }) => (
                                <button
                                    key={type}
                                    onClick={() => setWaveType(type)}
                                    className="py-3 px-4 rounded-lg text-sm font-bold transition-all"
                                    style={{
                                        backgroundColor:
                                            waveType === type
                                                ? colors.primary
                                                : `${colors.primary}22`,
                                        color: waveType === type ? colors.bgDark : colors.text,
                                    }}
                                >
                                    <span className="text-xl block mb-1">{icon}</span>
                                    {label}
                                </button>
                            ))}
                        </div>

                        {/* ステータス */}
                        <div className="mt-6 pt-4 border-t border-gray-700">
                            <p className="text-xs text-center opacity-60">
                                {isLoaded ? t.ready : 'Loading...'}
                            </p>
                        </div>
                    </div>
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
        </main>
    );
}
