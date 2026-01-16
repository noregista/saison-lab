import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '幻獣図鑑 | Creature Dex | Saison Lab',
    description: '151匹の架空の幻獣を収録した図鑑。日英対応、インタラクティブなデータを収録。An interactive encyclopedia featuring 151 fictional creatures.',
    keywords: ['幻獣図鑑', 'Creature Dex', 'Saison Lab', '架空生物', 'Fictional Creatures', '図鑑', 'Encyclopedia', 'Interactive'],
    openGraph: {
        title: '幻獣図鑑 | Creature Dex | Saison Lab',
        description: '151匹の架空の幻獣を収録した図鑑。',
        type: 'website',
        url: 'https://saison-lab.com/creatures',
    },
    twitter: {
        card: 'summary_large_image',
        title: '幻獣図鑑 | Creature Dex',
        description: '151匹の架空の幻獣を収録した図鑑。',
    },
    icons: {
        icon: '/favicon-creatures.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/creatures',
    },
};

export default function CreatureDexLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
