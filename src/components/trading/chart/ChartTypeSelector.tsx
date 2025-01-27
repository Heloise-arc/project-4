import React from 'react';
import { BarChart, CandlestickChart } from 'lucide-react';

export const ChartTypeSelector: React.FC = () => {
  const [chartType, setChartType] = React.useState<'candlestick' | 'line'>('candlestick');

  return (
    <div className="flex gap-2">
      <button
        onClick={() => setChartType('candlestick')}
        className={`p-2 rounded ${
          chartType === 'candlestick' ? 'bg-[#4E9F3D] text-white' : 'bg-white/5'
        }`}
      >
        <CandlestickChart className="w-4 h-4" />
      </button>
      <button
        onClick={() => setChartType('line')}
        className={`p-2 rounded ${
          chartType === 'line' ? 'bg-[#4E9F3D] text-white' : 'bg-white/5'
        }`}
      >
        <BarChart className="w-4 h-4" />
      </button>
    </div>
  );
};