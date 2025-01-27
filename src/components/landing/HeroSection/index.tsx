import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';

export const HeroSection: React.FC = () => {
  const { t, language } = useTranslation();
  const isCJK = ['zh', 'ja', 'ko'].includes(language);
  
  return (
    <div className="text-center">
      <motion.h1 
        className="whitespace-nowrap text-[clamp(1.5rem,5vw,5rem)] font-bold mb-6 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {t('landing.hero.title')}
      </motion.h1>
      <motion.p 
        className="text-lg md:text-xl max-w-3xl mx-auto text-primary/80 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {t('landing.hero.subtitle')}
      </motion.p>
    </div>
  );
};