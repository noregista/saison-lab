'use client';

/**
 * 広告フレームコンポーネント
 * 
 * 意図: 広告を世界観に溶け込ませるデザイン
 * タイプ:
 * - portrait: 魔法の額縁（暖炉上用）
 * - wanted: 指名手配書風（デスク用）
 */

interface AdFrameProps {
    type: 'portrait' | 'wanted';
    lang: 'jp' | 'en';
}

export default function AdFrame({ type, lang }: AdFrameProps) {
    const adText = lang === 'jp' ? '広告スペース' : 'Advertisement';

    if (type === 'portrait') {
        // 魔法の額縁スタイル
        return (
            <div
                style={{
                    width: '100%',
                    maxWidth: '250px',
                    aspectRatio: '4/3',
                    position: 'relative',
                    marginTop: '1rem',
                }}
            >
                {/* 金の額縁 */}
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    border: '8px solid',
                    borderImage: 'linear-gradient(135deg, #c9a227, #8b6914, #c9a227, #8b6914) 1',
                    boxShadow: `
            inset 0 0 20px rgba(0,0,0,0.5),
            0 5px 20px rgba(0,0,0,0.4)
          `,
                }} />

                {/* コーナー装飾 */}
                {['top-left', 'top-right', 'bottom-left', 'bottom-right'].map((pos) => (
                    <div
                        key={pos}
                        style={{
                            position: 'absolute',
                            [pos.includes('top') ? 'top' : 'bottom']: '-4px',
                            [pos.includes('left') ? 'left' : 'right']: '-4px',
                            width: '16px',
                            height: '16px',
                            background: 'radial-gradient(circle, #c9a227, #8b6914)',
                            borderRadius: '50%',
                            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
                        }}
                    />
                ))}

                {/* 広告エリア */}
                <div style={{
                    position: 'absolute',
                    inset: '8px',
                    background: 'linear-gradient(135deg, #2d1810 0%, #1a0f0a 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6e5c4b',
                    fontSize: '0.8rem',
                    textAlign: 'center',
                    padding: '0.5rem',
                }}>
                    {/* 実際の広告が入る場所 */}
                    <span style={{ opacity: 0.6 }}>
                        🖼️<br />{adText}<br />(300x250)
                    </span>
                </div>
            </div>
        );
    }

    // 指名手配書スタイル
    return (
        <div
            style={{
                width: '180px',
                aspectRatio: '3/4',
                position: 'relative',
                transform: 'rotate(-2deg)',
            }}
        >
            {/* 羊皮紙の背景 */}
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, #f5ebd8 0%, #d4c19a 100%)',
                borderRadius: '4px',
                boxShadow: `
          0 5px 15px rgba(0,0,0,0.4),
          inset 0 0 10px rgba(0,0,0,0.1)
        `,
                // 角のカール効果
                clipPath: 'polygon(0 0, 100% 0, 100% 95%, 95% 100%, 5% 100%, 0 95%)',
            }}>
                {/* 釘 */}
                <div style={{
                    position: 'absolute',
                    top: '8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '12px',
                    height: '12px',
                    background: 'radial-gradient(circle at 30% 30%, #666, #333)',
                    borderRadius: '50%',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.5)',
                }} />

                {/* WANTED ヘッダー */}
                <div style={{
                    marginTop: '24px',
                    textAlign: 'center',
                    fontFamily: '"Cinzel", serif',
                    color: '#3d2914',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    textShadow: '0 1px 0 rgba(0,0,0,0.2)',
                }}>
                    WANTED
                </div>

                {/* 広告エリア */}
                <div style={{
                    margin: '10px',
                    height: 'calc(100% - 70px)',
                    background: 'rgba(45, 24, 16, 0.1)',
                    border: '1px dashed rgba(61, 41, 20, 0.3)',
                    borderRadius: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#6e5c4b',
                    fontSize: '0.7rem',
                    textAlign: 'center',
                    padding: '0.5rem',
                }}>
                    <span style={{ opacity: 0.6 }}>
                        📜<br />{adText}
                    </span>
                </div>

                {/* 破れた角の効果 */}
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: '20px',
                    height: '20px',
                    background: 'linear-gradient(135deg, transparent 50%, rgba(45, 24, 16, 0.3) 50%)',
                }} />
            </div>
        </div>
    );
}
