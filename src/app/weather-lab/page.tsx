'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
    cities,
    weatherCodes,
    defaultWeather,
    getTemperatureColor,
    celsiusToFahrenheit,
    fetchWeatherData,
    type WeatherData,
} from './data';

// ============================================================
// カラーパレット定義
// Blueprint / Scientific（ダークモード基調）
// ============================================================
const colors = {
    primary: '#4FC3F7',    // 水色
    secondary: '#FFC107',  // 黄色（太陽）
    accent: '#50C878',     // Saison Green
    bgDark: '#0A0F1A',
    bgCard: '#111827',
    bgMap: '#0D1421',
    text: '#E5E7EB',
    muted: '#6B7280',
};

// ============================================================
// テキスト翻訳
// ============================================================
const texts = {
    jp: {
        title: 'WEATHER LAB',
        subtitle: 'ウェザー・ラボ',
        back: '← Saison Lab',
        search: '都市を検索...',
        celsius: '℃',
        fahrenheit: '°F',
        humidity: '湿度',
        wind: '風速',
        selectCity: '都市を選択してください',
        citiesCount: '都市',
        loading: '読み込み中...',
        error: 'データ取得失敗',
        refresh: '更新',
        privacy: 'プライバシーポリシー',
        disclaimer: '免責事項',
        copyright: '© 2026 Saison Lab',
    },
    en: {
        title: 'WEATHER LAB',
        subtitle: 'World Weather',
        back: '← Saison Lab',
        search: 'Search cities...',
        celsius: '℃',
        fahrenheit: '°F',
        humidity: 'Humidity',
        wind: 'Wind',
        selectCity: 'Select a city',
        citiesCount: 'cities',
        loading: 'Loading...',
        error: 'Failed to load',
        refresh: 'Refresh',
        privacy: 'Privacy Policy',
        disclaimer: 'Disclaimer',
        copyright: '© 2026 Saison Lab',
    },
};

// ============================================================
// 世界地図上の都市位置（SVG座標に変換）
// ============================================================
const cityPositions: Record<string, { x: number; y: number }> = {
    tokyo: { x: 520, y: 140 },
    newyork: { x: 150, y: 130 },
    london: { x: 280, y: 110 },
    paris: { x: 290, y: 120 },
    sydney: { x: 540, y: 260 },
    beijing: { x: 475, y: 130 },
    dubai: { x: 380, y: 165 },
    singapore: { x: 460, y: 200 },
    losangeles: { x: 80, y: 145 },
    moscow: { x: 350, y: 95 },
    saopaulo: { x: 175, y: 250 },
    cairo: { x: 330, y: 160 },
    mumbai: { x: 415, y: 175 },
    seoul: { x: 500, y: 130 },
    mexicocity: { x: 110, y: 175 },
};

