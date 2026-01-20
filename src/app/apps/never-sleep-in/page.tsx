'use client';

import Link from 'next/link';

export default function NeverSleepInDetailsPage() {
    return (
        <div className="min-h-screen bg-[#0d1117] home-bg py-12 px-4 md:px-8">
            <div className="max-w-[800px] mx-auto">
                <header className="mb-12">
                    <Link href="/apps" className="text-emerald hover:underline mb-8 inline-block">
                        ← Back to App Lab
                    </Link>
                    <div className="flex flex-col md:flex-row items-center gap-8 bg-[rgba(22,27,34,0.7)] backdrop-blur-xl border border-[rgba(80,200,120,0.2)] rounded-3xl p-8 md:p-12 shadow-2xl">
                        <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-emerald to-emerald-dark rounded-[2.5rem] flex items-center justify-center text-6xl shadow-[0_0_50px_rgba(80,200,120,0.2)]">
                            ⏰
                        </div>
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">NeverSleepIn</h1>
                            <p className="text-emerald text-xl font-medium mb-6">The Unstoppable Math Alarm</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4">
                                <span className="px-6 py-3 bg-[rgba(80,200,120,0.1)] border border-emerald text-emerald rounded-full font-bold cursor-not-allowed opacity-50">
                                    Google Play (Coming Soon)
                                </span>
                                <Link
                                    href="/apps/never-sleep-in/privacy"
                                    className="px-6 py-3 bg-[#21262d] border border-[rgba(255,255,255,0.1)] text-white rounded-full font-medium hover:bg-[#30363d] transition-all no-underline"
                                >
                                    Privacy Policy
                                </Link>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="grid grid-cols-1 gap-8">
                    <section className="bg-[rgba(22,27,34,0.7)] border border-[rgba(80,200,120,0.2)] rounded-3xl p-8 md:p-12">
                        <h2 className="text-2xl font-bold text-white mb-6">Features / 主な機能</h2>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <span className="text-2xl">🧮</span>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Math Challenge / 計算ミッション</h3>
                                    <p className="text-[#8b949e] text-sm leading-relaxed">アラームを止めるために正解するまで終わらない計算問題。難易度選択も可能。</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-2xl">⚡</span>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Time Attack / タイムアタック</h3>
                                    <p className="text-[#8b949e] text-sm leading-relaxed">制限時間内に解かないと最初からやり直し。集中力を極限まで高めます。</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-2xl">🤝</span>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Consecutive Mode / 連続正解モード</h3>
                                    <p className="text-[#8b949e] text-sm leading-relaxed">一度も間違えずに連続で正解する必要がある、緊張感のあるモード。</p>
                                </div>
                            </li>
                            <li className="flex gap-4">
                                <span className="text-2xl">🖐️</span>
                                <div>
                                    <h3 className="text-white font-semibold mb-1">Shake Challenge / シェイクミッション</h3>
                                    <p className="text-[#8b949e] text-sm leading-relaxed">スマホを全力で振らないとアラームが止まらない。物理的に体を起こします。</p>
                                </div>
                            </li>
                        </ul>
                    </section>
                </div>

                <footer className="mt-12 text-center text-[#6e7681] text-sm">
                    © 2026 Saison Lab. All rights reserved.
                </footer>
            </div>
        </div>
    );
}
