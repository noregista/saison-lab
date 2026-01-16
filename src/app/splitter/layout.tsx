import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Splitter | 画像分割ツール | Saison Lab',
    description: '画像を4分割してSNS投稿に最適化。2×2グリッドと1×4縦分割に対応。Split images into 4 parts for optimal SNS posting.',
    keywords: ['Splitter', '画像分割', 'Image Split', 'Saison Lab', 'SNS', 'Instagram', 'Twitter', 'Grid', '分割ツール'],
    openGraph: {
        title: 'Splitter | Saison Lab',
        description: '画像を4分割してSNS投稿に最適化。',
        type: 'website',
        url: 'https://saison-lab.com/splitter',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Splitter | Saison Lab',
        description: 'Split images into 4 parts for SNS.',
    },
    icons: {
        icon: '/favicon-splitter.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/splitter',
    },
};

export default function SplitterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
