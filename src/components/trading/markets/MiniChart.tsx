import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';

interface MiniChartProps {
  symbol: string;
  change: number;
  primaryColor: string;
  height?: number;
  interactive?: boolean;
}

export const MiniChart: React.FC<MiniChartProps> = ({ 
  symbol, 
  change, 
  primaryColor,
  height = 60,
  interactive = true
}) => {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Determine colors based on price change
    const isPositive = change >= 0;
    const lineColor = isPositive ? '#22c55e' : '#ef4444'; // Green for up, red for down
    const areaColor = isPositive ? '#22c55e33' : '#ef444433'; // Semi-transparent area

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height,
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: 'transparent',
        fontFamily: 'Geist Mono'
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false }
      },
      rightPriceScale: { visible: false },
      timeScale: { visible: false },
      crosshair: { visible: false },
      handleScroll: interactive,
      handleScale: interactive
    });

    const series = chart.addAreaSeries({
      lineColor: lineColor,
      topColor: areaColor,
      bottomColor: 'transparent',
      lineWidth: 1.5,
      priceLineVisible: false,
      lastValueVisible: false,
      crosshairMarkerVisible: false,
      autoscaleInfoVisible: false
    });

    // Generate sample data
    const basePrice = {
      'BTC/USD': 71250,
      'ETH/USD': 3892,
      'SOL/USD': 146
    }[symbol] || 100;

    const data = [];
    const now = Math.floor(Date.now() / 1000);
    const trend = change >= 0 ? 1 : -1;
    const points = 288; // 24h * 12 (5-minute intervals)

    for (let i = 0; i < points; i++) {
      const time = now - (points - i) * 300; // 5-minute intervals
      const noise = Math.random() * (basePrice * 0.0005); // Reduced noise
      const trendComponent = (i / points) * (basePrice * change / 100) * trend;
      const value = basePrice + trendComponent + noise;

      data.push({ time, value });
    }

    series.setData(data);

    const handleResize = () => {
      if (chartRef.current) {
        chart.applyOptions({
          width: chartRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [symbol, change, height, interactive]);

  return (
    <div 
      ref={chartRef} 
      className="chart-container"
      style={{ 
        position: 'relative',
        background: 'transparent',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    />
  );
};