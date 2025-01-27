import React, { createContext, useContext } from 'react';
import { useLanguageStore } from '../store/languageStore';
import { translations } from '../translations';
import type { Language } from '../translations';

type TranslationContextType = {
  t: (key: string) => string;
  language: Language;
  setLanguage: (lang: Language) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage } = useLanguageStore();

  const t = (key: string): string => {
    try {
      const keys = key.split('.');
      let value: any = translations[language as Language] || translations.en;
      
      for (const k of keys) {
        value = value[k];
      }

      return value || key;
    } catch (error) {
      console.error('Translation error:', error);
      return key;
    }
  };

  return (
    <TranslationContext.Provider value={{ t, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}; 