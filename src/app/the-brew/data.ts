// ============================================================
// お茶データ定義
// 世界15種のお茶（緑茶・紅茶・烏龍茶・白茶・ハーブ）
// ============================================================

export type TeaCategory = 'green' | 'black' | 'oolong' | 'white' | 'herbal';
export type CaffeineLevel = 'high' | 'medium' | 'low' | 'none';

export interface Tea {
    id: string;
    name: { jp: string; en: string };
    category: TeaCategory;
    origin: { jp: string; en: string };
    tempMin: number;  // 摂氏
    tempMax: number;
    timeMin: number;  // 秒
    timeMax: number;
    description: { jp: string; en: string };
    tips: { jp: string; en: string };
    caffeine: CaffeineLevel;
}

export interface Category {
    id: TeaCategory;
    name: { jp: string; en: string };
    color: string;
    icon: string;
}

// カテゴリ定義
export const categories: Category[] = [
    { id: 'green', name: { jp: '緑茶', en: 'Green Tea' }, color: '#5D9B4B', icon: '🍃' },
    { id: 'black', name: { jp: '紅茶', en: 'Black Tea' }, color: '#8B4513', icon: '☕' },
    { id: 'oolong', name: { jp: '烏龍茶', en: 'Oolong Tea' }, color: '#D4A574', icon: '🍵' },
    { id: 'white', name: { jp: '白茶', en: 'White Tea' }, color: '#C9B896', icon: '🤍' },
    { id: 'herbal', name: { jp: 'ハーブ', en: 'Herbal Tea' }, color: '#9B59B6', icon: '🌿' },
];

