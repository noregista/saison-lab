/**
 * SUSHI LAB - 多言語対応ユーティリティ (i18n)
 * 
 * 【機能】
 * 日本語/英語の切り替えを管理
 * data-i18n属性を持つ要素のテキストを自動更新
 */

// 翻訳データ
// Translation data for UI elements
const translations = {
    ja: {
        // ナビゲーション
        'nav.encyclopedia': '寿司図鑑',
        'nav.manners': 'マナー',
        'nav.phrases': 'フレーズ',

        // ヒーローセクション
        'hero.title': '日本の寿司を<br>完全攻略',
        'hero.subtitle': '寿司の種類、マナー、注文方法をマスターして<br>最高の寿司体験を',
        'hero.cta.encyclopedia': '寿司図鑑を見る',
        'hero.cta.phrases': '注文フレーズ',

        // 寿司図鑑セクション
        'encyclopedia.title': '寿司図鑑',
        'encyclopedia.subtitle': '定番から高級ネタまで、寿司の世界を探索',
        'encyclopedia.empty': '条件に合う寿司が見つかりませんでした',
        'encyclopedia.empty.desc': 'フィルター条件を変更してみてください',

        // フィルター
        'filter.category': 'カテゴリ',
        'filter.taste': '味わい',
        'filter.all': 'すべて',
        'filter.akami': '赤身',
        'filter.shiromi': '白身',
        'filter.hikarimono': '光物',
        'filter.ebi-kani': '海老・蟹',
        'filter.ika-tako': 'イカ・タコ',
        'filter.kai': '貝類',
        'filter.gunkan': '軍艦',
        'filter.tamago': '玉子・他',

        // 味覚
        'taste.fatty': '脂のり',
        'taste.light': 'さっぱり',
        'taste.sweet': '甘み',

        // マナーセクション
        'manners.title': '寿司マナーガイド',
        'manners.subtitle': '日本の寿司屋で恥をかかない、正しい作法',

        // フレーズセクション
        'phrases.title': '指差しフレーズ集',
        'phrases.subtitle': 'すぐに使える注文フレーズ。音声付きで発音もバッチリ',
        'phrases.cat.order': '注文',
        'phrases.cat.confirm': '確認',
        'phrases.cat.request': 'お願い',
        'phrases.cat.thanks': '感謝',
        'phrases.speak': '🔊 再生',
        'phrases.speaking': '再生中...',

        // 寿司詳細
        'sushi.season': '旬',
        'sushi.price': '価格帯',
        'sushi.season.spring': '春',
        'sushi.season.summer': '夏',
        'sushi.season.autumn': '秋',
        'sushi.season.winter': '冬',
        'sushi.season.all': '通年',
        'sushi.price.affordable': 'お手頃',
        'sushi.price.moderate': '標準',
        'sushi.price.expensive': '高級',
        'sushi.price.premium': '最高級',

        // マナーチップ
        'manner.do': 'Do',
        'manner.dont': "Don't",

        // フッター
        'footer.tagline': 'by Saison Lab',
        'footer.privacy': 'プライバシーポリシー',
        'footer.disclaimer': '免責事項',
        'footer.contact': 'お問い合わせ',

        // トースト通知
        'toast.speech.unsupported': '音声機能は非対応のブラウザです',
        'toast.speech.error': '音声再生に失敗しました',
        'toast.copied': 'クリップボードにコピーしました'
    },

    en: {
        // Navigation
        'nav.encyclopedia': 'Sushi Guide',
        'nav.manners': 'Etiquette',
        'nav.phrases': 'Phrases',

        // Hero Section
        'hero.title': 'Master<br>Japanese Sushi',
        'hero.subtitle': 'Learn sushi types, etiquette, and ordering<br>for the ultimate sushi experience',
        'hero.cta.encyclopedia': 'Explore Sushi',
        'hero.cta.phrases': 'Order Phrases',

        // Encyclopedia Section
        'encyclopedia.title': 'Sushi Encyclopedia',
        'encyclopedia.subtitle': 'Explore the world of sushi, from classics to premium',
        'encyclopedia.empty': 'No sushi found matching your criteria',
        'encyclopedia.empty.desc': 'Try adjusting your filter settings',

        // Filters
        'filter.category': 'Category',
        'filter.taste': 'Taste',
        'filter.all': 'All',
        'filter.akami': 'Red Fish',
        'filter.shiromi': 'White Fish',
        'filter.hikarimono': 'Silver',
        'filter.ebi-kani': 'Shrimp/Crab',
        'filter.ika-tako': 'Squid/Octopus',
        'filter.kai': 'Shellfish',
        'filter.gunkan': 'Gunkan',
        'filter.tamago': 'Egg/Other',

        // Taste
        'taste.fatty': 'Fatty',
        'taste.light': 'Light',
        'taste.sweet': 'Sweet',

        // Manners Section
        'manners.title': 'Sushi Etiquette Guide',
        'manners.subtitle': 'Proper manners for an authentic sushi experience',

        // Phrases Section
        'phrases.title': 'Point & Order Phrases',
        'phrases.subtitle': 'Ready-to-use ordering phrases with audio pronunciation',
        'phrases.cat.order': 'Order',
        'phrases.cat.confirm': 'Confirm',
        'phrases.cat.request': 'Request',
        'phrases.cat.thanks': 'Thanks',
        'phrases.speak': '🔊 Play',
        'phrases.speaking': 'Playing...',

        // Sushi Detail
        'sushi.season': 'Season',
        'sushi.price': 'Price',
        'sushi.season.spring': 'Spring',
        'sushi.season.summer': 'Summer',
        'sushi.season.autumn': 'Autumn',
        'sushi.season.winter': 'Winter',
        'sushi.season.all': 'Year-round',
        'sushi.price.affordable': 'Affordable',
        'sushi.price.moderate': 'Moderate',
        'sushi.price.expensive': 'Expensive',
        'sushi.price.premium': 'Premium',

        // Manner Tips
        'manner.do': 'Do',
        'manner.dont': "Don't",

        // Footer
        'footer.tagline': 'by Saison Lab',
        'footer.privacy': 'Privacy Policy',
        'footer.disclaimer': 'Disclaimer',
        'footer.contact': 'Contact',

        // Toast Notifications
        'toast.speech.unsupported': 'Speech is not supported in this browser',
        'toast.speech.error': 'Failed to play audio',
        'toast.copied': 'Copied to clipboard'
    }
};

