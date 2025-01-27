import { translations } from '../translations';

// Create a type that represents all possible translation paths
export type TranslationKeys = keyof typeof translations.en;
export type NestedKeyOf<T> = T extends object 
  ? { [K in keyof T]: K extends string 
    ? T[K] extends object
      ? `${K}.${NestedKeyOf<T[K]>}`
      : K
    : never
  }[keyof T]
  : never;

export type TranslationPath = NestedKeyOf<typeof translations.en>;

// Development-only translation checker
export const validateTranslationKey = (key: string): boolean => {
  if (process.env.NODE_ENV !== 'production') {
    const keys = key.split('.');
    let value: any = translations.en;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        console.error(`Invalid translation key: ${key}`);
        return false;
      }
    }
  }
  return true;
};