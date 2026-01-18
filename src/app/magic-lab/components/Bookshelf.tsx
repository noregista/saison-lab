'use client';

/**
 * 本棚コンポーネント
 * 
 * 意図: 魔法書のグリッド表示と、クリックでモーダルを開く機能
 * 特徴:
 * - 6冊の魔法書をグリッド配置
 * - ホバー時の光エフェクト
 * - キーボードアクセシビリティ対応
 */

interface Book {
    id: string;
    title: string;
    content: string;
}

interface BookshelfProps {
    books: Book[];
    onBookClick: (bookId: string) => void;
}

// 本の色テーマ
const BOOK_COLORS = [
    { spine: '#8b0000', cover: '#a52a2a' }, // 深紅
    { spine: '#006400', cover: '#228b22' }, // 深緑
    { spine: '#00008b', cover: '#4169e1' }, // 紺青
    { spine: '#4b0082', cover: '#6a5acd' }, // インディゴ
    { spine: '#8b4513', cover: '#a0522d' }, // 茶色
    { spine: '#2f4f4f', cover: '#708090' }, // スレートグレー
];

export default function Bookshelf({ books, onBookClick }: BookshelfProps) {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                padding: '1rem',
                background: 'rgba(45, 24, 16, 0.6)',
                borderRadius: '1rem',
                backdropFilter: 'blur(5px)',
                boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)',
            }}
        >
            {books.map((book, index) => {
                const colors = BOOK_COLORS[index % BOOK_COLORS.length];
                return (
                    <button
                        key={book.id}
                        onClick={() => onBookClick(book.id)}
                        style={{
                            background: `linear-gradient(135deg, ${colors.spine} 0%, ${colors.cover} 100%)`,
                            border: '2px solid rgba(201, 162, 39, 0.3)',
                            borderRadius: '0.5rem',
                            padding: '1.5rem 1rem',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden',
                            minHeight: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                        className="book-item"
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = 'scale(1.05) translateY(-5px)';
                            e.currentTarget.style.boxShadow = '0 10px 30px rgba(201, 162, 39, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1) translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                        }}
                    >
                        {/* 本のアイコン */}
                        <span style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📖</span>

                        {/* タイトル */}
                        <span style={{
                            color: '#f5ebd8',
                            fontSize: 'clamp(0.7rem, 1.2vw, 0.9rem)',
                            fontWeight: 600,
                            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                            lineHeight: 1.3,
                        }}>
                            {book.title}
                        </span>

                        {/* 光沢効果 */}
                        <div style={{
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '50%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                            transition: 'left 0.5s ease',
                            pointerEvents: 'none',
                        }} className="book-shine" />
                    </button>
                );
            })}

            <style jsx>{`
        .book-item:hover .book-shine {
          left: 150%;
        }
        .book-item:focus {
          outline: 2px solid #c9a227;
          outline-offset: 2px;
        }
      `}</style>
        </div>
    );
}
