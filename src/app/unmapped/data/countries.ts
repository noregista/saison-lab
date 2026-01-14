// 200 Fictional Countries Data for "Unmapped Memories"
export type Country = {
    id: string;
    name: { en: string; jp: string };
    population: string;
    area: string;
    specialty: { en: string; jp: string };
    exports: { en: string; jp: string };
    taboo: { en: string; jp: string };
    lifespan: { en: string; jp: string };
    region: 'europe' | 'asia' | 'africa' | 'americas' | 'oceania';
};

export const countries: Country[] = [
    { id: "c001", name: { en: "The Hollow Republic", jp: "虚ろなる共和国" }, population: "8,432,001 (unverified)", area: "142,300 km²", specialty: { en: "Fossilized Whispers", jp: "化石化した囁き" }, exports: { en: "Old Dreams", jp: "古い夢" }, taboo: { en: "Never look at mirrors after dusk", jp: "夕暮れ後に鏡を見るな" }, lifespan: { en: "14,000 days (variable)", jp: "14,000日（変動あり）" }, region: "europe" },
    { id: "c002", name: { en: "Ashveil Dominion", jp: "灰霧の領地" }, population: "3,201,445", area: "89,100 km²", specialty: { en: "Silence Harvesting", jp: "沈黙の収穫" }, exports: { en: "Bottled Regrets", jp: "瓶詰めの後悔" }, taboo: { en: "Do not speak your birth name aloud", jp: "生まれた名を声に出すな" }, lifespan: { en: "12,775 days", jp: "12,775日" }, region: "europe" },
    { id: "c003", name: { en: "Murmur Isles", jp: "囁きの諸島" }, population: "892,334", area: "15,600 km²", specialty: { en: "Echo Fishing", jp: "残響漁" }, exports: { en: "Crystallized Tears", jp: "結晶化した涙" }, taboo: { en: "Never count the waves", jp: "波を数えてはならない" }, lifespan: { en: "9,125 days", jp: "9,125日" }, region: "oceania" },
    { id: "c004", name: { en: "Thornwick Empire", jp: "茨棘帝国" }, population: "22,501,000", area: "445,000 km²", specialty: { en: "Memory Extraction", jp: "記憶抽出" }, exports: { en: "Forgotten Names", jp: "忘れられた名前" }, taboo: { en: "Children must not smile until age 7", jp: "子供は7歳まで笑ってはならない" }, lifespan: { en: "18,250 days", jp: "18,250日" }, region: "europe" },
    { id: "c005", name: { en: "Velken States", jp: "ヴェルケン諸州" }, population: "5,677,889", area: "201,400 km²", specialty: { en: "Shadow Weaving", jp: "影織り" }, exports: { en: "Unspoken Words", jp: "語られなかった言葉" }, taboo: { en: "Avoid eye contact with the elderly", jp: "老人と目を合わせるな" }, lifespan: { en: "11,680 days", jp: "11,680日" }, region: "americas" },
    { id: "c006", name: { en: "Duskholm Federation", jp: "黄昏郷連邦" }, population: "4,123,556", area: "178,900 km²", specialty: { en: "Twilight Preservation", jp: "薄暮の保存" }, exports: { en: "Expired Promises", jp: "期限切れの約束" }, taboo: { en: "Never sleep facing north", jp: "北を向いて眠るな" }, lifespan: { en: "13,505 days", jp: "13,505日" }, region: "europe" },
    { id: "c007", name: { en: "Pale Reaches", jp: "蒼白の果て" }, population: "1,002,112", area: "312,000 km²", specialty: { en: "Bone Carving", jp: "骨彫刻" }, exports: { en: "Ancestral Dust", jp: "先祖の塵" }, taboo: { en: "Do not bury the dead before midnight", jp: "真夜中前に死者を埋葬するな" }, lifespan: { en: "10,950 days", jp: "10,950日" }, region: "asia" },
    { id: "c008", name: { en: "Grimshore Collective", jp: "暗礁の集合体" }, population: "2,334,567", area: "67,800 km²", specialty: { en: "Fog Harvesting", jp: "霧の収穫" }, exports: { en: "Diluted Memories", jp: "薄められた記憶" }, taboo: { en: "Photographs steal fragments of the soul", jp: "写真は魂の欠片を奪う" }, lifespan: { en: "15,330 days", jp: "15,330日" }, region: "europe" },
    { id: "c009", name: { en: "Cindervast Territory", jp: "燼広の領土" }, population: "6,789,012", area: "289,500 km²", specialty: { en: "Ash Agriculture", jp: "灰農業" }, exports: { en: "Echoes of Laughter", jp: "笑い声の残響" }, taboo: { en: "Never celebrate birthdays after 40", jp: "40歳を過ぎたら誕生日を祝うな" }, lifespan: { en: "14,600 days", jp: "14,600日" }, region: "africa" },
    { id: "c010", name: { en: "Stillwater Concord", jp: "静水の協定" }, population: "3,456,789", area: "134,200 km²", specialty: { en: "Drowned Sound Recovery", jp: "溺れた音の回収" }, exports: { en: "Submerged Secrets", jp: "沈んだ秘密" }, taboo: { en: "Do not drink water at noon", jp: "正午に水を飲むな" }, lifespan: { en: "12,045 days", jp: "12,045日" }, region: "asia" },
    { id: "c011", name: { en: "Voidmark Principality", jp: "虚印公国" }, population: "987,654", area: "45,600 km²", specialty: { en: "Absence Mapping", jp: "不在の地図作成" }, exports: { en: "Missing Hours", jp: "失われた時間" }, taboo: { en: "Clocks must never show 3:33", jp: "時計は3時33分を示してはならない" }, lifespan: { en: "8,760 days", jp: "8,760日" }, region: "europe" },
    { id: "c012", name: { en: "Rothenwald Kingdom", jp: "朽森王国" }, population: "11,234,567", area: "356,700 km²", specialty: { en: "Decay Cultivation", jp: "腐敗栽培" }, exports: { en: "Molded Prayers", jp: "黴びた祈り" }, taboo: { en: "Trees must not be cut after autumn", jp: "秋以降に木を切るな" }, lifespan: { en: "16,425 days", jp: "16,425日" }, region: "europe" },
    { id: "c013", name: { en: "Bleakfall Union", jp: "荒落連合" }, population: "4,567,890", area: "223,400 km²", specialty: { en: "Gravity Anomalies", jp: "重力異常" }, exports: { en: "Weighted Sorrows", jp: "重い悲しみ" }, taboo: { en: "Never look up during rainfall", jp: "雨の日に空を見上げるな" }, lifespan: { en: "13,140 days", jp: "13,140日" }, region: "americas" },
    { id: "c014", name: { en: "Wraithmoor Duchy", jp: "幽霧公爵領" }, population: "2,109,876", area: "98,700 km²", specialty: { en: "Ghost Cultivation", jp: "幽霊栽培" }, exports: { en: "Borrowed Lives", jp: "借りた命" }, taboo: { en: "Never speak ill of the disappeared", jp: "消えた者の悪口を言うな" }, lifespan: { en: "11,315 days", jp: "11,315日" }, region: "europe" },
    { id: "c015", name: { en: "Ironveil Confederacy", jp: "鉄幕連合" }, population: "7,890,123", area: "267,800 km²", specialty: { en: "Rust Alchemy", jp: "錆の錬金術" }, exports: { en: "Corroded Hopes", jp: "腐食した希望" }, taboo: { en: "Metal objects must be blessed weekly", jp: "金属は毎週祝福を受けよ" }, lifespan: { en: "14,235 days", jp: "14,235日" }, region: "asia" },
    { id: "c016", name: { en: "Shadebrook Realm", jp: "陰溪の王国" }, population: "3,210,987", area: "145,600 km²", specialty: { en: "Darkness Distillation", jp: "闇の蒸留" }, exports: { en: "Condensed Nightmares", jp: "凝縮した悪夢" }, taboo: { en: "Candles must never be blown out", jp: "蝋燭を吹き消すな" }, lifespan: { en: "10,585 days", jp: "10,585日" }, region: "europe" },
    { id: "c017", name: { en: "Frostbitten Accord", jp: "凍傷の協定" }, population: "1,543,210", area: "412,000 km²", specialty: { en: "Frozen Time Harvesting", jp: "凍った時間の収穫" }, exports: { en: "Crystallized Moments", jp: "結晶化した瞬間" }, taboo: { en: "Never thaw ice before dawn", jp: "夜明け前に氷を溶かすな" }, lifespan: { en: "9,855 days", jp: "9,855日" }, region: "europe" },
    { id: "c018", name: { en: "Mistral Sovereignty", jp: "密風主権" }, population: "5,432,109", area: "189,300 km²", specialty: { en: "Wind Memory Capture", jp: "風の記憶捕獲" }, exports: { en: "Whispered Curses", jp: "囁かれた呪い" }, taboo: { en: "Do not open windows during storms", jp: "嵐の間は窓を開けるな" }, lifespan: { en: "12,410 days", jp: "12,410日" }, region: "africa" },
    { id: "c019", name: { en: "Vesperland", jp: "夕星の地" }, population: "6,543,210", area: "234,500 km²", specialty: { en: "Dusk Energy Collection", jp: "黄昏エネルギー収集" }, exports: { en: "Fading Light", jp: "消えゆく光" }, taboo: { en: "Never greet the setting sun", jp: "沈む太陽に挨拶するな" }, lifespan: { en: "13,870 days", jp: "13,870日" }, region: "americas" },
    { id: "c020", name: { en: "Crypthold Territories", jp: "墓所領" }, population: "4,321,098", area: "167,800 km²", specialty: { en: "Underground Preservation", jp: "地下保存" }, exports: { en: "Grave Whispers", jp: "墓の囁き" }, taboo: { en: "The dead must be spoken to daily", jp: "死者には毎日話しかけよ" }, lifespan: { en: "15,695 days", jp: "15,695日" }, region: "europe" },
    { id: "c021", name: { en: "Sorrowfen Republic", jp: "悲沼共和国" }, population: "2,987,654", area: "112,400 km²", specialty: { en: "Tear Collection", jp: "涙の収集" }, exports: { en: "Liquid Grief", jp: "液状の悲嘆" }, taboo: { en: "Smiling at funerals extends mourning", jp: "葬儀で笑うと喪が延びる" }, lifespan: { en: "10,220 days", jp: "10,220日" }, region: "asia" },
    { id: "c022", name: { en: "Thornback Dominion", jp: "棘背の領地" }, population: "8,765,432", area: "298,700 km²", specialty: { en: "Pain Cultivation", jp: "痛みの栽培" }, exports: { en: "Refined Suffering", jp: "精製された苦しみ" }, taboo: { en: "Wounds must not be bandaged before sunset", jp: "日没前に傷を包帯するな" }, lifespan: { en: "14,965 days", jp: "14,965日" }, region: "africa" },
    { id: "c023", name: { en: "Greymarch States", jp: "灰行進諸州" }, population: "5,678,901", area: "201,300 km²", specialty: { en: "Monotone Production", jp: "単調色生産" }, exports: { en: "Drained Colors", jp: "抜き取られた色彩" }, taboo: { en: "Bright colors attract misfortune", jp: "派手な色は不幸を呼ぶ" }, lifespan: { en: "12,775 days", jp: "12,775日" }, region: "europe" },
    { id: "c024", name: { en: "Hollowspire Empire", jp: "虚尖帝国" }, population: "15,432,109", area: "534,200 km²", specialty: { en: "Void Architecture", jp: "虚空建築" }, exports: { en: "Empty Spaces", jp: "空虚な空間" }, taboo: { en: "Buildings must have no fourth floor", jp: "建物に四階を設けるな" }, lifespan: { en: "17,520 days", jp: "17,520日" }, region: "asia" },
    { id: "c025", name: { en: "Withervale Commune", jp: "枯谷公社" }, population: "1,876,543", area: "87,600 km²", specialty: { en: "Decay Acceleration", jp: "腐敗促進" }, exports: { en: "Aged Innocence", jp: "老いた無垢" }, taboo: { en: "Fresh flowers are forbidden indoors", jp: "生花を屋内に置くな" }, lifespan: { en: "9,490 days", jp: "9,490日" }, region: "americas" },
    { id: "c026", name: { en: "Nightshade Federation", jp: "夜陰連邦" }, population: "4,098,765", area: "178,400 km²", specialty: { en: "Poison Gardening", jp: "毒の園芸" }, exports: { en: "Refined Venom", jp: "精製された毒" }, taboo: { en: "Never eat meals in silence", jp: "沈黙の中で食事するな" }, lifespan: { en: "11,680 days", jp: "11,680日" }, region: "europe" },
    { id: "c027", name: { en: "Bleachbone Highlands", jp: "白骨高地" }, population: "987,123", area: "234,500 km²", specialty: { en: "Skeletal Mining", jp: "骨格採掘" }, exports: { en: "Purified Remains", jp: "浄化された遺骸" }, taboo: { en: "Bones must never touch soil directly", jp: "骨を土に直接触れさせるな" }, lifespan: { en: "8,395 days", jp: "8,395日" }, region: "africa" },
    { id: "c028", name: { en: "Murkdale Kingdom", jp: "濁谷王国" }, population: "6,234,567", area: "189,700 km²", specialty: { en: "Obscurity Farming", jp: "曖昧さの農業" }, exports: { en: "Blurred Certainties", jp: "ぼやけた確実性" }, taboo: { en: "Questions must end with silence", jp: "質問は沈黙で終えよ" }, lifespan: { en: "13,505 days", jp: "13,505日" }, region: "asia" },
    { id: "c029", name: { en: "Eventide Protectorate", jp: "夕闘護領" }, population: "3,456,123", area: "145,200 km²", specialty: { en: "Sunset Capture", jp: "日没の捕獲" }, exports: { en: "Dying Light Essence", jp: "死にゆく光の精髄" }, taboo: { en: "Never watch the sun set alone", jp: "一人で日没を見るな" }, lifespan: { en: "12,045 days", jp: "12,045日" }, region: "oceania" },
    { id: "c030", name: { en: "Ashenford Coalition", jp: "灰渡連合" }, population: "5,123,456", area: "212,300 km²", specialty: { en: "Cremation Services", jp: "火葬サービス" }, exports: { en: "Sacred Ash", jp: "聖なる灰" }, taboo: { en: "Fire must be kept burning in every home", jp: "各家庭に火を絶やすな" }, lifespan: { en: "14,235 days", jp: "14,235日" }, region: "europe" },
];

