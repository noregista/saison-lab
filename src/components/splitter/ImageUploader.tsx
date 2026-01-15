'use client';

import { useCallback, useState } from 'react';
import { Language, translations } from '@/lib/i18n';
import { Upload } from 'lucide-react';

interface ImageUploaderProps {
    lang: Language;
    onImageLoad: (img: HTMLImageElement) => void;
}

export default function ImageUploader({ lang, onImageLoad }: ImageUploaderProps) {
    const t = translations[lang];
    const [isDragging, setIsDragging] = useState(false);

    const handleFile = useCallback((file: File) => {
        if (!file.type.startsWith('image/')) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => onImageLoad(img);
            img.src = e.target?.result as string;
        };
        reader.readAsDataURL(file);
    }, [onImageLoad]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) handleFile(file);
    }, [handleFile]);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback(() => {
        setIsDragging(false);
    }, []);

    const handleClick = useCallback(() => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (file) handleFile(file);
        };
        input.click();
    }, [handleFile]);

    return (
        <div
            onClick={handleClick}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            className={`
        dropzone relative cursor-pointer
        w-full min-h-[200px] md:min-h-[300px]
        flex flex-col items-center justify-center gap-4
        transition-all duration-300
        ${isDragging ? 'active scale-[1.02]' : ''}
      `}
        >
            {/* Animated icon */}
            <div className="relative">
                <Upload className="w-12 h-12 text-neon animate-pulse" />
            </div>

            {/* Text */}
            <div className="text-center">
                <p className="font-pixel text-sm text-neon mb-2">{t.uploadTitle}</p>
                <p className="text-white/60 text-sm">{t.uploadSubtitle}</p>
            </div>

            {/* Formats */}
            <p className="text-white/40 text-xs">{t.uploadFormats}</p>

            {/* Corner decorations */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-neon" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-neon" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-neon" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-neon" />
        </div>
    );
}
