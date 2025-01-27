import { PriceFeed } from '../../types/trading';

export class PriceWebSocket {
  private connections = new Map<string, WebSocket>();
  private listeners = new Set<(feed: PriceFeed) => void>();
  private reconnectAttempts = new Map<string, number>();
  private readonly MAX_RECONNECT_ATTEMPTS = 5;
  private readonly RECONNECT_DELAY = 2000;

  initialize(symbol: string): void {
    if (this.connections.has(symbol)) return;

    const formattedSymbol = this.formatSymbol(symbol);
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${formattedSymbol}@trade`);
    this.setupHandlers(ws, symbol);
    this.connections.set(symbol, ws);
  }

  private setupHandlers(ws: WebSocket, symbol: string): void {
    ws.onopen = () => {
      console.log(`WebSocket connected for ${symbol}`);
      this.reconnectAttempts.set(symbol, 0);
    };

    ws.onmessage = (event) => this.handleMessage(event, symbol);
    
    ws.onerror = (error) => {
      console.error(`WebSocket error for ${symbol}:`, error);
      this.handleReconnect(symbol);
    };

    ws.onclose = () => {
      console.log(`WebSocket closed for ${symbol}`);
      this.handleReconnect(symbol);
    };
  }

  private handleMessage(event: MessageEvent, symbol: string): void {
    try {
      const data = JSON.parse(event.data);
      if (data.e === 'trade') {
        const feed: PriceFeed = {
          symbol,
          price: parseFloat(data.p),
          timestamp: data.T
        };
        this.notifyListeners(feed);
      }
    } catch (error) {
      console.error('WebSocket message error:', error);
    }
  }

  private handleReconnect(symbol: string): void {
    const attempts = this.reconnectAttempts.get(symbol) || 0;
    if (attempts < this.MAX_RECONNECT_ATTEMPTS) {
      setTimeout(() => {
        console.log(`Attempting to reconnect ${symbol} (${attempts + 1}/${this.MAX_RECONNECT_ATTEMPTS})`);
        this.reconnectAttempts.set(symbol, attempts + 1);
        this.initialize(symbol);
      }, this.RECONNECT_DELAY);
    }
  }

  private formatSymbol(symbol: string): string {
    return symbol.toLowerCase().replace('/', '').replace('usd', 'usdt');
  }

  subscribe(callback: (feed: PriceFeed) => void): () => void {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback);
  }

  private notifyListeners(feed: PriceFeed): void {
    this.listeners.forEach(listener => listener(feed));
  }

  cleanup(): void {
    this.connections.forEach((ws) => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close();
      }
    });
    this.connections.clear();
    this.listeners.clear();
    this.reconnectAttempts.clear();
  }
}