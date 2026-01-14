'use client';

import { useState, useMemo } from 'react';
import { Search, X, ChevronLeft, ChevronRight, Home } from 'lucide-react';
import { creatures, typeColors, Creature } from './data/creatures';

// Type translations
const typeTranslations: Record<string, string> = {
    grass: '草',
    fire: '炎',
    water: '水',
    electric: '電気',
    normal: 'ノーマル',
    psychic: 'エスパー',
    flying: 'ひこう',
    bug: '虫',
    poison: '毒',
    ground: '地面',
    rock: '岩',
    ghost: 'ゴースト',
    ice: '氷',
    dragon: 'ドラゴン',
    fairy: 'フェアリー',
};

const basePath = '/saison-lab';

type Lang = 'en' | 'jp';

const translations = {
    en: {
        title: 'Phantom Bestiary',
        subtitle: '151 Fictional Creatures',
        search: 'Search by name or type...',
        category: 'Category',
        type: 'Type',
        height: 'Height',
        weight: 'Weight',
        ability: 'Ability',
        stats: 'Base Stats',
        integrity: 'Integrity',
        impact: 'Impact',
        resistance: 'Resistance',
        energy: 'Energy',
        stability: 'Stability',
        agility: 'Agility',
        description: 'Pokédex Entry',
        noResults: 'No creatures found',
    },
    jp: {
        title: '幻獣図鑑',
        subtitle: '151匹の架空生物',
        search: '名前またはタイプで検索...',
        category: '分類',
        type: 'タイプ',
        height: '高さ',
        weight: '重さ',
        ability: '特性',
        stats: '種族値',
        integrity: '整合性',
        impact: '衝撃力',
        resistance: '耐性',
        energy: 'エネルギー',
        stability: '安定性',
        agility: '敏捷性',
        description: '図鑑説明',
        noResults: '生物が見つかりません',
    },
};

export default function PokedexPage() {
    const [lang, setLang] = useState<Lang>('jp');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);

    const t = translations[lang];

    // Filter creatures
    const filteredCreatures = useMemo(() => {
        if (!searchQuery.trim()) return creatures;
        const q = searchQuery.toLowerCase();
        return creatures.filter(c =>
            c.name.en.toLowerCase().includes(q) ||
            c.name.jp.includes(q) ||
            c.types.some(t => t.includes(q))
        );
    }, [searchQuery]);

    // Navigate between creatures
    const navigateCreature = (direction: 'prev' | 'next') => {
        if (!selectedCreature) return;
        const currentIndex = creatures.findIndex(c => c.id === selectedCreature.id);
        const newIndex = direction === 'prev'
            ? (currentIndex - 1 + creatures.length) % creatures.length
            : (currentIndex + 1) % creatures.length;
        setSelectedCreature(creatures[newIndex]);
    };

    return (
        <div className="min-h-screen bg-[#0f0f10] text-white">
            {/* Header */}
            <header className="sticky top-0 z-40 bg-gradient-to-r from-red-600 to-red-500 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a
                            href={`${basePath}/`}
                            className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                            title="Home"
                        >
                            <Home size={20} />
                        </a>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold tracking-wide">{t.title}</h1>
                            <p className="text-xs text-red-100 opacity-80">{t.subtitle}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setLang(lang === 'en' ? 'jp' : 'en')}
                        className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
                    >
                        {lang === 'en' ? '日本語' : 'English'}
                    </button>
                </div>
            </header>

            {/* Search Bar */}
            <div className="sticky top-[60px] z-30 bg-[#1a1a1f] border-b border-gray-800 px-4 py-3">
                <div className="max-w-7xl mx-auto">
                    <div className="relative">
                        <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={t.search}
                            className="w-full pl-12 pr-4 py-3 bg-[#252530] border border-gray-700 rounded-xl text-sm placeholder:text-gray-500 focus:outline-none focus:border-red-500 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 py-6">
                {filteredCreatures.length === 0 ? (
                    <div className="text-center py-20 text-gray-500">{t.noResults}</div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                        {filteredCreatures.map((creature) => (
                            <CreatureCard
                                key={creature.id}
                                creature={creature}
                                lang={lang}
                                onClick={() => setSelectedCreature(creature)}
                            />
                        ))}
                    </div>
                )}
            </main>

            {/* Detail Modal */}
            {selectedCreature && (
                <CreatureDetail
                    creature={selectedCreature}
                    lang={lang}
                    t={t}
                    onClose={() => setSelectedCreature(null)}
                    onNavigate={navigateCreature}
                />
            )}
        </div>
    );
}

// Creature Card Component
function CreatureCard({ creature, lang, onClick }: { creature: Creature; lang: Lang; onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="bg-[#1a1a1f] border border-gray-800 rounded-xl p-3 hover:border-red-500 hover:scale-105 transition-all group"
        >
            {/* Creature Image Placeholder */}
            <div
                className="aspect-square rounded-lg mb-2 flex items-center justify-center text-4xl"
                style={{ backgroundColor: creature.color + '22' }}
            >
                <span className="opacity-50 group-hover:opacity-100 transition-opacity text-5xl">
                    {getCreatureEmoji(creature.types[0])}
                </span>
            </div>

            {/* Info */}
            <div className="text-left">
                <div className="text-xs text-gray-500">No.{String(creature.id).padStart(3, '0')}</div>
                <div className="font-medium text-sm truncate">
                    {lang === 'en' ? creature.name.en : creature.name.jp}
                </div>
                <div className="flex gap-1 mt-1">
                    {creature.types.map((type) => (
                        <span
                            key={type}
                            className="text-xs px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: typeColors[type], color: '#fff' }}
                        >
                            {lang === 'jp' ? typeTranslations[type] : type}
                        </span>
                    ))}
                </div>
            </div>
        </button>
    );
}

