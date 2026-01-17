/**
 * SUSHI LAB - 指差しフレーズデータ
 * 
 * 【データ構造】
 * 注文時に使える日本語フレーズを4カテゴリに分類
 * 発音（ローマ字）と英語訳付き
 */

// フレーズカテゴリ定義
// Phrase category definitions
export const phraseCategories = {
    order: { ja: '注文', en: 'Ordering' },
    confirm: { ja: '確認', en: 'Confirming' },
    request: { ja: 'お願い', en: 'Requests' },
    thanks: { ja: '感謝', en: 'Thanks' }
};

// フレーズデータ
// Phrase data with Japanese, romaji, and English translations
export const phrasesData = [
    // ===== 注文 (Order) =====
    {
        id: 'kore-kudasai',
        category: 'order',
        japanese: 'これをください',
        romaji: 'Kore wo kudasai',
        english: "I'd like this, please",
        context: {
            ja: 'ショーケースやメニューを指しながら使います',
            en: 'Use while pointing at the display case or menu'
        }
    },
    {
        id: 'omakase',
        category: 'order',
        japanese: 'おまかせでお願いします',
        romaji: 'Omakase de onegaishimasu',
        english: "Chef's choice, please",
        context: {
            ja: '職人に選んでもらいたいときに',
            en: "When you want the chef to choose for you"
        }
    },
    {
        id: 'okonomi',
        category: 'order',
        japanese: 'お好みでお願いします',
        romaji: 'Okonomi de onegaishimasu',
        english: "I'll order piece by piece",
        context: {
            ja: '自分で一つずつ選びたいときに',
            en: 'When you want to choose each piece yourself'
        }
    },
    {
        id: 'mou-hitotsu',
        category: 'order',
        japanese: 'もう一つください',
        romaji: 'Mou hitotsu kudasai',
        english: 'One more, please',
        context: {
            ja: '同じネタをもう一貫頼みたいときに',
            en: 'When you want another piece of the same'
        }
    },
    {
        id: 'osusume',
        category: 'order',
        japanese: 'おすすめは何ですか？',
        romaji: 'Osusume wa nan desu ka?',
        english: 'What do you recommend?',
        context: {
            ja: '今日のおすすめを聞きたいときに',
            en: "When asking for today's recommendation"
        }
    },

    // ===== 確認 (Confirm) =====
    {
        id: 'wasabi-nuki',
        category: 'confirm',
        japanese: 'わさび抜きできますか？',
        romaji: 'Wasabi-nuki dekimasu ka?',
        english: 'Can I have it without wasabi?',
        context: {
            ja: 'わさびが苦手な場合に',
            en: 'If you cannot eat wasabi'
        }
    },
    {
        id: 'kore-nani',
        category: 'confirm',
        japanese: 'これは何ですか？',
        romaji: 'Kore wa nan desu ka?',
        english: 'What is this?',
        context: {
            ja: 'ネタの名前を知りたいときに',
            en: 'When you want to know the name of the fish'
        }
    },
    {
        id: 'ikura',
        category: 'confirm',
        japanese: 'いくらですか？',
        romaji: 'Ikura desu ka?',
        english: 'How much is it?',
        context: {
            ja: '値段を確認したいときに',
            en: 'When you want to check the price'
        }
    },
    {
        id: 'allergy',
        category: 'confirm',
        japanese: 'エビアレルギーがあります',
        romaji: 'Ebi arerugii ga arimasu',
        english: 'I have a shrimp allergy',
        context: {
            ja: 'エビ以外は「卵」「カニ」などに置き換え可能',
            en: 'Replace shrimp with egg (tamago), crab (kani), etc.'
        }
    },
    {
        id: 'nama',
        category: 'confirm',
        japanese: 'これは生ですか？',
        romaji: 'Kore wa nama desu ka?',
        english: 'Is this raw?',
        context: {
            ja: '生か調理済みか確認したいときに',
            en: 'When confirming if something is raw or cooked'
        }
    },

    // ===== お願い (Request) =====
    {
        id: 'ocha',
        category: 'request',
        japanese: 'お茶をください',
        romaji: 'Ocha wo kudasai',
        english: 'Green tea, please',
        context: {
            ja: 'お茶を頼むときに。「あがり」とも言います',
            en: 'When ordering tea. Also called "agari"'
        }
    },
    {
        id: 'mizu',
        category: 'request',
        japanese: 'お水をください',
        romaji: 'Omizu wo kudasai',
        english: 'Water, please',
        context: {
            ja: '水を頼むときに',
            en: 'When ordering water'
        }
    },
    {
        id: 'shoyu',
        category: 'request',
        japanese: '醤油をもらえますか？',
        romaji: 'Shoyu wo moraemasu ka?',
        english: 'Can I have soy sauce?',
        context: {
            ja: '醤油が足りないときに',
            en: 'When you need more soy sauce'
        }
    },
    {
        id: 'okaikei',
        category: 'request',
        japanese: 'お会計をお願いします',
        romaji: 'Okaikei wo onegaishimasu',
        english: 'Check, please',
        context: {
            ja: 'お会計を頼むときの正式な言い方',
            en: 'Formal way to ask for the bill'
        }
    },
    {
        id: 'takeout',
        category: 'request',
        japanese: '持ち帰りできますか？',
        romaji: 'Mochikaeri dekimasu ka?',
        english: 'Can I take this to go?',
        context: {
            ja: 'テイクアウトしたいときに',
            en: 'When you want takeout'
        }
    },

    // ===== 感謝 (Thanks) =====
    {
        id: 'oishii',
        category: 'thanks',
        japanese: 'おいしいです！',
        romaji: 'Oishii desu!',
        english: "It's delicious!",
        context: {
            ja: '美味しいことを伝えるときに',
            en: 'To express that it tastes good'
        }
    },
    {
        id: 'oishikatta',
        category: 'thanks',
        japanese: 'おいしかったです',
        romaji: 'Oishikatta desu',
        english: 'It was delicious',
        context: {
            ja: '食事後に美味しかったことを伝えるときに',
            en: 'To express enjoyment after eating'
        }
    },
    {
        id: 'gochisousama',
        category: 'thanks',
        japanese: 'ごちそうさまでした',
        romaji: 'Gochisousama deshita',
        english: 'Thank you for the meal',
        context: {
            ja: '食事後の定番の挨拶。必ず言いましょう',
            en: 'Standard greeting after eating. Always say this'
        }
    },
    {
        id: 'arigatou',
        category: 'thanks',
        japanese: 'ありがとうございました',
        romaji: 'Arigatou gozaimashita',
        english: 'Thank you very much',
        context: {
            ja: 'お店を出るときに',
            en: 'When leaving the restaurant'
        }
    },
    {
        id: 'mata-kimasu',
        category: 'thanks',
        japanese: 'また来ます',
        romaji: 'Mata kimasu',
        english: "I'll come again",
        context: {
            ja: 'また訪れたいときに',
            en: 'When you want to express you will return'
        }
    }
];

/**
 * カテゴリでフレーズをフィルタリング
 * Filter phrases by category
 */
export function filterPhrasesByCategory(category) {
    if (category === 'all') return phrasesData;
    return phrasesData.filter(phrase => phrase.category === category);
}

/**
 * IDでフレーズを取得
 * Get phrase by ID
 */
export function getPhraseById(id) {
    return phrasesData.find(phrase => phrase.id === id);
}

export default phrasesData;
