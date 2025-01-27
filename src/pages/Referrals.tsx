import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ReferralStats } from '../components/referrals/ReferralStats';
import { ReferralLink } from '../components/referrals/ReferralLink';
import { ReferralTable } from '../components/referrals/ReferralTable';
import { ReferralTiers } from '../components/referrals/ReferralTiers';

gsap.registerPlugin(ScrollTrigger);

const Referrals = () => {
  useEffect(() => {
    const sections = document.querySelectorAll('.referral-section');
    
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
        Referral Program
      </motion.h1>

      <div className="max-w-7xl mx-auto space-y-8">
        <div className="referral-section">
          <ReferralStats />
        </div>
        <div className="referral-section">
          <ReferralLink />
        </div>
        <div className="referral-section">
          <ReferralTiers />
        </div>
        <div className="referral-section">
          <ReferralTable />
        </div>
      </div>
    </div>
  );
};

export default Referrals;