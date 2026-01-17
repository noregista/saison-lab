import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'RANKING LAB | 世界ランキング図鑑 - Saison Lab',
    description: '世界のGDP、人口、面積などあらゆるランキングを比較。信頼性の高いデータソースと基準日を明示した透明性の高いデータプラットフォーム。',
    keywords: ['world ranking', 'GDP ranking', 'population ranking', 'country statistics', '世界ランキング', '国別比較'],
    openGraph: {
        title: 'RANKING LAB | 世界ランキング図鑑',
        description: '世界のあらゆるランキングを一覧・比較できるデータプラットフォーム',
        type: 'website',
        locale: 'ja_JP',
        alternateLocale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'RANKING LAB | 世界ランキング図鑑',
        description: '世界のあらゆるランキングを比較',
    },
    alternates: {
        canonical: 'https://saison-lab.com/ranking-lab',
        languages: {
            'ja': 'https://saison-lab.com/ranking-lab',
            'en': 'https://saison-lab.com/ranking-lab?lang=en',
        },
    },
};

export default function RankingLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
