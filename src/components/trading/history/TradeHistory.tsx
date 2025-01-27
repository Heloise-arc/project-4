import React from 'react';
import { useTradingStore } from '../../../store/tradingStore';
import { calculateWinRate } from '../../../utils/trading';

export const TradeHistory: React.FC = () => {
  const { positions } = useTradingStore();
  const closedPositions = positions.filter(p => p.status !== 'active');
  const stats = calculateWinRate(closedPositions);

  return (
    <div className="bg-[#1A1B1B] rounded-lg p-4 border border-white/10">
      <h2 className="text-xl font-bold mb-4">Trade History</h2>
      
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 rounded-lg bg-white/5">
          <div className="text-sm opacity-70">Win Rate</div>
          <div className="text-xl font-bold">{stats.winRate}%</div>
        </div>
        <div className="p-4 rounded-lg bg-white/5">
          <div className="text-sm opacity-70">Total Trades</div>
          <div className="text-xl font-bold">{stats.total}</div>
        </div>
        <div className="p-4 rounded-lg bg-white/5">
          <div className="text-sm opacity-70">Net P/L</div>
          <div className="text-xl font-bold">${stats.netPnL.toFixed(2)}</div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm opacity-70">
              <th className="pb-2">Asset</th>
              <th className="pb-2">Type</th>
              <th className="pb-2">Result</th>
              <th className="pb-2">P/L</th>
            </tr>
          </thead>
          <tbody>
            {closedPositions.map((position) => (
              <tr key={position.id} className="border-t border-white/10">
                <td className="py-3">{position.asset}</td>
                <td className="py-3">{position.type}</td>
                <td className="py-3">
                  <span className={position.status === 'won' ? 'text-green-500' : 'text-red-500'}>
                    {position.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3">
                  ${(position.status === 'won' ? position.payout - position.amount : -position.amount).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};