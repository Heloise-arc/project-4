import React from 'react';
import { useTradingStore } from '../../../store/tradingStore';
import { Position } from '../../../types/trading';
import { calculatePnL, formatTimeRemaining } from '../../../utils/trading';

export const ActivePositions: React.FC = () => {
  const { positions, currentPrice } = useTradingStore();
  const activePositions = positions.filter(p => p.status === 'active');

  return (
    <div className="bg-[#1A1B1B] rounded-lg p-4 border border-white/10">
      <h2 className="text-xl font-bold mb-4">Active Positions</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm opacity-70">
              <th className="pb-2">Asset</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Amount</th>
              <th className="pb-2">Entry Price</th>
              <th className="pb-2">Time Left</th>
              <th className="pb-2">P&L</th>
              <th className="pb-2"></th>
            </tr>
          </thead>
          <tbody>
            {activePositions.map((position) => (
              <PositionRow 
                key={position.id} 
                position={position}
                currentPrice={currentPrice}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};