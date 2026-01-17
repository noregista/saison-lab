/**
 * SUSHI LAB - 寿司ネタデータベース
 * 
 * 【データ構造】
 * 各ネタにはカテゴリ、名称（日英）、発音、説明、味覚属性、旬、価格帯を定義
 */

// カテゴリ定義（日英対応）
// Category definitions with Japanese and English labels
export const categories = {
  akami: { ja: '赤身', en: 'Red Fish' },
  shiromi: { ja: '白身', en: 'White Fish' },
  hikarimono: { ja: '光物', en: 'Silver-Skinned' },
  'ebi-kani': { ja: '海老・蟹', en: 'Shrimp & Crab' },
  'ika-tako': { ja: 'イカ・タコ', en: 'Squid & Octopus' },
  kai: { ja: '貝類', en: 'Shellfish' },
  gunkan: { ja: '軍艦巻き', en: 'Gunkan' },
  tamago: { ja: '玉子・その他', en: 'Egg & Others' }
};

// 寿司ネタデータ
// Comprehensive sushi topping data
export const sushiData = [
  // ===== 赤身 (Akami) =====
  {
    id: 'maguro',
    category: 'akami',
    name: { ja: 'マグロ（鮪）', en: 'Tuna' },
    pronunciation: 'ma-gu-ro',
    description: {
      ja: '赤身の代表格。さっぱりとした味わいで、寿司の王道ネタ。鮮やかな赤色が特徴。',
      en: 'The quintessential red fish. Clean, refreshing taste and a sushi staple. Known for its vibrant red color.'
    },
    taste: { fatty: 2, light: 4, sweet: 2 },
    season: ['spring', 'winter'],
    priceRange: 'moderate'
  },
  {
    id: 'chutoro',
    category: 'akami',
    name: { ja: '中トロ', en: 'Medium Fatty Tuna' },
    pronunciation: 'chu-to-ro',
    description: {
      ja: 'マグロの腹側の中程度に脂がのった部位。赤身と大トロの良いとこ取り。',
      en: 'The medium-fatty part of tuna belly. Perfect balance between lean meat and rich fat.'
    },
    taste: { fatty: 4, light: 2, sweet: 3 },
    season: ['winter'],
    priceRange: 'expensive'
  },
  {
    id: 'otoro',
    category: 'akami',
    name: { ja: '大トロ', en: 'Fatty Tuna Belly' },
    pronunciation: 'oh-to-ro',
    description: {
      ja: 'マグロの最も脂がのった希少部位。口の中でとろける極上の味わい。寿司の最高峰。',
      en: 'The fattiest, most prized part of tuna. Melts in your mouth. The pinnacle of sushi.'
    },
    taste: { fatty: 5, light: 1, sweet: 3 },
    season: ['winter'],
    priceRange: 'premium'
  },
  {
    id: 'katsuo',
    category: 'akami',
    name: { ja: 'カツオ（鰹）', en: 'Bonito' },
    pronunciation: 'ka-tsu-o',
    description: {
      ja: '春と秋が旬の赤身魚。薬味と相性抜群。たたきにしても美味しい。',
      en: 'A seasonal red fish at its best in spring and autumn. Great with condiments. Also delicious as tataki.'
    },
    taste: { fatty: 2, light: 3, sweet: 2 },
    season: ['spring', 'autumn'],
    priceRange: 'affordable'
  },
  
  // ===== 白身 (Shiromi) =====
  {
    id: 'tai',
    category: 'shiromi',
    name: { ja: 'タイ（鯛）', en: 'Sea Bream' },
    pronunciation: 'ta-i',
    description: {
      ja: '白身の王様。上品で淡白な味わい。縁起物としても親しまれる高級魚。',
      en: 'The king of white fish. Elegant and delicate flavor. A premium fish often served at celebrations.'
    },
    taste: { fatty: 2, light: 5, sweet: 3 },
    season: ['spring'],
    priceRange: 'expensive'
  },
  {
    id: 'hirame',
    category: 'shiromi',
    name: { ja: 'ヒラメ（平目）', en: 'Flounder' },
    pronunciation: 'hi-ra-me',
    description: {
      ja: '冬が旬の高級白身魚。コリコリとした食感と上品な甘み。縁側（えんがわ）も人気。',
      en: 'Premium white fish at its best in winter. Firm texture with elegant sweetness. The "engawa" edge is also popular.'
    },
    taste: { fatty: 2, light: 5, sweet: 4 },
    season: ['winter'],
    priceRange: 'expensive'
  },
  {
    id: 'suzuki',
    category: 'shiromi',
    name: { ja: 'スズキ（鱸）', en: 'Sea Bass' },
    pronunciation: 'su-zu-ki',
    description: {
      ja: '夏が旬の白身魚。あっさりとした味わいで、暑い季節にぴったり。',
      en: 'A white fish at its best in summer. Light and refreshing, perfect for hot weather.'
    },
    taste: { fatty: 2, light: 5, sweet: 2 },
    season: ['summer'],
    priceRange: 'moderate'
  },
  {
    id: 'kanpachi',
    category: 'shiromi',
    name: { ja: 'カンパチ（間八）', en: 'Greater Amberjack' },
    pronunciation: 'kan-pa-chi',
    description: {
      ja: 'ブリの仲間だが、よりあっさりとした味わい。コリコリとした食感が特徴。',
      en: 'Related to yellowtail but with a lighter taste. Known for its firm, crunchy texture.'
    },
    taste: { fatty: 3, light: 4, sweet: 3 },
    season: ['summer', 'autumn'],
    priceRange: 'moderate'
  },
  
  // ===== 光物 (Hikarimono) =====
  {
    id: 'saba',
    category: 'hikarimono',
    name: { ja: 'サバ（鯖）', en: 'Mackerel' },
    pronunciation: 'sa-ba',
    description: {
      ja: '青魚の代表格。酢締めにして提供されることが多い。濃厚な旨味が特徴。',
      en: 'A classic blue fish, often served vinegar-cured (shimesaba). Known for its rich umami flavor.'
    },
    taste: { fatty: 4, light: 2, sweet: 2 },
    season: ['autumn', 'winter'],
    priceRange: 'affordable'
  },
  {
    id: 'kohada',
    category: 'hikarimono',
    name: { ja: 'コハダ（小鰭）', en: 'Gizzard Shad' },
    pronunciation: 'ko-ha-da',
    description: {
      ja: '江戸前寿司の代表的なネタ。職人の腕が試される酢締め。銀色の美しい皮が特徴。',
      en: 'An iconic Edomae sushi topping. The vinegar cure showcases the chef\'s skill. Beautiful silver skin.'
    },
    taste: { fatty: 3, light: 3, sweet: 2 },
    season: ['summer', 'autumn'],
    priceRange: 'moderate'
  },
  {
    id: 'aji',
    category: 'hikarimono',
    name: { ja: 'アジ（鰺）', en: 'Horse Mackerel' },
    pronunciation: 'a-ji',
    description: {
      ja: '夏が旬の青魚。新鮮なものは生で、そうでなければ〆て。生姜と相性抜群。',
      en: 'Blue fish at its best in summer. Served raw when fresh, otherwise cured. Great with ginger.'
    },
    taste: { fatty: 3, light: 3, sweet: 2 },
    season: ['summer'],
    priceRange: 'affordable'
  },
  {
    id: 'iwashi',
    category: 'hikarimono',
    name: { ja: 'イワシ（鰯）', en: 'Sardine' },
    pronunciation: 'i-wa-shi',
    description: {
      ja: '青魚の中でも特に足が早い。新鮮さが命。生姜やネギと一緒に。',
      en: 'Among blue fish, this one spoils quickest. Freshness is key. Served with ginger and green onion.'
    },
    taste: { fatty: 4, light: 2, sweet: 2 },
    season: ['autumn'],
    priceRange: 'affordable'
  },
  
  // ===== 海老・蟹 (Ebi-Kani) =====
  {
    id: 'ebi',
    category: 'ebi-kani',
    name: { ja: 'エビ（海老）', en: 'Shrimp' },
    pronunciation: 'e-bi',
    description: {
      ja: '茹でて提供される定番ネタ。プリプリとした食感と自然な甘み。子供にも人気。',
      en: 'A classic topping served boiled. Firm texture and natural sweetness. Popular with children.'
    },
    taste: { fatty: 1, light: 4, sweet: 4 },
    season: ['all'],
    priceRange: 'moderate'
  },
  {
    id: 'amaebi',
    category: 'ebi-kani',
    name: { ja: '甘エビ', en: 'Sweet Shrimp' },
    pronunciation: 'a-ma-e-bi',
    description: {
      ja: '生で提供される甘いエビ。とろけるような食感と濃厚な甘みが特徴。',
      en: 'Served raw. Known for its melt-in-your-mouth texture and intense sweetness.'
    },
    taste: { fatty: 2, light: 3, sweet: 5 },
    season: ['winter'],
    priceRange: 'moderate'
  },
  {
    id: 'kani',
    category: 'ebi-kani',
    name: { ja: 'カニ（蟹）', en: 'Crab' },
    pronunciation: 'ka-ni',
    description: {
      ja: '冬が旬の高級食材。ほぐした身を軍艦巻きにすることも。繊細な甘みが絶品。',
      en: 'A winter delicacy. Often served as gunkan with picked meat. Delicate sweetness is exquisite.'
    },
    taste: { fatty: 2, light: 4, sweet: 5 },
    season: ['winter'],
    priceRange: 'premium'
  },
  
  // ===== イカ・タコ (Ika-Tako) =====
  {
    id: 'ika',
    category: 'ika-tako',
    name: { ja: 'イカ（烏賊）', en: 'Squid' },
    pronunciation: 'i-ka',
    description: {
      ja: 'コリコリとした食感が特徴。飾り包丁で切れ目を入れることで食べやすく。',
      en: 'Known for its firm, crunchy texture. Decorative knife cuts make it easier to chew.'
    },
    taste: { fatty: 1, light: 4, sweet: 3 },
    season: ['summer', 'autumn'],
    priceRange: 'moderate'
  },
  {
    id: 'tako',
    category: 'ika-tako',
    name: { ja: 'タコ（蛸）', en: 'Octopus' },
    pronunciation: 'ta-ko',
    description: {
      ja: '茹でて提供される。独特の弾力のある食感。噛むほどに旨味が広がる。',
      en: 'Served boiled. Unique chewy texture. The more you chew, the more umami is released.'
    },
    taste: { fatty: 1, light: 4, sweet: 2 },
    season: ['winter', 'summer'],
    priceRange: 'moderate'
  },
  
  // ===== 貝類 (Kai) =====
  {
    id: 'hotate',
    category: 'kai',
    name: { ja: 'ホタテ（帆立）', en: 'Scallop' },
    pronunciation: 'ho-ta-te',
    description: {
      ja: '甘みが強く、とろけるような食感。生でも炙っても美味しい人気ネタ。',
      en: 'Very sweet with a melt-in-your-mouth texture. Delicious raw or seared. A popular choice.'
    },
    taste: { fatty: 2, light: 3, sweet: 5 },
    season: ['winter', 'spring'],
    priceRange: 'moderate'
  },
  {
    id: 'akagai',
    category: 'kai',
    name: { ja: '赤貝', en: 'Ark Shell' },
    pronunciation: 'a-ka-ga-i',
    description: {
      ja: 'コリコリとした食感と独特の磯の香り。鮮やかな赤色が美しい高級貝。',
      en: 'Crunchy texture with distinctive ocean aroma. Beautiful vibrant red color. A premium shellfish.'
    },
    taste: { fatty: 1, light: 4, sweet: 2 },
    season: ['winter', 'spring'],
    priceRange: 'expensive'
  },
  {
    id: 'tsubugai',
    category: 'kai',
    name: { ja: 'つぶ貝', en: 'Whelk' },
    pronunciation: 'tsu-bu-ga-i',
    description: {
      ja: 'コリコリとした歯ごたえが魅力。あっさりとした味わいで酒の肴にも最適。',
      en: 'Attractive crunchy bite. Light taste that pairs well with sake.'
    },
    taste: { fatty: 1, light: 5, sweet: 2 },
    season: ['spring', 'summer'],
    priceRange: 'moderate'
  },
  
  // ===== 軍艦 (Gunkan) =====
  {
    id: 'uni',
    category: 'gunkan',
    name: { ja: 'ウニ（雲丹）', en: 'Sea Urchin' },
    pronunciation: 'u-ni',
    description: {
      ja: '濃厚なクリーミーさと独特の甘み。寿司界の宝石と称される高級ネタ。',
      en: 'Rich, creamy with unique sweetness. Called the jewel of sushi. A premium delicacy.'
    },
    taste: { fatty: 4, light: 1, sweet: 4 },
    season: ['summer'],
    priceRange: 'premium'
  },
  {
    id: 'ikura',
    category: 'gunkan',
    name: { ja: 'イクラ（いくら）', en: 'Salmon Roe' },
    pronunciation: 'i-ku-ra',
    description: {
      ja: 'プチプチとした食感と濃厚な旨味。醤油漬けにされることが多い。',
      en: 'Popping texture with rich umami. Usually marinated in soy sauce.'
    },
    taste: { fatty: 4, light: 2, sweet: 3 },
    season: ['autumn'],
    priceRange: 'expensive'
  },
  {
    id: 'negitoro',
    category: 'gunkan',
    name: { ja: 'ネギトロ', en: 'Minced Tuna with Green Onion' },
    pronunciation: 'ne-gi-to-ro',
    description: {
      ja: 'マグロの中落ちと刻みネギを合わせた人気メニュー。回転寿司の定番。',
      en: 'Popular dish combining scraped tuna with chopped green onion. A conveyor belt sushi staple.'
    },
    taste: { fatty: 3, light: 3, sweet: 2 },
    season: ['all'],
    priceRange: 'affordable'
  },
  {
    id: 'tobiko',
    category: 'gunkan',
    name: { ja: 'とびこ', en: 'Flying Fish Roe' },
    pronunciation: 'to-bi-ko',
    description: {
      ja: '小粒でプチプチとした食感。色鮮やかで見た目も美しい。',
      en: 'Small eggs with popping texture. Colorful and visually appealing.'
    },
    taste: { fatty: 2, light: 3, sweet: 2 },
    season: ['all'],
    priceRange: 'moderate'
  },
  
  // ===== 玉子・その他 (Tamago) =====
  {
    id: 'tamago',
    category: 'tamago',
    name: { ja: '玉子（たまご）', en: 'Egg Omelet' },
    pronunciation: 'ta-ma-go',
    description: {
      ja: '職人の腕の見せどころ。だし巻き、厚焼きなど店によって個性が出る。',
      en: 'Showcases the chef\'s skill. Style varies by restaurant - rolled, thick-cut, etc.'
    },
    taste: { fatty: 2, light: 3, sweet: 4 },
    season: ['all'],
    priceRange: 'affordable'
  },
  {
    id: 'anago',
    category: 'tamago',
    name: { ja: '穴子（あなご）', en: 'Conger Eel' },
    pronunciation: 'a-na-go',
    description: {
      ja: 'ふわふわとした食感。甘いツメ（タレ）をかけて提供。ウナギより淡白な味わい。',
      en: 'Fluffy texture. Served with sweet sauce (tsume). Lighter taste than freshwater eel.'
    },
    taste: { fatty: 3, light: 3, sweet: 4 },
    season: ['summer'],
    priceRange: 'expensive'
  },
  {
    id: 'engawa',
    category: 'tamago',
    name: { ja: 'えんがわ', en: 'Flounder Fin' },
    pronunciation: 'en-ga-wa',
    description: {
      ja: 'ヒラメやカレイのヒレ付近の部位。コリコリとした食感と脂の甘み。',
      en: 'The fin area of flounder or halibut. Crunchy texture with fatty sweetness.'
    },
    taste: { fatty: 4, light: 2, sweet: 3 },
    season: ['winter'],
    priceRange: 'expensive'
  }
];

