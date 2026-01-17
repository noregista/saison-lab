'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { toPng } from 'html-to-image';

// ============================================================
// フレームデータ定義（18種類）
// 各フレームにはカテゴリ、名前（日英）、スタイル情報を含む
// ============================================================

export interface Frame {
    id: string;
    category: 'cute' | 'cool' | 'simple' | 'scary' | 'calming' | 'international';
    name: { en: string; jp: string };
    // CSS/スタイル定義
    borderStyle: string;      // ボーダーのCSS
    backgroundColor: string;  // 背景色
    shadowStyle: string;      // シャドウ効果
    padding: string;          // 内側余白
    borderRadius: string;     // 角丸
    overlayGradient?: string; // オーバーレイグラデーション（任意）
    decorativeClass?: string; // 追加の装飾クラス（任意）
}

const FRAMES: Frame[] = [
    // 【Cute / かわいい】
    {
        id: 'cherry-blossom',
        category: 'cute',
        name: { en: 'Cherry Blossom', jp: '桜舞う枠' },
        borderStyle: '8px solid #ffb7c5',
        backgroundColor: '#fff5f7',
        shadowStyle: '0 4px 20px rgba(255, 183, 197, 0.5)',
        padding: '16px',
        borderRadius: '16px',
        overlayGradient: 'radial-gradient(circle at 10% 10%, rgba(255,183,197,0.3) 0%, transparent 50%)',
    },
    {
        id: 'macaron-dream',
        category: 'cute',
        name: { en: 'Macaron Dream', jp: 'マカロンの夢' },
        borderStyle: '6px solid #e8d5f2',
        backgroundColor: '#fdf6ff',
        shadowStyle: '0 6px 24px rgba(232, 213, 242, 0.6)',
        padding: '20px',
        borderRadius: '24px',
    },
    {
        id: 'candy-pop',
        category: 'cute',
        name: { en: 'Candy Pop', jp: 'キャンディポップ' },
        borderStyle: '10px dashed #ff6b9d',
        backgroundColor: '#fff0f5',
        shadowStyle: '0 4px 16px rgba(255, 107, 157, 0.4)',
        padding: '14px',
        borderRadius: '20px',
    },
    // 【Cool / クール】
    {
        id: 'neo-tokyo',
        category: 'cool',
        name: { en: 'Neo Tokyo', jp: 'ネオ東京' },
        borderStyle: '4px solid #00ff88',
        backgroundColor: '#0a0a0f',
        shadowStyle: '0 0 30px rgba(0, 255, 136, 0.5), inset 0 0 20px rgba(0, 255, 136, 0.1)',
        padding: '12px',
        borderRadius: '4px',
    },
    {
        id: 'carbon-fiber',
        category: 'cool',
        name: { en: 'Carbon Fiber', jp: '黒鉛の線' },
        borderStyle: '6px solid #1a1a1a',
        backgroundColor: '#2d2d2d',
        shadowStyle: '0 8px 32px rgba(0, 0, 0, 0.8)',
        padding: '16px',
        borderRadius: '8px',
    },
    {
        id: 'chrome-edge',
        category: 'cool',
        name: { en: 'Chrome Edge', jp: '鋼鏡の縁' },
        borderStyle: '8px solid transparent',
        backgroundColor: 'linear-gradient(135deg, #c0c0c0, #f0f0f0, #a0a0a0)',
        shadowStyle: '0 4px 20px rgba(0, 0, 0, 0.3)',
        padding: '14px',
        borderRadius: '12px',
    },
    // 【Simple / シンプル】
    {
        id: 'museum-matte',
        category: 'simple',
        name: { en: 'Museum Matte', jp: '美術館の余白' },
        borderStyle: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
        shadowStyle: 'none',
        padding: '40px',
        borderRadius: '0px',
    },
    {
        id: 'studio-white',
        category: 'simple',
        name: { en: 'Studio White', jp: '無垢の白' },
        borderStyle: '12px solid #ffffff',
        backgroundColor: '#f8f8f8',
        shadowStyle: '0 2px 8px rgba(0, 0, 0, 0.1)',
        padding: '8px',
        borderRadius: '2px',
    },
    {
        id: 'polaroid-classic',
        category: 'simple',
        name: { en: 'Polaroid Classic', jp: 'ポラロイド風' },
        borderStyle: 'none',
        backgroundColor: '#ffffff',
        shadowStyle: '0 4px 12px rgba(0, 0, 0, 0.15)',
        padding: '12px 12px 48px 12px',
        borderRadius: '4px',
    },
    // 【Scary / こわい】
    {
        id: 'ghost-manor',
        category: 'scary',
        name: { en: 'Ghost Manor', jp: '幽霊屋敷' },
        borderStyle: '8px ridge #4a3a2a',
        backgroundColor: '#1a1510',
        shadowStyle: '0 0 40px rgba(0, 0, 0, 0.8), inset 0 0 30px rgba(74, 58, 42, 0.3)',
        padding: '16px',
        borderRadius: '4px',
    },
    {
        id: 'cursed-frame',
        category: 'scary',
        name: { en: 'Cursed Frame', jp: '呪われた縁' },
        borderStyle: '6px solid #3d0000',
        backgroundColor: '#0f0808',
        shadowStyle: '0 0 20px rgba(100, 0, 0, 0.6)',
        padding: '14px',
        borderRadius: '0px',
    },
    {
        id: 'dark-forest',
        category: 'scary',
        name: { en: 'Dark Forest', jp: '暗黒の森' },
        borderStyle: '10px solid #1a2f1a',
        backgroundColor: '#0a150a',
        shadowStyle: '0 8px 40px rgba(0, 20, 0, 0.7)',
        padding: '18px',
        borderRadius: '6px',
    },
    // 【Calming / 癒し】
    {
        id: 'sunlight-forest',
        category: 'calming',
        name: { en: 'Sunlight Forest', jp: '木漏れ日の森' },
        borderStyle: '6px solid #8fbc8f',
        backgroundColor: '#f0fff0',
        shadowStyle: '0 6px 24px rgba(143, 188, 143, 0.4)',
        padding: '18px',
        borderRadius: '16px',
        overlayGradient: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,200,0.2) 0%, transparent 60%)',
    },
    {
        id: 'zen-stone',
        category: 'calming',
        name: { en: 'Zen Stone', jp: '静寂の石' },
        borderStyle: '4px solid #a0a0a0',
        backgroundColor: '#f5f5f5',
        shadowStyle: '0 4px 16px rgba(0, 0, 0, 0.1)',
        padding: '24px',
        borderRadius: '50%',
    },
    {
        id: 'ocean-breeze',
        category: 'calming',
        name: { en: 'Ocean Breeze', jp: '潮風の記憶' },
        borderStyle: '8px solid #87ceeb',
        backgroundColor: '#e6f7ff',
        shadowStyle: '0 8px 32px rgba(135, 206, 235, 0.5)',
        padding: '16px',
        borderRadius: '20px',
    },
    // 【International / 国際的】
    {
        id: 'paris-gilt',
        category: 'international',
        name: { en: 'Paris Gilt', jp: 'パリの金細工' },
        borderStyle: '12px double #d4af37',
        backgroundColor: '#fffef5',
        shadowStyle: '0 6px 24px rgba(212, 175, 55, 0.4)',
        padding: '20px',
        borderRadius: '8px',
    },
    {
        id: 'london-brick',
        category: 'international',
        name: { en: 'London Brick', jp: 'ロンドンの煉瓦' },
        borderStyle: '10px solid #8b4513',
        backgroundColor: '#fdf5e6',
        shadowStyle: '0 8px 28px rgba(139, 69, 19, 0.4)',
        padding: '14px',
        borderRadius: '6px',
    },
    {
        id: 'kyoto-gold',
        category: 'international',
        name: { en: 'Kyoto Gold', jp: '京都の金箔' },
        borderStyle: '6px solid #c5a000',
        backgroundColor: '#1a1500',
        shadowStyle: '0 0 30px rgba(197, 160, 0, 0.4)',
        padding: '16px',
        borderRadius: '4px',
    },
];