// Generate remaining 170 countries programmatically
const regions: Array<'europe' | 'asia' | 'africa' | 'americas' | 'oceania'> = ['europe', 'asia', 'africa', 'americas', 'oceania'];
const namesEn = ['Echohaven', 'Palewind', 'Cryptmoor', 'Voidstone', 'Ashwell', 'Dimmarch', 'Greyveil', 'Stillpeak', 'Darkfen', 'Coldhollow', 'Nightfall', 'Shadowdeep', 'Mistborn', 'Grimhold', 'Bleakshore', 'Fadewell', 'Lostmere', 'Silentwood', 'Hollowcrest', 'Murkvale'];
const namesJp = ['残響郷', '蒼風', '墓原', '虚石', '灰泉', '薄進', '灰帳', '静峰', '暗沼', '冷虚', '夜落', '影深', '霧生', '暗砦', '荒汀', '消泉', '迷湖', '静森', '虚頂', '濁谷'];
const suffixEn = ['Republic', 'Kingdom', 'Empire', 'Dominion', 'Federation', 'States', 'Protectorate', 'Confederacy', 'Union', 'Commune'];
const suffixJp = ['共和国', '王国', '帝国', '領地', '連邦', '諸州', '護領', '連合', '同盟', '公社'];
const taboosEn = ['Never whistle after dark', 'Do not count stars', 'Mirrors must be covered at night', 'Never say goodbye twice', 'Do not walk backwards', 'Never open umbrellas indoors', 'Do not step on shadows', 'Never speak during meals', 'Avoid the color red on Tuesdays', 'Never swim alone', 'Do not write names in red ink', 'Never sleep with feet facing doors', 'Do not use the word yesterday', 'Avoid even numbers', 'Never touch strangers'];
const taboosJp = ['日没後に口笛を吹くな', '星を数えるな', '夜は鏡を覆え', 'さよならを二度言うな', '後ろ向きに歩くな', '屋内で傘を開くな', '影を踏むな', '食事中に話すな', '火曜日に赤を避けよ', '一人で泳ぐな', '赤インクで名前を書くな', '扉に足を向けて眠るな', '昨日という言葉を使うな', '偶数を避けよ', '見知らぬ者に触れるな'];
const exportsEn = ['Distilled Silence', 'Frozen Screams', 'Liquid Shadows', 'Compressed Nightmares', 'Calcified Fears', 'Evaporated Joy', 'Petrified Laughter', 'Condensed Despair', 'Fermented Memories', 'Crystallized Doubt'];
const exportsJp = ['蒸留された沈黙', '凍った悲鳴', '液体の影', '圧縮された悪夢', '石灰化した恐怖', '蒸発した喜び', '石化した笑い', '濃縮された絶望', '発酵した記憶', '結晶化した疑念'];
const specsEn = ['Void Fishing', 'Dream Mining', 'Shadow Farming', 'Silence Brewing', 'Echo Trapping', 'Fog Weaving', 'Ash Sculpting', 'Bone Music', 'Dust Collecting', 'Mist Dancing'];
const specsJp = ['虚空漁', '夢採掘', '影農業', '沈黙醸造', '残響罠', '霧織', '灰彫刻', '骨音楽', '塵収集', '霧踊り'];

for (let i = 31; i <= 200; i++) {
    const seed = i * 1337;
    const pop = (500000 + (seed % 20000000)).toLocaleString();
    const area = (10000 + (seed % 500000)).toLocaleString();
    const life = 7000 + (seed % 10000);
    countries.push({
        id: `c${String(i).padStart(3, '0')}`,
        name: {
            en: `${namesEn[i % 20]} ${suffixEn[i % 10]}`,
            jp: `${namesJp[i % 20]}${suffixJp[i % 10]}`
        },
        population: pop + (i % 3 === 0 ? ' (disputed)' : ''),
        area: area + ' km²',
        specialty: { en: specsEn[i % 10], jp: specsJp[i % 10] },
        exports: { en: exportsEn[i % 10], jp: exportsJp[i % 10] },
        taboo: { en: taboosEn[i % 15], jp: taboosJp[i % 15] },
        lifespan: {
            en: life + ' days' + (i % 4 === 0 ? ' (declining)' : ''),
            jp: life + '日' + (i % 4 === 0 ? '（減少中）' : '')
        },
        region: regions[i % 5]
    });
}