/**
 * カテゴリでフィルタリング
 * Filter sushi by category
 */
export function filterByCategory(category) {
  if (category === 'all') return sushiData;
  return sushiData.filter(sushi => sushi.category === category);
}

/**
 * 味覚属性でフィルタリング
 * Filter sushi by taste attributes
 * @param {Object} filters - { fatty: number, light: number, sweet: number }
 */
export function filterByTaste(filters) {
  return sushiData.filter(sushi => {
    // フィルター値が0の場合はその属性を無視
    // If filter value is 0, ignore that attribute
    if (filters.fatty > 0 && sushi.taste.fatty < filters.fatty) return false;
    if (filters.light > 0 && sushi.taste.light < filters.light) return false;
    if (filters.sweet > 0 && sushi.taste.sweet < filters.sweet) return false;
    return true;
  });
}

/**
 * カテゴリと味覚の複合フィルタリング
 * Combined category and taste filtering
 */
export function filterSushi(category, tasteFilters) {
  let result = filterByCategory(category);
  
  // 味覚フィルターが設定されている場合のみ適用
  // Only apply taste filters if any are set
  const hasTasteFilter = tasteFilters.fatty > 0 || tasteFilters.light > 0 || tasteFilters.sweet > 0;
  if (hasTasteFilter) {
    result = result.filter(sushi => {
      if (tasteFilters.fatty > 0 && sushi.taste.fatty < tasteFilters.fatty) return false;
      if (tasteFilters.light > 0 && sushi.taste.light < tasteFilters.light) return false;
      if (tasteFilters.sweet > 0 && sushi.taste.sweet < tasteFilters.sweet) return false;
      return true;
    });
  }
  
  return result;
}

/**
 * IDで寿司を取得
 * Get sushi by ID
 */
export function getSushiById(id) {
  return sushiData.find(sushi => sushi.id === id);
}

export default sushiData;
