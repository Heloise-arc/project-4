import React from 'react';
import { LineChart } from 'lucide-react';

const indicators = [
  { id: 'ma', name: 'Moving Average' },
  { id: 'rsi', name: 'RSI' },
  { id: 'macd', name: 'MACD' },
];

export const IndicatorSelector: React.FC = () => {
  const [activeIndicators, setActiveIndicators] = React.useState<string[]>([]);

  const toggleIndicator = (id: string) => {
    setActiveIndicators(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="relative">
      <button className="p-2 bg-white/5 rounded hover:bg-white/10">
        <LineChart className="w-4 h-4" />
      </button>
      <div className="absolute right-0 mt-2 w-48 py-2 bg-[#1A1B1B] rounded-lg shadow-xl border border-white/10">
        {indicators.map(indicator => (
          <button
            key={indicator.id}
            onClick={() => toggleIndicator(indicator.id)}
            className={`w-full px-4 py-2 text-left hover:bg-white/5 ${
              activeIndicators.includes(indicator.id) ? 'text-[#4E9F3D]' : ''
            }`}
          >
            {indicator.name}
          </button>
        ))}
      </div>
    </div>
  );
};