'use client';

import { useState, useRef, useEffect, useCallback } from 'react';


type CardStyle = 'pocket' | 'duel' | 'mana';
type Language = 'ja' | 'en';

interface TypeInfo {
    id: string;
    icon: string;
    nameJa: string;
    nameEn: string;
    gradient: [string, string];
}

interface HistoryItem {
    id: string;
    timestamp: number;
    style: CardStyle;
    typeId: string;
    cardName: string;
    cardHP: string;
    cardATK: string;
    cardDEF: string;
    cardMana: string;
    cardPower: string;
    attack1Name: string;
    attack1Damage: string;
    attack1Desc: string;
    attack2Name: string;
    attack2Damage: string;
    attack2Desc: string;
    flavorText: string;
    presetArtId?: string;
}

const cardStyles: Record<CardStyle, {
    name: string;
    types: TypeInfo[];
    showHP: boolean;
    showATK: boolean;
    showDEF: boolean;
    showMana: boolean;
    showPower: boolean;
    showAttack2: boolean;
    showDamage: boolean;
}> = {
    pocket: {
        name: 'Pocket Monster',
        types: [
            { id: 'fire', icon: '🔥', nameJa: '炎', nameEn: 'Fire', gradient: ['#FF6B6B', '#FF8E53'] },
            { id: 'water', icon: '💧', nameJa: '水', nameEn: 'Water', gradient: ['#4FACFE', '#00F2FE'] },
            { id: 'grass', icon: '🌿', nameJa: '草', nameEn: 'Grass', gradient: ['#43E97B', '#38F9D7'] },
            { id: 'electric', icon: '⚡', nameJa: '雷', nameEn: 'Electric', gradient: ['#FFD93D', '#F9CA24'] },
            { id: 'psychic', icon: '🔮', nameJa: '超', nameEn: 'Psychic', gradient: ['#A8EDEA', '#FED6E3'] },
            { id: 'fighting', icon: '👊', nameJa: '闘', nameEn: 'Fighting', gradient: ['#F093FB', '#F5576C'] },
            { id: 'dark', icon: '🌑', nameJa: '悪', nameEn: 'Dark', gradient: ['#4A4A4A', '#2C2C2C'] },
            { id: 'steel', icon: '⚙️', nameJa: '鋼', nameEn: 'Steel', gradient: ['#B8B8B8', '#E0E0E0'] },
            { id: 'normal', icon: '⭐', nameJa: '無', nameEn: 'Normal', gradient: ['#FFEAA7', '#DFE6E9'] },
        ],
        showHP: true, showATK: false, showDEF: false, showMana: false, showPower: false, showAttack2: true, showDamage: true,
    },
    duel: {
        name: 'Duel Monsters',
        types: [
            { id: 'dark', icon: '🌑', nameJa: '闇', nameEn: 'DARK', gradient: ['#2C2C2C', '#1a1a2e'] },
            { id: 'light', icon: '✨', nameJa: '光', nameEn: 'LIGHT', gradient: ['#FFD700', '#FFF8DC'] },
            { id: 'earth', icon: '🌍', nameJa: '地', nameEn: 'EARTH', gradient: ['#8B4513', '#CD853F'] },
            { id: 'water', icon: '💧', nameJa: '水', nameEn: 'WATER', gradient: ['#1E90FF', '#00CED1'] },
            { id: 'fire', icon: '🔥', nameJa: '炎', nameEn: 'FIRE', gradient: ['#FF4500', '#FF6347'] },
            { id: 'wind', icon: '🌪️', nameJa: '風', nameEn: 'WIND', gradient: ['#32CD32', '#90EE90'] },
            { id: 'divine', icon: '👑', nameJa: '神', nameEn: 'DIVINE', gradient: ['#FFD700', '#DAA520'] },
        ],
        showHP: false, showATK: true, showDEF: true, showMana: false, showPower: false, showAttack2: false, showDamage: false,
    },
    mana: {
        name: 'Mana Wars',
        types: [
            { id: 'white', icon: '☀️', nameJa: '白', nameEn: 'White', gradient: ['#FFFAF0', '#FDF5E6'] },
            { id: 'blue', icon: '💎', nameJa: '青', nameEn: 'Blue', gradient: ['#4169E1', '#1E90FF'] },
            { id: 'black', icon: '💀', nameJa: '黒', nameEn: 'Black', gradient: ['#2F2F2F', '#1a1a1a'] },
            { id: 'red', icon: '🔥', nameJa: '赤', nameEn: 'Red', gradient: ['#DC143C', '#FF4500'] },
            { id: 'green', icon: '🌲', nameJa: '緑', nameEn: 'Green', gradient: ['#228B22', '#32CD32'] },
            { id: 'colorless', icon: '◇', nameJa: '無色', nameEn: 'Colorless', gradient: ['#A9A9A9', '#D3D3D3'] },
        ],
        showHP: false, showATK: false, showDEF: false, showMana: true, showPower: true, showAttack2: false, showDamage: false,
    },
};

const styleDefaults: Record<CardStyle, Record<Language, { cardName: string; attack1Name: string; attack1Desc: string; attack2Name: string; attack2Desc: string; flavorText: string }>> = {
    pocket: {
        en: { cardName: 'Sparky', attack1Name: 'Thunder Shock', attack1Desc: 'Flip a coin. If heads, the opponent is now Paralyzed.', attack2Name: 'Thunderbolt', attack2Desc: 'Discard all Energy from this creature.', flavorText: 'It stores electricity in the electric sacs on its cheeks.' },
        ja: { cardName: 'スパーキー', attack1Name: '電撃ショック', attack1Desc: 'コインを1回投げオモテなら、相手のモンスターをマヒにする。', attack2Name: '10万ボルト', attack2Desc: 'このカードについているエネルギーを、すべてトラッシュする。', flavorText: 'ほっぺたの 赤い 袋に 電気を ためる。' },
    },
    duel: {
        en: { cardName: 'Dark Sorcerer', attack1Name: 'Dark Magic Attack', attack1Desc: 'The ultimate wizard in terms of attack and defense.', attack2Name: '', attack2Desc: '', flavorText: 'A master of the dark arts.' },
        ja: { cardName: '黒魔導士', attack1Name: 'ブラック・マジック', attack1Desc: '攻撃力と守備力を兼ね備えた究極の魔法使い。', attack2Name: '', attack2Desc: '', flavorText: '闇の魔術の達人。' },
    },
    mana: {
        en: { cardName: 'Serra Messenger', attack1Name: 'Flying, Vigilance', attack1Desc: 'This creature can attack without being tapped.', attack2Name: '', attack2Desc: '', flavorText: 'Born with wings of light.' },
        ja: { cardName: 'セラの使者', attack1Name: '飛行、警戒', attack1Desc: 'このクリーチャーはタップせずに攻撃できる。', attack2Name: '', attack2Desc: '', flavorText: '光の翼を持って生まれる。' },
    },
};

