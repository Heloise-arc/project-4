import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Check } from 'lucide-react';
import { Confetti } from './Confetti';

interface ConfirmationStepProps {
  tradeAmount: number;
}

export const ConfirmationStep: React.FC<ConfirmationStepProps> = ({ tradeAmount }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    // Trigger confetti after a small delay
    const timer = setTimeout(() => {
      setShowConfetti(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const tokenAmount = tradeAmount * 10; // 0.1 USDC per token

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  };

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="w-16 h-16 rounded-full bg-background border border-primary flex items-center justify-center"
            >
              <Check className="w-8 h-8 text-primary" />
            </motion.div>
          </div>
          
          <h2 className="text-2xl font-mono text-primary mb-2">Trade Confirmed</h2>
          <p className="text-primary font-mono">Your trade has been confirmed and is being processed</p>
        </div>

        <div className="p-6 rounded-lg bg-background border-primary/20 border space-y-4">
          <div>
            <h3 className="text-primary/80 font-mono mb-1">Amount Paid</h3>
            <p className="text-primary font-mono text-lg font-medium">
              {tradeAmount} USDC
            </p>
          </div>
          
          <div>
            <h3 className="text-primary/80 font-mono mb-1">Tokens to Receive</h3>
            <p className="text-primary font-mono text-lg font-medium">
              {tokenAmount.toLocaleString()} $SPR
            </p>
          </div>
          
          <div>
            <h3 className="text-primary/80 font-mono mb-1">Token Price</h3>
            <p className="text-primary font-mono text-lg font-medium">
              0.1 USDC
            </p>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-primary font-mono">Tokens will be automatically sent to your wallet</p>
          <p className="text-primary/60 font-mono">Please make sure your Hyperliquid account is set up</p>
        </div>
      </div>
    </>
  );
};