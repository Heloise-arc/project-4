import React from 'react';
import { motion } from 'framer-motion';
import { TradingChart } from './chart/TradingChart';
import { TradingPanel } from './panel/TradingPanel';
import { MarketInfo } from './market/MarketInfo';
import { TradingStats } from './stats/TradingStats';
import { useTradeAnimation } from './hooks/useTradeAnimation';

export const TradingInterface: React.FC = () => {
  const { phase } = useTradeAnimation();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
      <div className="lg:col-span-3 space-y-4">
        <MarketInfo />
        <motion.div
          className="relative rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <TradingChart />
          {/* Overlay during trade execution */}
          <motion.div
            className="absolute inset-0 bg-background/50 backdrop-blur-sm flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === 'executing' ? 1 : 0 }}
            style={{ pointerEvents: phase === 'executing' ? 'auto' : 'none' }}
          >
            <div className="text-primary text-xl font-bold">Executing Trade...</div>
          </motion.div>
        </motion.div>
        <TradingStats />
      </div>
      <div className="lg:col-span-1">
        <TradingPanel />
      </div>
    </div>
  );
};