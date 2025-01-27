import React from 'react';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../hooks/useTranslation';

export const TypewriterHeader: React.FC = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const primaryColor = theme === 'dark' ? '#4E9F3D' : '#1E5128';
  
  return (
    <h2 className="text-5xl">
      <span 
        className="font-mono tracking-tight"
        style={{ color: primaryColor }}
      >
        {t('landing.sections.features.title')}
      </span>
    </h2>
  );
};