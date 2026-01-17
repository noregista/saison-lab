import type { Metadata } from 'next';

// 意図: SEO と OGP の最適化。hreflang 対応
export const metadata: Metadata = {
    title: 'KANJI LAB | 漢字ラボ | Saison Lab',
    description: '13,000以上の漢字を無料で検索・学習。読み、画数、部首、書き順、熟語、JLPTレベルまで網羅した包括的な漢字データベース。',
    keywords: ['漢字', 'kanji', '日本語学習', 'JLPT', '画数', '部首', '書き順', 'Saison Lab'],
    openGraph: {
        title: 'KANJI LAB | 漢字ラボ',
        description: '13,000以上の漢字を無料で検索・学習。読み、画数、部首、書き順、熟語まで網羅。',
        url: 'https://saison-lab.com/kanji-lab',
        siteName: 'Saison Lab',
        locale: 'ja_JP',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'KANJI LAB | 漢字ラボ',
        description: '13,000以上の漢字を無料で検索・学習。',
    },
    alternates: {
        canonical: 'https://saison-lab.com/kanji-lab',
        languages: {
            'ja': 'https://saison-lab.com/kanji-lab?lang=jp',
            'en': 'https://saison-lab.com/kanji-lab?lang=en',
        },
    },
};

export default function KanjiLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            {/* 意図: Google Fonts で日本語対応フォントを読み込み */}
            <link
                href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Serif+JP:wght@400;700&display=swap"
                rel="stylesheet"
            />
            {children}
        </>
    );
}
