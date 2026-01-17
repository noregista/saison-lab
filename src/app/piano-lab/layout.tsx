import type { Metadata, Viewport } from 'next';

// ============================================================
// SEO設定 - PIANO LAB
// 低レイテンシWebピアノシミュレーター
// ============================================================
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: 'PIANO LAB | ピアノ・ラボ | Saison Lab',
    description:
        '低レイテンシ・高品質なWebピアノ。PCキーボードやタッチで演奏できます。A low-latency, high-quality virtual piano playable with your keyboard or touch.',
    keywords: [
        'piano',
        'virtual piano',
        'web piano',
        'music',
        'keyboard',
        'ピアノ',
        'バーチャルピアノ',
        '音楽',
    ],
    authors: [{ name: 'Saison Lab' }],
    icons: {
        icon: '/icons/piano-lab-icon.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/piano-lab',
        languages: {
            ja: 'https://saison-lab.com/piano-lab',
            en: 'https://saison-lab.com/piano-lab',
        },
    },
    openGraph: {
        title: 'PIANO LAB | ピアノ・ラボ',
        description: 'Play piano in your browser with minimal latency',
        type: 'website',
        url: 'https://saison-lab.com/piano-lab',
        siteName: 'Saison Lab',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'PIANO LAB | ピアノ・ラボ',
        description: 'Play piano in your browser with minimal latency',
    },
};

export default function PianoLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
