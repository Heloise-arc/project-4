import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TokenStats } from '../components/token/TokenStats';
import { TokenDistribution } from '../components/token/TokenDistribution';
import { TokenUtility } from '../components/token/TokenUtility';

gsap.registerPlugin(ScrollTrigger);

const Token = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.token-section');
    
    sections.forEach((section) => {
      gsap.from(section, {
        scrollTrigger: {
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
      });
    });
  }, []);

  return (
    <div className="min-h-screen pt-20 px-4">
      <motion.h1 
        className="text-4xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        $SUPURR Token
      </motion.h1>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="token-section">
          <TokenStats />
        </div>
        <div className="token-section grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TokenDistribution />
          <TokenUtility />
        </div>
      </div>
    </div>
  );
};

export default Token;