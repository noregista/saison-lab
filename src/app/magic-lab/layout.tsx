import type { Metadata } from 'next';

/**
 * MAGIC LAB レイアウト
 * 
 * 意図: ハリー・ポッター風の魔法の書斎体験を提供するページのメタデータとレイアウトを定義
 * - PWA対応のためのmanifestリンク
 * - 国際SEO（hreflang）対応
 * - OGP設定（SNS共有最適化）
 * - スクロール禁止のためのCSS設定
 */

export const metadata: Metadata = {
  title: 'MAGIC LAB | 魔法ラボ | Saison Lab',
  description: 'スクロール禁止。すべてが1画面に収まる「魔法の書斎」。暖炉の炎、本棚の古書、浮遊する火の粉…クリックで魔法が発動する没入型インターフェース。',
  keywords: ['magic lab', '魔法ラボ', 'saison lab', 'interactive', 'immersive', 'harry potter inspired'],
  authors: [{ name: 'Saison' }],
  openGraph: {
    title: 'MAGIC LAB | 魔法ラボ',
    description: 'スクロールのない魔法の書斎へようこそ',
    url: 'https://saison-lab.com/magic-lab',
    siteName: 'Saison Lab',
    images: [
      {
        url: '/images/magic-lab-og.jpg',
        width: 1200,
        height: 630,
        alt: 'MAGIC LAB - 魔法の書斎',
      },
    ],
    locale: 'ja_JP',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MAGIC LAB | 魔法ラボ',
    description: 'スクロールのない魔法の書斎へようこそ',
    images: ['/images/magic-lab-og.jpg'],
  },
  alternates: {
    canonical: 'https://saison-lab.com/magic-lab',
    languages: {
      'ja': 'https://saison-lab.com/magic-lab',
      'en': 'https://saison-lab.com/magic-lab?lang=en',
    },
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MagicLabLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="magic-lab-wrapper">
      {/* manifest.jsonへのリンク（PWA対応）*/}
      <link rel="manifest" href="/magic-lab/manifest.json" />
      {/* アップルタッチアイコン */}
      <link rel="apple-touch-icon" href="/magic-lab/icon-192.png" />
      {children}
    </div>
  );
}
