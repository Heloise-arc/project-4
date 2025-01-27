import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../../hooks/useTranslation';

export const AssetsHeader: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="space-y-6">
      <motion.h2 
        className="text-5xl font-mono"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        {t('landing.sections.assets.title')}
      </motion.h2>
      <motion.p 
        className="text-xl text-primary/80 font-mono"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        {t('landing.sections.assets.subtitle')}
      </motion.p>
    </div>
  );
};