import { WebSocketManager } from './WebSocketManager';
import { KlineInterval, SubscriptionType, BinanceStreamMessage } from '../../types/binance';

export class BinanceWebSocket {
  private wsManager: WebSocketManager;
  private subscriptions: Map<string, Set<(data: any) => void>>;

  constructor() {
    this.wsManager = new WebSocketManager('wss://stream.binance.com:9443/ws');
    this.subscriptions = new Map();

    this.wsManager.setMessageHandler((message) => {
      this.handleMessage(message);
    });
  }

  subscribeToKlines(symbol: string, interval: KlineInterval, callback: (data: any) => void): () => void {
    const streamName = `${symbol.toLowerCase()}@kline_${interval}`;
    
    if (!this.subscriptions.has(streamName)) {
      this.subscriptions.set(streamName, new Set());
      this.wsManager.subscribe({
        method: 'SUBSCRIBE',
        params: [streamName],
        id: Date.now()
      });
    }

    const callbacks = this.subscriptions.get(streamName);
    callbacks?.add(callback);
    
    return () => {
      const subs = this.subscriptions.get(streamName);
      if (subs) {
        subs.delete(callback);
        
        if (subs.size === 0) {
          this.wsManager.unsubscribe({
            method: 'UNSUBSCRIBE',
            params: [streamName],
            id: Date.now()
          });
          this.subscriptions.delete(streamName);
        }
      }
    };
  }

  private handleMessage(message: BinanceStreamMessage): void {
    // Handle subscription confirmation
    if ('result' in message && message.id) {
      return;
    }

    // Handle stream data
    if ('stream' in message) {
      const callbacks = this.subscriptions.get(message.stream);
      if (callbacks) {
        callbacks.forEach(callback => callback(message));
      }
    }
  }

  cleanup(): void {
    this.wsManager.close();
    this.subscriptions.clear();
  }
}