import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NAGISA KAEDE Official | 凪沙 楓 公式サイト | Saison Lab',
    description: '凪沙 楓の公式サイト。最新ニュース、楽曲、動画、ギャラリーをお届けします。Official website of Nagisa Kaede - News, Music, Videos, and Gallery.',
    keywords: ['凪沙 楓', 'Nagisa Kaede', 'アーティスト', 'Artist', 'Saison Lab', '公式サイト', 'Official'],
    openGraph: {
        title: 'NAGISA KAEDE Official | 凪沙 楓 公式サイト',
        description: '凪沙 楓の公式サイト。最新ニュース、楽曲、動画、ギャラリーをお届けします。',
        type: 'website',
        url: 'https://saison-lab.com/nagisa-kaede',
        images: [
            {
                url: '/images/nagisa-kaede-portrait.png',
                width: 1200,
                height: 630,
                alt: '凪沙 楓',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NAGISA KAEDE Official | 凪沙 楓',
        description: 'Official website of Nagisa Kaede. Latest news, music, videos, and gallery.',
    },
    icons: {
        icon: '/favicon-nagisa-kaede.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/nagisa-kaede',
        languages: {
            'ja': 'https://saison-lab.com/nagisa-kaede',
            'en': 'https://saison-lab.com/nagisa-kaede',
        },
    },
};

export default function NagisaKaedeLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
