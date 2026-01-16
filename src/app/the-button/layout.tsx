import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'THE BUTTON | Saison Lab',
    description: 'ただ、そこにあるだけのボタン。クリックの先に何があるのか、誰も知らない。A button that just exists. No one knows what lies beyond the click.',
    keywords: ['THE BUTTON', 'Saison Lab', 'Interactive Art', 'インタラクティブ', 'クリック', 'アート', 'Experiment'],
    openGraph: {
        title: 'THE BUTTON | 押してはいけないボタン',
        description: 'ただ、そこにあるだけのボタン。クリックの先に何があるのか、誰も知らない。',
        type: 'website',
        url: 'https://saison-lab.com/the-button',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'THE BUTTON | Do Not Press',
        description: 'A button that just exists. No one knows what lies beyond the click.',
    },
    icons: {
        icon: '/favicon-the-button.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/the-button',
    },
};

export default function TheButtonLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
