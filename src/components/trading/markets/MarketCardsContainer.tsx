import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { MarketCard } from './MarketCard';
import { useMarketScroll } from './useMarketScroll';
import { MARKET_CARD_CONFIG } from './types';
import { useThemeStore } from '../../../store/themeStore';
import { useMarketData } from '../../../hooks/useMarketData';

export const MarketCardsContainer: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();
  const markets = useMarketData();

  const scrollConfig = {
    width: MARKET_CARD_CONFIG.width,
    gap: MARKET_CARD_CONFIG.gap,
    totalCards: markets.length * 2,
    speed: 50
  };

  useMarketScroll(scrollRef, scrollConfig);

  return (
    <div className="relative h-[360px]">
      <motion.div 
        ref={containerRef}
        className="absolute inset-0 flex items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        }}
      >
        <div
          ref={scrollRef}
          className="absolute left-0 flex items-center"
          style={{ 
            gap: MARKET_CARD_CONFIG.gap,
            paddingLeft: '10%',
            paddingRight: '10%',
            willChange: 'transform',
            transform: 'translate3d(0,0,0)',
            backfaceVisibility: 'hidden'
          }}
        >
          {[...markets, ...markets].map((market, index) => (
            <motion.div
              key={`market-${index}`}
              className="shrink-0"
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              <MarketCard market={market} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};