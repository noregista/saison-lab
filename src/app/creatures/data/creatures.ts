// 151 Fictional Creatures for Unmapped Pokédex
export interface Creature {
    id: number;
    name: { en: string; jp: string };
    category: { en: string; jp: string };
    types: string[];
    height: string;
    weight: string;
    ability: { en: string; jp: string };
    description: { en: string; jp: string };
    stats: {
        integrity: number;
        impact: number;
        resistance: number;
        energy: number;
        stability: number;
        agility: number;
    };
    color: string;
}

// Type colors
export const typeColors: Record<string, string> = {
    grass: '#22c55e',
    fire: '#ef4444',
    water: '#3b82f6',
    electric: '#facc15',
    normal: '#a8a29e',
    psychic: '#ec4899',
    flying: '#93c5fd',
    bug: '#84cc16',
    poison: '#a855f7',
    ground: '#d97706',
    rock: '#78716c',
    ghost: '#7c3aed',
    ice: '#67e8f9',
    dragon: '#6366f1',
    fairy: '#f9a8d4',
};

// Base 30 hand-crafted creatures
export const creatures: Creature[] = [
    { id: 1, name: { en: "Seedling", jp: "タネモチ" }, category: { en: "Seed Creature", jp: "たねポケモン" }, types: ["grass"], height: "0.3m", weight: "2.5kg", ability: { en: "Overgrow", jp: "しんりょく" }, description: { en: "A tiny creature with a seed on its back. It loves to bask in sunlight and grows a little each day.", jp: "背中に小さな種を持つ生物。日光浴が大好きで、毎日少しずつ成長する。" }, stats: { integrity: 45, impact: 49, resistance: 49, energy: 65, stability: 65, agility: 45 }, color: "#78c850" },
    { id: 2, name: { en: "Sproutlet", jp: "フタバネ" }, category: { en: "Sprout Creature", jp: "ふたばポケモン" }, types: ["grass"], height: "0.6m", weight: "8.0kg", ability: { en: "Overgrow", jp: "しんりょく" }, description: { en: "As the seed sprouts, it gains two leaves that can absorb more sunlight.", jp: "種から芽が出て、2枚の葉で日光をより多く吸収できるようになった。" }, stats: { integrity: 60, impact: 62, resistance: 63, energy: 80, stability: 80, agility: 60 }, color: "#78c850" },
    { id: 3, name: { en: "Florabeast", jp: "ハナザウルス" }, category: { en: "Flower Creature", jp: "はなポケモン" }, types: ["grass", "poison"], height: "1.2m", weight: "45.0kg", ability: { en: "Overgrow", jp: "しんりょく" }, description: { en: "A beautiful flower blooms on its back, releasing a sweet fragrance that calms all around.", jp: "背中に美しい花が咲き、周囲を落ち着かせる甘い香りを放つ。" }, stats: { integrity: 80, impact: 82, resistance: 83, energy: 100, stability: 100, agility: 80 }, color: "#78c850" },
    { id: 4, name: { en: "Embercub", jp: "ヒノコ" }, category: { en: "Flame Creature", jp: "ひのこポケモン" }, types: ["fire"], height: "0.4m", weight: "4.0kg", ability: { en: "Blaze", jp: "もうか" }, description: { en: "A playful fox cub with a tiny flame at the tip of its tail. Very curious and energetic.", jp: "尻尾の先に小さな炎を灯す子狐。とても好奇心旺盛で元気いっぱい。" }, stats: { integrity: 39, impact: 52, resistance: 43, energy: 60, stability: 50, agility: 65 }, color: "#f08030" },
    { id: 5, name: { en: "Blazefox", jp: "キツネビ" }, category: { en: "Fox Creature", jp: "きつねポケモン" }, types: ["fire"], height: "0.8m", weight: "15.0kg", ability: { en: "Blaze", jp: "もうか" }, description: { en: "Its flame grows stronger and can now warm those around it on cold nights.", jp: "炎が強くなり、寒い夜に周囲を温められるようになった。" }, stats: { integrity: 58, impact: 64, resistance: 58, energy: 80, stability: 65, agility: 80 }, color: "#f08030" },
    { id: 6, name: { en: "Infernine", jp: "ゴウカギツネ" }, category: { en: "Blaze Creature", jp: "ごうかポケモン" }, types: ["fire", "flying"], height: "1.4m", weight: "40.0kg", ability: { en: "Blaze", jp: "もうか" }, description: { en: "Legends say its flames can light up the darkest caves. A loyal and brave companion.", jp: "その炎は最も暗い洞窟をも照らすという伝説がある。忠実で勇敢な仲間。" }, stats: { integrity: 78, impact: 84, resistance: 78, energy: 109, stability: 85, agility: 100 }, color: "#f08030" },
    { id: 7, name: { en: "Aquadrop", jp: "ミズタマ" }, category: { en: "Droplet Creature", jp: "しずくポケモン" }, types: ["water"], height: "0.3m", weight: "3.0kg", ability: { en: "Torrent", jp: "げきりゅう" }, description: { en: "A translucent creature made mostly of water. It bounces around happily in the rain.", jp: "ほとんど水でできた半透明の生物。雨の中を楽しそうに跳ね回る。" }, stats: { integrity: 44, impact: 48, resistance: 65, energy: 50, stability: 64, agility: 43 }, color: "#6890f0" },
    { id: 8, name: { en: "Wavepup", jp: "ナミイヌ" }, category: { en: "Wave Creature", jp: "なみポケモン" }, types: ["water"], height: "0.7m", weight: "12.0kg", ability: { en: "Torrent", jp: "げきりゅう" }, description: { en: "It loves to play in waves and can hold its breath for a very long time.", jp: "波の中で遊ぶのが大好きで、とても長い間息を止められる。" }, stats: { integrity: 59, impact: 63, resistance: 80, energy: 65, stability: 80, agility: 58 }, color: "#6890f0" },
    { id: 9, name: { en: "Oceantide", jp: "オオカイリュウ" }, category: { en: "Sea Creature", jp: "うみポケモン" }, types: ["water"], height: "1.5m", weight: "85.0kg", ability: { en: "Torrent", jp: "げきりゅう" }, description: { en: "A majestic sea creature that guides lost sailors back to shore.", jp: "迷った船乗りを岸まで導く、威厳ある海の生物。" }, stats: { integrity: 79, impact: 83, resistance: 100, energy: 85, stability: 105, agility: 78 }, color: "#6890f0" },
    { id: 10, name: { en: "Sparkbit", jp: "ビリビリ" }, category: { en: "Static Creature", jp: "せいでんきポケモン" }, types: ["electric"], height: "0.2m", weight: "1.5kg", ability: { en: "Static", jp: "せいでんき" }, description: { en: "A tiny ball of static electricity. It makes your hair stand up when nearby.", jp: "静電気の小さなボール。近くにいると髪が逆立つ。" }, stats: { integrity: 35, impact: 55, resistance: 40, energy: 70, stability: 50, agility: 90 }, color: "#f8d030" },
    { id: 11, name: { en: "Boltbunny", jp: "デンキウサギ" }, category: { en: "Thunder Creature", jp: "かみなりポケモン" }, types: ["electric"], height: "0.5m", weight: "8.0kg", ability: { en: "Static", jp: "せいでんき" }, description: { en: "Its ears act as lightning rods, absorbing electricity from the air.", jp: "耳が避雷針の役割を果たし、空気中の電気を吸収する。" }, stats: { integrity: 55, impact: 75, resistance: 55, energy: 90, stability: 60, agility: 110 }, color: "#f8d030" },
    { id: 12, name: { en: "Thunderhare", jp: "ライジンウサギ" }, category: { en: "Storm Creature", jp: "らいでんポケモン" }, types: ["electric"], height: "1.0m", weight: "25.0kg", ability: { en: "Static", jp: "せいでんき" }, description: { en: "Can summon small thunderstorms when happy. Loves to race through fields.", jp: "嬉しい時に小さな雷雨を呼び出せる。野原を駆け回るのが大好き。" }, stats: { integrity: 75, impact: 95, resistance: 70, energy: 110, stability: 75, agility: 130 }, color: "#f8d030" },
    { id: 13, name: { en: "Fluffpuff", jp: "モフモフ" }, category: { en: "Fluffy Creature", jp: "ふわふわポケモン" }, types: ["normal"], height: "0.3m", weight: "2.0kg", ability: { en: "Cute Charm", jp: "メロメロボディ" }, description: { en: "An incredibly soft and fluffy creature. Just looking at it makes you want to hug it.", jp: "信じられないほど柔らかくてふわふわした生物。見ているだけで抱きしめたくなる。" }, stats: { integrity: 40, impact: 35, resistance: 45, energy: 40, stability: 50, agility: 60 }, color: "#a8a878" },
    { id: 14, name: { en: "Cuddlecloud", jp: "クモワタ" }, category: { en: "Cloud Creature", jp: "くもポケモン" }, types: ["normal", "flying"], height: "0.6m", weight: "5.0kg", ability: { en: "Fluffy", jp: "もふもふ" }, description: { en: "It floats gently like a cloud and loves to nap on warm afternoons.", jp: "雲のようにふわふわ浮かび、暖かい午後に昼寝するのが大好き。" }, stats: { integrity: 65, impact: 55, resistance: 65, energy: 65, stability: 75, agility: 80 }, color: "#a8a878" },
    { id: 15, name: { en: "Dreampillow", jp: "ユメマクラ" }, category: { en: "Dream Creature", jp: "ゆめポケモン" }, types: ["normal", "psychic"], height: "1.0m", weight: "15.0kg", ability: { en: "Dream World", jp: "ゆめのせかい" }, description: { en: "Sleeping near it guarantees pleasant dreams. It eats nightmares.", jp: "そばで眠ると必ず良い夢を見られる。悪夢を食べてくれる。" }, stats: { integrity: 95, impact: 65, resistance: 85, energy: 95, stability: 110, agility: 50 }, color: "#a8a878" },
    { id: 16, name: { en: "Puddleslime", jp: "ミズドロ" }, category: { en: "Puddle Creature", jp: "みずたまりポケモン" }, types: ["water", "poison"], height: "0.2m", weight: "1.0kg", ability: { en: "Gooey", jp: "ぬめぬめ" }, description: { en: "A cute slime that forms in rain puddles. Surprisingly clean despite its appearance.", jp: "雨の水たまりに生まれるかわいいスライム。見た目に反して意外と清潔。" }, stats: { integrity: 30, impact: 30, resistance: 40, energy: 40, stability: 35, agility: 50 }, color: "#a040a0" },
    { id: 17, name: { en: "Jellywobble", jp: "プルプルン" }, category: { en: "Jelly Creature", jp: "ゼリーポケモン" }, types: ["water", "poison"], height: "0.5m", weight: "8.0kg", ability: { en: "Gooey", jp: "ぬめぬめ" }, description: { en: "Its body wobbles when it moves, making a funny sound that makes everyone laugh.", jp: "動くと体がぷるぷる揺れ、みんなを笑わせる面白い音を出す。" }, stats: { integrity: 55, impact: 50, resistance: 60, energy: 70, stability: 55, agility: 65 }, color: "#a040a0" },
    { id: 18, name: { en: "Slimeking", jp: "スライムオウ" }, category: { en: "Royal Slime", jp: "おうさまポケモン" }, types: ["water", "poison"], height: "1.2m", weight: "30.0kg", ability: { en: "Gooey", jp: "ぬめぬめ" }, description: { en: "The ruler of all slimes. Its crown is made of crystallized water.", jp: "全てのスライムの王。王冠は結晶化した水でできている。" }, stats: { integrity: 85, impact: 75, resistance: 90, energy: 100, stability: 85, agility: 70 }, color: "#a040a0" },
    { id: 19, name: { en: "Pebblet", jp: "コイシ" }, category: { en: "Pebble Creature", jp: "こいしポケモン" }, types: ["rock"], height: "0.2m", weight: "5.0kg", ability: { en: "Sturdy", jp: "がんじょう" }, description: { en: "A living pebble that rolls around playfully. Very hard to damage.", jp: "遊び心で転がる生きた小石。とても傷つきにくい。" }, stats: { integrity: 40, impact: 45, resistance: 80, energy: 30, stability: 40, agility: 30 }, color: "#b8a038" },
    { id: 20, name: { en: "Boulderbaby", jp: "イワッコ" }, category: { en: "Boulder Creature", jp: "がんせきポケモン" }, types: ["rock", "ground"], height: "0.6m", weight: "35.0kg", ability: { en: "Sturdy", jp: "がんじょう" }, description: { en: "Loves to sunbathe on mountain slopes. Makes a grinding sound when happy.", jp: "山の斜面で日光浴するのが大好き。嬉しい時にゴリゴリと音を出す。" }, stats: { integrity: 65, impact: 70, resistance: 110, energy: 50, stability: 65, agility: 40 }, color: "#b8a038" },
    { id: 21, name: { en: "Mountaineer", jp: "ヤマノカミ" }, category: { en: "Mountain Creature", jp: "さんがくポケモン" }, types: ["rock", "ground"], height: "1.8m", weight: "200.0kg", ability: { en: "Sturdy", jp: "がんじょう" }, description: { en: "An ancient being said to protect travelers crossing dangerous mountain paths.", jp: "危険な山道を渡る旅人を守ると言われる古代の存在。" }, stats: { integrity: 100, impact: 100, resistance: 150, energy: 75, stability: 100, agility: 45 }, color: "#b8a038" },
    { id: 22, name: { en: "Breezelet", jp: "ソヨカゼ" }, category: { en: "Breeze Creature", jp: "そよかぜポケモン" }, types: ["flying"], height: "0.3m", weight: "0.5kg", ability: { en: "Gust", jp: "かぜおこし" }, description: { en: "A gentle spirit of the wind. It plays with leaves and flower petals.", jp: "風の穏やかな精霊。葉っぱや花びらと遊ぶ。" }, stats: { integrity: 35, impact: 40, resistance: 35, energy: 50, stability: 40, agility: 85 }, color: "#a890f0" },
    { id: 23, name: { en: "Galebird", jp: "ハヤテドリ" }, category: { en: "Gale Creature", jp: "しっぷうポケモン" }, types: ["flying", "normal"], height: "0.7m", weight: "10.0kg", ability: { en: "Speed Boost", jp: "かそく" }, description: { en: "Can fly faster than the eye can see. Loves racing with the wind.", jp: "目にも止まらぬ速さで飛べる。風と競争するのが大好き。" }, stats: { integrity: 55, impact: 65, resistance: 50, energy: 60, stability: 50, agility: 110 }, color: "#a890f0" },
    { id: 24, name: { en: "Stormwing", jp: "アラシバネ" }, category: { en: "Storm Creature", jp: "あらしポケモン" }, types: ["flying", "electric"], height: "1.5m", weight: "40.0kg", ability: { en: "Storm Surge", jp: "らんきりゅう" }, description: { en: "Creates small tornados with its powerful wings. Appears before storms.", jp: "強力な翼で小さな竜巻を起こす。嵐の前に現れる。" }, stats: { integrity: 80, impact: 90, resistance: 70, energy: 95, stability: 75, agility: 125 }, color: "#a890f0" },
    { id: 25, name: { en: "Leafbug", jp: "コノハムシ" }, category: { en: "Leaf Creature", jp: "このはポケモン" }, types: ["bug", "grass"], height: "0.2m", weight: "1.0kg", ability: { en: "Camouflage", jp: "へんしょく" }, description: { en: "Masters of disguise. They look exactly like leaves and love to surprise friends.", jp: "変装の達人。葉っぱそっくりで、友達を驚かせるのが大好き。" }, stats: { integrity: 35, impact: 45, resistance: 40, energy: 45, stability: 50, agility: 70 }, color: "#a8b820" },
    { id: 26, name: { en: "Twighopper", jp: "エダトビ" }, category: { en: "Twig Creature", jp: "こえだポケモン" }, types: ["bug", "grass"], height: "0.5m", weight: "5.0kg", ability: { en: "Leaf Guard", jp: "リーフガード" }, description: { en: "Hops from branch to branch with incredible precision. Very playful.", jp: "信じられない正確さで枝から枝へ跳ぶ。とても遊び好き。" }, stats: { integrity: 55, impact: 65, resistance: 55, energy: 65, stability: 60, agility: 95 }, color: "#a8b820" },
    { id: 27, name: { en: "Forestmantis", jp: "モリカマキリ" }, category: { en: "Forest Creature", jp: "しんりんポケモン" }, types: ["bug", "grass"], height: "1.2m", weight: "25.0kg", ability: { en: "Swarm", jp: "むしのしらせ" }, description: { en: "Guardian of the forest. It moves silently through the trees, protecting nature.", jp: "森の守護者。木々の間を静かに移動し、自然を守る。" }, stats: { integrity: 75, impact: 95, resistance: 75, energy: 85, stability: 80, agility: 105 }, color: "#a8b820" },
    { id: 28, name: { en: "Ghostling", jp: "ユウレイコ" }, category: { en: "Spirit Creature", jp: "おばけポケモン" }, types: ["ghost"], height: "0.3m", weight: "0.1kg", ability: { en: "Levitate", jp: "ふゆう" }, description: { en: "A baby ghost that just wants to play. Not scary at all, actually quite cute!", jp: "遊びたいだけの赤ちゃんお化け。全然怖くなく、実はとてもかわいい！" }, stats: { integrity: 30, impact: 35, resistance: 30, energy: 60, stability: 50, agility: 85 }, color: "#705898" },
    { id: 29, name: { en: "Spectrumfriend", jp: "ナカヨシゴースト" }, category: { en: "Friendly Ghost", jp: "なかよしポケモン" }, types: ["ghost", "fairy"], height: "0.7m", weight: "0.5kg", ability: { en: "Cute Charm", jp: "メロメロボディ" }, description: { en: "This ghost loves making friends. Its hugs feel like a cool breeze.", jp: "友達を作るのが大好きなお化け。抱きしめると涼しい風のよう。" }, stats: { integrity: 55, impact: 55, resistance: 55, energy: 90, stability: 80, agility: 100 }, color: "#705898" },
    { id: 30, name: { en: "Hauntsworth", jp: "ダイゴースト" }, category: { en: "Noble Ghost", jp: "きぞくポケモン" }, types: ["ghost", "psychic"], height: "1.5m", weight: "1.0kg", ability: { en: "Cursed Body", jp: "のろわれボディ" }, description: { en: "A noble spirit from an ancient castle. Very polite and loves tea parties.", jp: "古城から来た高貴な精霊。とても礼儀正しく、お茶会が大好き。" }, stats: { integrity: 75, impact: 85, resistance: 75, energy: 120, stability: 100, agility: 95 }, color: "#705898" },
];

