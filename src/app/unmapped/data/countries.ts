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
    { id: "c001", name: { en: "The Hollow Republic", jp: "ウツロナルキョウワコク" }, population: "8,432,001 (unverified)", area: "142,300 km²", specialty: { en: "Fossilized Whispers", jp: "カセキカシタササヤキ" }, exports: { en: "Old Dreams", jp: "フルイユメ" }, taboo: { en: "Never look at mirrors after dusk", jp: "ユウグレゴニカガミヲミルナ" }, lifespan: { en: "14,000 days (variable)", jp: "14,000日（ヘンドウアリ）" }, region: "europe" },
    { id: "c002", name: { en: "Ashveil Dominion", jp: "ハイギリノリョウチ" }, population: "3,201,445", area: "89,100 km²", specialty: { en: "Silence Harvesting", jp: "チンモクノシュウカク" }, exports: { en: "Bottled Regrets", jp: "ビンヅメノコウカイ" }, taboo: { en: "Do not speak your birth name aloud", jp: "ウマレタナヲコエニダスナ" }, lifespan: { en: "12,775 days", jp: "12,775日" }, region: "europe" },
    { id: "c003", name: { en: "Murmur Isles", jp: "ササヤキノショトウ" }, population: "892,334", area: "15,600 km²", specialty: { en: "Echo Fishing", jp: "ザンキョウリョウ" }, exports: { en: "Crystallized Tears", jp: "ケッショウカシタナミダ" }, taboo: { en: "Never count the waves", jp: "ナミヲカゾエテハナラナイ" }, lifespan: { en: "9,125 days", jp: "9,125日" }, region: "oceania" },
    { id: "c004", name: { en: "Thornwick Empire", jp: "イバラトゲテイコク" }, population: "22,501,000", area: "445,000 km²", specialty: { en: "Memory Extraction", jp: "キオクチュウシュツ" }, exports: { en: "Forgotten Names", jp: "ワスレラレタナマエ" }, taboo: { en: "Children must not smile until age 7", jp: "コドモハ7サイマデワラッテハナラナイ" }, lifespan: { en: "18,250 days", jp: "18,250日" }, region: "europe" },
    { id: "c005", name: { en: "Velken States", jp: "ヴェルケンショシュウ" }, population: "5,677,889", area: "201,400 km²", specialty: { en: "Shadow Weaving", jp: "カゲオリ" }, exports: { en: "Unspoken Words", jp: "カタラレナカッタコトバ" }, taboo: { en: "Avoid eye contact with the elderly", jp: "ロウジントメヲアワセルナ" }, lifespan: { en: "11,680 days", jp: "11,680日" }, region: "americas" },
    { id: "c006", name: { en: "Duskholm Federation", jp: "タソガレキョウレンポウ" }, population: "4,123,556", area: "178,900 km²", specialty: { en: "Twilight Preservation", jp: "ハクボノホゾン" }, exports: { en: "Expired Promises", jp: "キゲンギレノヤクソク" }, taboo: { en: "Never sleep facing north", jp: "キタヲムイテネムルナ" }, lifespan: { en: "13,505 days", jp: "13,505日" }, region: "europe" },
    { id: "c007", name: { en: "Pale Reaches", jp: "ソウハクノハテ" }, population: "1,002,112", area: "312,000 km²", specialty: { en: "Bone Carving", jp: "ホネチョウコク" }, exports: { en: "Ancestral Dust", jp: "センゾノチリ" }, taboo: { en: "Do not bury the dead before midnight", jp: "マヨナカマエニシシャヲマイソウスルナ" }, lifespan: { en: "10,950 days", jp: "10,950日" }, region: "asia" },
    { id: "c008", name: { en: "Grimshore Collective", jp: "アンショウノシュウゴウタイ" }, population: "2,334,567", area: "67,800 km²", specialty: { en: "Fog Harvesting", jp: "キリノシュウカク" }, exports: { en: "Diluted Memories", jp: "ウスメラレタキオク" }, taboo: { en: "Photographs steal fragments of the soul", jp: "シャシンハタマシイノカケラヲウバウ" }, lifespan: { en: "15,330 days", jp: "15,330日" }, region: "europe" },
    { id: "c009", name: { en: "Cindervast Territory", jp: "ジンコウノリョウド" }, population: "6,789,012", area: "289,500 km²", specialty: { en: "Ash Agriculture", jp: "ハイノウギョウ" }, exports: { en: "Echoes of Laughter", jp: "ワライゴエノザンキョウ" }, taboo: { en: "Never celebrate birthdays after 40", jp: "40サイヲスギタラタンジョウビヲイワウナ" }, lifespan: { en: "14,600 days", jp: "14,600日" }, region: "africa" },
    { id: "c010", name: { en: "Stillwater Concord", jp: "セイスイノキョウテイ" }, population: "3,456,789", area: "134,200 km²", specialty: { en: "Drowned Sound Recovery", jp: "オボレタオトノカイシュウ" }, exports: { en: "Submerged Secrets", jp: "シズンダヒミツ" }, taboo: { en: "Do not drink water at noon", jp: "ショウゴニミズヲノムナ" }, lifespan: { en: "12,045 days", jp: "12,045日" }, region: "asia" },
    { id: "c011", name: { en: "Voidmark Principality", jp: "キョインコウコク" }, population: "987,654", area: "45,600 km²", specialty: { en: "Absence Mapping", jp: "フザイノチズサクセイ" }, exports: { en: "Missing Hours", jp: "ウシナワレタジカン" }, taboo: { en: "Clocks must never show 3:33", jp: "トケイハ3ジ33フンヲシメシテハナラナイ" }, lifespan: { en: "8,760 days", jp: "8,760日" }, region: "europe" },
    { id: "c012", name: { en: "Rothenwald Kingdom", jp: "クチモリオウコク" }, population: "11,234,567", area: "356,700 km²", specialty: { en: "Decay Cultivation", jp: "フハイサイバイ" }, exports: { en: "Molded Prayers", jp: "カビタイノリ" }, taboo: { en: "Trees must not be cut after autumn", jp: "アキイコウニキヲキルナ" }, lifespan: { en: "16,425 days", jp: "16,425日" }, region: "europe" },
    { id: "c013", name: { en: "Bleakfall Union", jp: "コウラクレンゴウ" }, population: "4,567,890", area: "223,400 km²", specialty: { en: "Gravity Anomalies", jp: "ジュウリョクイジョウ" }, exports: { en: "Weighted Sorrows", jp: "オモイカナシミ" }, taboo: { en: "Never look up during rainfall", jp: "アメノヒニソラヲミアゲルナ" }, lifespan: { en: "13,140 days", jp: "13,140日" }, region: "americas" },
    { id: "c014", name: { en: "Wraithmoor Duchy", jp: "ユウムコウシャクリョウ" }, population: "2,109,876", area: "98,700 km²", specialty: { en: "Ghost Cultivation", jp: "ユウレイサイバイ" }, exports: { en: "Borrowed Lives", jp: "カリタイノチ" }, taboo: { en: "Never speak ill of the disappeared", jp: "キエタモノノワルグチヲイウナ" }, lifespan: { en: "11,315 days", jp: "11,315日" }, region: "europe" },
    { id: "c015", name: { en: "Ironveil Confederacy", jp: "テツマクレンゴウ" }, population: "7,890,123", area: "267,800 km²", specialty: { en: "Rust Alchemy", jp: "サビノレンキンジュツ" }, exports: { en: "Corroded Hopes", jp: "フショクシタキボウ" }, taboo: { en: "Metal objects must be blessed weekly", jp: "キンゾクハマイシュウシュクフクヲウケヨ" }, lifespan: { en: "14,235 days", jp: "14,235日" }, region: "asia" },
    { id: "c016", name: { en: "Shadebrook Realm", jp: "インケイノオウコク" }, population: "3,210,987", area: "145,600 km²", specialty: { en: "Darkness Distillation", jp: "ヤミノジョウリュウ" }, exports: { en: "Condensed Nightmares", jp: "ギョウシュクシタアクム" }, taboo: { en: "Candles must never be blown out", jp: "ロウソクヲフキケスナ" }, lifespan: { en: "10,585 days", jp: "10,585日" }, region: "europe" },
    { id: "c017", name: { en: "Frostbitten Accord", jp: "トウショウノキョウテイ" }, population: "1,543,210", area: "412,000 km²", specialty: { en: "Frozen Time Harvesting", jp: "コオッタジカンノシュウカク" }, exports: { en: "Crystallized Moments", jp: "ケッショウカシタシュンカン" }, taboo: { en: "Never thaw ice before dawn", jp: "ヨアケマエニコオリヲトカスナ" }, lifespan: { en: "9,855 days", jp: "9,855日" }, region: "europe" },
    { id: "c018", name: { en: "Mistral Sovereignty", jp: "ミップウシュケン" }, population: "5,432,109", area: "189,300 km²", specialty: { en: "Wind Memory Capture", jp: "カゼノキオクホカク" }, exports: { en: "Whispered Curses", jp: "ササヤカレタノロイ" }, taboo: { en: "Do not open windows during storms", jp: "アラシノアイダハマドヲアケルナ" }, lifespan: { en: "12,410 days", jp: "12,410日" }, region: "africa" },
    { id: "c019", name: { en: "Vesperland", jp: "ユウセイノチ" }, population: "6,543,210", area: "234,500 km²", specialty: { en: "Dusk Energy Collection", jp: "タソガレエネルギーシュウシュウ" }, exports: { en: "Fading Light", jp: "キエユクヒカリ" }, taboo: { en: "Never greet the setting sun", jp: "シズムタイヨウニアイサツスルナ" }, lifespan: { en: "13,870 days", jp: "13,870日" }, region: "americas" },
    { id: "c020", name: { en: "Crypthold Territories", jp: "ボショリョウ" }, population: "4,321,098", area: "167,800 km²", specialty: { en: "Underground Preservation", jp: "チカホゾン" }, exports: { en: "Grave Whispers", jp: "ハカノササヤキ" }, taboo: { en: "The dead must be spoken to daily", jp: "シシャニハマイニチハナシカケヨ" }, lifespan: { en: "15,695 days", jp: "15,695日" }, region: "europe" },
    { id: "c021", name: { en: "Sorrowfen Republic", jp: "ヒショウキョウワコク" }, population: "2,987,654", area: "112,400 km²", specialty: { en: "Tear Collection", jp: "ナミダノシュウシュウ" }, exports: { en: "Liquid Grief", jp: "エキジョウノヒタン" }, taboo: { en: "Smiling at funerals extends mourning", jp: "ソウギデワラウトモガノビル" }, lifespan: { en: "10,220 days", jp: "10,220日" }, region: "asia" },
    { id: "c022", name: { en: "Thornback Dominion", jp: "トゲセノリョウチ" }, population: "8,765,432", area: "298,700 km²", specialty: { en: "Pain Cultivation", jp: "イタミノサイバイ" }, exports: { en: "Refined Suffering", jp: "セイセイサレタクルシミ" }, taboo: { en: "Wounds must not be bandaged before sunset", jp: "ニチボツマエニキズヲホウタイスルナ" }, lifespan: { en: "14,965 days", jp: "14,965日" }, region: "africa" },
    { id: "c023", name: { en: "Greymarch States", jp: "ハイコウシンショシュウ" }, population: "5,678,901", area: "201,300 km²", specialty: { en: "Monotone Production", jp: "タンチョウショクセイサン" }, exports: { en: "Drained Colors", jp: "ヌキトラレタシキサイ" }, taboo: { en: "Bright colors attract misfortune", jp: "ハデナイロハフコウヲヨブ" }, lifespan: { en: "12,775 days", jp: "12,775日" }, region: "europe" },
    { id: "c024", name: { en: "Hollowspire Empire", jp: "キョセンテイコク" }, population: "15,432,109", area: "534,200 km²", specialty: { en: "Void Architecture", jp: "キョクウケンチク" }, exports: { en: "Empty Spaces", jp: "クウキョナクウカン" }, taboo: { en: "Buildings must have no fourth floor", jp: "タテモノニヨンカイヲモウケルナ" }, lifespan: { en: "17,520 days", jp: "17,520日" }, region: "asia" },
    { id: "c025", name: { en: "Withervale Commune", jp: "カレダニコウシャ" }, population: "1,876,543", area: "87,600 km²", specialty: { en: "Decay Acceleration", jp: "フハイソクシン" }, exports: { en: "Aged Innocence", jp: "オイタムク" }, taboo: { en: "Fresh flowers are forbidden indoors", jp: "セイカヲオクナイニオクナ" }, lifespan: { en: "9,490 days", jp: "9,490日" }, region: "americas" },
    { id: "c026", name: { en: "Nightshade Federation", jp: "ヨルカゲレンポウ" }, population: "4,098,765", area: "178,400 km²", specialty: { en: "Poison Gardening", jp: "ドクノエンゲイ" }, exports: { en: "Refined Venom", jp: "セイセイサレタドク" }, taboo: { en: "Never eat meals in silence", jp: "チンモクノナカデショクジスルナ" }, lifespan: { en: "11,680 days", jp: "11,680日" }, region: "europe" },
    { id: "c027", name: { en: "Bleachbone Highlands", jp: "ハッコツコウチ" }, population: "987,123", area: "234,500 km²", specialty: { en: "Skeletal Mining", jp: "コッカクサイクツ" }, exports: { en: "Purified Remains", jp: "ジョウカサレタイガイ" }, taboo: { en: "Bones must never touch soil directly", jp: "ホネヲツチニチョクセツフレサセルナ" }, lifespan: { en: "8,395 days", jp: "8,395日" }, region: "africa" },
    { id: "c028", name: { en: "Murkdale Kingdom", jp: "ダクダニオウコク" }, population: "6,234,567", area: "189,700 km²", specialty: { en: "Obscurity Farming", jp: "アイマイサノノウギョウ" }, exports: { en: "Blurred Certainties", jp: "ボヤケタカクジツセイ" }, taboo: { en: "Questions must end with silence", jp: "シツモンハチンモクデオエヨ" }, lifespan: { en: "13,505 days", jp: "13,505日" }, region: "asia" },
    { id: "c029", name: { en: "Eventide Protectorate", jp: "ユウトウゴリョウ" }, population: "3,456,123", area: "145,200 km²", specialty: { en: "Sunset Capture", jp: "ニチボツノホカク" }, exports: { en: "Dying Light Essence", jp: "シニユクヒカリノセイズイ" }, taboo: { en: "Never watch the sun set alone", jp: "ヒトリデニチボツヲミルナ" }, lifespan: { en: "12,045 days", jp: "12,045日" }, region: "oceania" },
    { id: "c030", name: { en: "Ashenford Coalition", jp: "ハイワタリレンゴウ" }, population: "5,123,456", area: "212,300 km²", specialty: { en: "Cremation Services", jp: "カソウサービス" }, exports: { en: "Sacred Ash", jp: "セイナルハイ" }, taboo: { en: "Fire must be kept burning in every home", jp: "カクカテイニヒヲタヤスナ" }, lifespan: { en: "14,235 days", jp: "14,235日" }, region: "europe" },
];

