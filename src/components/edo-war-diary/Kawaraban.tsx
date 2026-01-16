'use client';

import { Post } from './Post';

// 50 fictional Edo-era posts - completely original
const posts = [
    { id: 1, author: '奉行所', role: '町奉行', content: { jp: '【急報】本日卯の刻、東の国境にて不穏なる動きあり。諸人心得よ、むやみに騒ぎ立てるべからず。', en: '[URGENT] At dawn, suspicious movements at eastern border. All citizens remain calm and await orders.' }, time: '卯の刻', type: 'emergency' as const, appare: 8942, kairanban: 4521 },
    { id: 2, author: '八百屋の権兵衛', role: '商人', content: { jp: '今朝方、遠くで轟音が聞こえた気がしたが...何事じゃろうか', en: 'Heard rumbling in distance this morning... Wonder what it was' }, time: '辰の刻', type: 'citizen' as const, appare: 124, kairanban: 53 },
    { id: 3, author: '城代家老', role: '侍', content: { jp: '【御触書】城下町の者共、不確かなる噂に惑わされるべからず。正式なる沙汰を待て。', en: '[OFFICIAL] Castle town residents, do not believe unverified rumors. Await official decree.' }, time: '辰の刻', type: 'official' as const, appare: 6783, kairanban: 3214 },
    { id: 4, author: '旅の商人', role: '行商', content: { jp: '隣国より参ったが、国境の関所が封鎖されておった。何やら不穏な空気じゃ', en: 'Came from neighboring domain. Border checkpoint was sealed. Ominous atmosphere' }, time: '巳の刻', type: 'rumor' as const, appare: 893, kairanban: 452 },
    { id: 5, author: '長屋のおかみ', role: '町人', content: { jp: '子供たちを寺子屋に送り出したが、無事じゃろうか...心配でならぬ', en: 'Sent children to temple school... Hope they are safe' }, time: '巳の刻', type: 'citizen' as const, appare: 234, kairanban: 89 },
    { id: 6, author: '奉行所', role: '町奉行', content: { jp: '【続報】東部の民は高台へ避難せよ。家財道具よりも命を守れ。', en: '[UPDATE] Eastern residents evacuate to high ground. Prioritize lives over possessions.' }, time: '巳の刻', type: 'emergency' as const, appare: 11245, kairanban: 7894 },
    { id: 7, author: '大工の佐吉', role: '職人', content: { jp: 'わしの仕事場から煙が見えた。これは只事ではないぞ', en: 'Saw smoke from my workshop. This is no ordinary matter' }, time: '午の刻', type: 'citizen' as const, appare: 342, kairanban: 123 },
    { id: 8, author: '瓦版屋', role: '商人', content: { jp: '⚠️「城が落ちた」との噂は嘘じゃ！惑わされるでないぞ！', en: '⚠️ Rumor of "castle fallen" is FALSE! Do not be deceived!' }, time: '午の刻', type: 'official' as const, appare: 4523, kairanban: 2341 },
    { id: 9, author: '隠居の源右衛門', role: '老人', content: { jp: 'わしが若い頃の戦を思い出す...まさかまたこんな日が来ようとは', en: 'Reminds me of wars in my youth... Never thought Id see such days again' }, time: '午の刻', type: 'citizen' as const, appare: 1234, kairanban: 567 },
    { id: 10, author: '城代家老', role: '侍', content: { jp: '【重要】火の用心を怠るな。火事は敵より恐ろしい災いとなる。', en: '[IMPORTANT] Be vigilant with fire. Fire is more fearsome than any enemy.' }, time: '未の刻', type: 'official' as const, appare: 6789, kairanban: 3451 },
    { id: 11, author: '魚屋の太郎', role: '商人', content: { jp: '港に行ったら、漁船が全て帰ってきておった。何か知っておるのか', en: 'Went to harbor, all fishing boats returned. Do they know something?' }, time: '未の刻', type: 'citizen' as const, appare: 453, kairanban: 189 },
    { id: 12, author: '奉行所', role: '町奉行', content: { jp: '【避難令】沿岸の者共、寺社へ避難せよ。食糧と水を持参すべし。', en: '[EVACUATION] Coastal residents, evacuate to temples/shrines. Bring food and water.' }, time: '未の刻', type: 'emergency' as const, appare: 8923, kairanban: 5678 },
    { id: 13, author: '飛脚の三平', role: '飛脚', content: { jp: '隣藩より急報を運んできたが、内容は口外できぬ。ただ、備えよ', en: 'Brought urgent message from neighboring domain. Cannot disclose. But prepare' }, time: '申の刻', type: 'rumor' as const, appare: 1567, kairanban: 678 },
    { id: 14, author: '火消しの頭', role: '町役', content: { jp: '【出動】東部にて火災発生。火消し組、直ちに出動せよ！', en: '[DISPATCH] Fire in eastern district. Fire brigade, deploy immediately!' }, time: '申の刻', type: 'official' as const, appare: 2345, kairanban: 1234 },
    { id: 15, author: '寺子屋の師匠', role: '学者', content: { jp: '子供たちは無事じゃ。寺に避難しておる。親御は心配無用', en: 'Children are safe. Sheltered at temple. Parents need not worry' }, time: '申の刻', type: 'citizen' as const, appare: 1892, kairanban: 782 },
    { id: 16, author: '城代家老', role: '侍', content: { jp: '【武士への令】領内の武士は直ちに城へ参集せよ。軍議を開く。', en: '[TO SAMURAI] All warriors in domain report to castle immediately. War council.' }, time: '酉の刻', type: 'emergency' as const, appare: 13452, kairanban: 8923 },
    { id: 17, author: '医者の玄庵', role: '医師', content: { jp: '怪我人が運ばれてきておる。薬も人手も足らぬ。助けを求む', en: 'Injured being brought in. Short on medicine and hands. Need help' }, time: '酉の刻', type: 'citizen' as const, appare: 789, kairanban: 342 },
    { id: 18, author: '噂好きのおばあ', role: '町人', content: { jp: '隣の藩からの使者が来たとか...同盟の話じゃと...', en: 'Heard envoy from neighboring domain arrived... Alliance talks...' }, time: '酉の刻', type: 'rumor' as const, appare: 1234, kairanban: 678 },
    { id: 19, author: '奉行所', role: '町奉行', content: { jp: '【街道封鎖】主要街道は軍用となる。一般の通行は禁ず。', en: '[ROAD CLOSURE] Major roads for military use. Civilian passage prohibited.' }, time: '酉の刻', type: 'official' as const, appare: 4567, kairanban: 2345 },
    { id: 20, author: '酒屋のおかみ', role: '商人', content: { jp: '米が売り切れた。みな買い占めに走っておる', en: 'Rice sold out. Everyone rushing to stockpile' }, time: '戌の刻', type: 'citizen' as const, appare: 342, kairanban: 156 },
    { id: 21, author: '殿様家老', role: '重臣', content: { jp: '【殿様のお言葉】「民を守ることこそ武士の本分。恐れるな、わしがおる」', en: '[LORD\'S WORDS] "Protecting the people is a warrior\'s duty. Fear not, I am here"' }, time: '戌の刻', type: 'official' as const, appare: 15678, kairanban: 8934 },
    { id: 22, author: '浪人の剣士', role: '浪人', content: { jp: '戦となれば、この剣を振るう時が来たか...', en: 'If war comes, the time to wield this sword has arrived...' }, time: '戌の刻', type: 'citizen' as const, appare: 234, kairanban: 89 },
    { id: 23, author: '占い師', role: '陰陽師', content: { jp: '今宵、星の位置が不吉。大きな変化を示しておる', en: 'Tonight, stars show ill omen. Great change is coming' }, time: '戌の刻', type: 'rumor' as const, appare: 892, kairanban: 452 },
    { id: 24, author: '奉行所', role: '町奉行', content: { jp: '【避難所開設】各寺社に避難所を設けた。炊き出しも行う。', en: '[SHELTERS OPEN] Temples/shrines now shelters. Hot meals provided.' }, time: '亥の刻', type: 'official' as const, appare: 3452, kairanban: 1789 },
    { id: 25, author: '農民の庄助', role: '百姓', content: { jp: 'せっかく育てた田畑を置いて逃げねばならぬとは...', en: 'Having to abandon the fields I worked so hard to cultivate...' }, time: '亥の刻', type: 'citizen' as const, appare: 1234, kairanban: 567 },
    { id: 26, author: '城代家老', role: '侍', content: { jp: '【現況報告】敵は国境にて足止め中。城下への侵入は阻止しておる。', en: '[STATUS] Enemy held at border. Intrusion to castle town prevented.' }, time: '亥の刻', type: 'emergency' as const, appare: 17892, kairanban: 10234 },
    { id: 27, author: '若い武士', role: '武士', content: { jp: 'これが初陣となるか。父上の教えを胸に...', en: 'This may be my first battle. Father\'s teachings in my heart...' }, time: '子の刻', type: 'citizen' as const, appare: 452, kairanban: 189 },
    { id: 28, author: '瓦版屋', role: '商人', content: { jp: '⚠️「殿様討死」の噂は全くの嘘！殿様は健在なり！', en: '⚠️ Rumor of "lord\'s death" is COMPLETE LIE! Lord is well!' }, time: '子の刻', type: 'official' as const, appare: 6789, kairanban: 3456 },
    { id: 29, author: '母親のおよし', role: '町人', content: { jp: '夫が徴兵された...どうか無事で帰ってきておくれ', en: 'Husband was conscripted... Please come back safely' }, time: '子の刻', type: 'citizen' as const, appare: 567, kairanban: 234 },
    { id: 30, author: '物見の報告', role: '忍', content: { jp: '敵軍の規模、およそ三千と見た。本隊とは別に別働隊あり', en: 'Enemy force approximately 3000. Separate detachment spotted' }, time: '丑の刻', type: 'citizen' as const, appare: 2345, kairanban: 1234 },
    { id: 31, author: '奉行所', role: '町奉行', content: { jp: '【電信情報】水の備蓄を怠るな。井戸水を守れ。', en: '[NOTICE] Stock water. Protect well water.' }, time: '丑の刻', type: 'official' as const, appare: 3456, kairanban: 1789 },
    { id: 32, author: '密偵', role: '忍', content: { jp: '味方より内通者がおるとの噂...用心されたし', en: 'Rumors of traitor among allies... Be cautious' }, time: '丑の刻', type: 'rumor' as const, appare: 1567, kairanban: 789 },
    { id: 33, author: '猫を飼う婆', role: '町人', content: { jp: 'うちの猫が逃げてしまった...避難所に連れていけぬ', en: 'My cat ran away... Cannot bring to shelter' }, time: '丑の刻', type: 'citizen' as const, appare: 342, kairanban: 156 },
    { id: 34, author: '殿様家老', role: '重臣', content: { jp: '【殿様御声明】「我が家臣、我が民を信ず。共に乗り越えようぞ」', en: '[LORD\'S DECREE] "I trust my retainers, my people. Together we shall overcome"' }, time: '寅の刻', type: 'official' as const, appare: 23456, kairanban: 15678 },
    { id: 35, author: '産婆のおとく', role: '産婆', content: { jp: '戦の最中でも子は生まれる。今宵、無事に赤子が生まれた', en: 'Children born even in war. Tonight, baby safely delivered' }, time: '寅の刻', type: 'citizen' as const, appare: 892, kairanban: 452 },
    { id: 36, author: '城代家老', role: '侍', content: { jp: '【緊急招集】町人の中で武芸の心得ある者、城に集え。', en: '[URGENT CALL] Townspeople with martial skills, gather at castle.' }, time: '寅の刻', type: 'emergency' as const, appare: 14567, kairanban: 8923 },
    { id: 37, author: '儒学者', role: '学者', content: { jp: 'これは歴史に残る一日となろう。書き留めておかねば', en: 'This day will be recorded in history. Must document it' }, time: '寅の刻', type: 'citizen' as const, appare: 789, kairanban: 342 },
    { id: 38, author: '隣国の商人', role: '商人', content: { jp: '各国、この戦の行方を固唾を飲んで見守っておる', en: 'All domains watching this war with bated breath' }, time: '卯の刻', type: 'rumor' as const, appare: 1234, kairanban: 678 },
    { id: 39, author: '奉行所', role: '町奉行', content: { jp: '【関所情報】全ての関所を封鎖。出入りは許可証を要す。', en: '[CHECKPOINT] All checkpoints sealed. Passage requires permit.' }, time: '卯の刻', type: 'official' as const, appare: 5678, kairanban: 2893 },
    { id: 40, author: '孤児の少年', role: '子供', content: { jp: 'おっかあが帰ってこない...怖いよ...', en: 'Mom hasnt come back... Im scared...' }, time: '卯の刻', type: 'citizen' as const, appare: 3456, kairanban: 1789 },
    { id: 41, author: '城代家老', role: '侍', content: { jp: '【食糧配給】各町内で粥の炊き出しを行う。順番を守れ。', en: '[FOOD RATION] Rice porridge distributed in each district. Maintain order.' }, time: '辰の刻', type: 'official' as const, appare: 2345, kairanban: 1234 },
    { id: 42, author: '両替商', role: '商人', content: { jp: '金銀の価値が乱れておる。取引は控えよ', en: 'Currency values unstable. Avoid transactions' }, time: '辰の刻', type: 'citizen' as const, appare: 1567, kairanban: 789 },
    { id: 43, author: '瓦版屋', role: '商人', content: { jp: '「敵の総大将が討たれた」との噂は未確認！鵜呑みにするな！', en: '"Enemy general slain" is UNCONFIRMED! Do not believe blindly!' }, time: '辰の刻', type: 'official' as const, appare: 8923, kairanban: 4567 },
    { id: 44, author: '渡し船の船頭', role: '職人', content: { jp: '川を渡ろうとする者が多いが、対岸も安全ではないぞ', en: 'Many trying to cross river, but other side not safe either' }, time: '巳の刻', type: 'citizen' as const, appare: 452, kairanban: 189 },
    { id: 45, author: '城代家老', role: '侍', content: { jp: '【続報】援軍が到着。東部戦線は持ち直しつつある。', en: '[UPDATE] Reinforcements arrived. Eastern front stabilizing.' }, time: '巳の刻', type: 'emergency' as const, appare: 16789, kairanban: 10234 },
    { id: 46, author: '旅籠屋の主人', role: '商人', content: { jp: '避難民で宿は満杯。しかし泊める場所を作らねば', en: 'Inn full of refugees. Must make more room' }, time: '巳の刻', type: 'citizen' as const, appare: 789, kairanban: 342 },
    { id: 47, author: '奉行所', role: '町奉行', content: { jp: '【近隣藩へ】友好藩より安全確保の申し出あり。協力に感謝す。', en: '[TO NEIGHBORS] Allied domains offer safety cooperation. Grateful.' }, time: '午の刻', type: 'official' as const, appare: 4567, kairanban: 2345 },
    { id: 48, author: '老婆のおりん', role: '町人', content: { jp: '足が悪くて逃げられぬ...誰かこの老婆を助けてくれ', en: 'Cannot flee due to bad legs... Someone help this old woman' }, time: '午の刻', type: 'citizen' as const, appare: 2893, kairanban: 1567 },
    { id: 49, author: '城代家老', role: '侍', content: { jp: '【全国放送】未の刻より殿様の御声明あり。全員聞くべし。', en: '[ANNOUNCEMENT] Lord\'s address at next hour. All must listen.' }, time: '午の刻', type: 'emergency' as const, appare: 23456, kairanban: 14567 },
    { id: 50, author: '名も無き町人', role: '町人', content: { jp: '信じられぬ一日じゃった。されど、我らは負けぬ。断じて。', en: 'An unbelievable day. But we shall not lose. Never.' }, time: '未の刻', type: 'citizen' as const, appare: 8923, kairanban: 4567 },
];

interface KawarabanProps {
    lang: 'jp' | 'en';
}

export function Kawaraban({ lang }: KawarabanProps) {
    return (
        <div className="max-w-3xl mx-auto p-6">
            {posts.map((post) => (
                <Post key={post.id} post={post} lang={lang} />
            ))}
        </div>
    );
}
