import React from 'react';
import { useTradingStore } from '../../../store/tradingStore';
import { TimeFrame } from '../../../types/trading';

export const TimeframeSelector: React.FC = () => {
  const { timeFrame, setTimeFrame } = useTradingStore();
  const timeframes: TimeFrame[] = ['1m', '5m', '15m', '1h', '4h', '24h'];

  return (
    <div className="flex gap-2">
      {timeframes.map((tf) => (
        <button
          key={tf}
          onClick={() => setTimeFrame(tf)}
          className={`px-3 py-1 rounded ${
            timeFrame === tf ? 'bg-[#4E9F3D] text-white' : 'bg-white/5'
          }`}
        >
          {tf}
        </button>
      ))}
    </div>
  );
};