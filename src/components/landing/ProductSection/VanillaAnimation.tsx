import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

export const VanillaAnimation: React.FC = () => {
  const coneControls = useAnimation();
  const scoopControls = useAnimation();
  const dropControls = useAnimation();
  const squishControls = useAnimation();
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    let timeouts: NodeJS.Timeout[] = [];
    
    const animate = async () => {
      if (!isMounted.current) return;

      try {
        // Reset animations
        await Promise.all([
          coneControls.set({ y: 0, scale: 1 }),
          scoopControls.set({ y: -30, scale: 1, opacity: 1 }),
          dropControls.set({ y: 0, opacity: 0 }),
          squishControls.set({ scaleX: 1, scaleY: 1 })
        ]);

        if (!isMounted.current) return;

        // Drop scoop onto cone
        await Promise.all([
          scoopControls.start({
            y: 0,
            transition: {
              duration: 0.5,
              ease: [0.34, 1.56, 0.64, 1]
            }
          }),
          coneControls.start({
            y: [0, 2, 0],
            transition: { duration: 0.3, times: [0, 0.5, 1] }
          })
        ]);

        if (!isMounted.current) return;

        // Squish effect
        await squishControls.start({
          scaleX: [1, 1.2, 1],
          scaleY: [1, 0.8, 1],
          transition: { duration: 0.4, times: [0, 0.5, 1] }
        });

        if (!isMounted.current) return;

        const timeout1 = setTimeout(async () => {
          if (!isMounted.current) return;

          // Drip animation
          await dropControls.start({
            y: [0, 20],
            opacity: [0, 1, 0],
            transition: {
              y: { duration: 1, ease: "easeIn" },
              opacity: { duration: 1, times: [0, 0.2, 1] }
            }
          });

          if (!isMounted.current) return;

          const timeout2 = setTimeout(async () => {
            if (!isMounted.current) return;

            // Fade out
            await scoopControls.start({
              opacity: 0,
              transition: { duration: 0.3 }
            });

            if (!isMounted.current) return;

            const timeout3 = setTimeout(() => {
              if (isMounted.current) {
                animate();
              }
            }, 300);

            timeouts.push(timeout3);
          }, 500);

          timeouts.push(timeout2);
        }, 500);

        timeouts.push(timeout1);
      } catch (error) {
        // Silently handle animation errors
        if (isMounted.current) {
          // Reset and try again after a delay
          const timeout = setTimeout(animate, 1000);
          timeouts.push(timeout);
        }
      }
    };

    animate();

    return () => {
      isMounted.current = false;
      timeouts.forEach(clearTimeout);
      [coneControls, scoopControls, dropControls, squishControls].forEach(control => {
        control.stop();
      });
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
        {/* Ice Cream Cone */}
        <motion.path
          d="M 16,28 L 8,16 L 24,16 Z"
          className="fill-primary"
          animate={coneControls}
          style={{ transformOrigin: 'bottom center' }}
        />

        {/* Ice Cream Scoop */}
        <motion.circle
          cx="16"
          cy="14"
          r="6"
          className="fill-primary"
          animate={scoopControls}
          style={{ transformOrigin: 'center' }}
        >
          <motion.circle
            cx="16"
            cy="14"
            r="6"
            className="fill-primary"
            animate={squishControls}
            style={{ transformOrigin: 'center' }}
          />
        </motion.circle>

        {/* Drip */}
        <motion.path
          d="M 16,20 Q 16,22 16,24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-primary"
          animate={dropControls}
          style={{ 
            transformOrigin: 'top',
            filter: 'drop-shadow(0 0 2px rgba(var(--primary), 0.3))'
          }}
        />
      </svg>
    </div>
  );
};