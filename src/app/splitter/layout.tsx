import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Splitter | Saison Lab',
    description: '画像を4分割してSNS投稿に最適化。',
};

export default function SplitterLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
