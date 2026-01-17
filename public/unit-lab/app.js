/**
 * UNIT LAB - 換算エンジン & アプリケーションロジック
 * 意図：SI単位系から伝統単位まで高精度変換を提供
 * 浮動小数点対策としてBigNumber的な処理を内部実装
 */

// ============================================
// 多言語対応（i18n）
// ============================================
const i18n = {
    ja: {
        // UI
        inputValue: '入力値',
        result: '結果',
        visualComparison: '視覚的比較',
        origin: '単位の由来',
        privacy: 'プライバシーポリシー',
        terms: '利用規約',
        disclaimer: '免責事項',

        // カテゴリ
        length: '長さ',
        mass: '質量',
        time: '時間',
        temperature: '温度',
        area: '面積',
        volume: '体積',
        speed: '速度',
        energy: 'エネルギー',
        pressure: '圧力',
        data: 'データ',
        force: '力',

        // 法的文書
        privacyContent: '<p>本サービスは、ユーザーの個人情報を適切に管理し、法令を遵守します。</p><p>収集した情報は、サービス改善の目的のみに使用されます。</p>',
        termsContent: '<p>本サービスの利用により、以下の規約に同意したものとみなされます。</p><p>コンテンツの無断転載・商用利用は禁止されています。</p>',
        disclaimerContent: '<p>本サービスで提供される換算結果は参考値であり、その正確性を保証するものではありません。</p><p>重要な計測には、公式な計量器具をご使用ください。</p>'
    },
    en: {
        inputValue: 'Input Value',
        result: 'Result',
        visualComparison: 'Visual Comparison',
        origin: 'Unit Origin',
        privacy: 'Privacy Policy',
        terms: 'Terms of Service',
        disclaimer: 'Disclaimer',

        length: 'Length',
        mass: 'Mass',
        time: 'Time',
        temperature: 'Temperature',
        area: 'Area',
        volume: 'Volume',
        speed: 'Speed',
        energy: 'Energy',
        pressure: 'Pressure',
        data: 'Data',
        force: 'Force',

        privacyContent: '<p>This service properly manages user personal information and complies with applicable laws.</p><p>Collected information is used only for service improvement.</p>',
        termsContent: '<p>By using this service, you agree to the following terms.</p><p>Unauthorized reproduction or commercial use of content is prohibited.</p>',
        disclaimerContent: '<p>Conversion results provided by this service are reference values and their accuracy is not guaranteed.</p><p>Please use official measuring instruments for important measurements.</p>'
    }
};

