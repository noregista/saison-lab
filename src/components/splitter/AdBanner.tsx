'use client';

import { Language, translations } from '@/lib/i18n';

interface AdBannerProps {
    lang: Language;
    size?: 'small' | 'medium' | 'large';
}

export default function AdBanner({ lang, size = 'medium' }: AdBannerProps) {
    const t = translations[lang];

    const heights = {
        small: 'h-16',
        medium: 'h-24',
        large: 'h-32',
    };

    return (
        <div className={`w-full ${heights[size]} ad-banner my-4`}>
            <span className="opacity-50">{t.adLabel}</span>
        </div>
    );
}
