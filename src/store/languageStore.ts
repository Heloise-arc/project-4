import { create } from 'zustand';
import { Language } from '../translations';

interface LanguageStore {
  language: Language;
  setLanguage: (lang: Language) => void;
}

export const useLanguageStore = create<LanguageStore>((set) => ({
  language: 'en',
  setLanguage: (lang) => {
    localStorage.setItem('language', lang);
    set({ language: lang });
  },
}));

// Initialize language from localStorage
const savedLanguage = localStorage.getItem('language') as Language;
if (savedLanguage && ['en', 'ja', 'ko', 'zh'].includes(savedLanguage)) {
  useLanguageStore.getState().setLanguage(savedLanguage);
}