// ============================================
// 単位データベース（11カテゴリ）
// ============================================
const UNIT_DATA = {
    length: {
        base: 'm',
        icon: '📏',
        units: {
            km: { factor: 1000, ja: 'キロメートル', en: 'Kilometer' },
            m: { factor: 1, ja: 'メートル', en: 'Meter' },
            cm: { factor: 0.01, ja: 'センチメートル', en: 'Centimeter' },
            mm: { factor: 0.001, ja: 'ミリメートル', en: 'Millimeter' },
            μm: { factor: 1e-6, ja: 'マイクロメートル', en: 'Micrometer' },
            nm: { factor: 1e-9, ja: 'ナノメートル', en: 'Nanometer' },
            mi: { factor: 1609.344, ja: 'マイル', en: 'Mile' },
            yd: { factor: 0.9144, ja: 'ヤード', en: 'Yard' },
            ft: { factor: 0.3048, ja: 'フィート', en: 'Foot' },
            in: { factor: 0.0254, ja: 'インチ', en: 'Inch' },
            nmi: { factor: 1852, ja: '海里', en: 'Nautical Mile' },
            shaku: { factor: 0.303030303, ja: '尺', en: 'Shaku' },
            sun: { factor: 0.0303030303, ja: '寸', en: 'Sun' },
            ken: { factor: 1.818181818, ja: '間', en: 'Ken' },
            ri: { factor: 3927.27273, ja: '里', en: 'Ri' }
        },
        origin: {
            ja: 'メートルは1791年にフランスで定義され、当初は地球の子午線の4千万分の1として設定されました。1983年以降、光が真空中で1/299,792,458秒間に進む距離として再定義されています。',
            en: 'The meter was defined in France in 1791, originally as one ten-millionth of the distance from the equator to the North Pole. Since 1983, it has been redefined as the distance light travels in vacuum in 1/299,792,458 of a second.'
        },
        comparisons: [
            { icon: '🗼', value: '333', unit: 'm', ja: '東京タワーの高さ', en: 'Height of Tokyo Tower' },
            { icon: '🏃', value: '100', unit: 'm', ja: '陸上短距離', en: 'Sprint Distance' },
            { icon: '✈️', value: '10,000', unit: 'm', ja: '飛行機の巡航高度', en: 'Airplane Cruising Altitude' }
        ]
    },
    mass: {
        base: 'kg',
        icon: '⚖️',
        units: {
            t: { factor: 1000, ja: 'トン', en: 'Tonne' },
            kg: { factor: 1, ja: 'キログラム', en: 'Kilogram' },
            g: { factor: 0.001, ja: 'グラム', en: 'Gram' },
            mg: { factor: 1e-6, ja: 'ミリグラム', en: 'Milligram' },
            lb: { factor: 0.45359237, ja: 'ポンド', en: 'Pound' },
            oz: { factor: 0.028349523125, ja: 'オンス', en: 'Ounce' },
            ct: { factor: 0.0002, ja: 'カラット', en: 'Carat' },
            kan: { factor: 3.75, ja: '貫', en: 'Kan' },
            kin: { factor: 0.6, ja: '斤', en: 'Kin' },
            monme: { factor: 0.00375, ja: '匁', en: 'Momme' }
        },
        origin: {
            ja: 'キログラムは1889年に国際キログラム原器として定義されましたが、2019年にプランク定数に基づく定義に変更されました。これは「シリコン球」実験の成果です。',
            en: 'The kilogram was defined in 1889 by the International Prototype of the Kilogram, but was redefined in 2019 based on the Planck constant, following the silicon sphere experiment.'
        },
        comparisons: [
            { icon: '🍎', value: '200', unit: 'g', ja: 'りんご1個', en: 'One Apple' },
            { icon: '🐘', value: '5,000', unit: 'kg', ja: 'アフリカゾウ', en: 'African Elephant' },
            { icon: '💎', value: '1', unit: 'ct', ja: 'ダイヤモンド0.2g', en: 'Diamond 0.2g' }
        ]
    },
    time: {
        base: 's',
        icon: '⏱️',
        units: {
            year: { factor: 31536000, ja: '年', en: 'Year' },
            month: { factor: 2628000, ja: '月', en: 'Month' },
            week: { factor: 604800, ja: '週', en: 'Week' },
            day: { factor: 86400, ja: '日', en: 'Day' },
            h: { factor: 3600, ja: '時間', en: 'Hour' },
            min: { factor: 60, ja: '分', en: 'Minute' },
            s: { factor: 1, ja: '秒', en: 'Second' },
            ms: { factor: 0.001, ja: 'ミリ秒', en: 'Millisecond' },
            μs: { factor: 1e-6, ja: 'マイクロ秒', en: 'Microsecond' },
            ns: { factor: 1e-9, ja: 'ナノ秒', en: 'Nanosecond' }
        },
        origin: {
            ja: '秒は元々1日の86,400分の1として定義されていましたが、1967年以降はセシウム133原子の放射周期に基づいて定義されています（9,192,631,770周期）。',
            en: 'The second was originally defined as 1/86,400 of a day, but since 1967, it has been defined based on cesium-133 atomic radiation (9,192,631,770 periods).'
        },
        comparisons: [
            { icon: '💓', value: '1', unit: 's', ja: '心臓の1拍', en: 'One Heartbeat' },
            { icon: '⚡', value: '1', unit: 'ms', ja: '稲妻の持続時間', en: 'Lightning Duration' },
            { icon: '🌙', value: '29.5', unit: 'day', ja: '月の満ち欠け周期', en: 'Lunar Cycle' }
        ]
    },
    temperature: {
        base: 'K',
        icon: '🌡️',
        units: {
            K: { factor: 1, offset: 0, ja: 'ケルビン', en: 'Kelvin', special: 'kelvin' },
            C: { factor: 1, offset: 273.15, ja: '摂氏', en: 'Celsius', special: 'celsius' },
            F: { factor: 5 / 9, offset: 459.67 * 5 / 9, ja: '華氏', en: 'Fahrenheit', special: 'fahrenheit' },
            R: { factor: 5 / 9, offset: 0, ja: 'ランキン', en: 'Rankine', special: 'rankine' }
        },
        origin: {
            ja: '摂氏温度は1742年にアンデルス・セルシウスにより考案されました。水の凝固点を0度、沸点を100度と定義しています。ケルビンは絶対零度（-273.15°C）を0とする熱力学温度です。',
            en: 'Celsius was devised by Anders Celsius in 1742, defining water freezing at 0° and boiling at 100°. Kelvin is the thermodynamic temperature with absolute zero (-273.15°C) as 0.'
        },
        comparisons: [
            { icon: '🧊', value: '0', unit: '°C', ja: '水の凝固点', en: 'Water Freezing Point' },
            { icon: '🔥', value: '100', unit: '°C', ja: '水の沸点', en: 'Water Boiling Point' },
            { icon: '🌡️', value: '36.5', unit: '°C', ja: '人間の体温', en: 'Human Body Temp' }
        ]
    },
    area: {
        base: 'm2',
        icon: '📐',
        units: {
            km2: { factor: 1000000, ja: '平方キロメートル', en: 'Square Kilometer' },
            ha: { factor: 10000, ja: 'ヘクタール', en: 'Hectare' },
            a: { factor: 100, ja: 'アール', en: 'Are' },
            m2: { factor: 1, ja: '平方メートル', en: 'Square Meter' },
            cm2: { factor: 0.0001, ja: '平方センチメートル', en: 'Square Centimeter' },
            acre: { factor: 4046.8564224, ja: 'エーカー', en: 'Acre' },
            sqft: { factor: 0.09290304, ja: '平方フィート', en: 'Square Foot' },
            tsubo: { factor: 3.305785124, ja: '坪', en: 'Tsubo' },
            jo: { factor: 1.6528926, ja: '畳', en: 'Jo (Tatami)' },
            tan: { factor: 991.7355372, ja: '反', en: 'Tan' },
            cho: { factor: 9917.355372, ja: '町', en: 'Cho' }
        },
        origin: {
            ja: '坪（つぼ）は日本の伝統的な面積単位で、約3.3平方メートルに相当します。畳2枚分の広さとして知られ、不動産取引で今も使用されています。',
            en: 'Tsubo is a traditional Japanese unit of area, approximately 3.3 square meters. Known as the size of two tatami mats, it is still used in real estate transactions.'
        },
        comparisons: [
            { icon: '⚽', value: '1', unit: 'ha', ja: 'サッカー場の約1.4倍', en: '~1.4 Soccer Fields' },
            { icon: '🏠', value: '30', unit: '坪', ja: '一般的な住宅', en: 'Typical House' },
            { icon: '🏟️', value: '2.1', unit: 'ha', ja: '東京ドームのグラウンド', en: 'Tokyo Dome Field' }
        ]
    },
    volume: {
        base: 'L',
        icon: '🧪',
        units: {
            m3: { factor: 1000, ja: '立方メートル', en: 'Cubic Meter' },
            L: { factor: 1, ja: 'リットル', en: 'Liter' },
            mL: { factor: 0.001, ja: 'ミリリットル', en: 'Milliliter' },
            gal: { factor: 3.785411784, ja: 'ガロン(米)', en: 'Gallon (US)' },
            qt: { factor: 0.946352946, ja: 'クォート', en: 'Quart' },
            pt: { factor: 0.473176473, ja: 'パイント', en: 'Pint' },
            floz: { factor: 0.0295735296, ja: '液量オンス', en: 'Fluid Ounce' },
            sho: { factor: 1.80390684, ja: '升', en: 'Sho' },
            go: { factor: 0.180390684, ja: '合', en: 'Go' },
            shaku: { factor: 0.0180390684, ja: '勺', en: 'Shaku' }
        },
        origin: {
            ja: '升（しょう）は日本の伝統的な体積単位で、約1.8リットルです。主に米や酒の計量に使用されてきました。一升瓶はこの単位に由来します。',
            en: 'Sho is a traditional Japanese volume unit, approximately 1.8 liters. It has been primarily used for measuring rice and sake. The isshobin bottle derives from this unit.'
        },
        comparisons: [
            { icon: '🍶', value: '1', unit: '升', ja: '一升瓶', en: 'Isshobin Bottle' },
            { icon: '🥛', value: '200', unit: 'mL', ja: 'コップ1杯', en: 'One Glass' },
            { icon: '🛢️', value: '200', unit: 'L', ja: 'ドラム缶', en: 'Drum Can' }
        ]
    },
    speed: {
        base: 'm/s',
        icon: '🚀',
        units: {
            'c': { factor: 299792458, ja: '光速', en: 'Speed of Light' },
            'km/h': { factor: 0.277777778, ja: 'キロメートル毎時', en: 'km/h' },
            'm/s': { factor: 1, ja: 'メートル毎秒', en: 'm/s' },
            'mph': { factor: 0.44704, ja: 'マイル毎時', en: 'mph' },
            'knot': { factor: 0.514444444, ja: 'ノット', en: 'Knot' },
            'mach': { factor: 343, ja: 'マッハ', en: 'Mach' },
            'ft/s': { factor: 0.3048, ja: 'フィート毎秒', en: 'ft/s' }
        },
        origin: {
            ja: 'ノットは航海で使用される速度単位で、1時間に1海里進む速度を表します。名前は船の速度を測る際に使用したロープの「結び目(knot)」に由来します。',
            en: 'The knot is a unit of speed used in navigation, representing one nautical mile per hour. The name derives from the knots tied in rope used to measure ship speed.'
        },
        comparisons: [
            { icon: '🐆', value: '120', unit: 'km/h', ja: 'チーターの最高速度', en: 'Cheetah Top Speed' },
            { icon: '✈️', value: '900', unit: 'km/h', ja: '旅客機の巡航速度', en: 'Airliner Cruise Speed' },
            { icon: '🚄', value: '320', unit: 'km/h', ja: '新幹線の最高速度', en: 'Shinkansen Top Speed' }
        ]
    },
    energy: {
        base: 'J',
        icon: '⚡',
        units: {
            kWh: { factor: 3600000, ja: 'キロワット時', en: 'Kilowatt-hour' },
            Wh: { factor: 3600, ja: 'ワット時', en: 'Watt-hour' },
            kJ: { factor: 1000, ja: 'キロジュール', en: 'Kilojoule' },
            J: { factor: 1, ja: 'ジュール', en: 'Joule' },
            cal: { factor: 4.184, ja: 'カロリー', en: 'Calorie' },
            kcal: { factor: 4184, ja: 'キロカロリー', en: 'Kilocalorie' },
            eV: { factor: 1.602176634e-19, ja: '電子ボルト', en: 'Electronvolt' },
            BTU: { factor: 1055.06, ja: 'BTU', en: 'BTU' }
        },
        origin: {
            ja: 'ジュールは物理学者ジェームズ・プレスコット・ジュールにちなんで名付けられました。1ジュールは1ニュートンの力で物体を1メートル動かすのに必要なエネルギーです。',
            en: 'The joule is named after physicist James Prescott Joule. One joule is the energy required to move an object one meter with a force of one newton.'
        },
        comparisons: [
            { icon: '🍔', value: '500', unit: 'kcal', ja: 'ハンバーガー1個', en: 'One Hamburger' },
            { icon: '💡', value: '1', unit: 'kWh', ja: '100W電球10時間', en: '100W Bulb for 10h' },
            { icon: '⚡', value: '3.6', unit: 'MJ', ja: '1kWhのエネルギー', en: 'Energy of 1 kWh' }
        ]
    },
    pressure: {
        base: 'Pa',
        icon: '🎈',
        units: {
            atm: { factor: 101325, ja: '気圧', en: 'Atmosphere' },
            bar: { factor: 100000, ja: 'バール', en: 'Bar' },
            kPa: { factor: 1000, ja: 'キロパスカル', en: 'Kilopascal' },
            Pa: { factor: 1, ja: 'パスカル', en: 'Pascal' },
            hPa: { factor: 100, ja: 'ヘクトパスカル', en: 'Hectopascal' },
            mmHg: { factor: 133.322, ja: '水銀柱ミリメートル', en: 'mmHg' },
            psi: { factor: 6894.76, ja: 'ポンド毎平方インチ', en: 'PSI' },
            torr: { factor: 133.322, ja: 'トル', en: 'Torr' }
        },
        origin: {
            ja: 'パスカルはブレーズ・パスカルにちなんで命名されました。1気圧は海面上での標準大気圧で、約101,325パスカルに相当します。',
            en: 'The pascal is named after Blaise Pascal. One atmosphere is the standard atmospheric pressure at sea level, approximately 101,325 pascals.'
        },
        comparisons: [
            { icon: '🌊', value: '1', unit: 'atm', ja: '海面での気圧', en: 'Sea Level Pressure' },
            { icon: '🚗', value: '2.5', unit: 'bar', ja: 'カータイヤの空気圧', en: 'Car Tire Pressure' },
            { icon: '🏔️', value: '0.33', unit: 'atm', ja: 'エベレスト山頂', en: 'Mt. Everest Summit' }
        ]
    },
    data: {
        base: 'B',
        icon: '💾',
        units: {
            TB: { factor: 1e12, ja: 'テラバイト', en: 'Terabyte' },
            GB: { factor: 1e9, ja: 'ギガバイト', en: 'Gigabyte' },
            MB: { factor: 1e6, ja: 'メガバイト', en: 'Megabyte' },
            KB: { factor: 1e3, ja: 'キロバイト', en: 'Kilobyte' },
            B: { factor: 1, ja: 'バイト', en: 'Byte' },
            bit: { factor: 0.125, ja: 'ビット', en: 'Bit' },
            Tbit: { factor: 1.25e11, ja: 'テラビット', en: 'Terabit' },
            Gbit: { factor: 1.25e8, ja: 'ギガビット', en: 'Gigabit' },
            Mbit: { factor: 1.25e5, ja: 'メガビット', en: 'Megabit' },
            Kbit: { factor: 125, ja: 'キロビット', en: 'Kilobit' }
        },
        origin: {
            ja: 'バイトは8ビットで構成されるデータ単位です。1956年にIBMが命名し、1文字を表すのに十分なデータ量として設計されました。',
            en: 'A byte consists of 8 bits. Named by IBM in 1956, it was designed to represent enough data for one character.'
        },
        comparisons: [
            { icon: '📄', value: '2', unit: 'KB', ja: 'テキストファイル1ページ', en: 'One Page Text File' },
            { icon: '📷', value: '5', unit: 'MB', ja: 'スマホ写真1枚', en: 'One Smartphone Photo' },
            { icon: '🎬', value: '4', unit: 'GB', ja: 'HD映画1本', en: 'One HD Movie' }
        ]
    },
    force: {
        base: 'N',
        icon: '💪',
        units: {
            kN: { factor: 1000, ja: 'キロニュートン', en: 'Kilonewton' },
            N: { factor: 1, ja: 'ニュートン', en: 'Newton' },
            dyn: { factor: 1e-5, ja: 'ダイン', en: 'Dyne' },
            kgf: { factor: 9.80665, ja: '重量キログラム', en: 'Kilogram-force' },
            lbf: { factor: 4.44822, ja: '重量ポンド', en: 'Pound-force' },
            gf: { factor: 0.00980665, ja: '重量グラム', en: 'Gram-force' }
        },
        origin: {
            ja: 'ニュートンはアイザック・ニュートンにちなんで命名されました。1ニュートンは質量1kgの物体に1m/s²の加速度を与える力です。地球上で約102gの物体にかかる重力に相当します。',
            en: 'The newton is named after Isaac Newton. One newton is the force that gives a 1 kg mass an acceleration of 1 m/s². It equals the gravitational force on about 102 grams on Earth.'
        },
        comparisons: [
            { icon: '🍎', value: '1', unit: 'N', ja: 'りんご約100gの重さ', en: '~100g Apple Weight' },
            { icon: '🏋️', value: '980', unit: 'N', ja: '100kgの重量', en: '100 kg Weight' },
            { icon: '🚀', value: '35,000', unit: 'kN', ja: 'ロケットエンジンの推力', en: 'Rocket Engine Thrust' }
        ]
    }
};