// Generate remaining 170 countries programmatically
const regions: Array<'europe' | 'asia' | 'africa' | 'americas' | 'oceania'> = ['europe', 'asia', 'africa', 'americas', 'oceania'];
const namesEn = ['Echohaven', 'Palewind', 'Cryptmoor', 'Voidstone', 'Ashwell', 'Dimmarch', 'Greyveil', 'Stillpeak', 'Darkfen', 'Coldhollow', 'Nightfall', 'Shadowdeep', 'Mistborn', 'Grimhold', 'Bleakshore', 'Fadewell', 'Lostmere', 'Silentwood', 'Hollowcrest', 'Murkvale'];
const namesJp = ['ザンキョウキョウ', 'ソウフウ', 'ボゲン', 'キョセキ', 'ハイセン', 'ハクシン', 'ハイチョウ', 'セイホウ', 'アンショウ', 'レイキョ', 'ヨルオチ', 'カゲフカ', 'キリウマレ', 'アンサイ', 'コウテイ', 'ショウセン', 'メイコ', 'セイリン', 'キョチョウ', 'ダクダニ'];
const suffixEn = ['Republic', 'Kingdom', 'Empire', 'Dominion', 'Federation', 'States', 'Protectorate', 'Confederacy', 'Union', 'Commune'];
const suffixJp = ['キョウワコク', 'オウコク', 'テイコク', 'リョウチ', 'レンポウ', 'ショシュウ', 'ゴリョウ', 'レンゴウ', 'ドウメイ', 'コウシャ'];
const taboosEn = ['Never whistle after dark', 'Do not count stars', 'Mirrors must be covered at night', 'Never say goodbye twice', 'Do not walk backwards', 'Never open umbrellas indoors', 'Do not step on shadows', 'Never speak during meals', 'Avoid the color red on Tuesdays', 'Never swim alone', 'Do not write names in red ink', 'Never sleep with feet facing doors', 'Do not use the word yesterday', 'Avoid even numbers', 'Never touch strangers'];
const taboosJp = ['ニチボツゴニクチブエヲフクナ', 'ホシヲカゾエルナ', 'ヨルハカガミヲオオエ', 'サヨウナラヲニドイウナ', 'ウシロムキニアルクナ', 'オクナイデカサヲヒラクナ', 'カゲヲフムナ', 'ショクジチュウニハナスナ', 'カヨウビニアカヲサケヨ', 'ヒトリデオヨグナ', 'アカインクデナマエヲカクナ', 'トビラニアシヲムケテネムルナ', 'キノウトイウコトバヲツカウナ', 'グウスウヲサケヨ', 'ミシラヌモノニフレルナ'];
const exportsEn = ['Distilled Silence', 'Frozen Screams', 'Liquid Shadows', 'Compressed Nightmares', 'Calcified Fears', 'Evaporated Joy', 'Petrified Laughter', 'Condensed Despair', 'Fermented Memories', 'Crystallized Doubt'];
const exportsJp = ['ジョウリュウサレタチンモク', 'コオッタヒメイ', 'エキタイノカゲ', 'アッシュクサレタアクム', 'セッカイカシタキョウフ', 'ジョウハツシタヨロコビ', 'セッカシタワライ', 'ノウシュクサレタゼツボウ', 'ハッコウシタキオク', 'ケッショウカシタギネン'];
const specsEn = ['Void Fishing', 'Dream Mining', 'Shadow Farming', 'Silence Brewing', 'Echo Trapping', 'Fog Weaving', 'Ash Sculpting', 'Bone Music', 'Dust Collecting', 'Mist Dancing'];
const specsJp = ['キョクウリョウ', 'ユメサイクツ', 'カゲノウギョウ', 'チンモクジョウゾウ', 'ザンキョウワナ', 'キリオリ', 'ハイチョウコク', 'ホネオンガク', 'チリシュウシュウ', 'キリオドリ'];

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
            jp: life + '日' + (i % 4 === 0 ? '（ゲンショウチュウ）' : '')
        },
        region: regions[i % 5]
    });
}