// ============================================================
// カテゴリ情報
// ============================================================
const CATEGORIES = [
    { id: 'all', name: { en: 'All', jp: 'すべて' } },
    { id: 'cute', name: { en: 'Cute', jp: 'かわいい' } },
    { id: 'cool', name: { en: 'Cool', jp: 'クール' } },
    { id: 'simple', name: { en: 'Simple', jp: 'シンプル' } },
    { id: 'scary', name: { en: 'Scary', jp: 'こわい' } },
    { id: 'calming', name: { en: 'Calming', jp: '癒し' } },
    { id: 'international', name: { en: 'International', jp: '国際的' } },
];

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        title: 'ギャラリー・ワン',
        subtitle: 'GALLERY ONE',
        description: '15種類以上のフォトフレームで写真を美しく装飾',
        uploadLabel: '画像をアップロード',
        uploadHint: 'クリックまたはドラッグ＆ドロップで画像を選択',
        selectFrame: 'フレームを選択',
        category: 'カテゴリ',
        preview: 'プレビュー',
        downloadBtn: 'PNG保存',
        back: '← Saison Lab へ戻る',
        noImage: '画像をアップロードしてください',
        adjustImage: '画像調整',
        zoom: 'ズーム',
        position: '位置調整（ドラッグで移動）',
        reset: 'リセット',
    },
    en: {
        title: 'GALLERY ONE',
        subtitle: 'Gallery One',
        description: 'Decorate your photos with 15+ unique frames',
        uploadLabel: 'Upload Image',
        uploadHint: 'Click or drag & drop to select an image',
        selectFrame: 'Select Frame',
        category: 'Category',
        preview: 'Preview',
        downloadBtn: 'Save PNG',
        back: '← Back to Saison Lab',
        noImage: 'Please upload an image',
        adjustImage: 'Adjust Image',
        zoom: 'Zoom',
        position: 'Position (Drag to move)',
        reset: 'Reset',
    },
};

