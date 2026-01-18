import type { Metadata } from 'next';

/**
 * DIGITAL ART LAB - Layout
 * 
 * SEOとPWA最適化のためのメタデータを設定
 */

export const metadata: Metadata = {
    title: 'DIGITAL ART LAB | デジタルアート | Saison Lab',
    description: '触れると生命が生まれるデジタルアート空間。チームラボに影響を受けた没入型インタラクティブ体験。Experience digital art that comes alive at your touch.',
    keywords: ['デジタルアート', 'インタラクティブアート', 'teamLab', 'digital art', 'interactive art', 'particle system', 'fluid simulation'],
    authors: [{ name: 'Saison Lab' }],
    openGraph: {
        title: 'DIGITAL ART LAB | Saison Lab',
        description: '触れると生命が生まれるデジタルアート空間。✨ Experience digital art that comes alive at your touch.',
        url: 'https://saison-lab.com/digital-art-lab',
        siteName: 'Saison Lab',
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'DIGITAL ART LAB | Saison Lab',
        description: '🌸 触れると生命が生まれるデジタルアートを体験しよう。チームラボに影響を受けた没入型インタラクティブ空間。',
    },
    alternates: {
        canonical: 'https://saison-lab.com/digital-art-lab',
        languages: {
            'ja': 'https://saison-lab.com/digital-art-lab',
            'en': 'https://saison-lab.com/digital-art-lab?lang=en',
        },
    },
    robots: {
        index: true,
        follow: true,
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
        userScalable: false,
    },
    themeColor: '#0a0a1a',
    manifest: '/manifest.json',
    appleWebApp: {
        capable: true,
        statusBarStyle: 'black-translucent',
        title: 'DIGITAL ART LAB',
    },
};

export default function DigitalArtLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {children}
        </>
    );
}
