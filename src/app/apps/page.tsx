'use client';

import Link from 'next/link';

const mobileApps = [
    {
        id: 'never-sleep-in',
        name: 'NeverSleepIn',
        subtitle: 'The Unstoppable Math Alarm',
        icon: '⏰',
        description: '二度寝を徹底的に防ぐ、計算・ミッション強制アラームアプリ。',
        href: '/apps/never-sleep-in',
        status: 'Released',
    },
    // 将来ここにアプリを追加していく
];

export default function AppLabPage() {
    return (
        <div className="min-h-screen bg-[#0d1117] home-bg py-12 px-4 md:px-8">
            <div className="max-w-[1000px] mx-auto">
                <header className="mb-12 text-center">
                    <Link href="/" className="text-emerald hover:underline mb-4 inline-block">
                        ← Back to Saison Lab
                    </Link>
                    <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                        App Lab <span className="text-[#8b949e] font-normal">/ アプリ・ラボ</span>
                    </h1>
                    <p className="text-[#8b949e] text-lg max-w-[600px] mx-auto">
                        Saison Lab が開発したスマートフォン向けアプリケーションのライブラリです。
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {mobileApps.map((app) => (
                        <div
                            key={app.id}
                            className="bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-[rgba(80,200,120,0.2)] rounded-3xl p-8 hover:border-emerald transition-all hover:-translate-y-1"
                        >
                            <div className="flex items-start gap-6">
                                <div className="w-20 h-20 bg-gradient-to-br from-emerald to-emerald-dark rounded-2xl flex items-center justify-center text-4xl shadow-lg">
                                    {app.icon}
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-center mb-2">
                                        <h2 className="text-2xl font-bold text-white">{app.name}</h2>
                                        <span className="text-xs px-2 py-1 bg-[#21262d] text-emerald rounded border border-[rgba(80,200,120,0.2)]">
                                            {app.status}
                                        </span>
                                    </div>
                                    <p className="text-emerald-light text-sm mb-4">{app.subtitle}</p>
                                    <p className="text-[#8b949e] text-sm leading-relaxed mb-6">
                                        {app.description}
                                    </p>
                                    <div className="flex gap-4">
                                        <Link
                                            href={app.href}
                                            className="px-6 py-2 bg-emerald text-[#0d1117] font-semibold rounded-full hover:shadow-[0_0_20px_rgba(80,200,120,0.4)] transition-all no-underline text-sm"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <footer className="mt-24 text-center text-[#6e7681] text-sm">
                    © 2026 Saison Lab. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
