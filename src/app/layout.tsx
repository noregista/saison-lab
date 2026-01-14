import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Saison Lab | セゾン ラボ",
    description: "ひとりぼっちの開発者による個人制作アプリ集。A collection of apps by a solo developer.",
    keywords: ["Saison Lab", "セゾン ラボ", "TCG", "Card Generator", "Splitter", "Image Tool"],
    authors: [{ name: "Saison" }],
    openGraph: {
        title: "Saison Lab | セゾン ラボ",
        description: "ひとりぼっちの開発者による個人制作アプリ集",
        type: "website",
    },
};

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
                <link rel="icon" type="image/svg+xml" href="/saison-lab/favicon.svg" />
                <link rel="apple-touch-icon" href="/saison-lab/images/profile.jpg" />
            </head>
            <body className="antialiased">
                {children}
            </body>
        </html>
    );
}
