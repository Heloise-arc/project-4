import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useThemeStore } from '../../../store/themeStore';
import { useTranslation } from '../../../hooks/useTranslation';

// Import trading image using URL constructor
const tradingImage = new URL('../../../assets/images/trading-image.png', import.meta.url).href;

// Memoize static content
const ShadowPattern = React.memo(({ primaryColor }: { primaryColor: string }) => (
  <motion.div 
    className="absolute inset-0 -bottom-24"
    style={{
      backgroundImage: `radial-gradient(ellipse at center, ${primaryColor}15, transparent 70%)`,
      filter: 'blur(60px)',
      transform: 'translateY(20%) scale(1.2)',
      willChange: 'transform, opacity'
    }}
    animate={{
      scale: [1.2, 1.3, 1.2],
      opacity: [0.8, 0.6, 0.8],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
));

export const EvolutionSection: React.FC = () => {
  const { theme } = useThemeStore();
  const { t } = useTranslation();
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#4E9F3D' : '#1E5128';

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
          <ShadowPattern primaryColor={primaryColor} />
          
          <motion.img
            src={tradingImage}
            alt="Trading Interface"
            className="w-full rounded-xl relative z-10"
            style={{
              willChange: 'transform',
              filter: 'drop-shadow(0 20px 50px rgba(var(--primary), 0.4))',
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
        </motion.div>

        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link
            to="/trading"
            className="group relative overflow-hidden px-8 py-4 bg-primary text-background rounded-lg hover:scale-105 transition-transform"
          >
            <span className="relative flex items-center gap-2">
              Trade Now
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};