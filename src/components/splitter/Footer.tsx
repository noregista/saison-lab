'use client';

import Link from 'next/link';
import { Language, translations } from '@/lib/i18n';
import { Twitter, Home } from 'lucide-react';

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

                    {/* Social link */}
                    <Link
                        href="https://x.com/saisonlab"
                        target="_blank"
                        className="flex items-center gap-2 text-white/60 hover:text-neon transition-colors"
                    >
                        <span className="text-sm">{t.followUs}</span>
                        <Twitter className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </footer>
    );
}
