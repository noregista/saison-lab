import type { Metadata, Viewport } from 'next';

// ============================================================
// SEO設定 - WEATHER LAB
// 世界気象観測プラットフォーム
// ============================================================
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: 'WEATHER LAB | ウェザー・ラボ | Saison Lab',
    description:
        '世界各地のリアルタイム気象データ。気温・天候をインタラクティブ地図で確認。Real-time weather data for cities worldwide.',
    keywords: [
        'weather',
        'temperature',
        'forecast',
        'world weather',
        '天気',
        '気温',
        '気象',
        '世界の天気',
    ],
    authors: [{ name: 'Saison Lab' }],
    icons: {
        icon: '/icons/weather-lab-icon.svg',
    },
    alternates: {
        canonical: 'https://saison-lab.com/weather-lab',
        languages: {
            ja: 'https://saison-lab.com/weather-lab',
            en: 'https://saison-lab.com/weather-lab',
        },
    },
    openGraph: {
        title: 'WEATHER LAB | ウェザー・ラボ',
        description: 'Real-time weather data for cities worldwide',
        type: 'website',
        url: 'https://saison-lab.com/weather-lab',
        siteName: 'Saison Lab',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'WEATHER LAB | ウェザー・ラボ',
        description: 'Real-time weather data for cities worldwide',
    },
};

export default function WeatherLabLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
