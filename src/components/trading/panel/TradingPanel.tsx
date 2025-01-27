import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Info } from 'lucide-react';
import { useTradingStore } from '../../../store/tradingStore';
import { DurationSelector } from './DurationSelector';
import { PayoutCalculator } from './PayoutCalculator';
import { useTradeAnimation } from '../hooks/useTradeAnimation';

export const TradingPanel: React.FC = () => {
  const { 
    tradeType,
    setTradeType,
    amount,
    setAmount,
    currentPrice 
  } = useTradingStore();
  const { phase, startTradeAnimation } = useTradeAnimation();

  const handleTrade = async () => {
    if (phase !== 'idle' || !amount) return;
    await startTradeAnimation();
  };

  return (
    <motion.div
      className="bg-background/80 backdrop-blur-sm border border-primary/10 rounded-lg p-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Trade Type Selector */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTradeType('UP_DOWN')}
          className={`flex-1 py-2 rounded-lg transition-colors ${
            tradeType === 'UP_DOWN'
              ? 'bg-primary text-background'
              : 'bg-primary/10 hover:bg-primary/20'
          }`}
        >
          Up/Down
        </button>
        <button
          onClick={() => setTradeType('ABOVE_BELOW')}
          className={`flex-1 py-2 rounded-lg transition-colors ${
            tradeType === 'ABOVE_BELOW'
              ? 'bg-primary text-background'
              : 'bg-primary/10 hover:bg-primary/20'
          }`}
        >
          Above/Below
        </button>
      </div>

      {/* Amount Input */}
      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm mb-2">Amount (USD)</label>
          <div className="relative">
            <input
              type="number"
              value={amount || ''}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full p-3 rounded-lg bg-primary/5 border border-primary/10 focus:border-primary/30 transition-colors"
              placeholder="0.00"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-2">
              <button 
                className="px-2 py-1 text-xs rounded bg-primary/10 hover:bg-primary/20"
                onClick={() => setAmount((prev) => (prev || 0) + 10)}
              >
                +10
              </button>
              <button 
                className="px-2 py-1 text-xs rounded bg-primary/10 hover:bg-primary/20"
                onClick={() => setAmount((prev) => (prev || 0) + 100)}
              >
                +100
              </button>
            </div>
          </div>
        </div>

        <DurationSelector />

        {currentPrice && (
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <div className="text-sm opacity-70 mb-1">Current Price</div>
            <div className="text-xl font-bold">${currentPrice.toFixed(2)}</div>
          </div>
        )}

        <PayoutCalculator />
      </div>

      {/* Trade Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleTrade}
          disabled={phase !== 'idle' || !amount}
          className="flex items-center justify-center gap-2 py-3 rounded-lg bg-green-500 text-white font-medium hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowUp className="w-4 h-4" />
          UP
        </button>
        <button
          onClick={handleTrade}
          disabled={phase !== 'idle' || !amount}
          className="flex items-center justify-center gap-2 py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowDown className="w-4 h-4" />
          DOWN
        </button>
      </div>

      {/* Info Text */}
      <div className="mt-4 p-3 rounded-lg bg-primary/5 flex items-start gap-2 text-sm">
        <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <p className="opacity-70">
          Trade with confidence: defined max loss, no liquidations, and up to 90% returns.
        </p>
      </div>
    </motion.div>
  );
};