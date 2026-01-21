'use client';

// MINUTE LAB - 記事一覧ページ
// 意図: タイパ型知的マイクロメディアの記事一覧UI

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Language, Category, getCategoryInfo, categories, translations } from './data/types';
import { articles, getArticlesByCategory } from './data/articles';

export default function MinuteLabPage() {
    // 意図: 状態管理
    const [lang, setLang] = useState<Language>('jp');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [readArticles, setReadArticles] = useState<string[]>([]);
    const [favorites, setFavorites] = useState<string[]>([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    const t = translations[lang];
    const filteredArticles = getArticlesByCategory(selectedCategory).filter(
        article => !showFavoritesOnly || favorites.includes(article.slug)
    );

    // 意図: 読了履歴をLocalStorageから読み込み
    useEffect(() => {
        const saved = localStorage.getItem('minute-lab-read');
        if (saved) {
            setReadArticles(JSON.parse(saved));
        }
        const savedFavorites = localStorage.getItem('minute-lab-favorites');
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites));
        }
    }, []);

    // 意図: お気に入りのトグル
    const toggleFavorite = (e: React.MouseEvent, slug: string) => {
        e.preventDefault();
        e.stopPropagation();
        setFavorites(prev => {
            const newFavorites = prev.includes(slug)
                ? prev.filter(s => s !== slug)
                : [...prev, slug];
            localStorage.setItem('minute-lab-favorites', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    return (
        <main className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
            {/* 意図: ヘッダー */}
            <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-2xl shadow-lg">
                                📚
                            </div>
                            <div>
                                <h1 className="text-xl font-bold text-slate-800">{t.title}</h1>
                                <p className="text-xs text-slate-500">{t.subtitle}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            {/* 言語切替 */}
                            <div className="flex bg-slate-100 rounded-full p-1">
                                <button
                                    onClick={() => setLang('jp')}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'jp' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    JP
                                </button>
                                <button
                                    onClick={() => setLang('en')}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${lang === 'en' ? 'bg-white text-slate-900 shadow' : 'text-slate-500 hover:text-slate-900'}`}
                                >
                                    EN
                                </button>
                            </div>
                            <Link href="/" className="text-sm text-slate-500 hover:text-slate-800 transition-colors">
                                ← Saison Lab
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-4 py-8">
                {/* 意図: 広告エリア1（知識の書架スタイル） */}
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl px-4 py-3 text-center text-sm text-amber-800 mb-6 border border-amber-200">
                    📖 {t.adText} (728×90)
                </div>

                {/* 意図: カテゴリフィルター */}
                <div className="flex flex-wrap justify-center gap-2 mb-8">
                    <button
                        onClick={() => setSelectedCategory(null)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${!selectedCategory
                            ? 'bg-slate-800 text-white shadow-md'
                            : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                            }`}
                    >
                        {t.allCategories}
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${selectedCategory === cat.id
                                ? 'text-white shadow-md'
                                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                                }`}
                            style={selectedCategory === cat.id ? { backgroundColor: cat.color } : {}}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.name[lang]}</span>
                        </button>
                    ))}
                    {/* 意図: お気に入りフィルター */}
                    <button
                        onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${showFavoritesOnly
                            ? 'bg-pink-500 text-white shadow-md'
                            : 'bg-white text-slate-600 hover:bg-pink-50 border border-slate-200'
                            }`}
                    >
                        <span>{showFavoritesOnly ? '❤️' : '🤍'}</span>
                        <span>{t.favorites} ({favorites.length})</span>
                    </button>
                </div>

                {/* 意図: 記事カードグリッド */}
                {filteredArticles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredArticles.map((article) => {
                            const catInfo = getCategoryInfo(article.category);
                            const isRead = readArticles.includes(article.slug);

                            return (
                                <Link
                                    key={article.id}
                                    href={`/minute-lab/${article.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-slate-100"
                                >
                                    {/* 意図: アイキャッチ画像 */}
                                    <div className="relative aspect-[4/3] overflow-hidden">
                                        <Image
                                            src={article.image}
                                            alt={article.title[lang]}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        {/* 意図: 読了バッジ */}
                                        {isRead && (
                                            <div className="absolute top-3 left-3 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                ✅ {t.completed}
                                            </div>
                                        )}
                                        {/* 意図: お気に入りボタン */}
                                        <button
                                            onClick={(e) => toggleFavorite(e, article.slug)}
                                            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md ${favorites.includes(article.slug)
                                                    ? 'bg-pink-500 text-white'
                                                    : 'bg-white/90 text-slate-400 hover:text-pink-500'
                                                }`}
                                            title={favorites.includes(article.slug) ? t.removeFavorite : t.addFavorite}
                                        >
                                            {favorites.includes(article.slug) ? '❤️' : '🤍'}
                                        </button>
                                    </div>

                                    {/* 意図: 記事情報 */}
                                    <div className="p-4">
                                        {/* カテゴリバッジ */}
                                        <div
                                            className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white mb-2"
                                            style={{ backgroundColor: catInfo.color }}
                                        >
                                            <span>{catInfo.icon}</span>
                                            <span>{catInfo.name[lang]}</span>
                                        </div>

                                        {/* タイトル */}
                                        <h2 className="font-bold text-slate-800 mb-1 group-hover:text-amber-600 transition-colors line-clamp-2">
                                            {article.title[lang]}
                                        </h2>

                                        {/* サブタイトル */}
                                        <p className="text-sm text-slate-500 line-clamp-2 mb-3">
                                            {article.subtitle[lang]}
                                        </p>

                                        {/* メタ情報 */}
                                        <div className="flex items-center gap-2 text-xs text-slate-400">
                                            <span>⏱ 1{t.minute}</span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                ) : (
                    <div className="text-center py-16 text-slate-400">
                        <span className="text-6xl mb-4 block">📭</span>
                        <p>{t.noArticles}</p>
                    </div>
                )}

                {/* 意図: 広告エリア2（羊皮紙スタイル） */}
                <div className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl px-4 py-6 text-center text-sm text-amber-700 border border-amber-200">
                    📜 {t.adText} (300×250)
                </div>
            </div>

            {/* 意図: フッター */}
            <footer className="bg-slate-800 text-white py-8 mt-12">
                <div className="max-w-6xl mx-auto px-4 text-center">
                    <p className="text-slate-400 text-sm mb-2">{t.description}</p>
                    <p className="text-slate-500 text-xs">© 2026 Saison Lab. All rights reserved.</p>
                    <div className="flex justify-center gap-4 mt-4 text-xs text-slate-400">
                        <Link href="/#privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/#disclaimer" className="hover:text-white transition-colors">Disclaimer</Link>
                    </div>
                </div>
            </footer>
        </main>
    );
}
