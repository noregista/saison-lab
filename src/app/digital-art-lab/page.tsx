'use client';

/**
 * DIGITAL ART LAB
 * 
 * チームラボの美学を彷彿とさせる、生命力に満ちたデジタルアート空間。
 * 触れると生命が生まれる没入型インタラクティブ体験。
 */

import { useState, useCallback } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import AdSlot from './components/AdSlot';

// 動的インポート（SSR無効化）
const ArtCanvas = dynamic(() => import('./components/ArtCanvas'), {
    ssr: false,
    loading: () => (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: '#0a0a1a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#00D9FF',
                fontFamily: 'monospace',
            }}
        >
            <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>✨</div>
                <div style={{ opacity: 0.6 }}>Loading...</div>
            </div>
        </div>
    ),
});

// ============================================================
// 多言語テキスト
// ============================================================
const texts = {
    jp: {
        title: 'DIGITAL ART LAB',
        subtitle: 'デジタル・アート・ラボ',
        description: '画面に触れて、生命を呼び覚ますデジタルアートを体験しよう',
        back: '← Saison Lab',
        sound: 'サウンド',
        soundOn: 'ON',
        soundOff: 'OFF',
        help: 'ヘルプ',
        helpTitle: '操作方法',
        helpText1: '画面に触れると光の粒子が生まれます',
        helpText2: 'タップすると花弁が散ります',
        helpText3: 'マウスを動かすと粒子が追従します',
        close: '閉じる',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
        copyright: '© 2026 Saison Lab',
        tweet: '🌸 触れると生命が生まれるデジタルアートを体験しよう。チームラボに影響を受けた没入型インタラクティブ空間。 #DigitalArt #InteractiveArt #SaisonLab',
    },
    en: {
        title: 'DIGITAL ART LAB',
        subtitle: 'Interactive Art Space',
        description: 'Touch the screen and awaken life in this digital art experience',
        back: '← Saison Lab',
        sound: 'Sound',
        soundOn: 'ON',
        soundOff: 'OFF',
        help: 'Help',
        helpTitle: 'How to Interact',
        helpText1: 'Touch the screen to create light particles',
        helpText2: 'Tap to scatter petals',
        helpText3: 'Move your mouse to guide particles',
        close: 'Close',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
        copyright: '© 2026 Saison Lab',
        tweet: '✨ Experience digital art that comes alive at your touch. An immersive, teamLab-inspired interactive space. #DigitalArt #InteractiveArt #SaisonLab',
    },
};

