import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { useThemeStore } from '../../../../store/themeStore';
import { AnimationPhase } from './useTradeAnimation';

interface Props {
  phase: AnimationPhase;
}

export const MiniChart: React.FC<Props> = ({ phase }) => {
  const chartRef = useRef<HTMLDivElement>(null);
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const primaryColor = isDark ? '#4E9F3D' : '#1E5128';

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth,
      height: chartRef.current.clientHeight,
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: primaryColor,
        fontFamily: 'Geist Mono'
      },
      grid: {
        vertLines: { visible: false },
        horzLines: { visible: false }
      },
      rightPriceScale: { visible: false },
      timeScale: { visible: false },
      crosshair: { visible: false },
      handleScroll: false,
      handleScale: false
    });

    const series = chart.addAreaSeries({
      lineColor: primaryColor,
      topColor: `${primaryColor}33`,
      bottomColor: 'transparent',
      lineWidth: 2,
      priceLineVisible: false
    });

    // Generate sample data
    const data = [];
    const now = Math.floor(Date.now() / 1000);
    for (let i = 0; i < 100; i++) {
      data.push({
        time: now - (100 - i) * 60,
        value: 99000 + Math.sin(i / 10) * 1000 + Math.random() * 200
      });
    }

    series.setData(data);

    const handleResize = () => {
      if (chartRef.current) {
        chart.applyOptions({
          width: chartRef.current.clientWidth,
          height: chartRef.current.clientHeight
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [theme, primaryColor]);

  return (
    <div 
      ref={chartRef} 
      className="w-full h-full"
      style={{ background: 'transparent' }}
    />
  );
};