import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'TCG Card Generator | TCGカードジェネレーター | Saison Lab',
    description: 'オリジナルのTCGカードを簡単に作成できるジェネレーター。画像をアップロードして、テキストを入力するだけ。A generator for creating original TCG cards easily.',
    keywords: ['TCG', 'Card Generator', 'カードジェネレーター', 'Saison Lab', 'Trading Card', 'オリジナルカード', 'Pocket Style', 'Duel Style', 'Mana Style'],
    openGraph: {
        title: 'TCG Card Generator | Saison Lab',
        description: 'オリジナルのTCGカードを簡単に作成できるジェネレーター。',
        type: 'website',
        url: 'https://saison-lab.com/tcg',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'TCG Card Generator | Saison Lab',
        description: 'Create your own original TCG cards easily.',
    },
    icons: {
        icon: '/favicon-tcg.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/tcg',
    },
};

export default function TcgLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
