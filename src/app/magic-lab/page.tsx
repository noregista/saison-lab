'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Fireplace from './components/Fireplace';
import Bookshelf from './components/Bookshelf';
import MagicObject from './components/MagicObject';
import MagicModal from './components/MagicModal';
import AdFrame from './components/AdFrame';
import ParticleEffect from './components/ParticleEffect';

/**
 * MAGIC LAB メインページ
 * 
 * 意図: ハリー・ポッター風の没入型書斎インターフェース
 * 特徴:
 * - 100vh/100vw固定でスクロール完全無効化
 * - 暖炉（左）・本棚（右）・デスク（下）の3エリア構成
 * - クリックで魔法発動のインタラクティブ体験
 * - 日英バイリンガル対応
 */

type Language = 'jp' | 'en';
type ModalType = 'book' | 'prophecy' | 'contact' | null;

// 翻訳データ
const translations = {
    jp: {
        title: '魔法ラボ',
        subtitle: '書斎へようこそ',
        backToHome: 'ホームへ戻る',
        adText: '広告スペース',
        bookshelfTitle: '魔法の書架',
        prophecyTitle: '水晶玉の予言',
        contactTitle: 'フクロウ便',
        contactIntro: 'メッセージをお送りください。フクロウがお届けします。',
        contactName: 'お名前',
        contactEmail: 'メールアドレス',
        contactMessage: 'メッセージ',
        contactSubmit: '送信',
        wandHint: '杖をクリックして魔法を発動',
        crystalHint: '水晶玉で未来を覗く',
        owlHint: 'フクロウにメッセージを託す',
        quillHint: '羽ペンでメモを取る',
        keyHint: '古い鍵の秘密は...',
        closeModal: '閉じる',
        books: [
            { id: 'spells', title: '呪文学入門', content: '基本的な呪文の唱え方と杖の振り方を学びます。エクスペリアームス、ルーモス、ウィンガーディアム・レヴィオーサなど。' },
            { id: 'potions', title: '魔法薬学', content: '薬草と材料の組み合わせで様々な効果を持つ魔法薬を調合します。ポリジュース薬、フェリックス・フェリシス、ベリタセラムなど。' },
            { id: 'creatures', title: '魔法生物飼育学', content: 'ヒッポグリフ、セストラル、ニフラーなど魔法界に住む生物たちについて学びます。' },
            { id: 'history', title: '魔法史', content: 'ゴブリンの反乱から魔法省設立まで、魔法界の歴史を紐解きます。' },
            { id: 'defense', title: '闇の魔術に対する防衛術', content: '闘いの呪文とダークマジックから身を守る方法を習得します。' },
            { id: 'astronomy', title: '天文学', content: '星々の動きと魔法への影響について学びます。' },
        ],
        prophecies: [
            '今日は新しいアイデアが降ってくる予感...',
            '困難な時こそ、真の友が見つかる...',
            '夜明け前が一番暗い。しかし朝は必ず来る...',
            '予期せぬ手紙が届く兆しがある...',
            '大いなる冒険が待っている...',
        ],
    },
    en: {
        title: 'MAGIC LAB',
        subtitle: 'Welcome to the Study',
        backToHome: 'Back to Home',
        adText: 'Advertisement',
        bookshelfTitle: 'Magical Bookshelf',
        prophecyTitle: 'Crystal Ball Prophecy',
        contactTitle: 'Owl Post',
        contactIntro: 'Send your message. Our owl will deliver it.',
        contactName: 'Name',
        contactEmail: 'Email Address',
        contactMessage: 'Message',
        contactSubmit: 'Send',
        wandHint: 'Click the wand to cast magic',
        crystalHint: 'Gaze into the crystal ball',
        owlHint: 'Send a message via owl',
        quillHint: 'Take notes with the quill',
        keyHint: 'The old key\'s secret is...',
        closeModal: 'Close',
        books: [
            { id: 'spells', title: 'Charms 101', content: 'Learn basic spell casting and wand movements. Expelliarmus, Lumos, Wingardium Leviosa, and more.' },
            { id: 'potions', title: 'Potions', content: 'Brew magical potions by combining herbs and ingredients. Polyjuice Potion, Felix Felicis, Veritaserum.' },
            { id: 'creatures', title: 'Care of Magical Creatures', content: 'Study the creatures of the wizarding world: Hippogriffs, Thestrals, Nifflers, and more.' },
            { id: 'history', title: 'History of Magic', content: 'From Goblin Rebellions to the founding of the Ministry, explore wizarding history.' },
            { id: 'defense', title: 'Defense Against Dark Arts', content: 'Master combat spells and protection against dark magic.' },
            { id: 'astronomy', title: 'Astronomy', content: 'Study the stars and their influence on magic.' },
        ],
        prophecies: [
            'A new idea will come to you today...',
            'In difficult times, true friends reveal themselves...',
            'The darkest hour is just before dawn...',
            'An unexpected letter is on its way...',
            'A great adventure awaits...',
        ],
    },
};

