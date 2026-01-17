import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
};

export const metadata: Metadata = {
    title: "Saison Lab | セゾン ラボ",
    description: "ひとりぼっちの開発者による個人制作アプリ集。A collection of apps by a solo developer.",
    keywords: ["Saison Lab", "セゾン ラボ", "TCG", "Card Generator", "Splitter", "Image Tool"],
    authors: [{ name: "Saison" }],
    icons: {
        icon: '/images/profile.jpg',
    },
    openGraph: {
        title: "Saison Lab | セゾン ラボ",
        description: "ひとりぼっちの開発者による個人制作アプリ集",
        type: "website",
    },
};

import { GoogleAnalytics } from "@next/third-parties/google";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="ja">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link rel="apple-touch-icon" href="/images/profile.jpg" />
                {/* Google AdSense */}
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9663321520769561"
                    crossOrigin="anonymous"
                />
            </head>
            <body className="antialiased">
                {children}
            </body>
            <GoogleAnalytics gaId="G-XW9Q142H8S" />
        </html>
    );
}