// Generate remaining 121 creatures
const typesList = ['grass', 'fire', 'water', 'electric', 'normal', 'psychic', 'flying', 'bug', 'poison', 'ground', 'rock', 'ghost', 'ice', 'dragon', 'fairy'];
const namePartsEn = ['Star', 'Moon', 'Sun', 'Cloud', 'Mist', 'Spark', 'Frost', 'Bloom', 'Crystal', 'Shadow', 'Light', 'Dream', 'Wish', 'Hope', 'Joy', 'Candy', 'Berry', 'Honey', 'Sugar', 'Petal'];
const nameEndingsEn = ['kit', 'pup', 'ling', 'bit', 'drop', 'fluff', 'wing', 'tail', 'paw', 'bell', 'charm', 'heart', 'sprite', 'wisp', 'bunny'];
const namePartsJp = ['ホシ', 'ツキ', 'ヒカリ', 'クモ', 'キリ', 'キラ', 'コオリ', 'ハナ', 'スイ', 'カゲ', 'ヒカ', 'ユメ', 'ネガイ', 'キボウ', 'ウレシ', 'アメ', 'ベリ', 'ミツ', 'サト', 'ハナビラ'];
const nameEndingsJp = ['コ', 'チビ', 'ン', 'マル', 'タマ', 'フワ', 'ハネ', 'テイル', 'パウ', 'リン', 'チャーム', 'ハート', 'スプライト', 'ウィスプ', 'ウサ'];
const categoriesEn = ['Tiny Creature', 'Small Creature', 'Cute Creature', 'Gentle Creature', 'Playful Creature', 'Cheerful Creature', 'Magical Creature', 'Mysterious Creature', 'Fluffy Creature', 'Sparkle Creature'];
const categoriesJp = ['ちびっこポケモン', 'こがたポケモン', 'かわいいポケモン', 'やさしいポケモン', 'あそびポケモン', 'げんきポケモン', 'まほうポケモン', 'ふしぎポケモン', 'ふわふわポケモン', 'きらきらポケモン'];
const abilitiesEn = ['Cute Charm', 'Friend Guard', 'Healer', 'Serene Grace', 'Magic Guard', 'Synchronize', 'Natural Cure', 'Regenerator', 'Adaptability', 'Pixilate'];
const abilitiesJp = ['メロメロボディ', 'フレンドガード', 'いやしのこころ', 'てんのめぐみ', 'マジックガード', 'シンクロ', 'しぜんかいふく', 'さいせいりょく', 'てきおうりょく', 'フェアリースキン'];

