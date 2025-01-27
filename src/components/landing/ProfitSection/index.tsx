import React from 'react';
import { motion } from 'framer-motion';
import SwingAnimation from './SwingAnimation';
import { useTranslation } from '../../../hooks/useTranslation';

export const ProfitSection: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="bg-background font-mono py-32 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.h2 className="text-5xl font-mono">
              {t('landing.sections.profit.title')}
            </motion.h2>
            <motion.p className="text-xl text-primary/80 font-mono">
              {t('landing.sections.profit.subtitle')}
            </motion.p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <SwingAnimation />
          </motion.div>
        </div>
      </div>
    </section>
  );
};