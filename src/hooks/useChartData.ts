import { useState, useEffect, useCallback } from 'react';
import { BinanceWebSocket } from '../services/binance/BinanceWebSocket';
import { KlineInterval } from '../types/binance';
import { formatCandlestickData } from '../utils/chart';

const binanceWs = new BinanceWebSocket();

export function useChartData(symbol: string, interval: KlineInterval) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const formattedSymbol = symbol.replace('/', '').replace('USD', 'USDT');

  const handleKlineUpdate = useCallback((message: any) => {
    if (message.data?.k) {
      const candlestick = formatCandlestickData(message.data.k);
      setData(prev => {
        const newData = [...prev];
        const index = newData.findIndex(candle => candle.time === candlestick.time);
        
        if (index !== -1) {
          newData[index] = candlestick;
        } else {
          newData.push(candlestick);
        }
        
        return newData.sort((a, b) => a.time - b.time);
      });
    }
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Fetch initial historical data
    fetch(`https://api.binance.com/api/v3/klines?symbol=${formattedSymbol}&interval=${interval}&limit=1000`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          const formattedData = data.map(kline => ({
            time: Math.floor(kline[0] / 1000),
            open: parseFloat(kline[1]),
            high: parseFloat(kline[2]),
            low: parseFloat(kline[3]),
            close: parseFloat(kline[4]),
            volume: parseFloat(kline[5])
          }));
          setData(formattedData);
        } else {
          throw new Error('Invalid data format received from Binance API');
        }
      })
      .catch(error => {
        console.error('Error fetching historical data:', error);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });

    // Subscribe to real-time updates
    const unsubscribe = binanceWs.subscribeToKlines(formattedSymbol, interval, handleKlineUpdate);

    return () => {
      unsubscribe();
    };
  }, [formattedSymbol, interval, handleKlineUpdate]);

  return { data, loading, error };
}