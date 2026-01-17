import type { Metadata, Viewport } from 'next';

// ============================================================
// SEO設定 - XYLOPHONE LAB
// 木琴/鉄琴シミュレーター
// ============================================================
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: 'XYLOPHONE LAB | 木琴ラボ | Saison Lab',
    description:
        'カラフルな木琴/鉄琴をブラウザで演奏。叩くと波紋が広がる楽しいUI。Play colorful xylophone or glockenspiel with ripple effects.',
    keywords: [
        'xylophone',
        'glockenspiel',
        'percussion',
        'music',
        '木琴',
        '鉄琴',
        '打楽器',
        '音楽',
    ],
    authors: [{ name: 'Saison Lab' }],
    icons: {
        icon: '/icons/xylophone-lab-icon.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/xylophone-lab',
        languages: {
            ja: 'https://saison-lab.com/xylophone-lab',
            en: 'https://saison-lab.com/xylophone-lab',
        },
    },
    openGraph: {
        title: 'XYLOPHONE LAB | 木琴ラボ',
        description: 'Play xylophone with colorful keys and ripple effects',
        type: 'website',
        url: 'https://saison-lab.com/xylophone-lab',
        siteName: 'Saison Lab',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'XYLOPHONE LAB | 木琴ラボ',
        description: 'Play xylophone with colorful keys',
    },
};

export default function XylophoneLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
