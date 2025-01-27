import { BinanceKline } from '../types/binance';

export function formatCandlestickData(kline: BinanceKline) {
  return {
    time: Math.floor(kline.t / 1000), // Convert to seconds for TradingView
    open: parseFloat(kline.o),
    high: parseFloat(kline.h),
    low: parseFloat(kline.l),
    close: parseFloat(kline.c),
    volume: parseFloat(kline.v)
  };
}