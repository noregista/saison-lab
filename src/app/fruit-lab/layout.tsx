// FRUIT LAB - レイアウト
// 意図: SEO最適化、OGP、hreflang対応

import type { Metadata } from 'next';

// 意図: SEOメタデータ
export const metadata: Metadata = {
    title: 'FRUIT LAB | 世界フルーツ図鑑 | Saison Lab',
    description: '15種類以上のフルーツを植物学的特徴と輸出統計で徹底比較。バナナ、りんご、オレンジなど世界のフルーツを探索できるデジタル図鑑。',
    keywords: ['フルーツ', '果物', '図鑑', '輸出統計', 'バナナ', 'りんご', 'オレンジ', 'Saison Lab'],
    authors: [{ name: 'Saison Lab' }],
    openGraph: {
        title: 'FRUIT LAB | 世界フルーツ図鑑',
        description: '植物学的特徴と輸出統計で世界のフルーツを徹底比較',
        url: 'https://saison-lab.com/fruit-lab',
        siteName: 'Saison Lab',
        images: [
            {
                url: '/fruit-lab/og-image.png',
                width: 1200,
                height: 630,
                alt: 'FRUIT LAB - World Fruit Encyclopedia',
            },
        ],
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FRUIT LAB | 世界フルーツ図鑑',
        description: '植物学的特徴と輸出統計で世界のフルーツを徹底比較',
        images: ['/fruit-lab/og-image.png'],
    },
    alternates: {
        canonical: 'https://saison-lab.com/fruit-lab',
        languages: {
            'ja': 'https://saison-lab.com/fruit-lab',
            'en': 'https://saison-lab.com/fruit-lab?lang=en',
        },
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function FruitLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* 意図: hreflangタグ（国際SEO対応） */}
            <link rel="alternate" hrefLang="ja" href="https://saison-lab.com/fruit-lab" />
            <link rel="alternate" hrefLang="en" href="https://saison-lab.com/fruit-lab?lang=en" />
            <link rel="alternate" hrefLang="x-default" href="https://saison-lab.com/fruit-lab" />
            {/* 意図: PWAマニフェスト */}
            <link rel="manifest" href="/fruit-lab/manifest.json" />
            <meta name="theme-color" content="#22C55E" />
            {children}
        </>
    );
}
