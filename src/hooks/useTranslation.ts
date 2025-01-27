import { useEffect } from 'react';
import { useLanguageStore } from '../store/languageStore';
import { translations, Language } from '../translations';
import { TranslationPath } from '../types/translations';

export function useTranslation() {
  const { language, setLanguage } = useLanguageStore();
  
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = ['ar', 'he', 'fa'].includes(language) ? 'rtl' : 'ltr';
    
    const prevLangClass = document.documentElement.className.match(/lang-\w+/)?.[0];
    if (prevLangClass) {
      document.documentElement.classList.remove(prevLangClass);
    }
    document.documentElement.classList.add(`lang-${language}`);
  }, [language]);
  
  const t = (key: TranslationPath): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language as Language] || translations.en;
      let fallback = false;
      
      // Try current language first
      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          fallback = true;
          break;
        }
      }

      // If not found, fallback to English
      if (fallback) {
        value = translations.en;
        for (const k of keys) {
          if (value && typeof value === 'object' && k in value) {
            value = value[k];
          } else {
            console.error(`Translation missing: ${key}`);
            return key;
          }
        }
      }

      if (typeof value !== 'string') {
        console.error(`Invalid translation type: ${key} - expected string, got ${typeof value}`);
        return key;
      }

      return value;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  return { t, language };
}