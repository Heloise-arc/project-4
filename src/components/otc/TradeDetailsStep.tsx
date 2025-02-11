import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
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

    setIsProcessing(true);
    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      onComplete(numAmount);
    }, 2000);
  };

  if (isProcessing) {
    return <LoadingState message="Processing your trade..." />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <button 
        onClick={onBack}
        className="flex items-center text-[#4E9F3D]/80 hover:text-[#4E9F3D] transition-colors font-mono"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </button>

      <div className="text-center mb-8">
        <h2 className="text-2xl font-mono font-semibold text-[#4E9F3D] mb-2">Enter Trade Amount</h2>
        <p className="text-[#4E9F3D]/80 font-mono">
          Specify the amount of USDC you want to trade (max 15,000 USDC)
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <label className="block text-[#4E9F3D]/80 font-mono">Amount (USDC)</label>
            <Tooltip content="Enter the amount of USDC you want to spend. Maximum 15,000 USDC." />
          </div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                setError('');
              }}
              className="w-full p-4 rounded-lg bg-[#191A19] border border-[#4E9F3D]/20 text-[#4E9F3D] font-mono focus:outline-none focus:border-[#4E9F3D]/50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              placeholder="Enter USDC amount..."
              max="15000"
              step="any"
            />
            <button
              onClick={() => setAmount("15000")}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 text-sm bg-[#4E9F3D]/10 hover:bg-[#4E9F3D]/20 text-[#4E9F3D] rounded font-mono transition-colors"
            >
              MAX
            </button>
          </div>
          {error && <p className="mt-2 text-red-500 font-mono">{error}</p>}
        </div>

        <div className="text-[#4E9F3D]/60 text-sm font-mono">
          <div className="flex items-center gap-1">
            <span>Expected token amount:</span>
            <Tooltip content="You will receive 10 $SPR tokens for every 1 USDC spent." />
          </div>
          <p className="text-[#4E9F3D] mt-1">
            {amount ? `${(Number(amount) * 10).toLocaleString()} $SPR` : '0 $SPR'}
          </p>
        </div>

        <button
          type="submit"
          className="w-full p-4 rounded-lg bg-[#4E9F3D] text-[#191A19] font-mono font-medium hover:bg-[#4E9F3D]/90 transition-colors"
        >
          Continue
        </button>
      </form>

      {/* Important Note Section */}
      <div className="mt-8 p-4 bg-black/50 rounded-lg border border-[#4E9F3D]/20">
        <h5 className="text-[#4E9F3D] font-mono font-medium mb-2">Important Note:</h5>
        <ul className="list-disc list-inside space-y-2 text-[#4E9F3D]/80 font-mono text-sm">
          <li>Tokens will be automatically deposited to the same wallet address used to participate in the sale—no manual claims are required.</li>
          <li>If your Hyperliquid account is not set up, token delivery may be delayed.</li>
          <li>Please ensure the wallet you use for the OTC purchase is eligible to trade on Hyperliquid Spot.</li>
        </ul>
      </div>

      <OTCInfoBox />
    </motion.div>
  );
}; 