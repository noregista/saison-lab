// MINUTE LAB - 15記事データ
// 意図: 初期シードコンテンツ（5カテゴリ×3記事）

import { Article } from './types';

// 意図: 15記事の完全データ
export const articles: Article[] = [
    // ===== 歴史 (History) =====
    {
        id: 'french-revolution',
        slug: 'french-revolution',
        category: 'history',
        title: { jp: 'フランス革命', en: 'The French Revolution' },
        subtitle: { jp: 'わずか10年で世界を変えた市民の反乱', en: 'The citizen uprising that changed the world in just 10 years' },
        summary: [
            { jp: '1789年、重税と食糧不足に苦しむ市民がバスティーユ監獄を襲撃', en: 'In 1789, citizens suffering from heavy taxes and food shortages stormed the Bastille' },
            { jp: '「自由・平等・博愛」の理念が世界中の民主主義運動に影響', en: 'The ideals of "Liberty, Equality, Fraternity" influenced democratic movements worldwide' },
            { jp: '王政から共和制へ、近代国家の原型を生み出した', en: 'Created the prototype of modern nation-states, from monarchy to republic' },
        ],
        body: {
            jp: '1789年7月14日、パリの民衆はバスティーユ監獄を襲撃した。これがフランス革命の始まりである。当時のフランスは、貴族と聖職者が特権を享受する一方、一般市民（第三身分）は重税に苦しんでいた。さらに凶作による食糧不足が追い打ちをかけ、民衆の怒りは頂点に達した。革命は「自由・平等・博愛」を掲げ、人権宣言を採択。ルイ16世とマリー・アントワネットは処刑され、王政は崩壊した。この革命は単なる政変ではなく、「主権は国民にある」という近代民主主義の根本原理を確立した歴史的転換点である。その影響は世界中に波及し、今日の民主主義国家の礎となっている。',
            en: 'On July 14, 1789, Parisian citizens stormed the Bastille prison, marking the beginning of the French Revolution. France at the time saw nobles and clergy enjoying privileges while ordinary citizens suffered heavy taxes. A poor harvest added fuel to popular anger. The revolution, proclaiming "Liberty, Equality, Fraternity," adopted the Declaration of the Rights of Man. Louis XVI and Marie Antoinette were executed, ending the monarchy. This was not merely a regime change but a historic turning point establishing the fundamental principle that sovereignty belongs to the people. Its influence spread worldwide, forming the foundation of modern democratic nations.',
        },
        image: '/minute-lab/images/french-revolution.png',
        readTimeSeconds: 60,
        keywords: ['フランス革命', 'バスティーユ', '民主主義', '人権宣言'],
        publishedAt: '2026-01-19',
    },
    {
        id: 'industrial-revolution',
        slug: 'industrial-revolution',
        category: 'history',
        title: { jp: '産業革命', en: 'The Industrial Revolution' },
        subtitle: { jp: '蒸気の力が人類の生活を一変させた', en: 'How steam power transformed human life' },
        summary: [
            { jp: '18世紀後半のイギリスで始まり、手工業から機械工業へ移行', en: 'Began in late 18th century Britain, shifting from handicrafts to machine manufacturing' },
            { jp: '蒸気機関の発明により、生産効率が飛躍的に向上', en: 'The invention of the steam engine dramatically improved production efficiency' },
            { jp: '都市化と労働者階級の誕生、現代社会の原型を形成', en: 'Urbanization and the birth of the working class shaped modern society' },
        ],
        body: {
            jp: '18世紀後半、イギリスで始まった産業革命は、人類史上最大の転換点の一つである。ジェームズ・ワットが改良した蒸気機関により、紡績や製鉄の生産効率は飛躍的に向上した。工場制度が確立され、人々は農村から都市へ移住。労働者階級が誕生し、資本主義経済の基盤が形成された。しかし、急速な工業化は児童労働や劣悪な労働環境といった社会問題も生んだ。鉄道の発達により物流が革命的に変化し、世界経済は一つに結びつき始めた。産業革命は単なる技術革新ではなく、社会構造、家族のあり方、そして人間の時間感覚さえも根本から変えた「文明の再定義」だった。',
            en: 'The Industrial Revolution, beginning in late 18th century Britain, was one of humanity\'s greatest turning points. James Watt\'s improved steam engine dramatically boosted production in spinning and ironmaking. The factory system emerged, people migrated from farms to cities, creating a working class and the foundations of capitalist economy. However, rapid industrialization also created social problems like child labor and poor working conditions. Railways revolutionized logistics, beginning to unite the world economy. The Industrial Revolution was not just technological innovation but a "redefinition of civilization" that fundamentally changed social structure, family life, and even human perception of time.',
        },
        image: '/minute-lab/images/industrial-revolution.png',
        readTimeSeconds: 60,
        keywords: ['産業革命', '蒸気機関', '工場制度', '資本主義'],
        publishedAt: '2026-01-19',
    },
    {
        id: 'end-of-sengoku',
        slug: 'end-of-sengoku',
        category: 'history',
        title: { jp: '戦国時代の終焉', en: 'End of the Sengoku Period' },
        subtitle: { jp: '150年の戦乱を終わらせた三英傑', en: 'Three great leaders who ended 150 years of warfare' },
        summary: [
            { jp: '織田信長が天下統一への道を切り開き、旧来の権威を打破', en: 'Oda Nobunaga paved the way for unification, breaking down old authorities' },
            { jp: '豊臣秀吉が信長の遺志を継ぎ、全国統一を達成', en: 'Toyotomi Hideyoshi inherited Nobunaga\'s will and achieved national unification' },
            { jp: '徳川家康が関ヶ原で勝利し、260年の太平の世を築いた', en: 'Tokugawa Ieyasu won at Sekigahara and established 260 years of peace' },
        ],
        body: {
            jp: '日本の戦国時代は約150年にわたる群雄割拠の時代だった。この混乱を終わらせたのが「三英傑」と呼ばれる織田信長、豊臣秀吉、徳川家康である。信長は楽市楽座や鉄砲の活用など革新的な政策で勢力を拡大したが、本能寺の変で命を落とす。その遺志を継いだ秀吉は全国統一を達成し、刀狩りや太閤検地で武士と農民の身分を固定した。しかし秀吉の死後、天下の行方は関ヶ原の戦いで決まる。1600年、徳川家康率いる東軍が勝利し、1603年に江戸幕府を開府。以後260年間、日本は「パクス・トクガワーナ（徳川の平和）」と呼ばれる安定期を迎えた。',
            en: 'Japan\'s Sengoku period was about 150 years of warring states. Three great leaders ended this chaos: Oda Nobunaga, Toyotomi Hideyoshi, and Tokugawa Ieyasu. Nobunaga expanded his power through innovative policies like free markets and firearms but died at Honnoji. Hideyoshi inherited his will, unified Japan, and fixed class distinctions through sword hunts and land surveys. After Hideyoshi\'s death, Japan\'s fate was decided at Sekigahara. In 1600, Ieyasu\'s Eastern Army won, and in 1603 he established the Edo Shogunate. For the next 260 years, Japan entered a stable era called "Pax Tokugawa."',
        },
        image: '/minute-lab/images/end-of-sengoku.png',
        readTimeSeconds: 60,
        keywords: ['戦国時代', '織田信長', '豊臣秀吉', '徳川家康', '関ヶ原'],
        publishedAt: '2026-01-19',
    },

    // ===== 科学 (Science) =====
    {
        id: 'theory-of-relativity',
        slug: 'theory-of-relativity',
        category: 'science',
        title: { jp: '相対性理論', en: 'Theory of Relativity' },
        subtitle: { jp: 'E=mc²が意味する宇宙の真実', en: 'The cosmic truth behind E=mc²' },
        summary: [
            { jp: '時間と空間は絶対ではなく、観測者の速度によって変化する', en: 'Time and space are not absolute but change depending on the observer\'s velocity' },
            { jp: '質量とエネルギーは等価（E=mc²）で相互変換可能', en: 'Mass and energy are equivalent (E=mc²) and interconvertible' },
            { jp: '巨大な質量は時空を歪め、これが重力の正体である', en: 'Massive objects warp spacetime, which is the true nature of gravity' },
        ],
        body: {
            jp: '1905年、アインシュタインは特殊相対性理論を発表した。光の速度はどんな観測者から見ても一定であり、逆に時間と空間が変化するという革命的な発想だ。高速で移動する物体では時間がゆっくり進み（時間の遅れ）、長さが縮む。さらに有名なE=mc²は、質量がエネルギーに変換できることを示し、原子力の理論的基盤となった。1915年の一般相対性理論では、重力を「時空の歪み」として説明。太陽のような巨大質量は周囲の時空を曲げ、地球はその曲がった時空を「まっすぐ」進んでいるだけなのだ。GPSの精度も相対性理論なしには実現できない。100年前の理論が今も私たちの日常を支えている。',
            en: 'In 1905, Einstein published special relativity. The speed of light is constant for all observers, and instead, time and space change. For objects moving at high speed, time slows down and length contracts. The famous E=mc² shows that mass can convert to energy, providing the theoretical basis for nuclear power. In 1915, general relativity explained gravity as "warping of spacetime." Massive objects like the Sun bend surrounding spacetime, and Earth simply moves "straight" through this curved space. Even GPS accuracy would be impossible without relativity. This century-old theory still supports our daily lives.',
        },
        image: '/minute-lab/images/theory-of-relativity.png',
        readTimeSeconds: 60,
        keywords: ['相対性理論', 'アインシュタイン', 'E=mc²', '時空'],
        publishedAt: '2026-01-19',
    },
    {
        id: 'quantum-computer',
        slug: 'quantum-computer',
        category: 'science',
        title: { jp: '量子コンピュータ', en: 'Quantum Computing' },
        subtitle: { jp: '0と1を超えた計算革命', en: 'Computing revolution beyond 0 and 1' },
        summary: [
            { jp: '量子ビット（キュービット）は0と1を同時に持てる「重ね合わせ」状態で動作', en: 'Qubits operate in "superposition," holding 0 and 1 simultaneously' },
            { jp: '従来のコンピュータでは数千年かかる計算を数分で解ける可能性', en: 'Could solve calculations in minutes that would take traditional computers thousands of years' },
            { jp: '暗号解読、新薬開発、気候シミュレーションなどへの応用が期待される', en: 'Expected applications in cryptography, drug development, and climate simulation' },
        ],
        body: {
            jp: '従来のコンピュータは「ビット」を使い、0か1のどちらかで計算する。しかし量子コンピュータは「量子ビット（キュービット）」を使い、0と1を同時に持てる「重ね合わせ」状態で動作する。さらに複数のキュービットが「量子もつれ」で連動することで、並列計算能力が指数関数的に向上する。例えば、現在の暗号を解読するには従来のスパコンで数千年かかるが、量子コンピュータなら数分で可能になる可能性がある。ただし、量子状態は非常に不安定で、極低温環境が必要。まだ万能ではないが、新薬開発や材料科学、金融モデリングなど特定分野での革命が期待されている。',
            en: 'Traditional computers use "bits" that hold either 0 or 1. Quantum computers use "qubits" that can hold both 0 and 1 simultaneously through "superposition." When multiple qubits are connected through "quantum entanglement," parallel computing power grows exponentially. For example, breaking current encryption would take traditional supercomputers thousands of years, but quantum computers might do it in minutes. However, quantum states are extremely unstable and require ultra-low temperatures. While not yet universal, quantum computers promise revolution in specific fields like drug development, materials science, and financial modeling.',
        },
        image: '/minute-lab/images/quantum-computer.png',
        readTimeSeconds: 60,
        keywords: ['量子コンピュータ', 'キュービット', '重ね合わせ', '量子もつれ'],
        publishedAt: '2026-01-19',
    },
    {
        id: 'black-hole',
        slug: 'black-hole',
        category: 'science',
        title: { jp: 'ブラックホールの正体', en: 'The Nature of Black Holes' },
        subtitle: { jp: '光すら逃げられない宇宙の深淵', en: 'The cosmic abyss from which even light cannot escape' },
        summary: [
            { jp: '巨大な星が重力崩壊して生まれる、極限まで密度が高まった天体', en: 'Celestial objects born from gravitational collapse of massive stars, with extreme density' },
            { jp: '事象の地平面を超えると光さえ脱出できず、外から内部は観測不可能', en: 'Beyond the event horizon, even light cannot escape, making the interior unobservable' },
            { jp: '2019年に人類史上初めて実際の姿が撮影された', en: 'In 2019, humanity captured the first-ever actual image' },
        ],
        body: {
            jp: 'ブラックホールは、巨大な星が燃料を使い果たして重力崩壊した結果生まれる。物質が極限まで圧縮され、重力が強すぎて光すら脱出できない。その境界を「事象の地平面」と呼び、一度超えると何も戻れない。中心には密度無限大の「特異点」があるとされるが、現在の物理学では完全に説明できない謎だ。ブラックホールは直接見えないが、周囲のガスが高速で回転しながら光を放つ「降着円盤」で存在が分かる。2019年、EHTプロジェクトが世界初のブラックホール撮影に成功。オレンジ色のリングの中心にある黒い影が、まさに「光の監獄」なのである。',
            en: 'Black holes form when massive stars exhaust their fuel and undergo gravitational collapse. Matter is compressed to extremes, and gravity becomes so strong that even light cannot escape. This boundary is called the "event horizon"—once crossed, nothing returns. At the center lies a "singularity" of infinite density, a mystery current physics cannot fully explain. Black holes are invisible directly, but their presence is revealed by "accretion disks"—gas rotating at high speed and emitting light. In 2019, the EHT project captured the first-ever image of a black hole. The dark shadow at the center of that orange ring is truly a "prison of light."',
        },
        image: '/minute-lab/images/black-hole.png',
        readTimeSeconds: 60,
        keywords: ['ブラックホール', '事象の地平面', '特異点', '重力崩壊'],
        publishedAt: '2026-01-19',
    },

    // ===== 文化 (Culture) =====
    {
        id: 'renaissance',
        slug: 'renaissance',
        category: 'culture',
        title: { jp: 'ルネサンス', en: 'The Renaissance' },
        subtitle: { jp: '人間中心主義が花開いた文化革命', en: 'The cultural revolution where humanism flourished' },
        summary: [
            { jp: '14〜16世紀のイタリアで始まった古代ギリシャ・ローマ文化の復興運動', en: 'Revival movement of ancient Greek and Roman culture starting in 14th-16th century Italy' },
            { jp: 'レオナルド・ダ・ヴィンチやミケランジェロなど天才が続出', en: 'Produced geniuses like Leonardo da Vinci and Michelangelo' },
            { jp: '「人間」を中心に据えた世界観が、近代ヨーロッパ思想の基盤となった', en: 'Human-centered worldview became the foundation of modern European thought' },
        ],
        body: {
            jp: 'ルネサンス（再生）は、14世紀のイタリアで始まった文化運動だ。中世キリスト教社会が「神」を中心に据えたのに対し、ルネサンスは「人間」の可能性を追求した。フィレンツェのメディチ家などの富裕層がパトロンとなり、芸術家を支援。レオナルド・ダ・ヴィンチは画家であり科学者、ミケランジェロは彫刻と絵画の両方で傑作を残した。遠近法の発明により絵画はより写実的になり、印刷術の普及で知識は広く共有された。ルネサンスは単なる芸術運動ではない。科学的思考、個人の尊厳、批判的精神—これら近代の核心となる価値観が、この時代に芽生えたのである。',
            en: 'The Renaissance ("rebirth") was a cultural movement beginning in 14th century Italy. While medieval Christian society centered on "God," the Renaissance pursued human potential. Wealthy patrons like the Medici family of Florence supported artists. Leonardo da Vinci was both painter and scientist; Michelangelo created masterpieces in sculpture and painting. The invention of perspective made paintings more realistic, and the printing press spread knowledge widely. The Renaissance was more than an art movement. Scientific thinking, individual dignity, critical spirit—the core values of modernity sprouted in this era.',
        },
        image: '/minute-lab/images/renaissance.png',
        readTimeSeconds: 60,
        keywords: ['ルネサンス', 'レオナルド・ダ・ヴィンチ', 'ミケランジェロ', '人文主義'],
        publishedAt: '2026-01-19',
    },
    {
        id: 'impressionism',
        slug: 'impressionism',
        category: 'culture',
        title: { jp: '印象派', en: 'Impressionism' },
        subtitle: { jp: '光と色彩の革命が芸術の常識を覆した', en: 'The revolution of light and color that overturned artistic conventions' },
        summary: [
            { jp: '19世紀後半のフランスで誕生、モネやルノワールが代表的な画家', en: 'Born in late 19th century France, with Monet and Renoir as leading painters' },
            { jp: 'アトリエを出て屋外で描き、光の一瞬の「印象」を捉えることを重視', en: 'Left the studio to paint outdoors, emphasizing capturing momentary "impressions" of light' },
            { jp: '当初は批判されたが、現代アートへの道を切り開いた', en: 'Initially criticized but paved the way for modern art' },
        ],
        body: {
            jp: '1874年、モネの「印象、日の出」が展示された展覧会で、批評家は嘲笑的に「印象派」と呼んだ。しかしこの名前は逆に運動の象徴となる。印象派の画家たちはアトリエを出て屋外（プレネール）で描き、光と色彩の瞬間的な変化を捉えようとした。チューブ絵の具の発明がこれを可能にした。モネは同じ風景を異なる時間帯で描き、ルノワールは光に包まれた人々を表現した。当初は「未完成」と批判されたが、写真の登場で「現実の複製」の役割を失った絵画に、新たな存在意義を与えた。印象派なしに、ゴッホもピカソも、現代アートも存在しなかっただろう。',
            en: 'In 1874, a critic mockingly called an exhibition featuring Monet\'s "Impression, Sunrise" the "Impressionists." But the name became a symbol of the movement. Impressionist painters left studios to work outdoors (en plein air), capturing momentary changes in light and color. Tube paints made this possible. Monet painted the same scene at different times of day; Renoir depicted people bathed in light. Initially criticized as "unfinished," these works gave painting new purpose after photography took over "copying reality." Without Impressionism, there would be no Van Gogh, no Picasso, no modern art.',
        },
        image: '/minute-lab/images/impressionism.png',
        readTimeSeconds: 60,
        keywords: ['印象派', 'モネ', 'ルノワール', '光と色彩'],
        publishedAt: '2026-01-19',
    },
    {
        id: 'birth-of-jazz',
        slug: 'birth-of-jazz',
        category: 'culture',
        title: { jp: 'ジャズの誕生', en: 'The Birth of Jazz' },
        subtitle: { jp: 'ニューオーリンズから世界を揺らした音楽革命', en: 'The musical revolution from New Orleans that shook the world' },
        summary: [
            { jp: '20世紀初頭のニューオーリンズで、アフリカ系アメリカ人の音楽が融合して誕生', en: 'Born in early 20th century New Orleans from the fusion of African American music' },
            { jp: '即興演奏（インプロビゼーション）と独特のリズム「スウィング」が特徴', en: 'Characterized by improvisation and the unique rhythm called "swing"' },
            { jp: 'ルイ・アームストロングらが世界的人気を博し、ポップミュージックの源流となった', en: 'Artists like Louis Armstrong gained worldwide popularity, becoming the source of pop music' },
        ],
        body: {
            jp: 'ジャズは20世紀初頭、アメリカ南部ニューオーリンズで生まれた。アフリカのリズム、ブルース、ラグタイム、そしてヨーロッパの楽器と和声が融合した、まさに「るつぼ」から生まれた音楽だ。最大の特徴は即興演奏（インプロビゼーション）。楽譜通りではなく、演奏者がその場で創造する。ルイ・アームストロングのトランペットとダミ声は世界を魅了し、デューク・エリントンはジャズをコンサートホールにまで引き上げた。1920年代の「ジャズ・エイジ」は若者文化の象徴となり、後のロック、R&B、ヒップホップなどすべての現代ポピュラー音楽に影響を与えている。ジャズとは自由の音なのだ。',
            en: 'Jazz was born in early 20th century New Orleans. African rhythms, blues, ragtime, and European instruments and harmonies fused in this musical melting pot. Its key feature is improvisation—players create in the moment, not following scores. Louis Armstrong\'s trumpet and gravelly voice captivated the world; Duke Ellington elevated jazz to concert halls. The 1920s "Jazz Age" symbolized youth culture, influencing all modern popular music—rock, R&B, hip-hop. Jazz is the sound of freedom.',
        },
        image: '/minute-lab/images/birth-of-jazz.png',
        readTimeSeconds: 60,
        keywords: ['ジャズ', 'ニューオーリンズ', 'ルイ・アームストロング', '即興演奏'],
        publishedAt: '2026-01-19',
    },

    // ===== 経済 (Economy) =====
    {
        id: 'how-corporations-work',
        slug: 'how-corporations-work',
        category: 'economy',
        title: { jp: '株式会社の仕組み', en: 'How Corporations Work' },
        subtitle: { jp: 'なぜ会社は「株」を発行するのか', en: 'Why do companies issue stocks?' },
        summary: [
            { jp: '会社の所有権を「株式」として分割し、多くの人から資金を集める仕組み', en: 'A system that divides company ownership into "shares" to raise funds from many people' },
            { jp: '株主は配当を受け取り、株価上昇で利益を得られる', en: 'Shareholders receive dividends and can profit from rising stock prices' },
            { jp: '有限責任により、株主は出資額以上の損失を負わない', en: 'Limited liability means shareholders don\'t lose more than their investment' },
        ],
        body: {
            jp: '株式会社とは、事業に必要な大きな資金を多くの人から集めるための仕組みだ。会社は「株式」を発行し、それを買った人が「株主」となる。株主は会社の一部を所有し、利益の一部を「配当」として受け取る権利を持つ。また、株式は市場で売買でき、株価が上がれば売却益（キャピタルゲイン）も得られる。重要なのは「有限責任」。会社が倒産しても、株主は出資した金額以上を失うことはない。これにより人々は安心して投資できる。17世紀のオランダ東インド会社が世界初の株式会社とされ、この仕組みが近代資本主義と世界経済の発展を支えてきた。',
            en: 'A corporation is a system for raising large funds from many people. Companies issue "shares," and buyers become "shareholders." Shareholders own part of the company and have rights to receive "dividends" from profits. Shares can be traded on markets, allowing profit from rising prices (capital gains). The key is "limited liability"—if the company fails, shareholders only lose their investment. This lets people invest with confidence. The 17th century Dutch East India Company is considered the first corporation, and this system has supported modern capitalism and global economic development.',
        },
        image: '/minute-lab/images/how-corporations-work.png',
        readTimeSeconds: 60,
        keywords: ['株式会社', '株式', '株主', '有限責任', '配当'],
        publishedAt: '2026-01-19',
    },
    {
        id: 'blockchain',
        slug: 'blockchain',
        category: 'economy',
        title: { jp: 'ブロックチェーン', en: 'Blockchain' },
        subtitle: { jp: '銀行なしで信頼を生み出す新技術', en: 'New technology creating trust without banks' },
        summary: [
            { jp: '取引記録をブロック単位でチェーンのように連結し、改ざんを事実上不可能に', en: 'Links transaction records in blocks like a chain, making tampering virtually impossible' },
            { jp: '中央管理者なしで、ネットワーク参加者全員が記録を共有・検証', en: 'No central authority—all network participants share and verify records' },
            { jp: 'ビットコインの基盤技術だが、金融以外にも応用が広がる', en: 'The foundation of Bitcoin, but applications extend beyond finance' },
        ],
        body: {
            jp: 'ブロックチェーンは、取引記録を「ブロック」にまとめ、時系列に「チェーン」のように連結する技術だ。各ブロックは前のブロックの情報を含むため、一箇所を改ざんすると連鎖的に矛盾が生じ、改ざんは事実上不可能となる。銀行のような「信頼できる第三者」なしで、取引の正当性を保証できるのが革命的だ。ビットコインはこの技術で動いているが、応用範囲は広い。契約の自動執行（スマートコントラクト）、サプライチェーン管理、投票システム、デジタルアート（NFT）など。「分散型」という概念は、権力の集中を避け、透明性を高める新しい社会システムの可能性を示している。',
            en: 'Blockchain is technology that groups transaction records into "blocks" and links them chronologically in a "chain." Each block contains information from the previous one, so tampering with one creates cascading inconsistencies, making forgery virtually impossible. It\'s revolutionary because it can guarantee transaction validity without a "trusted third party" like banks. Bitcoin runs on this technology, but applications are broad: automatic contract execution (smart contracts), supply chain management, voting systems, digital art (NFTs). The concept of "decentralization" shows the possibility of new social systems that avoid concentration of power and increase transparency.',
        },
        image: '/minute-lab/images/blockchain.png',
        readTimeSeconds: 60,
        keywords: ['ブロックチェーン', 'ビットコイン', '分散型', 'スマートコントラクト'],
        publishedAt: '2026-01-19',
    },
    {
        id: 'sdgs-explained',
        slug: 'sdgs-explained',
        category: 'economy',
        title: { jp: 'SDGsの真意', en: 'SDGs Explained' },
        subtitle: { jp: '17の目標が目指す「誰も取り残さない」世界', en: 'The world of "leaving no one behind" that 17 goals aim for' },
        summary: [
            { jp: '2015年の国連サミットで採択された、2030年までの国際目標', en: 'International goals adopted at the 2015 UN Summit for achievement by 2030' },
            { jp: '貧困、飢餓、気候変動など地球規模の課題に取り組む17のゴール', en: '17 goals addressing global challenges like poverty, hunger, and climate change' },
            { jp: '企業・政府・個人すべてが参加する「持続可能な発展」の共通言語', en: 'A common language for "sustainable development" involving businesses, governments, and individuals' },
        ],
        body: {
            jp: 'SDGs（持続可能な開発目標）は、2015年の国連サミットで採択された2030年までの国際目標だ。17のゴールと169のターゲットからなり、貧困・飢餓・健康・教育・ジェンダー・水・エネルギー・経済成長・気候変動など、地球規模の課題を網羅する。キーワードは「誰も取り残さない（Leave No One Behind）」。先進国だけでなく、すべての国と人々が対象だ。企業にとってはESG投資の評価基準となり、サステナビリティ経営は競争力にも直結する。単なる「環境」や「ボランティア」ではなく、経済・社会・環境のバランスを取りながら発展するための「共通言語」として、SDGsは21世紀のグローバルスタンダードとなっている。',
            en: 'SDGs (Sustainable Development Goals) are international goals adopted at the 2015 UN Summit for achievement by 2030. With 17 goals and 169 targets, they cover global challenges: poverty, hunger, health, education, gender, water, energy, economic growth, climate change. The keyword is "Leave No One Behind"—not just developed nations, but all countries and people. For businesses, SDGs are ESG investment criteria, and sustainability management directly relates to competitiveness. Not just "environment" or "volunteering," SDGs serve as a "common language" for development that balances economy, society, and environment—the 21st century global standard.',
        },
        image: '/minute-lab/images/sdgs-explained.png',
        readTimeSeconds: 60,
        keywords: ['SDGs', '持続可能', '国連', 'ESG', 'サステナビリティ'],
        publishedAt: '2026-01-19',
    },

    // ===== 哲学 (Philosophy) =====
    {
        id: 'stoicism',
        slug: 'stoicism',
        category: 'philosophy',
        title: { jp: 'ストア哲学', en: 'Stoicism' },
        subtitle: { jp: '2000年前の知恵が現代のストレスを癒す', en: '2,000-year-old wisdom that heals modern stress' },
        summary: [
            { jp: '紀元前3世紀のギリシャで生まれ、ローマ帝国で広まった哲学', en: 'Philosophy born in 3rd century BC Greece and spread throughout the Roman Empire' },
            { jp: '「変えられないことを受け入れ、変えられることに集中する」が核心', en: 'Core idea: "Accept what you cannot change, focus on what you can"' },
            { jp: 'マルクス・アウレリウス帝も実践した、心の平安を得るための実践哲学', en: 'Practical philosophy for mental peace, practiced even by Emperor Marcus Aurelius' },
        ],
        body: {
            jp: 'ストア哲学は紀元前3世紀にゼノンが創始し、ローマ皇帝マルクス・アウレリウスや哲学者セネカが実践した古代の知恵だ。核心は「コントロールの二分法」。自分がコントロールできること（思考、行動、反応）とできないこと（他人、天候、過去）を区別し、後者に心を乱されず、前者に集中せよという教えだ。「起きた出来事が苦しみを生むのではなく、その出来事への判断が苦しみを生む」とも説く。SNSの反応に一喜一憂したり、過去を悔やんだりする現代人にこそ響く。ストア哲学は単なる「我慢」ではなく、冷静さと行動力を両立させる、2000年経っても色褪せない実践的な生き方の指針なのだ。',
            en: 'Stoicism was founded by Zeno in the 3rd century BC and practiced by Roman Emperor Marcus Aurelius and philosopher Seneca. Its core is the "dichotomy of control": distinguish what you can control (thoughts, actions, reactions) from what you cannot (others, weather, past), don\'t let the latter disturb you, focus on the former. It teaches that "events don\'t cause suffering—our judgments about them do." This resonates with modern people who react emotionally to social media or regret the past. Stoicism isn\'t mere "endurance" but a practical guide to life that balances calm and action—wisdom that hasn\'t faded in 2,000 years.',
        },
        image: '/minute-lab/images/stoicism.png',
        readTimeSeconds: 60,
        keywords: ['ストア哲学', 'マルクス・アウレリウス', 'セネカ', 'コントロールの二分法'],
        publishedAt: '2026-01-19',
    },
    {
        id: 'need-for-recognition',
        slug: 'need-for-recognition',
        category: 'philosophy',
        title: { jp: '承認欲求', en: 'The Need for Recognition' },
        subtitle: { jp: 'なぜ私たちは「いいね」を求めるのか', en: 'Why do we crave "likes"?' },
        summary: [
            { jp: '他者から認められたいという人間の根源的な欲求', en: 'A fundamental human desire to be recognized by others' },
            { jp: 'SNS時代に増幅され、心理的な依存を生む危険性も', en: 'Amplified in the social media age, with risks of psychological dependence' },
            { jp: '健全な自己肯定感とのバランスが、現代を生きる鍵', en: 'Balancing it with healthy self-esteem is key to modern life' },
        ],
        body: {
            jp: '承認欲求とは、他者から認められたいという人間の根源的な欲求だ。心理学者マズローは「社会的欲求」として位置づけ、食事や安全の次に重要とした。SNS時代、この欲求は「いいね」「フォロワー数」という数値で可視化され、かつてないほど増幅されている。問題は、他者評価に依存しすぎると、自己価値が他人任せになること。批判一つで落ち込み、「バズり」を追い求める行動に陥る。哲学者アドラーは「他者の期待を満たすために生きてはならない」と説いた。承認欲求そのものは悪ではないが、「自分で自分を認める」自己肯定感とのバランスが、SNS時代を健やかに生きる鍵である。',
            en: 'The need for recognition is a fundamental human desire to be acknowledged by others. Psychologist Maslow positioned it as a "social need," important after food and safety. In the social media age, this need is visualized through "likes" and "follower counts," amplified as never before. The problem: over-dependence on others\' evaluations means your self-worth becomes dependent on others. A single criticism can devastate you; you chase "going viral." Philosopher Adler taught, "Don\'t live to meet others\' expectations." The need for recognition isn\'t evil, but balancing it with self-acceptance—recognizing yourself—is the key to thriving in the social media age.',
        },
        image: '/minute-lab/images/need-for-recognition.png',
        readTimeSeconds: 60,
        keywords: ['承認欲求', 'SNS', 'マズロー', 'アドラー', '自己肯定感'],
        publishedAt: '2026-01-19',
    },
    {
        id: 'mindfulness',
        slug: 'mindfulness',
        category: 'philosophy',
        title: { jp: 'マインドフルネス', en: 'Mindfulness' },
        subtitle: { jp: '「今、ここ」に意識を向ける脳のトレーニング', en: 'Brain training to focus on the "here and now"' },
        summary: [
            { jp: '仏教瞑想をベースに、宗教色を抜いて西洋で再定義された実践法', en: 'Practice redefined in the West based on Buddhist meditation, without religious elements' },
            { jp: '過去や未来への思考を手放し、現在の瞬間に注意を集中させる', en: 'Letting go of thoughts about past and future, concentrating attention on the present moment' },
            { jp: 'ストレス軽減、集中力向上に科学的効果が立証されている', en: 'Scientifically proven to reduce stress and improve concentration' },
        ],
        body: {
            jp: 'マインドフルネスとは「今、この瞬間」に意識を集中させる心のトレーニングだ。仏教の瞑想がルーツだが、宗教色を排して1970年代にアメリカで再定義された。MITのジョン・カバットジンがストレス低減プログラムを開発し、医療や企業に広まった。やり方はシンプル。呼吸に意識を向け、雑念が浮かんでも「考えた」と気づいてまた呼吸に戻る。これを繰り返すと、過去の後悔や未来の不安に支配されず、「今」を生きる力が育つ。脳科学的にも、扁桃体（不安を司る部位）の活動低下と前頭前野（理性を司る部位）の活性化が確認されている。GoogleやAppleも研修に採用する、現代の最強メンタルツールだ。',
            en: 'Mindfulness is mental training to focus on "this present moment." Rooted in Buddhist meditation, it was redefined without religious elements in 1970s America. MIT\'s Jon Kabat-Zinn developed a stress reduction program that spread to healthcare and corporations. The method is simple: focus on breathing, and when thoughts arise, notice them and return to breathing. Repeating this develops the ability to live in the "now" rather than being controlled by past regrets or future anxieties. Neuroscience confirms reduced activity in the amygdala (which governs anxiety) and activation of the prefrontal cortex (which governs reason). Adopted in training by Google and Apple, it\'s the ultimate modern mental tool.',
        },
        image: '/minute-lab/images/mindfulness.png',
        readTimeSeconds: 60,
        keywords: ['マインドフルネス', '瞑想', 'ストレス軽減', 'カバットジン'],
        publishedAt: '2026-01-19',
    },
];

// 意図: カテゴリで記事をフィルタ
export const getArticlesByCategory = (category: string | null): Article[] => {
    if (!category || category === 'all') return articles;
    return articles.filter(a => a.category === category);
};

// 意図: スラッグで記事を取得
export const getArticleBySlug = (slug: string): Article | undefined => {
    return articles.find(a => a.slug === slug);
};

// 意図: 次の記事を取得
export const getNextArticle = (currentSlug: string): Article | undefined => {
    const currentIndex = articles.findIndex(a => a.slug === currentSlug);
    if (currentIndex === -1 || currentIndex === articles.length - 1) return undefined;
    return articles[currentIndex + 1];
};
