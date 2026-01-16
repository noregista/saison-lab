import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'EDO WAR DIARY | Saison Lab',
    description: '江戸動乱之記録 - 瓦版形式の和風フィクションSNS',
};

export default function EdoWarDiaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
