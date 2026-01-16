import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EDO WAR DIARY | 江戸動乱之記録 | Saison Lab',
    description: '江戸時代の動乱を瓦版形式で伝える和風フィクションSNS。A Japanese-style fictional SNS depicting Edo-era turmoil in kawaraban format.',
    keywords: ['EDO WAR DIARY', '江戸動乱之記録', 'Saison Lab', '瓦版', 'Kawaraban', 'Edo', '江戸', 'Fiction', 'Japanese Style'],
    openGraph: {
        title: 'EDO WAR DIARY | 江戸動乱之記録 | Saison Lab',
        description: '江戸時代の動乱を瓦版形式で伝える和風フィクションSNS。',
        type: 'website',
        url: 'https://saison-lab.com/edo-war-diary',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'EDO WAR DIARY | 江戸動乱之記録',
        description: '江戸時代の動乱を瓦版形式で伝える和風フィクションSNS。',
    },
    icons: {
        icon: '/favicon-edo-war-diary.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/edo-war-diary',
    },
};

export default function EdoWarDiaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