for (let i = 31; i <= 151; i++) {
    const seed = i * 1337;
    const type1 = typesList[i % 15];
    const type2 = (i % 3 === 0) ? typesList[(i + 5) % 15] : null;
    const height = ((seed % 20) / 10 + 0.2).toFixed(1) + 'm';
    const weight = ((seed % 500) / 10 + 1).toFixed(1) + 'kg';

    creatures.push({
        id: i,
        name: {
            en: namePartsEn[i % 20] + nameEndingsEn[i % 15],
            jp: namePartsJp[i % 20] + nameEndingsJp[i % 15]
        },
        category: {
            en: categoriesEn[i % 10],
            jp: categoriesJp[i % 10]
        },
        types: type2 ? [type1, type2] : [type1],
        height,
        weight,
        ability: {
            en: abilitiesEn[i % 10],
            jp: abilitiesJp[i % 10]
        },
        description: {
            en: `A ${type2 ? type1 + '/' + type2 : type1} type creature with a gentle and curious nature. It loves to explore and make new friends.`,
            jp: `${type2 ? type1 + '/' + type2 : type1}タイプの優しくて好奇心旺盛な生物。探検したり、新しい友達を作るのが大好き。`
        },
        stats: {
            integrity: 40 + (seed % 80),
            impact: 35 + (seed % 85),
            resistance: 40 + (seed % 80),
            energy: 45 + (seed % 90),
            stability: 40 + (seed % 80),
            agility: 50 + (seed % 100)
        },
        color: typeColors[type1]
    });
}
