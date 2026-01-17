/**
 * RANKING LAB - Type Definitions
 * 
 * すべてのランキングデータに「基準日」と「情報源」を紐付ける
 * メタデータ分離型アーキテクチャ
 */

// ============================================================
// ランキングメタデータ
// ============================================================
export interface RankingMeta {
    id: string;
    title: { jp: string; en: string };
    description: { jp: string; en: string };
    asOfDate: string;           // データ基準日 "2024-12-31"
    source: {
        name: string;           // "IMF", "World Bank", etc.
        url: string;            // 外部リンク
        accessedAt: string;     // データ取得日
    };
    unit: { jp: string; en: string };
    lastUpdated: string;        // システム更新日
}

// ============================================================
// ランキングエントリ
// ============================================================
export interface RankingEntry {
    rank: number;
    country: {
        jp: string;
        en: string;
        code: string;           // ISO 3166-1 alpha-2
        flag?: string;          // 絵文字フラグ（optional）
    };
    value: number;
    change?: number;            // 前回比較（optional）
}

// ============================================================
// ランキングデータ（メタ + エントリ）
// ============================================================
export interface RankingData {
    meta: RankingMeta;
    entries: RankingEntry[];
}

// ============================================================
// カテゴリ定義
// ============================================================
export interface Category {
    id: string;
    name: { jp: string; en: string };
    icon: string;
    color: string;
    image: string;              // 背景画像パス (e.g., "/ranking-lab/images/economy.png")
    rankings: string[];         // 含まれるランキングID
}

// ============================================================
// データ鮮度ステータス
// ============================================================
export type DataStatus = 'latest' | 'awaiting' | 'historical';

export function getDataStatus(asOfDate: string): DataStatus {
    const now = new Date();
    const dataDate = new Date(asOfDate);
    const diffYears = (now.getTime() - dataDate.getTime()) / (1000 * 60 * 60 * 24 * 365);

    if (diffYears <= 1) return 'latest';
    if (diffYears <= 2) return 'awaiting';
    return 'historical';
}

// ============================================================
// ステータスラベル
// ============================================================
export const statusLabels: Record<DataStatus, { jp: string; en: string; color: string }> = {
    latest: { jp: '最新', en: 'Latest', color: '#10B981' },
    awaiting: { jp: '更新待ち', en: 'Awaiting Update', color: '#F59E0B' },
    historical: { jp: '過去データ', en: 'Historical', color: '#6B7280' },
};
