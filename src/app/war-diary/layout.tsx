import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'WAR DIARY | Saison Lab',
    description: 'A fictional social media timeline depicting the first day of a crisis. 架空の有事初日を描いたフィクションSNS。',
    keywords: ['WAR DIARY', 'Saison Lab', 'Fiction', 'Social Media', 'Crisis', 'Timeline', 'SNS'],
    openGraph: {
        title: 'WAR DIARY | Saison Lab',
        description: 'A fictional social media timeline depicting the first day of a crisis.',
        type: 'website',
        url: 'https://saison-lab.com/war-diary',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'WAR DIARY | Saison Lab',
        description: 'A fictional social media timeline.',
    },
    icons: {
        icon: '/favicon-war-diary.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/war-diary',
    },
};

export default function WarDiaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