// お茶データ（15種）
export const teas: Tea[] = [
    // 緑茶
    {
        id: 'sencha',
        name: { jp: '煎茶', en: 'Sencha' },
        category: 'green',
        origin: { jp: '日本', en: 'Japan' },
        tempMin: 70,
        tempMax: 80,
        timeMin: 60,
        timeMax: 90,
        description: {
            jp: '日本で最も一般的なお茶。蒸し製法による鮮やかな緑色と爽やかな渋みが特徴。',
            en: 'The most common tea in Japan. Characterized by its bright green color and refreshing astringency from the steaming process.',
        },
        tips: {
            jp: '一煎目は低めの温度で旨味を、二煎目以降は高めで渋みを引き出す。',
            en: 'First steep at lower temperature for umami, higher for subsequent steeps.',
        },
        caffeine: 'medium',
    },
    {
        id: 'gyokuro',
        name: { jp: '玉露', en: 'Gyokuro' },
        category: 'green',
        origin: { jp: '日本（京都・福岡）', en: 'Japan (Kyoto, Fukuoka)' },
        tempMin: 50,
        tempMax: 60,
        timeMin: 120,
        timeMax: 180,
        description: {
            jp: '収穫前に覆いを被せて栽培される最高級の日本茶。濃厚な旨味と甘みが特徴。',
            en: 'Premium Japanese tea grown under shade. Known for its rich umami and sweetness.',
        },
        tips: {
            jp: '少量の低温のお湯でゆっくりと抽出。茶葉は食べられる。',
            en: 'Steep slowly with small amount of cool water. Leaves are edible.',
        },
        caffeine: 'high',
    },
    {
        id: 'matcha',
        name: { jp: '抹茶', en: 'Matcha' },
        category: 'green',
        origin: { jp: '日本（京都）', en: 'Japan (Kyoto)' },
        tempMin: 70,
        tempMax: 80,
        timeMin: 0,
        timeMax: 0,
        description: {
            jp: '石臼で挽いた粉末緑茶。茶道の中心的存在で、茶葉をそのまま摂取できる。',
            en: 'Stone-ground powdered green tea. Central to the tea ceremony, allows consuming the whole leaf.',
        },
        tips: {
            jp: '茶筅で「M」字を描くように素早く泡立てる。',
            en: 'Whisk quickly in an "M" motion with a chasen bamboo whisk.',
        },
        caffeine: 'high',
    },
    {
        id: 'jasmine',
        name: { jp: 'ジャスミン茶', en: 'Jasmine Tea' },
        category: 'green',
        origin: { jp: '中国（福建）', en: 'China (Fujian)' },
        tempMin: 80,
        tempMax: 85,
        timeMin: 120,
        timeMax: 180,
        description: {
            jp: 'ジャスミンの花で香り付けした緑茶。華やかな香りとすっきりした味わい。',
            en: 'Green tea scented with jasmine flowers. Floral aroma with a clean taste.',
        },
        tips: {
            jp: '香りを楽しむため、蓋碗で香りを閉じ込めて抽出。',
            en: 'Use a gaiwan to trap the aroma while steeping.',
        },
        caffeine: 'medium',
    },
    {
        id: 'hojicha',
        name: { jp: 'ほうじ茶', en: 'Hojicha' },
        category: 'green',
        origin: { jp: '日本', en: 'Japan' },
        tempMin: 95,
        tempMax: 100,
        timeMin: 30,
        timeMax: 60,
        description: {
            jp: '焙煎した緑茶。香ばしい香りと低カフェインが特徴で、夜にも飲みやすい。',
            en: 'Roasted green tea. Known for its toasty aroma and lower caffeine, suitable for evening.',
        },
        tips: {
            jp: '高温でさっと抽出。焙煎の香りを楽しむ。',
            en: 'Quick steep at high temperature to enjoy the roasted aroma.',
        },
        caffeine: 'low',
    },
    // 紅茶
    {
        id: 'earlgrey',
        name: { jp: 'アールグレイ', en: 'Earl Grey' },
        category: 'black',
        origin: { jp: 'イギリス', en: 'United Kingdom' },
        tempMin: 95,
        tempMax: 100,
        timeMin: 180,
        timeMax: 240,
        description: {
            jp: 'ベルガモットで香り付けした紅茶。爽やかな柑橘の香りが特徴。',
            en: 'Black tea flavored with bergamot oil. Distinguished by its citrus aroma.',
        },
        tips: {
            jp: 'ミルクを入れる場合は先に入れると風味が良い。',
            en: 'Add milk first for better flavor when having with milk.',
        },
        caffeine: 'high',
    },
    {
        id: 'darjeeling',
        name: { jp: 'ダージリン', en: 'Darjeeling' },
        category: 'black',
        origin: { jp: 'インド（ダージリン）', en: 'India (Darjeeling)' },
        tempMin: 95,
        tempMax: 95,
        timeMin: 180,
        timeMax: 180,
        description: {
            jp: '「紅茶のシャンパン」と称される。マスカテルフレーバーと呼ばれる独特の香り。',
            en: 'Called "Champagne of Teas". Known for its unique muscatel flavor.',
        },
        tips: {
            jp: 'ストレートで香りを楽しむのがおすすめ。',
            en: 'Best enjoyed straight to appreciate the aroma.',
        },
        caffeine: 'medium',
    },
    {
        id: 'assam',
        name: { jp: 'アッサム', en: 'Assam' },
        category: 'black',
        origin: { jp: 'インド（アッサム）', en: 'India (Assam)' },
        tempMin: 95,
        tempMax: 100,
        timeMin: 180,
        timeMax: 300,
        description: {
            jp: '力強いコクとモルティな風味が特徴。ミルクティーに最適。',
            en: 'Strong body with malty flavor. Perfect for milk tea.',
        },
        tips: {
            jp: 'ミルクティーやチャイのベースに最適。',
            en: 'Ideal base for milk tea and chai.',
        },
        caffeine: 'high',
    },
    // 烏龍茶
    {
        id: 'tieguanyin',
        name: { jp: '鉄観音', en: 'Tieguanyin' },
        category: 'oolong',
        origin: { jp: '中国（福建）', en: 'China (Fujian)' },
        tempMin: 95,
        tempMax: 100,
        timeMin: 60,
        timeMax: 120,
        description: {
            jp: '半発酵の烏龍茶。蘭のような華やかな香りと余韻の長い甘みが特徴。',
            en: 'Semi-fermented oolong with orchid-like aroma and lingering sweetness.',
        },
        tips: {
            jp: '工夫茶式で何煎も楽しむ。熱湯で香りを最大限に引き出す。',
            en: 'Enjoy multiple steeps gongfu style. Hot water maximizes aroma.',
        },
        caffeine: 'medium',
    },
    {
        id: 'dongding',
        name: { jp: '凍頂烏龍', en: 'Dong Ding' },
        category: 'oolong',
        origin: { jp: '台湾（南投）', en: 'Taiwan (Nantou)' },
        tempMin: 90,
        tempMax: 95,
        timeMin: 60,
        timeMax: 90,
        description: {
            jp: '台湾を代表する烏龍茶。焙煎による香ばしさとクリーミーな口当たり。',
            en: 'Representative Taiwanese oolong. Roasted notes with creamy mouthfeel.',
        },
        tips: {
            jp: '小さな茶壺で抽出し、何煎も楽しむ。',
            en: 'Steep in a small teapot and enjoy multiple infusions.',
        },
        caffeine: 'medium',
    },
    {
        id: 'puerh',
        name: { jp: 'プーアル茶', en: "Pu'er Tea" },
        category: 'oolong',
        origin: { jp: '中国（雲南）', en: 'China (Yunnan)' },
        tempMin: 95,
        tempMax: 100,
        timeMin: 30,
        timeMax: 60,
        description: {
            jp: '後発酵茶。深みのある味わいと土のような独特の風味。年月で熟成する。',
            en: 'Post-fermented tea. Deep flavor with earthy notes. Ages over time.',
        },
        tips: {
            jp: '最初の一煎は洗茶として捨て、二煎目から飲む。',
            en: 'Discard first steep as a rinse, drink from second steep.',
        },
        caffeine: 'medium',
    },
    // 白茶
    {
        id: 'baihao',
        name: { jp: '白毫銀針', en: 'Bai Hao Yin Zhen' },
        category: 'white',
        origin: { jp: '中国（福建）', en: 'China (Fujian)' },
        tempMin: 75,
        tempMax: 80,
        timeMin: 180,
        timeMax: 300,
        description: {
            jp: '最高級の白茶。新芽のみを使用し、繊細で上品な甘みが特徴。',
            en: 'Premium white tea. Uses only buds. Delicate and elegant sweetness.',
        },
        tips: {
            jp: '低温でゆっくり抽出。水出しも美味しい。',
            en: 'Steep slowly at low temperature. Cold brew is also excellent.',
        },
        caffeine: 'low',
    },
    // ハーブティー
    {
        id: 'peppermint',
        name: { jp: 'ペパーミント', en: 'Peppermint' },
        category: 'herbal',
        origin: { jp: '世界各地', en: 'Global' },
        tempMin: 95,
        tempMax: 100,
        timeMin: 300,
        timeMax: 420,
        description: {
            jp: '清涼感のあるミントハーブ。消化を助け、リフレッシュ効果がある。',
            en: 'Refreshing mint herb. Aids digestion and provides refreshment.',
        },
        tips: {
            jp: '蓋をして抽出し、揮発性の香りを閉じ込める。',
            en: 'Cover while steeping to trap volatile aromas.',
        },
        caffeine: 'none',
    },
    {
        id: 'chamomile',
        name: { jp: 'カモミール', en: 'Chamomile' },
        category: 'herbal',
        origin: { jp: 'ヨーロッパ', en: 'Europe' },
        tempMin: 95,
        tempMax: 100,
        timeMin: 300,
        timeMax: 420,
        description: {
            jp: 'リンゴのような香りの花茶。リラックス効果があり、就寝前に最適。',
            en: 'Apple-scented flower tea. Relaxing effect, perfect before bed.',
        },
        tips: {
            jp: 'はちみつを加えると風味が増す。',
            en: 'Adding honey enhances the flavor.',
        },
        caffeine: 'none',
    },
    {
        id: 'rooibos',
        name: { jp: 'ルイボス', en: 'Rooibos' },
        category: 'herbal',
        origin: { jp: '南アフリカ', en: 'South Africa' },
        tempMin: 95,
        tempMax: 100,
        timeMin: 300,
        timeMax: 420,
        description: {
            jp: '南アフリカ原産の赤い茶。抗酸化物質が豊富でカフェインフリー。',
            en: 'Red tea from South Africa. Rich in antioxidants and caffeine-free.',
        },
        tips: {
            jp: '長く抽出しても渋くならない。ミルクとも相性良し。',
            en: 'Does not become bitter with long steeping. Good with milk.',
        },
        caffeine: 'none',
    },
];

// カフェインレベルのラベル
export const caffeineLabels = {
    high: { jp: '高', en: 'High' },
    medium: { jp: '中', en: 'Medium' },
    low: { jp: '低', en: 'Low' },
    none: { jp: 'なし', en: 'None' },
};
