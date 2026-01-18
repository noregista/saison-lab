// MINUTE LAB - レイアウト
// 意図: SEO最適化、OGP、hreflang対応

import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'MINUTE LAB | 1分解説図鑑 | Saison Lab',
    description: '歴史・科学・文化・経済・哲学。知識を1分で。膨大な知識を凝縮したタイパ型知的マイクロメディア。',
    keywords: ['1分', '解説', '図鑑', '歴史', '科学', '文化', '経済', '哲学', 'Saison Lab'],
    authors: [{ name: 'Saison Lab' }],
    openGraph: {
        title: 'MINUTE LAB | 1分解説図鑑',
        description: '歴史・科学・文化・経済・哲学。知識を1分で。',
        url: 'https://saison-lab.com/minute-lab',
        siteName: 'Saison Lab',
        images: [
            {
                url: '/minute-lab/og-image.png',
                width: 1200,
                height: 630,
                alt: 'MINUTE LAB - 1分解説図鑑',
            },
        ],
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'MINUTE LAB | 1分解説図鑑',
        description: '歴史・科学・文化・経済・哲学。知識を1分で。',
        images: ['/minute-lab/og-image.png'],
    },
    alternates: {
        canonical: 'https://saison-lab.com/minute-lab',
        languages: {
            'ja': 'https://saison-lab.com/minute-lab',
            'en': 'https://saison-lab.com/minute-lab?lang=en',
        },
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function MinuteLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <link rel="alternate" hrefLang="ja" href="https://saison-lab.com/minute-lab" />
            <link rel="alternate" hrefLang="en" href="https://saison-lab.com/minute-lab?lang=en" />
            <link rel="alternate" hrefLang="x-default" href="https://saison-lab.com/minute-lab" />
            <link rel="manifest" href="/minute-lab/manifest.json" />
            <meta name="theme-color" content="#F59E0B" />
            {children}
        </>
    );
}
