import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Star, ChevronDown } from 'lucide-react';
import { useTradingStore } from '../../../store/tradingStore';
import { Asset } from '../../../types/trading';

export const MarketSelector: React.FC = () => {
  const { selectedAsset, setSelectedAsset, tradeType } = useTradingStore();
  const [isOpen, setIsOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [favorites, setFavorites] = React.useState<Asset[]>([]);

  const markets: Asset[] = tradeType === 'UP_DOWN' 
    ? ['BTC/USD', 'ETH/USD']
    : ['BTC/USD', 'ETH/USD', 'SOL/USD'];

  const filteredMarkets = markets.filter(market => 
    market.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavorite = (asset: Asset) => {
    setFavorites(prev => 
      prev.includes(asset)
        ? prev.filter(a => a !== asset)
        : [...prev, asset]
    );
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 hover:bg-primary/20 transition-colors"
      >
        <span>{selectedAsset}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Dropdown */}
            <motion.div
              className="absolute top-full left-0 mt-2 w-64 bg-background border border-primary/10 rounded-lg shadow-lg z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {/* Search */}
              <div className="p-3 border-b border-primary/10">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary/60" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search markets..."
                    className="w-full pl-9 pr-3 py-2 bg-primary/5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/30"
                  />
                </div>
              </div>

              {/* Favorites */}
              {favorites.length > 0 && (
                <div className="p-2 border-b border-primary/10">
                  <div className="text-xs text-primary/60 px-2 mb-1">Favorites</div>
                  {favorites.map((asset) => (
                    <MarketOption
                      key={asset}
                      asset={asset}
                      isSelected={asset === selectedAsset}
                      isFavorite={true}
                      onSelect={() => {
                        setSelectedAsset(asset);
                        setIsOpen(false);
                      }}
                      onToggleFavorite={() => toggleFavorite(asset)}
                    />
                  ))}
                </div>
              )}

              {/* All Markets */}
              <div className="p-2 max-h-[300px] overflow-y-auto">
                <div className="text-xs text-primary/60 px-2 mb-1">All Markets</div>
                {filteredMarkets.map((asset) => (
                  <MarketOption
                    key={asset}
                    asset={asset}
                    isSelected={asset === selectedAsset}
                    isFavorite={favorites.includes(asset)}
                    onSelect={() => {
                      setSelectedAsset(asset);
                      setIsOpen(false);
                    }}
                    onToggleFavorite={() => toggleFavorite(asset)}
                  />
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

interface MarketOptionProps {
  asset: Asset;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: () => void;
  onToggleFavorite: () => void;
}

const MarketOption: React.FC<MarketOptionProps> = ({
  asset,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite
}) => (
  <div
    className={`flex items-center justify-between px-2 py-1.5 rounded cursor-pointer ${
      isSelected ? 'bg-primary/10' : 'hover:bg-primary/5'
    }`}
    onClick={onSelect}
  >
    <span>{asset}</span>
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggleFavorite();
      }}
      className="p-1 rounded hover:bg-primary/10"
    >
      <Star className={`w-4 h-4 ${isFavorite ? 'fill-primary text-primary' : 'text-primary/60'}`} />
    </button>
  </div>
);