import { create } from 'zustand';
import { Theme } from '../types/theme';

interface ThemeStore {
  theme: Theme;
  initializeTheme: () => void;
  toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: 'dark', // Set default theme to dark
  
  initializeTheme: () => set((state) => {
    // Only check localStorage and system preference if we want to override the default dark theme
    const savedTheme = localStorage.getItem('theme') as Theme;
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
      return { theme: savedTheme };
    }
    
    // Otherwise keep the default dark theme
    document.documentElement.setAttribute('data-theme', 'dark');
    return { theme: 'dark' };
  }),
  
  toggleTheme: () => set((state) => {
    const newTheme = state.theme === 'dark' ? 'light' : 'dark';
    localStorage.setItem('theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    return { theme: newTheme };
  }),
}));