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
        id: 'news-002',
        date: '2026-01-20',
        category: 'release',
        title: {
            jp: 'デビュー楽曲「渚の約束 〜Kiss Me」をリリースしました',
            en: 'Debut Song "Nagisa no Yakusoku ~Kiss Me" Released'
        },
        content: {
            jp: '凪沙 楓のデビュー楽曲「渚の約束 〜Kiss Me」がYouTubeにて公開されました。ぜひご視聴ください。',
            en: 'Nagisa Kaede\'s debut song "Nagisa no Yakusoku ~Kiss Me" is now available on YouTube. Please check it out!'
        },
        link: 'https://youtu.be/AAzb4EClsnA?si=bM2UyD3iNxkY4kxZ',
    },
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
export const discographyData: Track[] = [
    {
        id: 'track-001',
        title: { jp: '渚の約束 〜Kiss Me', en: 'Nagisa no Yakusoku ~Kiss Me' },
        releaseDate: '2026-01-20',
        coverArt: '/images/nagisa-kaede-portrait.png',
        duration: '3:30',
        streamLinks: [
            { platform: 'YouTube', url: 'https://youtu.be/AAzb4EClsnA?si=bM2UyD3iNxkY4kxZ', icon: '▶️' },
        ],
    },
];

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

// SNSリンク（YouTube、TikTok、Instagram - すべて準備中）
export const socialLinks: SocialLink[] = [
    {
        platform: 'youtube',
        url: 'https://www.youtube.com/channel/UCGTATHsvnGYiuXcMT97DKFg',
        icon: '▶️',
        label: { jp: 'YouTube', en: 'YouTube' },
    },
    {
        platform: 'tiktok',
        url: 'https://www.tiktok.com/@nagisakaede_music',
        icon: '📱',
        label: { jp: 'TikTok', en: 'TikTok' },
    },
    {
        platform: 'instagram',
        url: 'https://www.instagram.com/nagisakaede_music/',
        icon: '📷',
        label: { jp: 'Instagram', en: 'Instagram' },
    },
];

// プロフィール情報
export const profileData = {
    birthDate: { jp: '2005年6月8日', en: 'June 8, 2005' },
    birthPlace: { jp: '大阪府', en: 'Osaka, Japan' },
    bloodType: { jp: 'O型', en: 'Type O' },
    height: { jp: '158.4cm', en: '158.4cm' },
    hobby: { jp: '音楽鑑賞、散歩、ルービックキューブ、爬虫類カフェ巡り', en: 'Music, Walking, Rubik\'s Cube, Reptile Cafes' },
    specialSkill: { jp: '歌、作詞、ピアノ、変顔、手を使わずに頭皮を動かす', en: 'Singing, Songwriting, Piano, Funny Faces, Moving Scalp' },
    favoriteFood: { jp: 'お寿司、メロン、カレー、たまごパン', en: 'Sushi, Melon, Curry, Egg Bread' },
    bio: {
        jp: [
            '「透明な歌声を持つ不思議少女」。',
            '一見クールで優雅な雰囲気だが、中身は予想外の行動で周囲を驚かせる「大不思議」キャラ。',
            'ルービックキューブを高速で揃えながら即興ソングを歌うなど、独特なパフォーマンスで注目を集める。',
            '「蚊に懲役を与える」など独特なワードセンスを持ち、誰からも愛されるムードメーカー。',
            '真剣な眼差しで歌う姿と、普段の無邪気なキャラクターのギャップが魅力のシンガー。'
        ],
        en: [
            'Known as the "Mysterious Girl with a Transparent Voice".',
            'At first glance, she appears cool and elegant, but she is actually an unpredictable character who surprises everyone with her eccentricity.',
            'She attracts attention with unique performances, such as solving a Rubik\'s cube at high speed while singing improvised songs.',
            'With a unique sense of word choice and innocent charm, she is a beloved mood maker.',
            'The gap between her serious singing voice and her innocent daily character is her greatest charm.'
        ]
    },
    fanNames: {
        nagi: {
            name: { jp: '凪 (Nagi)', en: 'Nagi (Calm)' },
            desc: { jp: '静かに見守るファン', en: 'Fans who quietly watch over' }
        },
        nami: {
            name: { jp: '波 (Nami)', en: 'Nami (Wave)' },
            desc: { jp: 'ライブやShortsを盛り上げるアクティブなファン', en: 'Active fans who liven up shows' }
        }
    }
};

// カテゴリの表示名
export const categoryLabels: Record<NewsItem['category'], { jp: string; en: string }> = {
    announce: { jp: 'お知らせ', en: 'Announce' },
    release: { jp: 'リリース', en: 'Release' },
    event: { jp: 'イベント', en: 'Event' },
    media: { jp: 'メディア', en: 'Media' },
};
