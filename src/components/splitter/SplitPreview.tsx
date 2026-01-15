'use client';

import { useMemo, useState, useCallback, useEffect } from 'react';
import { Language, translations } from '@/lib/i18n';
import { SplitMode } from '@/lib/splitter';
import { X } from 'lucide-react';

interface SplitPreviewProps {
    lang: Language;
    image: HTMLImageElement | null;
    mode: SplitMode;
}

export default function SplitPreview({ lang, image, mode }: SplitPreviewProps) {
    const t = translations[lang];
    const [enlargedIndex, setEnlargedIndex] = useState<number | null>(null);
    const [splitImages, setSplitImages] = useState<string[]>([]);

    // Generate split images when image or mode changes
    useEffect(() => {
        if (!image) {
            setSplitImages([]);
            return;
        }

        const generateSplitImages = async () => {
            const images: string[] = [];
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (!ctx) return;

            if (mode === '2x2') {
                const partW = image.width / 2;
                const partH = image.height / 2;
                canvas.width = partW;
                canvas.height = partH;

                for (let row = 0; row < 2; row++) {
                    for (let col = 0; col < 2; col++) {
                        ctx.clearRect(0, 0, partW, partH);
                        ctx.drawImage(image, col * partW, row * partH, partW, partH, 0, 0, partW, partH);
                        images.push(canvas.toDataURL('image/png'));
                    }
                }
            } else {
                const partW = image.width;
                const partH = image.height / 4;
                canvas.width = partW;
                canvas.height = partH;

                for (let i = 0; i < 4; i++) {
                    ctx.clearRect(0, 0, partW, partH);
                    ctx.drawImage(image, 0, i * partH, partW, partH, 0, 0, partW, partH);
                    images.push(canvas.toDataURL('image/png'));
                }
            }
            setSplitImages(images);
        };

        generateSplitImages();
    }, [image, mode]);

    const guidelines = useMemo(() => {
        if (!image) return [];

        if (mode === '2x2') {
            return [
                { type: 'h', position: 50 },
                { type: 'v', position: 50 },
            ];
        } else {
            return [
                { type: 'h', position: 25 },
                { type: 'h', position: 50 },
                { type: 'h', position: 75 },
            ];
        }
    }, [image, mode]);

    const handleSectionClick = useCallback((index: number) => {
        setEnlargedIndex(index);
    }, []);

    const closeEnlarged = useCallback(() => {
        setEnlargedIndex(null);
    }, []);

    if (!image) return null;

    return (
        <div className="w-full">
            <p className="font-pixel text-xs text-neon mb-3">{t.previewTitle}</p>
            <p className="text-white/40 text-xs mb-3">{lang === 'ja' ? '※ クリックで拡大表示' : '※ Click to enlarge'}</p>
            <div className="relative inline-block w-full max-w-lg mx-auto">
                {/* Image container */}
                <div className="relative pixel-border overflow-hidden">
                    <img
                        src={image.src}
                        alt="Preview"
                        className="w-full h-auto block"
                    />

                    {/* Guide lines overlay */}
                    <div className="absolute inset-0 pointer-events-none">
                        {guidelines.map((line, idx) => (
                            line.type === 'h' ? (
                                <div
                                    key={idx}
                                    className="guide-line guide-line-h absolute left-0 right-0"
                                    style={{ top: `${line.position}%` }}
                                />
                            ) : (
                                <div
                                    key={idx}
                                    className="guide-line guide-line-v absolute top-0 bottom-0"
                                    style={{ left: `${line.position}%` }}
                                />
                            )
                        ))}
                    </div>

                    {/* Clickable grid overlay for 2x2 mode */}
                    {mode === '2x2' && (
                        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                            {['1', '2', '3', '4'].map((num, idx) => (
                                <div
                                    key={num}
                                    className="flex items-center justify-center cursor-pointer hover:bg-neon/10 transition-colors"
                                    onClick={() => handleSectionClick(idx)}
                                >
                                    <span className="font-pixel text-lg text-neon/70 neon-glow pointer-events-none">
                                        {num}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Clickable grid overlay for 1x4 mode */}
                    {mode === '1x4' && (
                        <div className="absolute inset-0 grid grid-cols-1 grid-rows-4">
                            {['1', '2', '3', '4'].map((num, idx) => (
                                <div
                                    key={num}
                                    className="flex items-center justify-center cursor-pointer hover:bg-neon/10 transition-colors"
                                    onClick={() => handleSectionClick(idx)}
                                >
                                    <span className="font-pixel text-lg text-neon/70 neon-glow pointer-events-none">
                                        {num}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Enlarged view modal */}
            {enlargedIndex !== null && splitImages[enlargedIndex] && (
                <div
                    className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
                    onClick={closeEnlarged}
                >
                    <div className="relative max-w-3xl max-h-[90vh] animate-fadeIn">
                        <button
                            onClick={closeEnlarged}
                            className="absolute -top-10 right-0 text-white/60 hover:text-neon transition-colors"
                        >
                            <X size={32} />
                        </button>
                        <p className="text-center text-neon font-pixel mb-2">
                            {lang === 'ja' ? `パート ${enlargedIndex + 1}` : `Part ${enlargedIndex + 1}`}
                        </p>
                        <img
                            src={splitImages[enlargedIndex]}
                            alt={`Part ${enlargedIndex + 1}`}
                            className="max-w-full max-h-[80vh] object-contain border-2 border-neon rounded-lg"
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

