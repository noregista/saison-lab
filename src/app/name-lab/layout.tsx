// NAME LAB - レイアウト
// 意図: SEO最適化、OGP、hreflang対応

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NAME LAB | 創造的命名エンジン | Saison Lab',
    description: 'Fantasy・SF・和風の世界観で唯一無二の名前を召喚。語根と意味論に基づいた本格的な命名ツール。',
    keywords: ['名前', 'ネーミング', 'ファンタジー', 'SF', '和風', '創作', 'キャラクター', 'Saison Lab'],
    authors: [{ name: 'Saison Lab' }],
    openGraph: {
        title: 'NAME LAB | 創造的命名エンジン',
        description: 'Fantasy・SF・和風の世界観で唯一無二の名前を召喚',
        url: 'https://saison-lab.com/name-lab',
        siteName: 'Saison Lab',
        images: [
            {
                url: '/name-lab/og-image.png',
                width: 1200,
                height: 630,
                alt: 'NAME LAB - Creative Naming Engine',
            },
        ],
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NAME LAB | 創造的命名エンジン',
        description: 'Fantasy・SF・和風の世界観で唯一無二の名前を召喚',
        images: ['/name-lab/og-image.png'],
    },
    alternates: {
        canonical: 'https://saison-lab.com/name-lab',
        languages: {
            'ja': 'https://saison-lab.com/name-lab',
            'en': 'https://saison-lab.com/name-lab?lang=en',
        },
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function NameLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <link rel="alternate" hrefLang="ja" href="https://saison-lab.com/name-lab" />
            <link rel="alternate" hrefLang="en" href="https://saison-lab.com/name-lab?lang=en" />
            <link rel="alternate" hrefLang="x-default" href="https://saison-lab.com/name-lab" />
            <link rel="manifest" href="/name-lab/manifest.json" />
            <meta name="theme-color" content="#8B5CF6" />
            {children}
        </>
    );
}
