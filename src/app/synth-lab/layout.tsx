import type { Metadata, Viewport } from 'next';

// ============================================================
// SEO設定 - SYNTH LAB
// Web Audio APIを使用したシンセサイザー
// ============================================================
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: 'SYNTH LAB | シンセ・ラボ | Saison Lab',
    description:
        'Web Audio APIで波形合成。正弦波・鋸歯状波・矩形波・三角波を選択し、リアルタイム・オシロスコープで可視化。A web synthesizer with real-time oscilloscope.',
    keywords: [
        'synthesizer',
        'synth',
        'web audio',
        'oscillator',
        'waveform',
        'シンセサイザー',
        '波形',
        '音楽',
    ],
    authors: [{ name: 'Saison Lab' }],
    icons: {
        icon: '/icons/synth-lab-icon.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/synth-lab',
        languages: {
            ja: 'https://saison-lab.com/synth-lab',
            en: 'https://saison-lab.com/synth-lab',
        },
    },
    openGraph: {
        title: 'SYNTH LAB | シンセ・ラボ',
        description: 'Create sounds with waveform synthesis and real-time visualization',
        type: 'website',
        url: 'https://saison-lab.com/synth-lab',
        siteName: 'Saison Lab',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'SYNTH LAB | シンセ・ラボ',
        description: 'Create sounds with waveform synthesis',
    },
};

export default function SynthLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