// ============================================
// 換算エンジン（高精度計算）
// ============================================
class ConversionEngine {
    constructor() {
        this.precision = 12;
    }

    // 温度変換用特殊ロジック
    convertTemperature(value, from, to) {
        let kelvin;

        // 入力をケルビンに変換
        switch (from) {
            case 'K': kelvin = value; break;
            case 'C': kelvin = value + 273.15; break;
            case 'F': kelvin = (value + 459.67) * 5 / 9; break;
            case 'R': kelvin = value * 5 / 9; break;
            default: kelvin = value;
        }

        // ケルビンから目的単位に変換
        switch (to) {
            case 'K': return kelvin;
            case 'C': return kelvin - 273.15;
            case 'F': return kelvin * 9 / 5 - 459.67;
            case 'R': return kelvin * 9 / 5;
            default: return kelvin;
        }
    }

    // 汎用変換
    convert(value, fromUnit, toUnit, category) {
        if (category === 'temperature') {
            return this.convertTemperature(value, fromUnit, toUnit);
        }

        const units = UNIT_DATA[category].units;
        const fromFactor = units[fromUnit].factor;
        const toFactor = units[toUnit].factor;

        // 基準単位を経由して変換
        const baseValue = value * fromFactor;
        const result = baseValue / toFactor;

        return result;
    }