// ============================================================
// メインページコンポーネント
// ============================================================
export default function GalleryOnePage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [isDark, setIsDark] = useState(true);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);
    const [selectedFrame, setSelectedFrame] = useState<Frame>(FRAMES[0]);
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // 画像位置・ズーム調整用のstate
    const [zoom, setZoom] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    const previewRef = useRef<HTMLDivElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const t = texts[lang];

    // 画像アップロード処理
    const handleImageUpload = useCallback((file: File) => {
        if (!file.type.startsWith('image/')) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            setUploadedImage(e.target?.result as string);
            // 新しい画像がアップロードされたらリセット
            setZoom(1);
            setPosition({ x: 0, y: 0 });
        };
        reader.readAsDataURL(file);
    }, []);

    // ドラッグ＆ドロップ処理
    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        if (file) handleImageUpload(file);
    }, [handleImageUpload]);

    // ファイル選択処理
    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleImageUpload(file);
    }, [handleImageUpload]);

    // PNG保存処理
    const handleDownload = useCallback(async () => {
        if (!previewRef.current || !uploadedImage) return;
        try {
            const dataUrl = await toPng(previewRef.current, {
                pixelRatio: 2,
                backgroundColor: 'transparent',
            });
            const link = document.createElement('a');
            link.download = `gallery-one-${selectedFrame.id}.png`;
            link.href = dataUrl;
            link.click();
        } catch (err) {
            console.error('Download failed:', err);
        }
    }, [uploadedImage, selectedFrame]);

    // 画像ドラッグ開始処理
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        if (!uploadedImage) return;
        e.preventDefault();
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }, [uploadedImage, position]);

    // 画像ドラッグ中処理
    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!isDragging) return;
        setPosition({
            x: e.clientX - dragStart.x,
            y: e.clientY - dragStart.y,
        });
    }, [isDragging, dragStart]);

    // 画像ドラッグ終了処理
    const handleMouseUp = useCallback(() => {
        setIsDragging(false);
    }, []);

    // タッチ操作対応
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        if (!uploadedImage) return;
        const touch = e.touches[0];
        setIsDragging(true);
        setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
    }, [uploadedImage, position]);

    const handleTouchMove = useCallback((e: React.TouchEvent) => {
        if (!isDragging) return;
        const touch = e.touches[0];
        setPosition({
            x: touch.clientX - dragStart.x,
            y: touch.clientY - dragStart.y,
        });
    }, [isDragging, dragStart]);

    const handleTouchEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // リセット処理
    const handleReset = useCallback(() => {
        setZoom(1);
        setPosition({ x: 0, y: 0 });
    }, []);

    // カテゴリでフィルタリング
    const filteredFrames = selectedCategory === 'all'
        ? FRAMES
        : FRAMES.filter(f => f.category === selectedCategory);

    return (
        <main className={`min-h-screen transition-colors ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
            {/* ヘッダー */}
            <header className={`sticky top-0 z-50 backdrop-blur ${isDark ? 'bg-gray-900/90 border-gray-700' : 'bg-gray-100/90 border-gray-300'} border-b px-4 py-4`}>
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${isDark ? 'bg-emerald-600' : 'bg-emerald-500'} text-white`}>
                                🖼️
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">{t.title}</h1>
                                <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{t.subtitle}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* ダークモード切り替え */}
                            <button
                                onClick={() => setIsDark(!isDark)}
                                className={`px-3 py-1 rounded border text-sm ${isDark ? 'border-gray-600 hover:border-white' : 'border-gray-400 hover:border-black'}`}
                            >
                                {isDark ? '☀️' : '🌙'}
                            </button>
                            {/* 言語切り替え */}
                            <button
                                onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                                className={`px-3 py-1 rounded border text-sm ${isDark ? 'border-gray-600 hover:border-white' : 'border-gray-400 hover:border-black'}`}
                            >
                                {lang === 'jp' ? 'EN' : 'JP'}
                            </button>
                            {/* 戻るリンク */}
                            <Link
                                href="/"
                                className={`text-sm ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-500 hover:text-black'}`}
                            >
                                {t.back}
                            </Link>
                        </div>
                    </div>

                    {/* 広告プレースホルダー (728x90 Leaderboard) */}
                    <div className={`mb-4 border-2 border-dashed rounded-lg px-4 py-3 text-center ${isDark ? 'border-gray-600 bg-gray-800/50 text-gray-400' : 'border-gray-400 bg-gray-200/50 text-gray-500'}`}>
                        📢 Ad Display Area / 広告表示欄 (728x90)
                    </div>
                </div>
            </header>

            {/* メインコンテンツ */}
            <div className="max-w-6xl mx-auto p-4">
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* 左側: プレビューエリア */}
                    <div className="space-y-4">
                        <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.preview}</h2>

                        {/* プレビュー */}
                        <div
                            ref={previewRef}
                            className="relative overflow-hidden flex items-center justify-center min-h-[300px] sm:min-h-[400px]"
                            style={{
                                border: selectedFrame.borderStyle,
                                background: selectedFrame.backgroundColor,
                                boxShadow: selectedFrame.shadowStyle,
                                padding: selectedFrame.padding,
                                borderRadius: selectedFrame.borderRadius,
                            }}
                            onMouseMove={handleMouseMove}
                            onMouseUp={handleMouseUp}
                            onMouseLeave={handleMouseUp}
                            onTouchMove={handleTouchMove}
                            onTouchEnd={handleTouchEnd}
                        >
                            {/* オーバーレイ効果 */}
                            {selectedFrame.overlayGradient && (
                                <div
                                    className="absolute inset-0 pointer-events-none"
                                    style={{ background: selectedFrame.overlayGradient }}
                                />
                            )}

                            {uploadedImage ? (
                                <img
                                    src={uploadedImage}
                                    alt="Preview"
                                    className="max-w-full max-h-[400px] object-contain relative z-10 select-none"
                                    style={{
                                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                                        cursor: isDragging ? 'grabbing' : 'grab',
                                        transition: isDragging ? 'none' : 'transform 0.1s ease-out',
                                    }}
                                    onMouseDown={handleMouseDown}
                                    onTouchStart={handleTouchStart}
                                    draggable={false}
                                />
                            ) : (
                                <div className={`text-center py-20 ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    <div className="text-6xl mb-4">🖼️</div>
                                    <p>{t.noImage}</p>
                                </div>
                            )}
                        </div>

                        {/* 画像調整コントロール */}
                        {uploadedImage && (
                            <div className={`p-4 rounded-xl ${isDark ? 'bg-gray-800' : 'bg-white'} space-y-4`}>
                                <div className="flex items-center justify-between">
                                    <h3 className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {t.adjustImage}
                                    </h3>
                                    <button
                                        onClick={handleReset}
                                        className={`text-xs px-3 py-1 rounded ${isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                                    >
                                        {t.reset}
                                    </button>
                                </div>

                                {/* ズームスライダー */}
                                <div>
                                    <label className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                                        {t.zoom}: {Math.round(zoom * 100)}%
                                    </label>
                                    <input
                                        type="range"
                                        min="0.5"
                                        max="3"
                                        step="0.1"
                                        value={zoom}
                                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                                    />
                                </div>

                                {/* 位置調整ヒント */}
                                <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                                    💡 {t.position}
                                </p>
                            </div>
                        )}

                        {/* アップロードエリア */}
                        <div
                            onClick={() => fileInputRef.current?.click()}
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all hover:scale-[1.02] ${isDark
                                ? 'border-gray-600 hover:border-emerald-500 bg-gray-800/50'
                                : 'border-gray-300 hover:border-emerald-500 bg-gray-50'
                                }`}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileSelect}
                                className="hidden"
                            />
                            <div className="text-4xl mb-2">📁</div>
                            <p className="font-medium">{t.uploadLabel}</p>
                            <p className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>{t.uploadHint}</p>
                        </div>

                        {/* 保存ボタン */}
                        {uploadedImage && (
                            <button
                                onClick={handleDownload}
                                className="w-full py-3 rounded-xl font-medium transition-all bg-emerald-500 hover:bg-emerald-600 text-white"
                            >
                                {t.downloadBtn}
                            </button>
                        )}
                    </div>

                    {/* 右側: フレーム選択 */}
                    <div className="space-y-4">
                        <h2 className={`text-lg font-semibold ${isDark ? 'text-gray-200' : 'text-gray-800'}`}>{t.selectFrame}</h2>

                        {/* カテゴリフィルター */}
                        <div className="flex flex-wrap gap-2">
                            {CATEGORIES.map((cat) => (
                                <button
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${selectedCategory === cat.id
                                        ? 'bg-emerald-500 text-white'
                                        : isDark
                                            ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                        }`}
                                >
                                    {lang === 'jp' ? cat.name.jp : cat.name.en}
                                </button>
                            ))}
                        </div>

                        {/* フレームグリッド */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[500px] overflow-y-auto pr-2">
                            {filteredFrames.map((frame) => (
                                <button
                                    key={frame.id}
                                    onClick={() => setSelectedFrame(frame)}
                                    className={`p-2 rounded-lg transition-all hover:scale-105 ${selectedFrame.id === frame.id
                                        ? 'ring-2 ring-emerald-500 ring-offset-2 ' + (isDark ? 'ring-offset-gray-900' : 'ring-offset-gray-100')
                                        : ''
                                        }`}
                                >
                                    {/* フレームサムネイル */}
                                    <div
                                        className="aspect-square flex items-center justify-center text-2xl mb-2"
                                        style={{
                                            border: frame.borderStyle,
                                            background: frame.backgroundColor,
                                            boxShadow: frame.shadowStyle,
                                            borderRadius: frame.borderRadius,
                                            padding: '8px',
                                        }}
                                    >
                                        🖼️
                                    </div>
                                    <p className={`text-xs text-center truncate ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                                        {lang === 'jp' ? frame.name.jp : frame.name.en}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 広告プレースホルダー (300x250 Rectangle) */}
                <div className={`mt-8 border-2 border-dashed rounded-lg px-4 py-6 text-center ${isDark ? 'border-gray-600 bg-gray-800/50 text-gray-400' : 'border-gray-400 bg-gray-200/50 text-gray-500'}`}>
                    📢 Ad Display Area / 広告表示欄 (300x250)
                </div>
            </div>
        </main>
    );
}