// Creature Detail Component
function CreatureDetail({
    creature,
    lang,
    t,
    onClose,
    onNavigate,
}: {
    creature: Creature;
    lang: Lang;
    t: typeof translations.en;
    onClose: () => void;
    onNavigate: (dir: 'prev' | 'next') => void;
}) {
    const stats = [
        { key: 'integrity', value: creature.stats.integrity },
        { key: 'impact', value: creature.stats.impact },
        { key: 'resistance', value: creature.stats.resistance },
        { key: 'energy', value: creature.stats.energy },
        { key: 'stability', value: creature.stats.stability },
        { key: 'agility', value: creature.stats.agility },
    ];

    return (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#1a1a1f] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
                {/* Header */}
                <div className="sticky top-0 bg-[#1a1a1f] border-b border-gray-800 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <button onClick={() => onNavigate('prev')} className="p-2 hover:bg-gray-800 rounded-lg">
                            <ChevronLeft size={20} />
                        </button>
                        <span className="text-sm text-gray-500">No.{String(creature.id).padStart(3, '0')}</span>
                        <button onClick={() => onNavigate('next')} className="p-2 hover:bg-gray-800 rounded-lg">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg">
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 grid md:grid-cols-2 gap-8">
                    {/* Left: Image */}
                    <div className="flex flex-col items-center">
                        <div
                            className="w-full aspect-square max-w-[300px] rounded-2xl flex items-center justify-center text-8xl"
                            style={{ backgroundColor: creature.color + '22' }}
                        >
                            {getCreatureEmoji(creature.types[0])}
                        </div>
                        <h2 className="text-2xl font-bold mt-4">
                            {lang === 'en' ? creature.name.en : creature.name.jp}
                        </h2>
                        <div className="flex gap-2 mt-2">
                            {creature.types.map((type) => (
                                <span
                                    key={type}
                                    className="px-3 py-1 rounded-full text-sm font-medium"
                                    style={{ backgroundColor: typeColors[type], color: '#fff' }}
                                >
                                    {lang === 'jp' ? typeTranslations[type] : type}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Right: Data */}
                    <div className="space-y-6">
                        {/* Basic Info */}
                        <div className="grid grid-cols-2 gap-4">
                            <InfoCard label={t.category} value={lang === 'en' ? creature.category.en : creature.category.jp} />
                            <InfoCard label={t.height} value={creature.height} />
                            <InfoCard label={t.weight} value={creature.weight} />
                            <InfoCard label={t.ability} value={lang === 'en' ? creature.ability.en : creature.ability.jp} />
                        </div>

                        {/* Stats */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-3">{t.stats}</h3>
                            <div className="space-y-2">
                                {stats.map((stat) => (
                                    <StatBar
                                        key={stat.key}
                                        label={t[stat.key as keyof typeof t] as string}
                                        value={stat.value}
                                        max={255}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div>
                            <h3 className="text-sm font-medium text-gray-400 mb-2">{t.description}</h3>
                            <p className="text-sm text-gray-300 bg-[#252530] rounded-lg p-4">
                                {lang === 'en' ? creature.description.en : creature.description.jp}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Info Card Component
function InfoCard({ label, value }: { label: string; value: string }) {
    return (
        <div className="bg-[#252530] rounded-lg p-3">
            <div className="text-xs text-gray-500 mb-1">{label}</div>
            <div className="text-sm font-medium">{value}</div>
        </div>
    );
}

// Stat Bar Component
function StatBar({ label, value, max }: { label: string; value: number; max: number }) {
    const percentage = (value / max) * 100;
    const barColor = percentage > 70 ? '#22c55e' : percentage > 40 ? '#facc15' : '#ef4444';

    return (
        <div className="flex items-center gap-3">
            <div className="w-20 text-xs text-gray-400 text-right">{label}</div>
            <div className="flex-1 h-3 bg-[#252530] rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%`, backgroundColor: barColor }}
                />
            </div>
            <div className="w-10 text-xs text-gray-400">{value}</div>
        </div>
    );
}

// Helper: Get emoji for type
function getCreatureEmoji(type: string): string {
    const emojis: Record<string, string> = {
        grass: '🌿',
        fire: '🔥',
        water: '💧',
        electric: '⚡',
        normal: '🐾',
        psychic: '🔮',
        flying: '🕊️',
        bug: '🐛',
        poison: '☠️',
        ground: '🏜️',
        rock: '🪨',
        ghost: '👻',
        ice: '❄️',
        dragon: '🐉',
        fairy: '✨',
    };
    return emojis[type] || '❓';
}
