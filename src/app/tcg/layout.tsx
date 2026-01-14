import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'TCG Card Generator | Saison Lab',
    description: 'オリジナルのTCGカードを簡単に作成できるジェネレーター。',
};

export default function TcgLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