const presetArtworks = [
    { id: 'fire-dragon', src: '/tcg/presets/fire-dragon.png', nameJa: '炎竜', nameEn: 'Fire Dragon', icon: '🔥' },
    { id: 'water-kraken', src: '/tcg/presets/water-kraken.png', nameJa: '水の怪物', nameEn: 'Kraken', icon: '💧' },
    { id: 'grass-treant', src: '/tcg/presets/grass-treant.png', nameJa: '森の守護者', nameEn: 'Treant', icon: '🌿' },
    { id: 'dark-knight', src: '/tcg/presets/dark-knight.png', nameJa: '闇騎士', nameEn: 'Dark Knight', icon: '🌑' },
    { id: 'electric-phoenix', src: '/tcg/presets/electric-phoenix.png', nameJa: '雷鳥', nameEn: 'Thunder Phoenix', icon: '⚡' },
    { id: 'holy-angel', src: '/tcg/presets/holy-angel.png', nameJa: '聖天使', nameEn: 'Holy Angel', icon: '✨' },
];

// 意図: 定番テンプレート（ワンクリックで全設定を読み込み）
interface CardTemplate {
    id: string;
    nameJa: string;
    nameEn: string;
    icon: string;
    style: CardStyle;
    typeId: string;
    cardName: { ja: string; en: string };
    cardHP: string;
    cardATK: string;
    cardDEF: string;
    cardMana: string;
    cardPower: string;
    attack1Name: { ja: string; en: string };
    attack1Damage: string;
    attack1Desc: { ja: string; en: string };
    attack2Name: { ja: string; en: string };
    attack2Damage: string;
    attack2Desc: { ja: string; en: string };
    flavorText: { ja: string; en: string };
    presetArtId?: string;
}

const cardTemplates: CardTemplate[] = [
    {
        id: 'dragon-king',
        nameJa: '竜王テンプレ',
        nameEn: 'Dragon King',
        icon: '🐉',
        style: 'pocket',
        typeId: 'fire',
        cardName: { ja: '炎竜王バハムート', en: 'Bahamut, King of Fire' },
        cardHP: '200',
        cardATK: '3000',
        cardDEF: '2500',
        cardMana: '7',
        cardPower: '6/6',
        attack1Name: { ja: 'メガフレア', en: 'Mega Flare' },
        attack1Damage: '100',
        attack1Desc: { ja: '相手のベンチポケモン全員に30ダメージ。', en: 'Deal 30 damage to each of your opponent\'s Benched Pokemon.' },
        attack2Name: { ja: '極炎爆', en: 'Inferno Burst' },
        attack2Damage: '180',
        attack2Desc: { ja: 'このポケモンについているエネルギーを2枚トラッシュ。', en: 'Discard 2 Energy from this Pokemon.' },
        flavorText: { ja: '天空を制する竜の王。その炎は山をも溶かす。', en: 'The king of dragons ruling the sky. Its flames can melt mountains.' },
        presetArtId: 'fire-dragon',
    },
    {
        id: 'shadow-mage',
        nameJa: '闇魔導士テンプレ',
        nameEn: 'Shadow Mage',
        icon: '🧙',
        style: 'duel',
        typeId: 'dark',
        cardName: { ja: '闇魔導士アイシス', en: 'Aisis the Dark Sorcerer' },
        cardHP: '100',
        cardATK: '2500',
        cardDEF: '2100',
        cardMana: '5',
        cardPower: '4/3',
        attack1Name: { ja: '暗黒の波動', en: 'Dark Pulse' },
        attack1Damage: '',
        attack1Desc: { ja: 'このカードが召喚に成功した時、相手のモンスター1体を選択して破壊する。', en: 'When this card is summoned: Target 1 monster your opponent controls; destroy it.' },
        attack2Name: { ja: '', en: '' },
        attack2Damage: '',
        attack2Desc: { ja: '', en: '' },
        flavorText: { ja: '深淵の闇からの使者。', en: 'A messenger from the deepest darkness.' },
        presetArtId: 'dark-knight',
    },
    {
        id: 'holy-seraph',
        nameJa: '天使テンプレ',
        nameEn: 'Holy Seraph',
        icon: '👼',
        style: 'mana',
        typeId: 'white',
        cardName: { ja: '大天使セラフィナ', en: 'Seraphina, Archangel' },
        cardHP: '150',
        cardATK: '2000',
        cardDEF: '3000',
        cardMana: '4',
        cardPower: '4/5',
        attack1Name: { ja: '飛行、守備、絆', en: 'Flying, Vigilance, Lifelink' },
        attack1Damage: '',
        attack1Desc: { ja: 'このクリーチャーが攻撃するたび、2点のライフを得る。', en: 'Whenever this creature attacks, you gain 2 life.' },
        attack2Name: { ja: '', en: '' },
        attack2Damage: '',
        attack2Desc: { ja: '', en: '' },
        flavorText: { ja: '大空を舞う光の使者。', en: 'A messenger of light dancing in the sky.' },
        presetArtId: 'holy-angel',
    },
    {
        id: 'deep-sea',
        nameJa: '深海の帝王テンプレ',
        nameEn: 'Deep Sea Emperor',
        icon: '🦬',
        style: 'pocket',
        typeId: 'water',
        cardName: { ja: '深海王クラーケン', en: 'Kraken, Emperor of the Deep' },
        cardHP: '180',
        cardATK: '2800',
        cardDEF: '2400',
        cardMana: '6',
        cardPower: '5/5',
        attack1Name: { ja: '茂る波浪', en: 'Tidal Wave' },
        attack1Damage: '60',
        attack1Desc: { ja: '相手のベンチポケモンにもそれぞれ20ダメージ。', en: 'Also do 20 damage to each of opponent\'s Benched Pokemon.' },
        attack2Name: { ja: 'アビスの特異点', en: 'Abyss Singularity' },
        attack2Damage: '120',
        attack2Desc: { ja: '次のターン、このポケモンはワザを使えない。', en: 'This Pokemon can\'t use attacks during your next turn.' },
        flavorText: { ja: '深海から全てを飲み込む者。', en: 'The one who swallows all from the deep sea.' },
        presetArtId: 'water-kraken',
    },
];

