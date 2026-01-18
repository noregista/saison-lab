/**
 * インタラクション管理フック
 * 
 * マウス/タッチイベントを統一的に管理し、
 * パーティクル発生やオーディオトリガーのためのコールバックを提供。
 */

import { useCallback, useRef, useEffect, useState } from 'react';

// ============================================================
// 型定義
// ============================================================
export interface InteractionPoint {
    x: number;
    y: number;
    normX: number;  // 正規化座標（0-1）
    normY: number;
    deltaX: number; // 前フレームからの移動量
    deltaY: number;
    isActive: boolean;
    timestamp: number;
}

export interface InteractionCallbacks {
    onStart?: (point: InteractionPoint) => void;
    onMove?: (point: InteractionPoint) => void;
    onEnd?: (point: InteractionPoint) => void;
}

// ============================================================
// useInteractionフック
// ============================================================
export function useInteraction(
    containerRef: React.RefObject<HTMLElement>,
    callbacks: InteractionCallbacks
) {
    const [isInteracting, setIsInteracting] = useState(false);
    const lastPointRef = useRef<{ x: number; y: number } | null>(null);

    // ポイントを正規化座標に変換
    const normalizePoint = useCallback(
        (clientX: number, clientY: number): InteractionPoint => {
            const container = containerRef.current;
            if (!container) {
                return {
                    x: clientX,
                    y: clientY,
                    normX: 0,
                    normY: 0,
                    deltaX: 0,
                    deltaY: 0,
                    isActive: false,
                    timestamp: Date.now(),
                };
            }

            const rect = container.getBoundingClientRect();
            const x = clientX - rect.left;
            const y = clientY - rect.top;
            const normX = x / rect.width;
            const normY = y / rect.height;

            // 前フレームからの移動量を計算
            const lastPoint = lastPointRef.current;
            const deltaX = lastPoint ? x - lastPoint.x : 0;
            const deltaY = lastPoint ? y - lastPoint.y : 0;

            lastPointRef.current = { x, y };

            return {
                x,
                y,
                normX,
                normY,
                deltaX,
                deltaY,
                isActive: true,
                timestamp: Date.now(),
            };
        },
        [containerRef]
    );

    // マウスイベントハンドラー
    const handleMouseDown = useCallback(
        (e: MouseEvent) => {
            setIsInteracting(true);
            const point = normalizePoint(e.clientX, e.clientY);
            callbacks.onStart?.(point);
        },
        [normalizePoint, callbacks]
    );

    const handleMouseMove = useCallback(
        (e: MouseEvent) => {
            const point = normalizePoint(e.clientX, e.clientY);
            point.isActive = isInteracting;
            callbacks.onMove?.(point);
        },
        [normalizePoint, callbacks, isInteracting]
    );

    const handleMouseUp = useCallback(
        (e: MouseEvent) => {
            setIsInteracting(false);
            lastPointRef.current = null;
            const point = normalizePoint(e.clientX, e.clientY);
            point.isActive = false;
            callbacks.onEnd?.(point);
        },
        [normalizePoint, callbacks]
    );

    const handleMouseLeave = useCallback(
        (e: MouseEvent) => {
            if (isInteracting) {
                setIsInteracting(false);
                lastPointRef.current = null;
                const point = normalizePoint(e.clientX, e.clientY);
                point.isActive = false;
                callbacks.onEnd?.(point);
            }
        },
        [normalizePoint, callbacks, isInteracting]
    );

    // タッチイベントハンドラー
    const handleTouchStart = useCallback(
        (e: TouchEvent) => {
            e.preventDefault();
            setIsInteracting(true);
            const touch = e.touches[0];
            const point = normalizePoint(touch.clientX, touch.clientY);
            callbacks.onStart?.(point);
        },
        [normalizePoint, callbacks]
    );

    const handleTouchMove = useCallback(
        (e: TouchEvent) => {
            e.preventDefault();
            const touch = e.touches[0];
            const point = normalizePoint(touch.clientX, touch.clientY);
            callbacks.onMove?.(point);
        },
        [normalizePoint, callbacks]
    );

    const handleTouchEnd = useCallback(
        (e: TouchEvent) => {
            e.preventDefault();
            setIsInteracting(false);
            lastPointRef.current = null;

            // タッチ終了時は最後のポイントがないので、
            // changedTouchesを使用
            const touch = e.changedTouches[0];
            if (touch) {
                const point = normalizePoint(touch.clientX, touch.clientY);
                point.isActive = false;
                callbacks.onEnd?.(point);
            }
        },
        [normalizePoint, callbacks]
    );

    // イベントリスナーの登録
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // パッシブfalseでタッチイベントを登録（preventDefault用）
        const options: AddEventListenerOptions = { passive: false };

        container.addEventListener('mousedown', handleMouseDown);
        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('mouseup', handleMouseUp);
        container.addEventListener('mouseleave', handleMouseLeave);
        container.addEventListener('touchstart', handleTouchStart, options);
        container.addEventListener('touchmove', handleTouchMove, options);
        container.addEventListener('touchend', handleTouchEnd, options);
        container.addEventListener('touchcancel', handleTouchEnd, options);

        return () => {
            container.removeEventListener('mousedown', handleMouseDown);
            container.removeEventListener('mousemove', handleMouseMove);
            container.removeEventListener('mouseup', handleMouseUp);
            container.removeEventListener('mouseleave', handleMouseLeave);
            container.removeEventListener('touchstart', handleTouchStart);
            container.removeEventListener('touchmove', handleTouchMove);
            container.removeEventListener('touchend', handleTouchEnd);
            container.removeEventListener('touchcancel', handleTouchEnd);
        };
    }, [
        containerRef,
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleMouseLeave,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
    ]);

    return { isInteracting };
}
