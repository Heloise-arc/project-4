import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TestnetBalance } from '../components/testnet/TestnetBalance';
import { TestnetInstructions } from '../components/testnet/TestnetInstructions';
import { TestnetActions } from '../components/testnet/TestnetActions';

gsap.registerPlugin(ScrollTrigger);

const Testnet = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.testnet-section');
    
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
        Testnet Trading
      </motion.h1>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="testnet-section">
            <TestnetInstructions />
          </div>
          <div className="testnet-section">
            <TestnetBalance />
          </div>
          <div className="lg:col-span-2 testnet-section">
            <TestnetActions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testnet;