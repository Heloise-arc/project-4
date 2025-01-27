import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { MiniChart } from './MiniChart';
import { AnimationPhase } from './useTradeAnimation';

interface Props {
  phase: AnimationPhase;
}

export const TradingUI: React.FC<Props> = ({ phase }) => {
  const isClicking = phase === 'clicking';
  const shouldFade = phase === 'speedCursor' || phase === 'success';

  return (
    <AnimatePresence>
      <motion.div 
        className="w-full h-full flex flex-col"
        animate={{ 
          opacity: shouldFade ? 0.3 : 1,
          filter: shouldFade ? 'blur(2px)' : 'blur(0px)'
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Chart Section */}
        <div className="flex-1 bg-primary/5 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <div className="text-sm opacity-70">BTC/USD</div>
            <div className="text-xl font-bold">$99,051.45</div>
          </div>
          <div className="h-[calc(100%-2rem)]">
            <MiniChart phase={phase} />
          </div>
        </div>
        
        {/* Trading Buttons */}
        <div className="h-16 grid grid-cols-2 gap-4">
          <motion.button
            className="trade-button flex items-center justify-center gap-2 bg-green-500 text-white rounded-lg relative"
            animate={{
              scale: isClicking ? 0.95 : 1,
              backgroundColor: isClicking ? '#22c55e' : '#22c55e',
            }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUp className="w-5 h-5" />
            UP
            {isClicking && (
              <motion.div
                className="absolute inset-0 bg-white rounded-lg"
                initial={{ opacity: 0.3 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
          
          <button className="flex items-center justify-center gap-2 bg-red-500 text-white rounded-lg">
            <ArrowDown className="w-5 h-5" />
            DOWN
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};