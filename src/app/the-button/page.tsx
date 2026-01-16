'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

// 不気味なメッセージ（Phase 2用）
const evilMessages = {
    jp: [
        'やめておけ',
        '無駄だ',
        'まだ続けるのか',
        '引き返せ',
        '何を求めている',
        'それでも押すのか',
        '後悔するぞ',
        '止まれ',
    ],
    en: [
        'Stop.',
        'It is futile.',
        'You still continue?',
        'Turn back.',
        'What do you seek?',
        'You will regret this.',
        'Cease.',
        'Why?',
    ],
};

export default function TheButtonPage() {
    const [count, setCount] = useState(0);
    const [buttonPos, setButtonPos] = useState({ x: 50, y: 50 });
    const [message, setMessage] = useState<string | null>(null);
    const [isEnding, setIsEnding] = useState(false);
    const [showEndContent, setShowEndContent] = useState(false);
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number }>>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    // Determine phase based on count
    const getPhase = () => {
        if (count <= 50) return 1;
        if (count <= 100) return 2;
        if (count <= 200) return 3;
        return 4;
    };

    const phase = getPhase();

    // Phase 2: Button escapes cursor
    const handleMouseMove = useCallback((e: MouseEvent) => {
        if (phase !== 2 || !containerRef.current || !buttonRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const buttonRect = buttonRef.current.getBoundingClientRect();

        const mouseX = ((e.clientX - rect.left) / rect.width) * 100;
        const mouseY = ((e.clientY - rect.top) / rect.height) * 100;

        const buttonCenterX = buttonPos.x;
        const buttonCenterY = buttonPos.y;

        const dx = mouseX - buttonCenterX;
        const dy = mouseY - buttonCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 20) {
            // Escape from cursor
            let newX = buttonCenterX - (dx / distance) * 15;
            let newY = buttonCenterY - (dy / distance) * 15;

            // Keep within bounds
            newX = Math.max(15, Math.min(85, newX));
            newY = Math.max(20, Math.min(80, newY));

            setButtonPos({ x: newX, y: newY });
        }
    }, [phase, buttonPos]);

    useEffect(() => {
        if (phase === 2) {
            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, [phase, handleMouseMove]);

    // Click handler
    const handleClick = () => {
        if (isEnding) return;

        const newCount = count + 1;
        setCount(newCount);

        // Phase 2: Show random evil message
        if (newCount > 50 && newCount <= 100 && Math.random() < 0.3) {
            const lang = Math.random() < 0.5 ? 'jp' : 'en';
            const msgs = evilMessages[lang];
            setMessage(msgs[Math.floor(Math.random() * msgs.length)]);
            setTimeout(() => setMessage(null), 1500);
        }

        // Phase 3: Add particles
        if (newCount > 100 && newCount <= 200) {
            const newParticles = Array.from({ length: 5 }, (_, i) => ({
                id: Date.now() + i,
                x: Math.random() * 100,
                y: Math.random() * 100,
                size: Math.random() * 4 + 2,
            }));
            setParticles(prev => [...prev, ...newParticles].slice(-50));
        }

        // Phase 4: Trigger ending
        if (newCount >= 200) {
            setIsEnding(true);
            // Show end content after blackhole animation
            setTimeout(() => setShowEndContent(true), 3000);
        }
    };

    // Phase 1 button styles - grows and glows
    const getButtonStyle = () => {
        const baseSize = 100;
        const growth = Math.min(count * 2, 100);
        const size = baseSize + growth;

        const glowIntensity = Math.min(count * 0.5, 30);
        const hue = 200 + count * 2; // Blue to purple shift

        if (phase === 1) {
            return {
                width: `${size}px`,
                height: `${size}px`,
                fontSize: `${14 + count * 0.2}px`,
                boxShadow: `0 0 ${glowIntensity}px ${glowIntensity / 2}px hsla(${hue}, 70%, 60%, 0.6)`,
                background: `linear-gradient(135deg, hsl(${hue}, 60%, 50%), hsl(${hue + 30}, 70%, 40%))`,
            };
        }

        if (phase === 2) {
            return {
                width: '200px',
                height: '200px',
                fontSize: '18px',
                boxShadow: `0 0 40px 20px hsla(0, 70%, 50%, 0.5)`,
                background: `linear-gradient(135deg, hsl(0, 60%, 40%), hsl(30, 70%, 30%))`,
                transition: 'left 0.3s ease-out, top 0.3s ease-out',
            };
        }

        if (phase === 3) {
            const shake = (count - 100) * 0.5;
            return {
                width: '200px',
                height: '200px',
                fontSize: '18px',
                boxShadow: `0 0 60px 30px hsla(270, 80%, 50%, 0.7)`,
                background: `linear-gradient(135deg, hsl(270, 70%, 30%), hsl(300, 80%, 20%))`,
                animation: `shake ${0.1 - shake * 0.0005}s infinite`,
            };
        }

        if (phase === 4) {
            return {
                width: '300px',
                height: '300px',
                fontSize: '20px',
                boxShadow: `0 0 100px 50px rgba(0, 0, 0, 0.9)`,
                background: '#000',
                animation: 'blackhole 2s ease-in forwards',
            };
        }

        return {};
    };

    // Background based on phase
    const getBackgroundClass = () => {
        if (phase === 1) return 'bg-white';
        if (phase === 2) return 'bg-gray-100';
        if (phase === 3) return 'bg-gradient-to-br from-gray-900 via-purple-900 to-black';
        if (phase === 4) return 'bg-black';
        return 'bg-white';
    };

    return (
        <div
            ref={containerRef}
            className={`min-h-screen relative overflow-hidden transition-all duration-1000 ${getBackgroundClass()}`}
        >
            {/* Custom CSS Animations */}
            <style jsx global>{`
                @keyframes shake {
                    0%, 100% { transform: translate(-50%, -50%) rotate(0deg); }
                    25% { transform: translate(-50%, -50%) translate(${phase === 3 ? (count - 100) * 0.1 : 0}px, -${phase === 3 ? (count - 100) * 0.1 : 0}px) rotate(1deg); }
                    50% { transform: translate(-50%, -50%) translate(-${phase === 3 ? (count - 100) * 0.1 : 0}px, ${phase === 3 ? (count - 100) * 0.1 : 0}px) rotate(-1deg); }
                    75% { transform: translate(-50%, -50%) translate(${phase === 3 ? (count - 100) * 0.05 : 0}px, ${phase === 3 ? (count - 100) * 0.05 : 0}px) rotate(0.5deg); }
                }
                @keyframes blackhole {
                    0% { transform: translate(-50%, -50%) scale(1); }
                    50% { transform: translate(-50%, -50%) scale(3); }
                    100% { transform: translate(-50%, -50%) scale(100); opacity: 0; }
                }
                @keyframes particle {
                    0% { opacity: 1; transform: scale(1); }
                    100% { opacity: 0; transform: scale(0); }
                }
                @keyframes fadeMessage {
                    0% { opacity: 0; transform: translateY(10px); }
                    20% { opacity: 1; transform: translateY(0); }
                    80% { opacity: 1; transform: translateY(0); }
                    100% { opacity: 0; transform: translateY(-10px); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
            `}</style>

            {/* Back Link */}
            <Link
                href="/"
                className={`absolute top-4 left-4 text-sm z-50 transition-colors ${phase >= 3 ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'
                    }`}
            >
                ← Saison Lab
            </Link>

            {/* Language Toggle & Count Display */}
            <div className={`absolute top-4 right-4 flex items-center gap-4 z-50 ${phase >= 3 ? 'text-gray-400' : 'text-gray-500'}`}>
                <button
                    onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                    className={`text-sm px-2 py-1 rounded border transition-colors ${phase >= 3
                            ? 'border-gray-600 hover:border-white hover:text-white'
                            : 'border-gray-400 hover:border-black hover:text-black'
                        }`}
                >
                    {lang === 'jp' ? 'EN' : 'JP'}
                </button>
                <span className="font-mono text-sm">
                    {count.toString().padStart(4, '0')}
                </span>
            </div>

            {/* Ad Placeholder - Only visible in Phase 1 */}
            {phase === 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-40">
                    <div className="bg-gray-100 border border-gray-300 rounded-lg px-8 py-2 text-gray-400 text-xs">
                        Ad Display Area
                    </div>
                </div>
            )}

            {/* Phase 3: Cosmic particles */}
            {phase >= 3 && particles.map(p => (
                <div
                    key={p.id}
                    className="absolute rounded-full bg-white pointer-events-none"
                    style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: `${p.size}px`,
                        height: `${p.size}px`,
                        animation: 'particle 3s ease-out forwards',
                    }}
                />
            ))}

            {/* Phase 3: Dimensional cracks */}
            {phase === 3 && (
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {Array.from({ length: Math.floor((count - 100) / 10) }, (_, i) => (
                        <div
                            key={i}
                            className="absolute bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-30"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                width: `${Math.random() * 200 + 50}px`,
                                height: '2px',
                                transform: `rotate(${Math.random() * 360}deg)`,
                            }}
                        />
                    ))}
                </div>
            )}

            {/* Evil Message (Phase 2) */}
            {message && (
                <div
                    className="absolute left-1/2 top-1/4 -translate-x-1/2 text-xl font-bold text-red-600 z-40"
                    style={{ animation: 'fadeMessage 1.5s ease-out forwards' }}
                >
                    {message}
                </div>
            )}

            {/* THE BUTTON */}
            {!isEnding ? (
                <button
                    ref={buttonRef}
                    onClick={handleClick}
                    className={`absolute rounded-full text-white font-bold uppercase tracking-widest 
                        transition-all duration-300 ease-out cursor-pointer 
                        hover:scale-105 active:scale-95 z-30
                        ${phase === 2 ? '' : 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'}`}
                    style={{
                        ...getButtonStyle(),
                        ...(phase === 2 ? {
                            left: `${buttonPos.x}%`,
                            top: `${buttonPos.y}%`,
                            transform: 'translate(-50%, -50%)',
                        } : {}),
                    }}
                >
                    {phase === 4 ? '...' : 'CLICK'}
                </button>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center z-50">
                    <div
                        className="w-[300px] h-[300px] rounded-full bg-black"
                        style={{ animation: 'blackhole 3s ease-in forwards' }}
                    />
                </div>
            )}

            {/* Ending Screen */}
            {isEnding && (
                <div
                    className="absolute inset-0 bg-black flex flex-col items-center justify-center"
                    style={{ zIndex: 100 }}
                >
                    {!showEndContent ? (
                        <div
                            className="w-[300px] h-[300px] rounded-full bg-black"
                            style={{
                                animation: 'blackhole 3s ease-in forwards',
                                boxShadow: '0 0 100px 50px rgba(0,0,0,0.9)'
                            }}
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center animate-pulse">
                            <p className="text-gray-500 text-lg mb-4 font-mono">
                                {lang === 'jp' ? '観測終了。' : 'Observation Complete.'}
                            </p>
                            <p className="text-gray-600 text-xs mb-8">
                                {lang === 'jp' ? `総クリック数: ${count}` : `Total Clicks: ${count}`}
                            </p>
                            <a
                                href="/"
                                className="text-gray-400 hover:text-white text-sm underline cursor-pointer"
                            >
                                {lang === 'jp' ? 'Saison Lab へ戻る' : 'Return to Saison Lab'}
                            </a>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
