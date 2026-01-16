'use client';

import { Tweet } from './Tweet';

// 50 fictional posts - completely original, no real countries/people
const posts = [
    { id: 1, user: '統合防衛本部', handle: 'unified_defense', content: { jp: '【緊急速報】本日07:42、東部国境にて不明勢力による軍事的挑発行為を確認。詳細は調査中。国民の皆様は冷静な行動をお願いします。', en: '[BREAKING] At 07:42, military provocation by unknown forces confirmed at the eastern border. Details under investigation. Please remain calm.' }, time: '07:45', type: 'emergency' as const, likes: 89421, retweets: 45231 },
    { id: 2, user: '市民A', handle: 'citizen_a', content: { jp: '何これ…朝から何かすごい爆発音したけど', en: 'What was that... Heard a huge explosion this morning' }, time: '07:47', type: 'citizen' as const, likes: 1243, retweets: 532 },
    { id: 3, user: '首相官邸', handle: 'pm_office', content: { jp: '【公式声明】現在、国家安全保障会議を緊急招集中。国民の皆様には不確かな情報に惑わされず、公式発表をお待ちください。', en: '[OFFICIAL] National Security Council meeting in progress. Please await official announcements and avoid unverified information.' }, time: '08:00', type: 'official' as const, likes: 67832, retweets: 32145 },
    { id: 4, user: '匿名情報筋', handle: 'insider_info', content: { jp: '知り合いの自衛官から聞いた話だけど、すでに数カ所で交戦があったらしい…', en: 'Heard from a friend in the military that there have already been skirmishes at several locations...' }, time: '08:05', type: 'rumor' as const, likes: 8932, retweets: 4521 },
    { id: 5, user: '地元住民', handle: 'local_resident', content: { jp: '窓の外、ヘリがすごい数飛んでる。こんなの初めて見た', en: 'So many helicopters flying outside my window. Never seen anything like this' }, time: '08:12', type: 'citizen' as const, likes: 3421, retweets: 1232 },
    { id: 6, user: '統合防衛本部', handle: 'unified_defense', content: { jp: '【続報】東部沿岸部の住民の皆様に避難勧告を発令。最寄りの避難所へ速やかに移動してください。', en: '[UPDATE] Evacuation advisory issued for eastern coastal residents. Please proceed to nearest shelter immediately.' }, time: '08:20', type: 'emergency' as const, likes: 112453, retweets: 78943 },
    { id: 7, user: '会社員B', handle: 'office_worker_b', content: { jp: '電車止まってるんだけど…会社行けない。てかそれどころじゃない？', en: 'Trains are stopped... Cant get to work. Actually, is that even important right now?' }, time: '08:25', type: 'citizen' as const, likes: 892, retweets: 234 },
    { id: 8, user: 'フェイクニュース警告', handle: 'fake_alert', content: { jp: '⚠️「首都に爆弾投下」というデマが拡散中です。公式情報を確認してください。', en: '⚠️ Rumor about "bombs dropped on capital" is spreading. Please verify with official sources.' }, time: '08:30', type: 'official' as const, likes: 45231, retweets: 23421 },
    { id: 9, user: '母親', handle: 'worried_mom', content: { jp: '子供たち学校に送り出したんだけど、大丈夫かな…学校から連絡来ない', en: 'Sent the kids to school... Are they okay? No word from the school yet' }, time: '08:35', type: 'citizen' as const, likes: 2341, retweets: 892 },
    { id: 10, user: '緊急対策室', handle: 'emergency_ops', content: { jp: '【重要】携帯電話の回線が混雑しています。緊急時以外の通話はお控えください。', en: '[IMPORTANT] Mobile networks are congested. Please avoid non-emergency calls.' }, time: '08:40', type: 'emergency' as const, likes: 67892, retweets: 34521 },
    { id: 11, user: '大学生C', handle: 'student_c', content: { jp: 'まさか自分が生きてる間にこんなことが起きるなんて…', en: 'Never thought something like this would happen in my lifetime...' }, time: '08:45', type: 'citizen' as const, likes: 4532, retweets: 1892 },
    { id: 12, user: '防災無線', handle: 'disaster_radio', content: { jp: '【避難指示】沿岸部全域に避難指示が発令されました。高台へ避難してください。', en: '[EVACUATION ORDER] Evacuation order issued for all coastal areas. Move to higher ground.' }, time: '08:50', type: 'emergency' as const, likes: 89231, retweets: 56782 },
    { id: 13, user: '匿名', handle: 'anon_user', content: { jp: '港で煙が上がってる映像見た人いる？あれ本物？', en: 'Anyone see the video of smoke rising from the port? Is that real?' }, time: '08:55', type: 'rumor' as const, likes: 5672, retweets: 2341 },
    { id: 14, user: '消防本部', handle: 'fire_dept', content: { jp: '【出動情報】東部地区にて複数の火災発生。消防隊が対応中。', en: '[DISPATCH] Multiple fires in eastern district. Fire crews responding.' }, time: '09:00', type: 'official' as const, likes: 23451, retweets: 12341 },
    { id: 15, user: '高校生D', handle: 'highschool_d', content: { jp: '学校で緊急集会始まった。先生たちもパニックになってる', en: 'Emergency assembly at school. Even teachers are panicking' }, time: '09:05', type: 'citizen' as const, likes: 1892, retweets: 782 },
    { id: 16, user: '統合防衛本部', handle: 'unified_defense', content: { jp: '【警戒情報】全国の空港が一時閉鎖されました。航空便をご利用予定の方は各航空会社にお問い合わせください。', en: '[ALERT] All airports temporarily closed. Contact airlines for flight information.' }, time: '09:10', type: 'emergency' as const, likes: 134521, retweets: 89234 },
    { id: 17, user: '医療従事者', handle: 'medical_staff', content: { jp: '病院に負傷者が運ばれてきている。スタッフ全員緊急招集された', en: 'Injured being brought to hospital. All staff called in for emergency' }, time: '09:15', type: 'citizen' as const, likes: 7892, retweets: 3421 },
    { id: 18, user: '噂アカウント', handle: 'rumor_mill', content: { jp: '複数の目撃情報：海上に大量の艦船が確認されたとのこと', en: 'Multiple sightings: Large number of ships reported at sea' }, time: '09:20', type: 'rumor' as const, likes: 12341, retweets: 6782 },
    { id: 19, user: '交通情報', handle: 'traffic_info', content: { jp: '【交通規制】国道1号線、3号線が軍用車両通過のため通行止め。', en: '[TRAFFIC] Routes 1 and 3 closed for military vehicle passage.' }, time: '09:25', type: 'official' as const, likes: 45231, retweets: 23421 },
    { id: 20, user: '主婦E', handle: 'housewife_e', content: { jp: 'スーパー行ったら水と食料が全部売り切れてた…', en: 'Went to supermarket, all water and food sold out...' }, time: '09:30', type: 'citizen' as const, likes: 3421, retweets: 1562 },
    { id: 21, user: '首相官邸', handle: 'pm_office', content: { jp: '【緊急会見】本日10:00より首相による緊急記者会見を行います。NHKにて中継予定。', en: '[PRESS CONFERENCE] Prime Minister to hold emergency conference at 10:00. Live on national broadcast.' }, time: '09:35', type: 'official' as const, likes: 156782, retweets: 89234 },
    { id: 22, user: '会社員F', handle: 'worker_f', content: { jp: '会社から「本日は自宅待機」って連絡きた。やっぱりただ事じゃないのか', en: 'Company told us to stay home today. This must be serious' }, time: '09:40', type: 'citizen' as const, likes: 2341, retweets: 892 },
    { id: 23, user: '情報拡散希望', handle: 'spread_info', content: { jp: '友人の友人情報：政府は事態を隠蔽している可能性あり', en: 'Friend of friend says: Government may be covering up the situation' }, time: '09:45', type: 'rumor' as const, likes: 8923, retweets: 4521 },
    { id: 24, user: '自治体広報', handle: 'city_pr', content: { jp: '【避難所開設】市内の小中学校体育館を避難所として開放しました。', en: '[SHELTER OPEN] School gymnasiums now open as evacuation shelters.' }, time: '09:50', type: 'official' as const, likes: 34521, retweets: 17892 },
    { id: 25, user: '老人G', handle: 'elderly_g', content: { jp: '戦争を知ってる世代として言う。まさかまたこんな日が来るとは…', en: 'As someone who remembers past wars... Never thought Id see days like this again...' }, time: '09:55', type: 'citizen' as const, likes: 12341, retweets: 5672 },
    { id: 26, user: '統合防衛本部', handle: 'unified_defense', content: { jp: '【現状報告】現在、東部沿岸部における武力衝突は限定的な範囲に留まっています。市民の皆様は落ち着いて行動してください。', en: '[STATUS] Armed conflict currently limited to eastern coastal area. Citizens please remain calm.' }, time: '10:00', type: 'emergency' as const, likes: 178923, retweets: 102341 },
    { id: 27, user: '学生H', handle: 'student_h', content: { jp: 'SNS見てると情報がめちゃくちゃで何が本当かわからない', en: 'So much conflicting info on social media. Dont know whats true' }, time: '10:05', type: 'citizen' as const, likes: 4521, retweets: 1892 },
    { id: 28, user: 'デマ注意喚起', handle: 'hoax_watch', content: { jp: '⚠️「外国軍が上陸」は確認されていません。冷静に公式情報を確認してください。', en: '⚠️ "Foreign troops landing" is UNCONFIRMED. Please verify with official sources.' }, time: '10:10', type: 'official' as const, likes: 67892, retweets: 34521 },
    { id: 29, user: '父親I', handle: 'father_i', content: { jp: '家族をどこか安全な場所に避難させるべきか…でもどこが安全なんだ', en: 'Should I evacuate family somewhere safe... But where is safe?' }, time: '10:15', type: 'citizen' as const, likes: 5671, retweets: 2341 },
    { id: 30, user: '現地記者', handle: 'local_reporter', content: { jp: '東部沿岸部から中継。確かに遠くで煙が見える。住民の避難が続いている。', en: 'Reporting from eastern coast. Can see smoke in distance. Residents evacuating.' }, time: '10:20', type: 'citizen' as const, likes: 23451, retweets: 12341 },
    { id: 31, user: '緊急対策室', handle: 'emergency_ops', content: { jp: '【電力情報】現時点で大規模停電の報告はありません。節電にご協力ください。', en: '[POWER] No major blackouts reported. Please conserve electricity.' }, time: '10:25', type: 'official' as const, likes: 34521, retweets: 17892 },
    { id: 32, user: '匿名情報', handle: 'anon_intel', content: { jp: '自衛隊の友人曰く「過去にない規模の動員」らしい', en: 'Military friend says "mobilization at unprecedented scale"' }, time: '10:30', type: 'rumor' as const, likes: 15672, retweets: 7892 },
    { id: 33, user: 'ペット愛好家', handle: 'pet_lover', content: { jp: '避難所にペット連れていけるのかな…うちの子置いていけない', en: 'Can I bring pets to shelter? Cant leave my baby behind' }, time: '10:35', type: 'citizen' as const, likes: 3421, retweets: 1562 },
    { id: 34, user: '首相官邸', handle: 'pm_office', content: { jp: '【首相談話】「我が国は、いかなる暴力にも屈しない。国民の生命と財産を守るため、あらゆる手段を講じる」', en: '[PM STATEMENT] "Our nation will not yield to violence. We will take all measures to protect lives and property."' }, time: '10:40', type: 'official' as const, likes: 234521, retweets: 156782 },
    { id: 35, user: '看護師J', handle: 'nurse_j', content: { jp: '患者がどんどん運ばれてくる。みんな落ち着いてるけど、目が怖い', en: 'Patients keep coming. Everyone calm but eyes show fear' }, time: '10:45', type: 'citizen' as const, likes: 8923, retweets: 4521 },
    { id: 36, user: '統合防衛本部', handle: 'unified_defense', content: { jp: '【重要】予備自衛官の緊急招集令が発令されました。対象者は最寄りの駐屯地に出頭してください。', en: '[URGENT] Reserve forces mobilization order issued. Report to nearest base.' }, time: '10:50', type: 'emergency' as const, likes: 145672, retweets: 89234 },
    { id: 37, user: '大学教授', handle: 'professor', content: { jp: '歴史的な一日になりそうだ。こんな形で自分の研究が現実になるとは…', en: 'This may become a historic day. Never thought my research would become reality...' }, time: '10:55', type: 'citizen' as const, likes: 7892, retweets: 3421 },
    { id: 38, user: '拡散希望', handle: 'pls_share', content: { jp: '外国のニュースでは日本の状況が大きく報道されてるらしい', en: 'Apparently foreign news is covering Japan situation extensively' }, time: '11:00', type: 'rumor' as const, likes: 12341, retweets: 6782 },
    { id: 39, user: '交通情報', handle: 'traffic_info', content: { jp: '【新幹線】全線で運転見合わせ。再開の見通し立たず。', en: '[BULLET TRAIN] All lines suspended. No estimate for resumption.' }, time: '11:05', type: 'official' as const, likes: 56782, retweets: 28934 },
    { id: 40, user: '子供K', handle: 'kid_k', content: { jp: 'ママが帰ってこない…怖い…', en: 'Mom hasnt come back... Scared...' }, time: '11:10', type: 'citizen' as const, likes: 34521, retweets: 17892 },
    { id: 41, user: '緊急対策室', handle: 'emergency_ops', content: { jp: '【給水情報】各避難所にて給水活動を実施中。ペットボトル持参推奨。', en: '[WATER] Water distribution at shelters. Bring containers.' }, time: '11:15', type: 'official' as const, likes: 23451, retweets: 12341 },
    { id: 42, user: '経済アナリスト', handle: 'econ_analyst', content: { jp: '株式市場が大暴落している。これは長期化を見越した動きか', en: 'Stock market crashing. Markets anticipating prolonged conflict?' }, time: '11:20', type: 'citizen' as const, likes: 15672, retweets: 7892 },
    { id: 43, user: '噂検証', handle: 'fact_check', content: { jp: '「核攻撃の危険」というデマが流れていますが、現時点でそのような情報はありません。', en: 'Rumors of "nuclear threat" are FALSE. No such information confirmed.' }, time: '11:25', type: 'official' as const, likes: 89234, retweets: 45672 },
    { id: 44, user: '配達員L', handle: 'delivery_l', content: { jp: '仕事中だけど道路が軍用車両だらけで全然進めない', en: 'Working but roads full of military vehicles. Cant move' }, time: '11:30', type: 'citizen' as const, likes: 4521, retweets: 1892 },
    { id: 45, user: '統合防衛本部', handle: 'unified_defense', content: { jp: '【続報】敵対勢力の正体について現在分析中。国連とも連携して対応を協議しています。', en: '[UPDATE] Analyzing hostile force identity. Coordinating response with UN.' }, time: '11:35', type: 'emergency' as const, likes: 167892, retweets: 102341 },
    { id: 46, user: '料理人M', handle: 'chef_m', content: { jp: '店閉めて避難するか悩んでる。でも避難所で炊き出しできるかも', en: 'Thinking of closing shop to evacuate. Maybe I can cook at shelters' }, time: '11:40', type: 'citizen' as const, likes: 7892, retweets: 3421 },
    { id: 47, user: '外務省', handle: 'mofa', content: { jp: '【在外邦人へ】各国大使館を通じて安全確保に努めています。渡航予定の方は延期を検討してください。', en: '[TO OVERSEAS CITIZENS] Working with embassies for safety. Consider postponing travel.' }, time: '11:45', type: 'official' as const, likes: 45672, retweets: 23451 },
    { id: 48, user: '高齢者N', handle: 'senior_n', content: { jp: '足が悪くて避難できない…誰か助けてくれないか', en: 'Cant evacuate due to bad legs... Someone please help' }, time: '11:50', type: 'citizen' as const, likes: 28934, retweets: 15672 },
    { id: 49, user: '緊急放送', handle: 'ems_broadcast', content: { jp: '【全国放送】本日12:00より全国一斉の緊急放送を行います。NHKでご確認ください。', en: '[NATIONAL ALERT] Nationwide emergency broadcast at 12:00. Tune to NHK.' }, time: '11:55', type: 'emergency' as const, likes: 234521, retweets: 145672 },
    { id: 50, user: '市民の声', handle: 'citizen_voice', content: { jp: '信じられない一日だ。でも、俺たちは負けない。絶対に。', en: 'Unbelievable day. But we wont give up. Never.' }, time: '12:00', type: 'citizen' as const, likes: 89234, retweets: 45672 },
];

interface TimelineProps {
    lang: 'jp' | 'en';
}

export function Timeline({ lang }: TimelineProps) {
    return (
        <div className="max-w-xl mx-auto divide-y divide-gray-800">
            {posts.map((post) => (
                <Tweet key={post.id} post={post} lang={lang} />
            ))}
        </div>
    );
}
