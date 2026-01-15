import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '幻獣図鑑 | Saison Lab',
    description: '151匹の架空の幻獣を収録した図鑑。日英対応、インタラクティブなデータを収録。',
    icons: {
        icon: '/favicon-pokedex.svg',
    },
};

export default function PokedexLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
