// ============================================================
// 都市データ定義
// 世界15都市の座標と基本情報
// ============================================================

export interface City {
    id: string;
    name: { jp: string; en: string };
    lat: number;
    lon: number;
    timezone: string;
    country: { jp: string; en: string };
}

export const cities: City[] = [
    {
        id: 'tokyo',
        name: { jp: '東京', en: 'Tokyo' },
        lat: 35.68,
        lon: 139.77,
        timezone: 'Asia/Tokyo',
        country: { jp: '日本', en: 'Japan' },
    },
    {
        id: 'newyork',
        name: { jp: 'ニューヨーク', en: 'New York' },
        lat: 40.71,
        lon: -74.01,
        timezone: 'America/New_York',
        country: { jp: 'アメリカ', en: 'USA' },
    },
    {
        id: 'london',
        name: { jp: 'ロンドン', en: 'London' },
        lat: 51.51,
        lon: -0.13,
        timezone: 'Europe/London',
        country: { jp: 'イギリス', en: 'UK' },
    },
    {
        id: 'paris',
        name: { jp: 'パリ', en: 'Paris' },
        lat: 48.86,
        lon: 2.35,
        timezone: 'Europe/Paris',
        country: { jp: 'フランス', en: 'France' },
    },
    {
        id: 'sydney',
        name: { jp: 'シドニー', en: 'Sydney' },
        lat: -33.87,
        lon: 151.21,
        timezone: 'Australia/Sydney',
        country: { jp: 'オーストラリア', en: 'Australia' },
    },
    {
        id: 'beijing',
        name: { jp: '北京', en: 'Beijing' },
        lat: 39.91,
        lon: 116.40,
        timezone: 'Asia/Shanghai',
        country: { jp: '中国', en: 'China' },
    },
    {
        id: 'dubai',
        name: { jp: 'ドバイ', en: 'Dubai' },
        lat: 25.20,
        lon: 55.27,
        timezone: 'Asia/Dubai',
        country: { jp: 'UAE', en: 'UAE' },
    },
    {
        id: 'singapore',
        name: { jp: 'シンガポール', en: 'Singapore' },
        lat: 1.29,
        lon: 103.85,
        timezone: 'Asia/Singapore',
        country: { jp: 'シンガポール', en: 'Singapore' },
    },
    {
        id: 'losangeles',
        name: { jp: 'ロサンゼルス', en: 'Los Angeles' },
        lat: 34.05,
        lon: -118.24,
        timezone: 'America/Los_Angeles',
        country: { jp: 'アメリカ', en: 'USA' },
    },
    {
        id: 'moscow',
        name: { jp: 'モスクワ', en: 'Moscow' },
        lat: 55.76,
        lon: 37.62,
        timezone: 'Europe/Moscow',
        country: { jp: 'ロシア', en: 'Russia' },
    },
    {
        id: 'saopaulo',
        name: { jp: 'サンパウロ', en: 'São Paulo' },
        lat: -23.55,
        lon: -46.63,
        timezone: 'America/Sao_Paulo',
        country: { jp: 'ブラジル', en: 'Brazil' },
    },
    {
        id: 'cairo',
        name: { jp: 'カイロ', en: 'Cairo' },
        lat: 30.04,
        lon: 31.24,
        timezone: 'Africa/Cairo',
        country: { jp: 'エジプト', en: 'Egypt' },
    },
    {
        id: 'mumbai',
        name: { jp: 'ムンバイ', en: 'Mumbai' },
        lat: 19.08,
        lon: 72.88,
        timezone: 'Asia/Kolkata',
        country: { jp: 'インド', en: 'India' },
    },
    {
        id: 'seoul',
        name: { jp: 'ソウル', en: 'Seoul' },
        lat: 37.57,
        lon: 126.98,
        timezone: 'Asia/Seoul',
        country: { jp: '韓国', en: 'South Korea' },
    },
    {
        id: 'mexicocity',
        name: { jp: 'メキシコシティ', en: 'Mexico City' },
        lat: 19.43,
        lon: -99.13,
        timezone: 'America/Mexico_City',
        country: { jp: 'メキシコ', en: 'Mexico' },
    },
];

