import type { Metadata, Viewport } from 'next';

// ============================================================
// SEO設定 - LANGUAGE ATLAS
// 世界言語図鑑 - インタラクティブ地図
// ============================================================
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: 'LANGUAGE ATLAS | 言語図鑑 | Saison Lab',
    description:
        '世界の言語と分布を可視化。インタラクティブ地図で言語の広がりを探索。Explore world languages and their distribution with an interactive map.',
    keywords: [
        'language',
        'atlas',
        'world map',
        'languages',
        '言語',
        '図鑑',
        '世界地図',
        '言語分布',
    ],
    authors: [{ name: 'Saison Lab' }],
    icons: {
        icon: '/icons/language-atlas-icon.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/language-atlas',
        languages: {
            ja: 'https://saison-lab.com/language-atlas',
            en: 'https://saison-lab.com/language-atlas',
        },
    },
    openGraph: {
        title: 'LANGUAGE ATLAS | 言語図鑑',
        description: 'Explore world languages and their distribution',
        type: 'website',
        url: 'https://saison-lab.com/language-atlas',
        siteName: 'Saison Lab',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LANGUAGE ATLAS | 言語図鑑',
        description: 'Explore world languages and their distribution',
    },
};

export default function LanguageAtlasLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
