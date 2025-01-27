import React, { useEffect, useRef } from 'react';
import { createChart, IChartApi, DeepPartial, ChartOptions } from 'lightweight-charts';
import { useTradingStore } from '../../../store/tradingStore';
import { useChartData } from '../../../hooks/useChartData';
import { useThemeStore } from '../../../store/themeStore';

export const TradingChart: React.FC = () => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const { selectedAsset, timeFrame } = useTradingStore();
  const { theme } = useThemeStore();
  const { data, loading, error } = useChartData(selectedAsset, timeFrame);

  useEffect(() => {
    if (!chartContainerRef.current) return;

    const chartOptions: DeepPartial<ChartOptions> = {
      layout: {
        background: { type: 'solid', color: 'transparent' },
        textColor: theme === 'dark' ? '#D9D9D9' : '#1E5128',
        fontSize: 12,
        fontFamily: 'Geist Mono'
      },
      grid: {
        vertLines: { color: theme === 'dark' ? '#1a1a1a' : '#e5e5e5', style: 2 },
        horzLines: { color: theme === 'dark' ? '#1a1a1a' : '#e5e5e5', style: 2 }
      },
      crosshair: {
        mode: 1,
        vertLine: {
          width: 1,
          color: theme === 'dark' ? '#4E9F3D' : '#1E5128',
          style: 2,
          labelBackgroundColor: theme === 'dark' ? '#000000' : '#ffffff'
        },
        horzLine: {
          width: 1,
          color: theme === 'dark' ? '#4E9F3D' : '#1E5128',
          style: 2,
          labelBackgroundColor: theme === 'dark' ? '#000000' : '#ffffff'
        }
      },
      timeScale: {
        borderColor: theme === 'dark' ? '#1a1a1a' : '#e5e5e5',
        timeVisible: true,
        secondsVisible: false,
        borderVisible: true,
        fixLeftEdge: true,
        fixRightEdge: true
      },
      rightPriceScale: {
        borderColor: theme === 'dark' ? '#1a1a1a' : '#e5e5e5',
        borderVisible: true,
        scaleMargins: {
          top: 0.1, // Reduced from 0.2 to show more price range
          bottom: 0.1
        },
        autoScale: true
      },
      handleScale: {
        mouseWheel: true,
        pinch: true,
        axisPressedMouseMove: {
          time: true,
          price: true
        }
      },
      handleScroll: {
        mouseWheel: true,
        pressedMouseMove: true,
        horzTouchDrag: true,
        vertTouchDrag: true
      }
    };

    chartRef.current = createChart(chartContainerRef.current, {
      ...chartOptions,
      width: chartContainerRef.current.clientWidth,
      height: 600,
    });

    const candlestickSeries = chartRef.current.addCandlestickSeries({
      upColor: theme === 'dark' ? '#26a69a' : '#22c55e',
      downColor: theme === 'dark' ? '#ef5350' : '#ef4444',
      borderVisible: false,
      wickUpColor: theme === 'dark' ? '#26a69a' : '#22c55e',
      wickDownColor: theme === 'dark' ? '#ef5350' : '#ef4444',
      priceFormat: {
        type: 'price',
        precision: 2,
        minMove: 0.01
      },
      // Enhanced candlestick appearance
      wickVisible: true,
      borderUpColor: theme === 'dark' ? '#26a69a' : '#22c55e',
      borderDownColor: theme === 'dark' ? '#ef5350' : '#ef4444',
      priceLineVisible: false,
      lastValueVisible: true
    });

    // Add volume series with proper scaling
    const volumeSeries = chartRef.current.addHistogramSeries({
      color: theme === 'dark' ? '#4E9F3D40' : '#1E512840',
      priceFormat: {
        type: 'volume',
        precision: 0
      },
      priceScaleId: '', // Set to empty to overlay
      scaleMargins: {
        top: 0.8, // Position volumes at the bottom
        bottom: 0
      }
    });

    if (data.length > 0) {
      // Calculate proper volume scaling
      const maxVolume = Math.max(...data.map(d => d.volume || 0));
      const volumeMultiplier = maxVolume > 0 ? 1 / maxVolume : 1;

      candlestickSeries.setData(data);
      volumeSeries.setData(data.map(d => ({
        time: d.time,
        value: (d.volume || 0) * volumeMultiplier,
        color: d.close >= d.open 
          ? (theme === 'dark' ? '#26a69a40' : '#22c55e40')
          : (theme === 'dark' ? '#ef535040' : '#ef444440')
      })));

      // Set visible range to show last 100 candles by default
      chartRef.current.timeScale().setVisibleRange({
        from: data[Math.max(0, data.length - 100)].time,
        to: data[data.length - 1].time
      });
    }

    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
      }
    };
  }, [data, theme]);

  if (loading) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-background/50 rounded-lg">
        <div className="text-primary/60">Loading chart data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[600px] flex items-center justify-center bg-background/50 rounded-lg">
        <div className="text-red-500/60">Error loading chart: {error}</div>
      </div>
    );
  }

  return (
    <div className="rounded-lg bg-background/50">
      <div className="mb-4 p-4">
        <h2 className="text-xl font-bold">{selectedAsset}</h2>
      </div>
      <div 
        ref={chartContainerRef} 
        className="h-[600px]"
      />
    </div>
  );
};