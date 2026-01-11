'use client';

import { useMemo } from 'react';
import { Language, translations } from '@/lib/i18n';
import { SplitMode } from '@/lib/splitter';

interface SplitPreviewProps {
    lang: Language;
    image: HTMLImageElement | null;
    mode: SplitMode;
}

export default function SplitPreview({ lang, image, mode }: SplitPreviewProps) {
    const t = translations[lang];

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

    if (!image) return null;

    return (
        <div className="w-full">
            <p className="font-pixel text-xs text-neon mb-3">{t.previewTitle}</p>
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

                    {/* Grid numbers overlay for 2x2 mode */}
                    {mode === '2x2' && (
                        <div className="absolute inset-0 pointer-events-none grid grid-cols-2 grid-rows-2">
                            {['1', '2', '3', '4'].map((num) => (
                                <div key={num} className="flex items-center justify-center">
                                    <span className="font-pixel text-lg text-neon/70 neon-glow">
                                        {num}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Grid numbers overlay for 1x4 mode */}
                    {mode === '1x4' && (
                        <div className="absolute inset-0 pointer-events-none grid grid-cols-1 grid-rows-4">
                            {['1', '2', '3', '4'].map((num) => (
                                <div key={num} className="flex items-center justify-center">
                                    <span className="font-pixel text-lg text-neon/70 neon-glow">
                                        {num}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
