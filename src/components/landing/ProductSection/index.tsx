import React from 'react';
import { motion } from 'framer-motion';
import Masonry from 'react-masonry-css';
import { FeatureCard } from './FeatureCard';
import { useTranslation } from '../../../hooks/useTranslation';
import './masonry.css';

const breakpointCols = {
  default: 3,
  1440: 3,
  1024: 2,
  640: 1
};

export const ProductSection: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      id: 'up-down',
      title: t('landing.sections.products.upDown.title'),
      status: "LIVE" as const,
      description: t('landing.sections.products.upDown.description')
    },
    {
      id: 'above-below',
      title: t('landing.sections.products.aboveBelow.title'),
      status: "LIVE" as const,
      description: t('landing.sections.products.aboveBelow.description')
    },
    {
      id: 'vanillas',
      title: t('landing.sections.products.vanillas.title'),
      status: "COMING SOON" as const,
      description: t('landing.sections.products.vanillas.description')
    },
    {
      id: 'leverage',
      title: t('landing.sections.products.leverage.title'),
      status: "COMING SOON" as const,
      description: t('landing.sections.products.leverage.description')
    },
    {
      id: 'strategy',
      title: t('landing.sections.products.strategy.title'),
      status: "COMING SOON" as const,
      description: t('landing.sections.products.strategy.description')
    },
    {
      id: 'vaults',
      title: t('landing.sections.products.vaults.title'),
      status: "COMING SOON" as const,
      description: t('landing.sections.products.vaults.description')
    },
    {
      id: 'portfolio',
      title: t('landing.sections.products.portfolio.title'),
      status: "COMING SOON" as const,
      description: t('landing.sections.products.portfolio.description')
    },
    {
      id: 'pro',
      title: t('landing.sections.products.pro.title'),
      status: "COMING SOON" as const,
      description: t('landing.sections.products.pro.description')
    },
    {
      id: 'social',
      title: t('landing.sections.products.social.title'),
      status: "COMING SOON" as const,
      description: t('landing.sections.products.social.description')
    }
  ];

  return (
    <section className="bg-background font-mono py-16">
      <div className="max-w-[1440px] mx-auto px-6">
        <motion.h2 
          className="text-5xl mb-16 text-primary text-center"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t('landing.sections.products.title')}
        </motion.h2>

        <Masonry
          breakpointCols={breakpointCols}
          className="masonry-grid"
          columnClassName="masonry-grid_column"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <FeatureCard feature={feature} />
            </motion.div>
          ))}
        </Masonry>
      </div>
    </section>
  );
};