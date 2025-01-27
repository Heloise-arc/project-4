import React from 'react';
import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';
import { AboveBelowAnimation } from './AboveBelowAnimation';
import { UpDownAnimation } from './UpDownAnimation';
import { VanillaAnimation } from './VanillaAnimation';
import { LeverageAnimation } from './LeverageAnimation';
import { StrategyAnimation } from './StrategyAnimation';
import { PlantAnimation } from './PlantAnimation';
import { PortfolioAnimation } from './PortfolioAnimation';
import { SupurrProAnimation } from './SupurrProAnimation';
import { SocialAnimation } from './SocialAnimation';

interface Feature {
  title: string;
  status: 'LIVE' | 'COMING SOON';
  description: string;
  id: string;
}

interface FeatureCardProps {
  feature: Feature;
}

const AnimationComponents: Record<string, React.FC> = {
  'up-down': UpDownAnimation,
  'above-below': AboveBelowAnimation,
  'vanillas': VanillaAnimation,
  'leverage': LeverageAnimation,
  'strategy': StrategyAnimation,
  'vaults': PlantAnimation,
  'portfolio': PortfolioAnimation,
  'pro': SupurrProAnimation,
  'social': SocialAnimation,
};

export const FeatureCard: React.FC<FeatureCardProps> = ({ feature }) => {
  const AnimationComponent = AnimationComponents[feature.id];

  return (
    <motion.div 
      className="relative border border-primary/20 rounded-lg p-6 backdrop-blur-sm w-full"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center gap-3 mb-4">
        {AnimationComponent ? (
          <AnimationComponent />
        ) : (
          <Circle className="w-8 h-8 text-primary/20 flex-shrink-0" />
        )}
        <div>
          <h3 className="text-lg font-mono">{feature.title}</h3>
          <motion.div
            className={`
              inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium
              ${feature.status === 'LIVE' 
                ? 'bg-primary/10 text-primary' 
                : 'bg-primary/5 text-primary/60'
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {feature.status === 'LIVE' && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary mr-1.5 animate-pulse" />
            )}
            {feature.status}
          </motion.div>
        </div>
      </div>
      <p className="text-sm text-primary/60 font-mono leading-relaxed">
        {feature.description}
      </p>
    </motion.div>
  );
};