'use client';

import { useState, useCallback } from 'react';
import { Download, Loader2 } from 'lucide-react';
import Header from '@/components/splitter/Header';
import Footer from '@/components/splitter/Footer';
import AdBanner from '@/components/splitter/AdBanner';
import ImageUploader from '@/components/splitter/ImageUploader';
import ModeSelector from '@/components/splitter/ModeSelector';
import SplitPreview from '@/components/splitter/SplitPreview';
import HowToUse from '@/components/splitter/HowToUse';
import { Language, translations } from '@/lib/i18n';
import { SplitMode, splitImage, createZip, downloadBlob } from '@/lib/splitter';

export default function SplitterPage() {
    const [lang, setLang] = useState<Language>('ja');
    const [mode, setMode] = useState<SplitMode>('2x2');
    const [image, setImage] = useState<HTMLImageElement | null>(null);
    const [isDownloading, setIsDownloading] = useState(false);

    const t = translations[lang];

    const handleDownload = useCallback(async () => {
        if (!image || isDownloading) return;

        setIsDownloading(true);
        try {
            const results = await splitImage(image, mode);
            const zipBlob = await createZip(results);
            downloadBlob(zipBlob, 'splitter_images.zip');
        } catch (error) {
            console.error('Download failed:', error);
        } finally {
            setIsDownloading(false);
        }
    }, [image, mode, isDownloading]);

    return (
        <div className="min-h-screen flex flex-col splitter-bg grid-bg">
            <Header lang={lang} onLangChange={setLang} />

            {/* Ad banner below header */}
            <div className="container mx-auto px-4">
                <AdBanner lang={lang} size="small" />
            </div>

            {/* Main content */}
            <main className="flex-1 container mx-auto px-4 py-8">
                {/* Title section */}
                <div className="text-center mb-8">
                    <h1 className="font-pixel text-2xl md:text-4xl text-neon neon-glow glitch-text mb-2">
                        {t.title}
                    </h1>
                    <p className="text-white/60">{t.subtitle}</p>
                </div>

                {/* Main tool area */}
                <div className="max-w-2xl mx-auto space-y-6">
                    {/* Upload or Preview */}
                    {!image ? (
                        <ImageUploader lang={lang} onImageLoad={setImage} />
                    ) : (
                        <>
                            {/* Mode selector */}
                            <ModeSelector lang={lang} mode={mode} onModeChange={setMode} />

                            {/* Preview */}
                            <SplitPreview lang={lang} image={image} mode={mode} />

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleDownload}
                                    disabled={isDownloading}
                                    className="neon-button flex-1 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isDownloading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>{t.downloading}</span>
                                        </>
                                    ) : (
                                        <>
                                            <Download className="w-4 h-4" />
                                            <span>{t.downloadBtn}</span>
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setImage(null)}
                                    className="px-6 py-3 border border-white/30 text-white/60 hover:border-neon hover:text-neon transition-all font-pixel text-xs"
                                >
                                    RESET
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Ad banner below main function */}
                <div className="mt-8">
                    <AdBanner lang={lang} size="medium" />
                </div>

                {/* How to use section */}
                <HowToUse lang={lang} />
            </main>

            {/* Ad banner above footer */}
            <div className="container mx-auto px-4">
                <AdBanner lang={lang} size="large" />
            </div>

            <Footer lang={lang} />
        </div>
    );
}
