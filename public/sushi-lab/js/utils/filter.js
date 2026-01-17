/**
 * SUSHI LAB - フィルタリングユーティリティ
 * 
 * 【機能】
 * 寿司ネタのカテゴリ・味覚によるフィルタリングロジック
 */

import { sushiData } from '../data/sushi.js';

/**
 * カテゴリでフィルタリング
 * Filter sushi by category
 * @param {Array} data - 寿司データ配列
 * @param {string} category - カテゴリID ('all' で全件)
 * @returns {Array} フィルタリング結果
 */
export function filterByCategory(data, category) {
    if (!category || category === 'all') {
        return data;
    }
    return data.filter(sushi => sushi.category === category);
}

/**
 * 味覚属性でフィルタリング
 * Filter sushi by taste attributes
 * @param {Array} data - 寿司データ配列
 * @param {Object} tasteFilters - { fatty: number, light: number, sweet: number }
 * @returns {Array} フィルタリング結果
 */
export function filterByTaste(data, tasteFilters) {
    // すべてのフィルターが0の場合はフィルタリングしない
    // If all filters are 0, don't filter
    const hasFilter = tasteFilters.fatty > 0 || tasteFilters.light > 0 || tasteFilters.sweet > 0;
    if (!hasFilter) {
        return data;
    }

    return data.filter(sushi => {
        // 各味覚属性を確認（0の場合はスキップ）
        // Check each taste attribute (skip if 0)
        if (tasteFilters.fatty > 0 && sushi.taste.fatty < tasteFilters.fatty) {
            return false;
        }
        if (tasteFilters.light > 0 && sushi.taste.light < tasteFilters.light) {
            return false;
        }
        if (tasteFilters.sweet > 0 && sushi.taste.sweet < tasteFilters.sweet) {
            return false;
        }
        return true;
    });
}

/**
 * 複合フィルタリング（カテゴリ + 味覚）
 * Combined filtering (category + taste)
 * @param {string} category - カテゴリID
 * @param {Object} tasteFilters - 味覚フィルター
 * @param {Array} data - オプション: カスタムデータ配列
 * @returns {Array} フィルタリング結果
 */
export function filterSushi(category, tasteFilters, data = sushiData) {
    let result = filterByCategory(data, category);
    result = filterByTaste(result, tasteFilters);
    return result;
}

/**
 * フィルター状態の初期値を取得
 * Get initial filter state
 * @returns {Object} 初期フィルター状態
 */
export function getInitialFilterState() {
    return {
        category: 'all',
        taste: {
            fatty: 0,
            light: 0,
            sweet: 0
        }
    };
}

/**
 * フィルター結果のサマリを取得
 * Get filter result summary
 * @param {Array} results - フィルター結果
 * @param {Array} total - 全データ
 * @returns {Object} サマリ情報
 */
export function getFilterSummary(results, total = sushiData) {
    return {
        count: results.length,
        total: total.length,
        isEmpty: results.length === 0
    };
}

export default { filterByCategory, filterByTaste, filterSushi, getInitialFilterState, getFilterSummary };
