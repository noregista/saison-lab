import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'FONT LAB | フォント・ラボ | Saison Lab',
    description: '100種類以上のフォントを試せる素材工場。透過PNG保存対応。Try 100+ fonts and export as transparent PNG.',
    keywords: ['FONT LAB', 'フォント', 'Google Fonts', 'Saison Lab', 'Typography', '素材工場', 'PNG Export', 'Font Preview'],
    openGraph: {
        title: 'FONT LAB | フォント・ラボ | Saison Lab',
        description: '100種類以上のフォントを試せる素材工場。透過PNG保存対応。',
        type: 'website',
        url: 'https://saison-lab.com/font-lab',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'FONT LAB | Saison Lab',
        description: 'Try 100+ fonts and export as transparent PNG.',
    },
    icons: {
        icon: '/favicon-font-lab.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/font-lab',
    },
};

export default function FontLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
