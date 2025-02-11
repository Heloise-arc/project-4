import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Info, Loader } from 'lucide-react';
import { LoadingState } from './LoadingState';
import { Tooltip } from './Tooltip';
import { OTCInfoBox } from './OTCInfoBox';

interface TradeDetailsStepProps {
  onComplete: (amount: number) => void;
  onBack: () => void;
}

export const TradeDetailsStep: React.FC<TradeDetailsStepProps> = ({ onComplete, onBack }) => {
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const numAmount = Number(amount);
    
    if (numAmount > 15000) {
      setError('Maximum amount is 15,000 USDC');
      return;
    }

    if (numAmount <= 0) {
      setError('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsLoading(false);
      setIsProcessing(true);
      onComplete(numAmount);
    }, 2000);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-primary font-mono">Processing your trade...</p>
        </div>
      </div>
    );
  }

  if (isProcessing) {
    return <LoadingState message="Processing your trade..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center text-primary font-mono mb-8">
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </div>

      <div className="text-center">
        <h2 className="text-2xl font-mono text-primary mb-4">Enter Trade Amount</h2>
        <p className="text-primary font-mono mb-8">
          Specify the amount of USDC you want to trade (max 15,000 USDC)
        </p>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-2">
          <label className="block text-primary font-mono">Amount (USDC)</label>
          <Info className="w-4 h-4 text-primary" />
        </div>
        <div className="relative">
          <input
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            className="w-full p-4 rounded-lg bg-background border-primary border text-primary/50 font-mono focus:outline-none focus:border-primary placeholder:text-primary/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            placeholder="Enter USDC amount..."
            max="15000"
            step="any"
          />
          <button
            onClick={() => setAmount("15000")}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm text-primary font-mono"
          >
            MAX
          </button>
        </div>
        {error && <p className="mt-2 text-red-500 font-mono">{error}</p>}
      </div>

      <div className="text-primary font-mono">
        <div className="flex items-center gap-1">
          <span>Expected token amount:</span>
          <Info className="w-4 h-4 text-primary" />
        </div>
        <p className="text-primary mt-1">
          {amount ? `${(Number(amount) * 10).toLocaleString()} $SPR` : '0 $SPR'}
        </p>
      </div>

      <div className="flex justify-between gap-4">
        <button
          onClick={onBack}
          className="px-6 py-3 rounded-lg bg-background border-primary border text-primary font-mono"
        >
          Back
        </button>
        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-lg bg-background border-primary border text-primary font-mono"
        >
          Continue
        </button>
      </div>

      <div className="bg-background rounded-lg p-4 border border-primary">
        <h3 className="text-primary font-mono mb-2">Important Note:</h3>
        <ul className="space-y-2 text-primary font-mono">
          <li>• Tokens will be automatically deposited to the same wallet address used to participate in the sale—no manual claims are required.</li>
          <li>• If your Hyperliquid account is not set up, token delivery may be delayed.</li>
          <li>• Please ensure the wallet you use for the OTC purchase is eligible to trade on Hyperliquid Spot.</li>
        </ul>
      </div>

      <OTCInfoBox />
    </motion.div>
  );
}; 