// ============================================================
// メインページコンポーネント
// ============================================================
export default function DigitalArtLabPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [audioEnabled, setAudioEnabled] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [audioInitialized, setAudioInitialized] = useState(false);

    const t = texts[lang];

    const handleAudioInit = useCallback(() => {
        setAudioInitialized(true);
    }, []);

    const toggleAudio = useCallback(() => {
        setAudioEnabled((prev) => !prev);
    }, []);

    return (
        <>
            {/* SEOメタデータはlayout.tsxで設定 */}

            {/* メインキャンバス */}
            <ArtCanvas
                backgroundImage="/images/digital-art-lab-bg.png"
                audioEnabled={audioEnabled}
                onAudioInit={handleAudioInit}
            />

            {/* ヘッダーオーバーレイ */}
            <header
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    padding: '16px 24px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    zIndex: 200,
                    background: 'linear-gradient(to bottom, rgba(10, 10, 30, 0.6), transparent)',
                }}
            >
                {/* 戻るリンク */}
                <Link
                    href="/"
                    style={{
                        color: 'rgba(255, 255, 255, 0.6)',
                        textDecoration: 'none',
                        fontSize: '14px',
                        transition: 'color 0.3s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#00D9FF')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')}
                >
                    {t.back}
                </Link>

                {/* コントロール */}
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    {/* サウンドトグル */}
                    <button
                        onClick={toggleAudio}
                        style={{
                            background: audioEnabled ? 'rgba(0, 217, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)',
                            border: `1px solid ${audioEnabled ? 'rgba(0, 217, 255, 0.5)' : 'rgba(255, 255, 255, 0.2)'}`,
                            borderRadius: '20px',
                            padding: '6px 14px',
                            color: audioEnabled ? '#00D9FF' : 'rgba(255, 255, 255, 0.6)',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}
                    >
                        <span>{audioEnabled ? '🔊' : '🔇'}</span>
                        <span>{t.sound}</span>
                        <span style={{ fontWeight: 'bold' }}>
                            {audioEnabled ? t.soundOn : t.soundOff}
                        </span>
                    </button>

                    {/* ヘルプボタン */}
                    <button
                        onClick={() => setShowHelp(true)}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '50%',
                            width: '32px',
                            height: '32px',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                        }}
                    >
                        ?
                    </button>

                    {/* 言語切替 */}
                    <button
                        onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                        style={{
                            background: 'rgba(255, 255, 255, 0.1)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '20px',
                            padding: '6px 14px',
                            color: 'rgba(255, 255, 255, 0.6)',
                            fontSize: '12px',
                            cursor: 'pointer',
                            transition: 'all 0.3s',
                        }}
                    >
                        {lang === 'jp' ? 'EN' : 'JP'}
                    </button>
                </div>
            </header>

            {/* タイトルオーバーレイ */}
            <div
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    zIndex: 50,
                    pointerEvents: 'none',
                    color: 'white',
                }}
            >
                <h1
                    style={{
                        fontSize: 'clamp(32px, 8vw, 72px)',
                        fontWeight: 'bold',
                        letterSpacing: '0.2em',
                        textShadow: '0 0 40px rgba(0, 217, 255, 0.5)',
                        marginBottom: '16px',
                        opacity: 0.9,
                    }}
                >
                    {t.title}
                </h1>
                <p
                    style={{
                        fontSize: 'clamp(14px, 3vw, 20px)',
                        opacity: 0.6,
                        letterSpacing: '0.1em',
                    }}
                >
                    {t.subtitle}
                </p>
                <p
                    style={{
                        fontSize: 'clamp(12px, 2vw, 16px)',
                        opacity: 0.4,
                        marginTop: '24px',
                        maxWidth: '400px',
                    }}
                >
                    {t.description}
                </p>
            </div>

            {/* 広告エリア */}
            <AdSlot id="ad-bottom-left" position="bottom-left" size="small" />
            <AdSlot id="ad-bottom-right" position="bottom-right" size="small" />

            {/* フッター */}
            <footer
                style={{
                    position: 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '12px 24px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '24px',
                    zIndex: 200,
                    background: 'linear-gradient(to top, rgba(10, 10, 30, 0.6), transparent)',
                    fontSize: '12px',
                    color: 'rgba(255, 255, 255, 0.4)',
                }}
            >
                <Link
                    href="#"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                >
                    {t.privacy}
                </Link>
                <Link
                    href="#"
                    style={{ color: 'inherit', textDecoration: 'none' }}
                >
                    {t.disclaimer}
                </Link>
                <span>{t.copyright}</span>
            </footer>

            {/* ヘルプモーダル */}
            {showHelp && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '20px',
                    }}
                    onClick={() => setShowHelp(false)}
                >
                    <div
                        style={{
                            background: 'rgba(20, 20, 40, 0.95)',
                            backdropFilter: 'blur(20px)',
                            borderRadius: '16px',
                            padding: '32px',
                            maxWidth: '400px',
                            border: '1px solid rgba(0, 217, 255, 0.3)',
                            boxShadow: '0 0 50px rgba(0, 217, 255, 0.2)',
                        }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2
                            style={{
                                color: '#00D9FF',
                                fontSize: '24px',
                                marginBottom: '24px',
                                textAlign: 'center',
                            }}
                        >
                            {t.helpTitle}
                        </h2>
                        <ul
                            style={{
                                listStyle: 'none',
                                padding: 0,
                                margin: 0,
                                color: 'rgba(255, 255, 255, 0.8)',
                                lineHeight: 2,
                            }}
                        >
                            <li>✨ {t.helpText1}</li>
                            <li>🌸 {t.helpText2}</li>
                            <li>💫 {t.helpText3}</li>
                        </ul>
                        <button
                            onClick={() => setShowHelp(false)}
                            style={{
                                marginTop: '24px',
                                width: '100%',
                                padding: '12px',
                                background: 'linear-gradient(135deg, #00D9FF, #FF00D9)',
                                border: 'none',
                                borderRadius: '8px',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }}
                        >
                            {t.close}
                        </button>
                    </div>
                </div>
            )}

            {/* グローバルスタイル */}
            <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          overflow: hidden;
          background-color: #0a0a1a;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        * {
          box-sizing: border-box;
        }
        
        a:hover {
          color: #00D9FF !important;
        }
        
        button:hover {
          background: rgba(0, 217, 255, 0.2) !important;
          border-color: rgba(0, 217, 255, 0.5) !important;
          color: #00D9FF !important;
        }
      `}</style>
        </>
    );
}