// 現在の言語
// Current language state
let currentLang = 'ja';

/**
 * 現在の言語を取得
 * Get current language
 */
export function getCurrentLang() {
    return currentLang;
}

/**
 * 言語を設定
 * Set language
 */
export function setLang(lang) {
    if (lang !== 'ja' && lang !== 'en') return;
    currentLang = lang;
    document.body.setAttribute('data-lang', lang);

    // URLパラメータを更新（履歴を追加せずに）
    // Update URL parameter without adding to history
    const url = new URL(window.location);
    if (lang === 'en') {
        url.searchParams.set('lang', 'en');
    } else {
        url.searchParams.delete('lang');
    }
    window.history.replaceState({}, '', url);

    // LocalStorageに保存
    // Save to localStorage
    localStorage.setItem('sushi-lab-lang', lang);
}

/**
 * 言語を切り替え
 * Toggle language
 */
export function toggleLang() {
    setLang(currentLang === 'ja' ? 'en' : 'ja');
    return currentLang;
}

/**
 * 翻訳テキストを取得
 * Get translated text
 */
export function t(key, lang = currentLang) {
    return translations[lang]?.[key] || translations['ja']?.[key] || key;
}

/**
 * data-i18n属性を持つ全要素を更新
 * Update all elements with data-i18n attribute
 */
export function updateAllTranslations() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(el => {
        const key = el.getAttribute('data-i18n');
        const translation = t(key);

        // HTMLを含む場合はinnerHTMLで設定
        // Use innerHTML if translation contains HTML
        if (translation.includes('<br>') || translation.includes('<')) {
            el.innerHTML = translation;
        } else {
            el.textContent = translation;
        }
    });
}

/**
 * 初期言語を決定
 * Determine initial language
 */
export function initLang() {
    // 1. URLパラメータを確認
    // 1. Check URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const urlLang = urlParams.get('lang');
    if (urlLang === 'en' || urlLang === 'ja') {
        setLang(urlLang);
        return currentLang;
    }

    // 2. LocalStorageを確認
    // 2. Check localStorage
    const savedLang = localStorage.getItem('sushi-lab-lang');
    if (savedLang === 'en' || savedLang === 'ja') {
        setLang(savedLang);
        return currentLang;
    }

    // 3. ブラウザの言語設定を確認
    // 3. Check browser language
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang && browserLang.startsWith('ja')) {
        setLang('ja');
    } else {
        // 外国人向けなのでデフォルトは日本語（日本にいる前提）
        // Default to Japanese (assuming user is in Japan)
        setLang('ja');
    }

    return currentLang;
}

export default { t, getCurrentLang, setLang, toggleLang, updateAllTranslations, initLang };
