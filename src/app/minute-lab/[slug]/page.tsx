// MINUTE LAB - 記事詳細ページ（Server Component）
// 意図: generateStaticParamsで静的生成し、クライアントコンポーネントを呼び出し

import { notFound } from 'next/navigation';
import { articles, getArticleBySlug } from '../data/articles';
import ArticleClient from '../components/ArticleClient';

// 意図: 静的パラメータ生成（output: exportに必要）
export function generateStaticParams() {
    return articles.map((article) => ({
        slug: article.slug,
    }));
}

interface Props {
    params: { slug: string };
}

export default function ArticleDetailPage({ params }: Props) {
    const article = getArticleBySlug(params.slug);

    // 意図: 記事が見つからない場合は404
    if (!article) {
        notFound();
    }

    return <ArticleClient article={article} />;
}
