import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, Check, AlertCircle } from 'lucide-react';
import { ethers } from 'ethers';
import { OTCTrade } from '../../contracts/OTCTrade';

interface WalletConnectStepProps {
  onComplete: (signature: string, address: string, transactionHash: string) => void;
  onBack: () => void;
  tradeAmount: number;
}

// Add contract address to environment variables
const OTC_CONTRACT_ADDRESS = import.meta.env.VITE_OTC_CONTRACT_ADDRESS;

export const WalletConnectStep: React.FC<WalletConnectStepProps> = ({ 
  onComplete, 
  onBack,
  tradeAmount 
}) => {
  const [address, setAddress] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSigning, setIsSigning] = useState(false);
  const [isExecuting, setIsExecuting] = useState(false);

  const connectWallet = async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('Please install MetaMask to continue');
      return;
    }

    setIsConnecting(true);
    setError('');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      setAddress(accounts[0]);
    } catch (err) {
      setError('Failed to connect wallet');
      console.error(err);
    } finally {
      setIsConnecting(false);
    }
  };

  const executeTradeOnContract = async (signature: string, message: string) => {
    if (!address) return;
    
    setIsExecuting(true);
    setError('');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const otcContract = new OTCTrade(OTC_CONTRACT_ADDRESS, signer);
      
      const nonce = Math.floor(Math.random() * 1000000);
      const tx = await otcContract.executeTrade(
        tradeAmount,
        nonce,
        signature,
        message
      );

      // Wait for transaction confirmation
      const receipt = await tx.wait();
      onComplete(signature, address, receipt.transactionHash);
    } catch (err) {
      setError('Failed to execute trade on contract');
      console.error(err);
    } finally {
      setIsExecuting(false);
    }
  };

  const signMessage = async () => {
    if (!address) return;
    
    setIsSigning(true);
    setError('');

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const nonce = Math.floor(Math.random() * 1000000);
      const timestamp = new Date().toISOString();
      
      const message = `OTC Trade Request:
        User: ${address}
        Amount: ${tradeAmount} SUPURR
        Nonce: ${nonce}
        Timestamp: ${timestamp}`;

      const signature = await signer.signMessage(message);
      await executeTradeOnContract(signature, message);
    } catch (err) {
      setError('Failed to sign message');
      console.error(err);
    } finally {
      setIsSigning(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl font-semibold mb-2">Connect Your Wallet</h2>
        <p className="text-gray-600 dark:text-gray-400">
          Connect your wallet and sign the trade request
        </p>
      </div>

      <div className="space-y-4">
        {!address ? (
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="w-full flex items-center justify-center py-3 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white transition-colors disabled:opacity-50"
          >
            <Wallet className="w-5 h-5 mr-2" />
            {isConnecting ? 'Connecting...' : 'Connect MetaMask'}
          </button>
        ) : (
          <div className="p-4 rounded-lg border border-green-500 bg-green-50 dark:bg-green-900/20">
            <div className="flex items-center">
              <Check className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700 dark:text-green-300">Wallet Connected</span>
            </div>
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {address.slice(0, 6)}...{address.slice(-4)}
            </div>
          </div>
        )}

        {error && (
          <div className="flex items-center text-red-500 text-sm">
            <AlertCircle className="h-4 w-4 mr-1" />
            {error}
          </div>
        )}

        <div className="flex items-center space-x-4 mt-6">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Back
          </button>
          <button
            onClick={signMessage}
            disabled={!address || isSigning}
            className="flex-1 py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 disabled:opacity-50"
          >
            {isSigning ? 'Signing...' : 'Sign Request'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}; 