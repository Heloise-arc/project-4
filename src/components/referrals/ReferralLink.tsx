import React from 'react';
import { motion } from 'framer-motion';
import { Link, Copy } from 'lucide-react';

export const ReferralLink: React.FC = () => {
  const referralLink = 'https://supurr.trade/ref/user123';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    // In a real app, you'd want to show a toast notification here
  };

  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-6">
        <Link className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-bold">Your Referral Link</h2>
      </div>
      
      <div className="flex gap-2">
        <input
          type="text"
          value={referralLink}
          readOnly
          className="flex-1 bg-primary/5 px-4 py-2 rounded-lg text-sm"
        />
        <button
          onClick={copyToClipboard}
          className="flex items-center gap-2 bg-primary text-background px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Copy className="w-4 h-4" />
          Copy
        </button>
      </div>
    </motion.div>
  );
};