import React from 'react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../store/themeStore';
import { motion } from 'framer-motion';
import { IMAGES } from '../../constants/images';
import { Moon, Sun, Globe } from 'lucide-react';
import { useLanguageStore } from '../../store/languageStore';
import { useTranslation } from '../../hooks/useTranslation';

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useThemeStore();
  const { language, setLanguage } = useLanguageStore();
  const { t } = useTranslation();
  const [isLangOpen, setIsLangOpen] = React.useState(false);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'zh', name: '中文' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' }
  ];

  const handleLanguageChange = (langCode: string) => {
    setLanguage(langCode);
    setIsLangOpen(false);
    // Update HTML lang attribute
    document.documentElement.lang = langCode;
    // Update language class
    document.documentElement.className = document.documentElement.className
      .replace(/lang-\w+/, '')
      .trim();
    document.documentElement.classList.add(`lang-${langCode}`);
  };

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsLangOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <motion.nav 
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center">
            <img 
              src={theme === 'dark' ? IMAGES.logos.textDark : IMAGES.logos.textLight}
              alt="Supurr"
              className="h-8 w-auto"
            />
          </Link>
          
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative language-selector">
              <motion.button
                className="p-2 rounded-lg hover:bg-primary/10 flex items-center gap-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLangOpen(!isLangOpen);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="w-5 h-5" />
                <span className="text-sm uppercase">{language}</span>
              </motion.button>

              {/* Language Dropdown */}
              {isLangOpen && (
                <motion.div
                  className="absolute right-0 mt-2 w-48 bg-background border border-primary/10 rounded-lg shadow-lg overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      className={`w-full px-4 py-2 text-left hover:bg-primary/10 text-sm ${
                        language === lang.code ? 'bg-primary/5' : ''
                      }`}
                      onClick={() => handleLanguageChange(lang.code)}
                    >
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Theme Toggle */}
            <motion.button
              className="p-2 rounded-lg hover:bg-primary/10"
              onClick={toggleTheme}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </motion.button>

            {/* Launch App Button */}
            <Link
              to="/trading"
              className="px-6 py-2 rounded-lg text-sm font-medium transition-colors bg-primary text-background hover:bg-primary/90"
            >
              {t('navigation.launchApp')}
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};