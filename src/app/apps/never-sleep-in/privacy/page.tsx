'use client';

import Link from 'next/link';

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-[#0d1117] text-[#8b949e] py-12 px-4 md:px-8">
            <div className="max-w-[800px] mx-auto bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-[rgba(80,200,120,0.2)] rounded-3xl p-8 md:p-12 shadow-lg">
                <Link href="/" className="text-emerald hover:underline mb-8 inline-block">
                    ← Back to Saison Lab
                </Link>
                
                <h1 className="text-3xl font-bold text-white mb-2">Privacy Policy / プライバシーポリシー</h1>
                <p className="mb-8 text-sm">Last Updated: 2026-01-20</p>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-emerald mb-4">1. Introduction / はじめに</h2>
                    <p className="mb-4">
                        This Privacy Policy describes how &quot;NeverSleepIn&quot; (hereinafter referred to as &quot;the App&quot;) handles user information.
                    </p>
                    <p>
                        本プライバシーポリシーは、「二度寝禁止アラーム / NeverSleepIn」（以下「本アプリ」）におけるユーザー情報の取り扱いについて説明するものです。
                    </p>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-emerald mb-4">2. Information We Collect / 収集する情報</h2>
                    <p className="mb-4">
                        The App may collect the following information through third-party services:
                    </p>
                    <p className="mb-4">
                        本アプリは、以下のサードパーティサービスを通じて情報を収集する場合があります：
                    </p>
                    <ul className="list-disc pl-6 space-y-4">
                        <li>
                            <strong>Advertisements (Google AdMob):</strong> Device identifiers and usage data for displaying personalized ads.<br />
                            <strong>広告 (Google AdMob):</strong> パーソナライズされた広告を表示するためのデバイス識別子および使用状況データ。
                        </li>
                        <li>
                            <strong>In-App Purchases (Google Play Billing):</strong> Transaction history (managed by Google Play) for providing premium features.<br />
                            <strong>アプリ内購入 (Google Play Billing):</strong> プレミアム機能を提供するための取引履歴（Google Playによって管理されます）。
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-emerald mb-4">3. Purpose of Information Use / 利用目的</h2>
                    <p className="mb-4">We use the collected information for:</p>
                    <p className="mb-4">収集した情報は、以下の目的で利用されます：</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Displaying advertisements / 広告の表示</li>
                        <li>Providing and managing premium features / プレミアム機能の提供および管理</li>
                        <li>Improving app performance and user experience / アプリの性能向上およびユーザー体験の改善</li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-emerald mb-4">4. Third-Party Services / 第三者への提供</h2>
                    <p className="mb-4">The App uses the following third-party services:</p>
                    <p className="mb-4">本アプリは以下のサードパーティサービスを利用しています：</p>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>
                            <strong>Google AdMob:</strong> <a href="https://policies.google.com/privacy" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        </li>
                        <li>
                            <strong>Google Play Services:</strong> <a href="https://policies.google.com/privacy" className="text-emerald hover:underline" target="_blank" rel="noopener noreferrer">Privacy Policy</a>
                        </li>
                    </ul>
                </section>

                <section className="mb-8">
                    <h2 className="text-xl font-semibold text-emerald mb-4">5. Contact Us / お問い合わせ</h2>
                    <p className="mb-4">
                        If you have any questions regarding this Privacy Policy, please contact us at:
                    </p>
                    <p className="mb-4">
                        本プライバシーポリシーに関するお問い合わせは、以下までお願いいたします：
                    </p>
                    <p className="text-white font-medium">
                        saisonlab.official@gmail.com
                    </p>
                </section>

                <footer className="mt-12 pt-8 border-t border-[rgba(80,200,120,0.2)] text-center text-xs">
                    © 2026 Saison Lab. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
