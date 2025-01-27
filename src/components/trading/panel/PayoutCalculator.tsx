import React, { useMemo } from 'react';
import { useTradingStore } from '../../../store/tradingStore';

export const PayoutCalculator: React.FC = () => {
  const { amount } = useTradingStore();
  
  const potentialPayout = useMemo(() => {
    return amount * 1.8; // 80% return
  }, [amount]);

  return (
    <div className="p-4 rounded-lg bg-white/5 border border-white/10">
      <div className="text-sm opacity-70 mb-1">Potential Payout</div>
      <div className="text-xl font-bold">${potentialPayout.toFixed(2)}</div>
      <div className="text-sm text-[#4E9F3D]">+80% Return</div>
    </div>
  );
};