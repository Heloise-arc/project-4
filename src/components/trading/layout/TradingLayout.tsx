import React from 'react';
import { motion } from 'framer-motion';
import { TradingChart } from '../chart/TradingChart';
import { TradingPanel } from '../panel/TradingPanel';
import { ActivePositions } from '../positions/ActivePositions';
import { TradeHistory } from '../history/TradeHistory';
import { AssetSelector } from '../assets/AssetSelector';
import { useThemeStore } from '../../../store/themeStore';

export const TradingLayout: React.FC = () => {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const bgColor = isDark ? '#191A19' : '#D8E9A8';
  const primaryColor = isDark ? '#4E9F3D' : '#1E5128';

  return (
    <div 
      className="min-h-screen pt-20 px-4 text-primary font-mono relative overflow-hidden"
      style={{ background: bgColor }}
    >
      <div className="max-w-7xl mx-auto space-y-4 relative z-10">
        <AssetSelector />
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-3">
            <TradingChart />
          </div>
          <div>
            <TradingPanel />
          </div>
        </div>
        <ActivePositions />
        <TradeHistory />
      </div>

      {/* Animated Shadow Pattern */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-[300px] pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 0%, ${primaryColor}15, transparent 70%)`,
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 0.6, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Moving Patterns */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bottom-0 left-0 right-0 h-[200px] pointer-events-none"
          style={{
            background: `linear-gradient(${45 + (i * 30)}deg, ${primaryColor}05 25%, transparent 25%, transparent 50%, ${primaryColor}05 50%, ${primaryColor}05 75%, transparent 75%, transparent)`,
            backgroundSize: `${40 + (i * 20)}px ${40 + (i * 20)}px`,
            opacity: 0.3 - (i * 0.1),
            maskImage: 'linear-gradient(to top, black, transparent)',
            WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
          }}
          animate={{
            x: [(i + 1) * 40, 0, (i + 1) * 40],
            y: [0, (i + 1) * 20, 0],
          }}
          transition={{
            duration: 10 + (i * 2),
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};