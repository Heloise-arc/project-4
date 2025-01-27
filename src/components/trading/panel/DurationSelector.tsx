import React from 'react';
import { useTradingStore } from '../../../store/tradingStore';

const durations = [
  { value: 60, label: '1m' },
  { value: 300, label: '5m' },
  { value: 900, label: '15m' },
  { value: 3600, label: '1h' }
];

export const DurationSelector: React.FC = () => {
  const { duration, setDuration } = useTradingStore();

  return (
    <div className="grid grid-cols-4 gap-2">
      {durations.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => setDuration(value)}
          className={`py-2 rounded ${
            duration === value
              ? 'bg-[#4E9F3D] text-white'
              : 'bg-white/5 hover:bg-white/10'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
};