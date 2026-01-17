import type { Metadata, Viewport } from 'next';

// ============================================================
// SEO設定 - THE BREW
// お茶図鑑＆抽出ガイド
// ============================================================
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: 'THE BREW | ザ・ブリュー | Saison Lab',
    description:
        '世界のお茶と最適な淹れ方を科学的に可視化。温度・時間をガイド付きで。Explore world teas with optimal brewing parameters.',
    keywords: [
        'tea',
        'brewing',
        'green tea',
        'black tea',
        'oolong',
        'お茶',
        '紅茶',
        '緑茶',
        '烏龍茶',
        '抽出',
    ],
    authors: [{ name: 'Saison Lab' }],
    icons: {
        icon: '/icons/the-brew-icon.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/the-brew',
        languages: {
            ja: 'https://saison-lab.com/the-brew',
            en: 'https://saison-lab.com/the-brew',
        },
    },
    openGraph: {
        title: 'THE BREW | ザ・ブリュー',
        description: 'World teas with optimal brewing parameters',
        type: 'website',
        url: 'https://saison-lab.com/the-brew',
        siteName: 'Saison Lab',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'THE BREW | ザ・ブリュー',
        description: 'World teas with optimal brewing parameters',
    },
};

export default function TheBrewLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
