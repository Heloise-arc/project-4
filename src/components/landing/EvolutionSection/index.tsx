import React from 'react';
import { motion } from 'framer-motion';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../hooks/useTranslation';

// Import trading image using URL constructor
const tradingImage = new URL('../../../assets/images/trading-image.png', import.meta.url).href;

export const EvolutionSection: React.FC = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#4E9F3D' : '#1E5128'; // Green theme colors

  return (
    <section className="bg-background font-mono py-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <div className="flex flex-col items-center text-center mb-16">
          <motion.h2 
            className="text-5xl mb-6"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            {t('landing.sections.evolution.title')}
          </motion.h2>
          <motion.p 
            className="text-base text-primary/80 max-w-5xl leading-relaxed"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {t('landing.sections.evolution.subtitle')}
          </motion.p>
        </div>

        <motion.div
          className="relative w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            {/* Primary glow effect */}
            <div 
              className="absolute inset-0 rounded-xl"
              style={{ 
                background: `radial-gradient(ellipse at center, ${primaryColor}20 0%, transparent 70%)`,
                transform: 'translateY(16px) scale(1.1)',
                filter: 'blur(20px)',
                opacity: 0.6
              }} 
            />
            
            {/* Secondary glow effect */}
            <div 
              className="absolute inset-0 rounded-xl"
              style={{ 
                background: `radial-gradient(ellipse at center, ${primaryColor}15 0%, transparent 60%)`,
                transform: 'translateY(8px) scale(1.05)',
                filter: 'blur(15px)',
                opacity: 0.5
              }} 
            />
            
            {/* Bottom gradient */}
            <div 
              className="absolute inset-0 rounded-xl"
              style={{ 
                background: `linear-gradient(to bottom, transparent, ${primaryColor}10)`,
                transform: 'translateY(4px)',
                filter: 'blur(8px)',
                opacity: 0.7
              }} 
            />
            
            <motion.img
              src={tradingImage}
              alt="Trading Interface"
              className="w-full rounded-xl relative z-10"
              style={{
                boxShadow: `0 4px 20px -6px ${primaryColor}40`,
                border: `1px solid ${primaryColor}20`
              }}
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};