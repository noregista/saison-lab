import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'NEO-CHRONICLE | Saison Lab',
    description: 'An interactive 3D art experience blending Japanese tradition with Cyberpunk aesthetics.',
};

export default function NeoChronicleLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
