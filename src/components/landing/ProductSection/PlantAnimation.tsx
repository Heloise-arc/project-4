import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const PlantAnimation: React.FC = () => {
  const stemControls = useAnimation();
  const leftLeafControls = useAnimation();
  const rightLeafControls = useAnimation();
  const dropControls = useAnimation();
  const rippleControls = useAnimation();
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    const animate = async () => {
      if (!isMounted.current) return;

      try {
        // Reset animations
        await Promise.all([
          stemControls.set({ pathLength: 0, opacity: 1 }),
          leftLeafControls.set({ pathLength: 0, opacity: 0 }),
          rightLeafControls.set({ pathLength: 0, opacity: 0 }),
          dropControls.set({ y: -30, opacity: 0 }), // Start higher up
          rippleControls.set({ scale: 0, opacity: 0 })
        ]);

        if (!isMounted.current) return;

        // Grow stem with natural easing
        await stemControls.start({
          pathLength: 1,
          transition: {
            duration: 2,
            ease: [0.34, 1.56, 0.64, 1]
          }
        });

        if (!isMounted.current) return;

        // Unfold leaves with natural motion
        await Promise.all([
          leftLeafControls.start({
            opacity: 1,
            pathLength: 1,
            transition: {
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1]
            }
          }),
          rightLeafControls.start({
            opacity: 1,
            pathLength: 1,
            transition: {
              duration: 1.5,
              ease: [0.34, 1.56, 0.64, 1]
            }
          })
        ]);

        // Multiple water drops sequence
        for (let i = 0; i < 3; i++) {
          if (!isMounted.current) return;

          // Animate each drop
          await dropControls.start({
            y: [-30, 16], // Drop from above to plant height
            opacity: [1, 1, 0], // Stay visible until impact
            transition: {
              y: {
                duration: 0.8,
                ease: [0.4, 0, 1, 1] // Natural falling motion
              },
              opacity: {
                times: [0, 0.9, 1],
                duration: 0.8
              }
            }
          });

          // Create ripple effect on impact
          await rippleControls.start({
            scale: [0, 2],
            opacity: [0.8, 0],
            transition: {
              duration: 0.4,
              ease: "easeOut"
            }
          });

          if (!isMounted.current) return;
          await new Promise(resolve => setTimeout(resolve, 400));
        }

        // Gentle fade out
        await Promise.all([
          stemControls.start({ opacity: 0, transition: { duration: 0.5 } }),
          leftLeafControls.start({ opacity: 0, transition: { duration: 0.5 } }),
          rightLeafControls.start({ opacity: 0, transition: { duration: 0.5 } })
        ]);

        await new Promise(resolve => setTimeout(resolve, 300));
        if (isMounted.current) {
          animate();
        }
      } catch (error) {
        console.error('Animation error:', error);
      }
    };

    animate();

    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <div className="w-8 h-8 relative">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/5 to-primary/10" />

      <svg
        viewBox="0 0 32 32"
        className="w-full h-full"
        style={{ overflow: 'visible' }}
      >
        {/* Main Stem */}
        <motion.path
          d="M 16,28 C 16,28 16,12 16,8"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
          fill="none"
          animate={stemControls}
          initial={{ pathLength: 0 }}
        />

        {/* Left Leaf */}
        <motion.path
          d="M 16,16 C 12,14 8,16 6,12 Q 8,11 10,12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
          fill="none"
          animate={leftLeafControls}
          initial={{ pathLength: 0 }}
        />

        {/* Right Leaf */}
        <motion.path
          d="M 16,16 C 20,14 24,16 26,12 Q 24,11 22,12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
          fill="none"
          animate={rightLeafControls}
          initial={{ pathLength: 0 }}
        />

        {/* Water Drop - Made larger and more visible */}
        <motion.path
          d="M 16,0 L 18,3 L 14,3 Z"
          className="fill-[#60A5FA] dark:fill-[#93C5FD]"
          animate={dropControls}
          style={{
            filter: 'drop-shadow(0 0 2px rgba(96, 165, 250, 0.5))'
          }}
        />

        {/* Ripple Effect */}
        <motion.circle
          cx={16}
          cy={16}
          r="3"
          className="stroke-[#60A5FA] dark:stroke-[#93C5FD]"
          fill="none"
          strokeWidth="1.5"
          animate={rippleControls}
          style={{
            transformOrigin: 'center'
          }}
        />
      </svg>
    </div>
  );
};