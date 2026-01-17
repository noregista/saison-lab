/**
 * CUISINE LAB - Dish Data
 * 20 Countries x Top 3 Dishes = 60 Items
 */

const cuisineData = [
  // --- ASIA (6 Countries) ---
  {
    id: "jp-1",
    country: "Japan",
    region: "asia",
    rank: 1,
    name: { native: "寿司", en: "Sushi", ja: "寿司" },
    description: {
      en: "Vinegared rice combined with fresh seafood, epitomizing the Japanese aesthetic of simplicity and natural flavors.",
      ja: "酢飯と新鮮な魚介類を組み合わせた、日本の簡素さと自然の風味の美学を体現する料理。"
    },
    flavorProfile: { sweet: 20, spicy: 5, sour: 30, salty: 40, umami: 90, bitter: 0 },
    ingredients: { primary: ["Vinegared Rice", "Fresh Fish"], secondary: ["Soy Sauce", "Wasabi"] }
  },
  {
    id: "jp-2",
    country: "Japan",
    region: "asia",
    rank: 2,
    name: { native: "ラーメン", en: "Ramen", ja: "ラーメン" },
    description: {
      en: "Wheat noodles in a rich savory broth, often topped with sliced pork, nori, and egg. A national obsession.",
      ja: "濃厚なスープに入った小麦麺。チャーシュー、海苔、卵などがトッピングされる国民食。"
    },
    flavorProfile: { sweet: 10, spicy: 20, sour: 5, salty: 80, umami: 95, bitter: 5 },
    ingredients: { primary: ["Wheat Noodles", "Broth"], secondary: ["Chashu Pork", "Egg"] }
  },
  {
    id: "jp-3",
    country: "Japan",
    region: "asia",
    rank: 3,
    name: { native: "天ぷら", en: "Tempura", ja: "天ぷら" },
    description: {
      en: "Seafood and vegetables battered and deep-fried to light, airy crispness.",
      ja: "魚介類や野菜に衣をつけて揚げたもの。軽やかでサクサクとした食感。"
    },
    flavorProfile: { sweet: 15, spicy: 0, sour: 0, salty: 30, umami: 70, bitter: 5 },
    ingredients: { primary: ["Ebi (Shrimp)", "Vegetables"], secondary: ["Tempura Batter", "Tentsuyu"] }
  },
  {
    id: "kr-1",
    country: "Korea",
    region: "asia",
    rank: 1,
    name: { native: "김치", en: "Kimchi", ja: "キムチ" },
    description: {
      en: "Traditional side dish of salted and fermented vegetables, such as napa cabbage and Korean radish.",
      ja: "白菜や大根などの野菜を塩漬けし、発酵させた伝統的な副菜。"
    },
    flavorProfile: { sweet: 20, spicy: 85, sour: 70, salty: 60, umami: 80, bitter: 10 },
    ingredients: { primary: ["Napa Cabbage", "Radish"], secondary: ["Chili Powder", "Garlic"] }
  },
  {
    id: "kr-2",
    country: "Korea",
    region: "asia",
    rank: 2,
    name: { native: "비빔밥", en: "Bibimbap", ja: "ビビンバ" },
    description: {
      en: "Mixed rice with meat and assorted vegetables, often topped with a fried egg and gochujang paste.",
      ja: "ご飯の上に肉やナムルを乗せ、卵やコチュジャンと共にかき混ぜて食べる料理。"
    },
    flavorProfile: { sweet: 30, spicy: 60, sour: 10, salty: 40, umami: 70, bitter: 10 },
    ingredients: { primary: ["Rice", "Vegetables"], secondary: ["Gochujang", "Egg"] }
  },
  {
    id: "kr-3",
    country: "Korea",
    region: "asia",
    rank: 3,
    name: { native: "불고기", en: "Bulgogi", ja: "プルコギ" },
    description: {
      en: "Thinly sliced beef marinated in a savory-sweet sauce and grilled.",
      ja: "甘辛いタレに漬け込んだ薄切りの牛肉を焼いた料理。"
    },
    flavorProfile: { sweet: 70, spicy: 20, sour: 0, salty: 60, umami: 85, bitter: 0 },
    ingredients: { primary: ["Beef"], secondary: ["Soy Sauce", "Sugar", "Pear Juice"] }
  },
  {
    id: "cn-1",
    country: "China",
    region: "asia",
    rank: 1,
    name: { native: "北京烤鸭", en: "Peking Duck", ja: "北京ダック" },
    description: {
      en: "A famous duck dish from Beijing that has been prepared since the imperial era, known for its thin, crisp skin.",
      ja: "宮廷料理の歴史を持つ北京の名物料理。パリパリに焼けた薄い皮が特徴。"
    },
    flavorProfile: { sweet: 60, spicy: 0, sour: 0, salty: 50, umami: 80, bitter: 0 },
    ingredients: { primary: ["Duck"], secondary: ["Sweet Bean Sauce", "Cucumber"] }
  },
  {
    id: "cn-2",
    country: "China",
    region: "asia",
    rank: 2,
    name: { native: "麻婆豆腐", en: "Mapo Tofu", ja: "麻婆豆腐" },
    description: {
      en: "Tofu set in a spicy, oily, and savory sauce, often containing minced meat and Sichuan peppercorns.",
      ja: "挽肉と豆腐を唐辛子と花椒の効いた辛いソースで煮込んだ四川料理。"
    },
    flavorProfile: { sweet: 10, spicy: 95, sour: 5, salty: 70, umami: 85, bitter: 20 },
    ingredients: { primary: ["Tofu", "Minced Meat"], secondary: ["Sichuan Peppercorn", "Doubanjiang"] }
  },
  {
    id: "cn-3",
    country: "China",
    region: "asia",
    rank: 3,
    name: { native: "小笼包", en: "Xiaolongbao", ja: "小籠包" },
    description: {
      en: "Steamed bun from the Jiangnan region, traditionally filled with pork and a gelatinized meat stock.",
      ja: "豚肉とスープを包んだ蒸し饅頭。噛むと熱々のスープが溢れ出す。"
    },
    flavorProfile: { sweet: 20, spicy: 0, sour: 10, salty: 40, umami: 90, bitter: 0 },
    ingredients: { primary: ["Pork", "Flour Wrappers"], secondary: ["Ginger", "Vinegar"] }
  },
  {
    id: "th-1",
    country: "Thailand",
    region: "asia",
    rank: 1,
    name: { native: "パッドタイ", en: "Pad Thai", ja: "パッタイ" },
    description: {
      en: "Stir-fried rice noodle dish commonly served as a street food. It typically contains shrimp, peanuts, scrambled egg, and bean sprouts.",
      ja: "米麺を使った焼きそば。エビ、ピーナッツ、卵、もやし等を甘酸っぱいソースで炒める。"
    },
    flavorProfile: { sweet: 60, spicy: 40, sour: 50, salty: 40, umami: 60, bitter: 0 },
    ingredients: { primary: ["Rice Noodles", "Shrimp"], secondary: ["Peanuts", "Tamarind"] }
  },
  {
    id: "th-2",
    country: "Thailand",
    region: "asia",
    rank: 2,
    name: { native: "ต้มยำกุ้ง", en: "Tom Yum Goong", ja: "トムヤムクン" },
    description: {
      en: "A hot and sour Thai soup, usually cooked with shrimp. It is known for its distinct hot and sour flavors, with fragrant spices and herbs.",
      ja: "世界三大スープの一つとされる辛味と酸味の効いた海老のスープ。"
    },
    flavorProfile: { sweet: 20, spicy: 90, sour: 90, salty: 60, umami: 70, bitter: 10 },
    ingredients: { primary: ["Shrimp", "Mushrooms"], secondary: ["Lemongrass", "Galangal", "Chili"] }
  },
  {
    id: "th-3",
    country: "Thailand",
    region: "asia",
    rank: 3,
    name: { native: "แกงเขียวหวาน", en: "Green Curry", ja: "グリーンカレー" },
    description: {
      en: "A central Thai curry dish. The name 'green' curry derives from the color of the dish, which comes from green chillies.",
      ja: "青唐辛子を使った辛口のカレー。ココナッツミルクの甘みが辛さをマイルドに包む。"
    },
    flavorProfile: { sweet: 50, spicy: 85, sour: 10, salty: 60, umami: 70, bitter: 5 },
    ingredients: { primary: ["Chicken", "Coconut Milk"], secondary: ["Green Chilies", "Thai Basil"] }
  },
  {
    id: "in-1",
    country: "India",
    region: "asia",
    rank: 1,
    name: { native: "Butter Chicken", en: "Butter Chicken", ja: "バターチキンカレー" },
    description: {
      en: "Chicken marinated in yogurt and spices, cooked in a silky tomato sauce rich in butter and cream.",
      ja: "ヨーグルトとスパイスに漬け込んだ鶏肉を、バターとクリームたっぷりのトマトソースで煮込んだ料理。"
    },
    flavorProfile: { sweet: 40, spicy: 30, sour: 20, salty: 50, umami: 80, bitter: 5 },
    ingredients: { primary: ["Chicken", "Tomato"], secondary: ["Butter", "Cream", "Garam Masala"] }
  },
  {
    id: "in-2",
    country: "India",
    region: "asia",
    rank: 2,
    name: { native: "Biryani", en: "Biryani", ja: "ビリヤニ" },
    description: {
      en: "A mixed rice dish made with Indian spices, rice, and meat (chicken, beef, goat, pork, lamb, prawn, or fish), vegetables or eggs.",
      ja: "スパイス、米、肉、野菜を層にして炊き込んだ香り高い炊き込みご飯。"
    },
    flavorProfile: { sweet: 20, spicy: 60, sour: 10, salty: 50, umami: 75, bitter: 10 },
    ingredients: { primary: ["Basmati Rice", "Meat"], secondary: ["Saffron", "Cardamom"] }
  },
  {
    id: "in-3",
    country: "India",
    region: "asia",
    rank: 3,
    name: { native: "Samosa", en: "Samosa", ja: "サモサ" },
    description: {
      en: "Fried or baked pastry with a savory filling, such as spiced potatoes, onions, peas, cheese, beef and other meats.",
      ja: "スパイスで味付けしたジャガイモなどを小麦粉の皮で包んで揚げたスナック。"
    },
    flavorProfile: { sweet: 10, spicy: 50, sour: 10, salty: 40, umami: 40, bitter: 5 },
    ingredients: { primary: ["Potatoes", "Flour"], secondary: ["Peas", "Cumin"] }
  },
  {
    id: "vn-1",
    country: "Vietnam",
    region: "asia",
    rank: 1,
    name: { native: "Phở", en: "Pho", ja: "フォー" },
    description: {
      en: "Soup consisting of broth, rice noodles, herbs, and meat (usually beef or chicken). Vietnam's national dish.",
      ja: "牛骨や鶏ガラの澄んだスープに米麺と肉、ハーブを入れたベトナムの国民食。"
    },
    flavorProfile: { sweet: 20, spicy: 20, sour: 30, salty: 50, umami: 80, bitter: 5 },
    ingredients: { primary: ["Rice Noodles", "Beef Broth"], secondary: ["Bean Sprouts", "Basil", "Lime"] }
  },
  {
    id: "vn-2",
    country: "Vietnam",
    region: "asia",
    rank: 2,
    name: { native: "Bánh mì", en: "Banh Mi", ja: "バインミー" },
    description: {
      en: "A savory Vietnamese sandwich consisting of a baguette filled with various ingredients like meat, pâté, and pickled vegetables.",
      ja: "フランスパンにパテ、肉、なますなどの野菜を挟んだベトナム風サンドイッチ。"
    },
    flavorProfile: { sweet: 30, spicy: 40, sour: 50, salty: 60, umami: 70, bitter: 0 },
    ingredients: { primary: ["Baguette", "Pâté"], secondary: ["Pickles", "Cilantro"] }
  },
  {
    id: "vn-3",
    country: "Vietnam",
    region: "asia",
    rank: 3,
    name: { native: "Gỏi cuốn", en: "Summer Roll", ja: "生春巻き" },
    description: {
      en: "Fresh spring rolls made with rice paper, filled with pork, prawn, vegetables, bun (rice vermicelli), and other ingredients.",
      ja: "ライスペーパーで海老、野菜、ハーブなどを包んだヘルシーな春巻き。"
    },
    flavorProfile: { sweet: 30, spicy: 20, sour: 20, salty: 30, umami: 50, bitter: 10 },
    ingredients: { primary: ["Rice Paper", "Shrimp"], secondary: ["Rice Vermicelli", "Herbs"] }
  },

  // --- EUROPE (6 Countries) ---
  {
    id: "fr-1",
    country: "France",
    region: "europe",
    rank: 1,
    name: { native: "Pot-au-feu", en: "Pot-au-feu", ja: "ポトフ" },
    description: {
      en: "A French beef stew. Often celebrated as the quintessence of French family cuisine.",
      ja: "牛肉と野菜を長時間煮込んだフランスの家庭料理の代表格。"
    },
    flavorProfile: { sweet: 30, spicy: 0, sour: 0, salty: 40, umami: 80, bitter: 0 },
    ingredients: { primary: ["Beef", "Root Vegetables"], secondary: ["Bouquet Garni", "Marrowbone"] }
  },
  {
    id: "fr-2",
    country: "France",
    region: "europe",
    rank: 2,
    name: { native: "Coq au vin", en: "Coq au vin", ja: "コック・オ・ヴァン" },
    description: {
      en: "Chicken braised with wine, lardons, mushrooms, and optionally garlic.",
      ja: "鶏肉を赤ワインで煮込んだ料理。ベーコンやキノコと共に調理される。"
    },
    flavorProfile: { sweet: 20, spicy: 0, sour: 30, salty: 50, umami: 90, bitter: 10 },
    ingredients: { primary: ["Chicken", "Red Wine"], secondary: ["Mushrooms", "Bacon"] }
  },
  {
    id: "fr-3",
    country: "France",
    region: "europe",
    rank: 3,
    name: { native: "Croissant", en: "Croissant", ja: "クロワッサン" },
    description: {
      en: "A buttery, flaky, viennoiserie pastry of Austrian origin, named for its historical crescent shape.",
      ja: "バターを層状に折り込んだ、サクサクとした食感が特徴の三日月形のパン。"
    },
    flavorProfile: { sweet: 30, spicy: 0, sour: 0, salty: 30, umami: 40, bitter: 0 },
    ingredients: { primary: ["Flour", "Butter"], secondary: ["Yeast", "Milk"] }
  },
  {
    id: "it-1",
    country: "Italy",
    region: "europe",
    rank: 1,
    name: { native: "Pizza Margherita", en: "Pizza Margherita", ja: "マルゲリータ" },
    description: {
      en: "A typical Neapolitan pizza, made with San Marzano tomatoes, mozzarella cheese, fresh basil, salt, and extra-virgin olive oil.",
      ja: "トマト、モッツァレラチーズ、バジルを使用したイタリア国旗の色を模したナポリピッツァの代表。"
    },
    flavorProfile: { sweet: 30, spicy: 0, sour: 40, salty: 50, umami: 80, bitter: 5 },
    ingredients: { primary: ["Dough", "Tomato"], secondary: ["Mozzarella", "Basil", "Olive Oil"] }
  },
  {
    id: "it-2",
    country: "Italy",
    region: "europe",
    rank: 2,
    name: { native: "Pasta Carbonara", en: "Carbonara", ja: "カルボナーラ" },
    description: {
      en: "An Italian pasta dish from Rome made with egg, hard cheese, cured pork, and black pepper.",
      ja: "卵、チーズ、グアンチャーレ（豚肉）、黒胡椒で作るローマ発祥のパスタ。"
    },
    flavorProfile: { sweet: 10, spicy: 20, sour: 0, salty: 70, umami: 90, bitter: 0 },
    ingredients: { primary: ["Pasta", "Egg"], secondary: ["Pecorino Romano", "Guanciale", "Black Pepper"] }
  },
  {
    id: "it-3",
    country: "Italy",
    region: "europe",
    rank: 3,
    name: { native: "Lasagne", en: "Lasagna", ja: "ラザニア" },
    description: {
      en: "Wide, flat pasta baked in layers with ragù (meat sauce), béchamel sauce, and cheese.",
      ja: "シート状のパスタ、ミートソース、ホワイトソース、チーズを層にして焼いた料理。"
    },
    flavorProfile: { sweet: 30, spicy: 0, sour: 20, salty: 60, umami: 90, bitter: 0 },
    ingredients: { primary: ["Lasagna Sheets", "Ragù"], secondary: ["Béchamel Sauce", "Parmesan"] }
  },
  {
    id: "es-1",
    country: "Spain",
    region: "europe",
    rank: 1,
    name: { native: "Paella", en: "Paella", ja: "パエリア" },
    description: {
      en: "A rice dish originally from Valencia, cooked in a wide, shallow pan with saffron, vegetables, and meat or seafood.",
      ja: "サフランで色付けした米を、魚介や肉、野菜と共に平たい鍋で炊き上げたバレンシア地方の料理。"
    },
    flavorProfile: { sweet: 10, spicy: 10, sour: 10, salty: 60, umami: 85, bitter: 10 },
    ingredients: { primary: ["Rice", "Saffron"], secondary: ["Seafood", "Rabbit", "Beans"] }
  },
  {
    id: "es-2",
    country: "Spain",
    region: "europe",
    rank: 2,
    name: { native: "Jamón Ibérico", en: "Iberian Ham", ja: "イベリコハム" },
    description: {
      en: "A type of cured ham produced in Spain and Portugal, made from black Iberian pigs.",
      ja: "イベリコ豚を使用したスペインの最高級生ハム。濃厚な旨味と脂の甘みが特徴。"
    },
    flavorProfile: { sweet: 20, spicy: 5, sour: 10, salty: 80, umami: 95, bitter: 5 },
    ingredients: { primary: ["Iberian Pork"], secondary: ["Salt"] }
  },
  {
    id: "es-3",
    country: "Spain",
    region: "europe",
    rank: 3,
    name: { native: "Gazpacho", en: "Gazpacho", ja: "ガスパチョ" },
    description: {
      en: "A cold soup made of raw, blended vegetables. A classic of Spanish cuisine, typically from Andalusia.",
      ja: "トマトなどの生野菜をミキサーにかけた、アンダルシア地方発祥の冷製スープ。"
    },
    flavorProfile: { sweet: 30, spicy: 10, sour: 60, salty: 40, umami: 50, bitter: 10 },
    ingredients: { primary: ["Tomato", "Cucumber"], secondary: ["Pepper", "Olive Oil", "Garlic"] }
  },
  {
    id: "de-1",
    country: "Germany",
    region: "europe",
    rank: 1,
    name: { native: "Sauerbraten", en: "Sauerbraten", ja: "ザウアーブラーテン" },
    description: {
      en: "A German pot roast that can be prepared with a variety of meats, most often beef, marinated for days.",
      ja: "酢やスパイスに数日間漬け込んだ肉を蒸し焼きにした、ドイツの国民的鍋料理。"
    },
    flavorProfile: { sweet: 40, spicy: 10, sour: 70, salty: 50, umami: 80, bitter: 5 },
    ingredients: { primary: ["Beef", "Vinegar"], secondary: ["Spices", "Gingersnaps"] }
  },
  {
    id: "de-2",
    country: "Germany",
    region: "europe",
    rank: 2,
    name: { native: "Bratwurst", en: "Bratwurst", ja: "ブラートヴルスト" },
    description: {
      en: "A type of German sausage made from veal, beef, or most commonly pork.",
      ja: "焼いて食べることを前提としたドイツのソーセージ。屋台料理の定番。"
    },
    flavorProfile: { sweet: 10, spicy: 20, sour: 0, salty: 70, umami: 80, bitter: 0 },
    ingredients: { primary: ["Pork", "Spices"], secondary: ["Mustard", "Roll"] }
  },
  {
    id: "de-3",
    country: "Germany",
    region: "europe",
    rank: 3,
    name: { native: "Kartoffelpuffer", en: "Potato Pancakes", ja: "カルトッフェルプッファー" },
    description: {
      en: "Shallow-fried pancakes of grated or ground potato, flour and egg, often eaten with apple sauce.",
      ja: "ジャガイモをすりおろして揚げ焼きにしたパンケーキ。リンゴソースを添えて食べる。"
    },
    flavorProfile: { sweet: 30, spicy: 0, sour: 0, salty: 50, umami: 50, bitter: 0 },
    ingredients: { primary: ["Potato", "Oil"], secondary: ["Applesauce"] }
  },
  {
    id: "gb-1",
    country: "UK",
    region: "europe",
    rank: 1,
    name: { native: "Fish and Chips", en: "Fish and Chips", ja: "フィッシュ＆チップス" },
    description: {
      en: "A hot dish consisting of fried fish in batter, served with chips. A common take-away food in the United Kingdom.",
      ja: "白身魚のフライと棒状のフライドポテトを組み合わせたイギリスの代表的な料理。"
    },
    flavorProfile: { sweet: 10, spicy: 0, sour: 30, salty: 60, umami: 60, bitter: 5 },
    ingredients: { primary: ["Cod or Haddock", "Potato"], secondary: ["Batter", "Vinegar", "Tartar Sauce"] }
  },
  {
    id: "gb-2",
    country: "UK",
    region: "europe",
    rank: 2,
    name: { native: "Sunday Roast", en: "Sunday Roast", ja: "サンデーロースト" },
    description: {
      en: "A traditional British main meal that is typically served on Sunday, consisting of roasted meat, roast potato, and accompaniments.",
      ja: "日曜日に食べられる伝統的な食事。ローストビーフ、ジャガイモ、ヨークシャープディングなどがセット。"
    },
    flavorProfile: { sweet: 20, spicy: 0, sour: 0, salty: 50, umami: 85, bitter: 0 },
    ingredients: { primary: ["Roast Beef", "Yorkshire Pudding"], secondary: ["Gravy", "Vegetables"] }
  },
  {
    id: "gb-3",
    country: "UK",
    region: "europe",
    rank: 3,
    name: { native: "Full English Breakfast", en: "Full English", ja: "フル・ブレックファスト" },
    description: {
      en: "A substantial breakfast including bacon, sausages, eggs, black pudding, baked beans, tomatoes and mushrooms.",
      ja: "ベーコン、卵、ソーセージ、豆、トマトなどを盛り合わせたボリューム満点の朝食。"
    },
    flavorProfile: { sweet: 30, spicy: 10, sour: 10, salty: 70, umami: 80, bitter: 5 },
    ingredients: { primary: ["Bacon", "Eggs"], secondary: ["Sausages", "Beans", "Black Pudding"] }
  },
  {
    id: "gr-1",
    country: "Greece",
    region: "europe",
    rank: 1,
    name: { native: "Moussaka", en: "Moussaka", ja: "ムサカ" },
    description: {
      en: "An eggplant- or potato-based dish, often including ground meat, which is common in the Balkans and the Middle East.",
      ja: "ナス、ひき肉、ジャガイモを層にし、ベシャメルソースをかけて焼いたギリシャ料理。"
    },
    flavorProfile: { sweet: 20, spicy: 10, sour: 10, salty: 50, umami: 80, bitter: 10 },
    ingredients: { primary: ["Eggplant", "Ground Meat"], secondary: ["Béchamel Sauce", "Potato"] }
  },
  {
    id: "gr-2",
    country: "Greece",
    region: "europe",
    rank: 2,
    name: { native: "Souvlaki", en: "Souvlaki", ja: "スブラキ" },
    description: {
      en: "Small pieces of meat and sometimes vegetables grilled on a skewer.",
      ja: "小さく切った肉を串焼きにした料理。ピタパンに挟んで食べることも多い。"
    },
    flavorProfile: { sweet: 10, spicy: 20, sour: 30, salty: 60, umami: 70, bitter: 10 },
    ingredients: { primary: ["Pork or Chicken", "Pita"], secondary: ["Tzatziki", "Lemon"] }
  },
  {
    id: "gr-3",
    country: "Greece",
    region: "europe",
    rank: 3,
    name: { native: "Spanakopita", en: "Spanakopita", ja: "スパナコピタ" },
    description: {
      en: "A Greek savory pastry, typically with a filling of chopped spinach, feta cheese, onions or scallions, and egg.",
      ja: "ホウレンソウとフェタチーズをフィロ生地で包んで焼いたパイ。"
    },
    flavorProfile: { sweet: 10, spicy: 0, sour: 20, salty: 60, umami: 50, bitter: 20 },
    ingredients: { primary: ["Spinach", "Feta Cheese"], secondary: ["Phyllo Dough", "Onion"] }
  },

  // --- AMERICAS (4 Countries) ---
  {
    id: "us-1",
    country: "USA",
    region: "americas",
    rank: 1,
    name: { native: "Hamburger", en: "Hamburger", ja: "ハンバーガー" },
    description: {
      en: "A sandwich consisting of one or more cooked patties of ground meat, usually beef, placed inside a sliced bread roll or bun.",
      ja: "パンにハンバーグ（パティ）を挟んだアメリカの象徴的な料理。"
    },
    flavorProfile: { sweet: 20, spicy: 10, sour: 10, salty: 60, umami: 80, bitter: 5 },
    ingredients: { primary: ["Beef Patty", "Bun"], secondary: ["Lettuce", "Tomato", "Cheese"] }
  },
  {
    id: "us-2",
    country: "USA",
    region: "americas",
    rank: 2,
    name: { native: "Barbecue Ribs", en: "BBQ Ribs", ja: "バーベキューリブ" },
    description: {
      en: "Pork or beef ribs cooked slowly over wood smoke, often covered in a vinegar- or tomato-based sauce.",
      ja: "豚や牛のリブを低温で長時間燻製し、BBQソースを絡めた料理。"
    },
    flavorProfile: { sweet: 60, spicy: 30, sour: 30, salty: 60, umami: 90, bitter: 10 },
    ingredients: { primary: ["Pork/Beef Ribs"], secondary: ["BBQ Sauce", "Wood Smoke"] }
  },
  {
    id: "us-3",
    country: "USA",
    region: "americas",
    rank: 3,
    name: { native: "Apple Pie", en: "Apple Pie", ja: "アップルパイ" },
    description: {
      en: "A pie in which the principal filling ingredient is apples, often served with whipped cream or ice cream.",
      ja: "リンゴを甘く煮てパイ生地で包んだデザート。アメリカの家庭の味。"
    },
    flavorProfile: { sweet: 80, spicy: 10, sour: 30, salty: 20, umami: 10, bitter: 5 },
    ingredients: { primary: ["Apples", "Pie Crust"], secondary: ["Cinnamon", "Sugar"] }
  },
  {
    id: "mx-1",
    country: "Mexico",
    region: "americas",
    rank: 1,
    name: { native: "Tacos", en: "Tacos", ja: "タコス" },
    description: {
      en: "A traditional Mexican dish consisting of a small hand-sized corn or wheat tortilla topped with a filling.",
      ja: "トウモロコシや小麦のトルティーヤに様々な具材を包んだメキシコのソウルフード。"
    },
    flavorProfile: { sweet: 10, spicy: 70, sour: 40, salty: 50, umami: 70, bitter: 5 },
    ingredients: { primary: ["Tortilla", "Meat"], secondary: ["Salsa", "Cilantro", "Lime"] }
  },
  {
    id: "mx-2",
    country: "Mexico",
    region: "americas",
    rank: 2,
    name: { native: "Mole Poblano", en: "Mole Poblano", ja: "モーレ・ポブラーノ" },
    description: {
      en: "A traditional sauce used in Mexican cuisine, known for containing chocolate and chili peppers.",
      ja: "チョコレートと唐辛子を使った複雑で濃厚なソース。鶏肉にかけて食べるのが一般的。"
    },
    flavorProfile: { sweet: 40, spicy: 50, sour: 10, salty: 40, umami: 80, bitter: 30 },
    ingredients: { primary: ["Chocolate", "Chili Peppers"], secondary: ["Spices", "Chicken"] }
  },
  {
    id: "mx-3",
    country: "Mexico",
    region: "americas",
    rank: 3,
    name: { native: "Tamales", en: "Tamales", ja: "タマレス" },
    description: {
      en: "Made of masa or dough, which is steamed in a corn husk or banana leaf.",
      ja: "トウモロコシの粉で作った生地に具を入れ、トウモロコシの皮やバナナの葉で包んで蒸したもの。"
    },
    flavorProfile: { sweet: 20, spicy: 40, sour: 10, salty: 40, umami: 60, bitter: 5 },
    ingredients: { primary: ["Masa (Corn Dough)"], secondary: ["Meat", "Corn Husk"] }
  },
  {
    id: "br-1",
    country: "Brazil",
    region: "americas",
    rank: 1,
    name: { native: "Feijoada", en: "Feijoada", ja: "フェイジョアーダ" },
    description: {
      en: "A stew of beans with beef and pork. It is commonly prepared in Portugal and Brazil.",
      ja: "黒豆と豚肉、牛肉を煮込んだブラジルの国民食。ご飯にかけて食べる。"
    },
    flavorProfile: { sweet: 10, spicy: 20, sour: 10, salty: 70, umami: 80, bitter: 10 },
    ingredients: { primary: ["Black Beans", "Pork"], secondary: ["Beef", "Garlic"] }
  },
  {
    id: "br-2",
    country: "Brazil",
    region: "americas",
    rank: 2,
    name: { native: "Churrasco", en: "Churrasco", ja: "シュラスコ" },
    description: {
      en: "Grilled meat, Brazilian barbecue style. Typically served rodizio style with waiters moving around with skewers.",
      ja: "鉄串に刺した肉を炭火で焼くブラジル式バーベキュー。"
    },
    flavorProfile: { sweet: 10, spicy: 10, sour: 0, salty: 60, umami: 95, bitter: 5 },
    ingredients: { primary: ["Beef (Picanha)"], secondary: ["Coarse Salt"] }
  },
  {
    id: "br-3",
    country: "Brazil",
    region: "americas",
    rank: 3,
    name: { native: "Pão de Queijo", en: "Cheese Bread", ja: "ポン・デ・ケージョ" },
    description: {
      en: "Small, baked cheese roll or cheese bun, a popular snack and breakfast food in Brazil.",
      ja: "タピオカ粉を使ったチーズパン。モチモチとした食感が特徴。"
    },
    flavorProfile: { sweet: 10, spicy: 0, sour: 10, salty: 50, umami: 40, bitter: 0 },
    ingredients: { primary: ["Cassava Flour", "Cheese"], secondary: ["Egg", "Milk"] }
  },
  {
    id: "pe-1",
    country: "Peru",
    region: "americas",
    rank: 1,
    name: { native: "Ceviche", en: "Ceviche", ja: "セビチェ" },
    description: {
      en: "Fresh raw fish cured in fresh citrus juices, most commonly lemon or lime, and spiced with ají, chili peppers.",
      ja: "新鮮な生の魚介類をレモンやライムの果汁、唐辛子などでマリネした酸味のある料理。"
    },
    flavorProfile: { sweet: 10, spicy: 50, sour: 90, salty: 50, umami: 70, bitter: 10 },
    ingredients: { primary: ["Raw Fish", "Lime Juice"], secondary: ["Onion", "Cilantro", "Chili"] }
  },
  {
    id: "pe-2",
    country: "Peru",
    region: "americas",
    rank: 2,
    name: { native: "Lomo Saltado", en: "Lomo Saltado", ja: "ロモ・サルタード" },
    description: {
      en: "A stir fry that typically combines marinated strips of sirloin (or other beef steak) with onions, tomatoes, french fries, and other ingredients.",
      ja: "牛肉、野菜、フライドポテトを炒めた料理。中華料理の影響を受けている。"
    },
    flavorProfile: { sweet: 20, spicy: 20, sour: 20, salty: 60, umami: 80, bitter: 5 },
    ingredients: { primary: ["Beef", "French Fries"], secondary: ["Onions", "Tomatoes", "Soy Sauce"] }
  },
  {
    id: "pe-3",
    country: "Peru",
    region: "americas",
    rank: 3,
    name: { native: "Ají de Gallina", en: "Aji de Gallina", ja: "アヒ・デ・ガリナ" },
    description: {
      en: "A Peruvian chicken stew made with cream, cheese, aji amarillo (yellow chili), and nuts.",
      ja: "黄色い唐辛子（アヒ・アマリージョ）とミルク、チーズで作るクリーミーな鶏肉のシチュー。"
    },
    flavorProfile: { sweet: 20, spicy: 40, sour: 0, salty: 50, umami: 70, bitter: 5 },
    ingredients: { primary: ["Chicken", "Aji Amarillo"], secondary: ["Bread", "Milk", "Walnuts"] }
  },

  // --- MIDDLE EAST & AFRICA (4 Countries) ---
  {
    id: "tr-1",
    country: "Turkey",
    region: "middle-east-africa",
    rank: 1,
    name: { native: "Döner Kebab", en: "Doner Kebab", ja: "ドネルケバブ" },
    description: {
      en: "Meat cooked on a vertical rotisserie. Seasoned meat stacked in the shape of an inverted cone is turned slowly on the rotisserie.",
      ja: "垂直の回転串で焼いた肉を削ぎ落として食べるトルコ料理。"
    },
    flavorProfile: { sweet: 10, spicy: 40, sour: 20, salty: 60, umami: 80, bitter: 5 },
    ingredients: { primary: ["Lamb/Beef", "Pita"], secondary: ["Yogurt Sauce", "Vegetables"] }
  },
  {
    id: "tr-2",
    country: "Turkey",
    region: "middle-east-africa",
    rank: 2,
    name: { native: "Baklava", en: "Baklava", ja: "バクラヴァ" },
    description: {
      en: "A layered pastry dessert made of filo pastry, filled with chopped nuts, and sweetened with syrup or honey.",
      ja: "何層にも重ねた薄い生地にナッツを挟み、シロップをたっぷりかけた非常に甘い菓子。"
    },
    flavorProfile: { sweet: 95, spicy: 0, sour: 5, salty: 10, umami: 20, bitter: 5 },
    ingredients: { primary: ["Phyllo Dough", "Nuts"], secondary: ["Honey", "Butter"] }
  },
  {
    id: "tr-3",
    country: "Turkey",
    region: "middle-east-africa",
    rank: 3,
    name: { native: "Meze", en: "Meze", ja: "メゼ" },
    description: {
      en: "A selection of small dishes served as appetizers, including dips like hummus, tzatziki, and stuffed vegetables.",
      ja: "食事の前に出される小皿料理の盛り合わせ。フムスや野菜の詰め物など多彩。"
    },
    flavorProfile: { sweet: 20, spicy: 30, sour: 50, salty: 60, umami: 60, bitter: 20 },
    ingredients: { primary: ["Vegetables", "Yogurt"], secondary: ["Olive Oil", "Spices"] }
  },
  {
    id: "ma-1",
    country: "Morocco",
    region: "middle-east-africa",
    rank: 1,
    name: { native: "Tagine", en: "Tagine", ja: "タジン" },
    description: {
      en: "A slow-cooked savory stew named after the earthenware pot in which it is cooked.",
      ja: "円錐形の蓋を持つ独特の土鍋で水分を逃さず蒸し煮にしたシチュー。"
    },
    flavorProfile: { sweet: 40, spicy: 40, sour: 20, salty: 50, umami: 70, bitter: 10 },
    ingredients: { primary: ["Meat", "Vegetables"], secondary: ["Dried Fruit", "Spices"] }
  },
  {
    id: "ma-2",
    country: "Morocco",
    region: "middle-east-africa",
    rank: 2,
    name: { native: "Couscous", en: "Couscous", ja: "クスクス" },
    description: {
      en: "Small steamed balls of crushed durum wheat semolina, usually served with a stew spooned on top.",
      ja: "世界最小のパスタとも呼ばれる粒状のデュラム小麦。シチューと一緒に食べる。"
    },
    flavorProfile: { sweet: 20, spicy: 10, sour: 0, salty: 30, umami: 40, bitter: 0 },
    ingredients: { primary: ["Semolina", "Water"], secondary: ["Stew (Meat/Veg)"] }
  },
  {
    id: "ma-3",
    country: "Morocco",
    region: "middle-east-africa",
    rank: 3,
    name: { native: "Harira", en: "Harira", ja: "ハリラ" },
    description: {
      en: "A traditional soup made of tomato, lentils, and chickpeas, often consumed during Ramadan to break the fast.",
      ja: "トマト、レンズ豆、ヒヨコ豆などが入った栄養豊富なスープ。ラマダン明けによく飲まれる。"
    },
    flavorProfile: { sweet: 10, spicy: 30, sour: 20, salty: 50, umami: 60, bitter: 5 },
    ingredients: { primary: ["Tomato", "Lentils"], secondary: ["Chickpeas", "Cilantro"] }
  },
  {
    id: "lb-1",
    country: "Lebanon",
    region: "middle-east-africa",
    rank: 1,
    name: { native: "Kibbeh", en: "Kibbeh", ja: "キッベ" },
    description: {
      en: "Levantine dish made of bulgur, minced onions, and finely ground meat (usually beef, lamb, goat, or camel).",
      ja: "挽き肉とブルグル（挽き割り小麦）を混ぜて揚げたレバノンの国民的コロッケ。"
    },
    flavorProfile: { sweet: 10, spicy: 30, sour: 10, salty: 50, umami: 70, bitter: 5 },
    ingredients: { primary: ["Ground Meat", "Bulgur"], secondary: ["Onions", "Pine Nuts"] }
  },
  {
    id: "lb-2",
    country: "Lebanon",
    region: "middle-east-africa",
    rank: 2,
    name: { native: "Tabbouleh", en: "Tabbouleh", ja: "タブーリ" },
    description: {
      en: "A vegetarian salad made mostly of finely chopped parsley, with tomatoes, mint, onion, bulgur, and seasoned with olive oil and lemon juice.",
      ja: "パセリを大量に使ったサラダ。ブルグル、トマト、ミントなどをレモンとオリーブ油で和える。"
    },
    flavorProfile: { sweet: 0, spicy: 10, sour: 80, salty: 40, umami: 30, bitter: 30 },
    ingredients: { primary: ["Parsley", "Bulgur"], secondary: ["Tomato", "Lemon Juice"] }
  },
  {
    id: "lb-3",
    country: "Lebanon",
    region: "middle-east-africa",
    rank: 3,
    name: { native: "Hummus", en: "Hummus", ja: "フムス" },
    description: {
      en: "A dip, spread, or savory dish made from cooked, mashed chickpeas blended with tahini, lemon juice, and garlic.",
      ja: "ヒヨコ豆のペーストに練りゴマ、ニンニク、レモンを加えた滑らかなディップ。"
    },
    flavorProfile: { sweet: 10, spicy: 10, sour: 30, salty: 40, umami: 60, bitter: 10 },
    ingredients: { primary: ["Chickpeas", "Tahini"], secondary: ["Garlic", "Lemon Juice"] }
  },
  {
    id: "eg-1",
    country: "Egypt",
    region: "middle-east-africa",
    rank: 1,
    name: { native: "Koshary", en: "Koshary", ja: "コシャリ" },
    description: {
      en: "Egypt's national dish, mixing pasta, rice, and lentils, topped with tomato sauce and fried onions.",
      ja: "米、マカロニ、レンズ豆をミックスし、トマトソースとフライドオニオンをかけたエジプトの国民食。"
    },
    flavorProfile: { sweet: 20, spicy: 40, sour: 30, salty: 50, umami: 60, bitter: 5 },
    ingredients: { primary: ["Rice", "Macaroni", "Lentils"], secondary: ["Tomato Sauce", "Fried Onions"] }
  },
  {
    id: "eg-2",
    country: "Egypt",
    region: "middle-east-africa",
    rank: 2,
    name: { native: "Ful Medames", en: "Ful Medames", ja: "フール・ミダンミス" },
    description: {
      en: "A stew of cooked fava beans served with vegetable oil, cumin, and optionally with chopped parsley, garlic, onion, lemon juice.",
      ja: "ソラマメを煮込んで油やスパイスで味付けした料理。エジプトの朝食の定番。"
    },
    flavorProfile: { sweet: 10, spicy: 20, sour: 30, salty: 40, umami: 60, bitter: 10 },
    ingredients: { primary: ["Fava Beans"], secondary: ["Cumin", "Oil", "Lemon"] }
  },
  {
    id: "eg-3",
    country: "Egypt",
    region: "middle-east-africa",
    rank: 3,
    name: { native: "Ta'ameya", en: "Falafel", ja: "ターメイヤ" },
    description: {
      en: "Egyptian falafel made from fava beans (unlike chickpea falafel elsewhere), deep-fried and served in pita.",
      ja: "ソラマメで作るエジプト風ファラフェル（コロッケ）。中が緑色なのが特徴。"
    },
    flavorProfile: { sweet: 10, spicy: 30, sour: 10, salty: 50, umami: 60, bitter: 5 },
    ingredients: { primary: ["Fava Beans", "Herbs"], secondary: ["Spices", "Sesame"] }
  }
];
