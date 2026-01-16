'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useNeoStore } from '@/lib/store';
import { v4 as uuidv4 } from 'uuid';

// 多言語テキスト定義
const texts = {
    jp: {
        subtitle: 'セゾン ラボ ｜ 次世代体験',
        observationLogs: '観測ログ',
        returnToMain: 'メインへ戻る',
        day: '昼',
        night: '夜',
    },
    en: {
        subtitle: 'Saison Lab | Next-Gen Experience',
        observationLogs: 'Observation Logs',
        returnToMain: 'Return to Main',
        day: 'Day',
        night: 'Night',
    },
};

// Observation Logs Generator
const generateLog = (lang: 'jp' | 'en') => {
    const prefixes = lang === 'jp'
        ? ['観測', '検知', '受信', '解析']
        : ['Observed', 'Detected', 'Received', 'Analyzing'];
    const subjects = lang === 'jp'
        ? ['未確認信号', '霊的波動', 'サイバー空間の歪み', '古代の記憶']
        : ['Unidentified Signal', 'Spectral Wave', 'Cyber Distortion', 'Ancient Memory'];
    const ids = uuidv4().split('-')[0].toUpperCase();

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const subject = subjects[Math.floor(Math.random() * subjects.length)];

    return `[${ids}] ${prefix}: ${subject}`;
};

export function UIOverlay() {
    const { theme, toggleTheme, language, toggleLanguage, timeString, setMouse } = useNeoStore();
    const [logs, setLogs] = useState<string[]>([]);
    const t = texts[language];

    // Mouse tracker
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Normalize to -1 to 1
            const x = (e.clientX / window.innerWidth) * 2 - 1;
            const y = -(e.clientY / window.innerHeight) * 2 + 1;
            setMouse(x, y);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [setMouse]);

    // Log generation loop - regenerate logs when language changes
    useEffect(() => {
        // Clear old logs and generate new ones in the current language
        setLogs([generateLog(language)]);
        const interval = setInterval(() => {
            setLogs(prev => [generateLog(language), ...prev].slice(0, 5));
        }, 3000);
        return () => clearInterval(interval);
    }, [language]);

    // Styles based on theme
    const textColor = theme === 'day' ? 'text-black' : 'text-cyan-400';
    const borderColor = theme === 'day' ? 'border-black' : 'border-cyan-400';

    return (
        <div className={`absolute inset-0 pointer-events-none p-6 flex flex-col justify-between font-mono ${textColor} transition-colors duration-500`}>

            {/* Top Header */}
            <header className="flex justify-between items-start pointer-events-auto">
                <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold tracking-widest uppercase flex items-center gap-2">
                        <span className={`inline-block w-4 h-4 ${theme === 'day' ? 'bg-black' : 'bg-cyan-400'}`}></span>
                        NEO-CHRONICLE
                    </h1>
                    <p className="text-xs opacity-70">{t.subtitle}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <div className="text-3xl font-light tracking-wider">{timeString}</div>
                    <div className="flex gap-4 text-sm font-bold">
                        <button onClick={toggleTheme} className="hover:underline opacity-80 hover:opacity-100 uppercase">
                            [{theme === 'day' ? t.day : t.night}]
                        </button>
                        <button onClick={toggleLanguage} className="hover:underline opacity-80 hover:opacity-100">
                            [{language.toUpperCase()}]
                        </button>
                    </div>
                </div>
            </header>

            {/* Ad Placeholder */}
            <div className="absolute top-24 left-1/2 -translate-x-1/2 pointer-events-auto">
                <div className={`border ${borderColor} bg-opacity-10 bg-current rounded px-6 py-1 text-xs opacity-50`}>
                    {language === 'jp' ? '広告表示欄' : 'Ad Display Area'}
                </div>
            </div>

            {/* Center (Empty for 3D) */}

            {/* Bottom Footer */}
            <footer className="flex justify-between items-end pointer-events-auto">
                {/* Logs */}
                <div className="flex flex-col gap-1 text-xs opacity-80 max-w-sm">
                    <div className={`border-b ${borderColor} mb-2 pb-1 uppercase tracking-wider`}>{t.observationLogs}</div>
                    {logs.map((log, i) => (
                        <div key={i} className="truncate animate-pulse-slow">
                            {log}
                        </div>
                    ))}
                </div>

                {/* Back Link */}
                <Link href="/" className={`text-sm font-bold border ${borderColor} px-4 py-2 hover:bg-opacity-10 hover:bg-current transition-colors`}>
                    {t.returnToMain}
                </Link>
            </footer>

            {/* Decorative corners */}
            <div className={`absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 ${borderColor} m-4`}></div>
            <div className={`absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 ${borderColor} m-4`}></div>
            <div className={`absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 ${borderColor} m-4`}></div>
            <div className={`absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 ${borderColor} m-4`}></div>
        </div>
    );
}

