import React from 'react';
import { motion } from 'framer-motion';
import { GearAnimation } from './GearAnimation';
import { useTranslation } from '../../../hooks/useTranslation';

export const CapitalSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-background font-mono py-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <motion.h2 
              className="text-5xl font-mono"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              {t('landing.sections.capital.title')}
            </motion.h2>
            <motion.p 
              className="text-xl text-primary/80 font-mono"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {t('landing.sections.capital.subtitle')}
            </motion.p>
          </div>
          <GearAnimation />
        </div>
      </div>
    </section>
  );
};