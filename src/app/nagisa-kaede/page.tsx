'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    newsData,
    discographyData,
    galleryData,
    socialLinks,
    profileData,
    categoryLabels,
    NewsItem,
    Track,
    GalleryItem,
} from './data';

// ============================================================
// カラーパレット定義
// 凪（水面）ブルー × 楓（紅葉）レッド
// ============================================================
const colors = {
    primary: '#5B8FA8',      // 凪ブルー
    secondary: '#C75C5C',    // 楓レッド
    accent: '#D4AF37',       // ゴールド
    bgDark: '#0D1117',       // ミッドナイト
    bgLight: '#FDFBF7',      // クリーム
    textLight: '#F0F0F0',    // オフホワイト
};

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        artistName: '凪沙 楓',
        artistNameRomaji: 'NAGISA KAEDE',
        tagline: '透明な声が、心の深くまで届く',
        statusPreparing: 'デビュー準備中...',
        news: 'NEWS',
        newsEmpty: 'ニュースはまだありません',
        discography: 'DISCOGRAPHY',
        discographyEmpty: 'リリース情報をお待ちください',
        movie: 'MOVIE',
        movieEmpty: 'チャンネル準備中...',
        movieSubscribe: 'チャンネル登録で最新情報を受け取る',
        gallery: 'GALLERY',
        galleryEmpty: '写真がありません',
        download: 'ダウンロード',
        links: 'OFFICIAL LINKS',
        privacy: 'プライバシーポリシー',
        copyright: '© 2026 Nagisa Kaede / Saison Lab',
        profile: 'PROFILE',
        birth: '誕生日',
        from: '出身地',
        blood: '血液型',
        height: '身長',
        hobby: '趣味',
        skill: '特技',
        food: '好きな食べ物',
        back: '← Saison Lab へ戻る',
        comingSoon: 'COMING SOON',
    },
    en: {
        artistName: 'Nagisa Kaede',
        artistNameRomaji: 'NAGISA KAEDE',
        tagline: 'A transparent voice that reaches deep into your heart',
        statusPreparing: 'Preparing for debut...',
        news: 'NEWS',
        newsEmpty: 'No news yet',
        discography: 'DISCOGRAPHY',
        discographyEmpty: 'Please wait for release information',
        movie: 'MOVIE',
        movieEmpty: 'Channel coming soon...',
        movieSubscribe: 'Subscribe for updates',
        gallery: 'GALLERY',
        galleryEmpty: 'No photos available',
        download: 'Download',
        links: 'OFFICIAL LINKS',
        privacy: 'Privacy Policy',
        copyright: '© 2026 Nagisa Kaede / Saison Lab',
        profile: 'PROFILE',
        birth: 'Birthday',
        from: 'Birthplace',
        blood: 'Blood Type',
        height: 'Height',
        hobby: 'Hobby',
        skill: 'Special Skill',
        food: 'Favorite Food',
        back: '← Back to Saison Lab',
        comingSoon: 'COMING SOON',
    },
};

