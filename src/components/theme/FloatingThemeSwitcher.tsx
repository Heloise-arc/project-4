import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../store/themeStore';

export const FloatingThemeSwitcher: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();

  return (
    <motion.button
      className="fixed bottom-8 right-8 p-4 rounded-full bg-primary text-background shadow-lg hover:scale-110 transition-transform"
      onClick={toggleTheme}
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ rotate: 180 }}
      transition={{ duration: 0.3 }}
    >
      {theme === 'dark' ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </motion.button>
  );
};