const translations = {
    ja: {
        title: 'カードジェネレーター',
        'style.pocket': 'ポケット風',
        'style.duel': 'デュエル風',
        'style.mana': 'マナ風',
        'input.title': 'カード情報入力',
        'input.upload': '画像をドラッグ＆ドロップ\nまたはクリックして選択',
        'input.name': 'カード名',
        'input.hp': 'HP',
        'input.atk': 'ATK',
        'input.def': 'DEF',
        'input.mana': 'マナコスト',
        'input.power': 'パワー/タフネス',
        'input.type': '属性タイプ',
        'input.attack1Name': '技/効果1 名前',
        'input.attack1Damage': 'ダメージ',
        'input.attack1Desc': '説明',
        'input.attack2Name': '技/効果2 名前',
        'input.attack2Damage': 'ダメージ',
        'input.attack2Desc': '説明',
        'input.flavor': 'フレーバーテキスト',
        'input.dragHint': '📌 画像をドラッグして位置調整',
        'action.download': '画像を保存',
        'action.share': 'SNSで共有',
        'ad.space': '広告スペース',
        'howto.title': '使い方',
        'input.presets': 'プリセットから選ぶ',
        'history.title': '作成履歴',
        'history.save': '履歴に保存',
        'history.empty': '履歴はまだありません。',
        'history.restore': '復元',
        'template.title': 'テンプレート',
        'template.use': 'このテンプレを使用',
    },
    en: {
        title: 'Card Generator',
        'style.pocket': 'Pocket Style',
        'style.duel': 'Duel Style',
        'style.mana': 'Mana Style',
        'input.title': 'Card Information',
        'input.upload': 'Drag & Drop Image\nor Click to Select',
        'input.name': 'Card Name',
        'input.hp': 'HP',
        'input.atk': 'ATK',
        'input.def': 'DEF',
        'input.mana': 'Mana Cost',
        'input.power': 'Power/Toughness',
        'input.type': 'Type',
        'input.attack1Name': 'Attack/Effect 1',
        'input.attack1Damage': 'Damage',
        'input.attack1Desc': 'Description',
        'input.attack2Name': 'Attack/Effect 2',
        'input.attack2Damage': 'Damage',
        'input.attack2Desc': 'Description',
        'input.flavor': 'Flavor Text',
        'input.dragHint': '📌 Drag image to adjust position',
        'action.download': 'Download PNG',
        'action.share': 'Share to SNS',
        'ad.space': 'Ad Space',
        'howto.title': 'How to Use',
        'input.presets': 'Select Preset Art',
        'history.title': 'Recent History',
        'history.save': 'Save to History',
        'history.empty': 'No history yet.',
        'history.restore': 'Restore',
        'template.title': 'Templates',
        'template.use': 'Use Template',
    },
};

