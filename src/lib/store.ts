import { create } from 'zustand';

type Theme = 'day' | 'night';
type Language = 'jp' | 'en';

interface NeoStore {
    theme: Theme;
    language: Language;
    timeString: string;
    mouse: { x: number; y: number };

    setTheme: (theme: Theme) => void;
    toggleTheme: () => void;
    setLanguage: (lang: Language) => void;
    toggleLanguage: () => void;
    setTimeString: (time: string) => void;
    setMouse: (x: number, y: number) => void;
}

export const useNeoStore = create<NeoStore>((set) => ({
    theme: 'night', // Default to night/cyberpunk
    language: 'jp',
    timeString: '00:00:00',
    mouse: { x: 0, y: 0 },

    setTheme: (theme) => set({ theme }),
    toggleTheme: () => set((state) => ({ theme: state.theme === 'day' ? 'night' : 'day' })),
    setLanguage: (lang) => set({ language: lang }),
    toggleLanguage: () => set((state) => ({ language: state.language === 'jp' ? 'en' : 'jp' })),
    setTimeString: (time) => set({ timeString: time }),
    setMouse: (x, y) => set({ mouse: { x, y } }),
}));
