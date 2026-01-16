'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';


type Language = 'jp' | 'en';

const translations = {
    jp: {
        'logo-subtitle': '/ セゾン ラボ',
        'ad-text': '広告スペース / Advertisement',
        'profile-title': 'ひとりぼっちの開発者',
        'profile-bio': '気ままに、つくりたいものをつくっています。もしお気に入りのひとつが見つかったら、ぜひ遊んでいってください。',
        'search-placeholder': 'アプリを検索...',
        'apps-title': 'アプリ一覧',
        'app-tcg-desc': 'オリジナルのTCGカードを簡単に作成できるジェネレーター。画像をアップロードして、テキストを入力するだけ。',
        'app-splitter-desc': '画像を4分割してSNS投稿に最適化。2×2グリッドと1×4縦分割に対応。',
        'app-creatures-desc': '151匹の架空の生物を収録したインタラクティブな図鑑。',
        'app-neo-chronicle-desc': '日本の伝統美とサイバーパンクが融合したインタラクティブ3Dアート空間。',
        'app-war-diary-desc': '架空の有事初日を描いたフィクションSNS。緊迫感のあるタイムライン。',
        'app-edo-war-diary-desc': '江戸時代の動乱を瓦版形式で伝える和風フィクションSNS。',
        'app-the-button-desc': 'ただクリックするだけ。それ以外のことは忘れてください。',
        'app-font-lab-desc': '100種類以上のフォントを試せる素材工場。透過PNG保存対応。',
        'no-results': '該当するアプリが見つかりません',
        'update-title': '更新履歴',
        'update-1': 'TCGカードジェネレーターを追加しました。',
        'update-2': 'Splitterを追加しました。',
        'update-3': 'NEO-CHRONICLEを追加しました。',
        'update-4': 'WAR DIARY / EDO WAR DIARYを追加しました。',
        'update-5': 'THE BUTTONを追加しました。',
        'update-6': 'フォント・ラボを追加しました。',
        'footer-privacy': 'プライバシーポリシー',
        'footer-contact': 'お問い合わせ',
        'footer-disclaimer': '免責事項',
        'privacy-title': 'プライバシーポリシー',
        'privacy-intro': '当サイト「セゾン ラボ」（以下、「当サイト」）では、お客様のプライバシーを尊重し、個人情報の保護に努めております。',
        'privacy-h1': '収集する情報',
        'privacy-p1': '当サイトでは、アクセス解析のためにGoogle Analyticsを使用する場合があります。これにより収集されるデータには、IPアドレス、ブラウザの種類、参照元URLなどが含まれますが、個人を特定できる情報は収集しません。',
        'privacy-h2': '広告について',
        'privacy-p2': '当サイトでは、第三者配信の広告サービスを利用する場合があります。広告配信事業者はユーザーの興味に応じた広告を表示するためにCookieを使用することがあります。',
        'privacy-h3': 'お問い合わせ',
        'privacy-p3': 'プライバシーポリシーに関するお問い合わせは、お問い合わせフォームよりご連絡ください。',
        'contact-title': 'お問い合わせ',
        'contact-intro': 'ご質問やご意見がございましたら、以下のフォームよりお気軽にお問い合わせください。',
        'contact-name': 'お名前',
        'contact-name-placeholder': 'お名前を入力',
        'contact-email': 'メールアドレス',
        'contact-email-placeholder': 'example@mail.com',
        'contact-message': 'メッセージ',
        'contact-message-placeholder': 'お問い合わせ内容を入力',
        'contact-submit': '送信する',
        'disclaimer-title': '免責事項',
        'disclaimer-intro': '当サイトに掲載されている情報やアプリケーションのご利用にあたっては、以下の免責事項をご確認ください。',
        'disclaimer-h1': '情報の正確性について',
        'disclaimer-p1': '当サイトのコンテンツは可能な限り正確な情報を提供するよう努めておりますが、その正確性や完全性を保証するものではありません。',
        'disclaimer-h2': '損害等の責任について',
        'disclaimer-p2': '当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。また、当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等についても一切の責任を負いません。',
        'disclaimer-h3': 'アプリケーションについて',
        'disclaimer-p3': '当サイトで提供するアプリケーションは「現状のまま」提供されます。アプリケーションの使用により生じたいかなる損害についても責任を負いかねます。',
    },
    en: {
        'logo-subtitle': '/ Saison Lab',
        'ad-text': 'Advertisement',
        'profile-title': 'A Solo Developer',
        'profile-bio': 'Creating what I want to create, at my own pace. If you find something you like, please feel free to explore.',
        'search-placeholder': 'Search apps...',
        'apps-title': 'Apps',
        'app-tcg-desc': 'A generator that makes it easy to create original TCG cards. Just upload an image and enter text.',
        'app-splitter-desc': 'Split images into 4 parts for optimal SNS posting. Supports 2×2 grid and 1×4 vertical split modes.',
        'app-creatures-desc': 'An interactive encyclopedia featuring 151 fictional creatures.',
        'app-neo-chronicle-desc': 'An interactive 3D art space blending Japanese tradition with Cyberpunk aesthetics.',
        'app-war-diary-desc': 'A fictional social media depicting the first day of a crisis.',
        'app-edo-war-diary-desc': 'A Japanese-style fictional SNS depicting Edo-era turmoil in kawaraban format.',
        'app-the-button-desc': 'Just click. Forget everything else.',
        'app-font-lab-desc': 'Material factory with 100+ fonts. Transparent PNG export.',
        'no-results': 'No matching apps found',
        'update-title': 'Updates',
        'update-1': 'Site launched. Added TCG Card Generator.',
        'update-2': 'Added Splitter.',
        'update-3': 'Added NEO-CHRONICLE.',
        'update-4': 'Added WAR DIARY / EDO WAR DIARY.',
        'update-5': 'Observation: THE BUTTON installed.',
        'update-6': 'New Feature: FONT LAB launched.',
        'footer-privacy': 'Privacy Policy',
        'footer-contact': 'Contact',
        'footer-disclaimer': 'Disclaimer',
        'privacy-title': 'Privacy Policy',
        'privacy-intro': 'At Saison Lab ("this site"), we respect your privacy and are committed to protecting your personal information.',
        'privacy-h1': 'Information We Collect',
        'privacy-p1': 'This site may use Google Analytics for access analysis. Data collected may include IP addresses, browser types, and referral URLs, but no personally identifiable information is collected.',
        'privacy-h2': 'About Advertisements',
        'privacy-p2': 'This site may use third-party advertising services. Advertising providers may use cookies to display ads based on user interests.',
        'privacy-h3': 'Contact',
        'privacy-p3': 'For inquiries about our privacy policy, please use the contact form.',
        'contact-title': 'Contact',
        'contact-intro': 'If you have any questions or comments, please feel free to contact us using the form below.',
        'contact-name': 'Name',
        'contact-name-placeholder': 'Enter your name',
        'contact-email': 'Email Address',
        'contact-email-placeholder': 'example@mail.com',
        'contact-message': 'Message',
        'contact-message-placeholder': 'Enter your message',
        'contact-submit': 'Submit',
        'disclaimer-title': 'Disclaimer',
        'disclaimer-intro': 'Please review the following disclaimer before using the information and applications on this site.',
        'disclaimer-h1': 'Accuracy of Information',
        'disclaimer-p1': 'While we strive to provide accurate information on this site, we do not guarantee its accuracy or completeness.',
        'disclaimer-h2': 'Liability for Damages',
        'disclaimer-p2': 'We are not responsible for any damages arising from the content published on this site. We are also not responsible for information or services provided on sites linked from this site.',
        'disclaimer-h3': 'About Applications',
        'disclaimer-p3': 'Applications provided on this site are offered "as is". We are not responsible for any damages arising from the use of these applications.',
    }
};

