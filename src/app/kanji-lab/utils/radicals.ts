// KANJI LAB - 部首データ (214部首)
// 意図: 部首フィルタリング機能のための静的データ

import { Radical } from '../types/kanji';

/**
 * 康熙部首 214部首のデータ
 * 意図: 部首検索・フィルタリングUIで使用
 */
export const RADICALS: Radical[] = [
    // 1画
    { number: 1, radical: '一', name_jp: 'いち', name_en: 'one', strokes: 1 },
    { number: 2, radical: '丨', name_jp: 'ぼう・たてぼう', name_en: 'line', strokes: 1 },
    { number: 3, radical: '丶', name_jp: 'てん', name_en: 'dot', strokes: 1 },
    { number: 4, radical: '丿', name_jp: 'の', name_en: 'slash', strokes: 1 },
    { number: 5, radical: '乙', name_jp: 'おつ', name_en: 'second', strokes: 1 },
    { number: 6, radical: '亅', name_jp: 'はねぼう', name_en: 'hook', strokes: 1 },
    // 2画
    { number: 7, radical: '二', name_jp: 'に', name_en: 'two', strokes: 2 },
    { number: 8, radical: '亠', name_jp: 'なべぶた', name_en: 'lid', strokes: 2 },
    { number: 9, radical: '人', name_jp: 'ひと・にんべん', name_en: 'person', strokes: 2 },
    { number: 10, radical: '儿', name_jp: 'ひとあし', name_en: 'legs', strokes: 2 },
    { number: 11, radical: '入', name_jp: 'いる', name_en: 'enter', strokes: 2 },
    { number: 12, radical: '八', name_jp: 'はち・はちがしら', name_en: 'eight', strokes: 2 },
    { number: 13, radical: '冂', name_jp: 'けいがまえ', name_en: 'wide', strokes: 2 },
    { number: 14, radical: '冖', name_jp: 'わかんむり', name_en: 'cover', strokes: 2 },
    { number: 15, radical: '冫', name_jp: 'にすい', name_en: 'ice', strokes: 2 },
    { number: 16, radical: '几', name_jp: 'つくえ', name_en: 'table', strokes: 2 },
    { number: 17, radical: '凵', name_jp: 'かんにょう', name_en: 'container', strokes: 2 },
    { number: 18, radical: '刀', name_jp: 'かたな・りっとう', name_en: 'knife', strokes: 2 },
    { number: 19, radical: '力', name_jp: 'ちから', name_en: 'power', strokes: 2 },
    { number: 20, radical: '勹', name_jp: 'つつみがまえ', name_en: 'wrap', strokes: 2 },
    { number: 21, radical: '匕', name_jp: 'さじ', name_en: 'spoon', strokes: 2 },
    { number: 22, radical: '匚', name_jp: 'はこがまえ', name_en: 'box', strokes: 2 },
    { number: 23, radical: '匸', name_jp: 'かくしがまえ', name_en: 'hiding', strokes: 2 },
    { number: 24, radical: '十', name_jp: 'じゅう', name_en: 'ten', strokes: 2 },
    { number: 25, radical: '卜', name_jp: 'ぼく・うらない', name_en: 'divination', strokes: 2 },
    { number: 26, radical: '卩', name_jp: 'ふしづくり', name_en: 'seal', strokes: 2 },
    { number: 27, radical: '厂', name_jp: 'がんだれ', name_en: 'cliff', strokes: 2 },
    { number: 28, radical: '厶', name_jp: 'む', name_en: 'private', strokes: 2 },
    { number: 29, radical: '又', name_jp: 'また', name_en: 'again', strokes: 2 },
    // 3画
    { number: 30, radical: '口', name_jp: 'くち・くちへん', name_en: 'mouth', strokes: 3 },
    { number: 31, radical: '囗', name_jp: 'くにがまえ', name_en: 'enclosure', strokes: 3 },
    { number: 32, radical: '土', name_jp: 'つち・つちへん', name_en: 'earth', strokes: 3 },
    { number: 33, radical: '士', name_jp: 'さむらい', name_en: 'scholar', strokes: 3 },
    { number: 34, radical: '夂', name_jp: 'ふゆがしら', name_en: 'go', strokes: 3 },
    { number: 35, radical: '夊', name_jp: 'すいにょう', name_en: 'go slowly', strokes: 3 },
    { number: 36, radical: '夕', name_jp: 'ゆうべ', name_en: 'evening', strokes: 3 },
    { number: 37, radical: '大', name_jp: 'だい', name_en: 'big', strokes: 3 },
    { number: 38, radical: '女', name_jp: 'おんな・おんなへん', name_en: 'woman', strokes: 3 },
    { number: 39, radical: '子', name_jp: 'こ・こへん', name_en: 'child', strokes: 3 },
    { number: 40, radical: '宀', name_jp: 'うかんむり', name_en: 'roof', strokes: 3 },
    { number: 41, radical: '寸', name_jp: 'すん', name_en: 'inch', strokes: 3 },
    { number: 42, radical: '小', name_jp: 'しょう・ちいさい', name_en: 'small', strokes: 3 },
    { number: 43, radical: '尢', name_jp: 'まげあし', name_en: 'lame', strokes: 3 },
    { number: 44, radical: '尸', name_jp: 'しかばね', name_en: 'corpse', strokes: 3 },
    { number: 45, radical: '屮', name_jp: 'てつ', name_en: 'sprout', strokes: 3 },
    { number: 46, radical: '山', name_jp: 'やま・やまへん', name_en: 'mountain', strokes: 3 },
    { number: 47, radical: '巛', name_jp: 'かわ', name_en: 'river', strokes: 3 },
    { number: 48, radical: '工', name_jp: 'こう・たくみへん', name_en: 'work', strokes: 3 },
    { number: 49, radical: '己', name_jp: 'おのれ', name_en: 'oneself', strokes: 3 },
    { number: 50, radical: '巾', name_jp: 'はば・はばへん', name_en: 'cloth', strokes: 3 },
    { number: 51, radical: '干', name_jp: 'かん・ほす', name_en: 'dry', strokes: 3 },
    { number: 52, radical: '幺', name_jp: 'いとがしら', name_en: 'short thread', strokes: 3 },
    { number: 53, radical: '广', name_jp: 'まだれ', name_en: 'dotted cliff', strokes: 3 },
    { number: 54, radical: '廴', name_jp: 'えんにょう', name_en: 'long stride', strokes: 3 },
    { number: 55, radical: '廾', name_jp: 'こまぬき', name_en: 'two hands', strokes: 3 },
    { number: 56, radical: '弋', name_jp: 'しきがまえ', name_en: 'shoot', strokes: 3 },
    { number: 57, radical: '弓', name_jp: 'ゆみ・ゆみへん', name_en: 'bow', strokes: 3 },
    { number: 58, radical: '彐', name_jp: 'けいがしら', name_en: 'snout', strokes: 3 },
    { number: 59, radical: '彡', name_jp: 'さんづくり', name_en: 'bristle', strokes: 3 },
    { number: 60, radical: '彳', name_jp: 'ぎょうにんべん', name_en: 'step', strokes: 3 },
    // 4画
    { number: 61, radical: '心', name_jp: 'こころ・りっしんべん', name_en: 'heart', strokes: 4 },
    { number: 62, radical: '戈', name_jp: 'ほこづくり', name_en: 'halberd', strokes: 4 },
    { number: 63, radical: '戸', name_jp: 'と・とだれ', name_en: 'door', strokes: 4 },
    { number: 64, radical: '手', name_jp: 'て・てへん', name_en: 'hand', strokes: 4 },
    { number: 65, radical: '支', name_jp: 'しにょう', name_en: 'branch', strokes: 4 },
    { number: 66, radical: '攴', name_jp: 'ぼくづくり', name_en: 'rap', strokes: 4 },
    { number: 67, radical: '文', name_jp: 'ぶん', name_en: 'script', strokes: 4 },
    { number: 68, radical: '斗', name_jp: 'とます', name_en: 'dipper', strokes: 4 },
    { number: 69, radical: '斤', name_jp: 'おのづくり', name_en: 'axe', strokes: 4 },
    { number: 70, radical: '方', name_jp: 'ほう・かたへん', name_en: 'square', strokes: 4 },
    { number: 71, radical: '无', name_jp: 'なし', name_en: 'not', strokes: 4 },
    { number: 72, radical: '日', name_jp: 'ひ・にちへん', name_en: 'sun', strokes: 4 },
    { number: 73, radical: '曰', name_jp: 'いわく', name_en: 'say', strokes: 4 },
    { number: 74, radical: '月', name_jp: 'つき・つきへん', name_en: 'moon', strokes: 4 },
    { number: 75, radical: '木', name_jp: 'き・きへん', name_en: 'tree', strokes: 4 },
    { number: 76, radical: '欠', name_jp: 'あくび・けんづくり', name_en: 'lack', strokes: 4 },
    { number: 77, radical: '止', name_jp: 'とめる', name_en: 'stop', strokes: 4 },
    { number: 78, radical: '歹', name_jp: 'がつへん', name_en: 'death', strokes: 4 },
    { number: 79, radical: '殳', name_jp: 'るまた', name_en: 'weapon', strokes: 4 },
    { number: 80, radical: '毋', name_jp: 'なかれ', name_en: 'do not', strokes: 4 },
    { number: 81, radical: '比', name_jp: 'くらべる', name_en: 'compare', strokes: 4 },
    { number: 82, radical: '毛', name_jp: 'け', name_en: 'fur', strokes: 4 },
    { number: 83, radical: '氏', name_jp: 'うじ', name_en: 'clan', strokes: 4 },
    { number: 84, radical: '气', name_jp: 'きがまえ', name_en: 'steam', strokes: 4 },
    { number: 85, radical: '水', name_jp: 'みず・さんずい', name_en: 'water', strokes: 4 },
    { number: 86, radical: '火', name_jp: 'ひ・ひへん', name_en: 'fire', strokes: 4 },
    { number: 87, radical: '爪', name_jp: 'つめ', name_en: 'claw', strokes: 4 },
    { number: 88, radical: '父', name_jp: 'ちち', name_en: 'father', strokes: 4 },
    { number: 89, radical: '爻', name_jp: 'こう', name_en: 'mix', strokes: 4 },
    { number: 90, radical: '爿', name_jp: 'しょうへん', name_en: 'split wood', strokes: 4 },
    { number: 91, radical: '片', name_jp: 'かた・かたへん', name_en: 'slice', strokes: 4 },
    { number: 92, radical: '牙', name_jp: 'きば', name_en: 'fang', strokes: 4 },
    { number: 93, radical: '牛', name_jp: 'うし・うしへん', name_en: 'cow', strokes: 4 },
    { number: 94, radical: '犬', name_jp: 'いぬ・けものへん', name_en: 'dog', strokes: 4 },
    // 5画
    { number: 95, radical: '玄', name_jp: 'げん', name_en: 'profound', strokes: 5 },
    { number: 96, radical: '玉', name_jp: 'たま・たまへん', name_en: 'jade', strokes: 5 },
    { number: 97, radical: '瓜', name_jp: 'うり', name_en: 'melon', strokes: 5 },
    { number: 98, radical: '瓦', name_jp: 'かわら', name_en: 'tile', strokes: 5 },
    { number: 99, radical: '甘', name_jp: 'あまい', name_en: 'sweet', strokes: 5 },
    { number: 100, radical: '生', name_jp: 'うまれる', name_en: 'life', strokes: 5 },
    { number: 101, radical: '用', name_jp: 'もちいる', name_en: 'use', strokes: 5 },
    { number: 102, radical: '田', name_jp: 'た・たへん', name_en: 'field', strokes: 5 },
    { number: 103, radical: '疋', name_jp: 'ひき', name_en: 'bolt of cloth', strokes: 5 },
    { number: 104, radical: '疒', name_jp: 'やまいだれ', name_en: 'sickness', strokes: 5 },
    { number: 105, radical: '癶', name_jp: 'はつがしら', name_en: 'footsteps', strokes: 5 },
    { number: 106, radical: '白', name_jp: 'しろ', name_en: 'white', strokes: 5 },
    { number: 107, radical: '皮', name_jp: 'かわ・けがわ', name_en: 'skin', strokes: 5 },
    { number: 108, radical: '皿', name_jp: 'さら', name_en: 'dish', strokes: 5 },
    { number: 109, radical: '目', name_jp: 'め・めへん', name_en: 'eye', strokes: 5 },
    { number: 110, radical: '矛', name_jp: 'ほこ', name_en: 'spear', strokes: 5 },
    { number: 111, radical: '矢', name_jp: 'や・やへん', name_en: 'arrow', strokes: 5 },
    { number: 112, radical: '石', name_jp: 'いし・いしへん', name_en: 'stone', strokes: 5 },
    { number: 113, radical: '示', name_jp: 'しめす・しめすへん', name_en: 'spirit', strokes: 5 },
    { number: 114, radical: '禸', name_jp: 'ぐうのあし', name_en: 'track', strokes: 5 },
    { number: 115, radical: '禾', name_jp: 'のぎ・のぎへん', name_en: 'grain', strokes: 5 },
    { number: 116, radical: '穴', name_jp: 'あな・あなかんむり', name_en: 'cave', strokes: 5 },
    { number: 117, radical: '立', name_jp: 'たつ・たつへん', name_en: 'stand', strokes: 5 },
    // 6画
    { number: 118, radical: '竹', name_jp: 'たけ・たけかんむり', name_en: 'bamboo', strokes: 6 },
    { number: 119, radical: '米', name_jp: 'こめ・こめへん', name_en: 'rice', strokes: 6 },
    { number: 120, radical: '糸', name_jp: 'いと・いとへん', name_en: 'silk', strokes: 6 },
    { number: 121, radical: '缶', name_jp: 'ほとぎ', name_en: 'jar', strokes: 6 },
    { number: 122, radical: '网', name_jp: 'あみがしら', name_en: 'net', strokes: 6 },
    { number: 123, radical: '羊', name_jp: 'ひつじ', name_en: 'sheep', strokes: 6 },
    { number: 124, radical: '羽', name_jp: 'はね', name_en: 'feather', strokes: 6 },
    { number: 125, radical: '老', name_jp: 'おいる', name_en: 'old', strokes: 6 },
    { number: 126, radical: '而', name_jp: 'しかして', name_en: 'and', strokes: 6 },
    { number: 127, radical: '耒', name_jp: 'すきへん', name_en: 'plow', strokes: 6 },
    { number: 128, radical: '耳', name_jp: 'みみ・みみへん', name_en: 'ear', strokes: 6 },
    { number: 129, radical: '聿', name_jp: 'ふでづくり', name_en: 'brush', strokes: 6 },
    { number: 130, radical: '肉', name_jp: 'にく・にくづき', name_en: 'meat', strokes: 6 },
    { number: 131, radical: '臣', name_jp: 'しん', name_en: 'minister', strokes: 6 },
    { number: 132, radical: '自', name_jp: 'みずから', name_en: 'self', strokes: 6 },
    { number: 133, radical: '至', name_jp: 'いたる', name_en: 'arrive', strokes: 6 },
    { number: 134, radical: '臼', name_jp: 'うす', name_en: 'mortar', strokes: 6 },
    { number: 135, radical: '舌', name_jp: 'した', name_en: 'tongue', strokes: 6 },
    { number: 136, radical: '舛', name_jp: 'まいあし', name_en: 'oppose', strokes: 6 },
    { number: 137, radical: '舟', name_jp: 'ふね・ふねへん', name_en: 'boat', strokes: 6 },
    { number: 138, radical: '艮', name_jp: 'こん・うしとら', name_en: 'stopping', strokes: 6 },
    { number: 139, radical: '色', name_jp: 'いろ', name_en: 'color', strokes: 6 },
    { number: 140, radical: '艸', name_jp: 'くさかんむり', name_en: 'grass', strokes: 6 },
    { number: 141, radical: '虍', name_jp: 'とらがしら', name_en: 'tiger', strokes: 6 },
    { number: 142, radical: '虫', name_jp: 'むし・むしへん', name_en: 'insect', strokes: 6 },
    { number: 143, radical: '血', name_jp: 'ち', name_en: 'blood', strokes: 6 },
    { number: 144, radical: '行', name_jp: 'ぎょうがまえ', name_en: 'walk', strokes: 6 },
    { number: 145, radical: '衣', name_jp: 'ころも・ころもへん', name_en: 'clothes', strokes: 6 },
    { number: 146, radical: '襾', name_jp: 'にし', name_en: 'west', strokes: 6 },
    // 7画
    { number: 147, radical: '見', name_jp: 'みる', name_en: 'see', strokes: 7 },
    { number: 148, radical: '角', name_jp: 'つの・つのへん', name_en: 'horn', strokes: 7 },
    { number: 149, radical: '言', name_jp: 'ことば・ごんべん', name_en: 'speech', strokes: 7 },
    { number: 150, radical: '谷', name_jp: 'たに', name_en: 'valley', strokes: 7 },
    { number: 151, radical: '豆', name_jp: 'まめ', name_en: 'bean', strokes: 7 },
    { number: 152, radical: '豕', name_jp: 'いのこ', name_en: 'pig', strokes: 7 },
    { number: 153, radical: '豸', name_jp: 'むじなへん', name_en: 'badger', strokes: 7 },
    { number: 154, radical: '貝', name_jp: 'かい・かいへん', name_en: 'shell', strokes: 7 },
    { number: 155, radical: '赤', name_jp: 'あか', name_en: 'red', strokes: 7 },
    { number: 156, radical: '走', name_jp: 'はしる・そうにょう', name_en: 'run', strokes: 7 },
    { number: 157, radical: '足', name_jp: 'あし・あしへん', name_en: 'foot', strokes: 7 },
    { number: 158, radical: '身', name_jp: 'み・みへん', name_en: 'body', strokes: 7 },
    { number: 159, radical: '車', name_jp: 'くるま・くるまへん', name_en: 'cart', strokes: 7 },
    { number: 160, radical: '辛', name_jp: 'からい', name_en: 'bitter', strokes: 7 },
    { number: 161, radical: '辰', name_jp: 'しんのたつ', name_en: 'morning', strokes: 7 },
    { number: 162, radical: '辵', name_jp: 'しんにょう', name_en: 'walk', strokes: 7 },
    { number: 163, radical: '邑', name_jp: 'おおざと', name_en: 'city', strokes: 7 },
    { number: 164, radical: '酉', name_jp: 'とり・ひよみのとり', name_en: 'wine', strokes: 7 },
    { number: 165, radical: '釆', name_jp: 'のごめ', name_en: 'distinguish', strokes: 7 },
    { number: 166, radical: '里', name_jp: 'さと・さとへん', name_en: 'village', strokes: 7 },
    // 8画
    { number: 167, radical: '金', name_jp: 'かね・かねへん', name_en: 'gold', strokes: 8 },
    { number: 168, radical: '長', name_jp: 'ながい', name_en: 'long', strokes: 8 },
    { number: 169, radical: '門', name_jp: 'もん・もんがまえ', name_en: 'gate', strokes: 8 },
    { number: 170, radical: '阜', name_jp: 'こざとへん', name_en: 'mound', strokes: 8 },
    { number: 171, radical: '隶', name_jp: 'れいづくり', name_en: 'slave', strokes: 8 },
    { number: 172, radical: '隹', name_jp: 'ふるとり', name_en: 'short-tailed bird', strokes: 8 },
    { number: 173, radical: '雨', name_jp: 'あめ・あめかんむり', name_en: 'rain', strokes: 8 },
    { number: 174, radical: '青', name_jp: 'あお', name_en: 'blue', strokes: 8 },
    { number: 175, radical: '非', name_jp: 'あらず', name_en: 'wrong', strokes: 8 },
    // 9画
    { number: 176, radical: '面', name_jp: 'めん', name_en: 'face', strokes: 9 },
    { number: 177, radical: '革', name_jp: 'かわへん', name_en: 'leather', strokes: 9 },
    { number: 178, radical: '韋', name_jp: 'なめしがわ', name_en: 'tanned leather', strokes: 9 },
    { number: 179, radical: '韭', name_jp: 'にら', name_en: 'leek', strokes: 9 },
    { number: 180, radical: '音', name_jp: 'おと', name_en: 'sound', strokes: 9 },
    { number: 181, radical: '頁', name_jp: 'おおがい', name_en: 'leaf', strokes: 9 },
    { number: 182, radical: '風', name_jp: 'かぜ', name_en: 'wind', strokes: 9 },
    { number: 183, radical: '飛', name_jp: 'とぶ', name_en: 'fly', strokes: 9 },
    { number: 184, radical: '食', name_jp: 'しょく・しょくへん', name_en: 'eat', strokes: 9 },
    { number: 185, radical: '首', name_jp: 'くび', name_en: 'head', strokes: 9 },
    { number: 186, radical: '香', name_jp: 'かおり', name_en: 'fragrant', strokes: 9 },
    // 10画
    { number: 187, radical: '馬', name_jp: 'うま・うまへん', name_en: 'horse', strokes: 10 },
    { number: 188, radical: '骨', name_jp: 'ほね・ほねへん', name_en: 'bone', strokes: 10 },
    { number: 189, radical: '高', name_jp: 'たかい', name_en: 'tall', strokes: 10 },
    { number: 190, radical: '髟', name_jp: 'かみがしら', name_en: 'hair', strokes: 10 },
    { number: 191, radical: '鬥', name_jp: 'とうがまえ', name_en: 'fight', strokes: 10 },
    { number: 192, radical: '鬯', name_jp: 'ちょう', name_en: 'sacrificial wine', strokes: 10 },
    { number: 193, radical: '鬲', name_jp: 'れき', name_en: 'cauldron', strokes: 10 },
    { number: 194, radical: '鬼', name_jp: 'おに・きにょう', name_en: 'ghost', strokes: 10 },
    // 11画
    { number: 195, radical: '魚', name_jp: 'うお・うおへん', name_en: 'fish', strokes: 11 },
    { number: 196, radical: '鳥', name_jp: 'とり・とりへん', name_en: 'bird', strokes: 11 },
    { number: 197, radical: '鹵', name_jp: 'しお', name_en: 'salt', strokes: 11 },
    { number: 198, radical: '鹿', name_jp: 'しか', name_en: 'deer', strokes: 11 },
    { number: 199, radical: '麦', name_jp: 'むぎ', name_en: 'wheat', strokes: 11 },
    { number: 200, radical: '麻', name_jp: 'あさ', name_en: 'hemp', strokes: 11 },
    // 12画
    { number: 201, radical: '黄', name_jp: 'きいろ', name_en: 'yellow', strokes: 12 },
    { number: 202, radical: '黍', name_jp: 'きび', name_en: 'millet', strokes: 12 },
    { number: 203, radical: '黒', name_jp: 'くろ', name_en: 'black', strokes: 12 },
    { number: 204, radical: '黹', name_jp: 'ふつ', name_en: 'embroidery', strokes: 12 },
    // 13画
    { number: 205, radical: '黽', name_jp: 'べん', name_en: 'frog', strokes: 13 },
    { number: 206, radical: '鼎', name_jp: 'かなえ', name_en: 'tripod', strokes: 13 },
    { number: 207, radical: '鼓', name_jp: 'つづみ', name_en: 'drum', strokes: 13 },
    { number: 208, radical: '鼠', name_jp: 'ねずみ', name_en: 'rat', strokes: 13 },
    // 14画
    { number: 209, radical: '鼻', name_jp: 'はな', name_en: 'nose', strokes: 14 },
    { number: 210, radical: '齊', name_jp: 'せい', name_en: 'even', strokes: 14 },
    // 15画
    { number: 211, radical: '歯', name_jp: 'は・はへん', name_en: 'tooth', strokes: 15 },
    // 16画
    { number: 212, radical: '龍', name_jp: 'りゅう', name_en: 'dragon', strokes: 16 },
    { number: 213, radical: '龜', name_jp: 'かめ', name_en: 'turtle', strokes: 16 },
    // 17画
    { number: 214, radical: '龠', name_jp: 'やく', name_en: 'flute', strokes: 17 },
];

/**
 * 画数でグループ化された部首
 * 意図: フィルターUIでの表示用
 */
export const RADICALS_BY_STROKE: Record<number, Radical[]> = RADICALS.reduce((acc, radical) => {
    if (!acc[radical.strokes]) {
        acc[radical.strokes] = [];
    }
    acc[radical.strokes].push(radical);
    return acc;
}, {} as Record<number, Radical[]>);

/**
 * 部首文字から部首情報を取得
 */
export function getRadicalByChar(char: string): Radical | undefined {
    return RADICALS.find(r => r.radical === char);
}

/**
 * 部首番号から部首情報を取得
 */
export function getRadicalByNumber(num: number): Radical | undefined {
    return RADICALS.find(r => r.number === num);
}
