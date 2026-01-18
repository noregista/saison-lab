'use client';

import { useEffect, useRef } from 'react';

/**
 * 魔法モーダルコンポーネント
 * 
 * 意図: 羊皮紙風デザインのモーダルウィンドウ
 * 特徴:
 * - 巻物が広がるような展開アニメーション
 * - 蝋印（ワックスシール）風の閉じるボタン
 * - クリックまたはEscapeで閉じる
 */

interface MagicModalProps {
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

export default function MagicModal({ onClose, title, children }: MagicModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);

    // モーダルが開いたらフォーカス
    useEffect(() => {
        modalRef.current?.focus();
    }, []);

    // 背景クリックで閉じる
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0, 0, 0, 0.85)',
                backdropFilter: 'blur(5px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: '2rem',
                animation: 'modalFadeIn 0.3s ease',
            }}
        >
            {/* モーダル本体（羊皮紙風） */}
            <div
                ref={modalRef}
                tabIndex={-1}
                style={{
                    background: `
            linear-gradient(135deg, #f5ebd8 0%, #e8d5b7 50%, #d4c19a 100%)
          `,
                    borderRadius: '1rem',
                    padding: '2.5rem',
                    maxWidth: '600px',
                    width: '100%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    position: 'relative',
                    boxShadow: `
            0 20px 60px rgba(0, 0, 0, 0.6),
            inset 0 2px 10px rgba(255, 255, 255, 0.3),
            inset 0 -2px 10px rgba(0, 0, 0, 0.1)
          `,
                    animation: 'modalSlideIn 0.4s ease',
                    // 羊皮紙のテクスチャ効果（CSS）
                    backgroundImage: `
            linear-gradient(135deg, #f5ebd8 0%, #e8d5b7 50%, #d4c19a 100%),
            url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")
          `,
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                {/* 金の装飾ボーダー */}
                <div style={{
                    position: 'absolute',
                    inset: '8px',
                    border: '2px solid #c9a227',
                    borderRadius: '0.75rem',
                    pointerEvents: 'none',
                }} />

                {/* コーナー装飾 */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((corner) => (
                    <div
                        key={corner}
                        style={{
                            position: 'absolute',
                            [corner.includes('top') ? 'top' : 'bottom']: '4px',
                            [corner.includes('left') ? 'left' : 'right']: '4px',
                            width: '20px',
                            height: '20px',
                            borderTop: corner.includes('top') ? '3px solid #c9a227' : 'none',
                            borderBottom: corner.includes('bottom') ? '3px solid #c9a227' : 'none',
                            borderLeft: corner.includes('left') ? '3px solid #c9a227' : 'none',
                            borderRight: corner.includes('right') ? '3px solid #c9a227' : 'none',
                            borderRadius: '4px',
                        }}
                    />
                ))}

                {/* 閉じるボタン（蝋印風） */}
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '-15px',
                        right: '-15px',
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        border: 'none',
                        background: 'radial-gradient(circle at 30% 30%, #a52a2a, #8b0000)',
                        color: '#f5ebd8',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4), inset 0 2px 5px rgba(255,255,255,0.2)',
                        transition: 'transform 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    aria-label="Close modal"
                >
                    ✕
                </button>

                {/* タイトル */}
                <h2
                    id="modal-title"
                    style={{
                        color: '#3d2914',
                        fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                        fontWeight: 700,
                        marginBottom: '1.5rem',
                        textAlign: 'center',
                        fontFamily: '"Cinzel", serif',
                        textShadow: '0 1px 2px rgba(0,0,0,0.1)',
                        borderBottom: '2px solid rgba(201, 162, 39, 0.4)',
                        paddingBottom: '1rem',
                    }}
                >
                    ✦ {title} ✦
                </h2>

                {/* コンテンツ */}
                <div style={{ fontFamily: '"Cormorant Garamond", serif' }}>
                    {children}
                </div>
            </div>

            <style jsx>{`
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from { 
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to { 
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>
        </div>
    );
}