    // 数値のフォーマット（精度自動調整）
    formatNumber(num, inputLength = 1) {
        if (num === 0) return '0';
        if (!isFinite(num)) return '∞';

        const absNum = Math.abs(num);

        // 非常に大きい/小さい数は科学的表記
        if (absNum >= 1e10 || (absNum < 1e-6 && absNum !== 0)) {
            return num.toExponential(Math.min(6, inputLength + 2));
        }

        // 整数の場合
        if (Number.isInteger(num) && absNum < 1e10) {
            return num.toLocaleString();
        }

        // 小数の場合、有効桁数を調整
        const decimalPlaces = Math.max(2, Math.min(8, inputLength + 2));
        let formatted = num.toFixed(decimalPlaces);

        // 末尾の不要な0を削除
        formatted = formatted.replace(/\.?0+$/, '');

        // 整数部にカンマを追加
        const parts = formatted.split('.');
        parts[0] = parseFloat(parts[0]).toLocaleString();

        return parts.join('.');
    }
}

// ============================================
// アプリケーション
// ============================================
class UnitLabApp {
    constructor() {
        this.engine = new ConversionEngine();
        this.currentLang = this.detectLanguage();
        this.currentCategory = 'length';

        this.init();
    }

    detectLanguage() {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        if (langParam && ['ja', 'en'].includes(langParam)) {
            return langParam;
        }
        return navigator.language.startsWith('ja') ? 'ja' : 'en';
    }

