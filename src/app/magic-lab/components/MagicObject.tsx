'use client';

import { useState } from 'react';

/**
 * 魔法オブジェクトコンポーネント
 * 
 * 意図: 杖、羽ペン、フクロウなどのインタラクティブアイテム
 * 特徴:
 * - ホバー時のフロートアニメーション
 * - ツールチップ表示
 * - アクセシビリティ対応（キーボード操作）
 */

interface MagicObjectProps {
    icon: string;
    hint: string;
    onClick: () => void;
}

export default function MagicObject({ icon, hint, onClick }: MagicObjectProps) {
    const [isHovered, setIsHovered] = useState(false);
    const [isPressed, setIsPressed] = useState(false);

    return (
        <div
            role="button"
            tabIndex={0}
            onClick={() => {
                setIsPressed(true);
                onClick();
                setTimeout(() => setIsPressed(false), 300);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsPressed(true);
                    onClick();
                    setTimeout(() => setIsPressed(false), 300);
                }
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'relative',
                cursor: 'pointer',
                padding: '1rem',
                borderRadius: '50%',
                background: isPressed
                    ? 'radial-gradient(circle, rgba(201, 162, 39, 0.4) 0%, rgba(201, 162, 39, 0.1) 70%)'
                    : isHovered
                        ? 'radial-gradient(circle, rgba(201, 162, 39, 0.2) 0%, transparent 70%)'
                        : 'transparent',
                transition: 'all 0.3s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                animation: isHovered ? 'float 2s ease-in-out infinite' : 'none',
            }}
            aria-label={hint}
        >
            {/* アイコン */}
            <span style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)',
                display: 'block',
                filter: isHovered ? 'drop-shadow(0 0 10px rgba(201, 162, 39, 0.8))' : 'none',
                transition: 'filter 0.3s ease',
            }}>
                {icon}
            </span>

            {/* ツールチップ */}
            {isHovered && (
                <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    marginBottom: '0.5rem',
                    padding: '0.5rem 1rem',
                    background: 'rgba(45, 24, 16, 0.95)',
                    border: '1px solid #c9a227',
                    borderRadius: '0.5rem',
                    color: '#f5ebd8',
                    fontSize: '0.8rem',
                    whiteSpace: 'nowrap',
                    zIndex: 100,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.5)',
                    animation: 'fadeIn 0.2s ease',
                }}>
                    {hint}
                    {/* 矢印 */}
                    <div style={{
                        position: 'absolute',
                        bottom: '-6px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderTop: '6px solid #c9a227',
                    }} />
                </div>
            )}

            <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-50%) translateY(5px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
        </div>
    );
}
