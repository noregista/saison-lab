// KANJI LAB - 漢字検索カスタムフック
// 意図: 検索ロジックをUIから分離し、再利用可能なフックとして提供

import { useState, useCallback, useDeferredValue, useEffect } from 'react';
import { KanjiDetail, SearchFilters, ApiState } from '../types/kanji';
import {
    getKanjiDetail,
    searchByReading,
    getMultipleKanjiDetails,
    getKanjiByJlpt,
    getKanjiByGrade,
    getAllJoyoKanji,
    isKanji,
    isHiragana,
    isKatakana,
    katakanaToHiragana,
} from '../utils/kanjiApi';

interface UseKanjiSearchResult {
    results: KanjiDetail[];
    isLoading: boolean;
    error: string | null;
    filters: SearchFilters;
    setFilters: (filters: Partial<SearchFilters>) => void;
    clearFilters: () => void;
}

const DEFAULT_FILTERS: SearchFilters = {
    query: '',
    strokeCount: null,
    radical: null,
    jlptLevel: null,
    grade: null,
};

/**
 * 漢字検索フック
 * 意図: 複数の検索条件を組み合わせて漢字を検索し、結果を返す
 */
export function useKanjiSearch(): UseKanjiSearchResult {
    const [filters, setFiltersState] = useState<SearchFilters>(DEFAULT_FILTERS);
    const [results, setResults] = useState<KanjiDetail[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // 意図: パフォーマンス最適化のため、検索クエリをディファード
    const deferredQuery = useDeferredValue(filters.query);

    const setFilters = useCallback((newFilters: Partial<SearchFilters>) => {
        setFiltersState(prev => ({ ...prev, ...newFilters }));
    }, []);

    const clearFilters = useCallback(() => {
        setFiltersState(DEFAULT_FILTERS);
        setResults([]);
        setError(null);
    }, []);

    // 意図: フィルター変更時に検索を実行
    useEffect(() => {
        const search = async () => {
            // 何も入力されていなければ結果をクリア
            if (!deferredQuery && !filters.jlptLevel && !filters.grade) {
                setResults([]);
                return;
            }

            setIsLoading(true);
            setError(null);

            try {
                let kanjiList: string[] = [];

                // JLPTレベルまたは学年でフィルター
                if (filters.jlptLevel) {
                    kanjiList = await getKanjiByJlpt(filters.jlptLevel);
                } else if (filters.grade) {
                    kanjiList = await getKanjiByGrade(filters.grade);
                } else if (deferredQuery) {
                    const firstChar = deferredQuery[0];

                    // 意図: 入力タイプに応じて適切なAPI呼び出しを選択
                    if (isKanji(firstChar)) {
                        // 漢字が入力された場合、その漢字を直接検索
                        const details = await Promise.all(
                            deferredQuery.split('').filter(isKanji).map(char =>
                                getKanjiDetail(char).catch(() => null)
                            )
                        );
                        kanjiList = details.filter((d): d is KanjiDetail => d !== null).map(d => d.kanji);
                    } else if (isHiragana(firstChar) || isKatakana(firstChar)) {
                        // ひらがな/カタカナが入力された場合、読みで検索
                        const reading = katakanaToHiragana(deferredQuery);
                        try {
                            const readingResult = await searchByReading(reading);
                            kanjiList = [...readingResult.main_kanji, ...readingResult.name_kanji];
                        } catch {
                            // 読みが見つからない場合は空の結果
                            kanjiList = [];
                        }
                    }
                }

                // 漢字がない場合は結果をクリア
                if (kanjiList.length === 0) {
                    setResults([]);
                    setIsLoading(false);
                    return;
                }

                // 漢字詳細を取得
                const details = await getMultipleKanjiDetails(kanjiList.slice(0, 50)); // 最大50件

                // 追加のフィルタリング
                let filteredResults = details;

                // 画数でフィルター
                if (filters.strokeCount !== null) {
                    filteredResults = filteredResults.filter(k => k.stroke_count === filters.strokeCount);
                }

                setResults(filteredResults);
            } catch (err) {
                setError(err instanceof Error ? err.message : '検索中にエラーが発生しました');
                setResults([]);
            } finally {
                setIsLoading(false);
            }
        };

        // 意図: 高速タイピング時のAPI呼び出しを抑制するデバウンス
        const timeoutId = setTimeout(search, 300);
        return () => clearTimeout(timeoutId);
    }, [deferredQuery, filters.strokeCount, filters.jlptLevel, filters.grade]);

    return {
        results,
        isLoading,
        error,
        filters,
        setFilters,
        clearFilters,
    };
}

/**
 * 漢字詳細取得フック
 * 意図: 単一の漢字の詳細情報を取得
 */
export function useKanjiDetail(kanji: string | null): ApiState<KanjiDetail> {
    const [state, setState] = useState<ApiState<KanjiDetail>>({
        data: null,
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        if (!kanji) {
            setState({ data: null, isLoading: false, error: null });
            return;
        }

        const fetchDetail = async () => {
            setState({ data: null, isLoading: true, error: null });
            try {
                const detail = await getKanjiDetail(kanji);
                setState({ data: detail, isLoading: false, error: null });
            } catch (err) {
                setState({
                    data: null,
                    isLoading: false,
                    error: err instanceof Error ? err.message : '詳細の取得に失敗しました',
                });
            }
        };

        fetchDetail();
    }, [kanji]);

    return state;
}
