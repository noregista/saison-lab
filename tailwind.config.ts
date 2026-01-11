import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                emerald: {
                    DEFAULT: '#50C878',
                    dark: '#3da861',
                    light: '#7dd9a0',
                },
                background: {
                    primary: '#0d1117',
                    secondary: '#161b22',
                    tertiary: '#21262d',
                },
            },
            fontFamily: {
                sans: ['Outfit', 'Noto Sans JP', 'sans-serif'],
            },
        },
    },
    plugins: [],
};

export default config;
