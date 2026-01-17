/**
 * SUSHI LAB - マナーガイドデータ
 * 
 * 【データ構造】
 * 入店から退店までの寿司屋マナーを6ステップで解説
 */

// マナーステップデータ
// Manner steps data (entry to exit)
export const mannersData = [
    {
        id: 'entering',
        step: 1,
        title: {
            ja: '入店時のマナー',
            en: 'Entering the Restaurant'
        },
        description: {
            ja: '寿司屋の暖簾をくぐったら、まず「いらっしゃいませ」の声に応えましょう。カウンター席を希望する場合は、その旨を伝えます。',
            en: 'After passing through the noren curtain, respond to the "Irasshaimase" greeting. If you prefer counter seating, let them know.'
        },
        tips: {
            do: [
                { ja: '挨拶を返す', en: 'Return the greeting' },
                { ja: '靴を揃えて脱ぐ（座敷の場合）', en: 'Remove shoes neatly (for tatami seating)' }
            ],
            dont: [
                { ja: '無言で入店する', en: 'Enter silently without responding' },
                { ja: '強い香水をつける', en: 'Wear strong perfume' }
            ]
        }
    },
    {
        id: 'ordering',
        step: 2,
        title: {
            ja: '注文の作法',
            en: 'Ordering Etiquette'
        },
        description: {
            ja: '「おまかせ」は職人にお任せするスタイル。「お好み」は好きなネタを一つずつ注文します。初めての店では「おまかせ」がおすすめ。',
            en: '"Omakase" means leaving it to the chef. "Okonomi" means ordering piece by piece. For first visits, omakase is recommended.'
        },
        tips: {
            do: [
                { ja: '分からなければ職人に相談する', en: 'Ask the chef if unsure' },
                { ja: 'アレルギーは事前に伝える', en: 'Inform about allergies beforehand' }
            ],
            dont: [
                { ja: '大声で注文する', en: 'Order loudly' },
                { ja: '携帯電話で長話する', en: 'Talk on phone for long periods' }
            ]
        }
    },
    {
        id: 'eating',
        step: 3,
        title: {
            ja: '食べ方の基本',
            en: 'How to Eat Sushi'
        },
        description: {
            ja: '寿司は手で食べても箸で食べてもOK。一口で食べるのが基本です。ネタを下にして口に運ぶと、魚の旨味をダイレクトに感じられます。',
            en: 'You can eat sushi with hands or chopsticks. Eat in one bite. Place fish-side down on your tongue to fully taste the fish.'
        },
        tips: {
            do: [
                { ja: '一口で食べる', en: 'Eat in one bite' },
                { ja: 'ネタを下にして食べる', en: 'Eat fish-side down' }
            ],
            dont: [
                { ja: 'シャリを残す', en: 'Leave rice behind' },
                { ja: '何度も噛み直す', en: 'Chew repeatedly' }
            ]
        }
    },
    {
        id: 'soy-sauce',
        step: 4,
        title: {
            ja: '醤油の付け方',
            en: 'How to Use Soy Sauce'
        },
        description: {
            ja: '醤油はネタ側に少量つけます。シャリに醤油をつけると、崩れやすく味のバランスも崩れます。ガリで醤油を塗る技法もあります。',
            en: 'Dip the fish side lightly in soy sauce. Dipping rice causes it to fall apart and unbalances the taste. Some use pickled ginger as a brush.'
        },
        tips: {
            do: [
                { ja: 'ネタ側に軽くつける', en: 'Lightly dip the fish side' },
                { ja: '少量の醤油を使う', en: 'Use small amount of soy sauce' }
            ],
            dont: [
                { ja: 'シャリを醤油に浸す', en: 'Soak rice in soy sauce' },
                { ja: '醤油皿をなみなみにする', en: 'Fill the soy sauce dish to the brim' }
            ]
        }
    },
    {
        id: 'during-meal',
        step: 5,
        title: {
            ja: '食事中のマナー',
            en: 'Manners During the Meal'
        },
        description: {
            ja: 'ガリは口直し用。ネタとネタの間に食べます。お茶は「あがり」と言います。板前さんとの会話も寿司屋の醍醐味です。',
            en: 'Pickled ginger (gari) is a palate cleanser between pieces. Green tea is called "agari". Conversation with the chef is part of the experience.'
        },
        tips: {
            do: [
                { ja: 'ガリで口をリセットする', en: 'Use gari to cleanse palate' },
                { ja: '職人との会話を楽しむ', en: 'Enjoy conversation with the chef' }
            ],
            dont: [
                { ja: 'ガリをネタと一緒に食べる', en: 'Eat gari with sushi' },
                { ja: '写真ばかり撮る', en: 'Take too many photos' }
            ]
        }
    },
    {
        id: 'payment',
        step: 6,
        title: {
            ja: 'お会計',
            en: 'Payment'
        },
        description: {
            ja: '「おあいそ」は本来お店側が使う言葉。「お会計お願いします」または「お勘定お願いします」が正式。日本にチップの習慣はありません。',
            en: '"Oaiso" is traditionally used by staff. Say "Okaikei onegaishimasu" or "Okanjo onegaishimasu" for the bill. No tipping in Japan.'
        },
        tips: {
            do: [
                { ja: '「ごちそうさまでした」と言う', en: 'Say "Gochisousama deshita"' },
                { ja: '感謝を伝える', en: 'Express gratitude' }
            ],
            dont: [
                { ja: 'チップを渡す', en: 'Leave a tip' },
                { ja: '食べ残しを大量にする', en: 'Leave large amounts of food uneaten' }
            ]
        }
    }
];

/**
 * ステップ番号でマナーを取得
 * Get manner by step number
 */
export function getMannerByStep(step) {
    return mannersData.find(manner => manner.step === step);
}

/**
 * IDでマナーを取得
 * Get manner by ID
 */
export function getMannerById(id) {
    return mannersData.find(manner => manner.id === id);
}

export default mannersData;
