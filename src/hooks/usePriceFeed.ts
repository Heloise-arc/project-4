import { useEffect, useCallback, useRef } from 'react';
import { PriceWebSocket } from '../services/websocket/PriceWebSocket';
import { useTradingStore } from '../store/tradingStore';
import { PriceFeed } from '../types/trading';

// Singleton instance
const priceWebSocket = new PriceWebSocket();

export function usePriceFeed() {
  const { selectedAsset, setCurrentPrice } = useTradingStore();
  const lastPriceRef = useRef<number | null>(null);

  const handlePriceUpdate = useCallback((feed: PriceFeed) => {
    // Debounce price updates to prevent excessive re-renders
    if (lastPriceRef.current === feed.price) return;
    lastPriceRef.current = feed.price;
    setCurrentPrice(feed.price);
  }, [setCurrentPrice]);

  useEffect(() => {
    priceWebSocket.initialize(selectedAsset);
    const unsubscribe = priceWebSocket.subscribe(handlePriceUpdate);

    return () => {
      unsubscribe();
    };
  }, [selectedAsset, handlePriceUpdate]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      priceWebSocket.cleanup();
    };
  }, []);
}