// ============================================================
// 天気コードからアイコン・説明への変換
// Open-Meteo WMO Weather Codes
// ============================================================
export interface WeatherInfo {
    icon: string;
    label: { jp: string; en: string };
}

export const weatherCodes: Record<number, WeatherInfo> = {
    0: { icon: '☀️', label: { jp: '快晴', en: 'Clear' } },
    1: { icon: '🌤️', label: { jp: '晴れ', en: 'Mostly Clear' } },
    2: { icon: '⛅', label: { jp: '一部曇り', en: 'Partly Cloudy' } },
    3: { icon: '☁️', label: { jp: '曇り', en: 'Overcast' } },
    45: { icon: '🌫️', label: { jp: '霧', en: 'Fog' } },
    48: { icon: '🌫️', label: { jp: '霧氷', en: 'Rime Fog' } },
    51: { icon: '🌧️', label: { jp: '霧雨（弱）', en: 'Light Drizzle' } },
    53: { icon: '🌧️', label: { jp: '霧雨', en: 'Drizzle' } },
    55: { icon: '🌧️', label: { jp: '霧雨（強）', en: 'Dense Drizzle' } },
    61: { icon: '🌧️', label: { jp: '小雨', en: 'Slight Rain' } },
    63: { icon: '🌧️', label: { jp: '雨', en: 'Rain' } },
    65: { icon: '🌧️', label: { jp: '大雨', en: 'Heavy Rain' } },
    71: { icon: '🌨️', label: { jp: '小雪', en: 'Slight Snow' } },
    73: { icon: '🌨️', label: { jp: '雪', en: 'Snow' } },
    75: { icon: '🌨️', label: { jp: '大雪', en: 'Heavy Snow' } },
    80: { icon: '🌧️', label: { jp: 'にわか雨', en: 'Rain Showers' } },
    81: { icon: '🌧️', label: { jp: 'にわか雨（強）', en: 'Heavy Showers' } },
    82: { icon: '⛈️', label: { jp: '激しいにわか雨', en: 'Violent Showers' } },
    95: { icon: '⛈️', label: { jp: '雷雨', en: 'Thunderstorm' } },
    96: { icon: '⛈️', label: { jp: '雷雨（雹）', en: 'Thunderstorm with Hail' } },
    99: { icon: '⛈️', label: { jp: '激しい雷雨', en: 'Severe Thunderstorm' } },
};

// デフォルトの天気情報
export const defaultWeather: WeatherInfo = {
    icon: '❓',
    label: { jp: '不明', en: 'Unknown' },
};

// ============================================================
// 気温に応じた色を取得
// ヒートマップ用カラーパレット
// ============================================================
export const getTemperatureColor = (temp: number): string => {
    if (temp <= -10) return '#0D47A1'; // 濃い青
    if (temp <= 0) return '#2196F3';   // 青
    if (temp <= 10) return '#4FC3F7';  // 水色
    if (temp <= 20) return '#4CAF50';  // 緑
    if (temp <= 30) return '#FFC107';  // 黄
    if (temp <= 40) return '#FF9800';  // オレンジ
    return '#F44336';                  // 赤
};

// ============================================================
// 摂氏から華氏への変換
// ============================================================
export const celsiusToFahrenheit = (celsius: number): number => {
    return Math.round((celsius * 9) / 5 + 32);
};

// ============================================================
// Open-Meteo API からデータ取得
// ============================================================
export interface WeatherData {
    cityId: string;
    temperature: number;
    weatherCode: number;
    humidity: number;
    windSpeed: number;
    isLoading: boolean;
    error: string | null;
}

export const fetchWeatherData = async (
    lat: number,
    lon: number
): Promise<{ temperature: number; weatherCode: number; humidity: number; windSpeed: number }> => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,relative_humidity_2m,wind_speed_10m`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch weather data');
    }

    const data = await response.json();
    return {
        temperature: Math.round(data.current.temperature_2m),
        weatherCode: data.current.weather_code,
        humidity: data.current.relative_humidity_2m,
        windSpeed: Math.round(data.current.wind_speed_10m),
    };
};
