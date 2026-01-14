import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: '忘却の国々 | Saison Lab',
    description: 'どの地図にも存在しない200の忘れられた領土を探索。',
};

export default function UnmappedLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
