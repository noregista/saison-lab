(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const A={ja:{site:{title:"TEMPLE LAB",subtitle:"テンプル・ラボ",tagline:"日本寺院探訪",description:"歴史・建築・体験の3軸で日本の名刹を紹介"},nav:{home:"ホーム",temples:"寺院一覧",guides:"ガイド",about:"について"},hero:{title:"日本寺院探訪",subtitle:"清水寺、金閣寺、東大寺…日本の名刹を「歴史」「建築」「体験」の3軸で深掘りする"},map:{title:"日本地図から探す",subtitle:"地域をクリックして寺院を探索",allRegions:"すべての地域"},filters:{all:"すべて",history:"歴史探訪",garden:"庭園鑑賞",experience:"体験・修行",goshuin:"御朱印巡り"},temple:{viewDetails:"詳細を見る",history:"歴史",architecture:"建築",experience:"体験",hours:"拝観時間",fee:"拝観料",access:"アクセス",goshuin:"御朱印",activities:"おすすめ体験"},guides:{title:"参拝のすすめ",subtitle:"日本の寺院をより深く楽しむために",goshuin:{title:"御朱印の世界",description:"参拝の証として授かる、墨書と朱印の芸術。御朱印帳の選び方から授かり方のマナーまで解説。",icon:"🖌️"},zazen:{title:"座禅体験のすすめ",description:"禅の心に触れる座禅体験。初心者向けの解説と体験できる寺院のご紹介。",icon:"🧘"},manner:{title:"参拝の作法",description:"山門から本堂まで、正しい参拝の作法をステップバイステップでガイド。",icon:"🙏"}},manner:{title:"参拝の作法",steps:[{title:"山門（さんもん）",description:"一礼してから境内へ入ります。敷居は踏まずに跨ぎましょう。"},{title:"手水舎（ちょうずや）",description:"左手→右手→口→柄杓の柄の順に清めます。"},{title:"本堂での礼拝",description:"お賽銭を納め、合掌して一礼します。神社とは異なり、拍手は打ちません。"},{title:"御朱印をいただく",description:"必ず参拝後に授与所でいただきます。御朱印帳を丁寧に開いてお渡しください。"}]},footer:{brand:"TEMPLE LAB",tagline:"日本の名刹を歴史・建築・体験の3軸で紹介するデジタル・ポータル",links:{title:"リンク",items:["ホーム","寺院一覧","ガイド"]},legal:{title:"法的情報",privacy:"プライバシーポリシー",terms:"利用規約",disclaimer:"免責事項"},copyright:"© 2026 Saison Lab. All rights reserved."},legal:{privacy:{title:"プライバシーポリシー",content:"当サイトでは、Googleアナリティクス等のアクセス解析ツールを使用しています。これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。"},terms:{title:"利用規約",content:"当サイトの情報は参考情報として提供しています。寺院の拝観時間・料金等は変更される場合がありますので、訪問前に公式サイトでご確認ください。"},disclaimer:{title:"免責事項",content:"当サイトに掲載されている情報の正確性には万全を期していますが、その内容について保証するものではありません。"}},ad:{label:"広告スペース"},search:{placeholder:"寺院名で検索...",noResults:"検索結果が見つかりませんでした"}},en:{site:{title:"TEMPLE LAB",subtitle:"Temple Lab",tagline:"Explore Japanese Temples",description:"Discover famous temples through History, Architecture & Experience"},nav:{home:"Home",temples:"Temples",guides:"Guides",about:"About"},hero:{title:"Explore Japanese Temples",subtitle:"Discover Kiyomizu-dera, Kinkaku-ji, Todai-ji and more through History, Architecture & Experience"},map:{title:"Find by Map",subtitle:"Click a region to explore temples",allRegions:"All Regions"},filters:{all:"All",history:"History",garden:"Gardens",experience:"Experience",goshuin:"Goshuin"},temple:{viewDetails:"View Details",history:"History",architecture:"Architecture",experience:"Experience",hours:"Hours",fee:"Admission",access:"Access",goshuin:"Goshuin",activities:"Recommended Activities"},guides:{title:"Temple Visit Guide",subtitle:"Enhance your temple experience",goshuin:{title:"The World of Goshuin",description:"Temple seals as proof of pilgrimage. Learn about choosing a goshuin book and proper etiquette.",icon:"🖌️"},zazen:{title:"Zazen Meditation",description:"Experience Zen meditation. A beginner's guide and temples offering zazen sessions.",icon:"🧘"},manner:{title:"Temple Etiquette",description:"From the temple gate to the main hall, a step-by-step guide to proper worship.",icon:"🙏"}},manner:{title:"Temple Etiquette",steps:[{title:"Temple Gate (Sanmon)",description:"Bow once before entering. Step over the threshold, don't step on it."},{title:"Purification (Chozuya)",description:"Cleanse left hand → right hand → mouth → ladle handle, in order."},{title:"Worship at Main Hall",description:"Offer a coin, press palms together and bow. Unlike shrines, do not clap."},{title:"Receiving Goshuin",description:"Always receive after worship. Open your goshuin book politely when presenting it."}]},footer:{brand:"TEMPLE LAB",tagline:"A digital portal exploring Japan's famous temples through History, Architecture & Experience",links:{title:"Links",items:["Home","Temples","Guide"]},legal:{title:"Legal",privacy:"Privacy Policy",terms:"Terms of Use",disclaimer:"Disclaimer"},copyright:"© 2026 Saison Lab. All rights reserved."},legal:{privacy:{title:"Privacy Policy",content:"This site uses Google Analytics and other analytics tools. These tools use cookies to collect data, but no personally identifiable information is included."},terms:{title:"Terms of Use",content:"Information on this site is provided for reference. Temple hours and fees may change, so please verify on official sites before visiting."},disclaimer:{title:"Disclaimer",content:"While we strive for accuracy, we do not guarantee the information on this site."}},ad:{label:"Ad Space"},search:{placeholder:"Search temples...",noResults:"No results found"}}};let p="ja";function L(){return p}function f(e){if(e==="ja"||e==="en"){p=e;const i=new URL(window.location.href);e==="en"?i.searchParams.set("lang","en"):i.searchParams.delete("lang"),window.history.replaceState({},"",i),document.documentElement.lang=e}}function n(e){const i=e.split(".");let t=A[p];for(const s of i)if(t&&t[s]!==void 0)t=t[s];else return console.warn(`Translation not found: ${e}`),e;return t}function r(e){return e&&(e[p]||e.ja||e.en)||""}function T(){new URLSearchParams(window.location.search).get("lang")==="en"?f("en"):(navigator.language.slice(0,2),f("ja"))}const v=[{id:"kiyomizu-dera",name:{ja:"清水寺",en:"Kiyomizu-dera"},region:"kinki",prefecture:{ja:"京都府",en:"Kyoto"},coordinates:{lat:34.9949,lng:135.785},highlights:{history:{era:{ja:"奈良時代（778年）",en:"Nara period (778)"},founder:{ja:"坂上田村麻呂",en:"Sakanoue no Tamuramaro"},significance:{ja:"世界遺産「古都京都の文化財」の一部。音羽の滝から寺号が由来。",en:'Part of UNESCO World Heritage "Historic Monuments of Ancient Kyoto". Named after the Otowa waterfall.'}},architecture:{style:{ja:"懸造（かけづくり）",en:"Kake-zukuri (suspended construction)"},highlight:{ja:"釘を一本も使わない舞台造り。高さ13mの舞台からは京都市街を一望。",en:"Stage built without a single nail. 13m high stage offers panoramic views of Kyoto."}},experience:{activities:[{ja:"清水の舞台からの眺望",en:"Viewing from Kiyomizu Stage"},{ja:"音羽の滝の霊水",en:"Sacred water from Otowa Waterfall"},{ja:"地主神社での縁結び",en:"Matchmaking at Jishu Shrine"}]}},categories:["history","garden"],hours:{ja:"6:00〜18:00（季節により変動）",en:"6:00-18:00 (varies by season)"},fee:{ja:"大人400円",en:"Adults ¥400"},goshuin:{available:!0,styles:{ja:"通常・限定デザイン",en:"Regular & limited designs"}}},{id:"kinkaku-ji",name:{ja:"金閣寺",en:"Kinkaku-ji (Golden Pavilion)"},region:"kinki",prefecture:{ja:"京都府",en:"Kyoto"},coordinates:{lat:35.0394,lng:135.7292},highlights:{history:{era:{ja:"室町時代（1397年）",en:"Muromachi period (1397)"},founder:{ja:"足利義満",en:"Ashikaga Yoshimitsu"},significance:{ja:"北山文化の象徴。正式名称は鹿苑寺。世界遺産。",en:"Symbol of Kitayama culture. Official name is Rokuon-ji. UNESCO World Heritage."}},architecture:{style:{ja:"三層楼閣金箔張り",en:"Three-story gold leaf covered pavilion"},highlight:{ja:"上二層は金箔で覆われ、屋根上には鳳凰が輝く。鏡湖池に映る姿は絶景。",en:"Top two floors covered in gold leaf, topped with a phoenix. Stunning reflection in the mirror pond."}},experience:{activities:[{ja:"池泉回遊式庭園の散策",en:"Strolling the pond garden"},{ja:"抹茶席での一服",en:"Matcha tea experience"}]}},categories:["history","garden"],hours:{ja:"9:00〜17:00",en:"9:00-17:00"},fee:{ja:"大人500円",en:"Adults ¥500"},goshuin:{available:!0,styles:{ja:"御札タイプ",en:"Ofuda style"}}},{id:"todai-ji",name:{ja:"東大寺",en:"Todai-ji"},region:"kinki",prefecture:{ja:"奈良県",en:"Nara"},coordinates:{lat:34.6889,lng:135.8398},highlights:{history:{era:{ja:"奈良時代（752年）",en:"Nara period (752)"},founder:{ja:"聖武天皇",en:"Emperor Shomu"},significance:{ja:"華厳宗大本山。奈良の大仏（盧舎那仏）で世界的に有名。世界遺産。",en:"Head temple of Kegon Buddhism. Famous for the Great Buddha (Rushana Buddha). UNESCO World Heritage."}},architecture:{style:{ja:"天平様式",en:"Tempyo style"},highlight:{ja:"世界最大級の木造建築である大仏殿。高さ約15mの大仏像を安置。",en:"One of the world's largest wooden buildings. Houses the 15m tall Great Buddha statue."}},experience:{activities:[{ja:"大仏殿の柱くぐり",en:"Passing through the pillar hole"},{ja:"二月堂からの眺望",en:"Views from Nigatsu-do Hall"},{ja:"鹿との触れ合い",en:"Interacting with deer"}]}},categories:["history","experience"],hours:{ja:"8:00〜17:00（季節により変動）",en:"8:00-17:00 (varies by season)"},fee:{ja:"大人600円",en:"Adults ¥600"},goshuin:{available:!0,styles:{ja:"複数種類あり",en:"Multiple types available"}}},{id:"horyu-ji",name:{ja:"法隆寺",en:"Horyu-ji"},region:"kinki",prefecture:{ja:"奈良県",en:"Nara"},coordinates:{lat:34.6146,lng:135.7344},highlights:{history:{era:{ja:"飛鳥時代（607年）",en:"Asuka period (607)"},founder:{ja:"聖徳太子",en:"Prince Shotoku"},significance:{ja:"世界最古の木造建築群。日本初の世界遺産（1993年）。",en:"World's oldest wooden buildings. Japan's first UNESCO World Heritage site (1993)."}},architecture:{style:{ja:"飛鳥様式",en:"Asuka style"},highlight:{ja:"五重塔は日本最古の塔。エンタシスの柱が特徴的。",en:"Five-story pagoda is Japan's oldest. Features distinctive entasis columns."}},experience:{activities:[{ja:"国宝建築群の見学",en:"Tour of National Treasure buildings"},{ja:"百済観音像の拝観",en:"Viewing the Kudara Kannon statue"}]}},categories:["history"],hours:{ja:"8:00〜17:00",en:"8:00-17:00"},fee:{ja:"大人1,500円",en:"Adults ¥1,500"},goshuin:{available:!0,styles:{ja:"聖徳太子縁のデザイン",en:"Prince Shotoku-themed design"}}},{id:"ryoan-ji",name:{ja:"龍安寺",en:"Ryoan-ji"},region:"kinki",prefecture:{ja:"京都府",en:"Kyoto"},coordinates:{lat:35.0345,lng:135.7181},highlights:{history:{era:{ja:"室町時代（1450年）",en:"Muromachi period (1450)"},founder:{ja:"細川勝元",en:"Hosokawa Katsumoto"},significance:{ja:"禅宗臨済派の寺院。枯山水庭園の最高傑作として世界的に有名。",en:"Rinzai Zen temple. World-famous for its masterpiece rock garden."}},architecture:{style:{ja:"枯山水",en:"Karesansui (Dry landscape garden)"},highlight:{ja:"15個の石を配した方丈庭園。どの角度から見ても14個しか見えない謎。",en:"15 stones arranged so only 14 are visible from any angle. A mysterious design."}},experience:{activities:[{ja:"石庭での瞑想",en:"Meditation at the rock garden"},{ja:"知足の蹲の鑑賞",en:'Viewing the "Chisoku" stone basin'}]}},categories:["garden","experience"],hours:{ja:"8:00〜17:00",en:"8:00-17:00"},fee:{ja:"大人500円",en:"Adults ¥500"},goshuin:{available:!0,styles:{ja:"石庭デザイン",en:"Rock garden design"}}},{id:"senso-ji",name:{ja:"浅草寺",en:"Senso-ji"},region:"kanto",prefecture:{ja:"東京都",en:"Tokyo"},coordinates:{lat:35.7147,lng:139.7966},highlights:{history:{era:{ja:"飛鳥時代（628年）",en:"Asuka period (628)"},founder:{ja:"勝海上人",en:"Shokai Shonin"},significance:{ja:"東京最古の寺院。聖観世音菩薩を本尊とし、年間約3000万人が参拝。",en:"Tokyo's oldest temple. Enshrines Kannon. About 30 million visitors annually."}},architecture:{style:{ja:"江戸期再建様式",en:"Edo-period reconstruction style"},highlight:{ja:"雷門の大提灯は浅草のシンボル。仲見世通りは日本最古の商店街。",en:"Kaminarimon's giant lantern is Asakusa's symbol. Nakamise is Japan's oldest shopping street."}},experience:{activities:[{ja:"仲見世通りでの買い物",en:"Shopping at Nakamise Street"},{ja:"おみくじ体験",en:"Fortune slip (Omikuji) experience"},{ja:"五重塔の夜間ライトアップ",en:"Night illumination of pagoda"}]}},categories:["history","experience","goshuin"],hours:{ja:"6:00〜17:00",en:"6:00-17:00"},fee:{ja:"無料",en:"Free"},goshuin:{available:!0,styles:{ja:"複数種類あり",en:"Multiple types available"}}},{id:"kencho-ji",name:{ja:"建長寺",en:"Kencho-ji"},region:"kanto",prefecture:{ja:"神奈川県",en:"Kanagawa"},coordinates:{lat:35.3328,lng:139.5533},highlights:{history:{era:{ja:"鎌倉時代（1253年）",en:"Kamakura period (1253)"},founder:{ja:"北条時頼・蘭渓道隆",en:"Hojo Tokiyori & Rankei Doryu"},significance:{ja:"鎌倉五山第一位。日本最初の禅宗専門道場。",en:"First of the Five Great Zen Temples of Kamakura. Japan's first Zen monastery."}},architecture:{style:{ja:"禅宗様（唐様）",en:"Zen style (Chinese style)"},highlight:{ja:"三門（山門）は重要文化財。梵鐘は国宝に指定。",en:"Sanmon gate is an Important Cultural Property. Temple bell is a National Treasure."}},experience:{activities:[{ja:"座禅会への参加",en:"Zazen meditation session"},{ja:"半僧坊からのハイキング",en:"Hiking from Hansobo"}]}},categories:["history","experience"],hours:{ja:"8:30〜16:30",en:"8:30-16:30"},fee:{ja:"大人500円",en:"Adults ¥500"},goshuin:{available:!0,styles:{ja:"建長寺印",en:"Kencho-ji seal"}}},{id:"engaku-ji",name:{ja:"円覚寺",en:"Engaku-ji"},region:"kanto",prefecture:{ja:"神奈川県",en:"Kanagawa"},coordinates:{lat:35.3384,lng:139.5478},highlights:{history:{era:{ja:"鎌倉時代（1282年）",en:"Kamakura period (1282)"},founder:{ja:"北条時宗・無学祖元",en:"Hojo Tokimune & Mugaku Sogen"},significance:{ja:"鎌倉五山第二位。元寇の戦没者を弔うために創建。夏目漱石も参禅。",en:"Second of Kamakura's Five Great Zen Temples. Founded to honor Mongol invasion victims."}},architecture:{style:{ja:"禅宗様",en:"Zen style"},highlight:{ja:"舎利殿は国宝。洪鐘（おおがね）も国宝指定。",en:"Shariden hall is a National Treasure. Great Bell is also a National Treasure."}},experience:{activities:[{ja:"日曜座禅会",en:"Sunday Zazen session"},{ja:"国宝舎利殿の特別拝観",en:"Special viewing of Shariden"}]}},categories:["history","experience"],hours:{ja:"8:00〜16:30",en:"8:00-16:30"},fee:{ja:"大人500円",en:"Adults ¥500"},goshuin:{available:!0,styles:{ja:"円覚寺印",en:"Engaku-ji seal"}}},{id:"eihei-ji",name:{ja:"永平寺",en:"Eihei-ji"},region:"hokuriku",prefecture:{ja:"福井県",en:"Fukui"},coordinates:{lat:36.09,lng:136.3353},highlights:{history:{era:{ja:"鎌倉時代（1244年）",en:"Kamakura period (1244)"},founder:{ja:"道元禅師",en:"Zen Master Dogen"},significance:{ja:"曹洞宗大本山。現在も約150名の修行僧が厳しい修行生活を送る。",en:"Head temple of Soto Zen. About 150 monks still undergo rigorous training here."}},architecture:{style:{ja:"七堂伽藍",en:"Shichido garan (Seven-hall complex)"},highlight:{ja:"山深い森に溶け込む荘厳な伽藍。70以上の堂宇が回廊でつながる。",en:"Solemn halls blend with deep mountain forest. Over 70 buildings connected by corridors."}},experience:{activities:[{ja:"坐禅体験",en:"Zazen meditation"},{ja:"参籠修行（宿坊泊）",en:"Overnight temple stay"},{ja:"精進料理",en:"Shojin ryori (Buddhist cuisine)"}]}},categories:["experience","history"],hours:{ja:"8:00〜17:00",en:"8:00-17:00"},fee:{ja:"大人500円",en:"Adults ¥500"},goshuin:{available:!0,styles:{ja:"道元禅師縁のデザイン",en:"Dogen-themed design"}}},{id:"zuisen-ji",name:{ja:"瑞泉寺",en:"Zuisen-ji"},region:"hokuriku",prefecture:{ja:"富山県",en:"Toyama"},coordinates:{lat:36.5525,lng:136.9786},highlights:{history:{era:{ja:"室町時代（1390年）",en:"Muromachi period (1390)"},founder:{ja:"綽如上人",en:"Shakunyo Shonin"},significance:{ja:"真宗大谷派井波別院。井波彫刻発祥の地。",en:"Otani branch of Jodo Shinshu. Birthplace of Inami wood carving."}},architecture:{style:{ja:"浄土真宗本堂様式",en:"Jodo Shinshu main hall style"},highlight:{ja:"北陸最大級の木造建築。繊細な井波彫刻が随所に見られる。",en:"One of Hokuriku's largest wooden buildings. Delicate Inami carvings throughout."}},experience:{activities:[{ja:"井波彫刻の鑑賞",en:"Appreciating Inami carvings"},{ja:"彫刻体験工房",en:"Wood carving workshop"}]}},categories:["history","experience"],hours:{ja:"9:00〜16:30",en:"9:00-16:30"},fee:{ja:"大人500円",en:"Adults ¥500"},goshuin:{available:!0,styles:{ja:"瑞泉寺印",en:"Zuisen-ji seal"}}},{id:"zenko-ji",name:{ja:"善光寺",en:"Zenko-ji"},region:"chubu",prefecture:{ja:"長野県",en:"Nagano"},coordinates:{lat:36.6617,lng:138.1883},highlights:{history:{era:{ja:"飛鳥時代（642年）",en:"Asuka period (642)"},founder:{ja:"本田善光",en:"Honda Yoshimitsu"},significance:{ja:"無宗派の寺院。日本最古の仏像「一光三尊阿弥陀如来」を本尊とする。",en:"Non-denominational temple. Enshrines Japan's oldest Buddha statue."}},architecture:{style:{ja:"撞木造",en:"Shumoku-zukuri style"},highlight:{ja:"国宝の本堂は江戸中期の代表的仏教建築。T字型の独特な構造。",en:"National Treasure main hall is representative of mid-Edo Buddhist architecture."}},experience:{activities:[{ja:"お戒壇めぐり",en:"Kaidan meguri (pitch-dark pilgrimage)"},{ja:"お朝事（早朝法要）",en:"Morning service attendance"},{ja:"御開帳（七年に一度）",en:"Gokaicho (once every 7 years)"}]}},categories:["history","experience","goshuin"],hours:{ja:"5:30〜16:30",en:"5:30-16:30"},fee:{ja:"内陣参拝600円",en:"Inner sanctuary ¥600"},goshuin:{available:!0,styles:{ja:"複数種類あり",en:"Multiple types available"}}},{id:"itsukushima",name:{ja:"厳島神社",en:"Itsukushima Shrine"},region:"chugoku",prefecture:{ja:"広島県",en:"Hiroshima"},coordinates:{lat:34.2961,lng:132.3198},highlights:{history:{era:{ja:"推古天皇時代（593年）",en:"Empress Suiko era (593)"},founder:{ja:"佐伯鞍職",en:"Saeki no Kuramoto"},significance:{ja:"日本三景の一つ。平清盛により現在の社殿の基礎が築かれた。世界遺産。",en:"One of Japan's Three Views. Current shrine built by Taira no Kiyomori. UNESCO World Heritage."}},architecture:{style:{ja:"寝殿造",en:"Shinden-zukuri style"},highlight:{ja:"海上に浮かぶ朱塗りの大鳥居。潮の満ち引きで表情が変わる。",en:"Vermillion torii gate floating on the sea. Appearance changes with the tide."}},experience:{activities:[{ja:"干潮時の鳥居まで歩行",en:"Walking to torii at low tide"},{ja:"弥山登山",en:"Climbing Mt. Misen"},{ja:"宮島の鹿との触れ合い",en:"Interacting with Miyajima deer"}]}},categories:["history","garden"],hours:{ja:"6:30〜18:00（季節により変動）",en:"6:30-18:00 (varies by season)"},fee:{ja:"大人300円",en:"Adults ¥300"},goshuin:{available:!0,styles:{ja:"厳島神社印",en:"Itsukushima seal"}}},{id:"kotohira-gu",name:{ja:"金刀比羅宮",en:"Kotohira-gu (Konpira-san)"},region:"shikoku",prefecture:{ja:"香川県",en:"Kagawa"},coordinates:{lat:34.1825,lng:133.82},highlights:{history:{era:{ja:"古代",en:"Ancient times"},founder:{ja:"不詳",en:"Unknown"},significance:{ja:"海の守護神として信仰。年間約400万人が参拝する「こんぴらさん」。",en:'Worshipped as guardian of the sea. About 4 million annual visitors to "Konpira-san".'}},architecture:{style:{ja:"権現造",en:"Gongen-zukuri style"},highlight:{ja:"本宮まで785段、奥社まで1368段の石段が続く。円山応挙の障壁画も。",en:"785 steps to main shrine, 1368 to inner shrine. Features Maruyama Okyo's paintings."}},experience:{activities:[{ja:"石段登拝",en:"Climbing the stone steps"},{ja:"表書院の襖絵鑑賞",en:"Viewing sliding door paintings"},{ja:"讃岐うどん体験",en:"Sanuki udon experience"}]}},categories:["history","experience"],hours:{ja:"6:00〜17:00",en:"6:00-17:00"},fee:{ja:"無料",en:"Free"},goshuin:{available:!0,styles:{ja:"金刀比羅宮印",en:"Kotohira-gu seal"}}},{id:"dazaifu",name:{ja:"太宰府天満宮",en:"Dazaifu Tenmangu"},region:"kyushu",prefecture:{ja:"福岡県",en:"Fukuoka"},coordinates:{lat:33.5217,lng:130.5356},highlights:{history:{era:{ja:"平安時代（905年）",en:"Heian period (905)"},founder:{ja:"菅原道真公を祀る",en:"Enshrines Sugawara no Michizane"},significance:{ja:"学問の神様として有名。年間約1000万人が参拝。飛梅伝説の地。",en:"Famous as god of learning. About 10 million annual visitors. Legend of the Flying Plum."}},architecture:{style:{ja:"権現造",en:"Gongen-zukuri style"},highlight:{ja:"華やかな朱塗りの楼門と本殿。境内には6000本の梅が植えられている。",en:"Gorgeous vermillion gate and main hall. 6000 plum trees on the grounds."}},experience:{activities:[{ja:"合格祈願",en:"Prayer for academic success"},{ja:"梅ヶ枝餅を味わう",en:"Trying Umegae mochi"},{ja:"九州国立博物館見学",en:"Visiting Kyushu National Museum"}]}},categories:["history","experience","goshuin"],hours:{ja:"6:30〜19:00",en:"6:30-19:00"},fee:{ja:"無料",en:"Free"},goshuin:{available:!0,styles:{ja:"太宰府天満宮印",en:"Dazaifu seal"}}}];function z(e){if(!e||e.trim()==="")return v;const i=e.toLowerCase().trim();return v.filter(t=>{if(t.name.ja.toLowerCase().includes(i)||t.name.en.toLowerCase().includes(i))return!0;const o=t.prefecture.ja.toLowerCase(),l=t.prefecture.en.toLowerCase();return!!(o.includes(i)||l.includes(i))})}function j(e,i,t){let s=z(e);return i&&i!=="all"&&(s=s.filter(a=>a.region===i)),t&&t!=="all"&&(s=s.filter(a=>a.categories&&a.categories.includes(t))),s}function M(e){const i=L();return`
    <header class="header" role="banner">
      <div class="container header-inner">
        <a href="/" class="logo" aria-label="${n("site.title")}">
          <img src="/favicon.svg" alt="" class="logo-icon" width="40" height="40">
          <div>
            <span class="logo-text">${n("site.title")}</span>
            <span class="logo-sub">${n("site.subtitle")}</span>
          </div>
        </a>
        
        <nav class="nav" role="navigation" aria-label="Main navigation">
          <a href="#temples-section" class="nav-link">${n("nav.temples")}</a>
          <a href="#guides-section" class="nav-link">${n("nav.guides")}</a>
          
          <div class="lang-toggle" role="group" aria-label="Language selection">
            <button 
              class="lang-btn ${i==="ja"?"active":""}" 
              data-lang="ja"
              aria-pressed="${i==="ja"}"
            >JP</button>
            <button 
              class="lang-btn ${i==="en"?"active":""}" 
              data-lang="en"
              aria-pressed="${i==="en"}"
            >EN</button>
          </div>
        </nav>
      </div>
    </header>
  `}function K(e){const i=document.querySelectorAll(".lang-btn");i.forEach(t=>{t.addEventListener("click",()=>{const s=t.dataset.lang;f(s),i.forEach(a=>{a.classList.toggle("active",a.dataset.lang===s),a.setAttribute("aria-pressed",a.dataset.lang===s)}),e&&e(s)})})}const b={kinki:{id:"kinki",name:{ja:"近畿",en:"Kinki"},prefectures:["京都府","奈良県","大阪府","兵庫県","滋賀県","和歌山県","三重県"]},kanto:{id:"kanto",name:{ja:"関東",en:"Kanto"},prefectures:["東京都","神奈川県","埼玉県","千葉県","茨城県","栃木県","群馬県"]},hokuriku:{id:"hokuriku",name:{ja:"北陸",en:"Hokuriku"},prefectures:["石川県","富山県","福井県","新潟県"]},chubu:{id:"chubu",name:{ja:"中部",en:"Chubu"},prefectures:["愛知県","岐阜県","長野県","山梨県","静岡県"]},chugoku:{id:"chugoku",name:{ja:"中国",en:"Chugoku"},prefectures:["広島県","岡山県","山口県","島根県","鳥取県"]},shikoku:{id:"shikoku",name:{ja:"四国",en:"Shikoku"},prefectures:["香川県","愛媛県","徳島県","高知県"]},kyushu:{id:"kyushu",name:{ja:"九州",en:"Kyushu"},prefectures:["福岡県","長崎県","熊本県","大分県","宮崎県","鹿児島県","佐賀県"]},tohoku:{id:"tohoku",name:{ja:"東北",en:"Tohoku"},prefectures:["岩手県","宮城県","秋田県","山形県","福島県","青森県"]}},k={history:{id:"history",name:{ja:"歴史探訪",en:"History"},icon:"📜"},garden:{id:"garden",name:{ja:"庭園鑑賞",en:"Gardens"},icon:"🌿"},experience:{id:"experience",name:{ja:"体験・修行",en:"Experience"},icon:"🧘"},goshuin:{id:"goshuin",name:{ja:"御朱印巡り",en:"Goshuin"},icon:"🖌️"}};function H(){return`
    <div class="map-container animate-slide-up">
      <div class="text-center mb-8">
        <h2 class="section-title">${n("map.title")}</h2>
        <p class="section-subtitle">${n("map.subtitle")}</p>
      </div>
      
      <div id="japan-map-wrapper" class="japan-map-wrapper">
        <!-- SVGは動的に読み込まれるか、インラインで挿入 -->
        <object id="japan-map-obj" data="/src/assets/japan-map.svg" type="image/svg+xml" class="japan-map" aria-label="Japan Map">
          Japan Map
        </object>
      </div>
      
      <div class="text-center mt-8">
        <button id="reset-region-btn" class="btn btn-secondary" style="display: none;">
          ${n("map.allRegions")}
        </button>
      </div>
    </div>
  `}function N(e){const i=document.getElementById("japan-map-obj"),t=document.getElementById("reset-region-btn");i.addEventListener("load",()=>{const s=i.contentDocument;if(!s)return;const a=s.createElementNS("http://www.w3.org/2000/svg","style");a.textContent=`
      .region { fill: #4a4a4a; stroke: #f5f0e8; stroke-width: 1; transition: all 0.3s ease; cursor: pointer; }
      .region:hover { fill: #3d3d3d; }
      .region.active { fill: #c53d43; }
      .label { fill: #f5f0e8; font-family: sans-serif; font-size: 14px; pointer-events: none; text-anchor: middle; }
    `,s.querySelector("defs").appendChild(a);const o=s.querySelectorAll(".region");o.forEach(l=>{l.addEventListener("click",()=>{const h=l.getAttribute("data-id");o.forEach(S=>S.classList.remove("active")),l.classList.add("active"),t&&(t.style.display="inline-flex"),e&&e(h)})})}),t&&t.addEventListener("click",()=>{const s=i.contentDocument;s&&s.querySelectorAll(".region").forEach(a=>a.classList.remove("active")),t.style.display="none",e&&e("all")})}function B(){const e=Object.values(k);return`
    <div class="filter-bar-container animate-fade-in" style="margin-bottom: var(--space-8);">
      <div class="filter-group justify-center">
        <button class="filter-btn active" data-category="all">
          ${n("filters.all")}
        </button>
        
        ${e.map(i=>`
          <button class="filter-btn" data-category="${i.id}">
            ${i.icon} ${n(`filters.${i.id}`)}
          </button>
        `).join("")}
      </div>
    </div>
  `}function C(e){const i=document.querySelectorAll(".filter-btn");i.forEach(t=>{t.addEventListener("click",()=>{i.forEach(a=>a.classList.remove("active")),t.classList.add("active");const s=t.dataset.category;e&&e(s)})})}function P(e,i=0){const t=b[e.region],s=r(t==null?void 0:t.name)||e.region,a=`stagger-${i%6+1}`,o=e.categories.map(l=>{var h;return((h=k[l])==null?void 0:h.icon)||""}).filter(Boolean).join(" ");return`
    <article 
      class="temple-card animate-ink-spread ${a}" 
      data-temple-id="${e.id}"
      tabindex="0"
      role="button"
      aria-label="${r(e.name)}"
    >
      <div class="temple-card-image" style="background: linear-gradient(135deg, var(--color-bg-tertiary), var(--color-bg-secondary));">
        <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; font-size: 3rem;">
          🏯
        </div>
      </div>
      
      <div class="temple-card-content">
        <span class="temple-card-region">${s}</span>
        <h3 class="temple-card-name">${r(e.name)}</h3>
        <p class="temple-card-name-en">${e.name.en}</p>
        
        <div class="temple-card-highlights">
          <span class="temple-card-highlight" title="${n("temple.history")}">
            📜 ${r(e.highlights.history.era)}
          </span>
          <span class="temple-card-highlight">
            ${o}
          </span>
        </div>
      </div>
    </article>
  `}function $(e){return!e||e.length===0?`
      <div class="text-center" style="padding: var(--space-12); color: var(--color-text-secondary);">
        ${n("search.noResults")}
      </div>
    `:`
    <div class="temples-grid">
      ${e.map((i,t)=>P(i,t)).join("")}
    </div>
  `}function E(e){document.querySelectorAll(".temple-card").forEach(t=>{const s=()=>{const a=t.dataset.templeId;e&&e(a)};t.addEventListener("click",s),t.addEventListener("keydown",a=>{(a.key==="Enter"||a.key===" ")&&(a.preventDefault(),s())})})}let u=null;function I(e){return v.find(i=>i.id===e)||null}function O(e){var a;const i=I(e);if(!i)return"";const t=b[i.region];return`
    <div class="modal-overlay active" id="temple-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div class="modal-content">
        <div class="modal-header">
          <div>
            <span class="tag tag-accent">${r(t==null?void 0:t.name)||i.region}</span>
            <h2 id="modal-title" class="section-title" style="margin-top: var(--space-2);">
              ${r(i.name)}
            </h2>
            <p style="color: var(--color-text-secondary);">${i.name.en}</p>
          </div>
          <button class="modal-close" aria-label="Close modal">&times;</button>
        </div>
        
        <div class="modal-body">
          <!-- 歴史的背景 -->
          <section class="mb-8">
            <h3 class="guide-title" style="font-size: var(--text-xl); margin-bottom: var(--space-4);">
              📜 ${n("temple.history")}
            </h3>
            <div style="display: grid; gap: var(--space-3);">
              <p><strong>創建:</strong> ${r(i.highlights.history.era)}</p>
              <p><strong>開基:</strong> ${r(i.highlights.history.founder)}</p>
              <p style="line-height: 1.8;">${r(i.highlights.history.significance)}</p>
            </div>
          </section>
          
          <!-- 建築美 -->
          <section class="mb-8">
            <h3 class="guide-title" style="font-size: var(--text-xl); margin-bottom: var(--space-4);">
              🏛️ ${n("temple.architecture")}
            </h3>
            <div style="display: grid; gap: var(--space-3);">
              <p><strong>様式:</strong> ${r(i.highlights.architecture.style)}</p>
              <p style="line-height: 1.8;">${r(i.highlights.architecture.highlight)}</p>
            </div>
          </section>
          
          <!-- 参拝体験 -->
          <section class="mb-8">
            <h3 class="guide-title" style="font-size: var(--text-xl); margin-bottom: var(--space-4);">
              ✨ ${n("temple.activities")}
            </h3>
            <ul style="list-style: none; display: grid; gap: var(--space-2);">
              ${i.highlights.experience.activities.map(o=>`
                <li style="display: flex; align-items: center; gap: var(--space-2);">
                  <span style="color: var(--color-accent);">●</span>
                  ${r(o)}
                </li>
              `).join("")}
            </ul>
          </section>
          
          <!-- 拝観情報 -->
          <section style="background: var(--color-bg-secondary); padding: var(--space-6); border-radius: var(--border-radius);">
            <h3 class="guide-title" style="font-size: var(--text-lg); margin-bottom: var(--space-4);">
              ℹ️ 拝観情報
            </h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: var(--space-4);">
              <div>
                <p style="color: var(--color-text-muted); font-size: var(--text-sm);">${n("temple.hours")}</p>
                <p>${r(i.hours)}</p>
              </div>
              <div>
                <p style="color: var(--color-text-muted); font-size: var(--text-sm);">${n("temple.fee")}</p>
                <p>${r(i.fee)}</p>
              </div>
              ${(a=i.goshuin)!=null&&a.available?`
                <div>
                  <p style="color: var(--color-text-muted); font-size: var(--text-sm);">${n("temple.goshuin")}</p>
                  <p>🖌️ ${r(i.goshuin.styles)}</p>
                </div>
              `:""}
            </div>
          </section>
        </div>
      </div>
    </div>
  `}function x(e){g();const i=O(e);document.body.insertAdjacentHTML("beforeend",i),u=document.getElementById("temple-modal"),document.body.style.overflow="hidden",G()}function g(){u&&(u.remove(),u=null,document.body.style.overflow="")}function G(){if(!u)return;const e=u.querySelector(".modal-close");e&&e.addEventListener("click",g),u.addEventListener("click",t=>{t.target===u&&g()});const i=t=>{t.key==="Escape"&&(g(),document.removeEventListener("keydown",i))};document.addEventListener("keydown",i)}function D(){return`
    <section id="guides-section" class="guide-section">
      <div class="container animate-slide-up">
        <div class="text-center mb-8">
          <h2 class="section-title">${n("guides.title")}</h2>
          <p class="section-subtitle">${n("guides.subtitle")}</p>
        </div>
        
        <div class="guide-grid">
          <!-- 御朱印ガイド -->
          <article class="guide-card">
            <div class="guide-icon">${n("guides.goshuin.icon")}</div>
            <h3 class="guide-title">${n("guides.goshuin.title")}</h3>
            <p class="guide-description">${n("guides.goshuin.description")}</p>
            <button class="btn btn-ghost mt-4" onclick="document.getElementById('manner-modal').classList.add('active')">
              ${n("temple.viewDetails")}
            </button>
          </article>
          
          <!-- 座禅ガイド -->
          <article class="guide-card">
            <div class="guide-icon">${n("guides.zazen.icon")}</div>
            <h3 class="guide-title">${n("guides.zazen.title")}</h3>
            <p class="guide-description">${n("guides.zazen.description")}</p>
          </article>
          
          <!-- 参拝マナー -->
          <article class="guide-card">
            <div class="guide-icon">${n("guides.manner.icon")}</div>
            <h3 class="guide-title">${n("guides.manner.title")}</h3>
            <p class="guide-description">${n("guides.manner.description")}</p>
          </article>
        </div>
        
        <!-- マナー詳細セクション (通常表示) -->
        <div class="mt-8 pt-8" style="background: var(--color-bg-primary); padding: var(--space-8); border-radius: var(--border-radius-lg);">
          <h3 class="guide-title text-center mb-8">${n("manner.title")}</h3>
          
          <div class="step-list">
            ${F()}
          </div>
        </div>
      </div>
    </section>
  `}function F(){const e=n("manner.steps");return Array.isArray(e)?e.map((i,t)=>`
    <div class="step-item">
      <div class="step-number">${t+1}</div>
      <div class="step-content">
        <h4 class="step-title">${r(i.title)||i.title}</h4>
        <p class="step-description">${r(i.description)||i.description}</p>
      </div>
    </div>
  `).join(""):""}function m(e="leaderboard"){let i="",t="";switch(e){case"leaderboard":i="",t="LEADERBOARD (728x90)";break;case"infeed":i="ad-space-lg",t="INFEED / RECT (300x250)";break;case"rect":i="ad-space-lg",t="RECTANGLE (300x250)";break;default:t="AD SPACE"}return`
    <div class="ad-container my-8" aria-hidden="true" style="margin: var(--space-8) 0;">
      <div class="ad-space ${i}">
        <div class="text-center">
          <p style="font-weight: bold; margin-bottom: 0.5rem;">${n("ad.label")}</p>
          <p style="font-size: 0.75rem; opacity: 0.7;">${t}</p>
          <p style="font-size: 0.7rem; opacity: 0.5;">Responsive Placeholder</p>
        </div>
      </div>
    </div>
  `}function R(){const e=new Date().getFullYear();return`
    <footer class="footer">
      <div class="container">
        <!-- 上部コンテンツ -->
        <div class="footer-content">
          <!-- ブランド -->
          <div class="footer-brand">
            <div class="footer-logo">TEMPLE LAB</div>
            <p class="footer-tagline">${n("footer.tagline")}</p>
          </div>
          
          <!-- リンク -->
          <div class="footer-nav">
            <h4 class="footer-links-title">${n("footer.links.title")}</h4>
            <ul class="footer-links">
              <li><a href="/" class="footer-link">${n("nav.home")}</a></li>
              <li><a href="#temples-section" class="footer-link">${n("nav.temples")}</a></li>
              <li><a href="#guides-section" class="footer-link">${n("nav.guides")}</a></li>
            </ul>
          </div>
          
          <!-- 法的リンク -->
          <div class="footer-legal">
            <h4 class="footer-links-title">${n("footer.legal.title")}</h4>
            <ul class="footer-links">
              <li><button class="footer-link btn-text" id="open-privacy">${n("footer.legal.privacy")}</button></li>
              <li><button class="footer-link btn-text" id="open-terms">${n("footer.legal.terms")}</button></li>
              <li><button class="footer-link btn-text" id="open-disclaimer">${n("footer.legal.disclaimer")}</button></li>
            </ul>
          </div>
        </div>
        
        <!-- コピーライト -->
        <div class="footer-bottom">
          <p class="footer-copyright">© ${e} Saison Lab. All rights reserved.</p>
        </div>
      </div>
    </footer>
  `}function J(e){["open-privacy","open-terms","open-disclaimer"].forEach(t=>{const s=document.getElementById(t);s&&s.addEventListener("click",()=>{const a=t.replace("open-","");e&&e(a)})})}let d=null;function Z(e){const i=n(`legal.${e}`);return`
    <div class="modal-overlay active" id="legal-modal">
      <div class="modal-content" style="max-width: 600px;">
        <div class="modal-header">
          <h2 class="section-title" style="margin: 0; font-size: 1.5rem;">${i.title}</h2>
          <button class="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <p style="white-space: pre-wrap; line-height: 1.8;">${i.content}</p>
        </div>
      </div>
    </div>
  `}function W(e){d&&d.remove();const i=Z(e);document.body.insertAdjacentHTML("beforeend",i),d=document.getElementById("legal-modal"),document.body.style.overflow="hidden";const t=d.querySelector(".modal-close"),s=()=>{d.remove(),d=null,document.body.style.overflow=""};t.addEventListener("click",s),d.addEventListener("click",a=>{a.target===d&&s()})}const c={region:"all",category:"all",searchQuery:""};async function U(){T(),w()}function V(e){c.searchQuery=e,y()}function q(e){c.region=e,y(),document.getElementById("temples-section").scrollIntoView({behavior:"smooth"})}function Q(e){c.category=e,y()}function y(){const e=document.getElementById("temple-grid-container");if(!e)return;const i=j(c.searchQuery,c.region,c.category);e.innerHTML=$(i),E(x)}function w(){const e=document.getElementById("app"),i=j(c.searchQuery,c.region,c.category);e.innerHTML=`
    ${M()}
    
    <main>
      <!-- ヒーローセクション -->
      <section class="hero">
        <div class="container animate-zen-float">
          <h1 class="hero-title">${n("hero.title")}</h1>
          <p class="hero-subtitle">${n("hero.subtitle")}</p>
          
          <!-- 検索バー（簡易版） -->
          <div style="max-width: 400px; margin: 0 auto; position: relative;">
            <input 
              type="text" 
              id="search-input"
              placeholder="${n("search.placeholder")}"
              style="width: 100%; padding: 1rem; border-radius: 9999px; border: 1px solid var(--color-border); background: rgba(255,255,255,0.1); color: white;"
            >
          </div>
        </div>
      </section>
      
      <!-- 広告スペース 1 -->
      <div class="container">
        ${m("leaderboard")}
      </div>
      
      <!-- 地図セクション -->
      <section class="map-section">
        <div class="container">
          ${H()}
        </div>
      </section>
      
      <!-- 寺院一覧セクション -->
      <section id="temples-section" class="temples-section">
        <div class="container">
          <div class="text-center mb-8">
            <h2 class="section-title">${n("nav.temples")}</h2>
            ${B()}
          </div>
          
          <div id="temple-grid-container">
            ${$(i)}
          </div>
        </div>
      </section>
      
      <!-- 広告スペース 2 -->
      <div class="container">
        ${m("infeed")}
      </div>
      
      <!-- ガイドセクション -->
      ${D()}
      
      <!-- 広告スペース 3 -->
      <div class="container">
        ${m("leaderboard")}
      </div>
    </main>
    
    ${R()}
  `,K(s=>w()),N(q),C(Q),E(x),J(W);const t=document.getElementById("search-input");t&&(t.addEventListener("input",s=>V(s.target.value)),t.value=c.searchQuery)}document.addEventListener("DOMContentLoaded",U);
