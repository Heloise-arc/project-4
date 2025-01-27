import { useState, useEffect } from 'react';
import { Market } from '../types/trading';
import { MARKETS } from '../constants/markets';

export function useMarketData() {
  const [markets, setMarkets] = useState<Market[]>(MARKETS);

  useEffect(() => {
    const ws = new WebSocket('wss://stream.binance.com:9443/ws');
    
    // Format symbols for Binance (e.g., BTC/USD -> btcusdt)
    const symbols = MARKETS.map(m => 
      m.symbol.toLowerCase().replace('/', '').replace('usd', 'usdt')
    );

    ws.onopen = () => {
      ws.send(JSON.stringify({
        method: 'SUBSCRIBE',
        params: symbols.map(s => `${s}@ticker`),
        id: 1
      }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === '24hrTicker') {
        setMarkets(prev => prev.map(market => {
          const symbol = market.symbol.toLowerCase().replace('/', '').replace('usd', 'usdt');
          if (symbol === data.s.toLowerCase()) {
            return {
              ...market,
              price: parseFloat(data.c),
              change: parseFloat(data.P),
              openInterest: parseFloat(data.q) * parseFloat(data.c) // Calculate OI from quote volume
            };
          }
          return market;
        }));
      }
    };

    return () => ws.close();
  }, []);

  // Sort markets to show UP_DOWN markets first
  return markets.sort((a, b) => {
    // If both have UP_DOWN or both don't, maintain original order
    if (a.tradingTypes.includes('UP_DOWN') === b.tradingTypes.includes('UP_DOWN')) {
      return 0;
    }
    // Show UP_DOWN markets first
    return a.tradingTypes.includes('UP_DOWN') ? -1 : 1;
  });
}