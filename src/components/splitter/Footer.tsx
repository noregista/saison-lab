'use client';

import Link from 'next/link';
import { Language, translations } from '@/lib/i18n';
import { Home } from 'lucide-react';

interface FooterProps {
    lang: Language;
}

export default function Footer({ lang }: FooterProps) {
    const t = translations[lang];

    return (
        <footer className="border-t border-neon/20 bg-dark py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    {/* Portal link */}
                    <Link
                        href="https://saison-lab.com"
                        target="_blank"
                        className="flex items-center gap-2 text-white/60 hover:text-neon transition-colors"
                    >
                        <Home className="w-4 h-4" />
                        <span className="text-sm">{t.backToPortal}</span>
                    </Link>

                    {/* Copyright */}
                    <p className="text-white/40 text-xs font-pixel order-last md:order-none">
                        {t.copyright}
                    </p>

                    {/* Social link - X (formerly Twitter) */}
                    <Link
                        href="https://x.com/saisonlab"
                        target="_blank"
                        className="flex items-center gap-2 text-white/60 hover:text-neon transition-colors"
                    >
                        <span className="text-sm">{t.followUs}</span>
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </footer>
    );
}

