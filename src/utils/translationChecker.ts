import { translations } from '../translations';
import { TranslationPath } from '../types/translations';

export const checkTranslations = () => {
  if (process.env.NODE_ENV !== 'production') {
    const checkKeys = (obj: any, path: string[] = []): void => {
      Object.entries(obj).forEach(([key, value]) => {
        const currentPath = [...path, key];
        if (typeof value === 'object' && value !== null) {
          checkKeys(value, currentPath);
        } else {
          const fullPath = currentPath.join('.') as TranslationPath;
          // Check if key exists in all languages
          Object.keys(translations).forEach(lang => {
            let current = translations[lang as keyof typeof translations];
            let missing = false;
            for (const k of currentPath) {
              if (current && typeof current === 'object' && k in current) {
                current = current[k as keyof typeof current];
              } else {
                missing = true;
                console.error(`🚨 Missing translation: ${fullPath} (${lang})`);
                break;
              }
            }
            if (!missing && typeof current !== 'string') {
              console.error(`🚨 Invalid translation type: ${fullPath} (${lang}) - expected string, got ${typeof current}`);
            }
          });
        }
      });
    };

    console.log('🔍 Checking translations...');
    checkKeys(translations.en);
    console.log('✅ Translation check complete');
  }
};