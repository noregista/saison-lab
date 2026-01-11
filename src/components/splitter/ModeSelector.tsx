'use client';

import { Language, translations } from '@/lib/i18n';
import { SplitMode } from '@/lib/splitter';
import { Grid2X2, Rows } from 'lucide-react';

interface ModeSelectorProps {
    lang: Language;
    mode: SplitMode;
    onModeChange: (mode: SplitMode) => void;
}

export default function ModeSelector({ lang, mode, onModeChange }: ModeSelectorProps) {
    const t = translations[lang];

    return (
        <div className="w-full">
            <p className="font-pixel text-xs text-neon mb-3">{t.modeLabel}</p>
            <div className="flex gap-2">
                <button
                    onClick={() => onModeChange('2x2')}
                    className={`
            mode-button flex-1 flex items-center justify-center gap-2
            py-3 px-4 border-2 border-neon font-pixel text-[10px]
            ${mode === '2x2' ? 'active' : 'text-neon hover:bg-neon/10'}
          `}
                >
                    <Grid2X2 className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.mode2x2}</span>
                    <span className="sm:hidden">2×2</span>
                </button>
                <button
                    onClick={() => onModeChange('1x4')}
                    className={`
            mode-button flex-1 flex items-center justify-center gap-2
            py-3 px-4 border-2 border-neon font-pixel text-[10px]
            ${mode === '1x4' ? 'active' : 'text-neon hover:bg-neon/10'}
          `}
                >
                    <Rows className="w-4 h-4" />
                    <span className="hidden sm:inline">{t.mode1x4}</span>
                    <span className="sm:hidden">1×4</span>
                </button>
            </div>
        </div>
    );
}