const apps = [
    {
        id: 'tcg',
        name: { jp: 'TCGカードジェネレーター', en: 'TCG Card Generator' },
        href: '/tcg',
        icon: '🃏',
        descKey: 'app-tcg-desc' as const,
    },
    {
        id: 'splitter',
        name: { jp: '画像分割ツール Splitter', en: 'Splitter' },
        href: '/splitter',
        icon: '✂️',
        descKey: 'app-splitter-desc' as const,
    },
    {
        id: 'neo-chronicle',
        name: { jp: 'NEO-CHRONICLE', en: 'NEO-CHRONICLE' },
        href: '/neo-chronicle',
        icon: '🌐',
        descKey: 'app-neo-chronicle-desc' as const,
    },
    {
        id: 'war-diary',
        name: { jp: 'WAR DIARY', en: 'WAR DIARY' },
        href: '/war-diary',
        icon: '📡',
        descKey: 'app-war-diary-desc' as const,
    },
    {
        id: 'edo-war-diary',
        name: { jp: '江戸動乱之記録', en: 'EDO WAR DIARY' },
        href: '/edo-war-diary',
        icon: '📜',
        descKey: 'app-edo-war-diary-desc' as const,
    },
    {
        id: 'the-button',
        name: { jp: 'THE BUTTON', en: 'THE BUTTON' },
        href: '/the-button',
        icon: '🔴',
        descKey: 'app-the-button-desc' as const,
    },
    {
        id: 'font-lab',
        name: { jp: 'フォント・ラボ', en: 'FONT LAB' },
        href: '/font-lab',
        icon: '🔤',
        descKey: 'app-font-lab-desc' as const,
    },
];

