import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CoinFlipAnimation } from '../landing/CoinFlipAnimation';

export const MigrationBanner: React.FC = () => {
  return (
    <div className="flex justify-center mb-8">
      <Link to="/otc">
        <motion.div
          className="px-6 py-2 rounded-full bg-primary/10 backdrop-blur-sm border border-primary/20 cursor-pointer hover:bg-primary/20 transition-colors"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            boxShadow: '0 0 20px var(--primary-glow)',
            '--primary-glow': 'rgba(var(--primary), 0.2)'
          }}
        >
          <div className="flex items-center">
            <CoinFlipAnimation />
            <span className="text-primary text-sm">$SPR OTC Sale</span>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};