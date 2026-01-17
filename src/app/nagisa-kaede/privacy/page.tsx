'use client';

import { useState } from 'react';
import Link from 'next/link';

// ============================================================
// カラーパレット
// ============================================================
const colors = {
    primary: '#5B8FA8',
    secondary: '#C75C5C',
    bgDark: '#0D1117',
};

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        title: 'プライバシーポリシー',
        subtitle: 'Privacy Policy',
        intro: '凪沙 楓 公式サイト（以下「本サイト」）は、ユーザーのプライバシーを尊重し、個人情報の保護に努めます。',
        sections: [
            {
                title: '1. 収集する情報',
                content: '本サイトでは、以下の情報を収集する場合があります。\n・アクセスログ（IPアドレス、ブラウザ情報、アクセス日時）\n・Cookie情報\n・お問い合わせフォームからの情報（メールアドレス、お名前等）',
            },
            {
                title: '2. 利用目的',
                content: '収集した情報は、以下の目的で利用します。\n・サイトの改善およびコンテンツの充実\n・ユーザーサポートの提供\n・広告配信の最適化',
            },
            {
                title: '3. 第三者提供',
                content: '本サイトでは、以下のサービスを利用しています。\n・Google Analytics（アクセス解析）\n・Google AdSense（広告配信）\n\nこれらのサービスはCookieを使用してユーザーの行動を分析します。',
            },
            {
                title: '4. Cookie設定',
                content: 'ユーザーはブラウザの設定からCookieを無効化することができます。ただし、一部の機能が正常に動作しなくなる可能性があります。',
            },
            {
                title: '5. お問い合わせ',
                content: 'プライバシーポリシーに関するお問い合わせは、Saison Labのお問い合わせフォームよりご連絡ください。',
            },
        ],
        lastUpdated: '最終更新日: 2026年1月17日',
        back: '← 公式サイトへ戻る',
        copyright: '© 2026 Nagisa Kaede / Saison Lab',
    },
    en: {
        title: 'Privacy Policy',
        subtitle: 'プライバシーポリシー',
        intro: 'Nagisa Kaede Official Website ("this site") respects your privacy and is committed to protecting your personal information.',
        sections: [
            {
                title: '1. Information We Collect',
                content: 'We may collect the following information:\n• Access logs (IP address, browser information, access time)\n• Cookie information\n• Information from contact forms (email address, name, etc.)',
            },
            {
                title: '2. Purpose of Use',
                content: 'We use the collected information for:\n• Improving the site and enriching content\n• Providing user support\n• Optimizing ad delivery',
            },
            {
                title: '3. Third-Party Services',
                content: 'This site uses the following services:\n• Google Analytics (access analysis)\n• Google AdSense (ad delivery)\n\nThese services use cookies to analyze user behavior.',
            },
            {
                title: '4. Cookie Settings',
                content: 'Users can disable cookies through browser settings. However, some features may not function properly.',
            },
            {
                title: '5. Contact',
                content: 'For inquiries about our privacy policy, please contact us through the Saison Lab contact form.',
            },
        ],
        lastUpdated: 'Last Updated: January 17, 2026',
        back: '← Back to Official Site',
        copyright: '© 2026 Nagisa Kaede / Saison Lab',
    },
};

// ============================================================
// プライバシーポリシーページ
// ============================================================
export default function PrivacyPolicyPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const t = texts[lang];

    return (
        <main
            className="min-h-screen text-white"
            style={{ backgroundColor: colors.bgDark }}
        >
            {/* ヘッダー */}
            <header className="sticky top-0 z-50 backdrop-blur bg-[#0D1117]/90 border-b border-gray-700 px-4 py-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <Link
                        href="/nagisa-kaede"
                        className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                    >
                        {t.back}
                    </Link>
                    <button
                        onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                        className="px-3 py-1 rounded border text-sm hover:bg-white/10 transition-colors"
                        style={{ borderColor: colors.primary }}
                    >
                        {lang === 'jp' ? 'EN' : 'JP'}
                    </button>
                </div>
            </header>

            {/* コンテンツ */}
            <div className="max-w-4xl mx-auto px-4 py-16">
                <h1
                    className="text-4xl font-bold mb-2 text-center"
                    style={{ color: colors.primary }}
                >
                    {t.title}
                </h1>
                <p className="text-center opacity-60 mb-12">{t.subtitle}</p>

                <p className="mb-8 opacity-80">{t.intro}</p>

                <div className="space-y-8">
                    {t.sections.map((section, index) => (
                        <section key={index}>
                            <h2
                                className="text-xl font-bold mb-3"
                                style={{ color: colors.secondary }}
                            >
                                {section.title}
                            </h2>
                            <p className="whitespace-pre-line opacity-80">{section.content}</p>
                        </section>
                    ))}
                </div>

                <p className="mt-12 text-sm opacity-50 text-center">{t.lastUpdated}</p>
            </div>

            {/* フッター */}
            <footer className="border-t border-gray-700 py-8">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <p className="text-sm opacity-40">{t.copyright}</p>
                </div>
            </footer>
        </main>
    );
}
