'use client';

import { Language, translations } from '@/lib/i18n';
import { Upload, Sliders, Download } from 'lucide-react';

interface HowToUseProps {
    lang: Language;
}

export default function HowToUse({ lang }: HowToUseProps) {
    const t = translations[lang];

    const steps = [
        {
            icon: Upload,
            title: t.step1Title,
            desc: t.step1Desc,
        },
        {
            icon: Sliders,
            title: t.step2Title,
            desc: t.step2Desc,
        },
        {
            icon: Download,
            title: t.step3Title,
            desc: t.step3Desc,
        },
    ];

    return (
        <section className="w-full py-12">
            <h2 className="font-pixel text-lg text-neon neon-glow text-center mb-8">
                {t.howToTitle}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        className="relative p-6 bg-dark-card border border-neon/30 hover:border-neon transition-all duration-300 group"
                    >
                        {/* Step number badge */}
                        <div className="absolute -top-3 -left-3 w-8 h-8 bg-neon flex items-center justify-center">
                            <span className="font-pixel text-xs text-black">{idx + 1}</span>
                        </div>

                        {/* Icon */}
                        <div className="w-16 h-16 mx-auto mb-4 border border-neon/50 flex items-center justify-center group-hover:bg-neon/10 transition-all">
                            <step.icon className="w-8 h-8 text-neon" />
                        </div>

                        {/* Content */}
                        <h3 className="font-pixel text-xs text-neon text-center mb-2">
                            {step.title}
                        </h3>
                        <p className="text-white/60 text-sm text-center">
                            {step.desc}
                        </p>

                        {/* Corner decorations */}
                        <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-neon/30" />
                    </div>
                ))}
            </div>
        </section>
    );
}