export default function WeatherLabPage() {
    const [lang, setLang] = useState<'jp' | 'en'>('jp');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCity, setSelectedCity] = useState<string | null>(null);
    const [useCelsius, setUseCelsius] = useState(true);
    const [weatherData, setWeatherData] = useState<Record<string, WeatherData>>({});
    const [isInitialLoad, setIsInitialLoad] = useState(true);

    const t = texts[lang];

    // ============================================================
    // 全都市の天気データを取得
    // ============================================================
    const loadAllWeatherData = useCallback(async () => {
        const newData: Record<string, WeatherData> = {};

        // 並列で全都市のデータを取得
        await Promise.all(
            cities.map(async (city) => {
                try {
                    const data = await fetchWeatherData(city.lat, city.lon);
                    newData[city.id] = {
                        cityId: city.id,
                        ...data,
                        isLoading: false,
                        error: null,
                    };
                } catch {
                    newData[city.id] = {
                        cityId: city.id,
                        temperature: 0,
                        weatherCode: 0,
                        humidity: 0,
                        windSpeed: 0,
                        isLoading: false,
                        error: 'Failed to load',
                    };
                }
            })
        );

        setWeatherData(newData);
        setIsInitialLoad(false);
    }, []);

    // 初回ロード
    useEffect(() => {
        loadAllWeatherData();
    }, [loadAllWeatherData]);

    // ============================================================
    // 都市フィルタリング
    // ============================================================
    const filteredCities = useMemo(() => {
        if (!searchQuery.trim()) return cities;
        const query = searchQuery.toLowerCase();
        return cities.filter(
            (city) =>
                city.name.jp.toLowerCase().includes(query) ||
                city.name.en.toLowerCase().includes(query) ||
                city.country.jp.toLowerCase().includes(query) ||
                city.country.en.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    // ============================================================
    // 選択都市のデータ取得
    // ============================================================
    const selectedCityData = useMemo(() => {
        return cities.find((c) => c.id === selectedCity);
    }, [selectedCity]);

    const selectedWeather = useMemo(() => {
        return selectedCity ? weatherData[selectedCity] : null;
    }, [selectedCity, weatherData]);

    // ============================================================
    // 温度表示
    // ============================================================
    const formatTemp = (temp: number) => {
        if (useCelsius) {
            return `${temp}${t.celsius}`;
        }
        return `${celsiusToFahrenheit(temp)}${t.fahrenheit}`;
    };

    // ============================================================
    // レンダリング
    // ============================================================
    return (
        <main
            className="min-h-screen"
            style={{ backgroundColor: colors.bgDark, color: colors.text }}
        >
            {/* ヘッダー */}
            <header className="flex items-center justify-between p-4 max-w-6xl mx-auto">
                <Link
                    href="/"
                    className="text-sm opacity-60 hover:opacity-100 transition-opacity"
                >
                    {t.back}
                </Link>
                <div className="flex gap-2">
                    {/* 単位切替 */}
                    <div
                        className="flex rounded-full text-xs overflow-hidden"
                        style={{ border: `1px solid ${colors.primary}` }}
                    >
                        <button
                            onClick={() => setUseCelsius(true)}
                            className="px-3 py-1 transition-colors"
                            style={{
                                backgroundColor: useCelsius ? colors.primary : 'transparent',
                                color: useCelsius ? colors.bgDark : colors.text,
                            }}
                        >
                            {t.celsius}
                        </button>
                        <button
                            onClick={() => setUseCelsius(false)}
                            className="px-3 py-1 transition-colors"
                            style={{
                                backgroundColor: !useCelsius ? colors.secondary : 'transparent',
                                color: !useCelsius ? colors.bgDark : colors.text,
                            }}
                        >
                            {t.fahrenheit}
                        </button>
                    </div>
                    {/* 言語切替 */}
                    <button
                        onClick={() => setLang(lang === 'jp' ? 'en' : 'jp')}
                        className="px-3 py-1 text-sm border rounded-full hover:bg-white/10 transition-colors"
                        style={{ borderColor: colors.primary }}
                    >
                        {lang === 'jp' ? 'EN' : 'JP'}
                    </button>
                </div>
            </header>

            {/* タイトル */}
            <div className="text-center py-4">
                <h1
                    className="text-4xl md:text-5xl font-bold mb-2"
                    style={{ color: colors.primary }}
                >
                    ⛅ {t.title}
                </h1>
                <p className="text-lg opacity-60">{t.subtitle}</p>
                <p className="text-sm opacity-40 mt-1">
                    {cities.length} {t.citiesCount}
                </p>
            </div>

            {/* メインコンテンツ */}
            <div className="max-w-6xl mx-auto px-4">
                {/* 世界地図 */}
                <div
                    className="rounded-xl p-4 mb-6 relative overflow-hidden"
                    style={{ backgroundColor: colors.bgMap }}
                >
                    {/* 凡例 */}
                    <div className="flex justify-center gap-4 mb-4 text-xs">
                        <span style={{ color: '#0D47A1' }}>●≤-10°</span>
                        <span style={{ color: '#2196F3' }}>●0°</span>
                        <span style={{ color: '#4CAF50' }}>●20°</span>
                        <span style={{ color: '#FFC107' }}>●30°</span>
                        <span style={{ color: '#F44336' }}>●40°+</span>
                    </div>

                    <svg viewBox="0 0 600 320" className="w-full h-auto">
                        {/* グリッド */}
                        <defs>
                            <pattern
                                id="weatherGrid"
                                width="30"
                                height="30"
                                patternUnits="userSpaceOnUse"
                            >
                                <path
                                    d="M 30 0 L 0 0 0 30"
                                    fill="none"
                                    stroke={colors.muted}
                                    strokeWidth="0.3"
                                    opacity="0.3"
                                />
                            </pattern>
                        </defs>
                        <rect width="600" height="320" fill="url(#weatherGrid)" />

                        {/* 大陸の簡略パス */}
                        <path
                            d="M50,100 L150,80 L180,120 L160,170 L100,180 L40,150 Z"
                            fill={`${colors.primary}22`}
                            stroke={colors.primary}
                            strokeWidth="0.5"
                        />
                        <path
                            d="M100,190 L140,190 L160,240 L140,300 L100,310 L80,270 Z"
                            fill={`${colors.primary}22`}
                            stroke={colors.primary}
                            strokeWidth="0.5"
                        />
                        <path
                            d="M250,80 L320,60 L340,100 L330,150 L280,160 L240,130 Z"
                            fill={`${colors.primary}22`}
                            stroke={colors.primary}
                            strokeWidth="0.5"
                        />
                        <path
                            d="M250,170 L330,160 L360,220 L330,300 L270,310 L230,280 L240,210 Z"
                            fill={`${colors.primary}22`}
                            stroke={colors.primary}
                            strokeWidth="0.5"
                        />
                        <path
                            d="M340,80 L400,70 L420,120 L390,160 L330,150 Z"
                            fill={`${colors.primary}22`}
                            stroke={colors.primary}
                            strokeWidth="0.5"
                        />
                        <path
                            d="M400,60 L560,50 L580,140 L540,200 L440,220 L380,180 L390,110 Z"
                            fill={`${colors.primary}22`}
                            stroke={colors.primary}
                            strokeWidth="0.5"
                        />
                        <path
                            d="M500,230 L580,210 L590,270 L550,300 L490,280 Z"
                            fill={`${colors.primary}22`}
                            stroke={colors.primary}
                            strokeWidth="0.5"
                        />

                        {/* 都市ピン */}
                        {cities.map((city) => {
                            const pos = cityPositions[city.id];
                            const weather = weatherData[city.id];
                            const temp = weather?.temperature || 0;
                            const tempColor = getTemperatureColor(temp);
                            const isSelected = selectedCity === city.id;

                            return (
                                <g
                                    key={city.id}
                                    onClick={() => setSelectedCity(city.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {/* 温度円 */}
                                    <circle
                                        cx={pos.x}
                                        cy={pos.y}
                                        r={isSelected ? 18 : 14}
                                        fill={tempColor}
                                        opacity={isSelected ? 1 : 0.8}
                                        stroke={isSelected ? '#fff' : 'none'}
                                        strokeWidth={2}
                                        className="transition-all duration-200"
                                    />
                                    {/* 温度表示 */}
                                    <text
                                        x={pos.x}
                                        y={pos.y + 4}
                                        textAnchor="middle"
                                        fontSize={isSelected ? 10 : 8}
                                        fill="#fff"
                                        fontWeight="bold"
                                    >
                                        {isInitialLoad ? '...' : `${temp}°`}
                                    </text>
                                    {/* 都市名（選択時のみ） */}
                                    {isSelected && (
                                        <text
                                            x={pos.x}
                                            y={pos.y - 24}
                                            textAnchor="middle"
                                            fontSize={10}
                                            fill={colors.text}
                                        >
                                            {lang === 'jp' ? city.name.jp : city.name.en}
                                        </text>
                                    )}
                                </g>
                            );
                        })}
                    </svg>
                </div>

                <div className="grid lg:grid-cols-3 gap-4">
                    {/* 都市リスト */}
                    <div
                        className="rounded-xl p-4"
                        style={{ backgroundColor: colors.bgCard }}
                    >
                        {/* 検索バー */}
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder={t.search}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg text-sm"
                                style={{
                                    backgroundColor: colors.bgDark,
                                    border: `1px solid ${colors.primary}44`,
                                    color: colors.text,
                                }}
                            />
                        </div>

                        {/* 都市リスト */}
                        <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                            {filteredCities.map((city) => {
                                const weather = weatherData[city.id];
                                const temp = weather?.temperature || 0;
                                const weatherInfo =
                                    weatherCodes[weather?.weatherCode || 0] || defaultWeather;

                                return (
                                    <button
                                        key={city.id}
                                        onClick={() => setSelectedCity(city.id)}
                                        className="w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between"
                                        style={{
                                            backgroundColor:
                                                selectedCity === city.id
                                                    ? `${colors.primary}44`
                                                    : `${colors.primary}11`,
                                            border:
                                                selectedCity === city.id
                                                    ? `1px solid ${colors.primary}`
                                                    : '1px solid transparent',
                                        }}
                                    >
                                        <div>
                                            <span className="font-bold">
                                                {lang === 'jp' ? city.name.jp : city.name.en}
                                            </span>
                                            <span className="text-xs ml-2 opacity-60">
                                                {lang === 'jp' ? city.country.jp : city.country.en}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span>{weatherInfo.icon}</span>
                                            <span
                                                className="font-bold"
                                                style={{ color: getTemperatureColor(temp) }}
                                            >
                                                {isInitialLoad ? '...' : formatTemp(temp)}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* 詳細カード */}
                    <div
                        className="lg:col-span-2 rounded-xl p-6"
                        style={{ backgroundColor: colors.bgCard }}
                    >
                        {selectedCityData && selectedWeather ? (
                            <div>
                                {/* 都市名 */}
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            {lang === 'jp'
                                                ? selectedCityData.name.jp
                                                : selectedCityData.name.en}
                                        </h2>
                                        <p className="text-sm opacity-60">
                                            {lang === 'jp'
                                                ? selectedCityData.country.jp
                                                : selectedCityData.country.en}
                                        </p>
                                    </div>
                                    <button
                                        onClick={loadAllWeatherData}
                                        className="px-3 py-1 rounded-lg text-sm border hover:bg-white/10 transition-colors"
                                        style={{ borderColor: colors.muted }}
                                    >
                                        🔄 {t.refresh}
                                    </button>
                                </div>

                                {/* メイン温度 */}
                                <div className="flex items-center gap-6 mb-6">
                                    <div
                                        className="text-6xl font-bold"
                                        style={{
                                            color: getTemperatureColor(selectedWeather.temperature),
                                        }}
                                    >
                                        {formatTemp(selectedWeather.temperature)}
                                    </div>
                                    <div className="text-4xl">
                                        {(
                                            weatherCodes[selectedWeather.weatherCode] ||
                                            defaultWeather
                                        ).icon}
                                    </div>
                                    <div className="text-xl opacity-80">
                                        {lang === 'jp'
                                            ? (
                                                weatherCodes[selectedWeather.weatherCode] ||
                                                defaultWeather
                                            ).label.jp
                                            : (
                                                weatherCodes[selectedWeather.weatherCode] ||
                                                defaultWeather
                                            ).label.en}
                                    </div>
                                </div>

                                {/* 詳細データ */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div
                                        className="p-4 rounded-lg"
                                        style={{ backgroundColor: colors.bgDark }}
                                    >
                                        <p className="text-xs opacity-50 mb-1">💧 {t.humidity}</p>
                                        <p className="text-2xl font-bold">
                                            {selectedWeather.humidity}%
                                        </p>
                                    </div>
                                    <div
                                        className="p-4 rounded-lg"
                                        style={{ backgroundColor: colors.bgDark }}
                                    >
                                        <p className="text-xs opacity-50 mb-1">💨 {t.wind}</p>
                                        <p className="text-2xl font-bold">
                                            {selectedWeather.windSpeed} km/h
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center py-12 opacity-50">
                                <p className="text-6xl mb-4">🌍</p>
                                <p>{t.selectCity}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 広告エリア */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div
                    className="border-2 border-dashed rounded-lg px-4 py-8 text-center text-sm opacity-50"
                    style={{ borderColor: colors.primary }}
                >
                    📢 Ad Display Area / 広告表示欄 (728x90)
                </div>
            </div>

            {/* フッター */}
            <footer
                className="border-t py-6"
                style={{ borderColor: `${colors.primary}33` }}
            >
                <div className="max-w-6xl mx-auto px-4 text-center text-sm opacity-60">
                    <div className="flex justify-center gap-4 mb-2">
                        <Link href="#" className="hover:opacity-100 transition-opacity">
                            {t.privacy}
                        </Link>
                        <Link href="#" className="hover:opacity-100 transition-opacity">
                            {t.disclaimer}
                        </Link>
                    </div>
                    <p>{t.copyright}</p>
                </div>
            </footer>
        </main>
    );
}
