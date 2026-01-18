'use client';

/**
 * 広告スロットコンポーネント
 * 
 * 「浮遊する光の碑文」コンセプトを実装。
 * 半透明のグラスモーフィズムで、アート空間を邪魔しない自然な存在感。
 */

import { useState } from 'react';

// ============================================================
// Props定義
// ============================================================
interface AdSlotProps {
    id: string;
    position: 'bottom-left' | 'bottom-right' | 'center-bottom';
    size: 'small' | 'medium' | 'large';
}

// サイズ設定
const sizeConfig = {
    small: { width: 200, height: 100 },
    medium: { width: 300, height: 150 },
    large: { width: 728, height: 90 },
};

// ============================================================
// 広告スロットコンポーネント
// ============================================================
export default function AdSlot({ id, position, size }: AdSlotProps) {
    const [isHovered, setIsHovered] = useState(false);
    const { width, height } = sizeConfig[size];

    // ポジションスタイル
    const positionStyle: React.CSSProperties = {
        position: 'fixed',
        zIndex: 100,
        ...(position === 'bottom-left' && {
            bottom: '80px',
            left: '20px',
        }),
        ...(position === 'bottom-right' && {
            bottom: '80px',
            right: '20px',
        }),
        ...(position === 'center-bottom' && {
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
        }),
    };

    return (
        <div
            id={id}
            style={{
                ...positionStyle,
                width: `${width}px`,
                height: `${height}px`,
                background: isHovered
                    ? 'rgba(0, 217, 255, 0.15)'
                    : 'rgba(10, 10, 30, 0.4)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                borderRadius: '12px',
                border: isHovered
                    ? '1px solid rgba(0, 217, 255, 0.5)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                boxShadow: isHovered
                    ? '0 0 30px rgba(0, 217, 255, 0.3), inset 0 0 20px rgba(0, 217, 255, 0.1)'
                    : '0 4px 30px rgba(0, 0, 0, 0.3)',
                transition: 'all 0.4s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                cursor: 'pointer',
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* パルスアニメーション枠 */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '12px',
                    border: '1px solid transparent',
                    background: `linear-gradient(135deg, 
            rgba(0, 217, 255, ${isHovered ? 0.3 : 0.1}) 0%, 
            transparent 50%, 
            rgba(255, 0, 217, ${isHovered ? 0.3 : 0.1}) 100%)`,
                    animation: 'pulse-border 3s ease-in-out infinite',
                    pointerEvents: 'none',
                }}
            />

            {/* 広告プレースホルダー */}
            <div
                style={{
                    color: 'rgba(255, 255, 255, 0.4)',
                    fontSize: '12px',
                    textAlign: 'center',
                    fontFamily: 'monospace',
                    letterSpacing: '2px',
                }}
            >
                <span style={{ opacity: 0.6 }}>💠</span>
                <br />
                AD SPACE
                <br />
                <span style={{ fontSize: '10px', opacity: 0.5 }}>
                    {width}×{height}
                </span>
            </div>

            {/* CSSアニメーション定義 */}
            <style jsx>{`
        @keyframes pulse-border {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
      `}</style>
        </div>
    );
}
