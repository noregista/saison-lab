import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'WAR DIARY | Saison Lab',
    description: 'A fictional social media timeline depicting the first day of a crisis.',
};

export default function WarDiaryLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