const updates = [
    { date: '2026.01.17', key: 'update-6' as const },
    { date: '2026.01.17', key: 'update-5' as const },
    { date: '2026.01.17', key: 'update-4' as const },
    { date: '2026.01.17', key: 'update-3' as const },
    { date: '2026.01.11', key: 'update-2' as const },
    { date: '2026.01.11', key: 'update-1' as const },
];

export default function HomePage() {
    const [lang, setLang] = useState<Language>('jp');
    const [searchQuery, setSearchQuery] = useState('');
    const [activeModal, setActiveModal] = useState<'privacy' | 'contact' | 'disclaimer' | null>(null);

    const t = translations[lang];

    const filteredApps = useMemo(() => {
        if (!searchQuery.trim()) return apps;
        const query = searchQuery.toLowerCase();
        return apps.filter(app =>
            app.name[lang].toLowerCase().includes(query) ||
            t[app.descKey].toLowerCase().includes(query)
        );
    }, [searchQuery, t, lang]);

    const openModal = (type: 'privacy' | 'contact' | 'disclaimer') => setActiveModal(type);
    const closeModal = () => setActiveModal(null);

    const handleContactSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert(lang === 'jp' ? 'お問い合わせありがとうございます。' : 'Thank you for your message.');
        closeModal();
    };

    return (
        <div className="min-h-screen home-bg">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border-b border-[rgba(80,200,120,0.2)] px-4 md:px-8 py-4">
                <div className="max-w-[1200px] mx-auto flex justify-between items-center flex-wrap gap-4">
                    <a href="#" className="text-2xl font-bold text-emerald no-underline tracking-wide">
                        Saison Lab <span className="text-[#8b949e] font-normal text-base ml-2">{t['logo-subtitle']}</span>
                    </a>
                    <div className="flex bg-[#21262d] rounded-full p-1 gap-1">
                        <button
                            onClick={() => setLang('jp')}
                            className={`px-4 py-2 border-none rounded-full font-medium text-sm cursor-pointer transition-all ${lang === 'jp' ? 'bg-emerald text-[#0d1117]' : 'bg-transparent text-[#8b949e] hover:text-white'}`}
                        >
                            JP
                        </button>
                        <button
                            onClick={() => setLang('en')}
                            className={`px-4 py-2 border-none rounded-full font-medium text-sm cursor-pointer transition-all ${lang === 'en' ? 'bg-emerald text-[#0d1117]' : 'bg-transparent text-[#8b949e] hover:text-white'}`}
                        >
                            EN
                        </button>
                    </div>
                </div>
            </header>

            {/* Ad Placeholder */}
            <div className="max-w-[728px] mx-auto my-6 px-4">
                <div className="bg-gradient-to-br from-[#161b22] to-[#21262d] border border-dashed border-[rgba(80,200,120,0.2)] rounded-xl p-4 text-center text-[#6e7681] text-sm min-h-[90px] flex items-center justify-center">
                    {t['ad-text']} (728x90 or Responsive Banner)
                </div>
            </div>

            <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8">
                {/* Profile Section */}
                <section className="bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-[rgba(80,200,120,0.2)] rounded-3xl p-8 md:p-12 mb-8 text-center shadow-lg animate-fadeIn">
                    <div className="relative inline-block mb-6">
                        <img
                            src="/images/profile.jpg"
                            alt="Saison Profile Icon"
                            width={140}
                            height={140}
                            className="rounded-full border-4 border-emerald shadow-[0_0_30px_rgba(80,200,120,0.3)] hover:scale-105 transition-transform object-cover"
                        />
                    </div>
                    <h1 className="text-3xl font-bold text-white mb-2">
                        セゾン <span className="text-[#8b949e] font-normal">/ Saison</span>
                    </h1>
                    <p className="text-emerald font-medium mb-6">{t['profile-title']}</p>
                    <p className="text-[#8b949e] max-w-[600px] mx-auto leading-relaxed">{t['profile-bio']}</p>
                </section>

                {/* Search Bar */}
                <div className="max-w-[500px] mx-auto my-8 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#6e7681] text-xl">🔍</span>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder={t['search-placeholder']}
                        className="w-full py-4 px-4 pl-12 bg-[#161b22] border border-[rgba(80,200,120,0.2)] rounded-full text-white text-base focus:outline-none focus:border-emerald focus:shadow-[0_0_20px_rgba(80,200,120,0.3)] transition-all placeholder:text-[#6e7681]"
                    />
                </div>

                {/* Apps Section */}
                <section className="mb-8">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <span className="w-1 h-6 bg-emerald rounded"></span>
                        {t['apps-title']}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredApps.map((app) => (
                            <Link
                                key={app.id}
                                href={app.href}
                                className="block bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-[rgba(80,200,120,0.2)] rounded-2xl p-6 transition-all hover:-translate-y-1 hover:border-emerald hover:shadow-[0_8px_32px_rgba(0,0,0,0.4),0_0_40px_rgba(80,200,120,0.15)] no-underline"
                            >
                                <div className="w-14 h-14 bg-gradient-to-br from-emerald to-emerald-dark rounded-xl flex items-center justify-center text-2xl mb-4">
                                    {app.icon}
                                </div>
                                <h3 className="text-xl font-semibold text-white mb-2">{app.name[lang]}</h3>
                                <p className="text-sm text-[#8b949e] leading-relaxed">{t[app.descKey]}</p>
                            </Link>
                        ))}
                    </div>
                    {filteredApps.length === 0 && (
                        <div className="text-center text-[#6e7681] py-12 text-lg">
                            {t['no-results']}
                        </div>
                    )}
                </section>

                {/* Ad Placeholder (inline) */}
                <div className="bg-gradient-to-br from-[#161b22] to-[#21262d] border border-dashed border-[rgba(80,200,120,0.2)] rounded-xl p-4 text-center text-[#6e7681] text-sm my-8">
                    {t['ad-text']} (300x250)
                </div>

                {/* Update Log Section */}
                <section className="bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-[rgba(80,200,120,0.2)] rounded-2xl p-8 my-8">
                    <h2 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                        <span className="w-1 h-6 bg-emerald rounded"></span>
                        {t['update-title']}
                    </h2>
                    <ul className="list-none">
                        {updates.map((update, idx) => (
                            <li key={idx} className="flex gap-4 py-4 border-b border-[#21262d] last:border-b-0">
                                <span className="text-emerald font-medium text-sm min-w-[100px]">{update.date}</span>
                                <span className="text-[#8b949e] text-sm">{t[update.key]}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>

            {/* Ad Placeholder (before footer) */}
            <div className="max-w-[728px] mx-auto my-6 px-4">
                <div className="bg-gradient-to-br from-[#161b22] to-[#21262d] border border-dashed border-[rgba(80,200,120,0.2)] rounded-xl p-4 text-center text-[#6e7681] text-sm min-h-[90px] flex items-center justify-center">
                    {t['ad-text']} (728x90)
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[#161b22] border-t border-[rgba(80,200,120,0.2)] py-8 mt-12">
                <div className="max-w-[1200px] mx-auto text-center">
                    <div className="flex justify-center gap-8 mb-6 flex-wrap">
                        <button onClick={() => openModal('privacy')} className="text-[#8b949e] text-sm hover:text-emerald transition-colors cursor-pointer bg-transparent border-none">
                            {t['footer-privacy']}
                        </button>
                        <button onClick={() => openModal('contact')} className="text-[#8b949e] text-sm hover:text-emerald transition-colors cursor-pointer bg-transparent border-none">
                            {t['footer-contact']}
                        </button>
                        <button onClick={() => openModal('disclaimer')} className="text-[#8b949e] text-sm hover:text-emerald transition-colors cursor-pointer bg-transparent border-none">
                            {t['footer-disclaimer']}
                        </button>
                    </div>
                    <p className="text-[#6e7681] text-xs">© 2026 Saison Lab. All rights reserved.</p>
                </div>
            </footer>

            {/* Privacy Modal */}
            {activeModal === 'privacy' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-[1000] p-4" onClick={closeModal}>
                    <div className="bg-[#161b22] border border-[rgba(80,200,120,0.2)] rounded-2xl max-w-[600px] w-full max-h-[80vh] overflow-y-auto p-8 relative animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className="absolute top-4 right-4 w-9 h-9 bg-[#21262d] border-none rounded-full text-[#8b949e] text-xl cursor-pointer flex items-center justify-center hover:bg-emerald hover:text-[#0d1117] transition-all">✕</button>
                        <h2 className="text-2xl font-semibold text-emerald mb-6">{t['privacy-title']}</h2>
                        <div className="text-[#8b949e] leading-relaxed">
                            <p className="mb-4">{t['privacy-intro']}</p>
                            <h3 className="text-white text-lg mt-6 mb-3">{t['privacy-h1']}</h3>
                            <p className="mb-4">{t['privacy-p1']}</p>
                            <h3 className="text-white text-lg mt-6 mb-3">{t['privacy-h2']}</h3>
                            <p className="mb-4">{t['privacy-p2']}</p>
                            <h3 className="text-white text-lg mt-6 mb-3">{t['privacy-h3']}</h3>
                            <p className="mb-4">{t['privacy-p3']}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Contact Modal */}
            {activeModal === 'contact' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-[1000] p-4" onClick={closeModal}>
                    <div className="bg-[#161b22] border border-[rgba(80,200,120,0.2)] rounded-2xl max-w-[600px] w-full max-h-[80vh] overflow-y-auto p-8 relative animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className="absolute top-4 right-4 w-9 h-9 bg-[#21262d] border-none rounded-full text-[#8b949e] text-xl cursor-pointer flex items-center justify-center hover:bg-emerald hover:text-[#0d1117] transition-all">✕</button>
                        <h2 className="text-2xl font-semibold text-emerald mb-6">{t['contact-title']}</h2>
                        <div className="text-[#8b949e] leading-relaxed">
                            <p className="mb-4">{t['contact-intro']}</p>
                            <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                                <div className="flex flex-col gap-2">
                                    <label className="text-white text-sm font-medium">{t['contact-name']}</label>
                                    <input type="text" required placeholder={t['contact-name-placeholder']} className="p-3 bg-[#21262d] border border-[rgba(80,200,120,0.2)] rounded-lg text-white focus:outline-none focus:border-emerald" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-white text-sm font-medium">{t['contact-email']}</label>
                                    <input type="email" required placeholder={t['contact-email-placeholder']} className="p-3 bg-[#21262d] border border-[rgba(80,200,120,0.2)] rounded-lg text-white focus:outline-none focus:border-emerald" />
                                </div>
                                <div className="flex flex-col gap-2">
                                    <label className="text-white text-sm font-medium">{t['contact-message']}</label>
                                    <textarea required placeholder={t['contact-message-placeholder']} rows={4} className="p-3 bg-[#21262d] border border-[rgba(80,200,120,0.2)] rounded-lg text-white resize-y min-h-[120px] focus:outline-none focus:border-emerald" />
                                </div>
                                <button type="submit" className="py-4 px-8 bg-gradient-to-br from-emerald to-emerald-dark border-none rounded-lg text-[#0d1117] font-semibold cursor-pointer transition-all hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(80,200,120,0.3)]">
                                    {t['contact-submit']}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Disclaimer Modal */}
            {activeModal === 'disclaimer' && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur flex items-center justify-center z-[1000] p-4" onClick={closeModal}>
                    <div className="bg-[#161b22] border border-[rgba(80,200,120,0.2)] rounded-2xl max-w-[600px] w-full max-h-[80vh] overflow-y-auto p-8 relative animate-fadeIn" onClick={(e) => e.stopPropagation()}>
                        <button onClick={closeModal} className="absolute top-4 right-4 w-9 h-9 bg-[#21262d] border-none rounded-full text-[#8b949e] text-xl cursor-pointer flex items-center justify-center hover:bg-emerald hover:text-[#0d1117] transition-all">✕</button>
                        <h2 className="text-2xl font-semibold text-emerald mb-6">{t['disclaimer-title']}</h2>
                        <div className="text-[#8b949e] leading-relaxed">
                            <p className="mb-4">{t['disclaimer-intro']}</p>
                            <h3 className="text-white text-lg mt-6 mb-3">{t['disclaimer-h1']}</h3>
                            <p className="mb-4">{t['disclaimer-p1']}</p>
                            <h3 className="text-white text-lg mt-6 mb-3">{t['disclaimer-h2']}</h3>
                            <p className="mb-4">{t['disclaimer-p2']}</p>
                            <h3 className="text-white text-lg mt-6 mb-3">{t['disclaimer-h3']}</h3>
                            <p className="mb-4">{t['disclaimer-p3']}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
