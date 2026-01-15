'use client';

import Link from 'next/link';
import { Language, translations } from '@/lib/i18n';
import { Scissors, Globe } from 'lucide-react';

interface HeaderProps {
    lang: Language;
    onLangChange: (lang: Language) => void;
}

export default function Header({ lang, onLangChange }: HeaderProps) {
    const t = translations[lang];

    return (
        <header className="relative z-50 border-b border-neon/20 bg-dark/90 backdrop-blur-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo - Home link */}
                    <Link
                        href="https://saison-lab.com"
                        target="_blank"
                        className="flex items-center group"
                    >
                        <div className="w-10 h-10 border-2 border-neon flex items-center justify-center group-hover:bg-neon transition-all duration-300">
                            <Scissors className="w-5 h-5 text-neon group-hover:text-black transition-colors" />
                        </div>
                    </Link>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        {/* Language switch */}
                        <button
                            onClick={() => onLangChange(lang === 'en' ? 'ja' : 'en')}
                            className="flex items-center gap-2 px-3 py-2 border border-neon/50 hover:border-neon hover:bg-neon/10 transition-all duration-300"
                        >
                            <Globe className="w-4 h-4 text-neon" />
                            <span className="font-pixel text-[10px] text-neon uppercase">
                                {lang === 'en' ? 'JP' : 'EN'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
