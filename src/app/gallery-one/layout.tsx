import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'GALLERY ONE | ギャラリー・ワン | Saison Lab',
    description: '15種類以上のフォトフレームで写真を美しく装飾。無料で高品質画像を出力。Decorate your photos with 15+ unique frames.',
    keywords: ['GALLERY ONE', 'ギャラリー・ワン', 'フォトフレーム', 'Photo Frame', 'Saison Lab', '画像加工', 'Image Editor'],
    openGraph: {
        title: 'GALLERY ONE | ギャラリー・ワン | Saison Lab',
        description: '15種類以上のフォトフレームで写真を美しく装飾。無料で高品質画像を出力。',
        type: 'website',
        url: 'https://saison-lab.com/gallery-one',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'GALLERY ONE | Saison Lab',
        description: 'Decorate your photos with 15+ unique frames. Free high-quality export.',
    },
    icons: {
        icon: '/favicon-gallery-one.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/gallery-one',
        languages: {
            'ja': 'https://saison-lab.com/gallery-one',
            'en': 'https://saison-lab.com/gallery-one',
        },
    },
};

export default function GalleryOneLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
