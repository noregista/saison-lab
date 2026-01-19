'use client';

// MINUTE LAB - 記事詳細クライアントコンポーネント
// 意図: リーディングバー付きの1分読了体験

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Language, getCategoryInfo, translations, Article } from '../data/types';
import { getNextArticle } from '../data/articles';

interface Props {
    article: Article;
}

export default function ArticleClient({ article }: Props) {
    const slug = article.slug;
    const nextArticle = getNextArticle(slug);

    // 意図: 状態管理
    const [lang, setLang] = useState<Language>('jp');
    const [readProgress, setReadProgress] = useState(0);
    const [isCompleted, setIsCompleted] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);

    const t = translations[lang];

    // 意図: スクロール進捗を計算
    const handleScroll = useCallback(() => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(100, Math.round((scrollTop / docHeight) * 100));
        setReadProgress(progress);

        // 意図: 100%到達で読了処理
        if (progress >= 95 && !isCompleted) {
            setIsCompleted(true);
            setShowConfetti(true);

            // LocalStorageに保存
            const saved = localStorage.getItem('minute-lab-read');
            const readList: string[] = saved ? JSON.parse(saved) : [];
            if (!readList.includes(slug)) {
                readList.push(slug);
                localStorage.setItem('minute-lab-read', JSON.stringify(readList));
            }

            // Confettiを3秒後に消す
            setTimeout(() => setShowConfetti(false), 3000);
        }
    }, [slug, isCompleted]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    const catInfo = getCategoryInfo(article.category);

    return (
        <main className="min-h-screen bg-slate-50">
            {/* 意図: リーディングバー（固定ヘッダー内） */}
            <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
                {/* プログレスバー */}
                <div className="h-1 bg-slate-100">
                    <div
                        className="h-full transition-all duration-150"
                        style={{
                            width: `${readProgress}%`,
                            backgroundColor: catInfo.color,
                        }}
                    />
                </div>

                <div className="max-w-3xl mx-auto px-4 py-3">
                    <div className="flex items-center justify-between">
                        <Link
                            href="/minute-lab"
                            className="text-sm text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1"
                        >
                            {t.back}
                        </Link>
                        <div className="flex items-center gap-3">
                            <span className="text-xs text-slate-400">{readProgress}%</span>
                            {/* 言語切替 */}
                            <div className="flex bg-slate-100 rounded-full p-0.5">
                                <button
                                    onClick={() => setLang('jp')}
                                    className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${lang === 'jp' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
                                >
                                    JP
                                </button>
                                <button
                                    onClick={() => setLang('en')}
                                    className={`px-2 py-1 rounded-full text-xs font-medium transition-all ${lang === 'en' ? 'bg-white text-slate-900 shadow' : 'text-slate-500'}`}
                                >
                                    EN
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* 意図: Confettiアニメーション */}
            {showConfetti && (
                <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
                    <div className="text-8xl animate-bounce">🎉</div>
                </div>
            )}

            <article className="max-w-3xl mx-auto px-4 py-8">
                {/* 意図: アイキャッチ画像 */}
                <div className="relative aspect-[16/9] rounded-2xl overflow-hidden mb-6 shadow-lg">
                    <Image
                        src={article.image}
                        alt={article.title[lang]}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* 意図: カテゴリ・タイトル */}
                <div
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium text-white mb-4"
                    style={{ backgroundColor: catInfo.color }}
                >
                    <span>{catInfo.icon}</span>
                    <span>{catInfo.name[lang]}</span>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
                    {article.title[lang]}
                </h1>
                <p className="text-lg text-slate-500 mb-6">
                    {article.subtitle[lang]}
                </p>

                {/* 意図: 3行要約 */}
                <div className="bg-amber-50 rounded-xl p-5 mb-8 border border-amber-100">
                    <h2 className="font-bold text-amber-800 mb-3">{t.summaryTitle}</h2>
                    <ul className="space-y-2">
                        {article.summary.map((point, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-slate-700">
                                <span className="text-amber-500">•</span>
                                <span>{point[lang]}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 意図: 広告エリア */}
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl px-4 py-3 text-center text-sm text-amber-800 mb-8 border border-amber-200">
                    📖 {t.adText} (728×90)
                </div>

                {/* 意図: 本文 */}
                <div className="prose prose-slate prose-lg max-w-none mb-8">
                    <p className="text-slate-700 leading-relaxed whitespace-pre-line">
                        {article.body[lang]}
                    </p>
                </div>

                {/* 意図: 読了メッセージ */}
                {isCompleted && (
                    <div className="bg-green-50 rounded-xl p-6 text-center mb-8 border border-green-200 animate-fade-in">
                        <span className="text-4xl mb-2 block">✅</span>
                        <p className="font-bold text-green-800 text-lg">{t.completed}</p>
                    </div>
                )}

                {/* 意図: アクションボタン */}
                <div className="flex flex-wrap justify-center gap-3 mb-8">
                    {/* X (Twitter) シェア */}
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title[lang] + ' - ' + t.title)}&url=${encodeURIComponent('https://saison-lab.com/minute-lab/' + slug)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-black hover:bg-gray-800 rounded-full text-white font-medium transition-colors flex items-center gap-2"
                    >
                        𝕏 Share
                    </a>

                    {/* LINE シェア */}
                    <a
                        href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent('https://saison-lab.com/minute-lab/' + slug)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 bg-[#00B900] hover:bg-[#00a000] rounded-full text-white font-medium transition-colors flex items-center gap-2"
                    >
                        LINE
                    </a>

                    {/* クリップボードコピー */}
                    <button
                        onClick={() => {
                            const text = `${article.title[lang]} - ${t.title}\nhttps://saison-lab.com/minute-lab/${slug}`;
                            navigator.clipboard.writeText(text);
                            alert(lang === 'jp' ? 'コピーしました！' : 'Copied!');
                        }}
                        className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-700 font-medium transition-colors flex items-center gap-2"
                    >
                        📋 {t.shareText}
                    </button>

                    {nextArticle && (
                        <Link
                            href={`/minute-lab/${nextArticle.slug}`}
                            className="px-5 py-2.5 rounded-full text-white font-medium transition-colors flex items-center gap-2"
                            style={{ backgroundColor: catInfo.color }}
                        >
                            {t.nextArticle} →
                        </Link>
                    )}
                </div>

                {/* 意図: 広告エリア2 */}
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl px-4 py-6 text-center text-sm text-amber-700 border border-amber-200">
                    📜 {t.adText} (300×250)
                </div>
            </article>

            {/* 意図: フッター */}
            <footer className="bg-slate-800 text-white py-6 mt-12">
                <div className="max-w-3xl mx-auto px-4 text-center">
                    <p className="text-slate-500 text-xs">© 2026 Saison Lab. All rights reserved.</p>
                </div>
            </footer>
        </main>
    );
}