    init() {
        this.injectStyles();
        this.renderCategories();
        this.renderUnits();
        this.bindEvents();
        this.updateTranslations();
        this.calculate();
        this.renderComparisons();
        this.renderOrigin();
        this.setupPWA();
        this.registerServiceWorker();
    }

    registerServiceWorker() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('sw.js')
                .then(reg => console.log('SW registered:', reg))
                .catch(err => console.log('SW registration failed:', err));
        }
    }

    injectStyles() {
        // CSSを外部ファイルから読み込み
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'style.css';
        document.head.appendChild(link);
    }

    renderCategories() {
        const nav = document.getElementById('categoryNav');
        const t = i18n[this.currentLang];

        const categories = Object.keys(UNIT_DATA);
        nav.innerHTML = categories.map(cat => {
            const data = UNIT_DATA[cat];
            return `
                <button class="category-btn ${cat === this.currentCategory ? 'active' : ''}" 
                        data-category="${cat}" aria-pressed="${cat === this.currentCategory}">
                    <span>${data.icon}</span>
                    <span>${t[cat] || cat}</span>
                </button>
            `;
        }).join('');
    }

    renderUnits() {
        const inputSelect = document.getElementById('inputUnit');
        const outputSelect = document.getElementById('outputUnit');
        const category = UNIT_DATA[this.currentCategory];
        const units = category.units;

        const options = Object.entries(units).map(([key, data]) => {
            const label = data[this.currentLang] || data.en;
            return `<option value="${key}">${key} - ${label}</option>`;
        }).join('');

        inputSelect.innerHTML = options;
        outputSelect.innerHTML = options;

        // デフォルト選択（基準単位から別の単位へ）
        const unitKeys = Object.keys(units);
        const baseIndex = unitKeys.indexOf(category.base);
        inputSelect.selectedIndex = baseIndex >= 0 ? baseIndex : 0;
        outputSelect.selectedIndex = baseIndex >= 0 ? (baseIndex + 1) % unitKeys.length : 1;
    }

    bindEvents() {
        // カテゴリ切替
        document.getElementById('categoryNav').addEventListener('click', (e) => {
            const btn = e.target.closest('.category-btn');
            if (btn) {
                this.currentCategory = btn.dataset.category;
                document.querySelectorAll('.category-btn').forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-pressed', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
                this.renderUnits();
                this.calculate();
                this.renderComparisons();
                this.renderOrigin();
            }
        });

        // 入力値変更
        document.getElementById('inputValue').addEventListener('input', () => this.calculate());

        // 単位変更
        document.getElementById('inputUnit').addEventListener('change', () => this.calculate());
        document.getElementById('outputUnit').addEventListener('change', () => this.calculate());

        // 単位入れ替え
        document.getElementById('swapUnits').addEventListener('click', () => {
            const inputUnit = document.getElementById('inputUnit');
            const outputUnit = document.getElementById('outputUnit');
            const temp = inputUnit.value;
            inputUnit.value = outputUnit.value;
            outputUnit.value = temp;
            this.calculate();
        });

        // 言語切替
        document.getElementById('langToggle').addEventListener('click', () => {
            this.currentLang = this.currentLang === 'ja' ? 'en' : 'ja';
            this.updateTranslations();
            this.renderCategories();
            this.renderUnits();
            this.calculate();
            this.renderComparisons();
            this.renderOrigin();

            // URL更新
            const url = new URL(window.location);
            url.searchParams.set('lang', this.currentLang);
            history.replaceState({}, '', url);
        });

        // 法的モーダル
        ['privacy', 'terms', 'disclaimer'].forEach(type => {
            document.getElementById(`${type}Btn`).addEventListener('click', () => {
                this.showLegalModal(type);
            });
        });

        // モーダル閉じる
        document.querySelector('.modal-backdrop').addEventListener('click', () => this.closeModal());
        document.querySelector('.modal-close').addEventListener('click', () => this.closeModal());
    }

    calculate() {
        const inputValue = parseFloat(document.getElementById('inputValue').value) || 0;
        const inputUnit = document.getElementById('inputUnit').value;
        const outputUnit = document.getElementById('outputUnit').value;

        const result = this.engine.convert(inputValue, inputUnit, outputUnit, this.currentCategory);
        const inputLength = document.getElementById('inputValue').value.replace(/[^0-9]/g, '').length;
        const formatted = this.engine.formatNumber(result, inputLength);

        const outputEl = document.getElementById('outputValue');
        outputEl.classList.add('changing');

        setTimeout(() => {
            outputEl.textContent = formatted;
            outputEl.classList.remove('changing');
        }, 150);

        this.renderQuickResults(inputValue, inputUnit);
    }

    renderQuickResults(value, fromUnit) {
        const container = document.getElementById('quickResults');
        const units = UNIT_DATA[this.currentCategory].units;
        const outputUnit = document.getElementById('outputUnit').value;

        // 主要な単位を抽出（選択中の出力単位以外で最大5つ）
        const quickUnits = Object.keys(units)
            .filter(u => u !== fromUnit && u !== outputUnit)
            .slice(0, 5);

        container.innerHTML = quickUnits.map(unit => {
            const result = this.engine.convert(value, fromUnit, unit, this.currentCategory);
            const formatted = this.engine.formatNumber(result, 2);
            const label = units[unit][this.currentLang] || units[unit].en;
            return `
                <div class="quick-result-item">
                    <div class="quick-result-value">${formatted}</div>
                    <div class="quick-result-unit">${unit} (${label})</div>
                </div>
            `;
        }).join('');
    }

    renderComparisons() {
        const container = document.getElementById('comparisonCards');
        const comparisons = UNIT_DATA[this.currentCategory].comparisons || [];

        container.innerHTML = comparisons.map(comp => `
            <div class="comparison-card">
                <div class="comparison-icon">${comp.icon}</div>
                <div class="comparison-title">${comp.value} ${comp.unit}</div>
                <div class="comparison-desc">${comp[this.currentLang]}</div>
            </div>
        `).join('');
    }

    renderOrigin() {
        const container = document.getElementById('originContent');
        const origin = UNIT_DATA[this.currentCategory].origin;
        container.innerHTML = `<p>${origin[this.currentLang]}</p>`;
    }

    updateTranslations() {
        const t = i18n[this.currentLang];

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            if (t[key]) {
                el.textContent = t[key];
            }
        });

        // 言語トグルのアクティブ表示
        document.querySelector('.lang-ja').classList.toggle('active', this.currentLang === 'ja');
        document.querySelector('.lang-en').classList.toggle('active', this.currentLang === 'en');

        // HTML lang属性
        document.documentElement.lang = this.currentLang;
    }

    showLegalModal(type) {
        const t = i18n[this.currentLang];
        const modal = document.getElementById('legalModal');
        const title = document.getElementById('modalTitle');
        const body = document.getElementById('modalBody');

        title.textContent = t[type];
        body.innerHTML = t[`${type}Content`];
        modal.hidden = false;
    }

    closeModal() {
        document.getElementById('legalModal').hidden = true;
    }

    setupPWA() {
        let deferredPrompt;
        const installBtn = document.getElementById('pwaInstall');

        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'flex';
        });

        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                deferredPrompt = null;
                if (outcome === 'accepted') {
                    installBtn.style.display = 'none';
                }
            }
        });
    }
}

// ============================================
// 初期化
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    window.unitLab = new UnitLabApp();
});
