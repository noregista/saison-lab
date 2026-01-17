import type { Metadata, Viewport } from 'next';

// ============================================================
// SEO設定 - DRUM LAB
// 16ステップドラムシーケンサー
// ============================================================
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: 'DRUM LAB | ドラム・ラボ | Saison Lab',
    description:
        '16ステップのドラムシーケンサー。キック・スネア・ハイハットを打ち込んでビートメイク。A 16-step drum machine sequencer.',
    keywords: [
        'drum machine',
        'sequencer',
        'beat maker',
        'rhythm',
        'ドラムマシン',
        'シーケンサー',
        'ビートメイク',
    ],
    authors: [{ name: 'Saison Lab' }],
    icons: {
        icon: '/icons/drum-lab-icon.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/drum-lab',
        languages: {
            ja: 'https://saison-lab.com/drum-lab',
            en: 'https://saison-lab.com/drum-lab',
        },
    },
    openGraph: {
        title: 'DRUM LAB | ドラム・ラボ',
        description: 'Create beats with a 16-step drum sequencer',
        type: 'website',
        url: 'https://saison-lab.com/drum-lab',
        siteName: 'Saison Lab',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'DRUM LAB | ドラム・ラボ',
        description: 'Create beats with a 16-step drum sequencer',
    },
};

export default function DrumLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
