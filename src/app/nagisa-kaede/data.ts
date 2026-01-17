// ============================================================
// 凪沙 楓 公式サイト - データ構造定義
// 拡張性を持たせたニュース、ディスコグラフィ、ギャラリーのデータ
// ============================================================

// ニュース/トピックスのデータ構造
export interface NewsItem {
    id: string;
    date: string;           // "2026-01-17"
    category: 'announce' | 'release' | 'event' | 'media';
    title: { jp: string; en: string };
    content: { jp: string; en: string };
    link?: string;
}

// 楽曲/ディスコグラフィのデータ構造
export interface Track {
    id: string;
    title: { jp: string; en: string };
    releaseDate: string;
    coverArt: string;       // 画像パス
    duration: string;       // "3:42"
    lyrics?: { jp: string; en: string };
    credits?: { role: string; name: string }[];
    streamLinks?: { platform: string; url: string; icon: string }[];
}

// ギャラリーのデータ構造
export interface GalleryItem {
    id: string;
    title: { jp: string; en: string };
    imageUrl: string;
    thumbnailUrl: string;
    downloadUrl?: string;   // スマホ壁紙用
    date: string;
}

// SNSリンクのデータ構造
export interface SocialLink {
    platform: string;
    url: string;
    icon: string;
    label: { jp: string; en: string };
}

// ============================================================
// 初期データ（デビュー前状態）
// ============================================================

// ニュースデータ（サンプル）
export const newsData: NewsItem[] = [
    {
        id: 'news-001',
        date: '2026-01-17',
        category: 'announce',
        title: {
            jp: '公式サイトをオープンしました',
            en: 'Official Website Launched'
        },
        content: {
            jp: '凪沙 楓の公式サイトがオープンしました。今後の活動にご期待ください。',
            en: 'The official website for Nagisa Kaede has launched. Stay tuned for future updates.'
        },
    },
];

// ディスコグラフィデータ（空 - デビュー前）
export const discographyData: Track[] = [];

// ギャラリーデータ（初期ポートレート）
export const galleryData: GalleryItem[] = [
    {
        id: 'gallery-001',
        title: {
            jp: '公式ポートレート',
            en: 'Official Portrait'
        },
        imageUrl: '/images/nagisa-kaede-portrait.png',
        thumbnailUrl: '/images/nagisa-kaede-portrait.png',
        downloadUrl: '/images/nagisa-kaede-portrait.png',
        date: '2026-01-17',
    },
];

// SNSリンク（XとYouTubeのみ）
export const socialLinks: SocialLink[] = [
    {
        platform: 'x',
        url: '#',
        icon: '𝕏',
        label: { jp: 'X (Twitter)', en: 'X (Twitter)' },
    },
    {
        platform: 'youtube',
        url: '#',
        icon: '▶️',
        label: { jp: 'YouTube', en: 'YouTube' },
    },
];

// カテゴリの表示名
export const categoryLabels: Record<NewsItem['category'], { jp: string; en: string }> = {
    announce: { jp: 'お知らせ', en: 'Announce' },
    release: { jp: 'リリース', en: 'Release' },
    event: { jp: 'イベント', en: 'Event' },
    media: { jp: 'メディア', en: 'Media' },
};
