import type { Metadata } from 'next';
import Head from 'next/head';

export const metadata: Metadata = {
    title: 'NEO-CHRONICLE | Saison Lab',
    description: 'An interactive 3D art experience blending Japanese tradition with Cyberpunk aesthetics. 日本の伝統美とサイバーパンクが融合したインタラクティブ3Dアート空間。',
    keywords: ['NEO-CHRONICLE', 'Saison Lab', '3D Art', 'Cyberpunk', 'Japanese Art', 'Three.js', 'Interactive'],
    openGraph: {
        title: 'NEO-CHRONICLE | Saison Lab',
        description: 'An interactive 3D art experience blending Japanese tradition with Cyberpunk aesthetics.',
        type: 'website',
        url: 'https://saison-lab.com/neo-chronicle',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'NEO-CHRONICLE | Saison Lab',
        description: 'An interactive 3D art experience.',
    },
    icons: {
        icon: '/favicon-neo-chronicle.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/neo-chronicle',
    },
};

export default function NeoChronicleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