export default function MagicLabPage() {
    const [lang, setLang] = useState<Language>('jp');
    const [activeModal, setActiveModal] = useState<ModalType>(null);
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [prophecy, setProphecy] = useState<string>('');
    const [showSparkle, setShowSparkle] = useState(false);
    const [isMuted, setIsMuted] = useState(true);

    const t = translations[lang];

    // 杖クリック時のスパークルエフェクト
    const handleWandClick = useCallback(() => {
        setShowSparkle(true);
        setTimeout(() => setShowSparkle(false), 2000);
    }, []);

    // 水晶玉クリック時のランダム予言
    const handleCrystalClick = useCallback(() => {
        const randomProphecy = t.prophecies[Math.floor(Math.random() * t.prophecies.length)];
        setProphecy(randomProphecy);
        setActiveModal('prophecy');
    }, [t.prophecies]);

    // フクロウクリック時のコンタクトモーダル
    const handleOwlClick = useCallback(() => {
        setActiveModal('contact');
    }, []);

    // 本棚の本クリック
    const handleBookClick = useCallback((bookId: string) => {
        setSelectedBook(bookId);
        setActiveModal('book');
    }, []);

    // モーダルを閉じる
    const closeModal = useCallback(() => {
        setActiveModal(null);
        setSelectedBook(null);
        setProphecy('');
    }, []);

    // Escapeキーでモーダルを閉じる（WCAG対応）
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && activeModal) {
                closeModal();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [activeModal, closeModal]);

    // フォーム送信処理
    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(lang === 'jp' ? 'フクロウがメッセージをお届けします！' : 'The owl will deliver your message!');
        closeModal();
    };

    // 選択された本の情報を取得
    const getSelectedBookData = () => {
        return t.books.find(book => book.id === selectedBook);
    };

    return (
        <div
            className="magic-lab-container"
            style={{
                width: '100vw',
                height: '100vh',
                overflow: 'hidden',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundImage: 'url(/images/magic-lab-bg.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                fontFamily: '"Cormorant Garamond", "Cinzel", serif',
            }}
        >
            {/* パーティクルエフェクト（火の粉） */}
            <ParticleEffect />

            {/* スパークルエフェクト（杖クリック時） */}
            {showSparkle && (
                <div className="sparkle-overlay" style={{
                    position: 'fixed',
                    inset: 0,
                    pointerEvents: 'none',
                    zIndex: 100,
                    background: 'radial-gradient(circle at center, rgba(255, 215, 0, 0.3) 0%, transparent 70%)',
                    animation: 'sparkle-fade 2s ease-out forwards',
                }} />
            )}

            {/* ヘッダー */}
            <header style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '8vh',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 2vw',
                background: 'linear-gradient(to bottom, rgba(26, 15, 10, 0.95), rgba(26, 15, 10, 0.5))',
                zIndex: 50,
            }}>
                {/* ロゴ */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <span style={{ fontSize: 'clamp(1.2rem, 2.5vw, 2rem)', color: '#c9a227', fontWeight: 700 }}>
                        ✨ {t.title}
                    </span>
                    <span style={{ fontSize: 'clamp(0.8rem, 1.5vw, 1rem)', color: '#a89060' }}>
                        {t.subtitle}
                    </span>
                </div>

                {/* ナビゲーション */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    {/* サウンドトグル */}
                    <button
                        onClick={() => setIsMuted(!isMuted)}
                        aria-label={isMuted ? 'Sound Off' : 'Sound On'}
                        style={{
                            background: 'rgba(201, 162, 39, 0.2)',
                            border: '1px solid #c9a227',
                            borderRadius: '50%',
                            width: '2.5rem',
                            height: '2.5rem',
                            cursor: 'pointer',
                            color: '#c9a227',
                            fontSize: '1.2rem',
                        }}
                    >
                        {isMuted ? '🔇' : '🔊'}
                    </button>

                    {/* 言語切替 */}
                    <div style={{
                        display: 'flex',
                        background: 'rgba(201, 162, 39, 0.1)',
                        borderRadius: '2rem',
                        padding: '0.25rem',
                        border: '1px solid rgba(201, 162, 39, 0.3)',
                    }}>
                        <button
                            onClick={() => setLang('jp')}
                            style={{
                                padding: '0.5rem 1rem',
                                border: 'none',
                                borderRadius: '1.5rem',
                                cursor: 'pointer',
                                background: lang === 'jp' ? '#c9a227' : 'transparent',
                                color: lang === 'jp' ? '#1a0f0a' : '#c9a227',
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            JP
                        </button>
                        <button
                            onClick={() => setLang('en')}
                            style={{
                                padding: '0.5rem 1rem',
                                border: 'none',
                                borderRadius: '1.5rem',
                                cursor: 'pointer',
                                background: lang === 'en' ? '#c9a227' : 'transparent',
                                color: lang === 'en' ? '#1a0f0a' : '#c9a227',
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                            }}
                        >
                            EN
                        </button>
                    </div>

                    {/* ホームへ戻る */}
                    <Link
                        href="/"
                        style={{
                            color: '#c9a227',
                            textDecoration: 'none',
                            padding: '0.5rem 1rem',
                            border: '1px solid #c9a227',
                            borderRadius: '0.5rem',
                            fontSize: 'clamp(0.7rem, 1vw, 0.9rem)',
                            transition: 'all 0.3s ease',
                        }}
                    >
                        ← {t.backToHome}
                    </Link>
                </nav>
            </header>

            {/* メインコンテンツエリア */}
            <main style={{
                display: 'grid',
                gridTemplateColumns: '30vw 70vw',
                gridTemplateRows: '8vh 72vh 20vh',
                height: '100vh',
                width: '100vw',
            }}>
                {/* 空のヘッダースペース */}
                <div style={{ gridColumn: '1 / 3', gridRow: '1' }} />

                {/* 左側: 暖炉エリア */}
                <section
                    style={{
                        gridColumn: '1',
                        gridRow: '2',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '2vh 2vw',
                    }}
                    aria-label="Fireplace Area"
                >
                    {/* 暖炉 */}
                    <Fireplace />

                    {/* 広告枠1: 魔法の額縁 */}
                    <AdFrame type="portrait" lang={lang} />
                </section>

                {/* 右側: 本棚エリア */}
                <section
                    style={{
                        gridColumn: '2',
                        gridRow: '2',
                        padding: '2vh 3vw',
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    aria-label="Bookshelf Area"
                >
                    <h2 style={{
                        color: '#c9a227',
                        fontSize: 'clamp(1rem, 1.8vw, 1.5rem)',
                        marginBottom: '1rem',
                        textShadow: '0 0 10px rgba(201, 162, 39, 0.5)',
                    }}>
                        📚 {t.bookshelfTitle}
                    </h2>
                    <Bookshelf books={t.books} onBookClick={handleBookClick} />
                </section>

                {/* 下部: デスクエリア（インタラクティブオブジェクト） */}
                <section
                    style={{
                        gridColumn: '1 / 3',
                        gridRow: '3',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-around',
                        padding: '0 5vw',
                        background: 'linear-gradient(to top, rgba(26, 15, 10, 0.9), transparent)',
                    }}
                    aria-label="Interactive Objects"
                >
                    {/* 魔法の杖 */}
                    <MagicObject
                        icon="🪄"
                        hint={t.wandHint}
                        onClick={handleWandClick}
                    />

                    {/* 羽ペン */}
                    <MagicObject
                        icon="🪶"
                        hint={t.quillHint}
                        onClick={() => {/* クリップボード機能 */ }}
                    />

                    {/* フクロウ */}
                    <MagicObject
                        icon="🦉"
                        hint={t.owlHint}
                        onClick={handleOwlClick}
                    />

                    {/* 水晶玉 */}
                    <MagicObject
                        icon="🔮"
                        hint={t.crystalHint}
                        onClick={handleCrystalClick}
                    />

                    {/* 古い鍵 */}
                    <MagicObject
                        icon="🗝️"
                        hint={t.keyHint}
                        onClick={() => {/* イースターエッグ */ }}
                    />

                    {/* 広告枠2: 指名手配書 */}
                    <AdFrame type="wanted" lang={lang} />
                </section>
            </main>

            {/* モーダル: 本の内容 */}
            {activeModal === 'book' && selectedBook && (
                <MagicModal onClose={closeModal} title={getSelectedBookData()?.title || ''}>
                    <p style={{ color: '#3d2914', lineHeight: 1.8, fontSize: '1.1rem' }}>
                        {getSelectedBookData()?.content}
                    </p>
                </MagicModal>
            )}

            {/* モーダル: 予言 */}
            {activeModal === 'prophecy' && (
                <MagicModal onClose={closeModal} title={t.prophecyTitle}>
                    <p style={{
                        color: '#3d2914',
                        lineHeight: 1.8,
                        fontSize: '1.2rem',
                        fontStyle: 'italic',
                        textAlign: 'center',
                        padding: '2rem',
                    }}>
                        ✨ {prophecy} ✨
                    </p>
                </MagicModal>
            )}

            {/* モーダル: お問い合わせ */}
            {activeModal === 'contact' && (
                <MagicModal onClose={closeModal} title={t.contactTitle}>
                    <p style={{ color: '#3d2914', marginBottom: '1.5rem' }}>{t.contactIntro}</p>
                    <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <label style={{ color: '#3d2914', fontWeight: 600 }}>{t.contactName}</label>
                            <input
                                type="text"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    marginTop: '0.5rem',
                                    background: 'rgba(245, 235, 220, 0.8)',
                                    border: '2px solid #c9a227',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ color: '#3d2914', fontWeight: 600 }}>{t.contactEmail}</label>
                            <input
                                type="email"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    marginTop: '0.5rem',
                                    background: 'rgba(245, 235, 220, 0.8)',
                                    border: '2px solid #c9a227',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ color: '#3d2914', fontWeight: 600 }}>{t.contactMessage}</label>
                            <textarea
                                required
                                rows={4}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    marginTop: '0.5rem',
                                    background: 'rgba(245, 235, 220, 0.8)',
                                    border: '2px solid #c9a227',
                                    borderRadius: '0.5rem',
                                    fontSize: '1rem',
                                    resize: 'vertical',
                                }}
                            />
                        </div>
                        <button
                            type="submit"
                            style={{
                                padding: '1rem 2rem',
                                background: 'linear-gradient(135deg, #c9a227, #8b6914)',
                                border: 'none',
                                borderRadius: '0.5rem',
                                color: '#fff',
                                fontSize: '1.1rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'transform 0.2s ease',
                            }}
                        >
                            🦉 {t.contactSubmit}
                        </button>
                    </form>
                </MagicModal>
            )}

            {/* グローバルスタイル */}
            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&display=swap');

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          overflow: hidden;
        }

        @keyframes sparkle-fade {
          0% { opacity: 1; }
          100% { opacity: 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes glow {
          0%, 100% { filter: drop-shadow(0 0 5px rgba(201, 162, 39, 0.5)); }
          50% { filter: drop-shadow(0 0 20px rgba(201, 162, 39, 0.8)); }
        }

        /* モバイル対応 */
        @media (max-width: 768px) {
          .magic-lab-container main {
            grid-template-columns: 1fr !important;
            grid-template-rows: 8vh auto auto auto !important;
          }
        }
      `}</style>
        </div>
    );
}
