// MINUTE LAB - 型定義
// 意図: 1分解説記事の型安全性を確保

// 意図: 多言語テキスト
export interface LocalizedText {
    jp: string;
    en: string;
}

// 意図: 言語キー
export type Language = 'jp' | 'en';

// 意図: 5カテゴリ
export type Category = 'history' | 'science' | 'culture' | 'economy' | 'philosophy';

// 意図: カテゴリ情報
export interface CategoryInfo {
    id: Category;
    name: LocalizedText;
    icon: string;
    color: string;
}

// 意図: 記事データ
export interface Article {
    id: string;
    slug: string;
    category: Category;
    title: LocalizedText;
    subtitle: LocalizedText;
    summary: LocalizedText[];
    body: LocalizedText;
    image: string;
    readTimeSeconds: number;
    keywords: string[];
    publishedAt: string;
}

// 意図: UI翻訳
export interface Translations {
    title: string;
    subtitle: string;
    description: string;
    allCategories: string;
    categoryHistory: string;
    categoryScience: string;
    categoryCulture: string;
    categoryEconomy: string;
    categoryPhilosophy: string;
    readTime: string;
    minute: string;
    completed: string;
    readMore: string;
    back: string;
    summaryTitle: string;
    shareText: string;
    nextArticle: string;
    readingProgress: string;
    adText: string;
    noArticles: string;
}

// 意図: カテゴリ定義
export const categories: CategoryInfo[] = [
    { id: 'history', name: { jp: '歴史', en: 'History' }, icon: '📜', color: '#B45309' },
    { id: 'science', name: { jp: '科学', en: 'Science' }, icon: '🔬', color: '#0284C7' },
    { id: 'culture', name: { jp: '文化', en: 'Culture' }, icon: '🎨', color: '#7C3AED' },
    { id: 'economy', name: { jp: '経済', en: 'Economy' }, icon: '💹', color: '#059669' },
    { id: 'philosophy', name: { jp: '哲学', en: 'Philosophy' }, icon: '🧠', color: '#DC2626' },
];

// 意図: カテゴリ情報を取得
export const getCategoryInfo = (category: Category): CategoryInfo => {
    return categories.find(c => c.id === category) || categories[0];
};

// 意図: UI翻訳データ
export const translations: Record<Language, Translations> = {
    jp: {
        title: 'MINUTE LAB',
        subtitle: '1分解説図鑑',
        description: '歴史・科学・文化・経済・哲学。知識を1分で。',
        allCategories: 'すべて',
        categoryHistory: '歴史',
        categoryScience: '科学',
        categoryCulture: '文化',
        categoryEconomy: '経済',
        categoryPhilosophy: '哲学',
        readTime: '読了時間',
        minute: '分',
        completed: '読了！',
        readMore: '読む',
        back: '← 一覧へ戻る',
        summaryTitle: '📌 3行でわかる要約',
        shareText: 'シェア',
        nextArticle: '次の記事→',
        readingProgress: '読了進捗',
        adText: '広告スペース',
        noArticles: '記事が見つかりません',
    },
    en: {
        title: 'MINUTE LAB',
        subtitle: '1-Minute Encyclopedia',
        description: 'History, Science, Culture, Economy, Philosophy. Knowledge in 1 minute.',
        allCategories: 'All',
        categoryHistory: 'History',
        categoryScience: 'Science',
        categoryCulture: 'Culture',
        categoryEconomy: 'Economy',
        categoryPhilosophy: 'Philosophy',
        readTime: 'Read time',
        minute: 'min',
        completed: 'Completed!',
        readMore: 'Read',
        back: '← Back to list',
        summaryTitle: '📌 Summary in 3 points',
        shareText: 'Share',
        nextArticle: 'Next →',
        readingProgress: 'Reading progress',
        adText: 'Advertisement',
        noArticles: 'No articles found',
    },
};