export default function TCGPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [lang, setLang] = useState<Language>('ja');
    const [style, setStyle] = useState<CardStyle>('pocket');
    const [currentType, setCurrentType] = useState<string>('grass');
    const [uploadedImage, setUploadedImage] = useState<HTMLImageElement | null>(null);
    const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

    // Form state
    const [cardName, setCardName] = useState('');
    const [cardHP, setCardHP] = useState('100');
    const [cardATK, setCardATK] = useState('1500');
    const [cardDEF, setCardDEF] = useState('1200');
    const [cardMana, setCardMana] = useState('3');
    const [cardPower, setCardPower] = useState('3/3');
    const [attack1Name, setAttack1Name] = useState('');
    const [attack1Damage, setAttack1Damage] = useState('30');
    const [attack1Desc, setAttack1Desc] = useState('');
    const [attack2Name, setAttack2Name] = useState('');
    const [attack2Damage, setAttack2Damage] = useState('80');
    const [attack2Desc, setAttack2Desc] = useState('');
    const [flavorText, setFlavorText] = useState('');
    const [history, setHistory] = useState<HistoryItem[]>([]);
    const [currentPresetId, setCurrentPresetId] = useState<string | undefined>(undefined);

    const t = translations[lang];
    const styleConfig = cardStyles[style];

    // Load history on mount
    useEffect(() => {
        const savedHistory = localStorage.getItem('saison-lab-tcg-history');
        if (savedHistory) {
            try {
                setHistory(JSON.parse(savedHistory));
            } catch (e) {
                console.error('Failed to parse history', e);
            }
        }
    }, []);

    // Apply defaults when style or language changes
    useEffect(() => {
        const defaults = styleDefaults[style][lang];
        setCardName(defaults.cardName);
        setAttack1Name(defaults.attack1Name);
        setAttack1Desc(defaults.attack1Desc);
        setAttack2Name(defaults.attack2Name);
        setAttack2Desc(defaults.attack2Desc);
        setFlavorText(defaults.flavorText);
        setCurrentType(styleConfig.types[0].id);
        setImageOffset({ x: 0, y: 0 });
    }, [style, lang, styleConfig.types]);

    // Save history to localStorage
    const saveHistoryToLocal = (newHistory: HistoryItem[]) => {
        localStorage.setItem('saison-lab-tcg-history', JSON.stringify(newHistory));
    };

    const saveToHistory = () => {
        const newItem: HistoryItem = {
            id: Math.random().toString(36).substr(2, 9),
            timestamp: Date.now(),
            style,
            typeId: currentType,
            cardName,
            cardHP,
            cardATK,
            cardDEF,
            cardMana,
            cardPower,
            attack1Name,
            attack1Damage,
            attack1Desc,
            attack2Name,
            attack2Damage,
            attack2Desc,
            flavorText,
            presetArtId: currentPresetId
        };
        const newHistory = [newItem, ...history].slice(0, 10); // Keep last 10
        setHistory(newHistory);
        saveHistoryToLocal(newHistory);
    };

    const removeFromHistory = (id: string) => {
        const newHistory = history.filter(item => item.id !== id);
        setHistory(newHistory);
        saveHistoryToLocal(newHistory);
    };

    const loadFromHistory = (item: HistoryItem) => {
        setStyle(item.style);
        setCurrentType(item.typeId);
        setCardName(item.cardName);
        setCardHP(item.cardHP);
        setCardATK(item.cardATK);
        setCardDEF(item.cardDEF);
        setCardMana(item.cardMana);
        setCardPower(item.cardPower);
        setAttack1Name(item.attack1Name);
        setAttack1Damage(item.attack1Damage);
        setAttack1Desc(item.attack1Desc);
        setAttack2Name(item.attack2Name);
        setAttack2Damage(item.attack2Damage);
        setAttack2Desc(item.attack2Desc);
        setFlavorText(item.flavorText);

        if (item.presetArtId) {
            const preset = presetArtworks.find(p => p.id === item.presetArtId);
            if (preset) handlePresetSelect(preset.src);
            setCurrentPresetId(item.presetArtId);
        }
    };

    // 意図: テンプレートを読み込み
    const loadTemplate = (template: CardTemplate) => {
        setStyle(template.style);
        setCurrentType(template.typeId);
        setCardName(template.cardName[lang]);
        setCardHP(template.cardHP);
        setCardATK(template.cardATK);
        setCardDEF(template.cardDEF);
        setCardMana(template.cardMana);
        setCardPower(template.cardPower);
        setAttack1Name(template.attack1Name[lang]);
        setAttack1Damage(template.attack1Damage);
        setAttack1Desc(template.attack1Desc[lang]);
        setAttack2Name(template.attack2Name[lang]);
        setAttack2Damage(template.attack2Damage);
        setAttack2Desc(template.attack2Desc[lang]);
        setFlavorText(template.flavorText[lang]);

        if (template.presetArtId) {
            const preset = presetArtworks.find(p => p.id === template.presetArtId);
            if (preset) handlePresetSelect(preset.src);
            setCurrentPresetId(template.presetArtId);
        }
    };

    const getTypeInfo = useCallback((typeId: string): TypeInfo => {
        return styleConfig.types.find(t => t.id === typeId) || styleConfig.types[0];
    }, [styleConfig.types]);

    // Draw card
    const drawCard = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const width = canvas.width;
        const height = canvas.height;
        ctx.clearRect(0, 0, width, height);

        const typeInfo = getTypeInfo(currentType);

        const roundRect = (x: number, y: number, w: number, h: number, r: number) => {
            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);
            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
        };

        const drawImageWithOffset = (img: HTMLImageElement, x: number, y: number, w: number, h: number, radius: number) => {
            const scale = Math.max(w / img.width, h / img.height);
            const scaledW = img.width * scale;
            const scaledH = img.height * scale;
            const drawX = x + (w - scaledW) / 2 + imageOffset.x;
            const drawY = y + (h - scaledH) / 2 + imageOffset.y;
            ctx.save();
            roundRect(x, y, w, h, radius);
            ctx.clip();
            ctx.drawImage(img, drawX, drawY, scaledW, scaledH);
            ctx.restore();
        };

        const wrapText = (text: string, x: number, y: number, maxWidth: number, lineHeight: number) => {
            if (!text) return;
            const chars = text.split('');
            let line = '';
            let currentY = y;
            for (let i = 0; i < chars.length; i++) {
                const testLine = line + chars[i];
                if (ctx.measureText(testLine).width > maxWidth && i > 0) {
                    ctx.fillText(line, x, currentY);
                    line = chars[i];
                    currentY += lineHeight;
                } else {
                    line = testLine;
                }
            }
            ctx.fillText(line, x, currentY);
        };

        if (style === 'pocket') {
            // Pokemon card
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, typeInfo.gradient[0]);
            gradient.addColorStop(1, typeInfo.gradient[1]);
            ctx.fillStyle = gradient;
            roundRect(0, 0, width, height, 40);
            ctx.fill();

            const goldGrad = ctx.createLinearGradient(0, 0, width, height);
            goldGrad.addColorStop(0, '#FFD700');
            goldGrad.addColorStop(0.5, '#FFA500');
            goldGrad.addColorStop(1, '#FFD700');
            ctx.fillStyle = goldGrad;
            roundRect(20, 20, width - 40, height - 40, 35);
            ctx.fill();

            ctx.fillStyle = '#FFFEF0';
            roundRect(35, 35, width - 70, height - 70, 30);
            ctx.fill();

            ctx.fillStyle = '#F8F8F8';
            roundRect(50, 50, width - 100, 60, 15);
            ctx.fill();

            ctx.fillStyle = '#E8E8E8';
            roundRect(50, 130, width - 100, 400, 15);
            ctx.fill();

            if (uploadedImage) {
                drawImageWithOffset(uploadedImage, 55, 135, width - 110, 390, 12);
            } else {
                ctx.fillStyle = '#999';
                ctx.font = '24px Roboto, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(lang === 'ja' ? '画像をアップロード' : 'Upload Image', width / 2, 330);
            }

            ctx.fillStyle = '#000';
            ctx.font = 'bold 44px Oswald, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(cardName || 'Card Name', 65, 88);

            ctx.font = '36px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(typeInfo.icon, width - 65, 88);

            ctx.fillStyle = '#D32F2F';
            ctx.font = 'bold 38px Oswald, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`HP ${cardHP || '100'}`, width - 100, 88);

            ctx.fillStyle = '#FAFAFA';
            roundRect(50, 545, width - 100, 280, 15);
            ctx.fill();

            ctx.font = '24px Arial';
            ctx.textAlign = 'left';
            ctx.fillText(typeInfo.icon, 70, 578);

            ctx.fillStyle = '#000';
            ctx.font = 'bold 28px Roboto, sans-serif';
            ctx.fillText(attack1Name || 'Attack 1', 110, 575);

            ctx.font = 'bold 32px Oswald, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(attack1Damage || '', width - 65, 575);

            ctx.font = '18px Roboto, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillStyle = '#333';
            wrapText(attack1Desc || '', 75, 605, width - 145, 26);

            ctx.font = '20px Arial';
            ctx.fillText(typeInfo.icon, 70, 695);
            ctx.fillText(typeInfo.icon, 95, 695);

            ctx.fillStyle = '#000';
            ctx.font = 'bold 28px Roboto, sans-serif';
            ctx.fillText(attack2Name || 'Attack 2', 130, 695);

            ctx.font = 'bold 32px Oswald, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(attack2Damage || '', width - 65, 695);

            ctx.font = '18px Roboto, sans-serif';
            ctx.fillStyle = '#333';
            ctx.textAlign = 'left';
            wrapText(attack2Desc || '', 75, 725, width - 145, 26);

            ctx.strokeStyle = '#D0D0D0';
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(65, 845);
            ctx.lineTo(width - 65, 845);
            ctx.stroke();

            ctx.fillStyle = '#555';
            ctx.font = 'italic 17px Roboto, sans-serif';
            wrapText(flavorText || '', 70, 875, width - 140, 24);

            ctx.fillStyle = '#F0F0F0';
            roundRect(50, height - 95, width - 100, 55, 12);
            ctx.fill();

            ctx.fillStyle = '#666';
            ctx.font = '16px Roboto, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Pocket Monster Style Card 2026', width / 2, height - 60);
        } else if (style === 'duel') {
            // Yu-Gi-Oh style card
            ctx.fillStyle = '#7B5A2F';
            roundRect(0, 0, width, height, 20);
            ctx.fill();

            ctx.fillStyle = '#E8D4A8';
            roundRect(12, 12, width - 24, height - 24, 15);
            ctx.fill();

            ctx.fillStyle = '#5C4827';
            roundRect(30, 30, width - 60, 60, 10);
            ctx.fill();

            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 38px Oswald, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(cardName || 'Monster Name', 50, 70);

            ctx.font = '40px Arial';
            ctx.textAlign = 'right';
            ctx.fillText(typeInfo.icon, width - 50, 70);

            ctx.fillStyle = '#5C4827';
            roundRect(40, 110, width - 80, 420, 10);
            ctx.fill();

            if (uploadedImage) {
                drawImageWithOffset(uploadedImage, 50, 120, width - 100, 400, 8);
            } else {
                ctx.fillStyle = '#999';
                ctx.font = '24px Roboto, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(lang === 'ja' ? '画像をアップロード' : 'Upload Image', width / 2, 320);
            }

            ctx.font = '28px Arial';
            ctx.textAlign = 'right';
            const level = Math.min(12, Math.max(1, Math.floor(parseInt(cardATK || '1500') / 500)));
            let stars = '';
            for (let i = 0; i < level; i++) stars += '⭐';
            ctx.fillText(stars, width - 50, 560);

            ctx.fillStyle = '#F5E6C8';
            roundRect(40, 580, width - 80, 320, 10);
            ctx.fill();
            ctx.strokeStyle = '#5C4827';
            ctx.lineWidth = 2;
            roundRect(40, 580, width - 80, 320, 10);
            ctx.stroke();

            ctx.fillStyle = '#333';
            ctx.font = 'bold 20px Roboto, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`[${lang === 'ja' ? typeInfo.nameJa : typeInfo.nameEn}]`, 60, 610);

            ctx.font = '18px Roboto, sans-serif';
            ctx.fillStyle = '#333';
            wrapText(attack1Desc || 'Card effect goes here.', 60, 650, width - 120, 26);

            ctx.font = 'italic 16px Roboto, sans-serif';
            ctx.fillStyle = '#666';
            wrapText(flavorText || '', 60, 780, width - 120, 22);

            ctx.fillStyle = '#000';
            ctx.font = 'bold 28px Oswald, sans-serif';
            ctx.textAlign = 'right';
            ctx.fillText(`ATK/${cardATK || '1500'}  DEF/${cardDEF || '1200'}`, width - 60, 930);

            ctx.fillStyle = '#666';
            ctx.font = '14px Roboto, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Duel Monsters Style Card 2026', width / 2, height - 30);
        } else if (style === 'mana') {
            // MTG style card
            const gradient = ctx.createLinearGradient(0, 0, width, height);
            gradient.addColorStop(0, typeInfo.gradient[0]);
            gradient.addColorStop(1, typeInfo.gradient[1]);
            ctx.fillStyle = gradient;
            roundRect(0, 0, width, height, 30);
            ctx.fill();

            ctx.fillStyle = '#1a1a1a';
            roundRect(20, 20, width - 40, height - 40, 25);
            ctx.fill();

            ctx.fillStyle = typeInfo.gradient[0];
            roundRect(30, 30, width - 60, height - 60, 20);
            ctx.fill();

            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            roundRect(45, 45, width - 90, 55, 12);
            ctx.fill();

            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 32px Oswald, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(cardName || 'Creature Name', 60, 82);

            const mana = cardMana || '3';
            ctx.fillStyle = '#888';
            ctx.beginPath();
            ctx.arc(width - 75, 72, 18, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 20px Oswald, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(mana, width - 75, 79);

            ctx.fillStyle = '#333';
            roundRect(50, 120, width - 100, 380, 12);
            ctx.fill();

            if (uploadedImage) {
                drawImageWithOffset(uploadedImage, 55, 125, width - 110, 370, 10);
            } else {
                ctx.fillStyle = '#999';
                ctx.font = '24px Roboto, sans-serif';
                ctx.textAlign = 'center';
                ctx.fillText(lang === 'ja' ? '画像をアップロード' : 'Upload Image', width / 2, 310);
            }

            ctx.fillStyle = 'rgba(0,0,0,0.7)';
            roundRect(50, 520, width - 100, 45, 10);
            ctx.fill();

            ctx.fillStyle = '#FFF';
            ctx.font = '22px Roboto, sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(`Creature — ${lang === 'ja' ? typeInfo.nameJa : typeInfo.nameEn}`, 70, 550);

            ctx.font = '26px Arial';
            ctx.textAlign = 'right';
            ctx.fillText(typeInfo.icon, width - 70, 550);

            ctx.fillStyle = '#F5F0E1';
            roundRect(50, 580, width - 100, 320, 12);
            ctx.fill();

            ctx.fillStyle = '#333';
            ctx.font = '20px Roboto, sans-serif';
            ctx.textAlign = 'left';
            wrapText(attack1Desc || 'Card ability text.', 70, 620, width - 140, 28);

            ctx.font = 'italic 18px Roboto, sans-serif';
            ctx.fillStyle = '#666';
            wrapText(flavorText || '', 70, 760, width - 140, 24);

            ctx.fillStyle = 'rgba(0,0,0,0.8)';
            roundRect(width - 140, height - 120, 100, 50, 10);
            ctx.fill();

            ctx.fillStyle = '#FFF';
            ctx.font = 'bold 28px Oswald, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(cardPower || '3/3', width - 90, height - 85);

            ctx.fillStyle = 'rgba(0,0,0,0.6)';
            roundRect(50, height - 65, width - 100, 35, 8);
            ctx.fill();

            ctx.fillStyle = '#AAA';
            ctx.font = '14px Roboto, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('Mana Wars Style Card 2026', width / 2, height - 40);
        }
    }, [style, currentType, uploadedImage, imageOffset, lang, cardName, cardHP, cardATK, cardDEF, cardMana, cardPower, attack1Name, attack1Damage, attack1Desc, attack2Name, attack2Damage, attack2Desc, flavorText, getTypeInfo]);

    useEffect(() => {
        drawCard();
    }, [drawCard]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (ev) => {
                const img = new window.Image();
                img.onload = () => {
                    setUploadedImage(img);
                    setImageOffset({ x: 0, y: 0 });
                    setCurrentPresetId(undefined);
                };
                img.src = ev.target?.result as string;
            };
            reader.readAsDataURL(file);
        }
    };

    // Load preset artwork
    const handlePresetSelect = (src: string) => {
        const img = new window.Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            setUploadedImage(img);
            setImageOffset({ x: 0, y: 0 });
            setCurrentPresetId(presetArtworks.find(p => p.src === src)?.id);
        };
        img.src = src;
    };

    const handleDownload = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Use toDataURL for better broad support and easier filename control in a single flow
        try {
            const dataUrl = canvas.toDataURL('image/png');
            const fileName = `${cardName || 'card'}-${style}.png`.replace(/[\\\/:*?"<>|]/g, ''); // Basic filename sanitization

            const link = document.createElement('a');
            link.download = fileName;
            link.href = dataUrl;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (err) {
            console.error('Download failed:', err);
            // Fallback to Blob if DataURL fails
            canvas.toBlob((blob) => {
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `${cardName || 'card'}-${style}.png`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    URL.revokeObjectURL(url);
                }
            }, 'image/png');
        }
    };

    const handleShare = async () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        if (navigator.share) {
            try {
                canvas.toBlob(async (blob) => {
                    if (blob) {
                        const file = new File([blob], 'custom-card.png', { type: 'image/png' });
                        await navigator.share({ title: 'Custom Card', text: `#CardMaker #${style} #CustomCard`, files: [file] });
                    }
                }, 'image/png');
            } catch {
                console.log('Share cancelled');
            }
        } else {
            alert(lang === 'ja' ? '共有機能非対応です。ダウンロードをお使いください。' : 'Sharing not supported. Please use download.');
        }
    };

    // Canvas drag handling
    const handleCanvasMouseDown = (e: React.MouseEvent) => {
        if (uploadedImage) {
            setIsDragging(true);
            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };

    const handleCanvasMouseMove = (e: React.MouseEvent) => {
        if (isDragging && uploadedImage) {
            const dx = e.clientX - dragStart.x;
            const dy = e.clientY - dragStart.y;
            setImageOffset(prev => ({ x: prev.x + dx, y: prev.y + dy }));
            setDragStart({ x: e.clientX, y: e.clientY });
        }
    };

    const handleCanvasMouseUp = () => {
        setIsDragging(false);
    };

    return (
        <div className="tcg-bg min-h-screen">
            {/* Header */}
            <header className="bg-[rgba(255,255,255,0.1)] backdrop-blur-lg border-b border-[rgba(255,255,255,0.2)] px-4 md:px-6 py-4 shadow-lg">
                <div className="max-w-[1400px] mx-auto flex justify-between items-center flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                        {/* Home link - Card themed */}
                        <a
                            href="https://saison-lab.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 rounded-lg flex items-center justify-center transition-all shadow-lg hover:shadow-yellow-400/30"
                            title={lang === 'ja' ? 'ホーム' : 'Home'}
                        >
                            <span className="text-lg">🎴</span>
                        </a>
                        <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent" style={{ fontFamily: 'Oswald, sans-serif' }}>
                            {t.title}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {(['pocket', 'duel', 'mana'] as const).map((s) => (
                            <button
                                key={s}
                                onClick={() => setStyle(s)}
                                className={`px-3 py-2 rounded-full text-sm font-semibold transition-all ${style === s ? 'bg-gradient-to-r from-yellow-400 to-yellow-300 text-gray-800 border-yellow-400' : 'bg-[rgba(255,255,255,0.15)] text-white border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.25)]'} border`}
                            >
                                {t[`style.${s}` as keyof typeof t]}
                            </button>
                        ))}
                        <button
                            onClick={() => setLang(lang === 'ja' ? 'en' : 'ja')}
                            className="px-3 py-2 rounded-full text-sm font-semibold bg-[rgba(255,255,255,0.15)] text-white border border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.25)] transition-all"
                        >
                            🌐 {lang === 'ja' ? 'EN' : '日本語'}
                        </button>
                    </div>
                </div>
            </header>

            {/* Ad placeholder */}
            <div className="max-w-[1400px] mx-auto my-6 px-4">
                <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center text-[rgba(255,255,255,0.6)] text-sm">
                    📢 {t['ad.space']} (728x90 or Responsive Banner)
                </div>
            </div>

            {/* Main content */}
            <div className="max-w-[1400px] mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Input area */}
                <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur border border-[rgba(255,255,255,0.2)] rounded-2xl p-6 shadow-xl animate-fadeIn">
                    <h2 className="text-xl md:text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
                        📝 {t['input.title']}
                    </h2>

                    {/* Upload zone */}
                    <label className="block border-3 border-dashed border-[rgba(255,255,255,0.2)] rounded-2xl p-8 text-center cursor-pointer hover:border-yellow-400 hover:bg-[rgba(255,215,0,0.1)] transition-all mb-4 bg-[rgba(255,255,255,0.05)]">
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                        <div className="text-4xl mb-2">🖼️</div>
                        <div className="text-white whitespace-pre-line">{t['input.upload']}</div>
                        {uploadedImage && (
                            <img src={uploadedImage.src} alt="Preview" className="max-h-[150px] mx-auto mt-4 rounded-xl" />
                        )}
                    </label>

                    {/* Preset artwork selection */}
                    <div className="mb-6">
                        <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-3">
                            ✨ {t['input.presets']}
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {presetArtworks.map((preset) => (
                                <button
                                    key={preset.id}
                                    onClick={() => handlePresetSelect(preset.src)}
                                    className="group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent hover:border-yellow-400 transition-all hover:scale-105"
                                >
                                    <img
                                        src={preset.src}
                                        alt={lang === 'ja' ? preset.nameJa : preset.nameEn}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <span className="text-white text-xs font-bold text-center px-1">
                                            {preset.icon} {lang === 'ja' ? preset.nameJa : preset.nameEn}
                                        </span>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Template selection */}
                    <div className="mb-6">
                        <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-3">
                            📋 {t['template.title']}
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {cardTemplates.map((template) => (
                                <button
                                    key={template.id}
                                    onClick={() => loadTemplate(template)}
                                    className="group flex items-center gap-2 p-3 rounded-lg bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] hover:border-yellow-400 hover:bg-[rgba(255,215,0,0.1)] transition-all text-left"
                                >
                                    <span className="text-2xl">{template.icon}</span>
                                    <div>
                                        <div className="text-white text-sm font-bold">
                                            {lang === 'ja' ? template.nameJa : template.nameEn}
                                        </div>
                                        <div className="text-[10px] text-[rgba(255,255,255,0.5)] uppercase">
                                            {template.style}
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Form fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.name']}</label>
                            <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 focus:bg-[rgba(255,255,255,0.15)] transition-all" />
                        </div>

                        {styleConfig.showHP && (
                            <div>
                                <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.hp']}</label>
                                <input type="number" value={cardHP} onChange={(e) => setCardHP(e.target.value)} min="10" max="9999" className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all" />
                            </div>
                        )}

                        {styleConfig.showATK && (
                            <div>
                                <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.atk']}</label>
                                <input type="number" value={cardATK} onChange={(e) => setCardATK(e.target.value)} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all" />
                            </div>
                        )}

                        {styleConfig.showDEF && (
                            <div>
                                <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.def']}</label>
                                <input type="number" value={cardDEF} onChange={(e) => setCardDEF(e.target.value)} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all" />
                            </div>
                        )}

                        {styleConfig.showMana && (
                            <div>
                                <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.mana']}</label>
                                <input type="text" value={cardMana} onChange={(e) => setCardMana(e.target.value)} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all" />
                            </div>
                        )}

                        {styleConfig.showPower && (
                            <div>
                                <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.power']}</label>
                                <input type="text" value={cardPower} onChange={(e) => setCardPower(e.target.value)} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all" />
                            </div>
                        )}

                        {/* Type selector */}
                        <div>
                            <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.type']}</label>
                            <div className="grid grid-cols-3 gap-2">
                                {styleConfig.types.map((type) => (
                                    <button
                                        key={type.id}
                                        onClick={() => setCurrentType(type.id)}
                                        className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all flex items-center justify-center gap-1 ${currentType === type.id ? 'ring-2 ring-white scale-105' : ''}`}
                                        style={{
                                            background: `linear-gradient(135deg, ${type.gradient[0]}, ${type.gradient[1]})`,
                                            color: ['electric', 'psychic', 'steel', 'normal', 'light', 'white', 'colorless'].includes(type.id) ? '#333' : '#fff',
                                        }}
                                    >
                                        <span>{type.icon}</span>
                                        <span>{lang === 'ja' ? type.nameJa : type.nameEn}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.attack1Name']}</label>
                            <input type="text" value={attack1Name} onChange={(e) => setAttack1Name(e.target.value)} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all" />
                        </div>

                        {styleConfig.showDamage && (
                            <div>
                                <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.attack1Damage']}</label>
                                <input type="text" value={attack1Damage} onChange={(e) => setAttack1Damage(e.target.value)} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all" />
                            </div>
                        )}

                        <div>
                            <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.attack1Desc']}</label>
                            <textarea value={attack1Desc} onChange={(e) => setAttack1Desc(e.target.value)} rows={3} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all resize-y" />
                        </div>

                        {styleConfig.showAttack2 && (
                            <>
                                <div>
                                    <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.attack2Name']}</label>
                                    <input type="text" value={attack2Name} onChange={(e) => setAttack2Name(e.target.value)} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all" />
                                </div>

                                {styleConfig.showDamage && (
                                    <div>
                                        <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.attack2Damage']}</label>
                                        <input type="text" value={attack2Damage} onChange={(e) => setAttack2Damage(e.target.value)} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all" />
                                    </div>
                                )}

                                <div>
                                    <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.attack2Desc']}</label>
                                    <textarea value={attack2Desc} onChange={(e) => setAttack2Desc(e.target.value)} rows={3} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all resize-y" />
                                </div>
                            </>
                        )}

                        <div>
                            <label className="block text-[rgba(255,255,255,0.8)] text-sm font-semibold uppercase tracking-wide mb-2">{t['input.flavor']}</label>
                            <textarea value={flavorText} onChange={(e) => setFlavorText(e.target.value)} rows={3} className="w-full px-4 py-3 bg-[rgba(255,255,255,0.1)] border border-[rgba(255,255,255,0.2)] rounded-lg text-white focus:outline-none focus:border-yellow-400 transition-all resize-y" />
                        </div>
                    </div>
                </div>

                {/* Preview area */}
                <div className="flex flex-col items-center justify-start lg:sticky lg:top-4 animate-fadeIn">
                    <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur border border-[rgba(255,255,255,0.2)] rounded-2xl p-6 shadow-xl flex justify-center items-center w-full">
                        <canvas
                            ref={canvasRef}
                            width={750}
                            height={1050}
                            className="rounded-2xl shadow-2xl max-w-full h-auto cursor-grab"
                            onMouseDown={handleCanvasMouseDown}
                            onMouseMove={handleCanvasMouseMove}
                            onMouseUp={handleCanvasMouseUp}
                            onMouseLeave={handleCanvasMouseUp}
                        />
                    </div>
                    {uploadedImage && (
                        <p className="text-[rgba(255,255,255,0.6)] text-sm mt-2">{t['input.dragHint']}</p>
                    )}
                </div>
            </div>

            {/* Action buttons */}
            <div className="max-w-[1400px] mx-auto px-4 flex gap-4 justify-center flex-wrap mb-8">
                <button
                    onClick={handleDownload}
                    className="px-8 py-4 rounded-xl text-white font-bold uppercase tracking-wider shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl bg-gradient-to-r from-pink-500 to-rose-500"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                    💾 {t['action.download']}
                </button>
                <button
                    onClick={handleShare}
                    className="px-8 py-4 rounded-xl text-white font-bold uppercase tracking-wider shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl bg-gradient-to-r from-cyan-400 to-cyan-300"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                    🔗 {t['action.share']}
                </button>
                <button
                    onClick={saveToHistory}
                    className="px-8 py-4 rounded-xl text-white font-bold uppercase tracking-wider shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl bg-gradient-to-r from-emerald-500 to-teal-500"
                    style={{ fontFamily: 'Oswald, sans-serif' }}
                >
                    📜 {t['history.save']}
                </button>
            </div>

            {/* History Section */}
            <div className="max-w-[1400px] mx-auto px-4 mb-12 animate-fadeIn">
                <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    🕐 {t['history.title']}
                </h2>
                {history.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {history.map((item) => (
                            <div key={item.id} className="bg-[rgba(255,255,255,0.1)] backdrop-blur border border-[rgba(255,255,255,0.2)] rounded-xl p-3 relative group hover:border-yellow-400 transition-all">
                                <div className="flex flex-col items-center gap-2">
                                    <div className="text-3xl">
                                        {item.presetArtId ? presetArtworks.find(p => p.id === item.presetArtId)?.icon : '👤'}
                                    </div>
                                    <div className="text-white text-sm font-bold truncate w-full text-center">
                                        {item.cardName}
                                    </div>
                                    <div className="text-[rgba(255,255,255,0.5)] text-[10px]">
                                        {new Date(item.timestamp).toLocaleDateString()}
                                    </div>
                                    <button
                                        onClick={() => loadFromHistory(item)}
                                        className="mt-2 w-full py-1.5 bg-[rgba(255,255,255,0.15)] hover:bg-yellow-400 hover:text-gray-900 text-white text-[10px] font-bold rounded transition-all"
                                    >
                                        {t['history.restore']}
                                    </button>
                                </div>
                                <button
                                    onClick={() => removeFromHistory(item.id)}
                                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center shadow-lg"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-[rgba(255,255,255,0.4)] py-8 border-2 border-dashed border-[rgba(255,255,255,0.1)] rounded-2xl">
                        {t['history.empty']}
                    </div>
                )}
            </div>

            {/* How to Use section */}
            <div className="max-w-[1400px] mx-auto px-4 mb-8">
                <h2 className="text-xl md:text-2xl font-bold text-white text-center mb-6" style={{ fontFamily: 'Oswald, sans-serif' }}>
                    📖 {t['howto.title']}
                </h2>
                <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur border border-[rgba(255,255,255,0.2)] rounded-2xl p-4 md:p-6 shadow-xl flex justify-center overflow-hidden">
                    <img
                        src={lang === 'ja' ? `/images/usage_guide.png` : `/images/usage_guide_en.png`}
                        alt={lang === 'ja' ? '使い方ガイド' : 'Usage Guide'}
                        className="w-full h-auto rounded-xl shadow-lg object-contain"
                        style={{ maxWidth: '100%' }}
                    />
                </div>
            </div>

            {/* Ad placeholder */}
            <div className="max-w-[1400px] mx-auto my-6 px-4">
                <div className="bg-[rgba(255,255,255,0.1)] backdrop-blur border-2 border-dashed border-[rgba(255,255,255,0.2)] rounded-xl p-6 text-center text-[rgba(255,255,255,0.6)] text-sm">
                    📢 {t['ad.space']} (728x90 or 300x250)
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-[rgba(255,255,255,0.1)] backdrop-blur border-t border-[rgba(255,255,255,0.2)] py-6 mt-12">
                <div className="max-w-[1400px] mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        {/* Home link */}
                        <a
                            href="https://saison-lab.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[rgba(255,255,255,0.6)] hover:text-white transition-colors"
                        >
                            <span>🏠</span>
                            <span className="text-sm">{lang === 'ja' ? 'ポータルに戻る' : 'Back to Portal'}</span>
                        </a>

                        {/* Copyright */}
                        <p className="text-[rgba(255,255,255,0.4)] text-xs order-last md:order-none">
                            © 2026 Saison Lab. All rights reserved.
                        </p>

                        {/* X (Twitter) follow link */}
                        <a
                            href="https://x.com/saisonlab"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-[rgba(255,255,255,0.6)] hover:text-white transition-colors"
                        >
                            <span className="text-sm">{lang === 'ja' ? 'フォローする' : 'Follow us'}</span>
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