// ============================================================
// メインページコンポーネント
// ============================================================
export default function NagisaKaedePage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const t = texts[lang];

    // ページロード時のフェードイン効果
    useEffect(() => {
        setIsLoaded(true);
    }, []);

    return (
        <main
            className="min-h-screen text-white"
            style={{ backgroundColor: colors.bgDark }}
        >
            {/* ============================================================ */}
            {/* HERO セクション */}
            {/* ============================================================ */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                {/* 背景画像 */}
                <div
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
                    style={{
                        backgroundImage: 'url(/images/nagisa-kaede-portrait.png)',
                        filter: 'brightness(0.4)',
                    }}
                />

                {/* グラデーションオーバーレイ */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `linear-gradient(180deg, transparent 0%, ${colors.bgDark}CC 70%, ${colors.bgDark} 100%)`,
                    }}
                />

                {/* コンテンツ */}
                <div className={`relative z-10 text-center px-4 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {/* アーティスト名 */}
                    <h1
                        className="text-5xl md:text-7xl font-bold mb-2 tracking-wider"
                        style={{
                            fontFamily: "'Cormorant Garamond', serif",
                            background: `linear-gradient(135deg, ${colors.primary}, ${colors.secondary})`,
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        {t.artistNameRomaji}
                    </h1>
                    <p className="text-2xl md:text-3xl mb-4 opacity-80" style={{ fontFamily: "'Noto Sans JP', sans-serif" }}>
                        {t.artistName}
                    </p>

                    {/* キャッチコピー */}
                    <p className="text-lg md:text-xl mb-8 opacity-60 max-w-md mx-auto">
                        {t.tagline}
                    </p>

                    {/* ステータスバッジ */}
                    <div
                        className="inline-block px-6 py-2 rounded-full text-sm animate-pulse"
                        style={{
                            border: `1px solid ${colors.accent}`,
                            color: colors.accent,
                        }}
                    >
                        {t.statusPreparing}
                    </div>
                </div>

                {/* ナビゲーション（右上） */}
                <nav className="absolute top-4 right-4 z-20 flex items-center gap-4">
                    <button
                        onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                        className="px-3 py-1 rounded border text-sm hover:bg-white/10 transition-colors"
                        style={{ borderColor: colors.primary }}
                    >
                        {lang === 'jp' ? 'EN' : 'JP'}
                    </button>
                    <Link
                        href="/"
                        className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                    >
                        {t.back}
                    </Link>
                </nav>

                {/* スクロールインジケーター */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-50">
                        <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                </div>
            </section>

            {/* ============================================================ */}
            {/* 広告表示エリア (728x90) */}
            {/* ============================================================ */}
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div
                    className="border-2 border-dashed rounded-lg px-4 py-3 text-center text-sm opacity-50"
                    style={{ borderColor: colors.primary }}
                >
                    📢 Ad Display Area / 広告表示欄 (728x90)
                </div>
            </div>

            {/* ============================================================ */}
            {/* PROFILE セクション */}
            {/* ============================================================ */}
            <section id="profile" className="max-w-4xl mx-auto px-4 py-16">
                <h2
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: colors.secondary }}
                >
                    {t.profile}
                </h2>

                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {/* 左側：プロフィールバイオ */}
                    <div
                        className="p-6 rounded-xl"
                        style={{ backgroundColor: '#1a1a1f' }}
                    >
                        <div className="space-y-4">
                            {(lang === 'jp' ? profileData.bio.jp : profileData.bio.en).map((text, index) => (
                                <p
                                    key={index}
                                    className="leading-relaxed text-sm md:text-base opacity-90"
                                >
                                    {text}
                                </p>
                            ))}
                        </div>
                    </div>

                    {/* 右側：詳細データ */}
                    <div
                        className="p-6 rounded-xl space-y-4"
                        style={{ backgroundColor: '#1a1a1f' }}
                    >
                        <div className="border-b border-gray-700 pb-2">
                            <div className="flex justify-between text-sm">
                                <span className="opacity-50">{t.birth}</span>
                                <span>{lang === 'jp' ? profileData.birthDate.jp : profileData.birthDate.en}</span>
                            </div>
                        </div>
                        <div className="border-b border-gray-700 pb-2">
                            <div className="flex justify-between text-sm">
                                <span className="opacity-50">{t.from}</span>
                                <span>{lang === 'jp' ? profileData.birthPlace.jp : profileData.birthPlace.en}</span>
                            </div>
                        </div>
                        <div className="border-b border-gray-700 pb-2">
                            <div className="flex justify-between text-sm">
                                <span className="opacity-50">{t.blood}</span>
                                <span>{lang === 'jp' ? profileData.bloodType.jp : profileData.bloodType.en}</span>
                            </div>
                        </div>
                        {/* 
                         <div className="border-b border-gray-700 pb-2">
                             <div className="flex justify-between text-sm">
                                 <span className="opacity-50">{t.height}</span>
                                 <span>{lang === 'jp' ? profileData.height.jp : profileData.height.en}</span>
                             </div>
                         </div>
                         */}
                        <div className="border-b border-gray-700 pb-2">
                            <div className="block text-sm">
                                <span className="opacity-50 block mb-1">{t.hobby}</span>
                                <span className="break-words">{lang === 'jp' ? profileData.hobby.jp : profileData.hobby.en}</span>
                            </div>
                        </div>
                        <div className="border-b border-gray-700 pb-2">
                            <div className="block text-sm">
                                <span className="opacity-50 block mb-1">{t.skill}</span>
                                <span className="break-words">{lang === 'jp' ? profileData.specialSkill.jp : profileData.specialSkill.en}</span>
                            </div>
                        </div>
                        <div>
                            <div className="block text-sm">
                                <span className="opacity-50 block mb-1">{t.food}</span>
                                <span className="break-words">{lang === 'jp' ? profileData.favoriteFood.jp : profileData.favoriteFood.en}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ファンネーム紹介 */}
                <div className="mt-8 pt-8 border-t border-gray-800">
                    <h3 className="text-center font-bold mb-6" style={{ color: colors.primary }}>
                        {lang === 'jp' ? 'FAN NAME' : 'FAN NAME'}
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                        <div className="p-4 rounded-lg text-center bg-[#1a1a1f] border border-[#5B8FA8]/30">
                            <div className="text-xl font-bold mb-2" style={{ color: colors.primary }}>
                                {lang === 'jp' ? profileData.fanNames.nagi.name.jp : profileData.fanNames.nagi.name.en}
                            </div>
                            <p className="text-sm opacity-80">
                                {lang === 'jp' ? profileData.fanNames.nagi.desc.jp : profileData.fanNames.nagi.desc.en}
                            </p>
                        </div>
                        <div className="p-4 rounded-lg text-center bg-[#1a1a1f] border border-[#C75C5C]/30">
                            <div className="text-xl font-bold mb-2" style={{ color: colors.secondary }}>
                                {lang === 'jp' ? profileData.fanNames.nami.name.jp : profileData.fanNames.nami.name.en}
                            </div>
                            <p className="text-sm opacity-80">
                                {lang === 'jp' ? profileData.fanNames.nami.desc.jp : profileData.fanNames.nami.desc.en}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ============================================================ */}
            {/* NEWS セクション */}
            {/* ============================================================ */}
            <section id="news" className="max-w-4xl mx-auto px-4 py-16">
                <h2
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: colors.primary }}
                >
                    {t.news}
                </h2>

                {newsData.length === 0 ? (
                    <EmptyState message={t.newsEmpty} />
                ) : (
                    <div className="space-y-4">
                        {newsData.map((item) => (
                            <NewsCard key={item.id} item={item} lang={lang} />
                        ))}
                    </div>
                )}
            </section>

            {/* ============================================================ */}
            {/* DISCOGRAPHY セクション */}
            {/* ============================================================ */}
            <section id="discography" className="max-w-4xl mx-auto px-4 py-16">
                <h2
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: colors.secondary }}
                >
                    {t.discography}
                </h2>

                {discographyData.length === 0 ? (
                    <EmptyState message={t.discographyEmpty} />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        {discographyData.map((track) => (
                            <TrackCard key={track.id} track={track} lang={lang} />
                        ))}
                    </div>
                )}
            </section>

            {/* ============================================================ */}
            {/* MOVIE セクション */}
            {/* ============================================================ */}
            <section id="movie" className="max-w-4xl mx-auto px-4 py-16">
                <h2
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: colors.accent }}
                >
                    {t.movie}
                </h2>

                {/* YouTubeプレースホルダー */}
                <div
                    className="aspect-video rounded-xl flex flex-col items-center justify-center"
                    style={{
                        backgroundColor: '#1a1a1f',
                        border: `1px solid ${colors.primary}33`,
                    }}
                >
                    <div className="text-6xl mb-4">▶️</div>
                    <p className="text-xl font-bold mb-2" style={{ color: colors.accent }}>
                        {t.comingSoon}
                    </p>
                    <p className="text-sm opacity-60 mb-6">{t.movieEmpty}</p>

                    {/* チャンネル登録ボタン（先行設置） */}
                    <button
                        className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all hover:scale-105"
                        style={{
                            backgroundColor: '#FF0000',
                            color: 'white',
                        }}
                    >
                        🔔 {t.movieSubscribe}
                    </button>
                </div>
            </section>

            {/* ============================================================ */}
            {/* GALLERY セクション */}
            {/* ============================================================ */}
            <section id="gallery" className="max-w-4xl mx-auto px-4 py-16">
                <h2
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: colors.primary }}
                >
                    {t.gallery}
                </h2>

                {galleryData.length === 0 ? (
                    <EmptyState message={t.galleryEmpty} />
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {galleryData.map((item) => (
                            <GalleryCard
                                key={item.id}
                                item={item}
                                lang={lang}
                                onClick={() => setSelectedImage(item)}
                            />
                        ))}
                    </div>
                )}
            </section>

            {/* ============================================================ */}
            {/* OFFICIAL LINKS セクション */}
            {/* ============================================================ */}
            <section id="links" className="max-w-4xl mx-auto px-4 py-16">
                <h2
                    className="text-3xl font-bold mb-8 text-center"
                    style={{ color: colors.secondary }}
                >
                    {t.links}
                </h2>

                <div className="flex flex-wrap justify-center gap-4">
                    {socialLinks.map((link) => (
                        <a
                            key={link.platform}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-6 py-3 rounded-full border transition-all hover:scale-105 hover:bg-white/5"
                            style={{ borderColor: colors.primary }}
                        >
                            <span className="text-xl">{link.icon}</span>
                            <span>{lang === 'jp' ? link.label.jp : link.label.en}</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* ============================================================ */}
            {/* 広告表示エリア (300x250) */}
            {/* ============================================================ */}
            <div className="max-w-4xl mx-auto px-4 py-4">
                <div
                    className="border-2 border-dashed rounded-lg px-4 py-8 text-center text-sm opacity-50"
                    style={{ borderColor: colors.secondary }}
                >
                    📢 Ad Display Area / 広告表示欄 (300x250)
                </div>
            </div>

            {/* ============================================================ */}
            {/* FOOTER */}
            {/* ============================================================ */}
            <footer
                className="border-t py-8 mt-8"
                style={{ borderColor: colors.primary + '33' }}
            >
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Link
                        href="/nagisa-kaede/privacy"
                        className="text-sm opacity-60 hover:opacity-100 transition-opacity mb-4 inline-block"
                    >
                        {t.privacy}
                    </Link>
                    <p className="text-sm opacity-40">{t.copyright}</p>
                </div>
            </footer>

            {/* ============================================================ */}
            {/* ライトボックス（ギャラリー拡大表示） */}
            {/* ============================================================ */}
            {selectedImage && (
                <Lightbox
                    item={selectedImage}
                    lang={lang}
                    onClose={() => setSelectedImage(null)}
                    downloadLabel={t.download}
                />
            )}
        </main>
    );
}

// ============================================================
// サブコンポーネント
// ============================================================

// Empty State（データがない場合の表示）
function EmptyState({ message }: { message: string }) {
    return (
        <div
            className="text-center py-16 rounded-xl"
            style={{ backgroundColor: '#1a1a1f' }}
        >
            <div className="text-4xl mb-4 opacity-30">✨</div>
            <p className="text-lg font-bold mb-2" style={{ color: colors.accent }}>
                COMING SOON
            </p>
            <p className="text-sm opacity-60">{message}</p>
        </div>
    );
}

// ニュースカード
function NewsCard({ item, lang }: { item: NewsItem; lang: 'jp' | 'en' }) {
    const categoryLabel = categoryLabels[item.category];
    return (
        <article
            className="p-4 rounded-xl transition-all hover:scale-[1.02]"
            style={{ backgroundColor: '#1a1a1f' }}
        >
            <div className="flex items-center gap-3 mb-2">
                <time className="text-xs opacity-50">{item.date}</time>
                <span
                    className="text-xs px-2 py-0.5 rounded-full"
                    style={{ backgroundColor: colors.primary + '33', color: colors.primary }}
                >
                    {lang === 'jp' ? categoryLabel.jp : categoryLabel.en}
                </span>
            </div>
            <h3 className="font-bold mb-1">{lang === 'jp' ? item.title.jp : item.title.en}</h3>
            <p className="text-sm opacity-60">{lang === 'jp' ? item.content.jp : item.content.en}</p>
        </article>
    );
}

// トラックカード（ディスコグラフィ）
function TrackCard({ track, lang }: { track: Track; lang: 'jp' | 'en' }) {
    return (
        <article
            className="rounded-xl overflow-hidden transition-all hover:scale-105"
            style={{ backgroundColor: '#1a1a1f' }}
        >
            <img
                src={track.coverArt}
                alt={lang === 'jp' ? track.title.jp : track.title.en}
                className="w-full aspect-square object-cover"
            />
            <div className="p-3">
                <h3 className="font-bold text-sm truncate">{lang === 'jp' ? track.title.jp : track.title.en}</h3>
                <p className="text-xs opacity-50">{track.releaseDate}</p>
            </div>
        </article>
    );
}

// ギャラリーカード
function GalleryCard({
    item,
    lang,
    onClick,
}: {
    item: GalleryItem;
    lang: 'jp' | 'en';
    onClick: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className="rounded-xl overflow-hidden transition-all hover:scale-105 group"
        >
            <img
                src={item.thumbnailUrl}
                alt={lang === 'jp' ? item.title.jp : item.title.en}
                className="w-full aspect-square object-cover group-hover:brightness-75 transition-all"
            />
        </button>
    );
}

// ライトボックス（画像拡大表示）
function Lightbox({
    item,
    lang,
    onClose,
    downloadLabel,
}: {
    item: GalleryItem;
    lang: 'jp' | 'en';
    onClose: () => void;
    downloadLabel: string;
}) {
    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={onClose}
        >
            <div
                className="relative max-w-4xl w-full"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={item.imageUrl}
                    alt={lang === 'jp' ? item.title.jp : item.title.en}
                    className="w-full max-h-[80vh] object-contain rounded-xl"
                />

                <div className="mt-4 flex items-center justify-between">
                    <h3 className="font-bold">{lang === 'jp' ? item.title.jp : item.title.en}</h3>
                    {item.downloadUrl && (
                        <a
                            href={item.downloadUrl}
                            download
                            className="px-4 py-2 rounded-lg text-sm transition-all hover:scale-105"
                            style={{ backgroundColor: colors.primary }}
                        >
                            📥 {downloadLabel}
                        </a>
                    )}
                </div>

                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 w-10 h-10 rounded-full bg-black/50 flex items-center justify-center text-xl hover:bg-black/70 transition-colors"
                >
                    ✕
                </button>
            </div>
        </div>
    );
}
