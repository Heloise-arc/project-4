import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Import each frame individually
const frame1 = new URL('../../../assets/images/liquidation/liquidation-1.png', import.meta.url).href;
const frame2 = new URL('../../../assets/images/liquidation/liquidation-2.png', import.meta.url).href;
// ... continue for all frames

// Create array from imported frames
const frames = [
  frame1, frame2, 
  new URL('../../../assets/images/liquidation/liquidation-3.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-4.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-5.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-6.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-7.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-8.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-9.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-10.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-11.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-12.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-13.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-14.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-15.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-16.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-17.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-18.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-19.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-20.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-21.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-22.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-23.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-24.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-25.png', import.meta.url).href,
  new URL('../../../assets/images/liquidation/liquidation-26.png', import.meta.url).href,
];

export const JumpAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasPlayedRef = useRef<boolean>(false);
  const totalFrames = 26;
  const frameRate = 0.1;
  const overlap = frameRate * 0.5;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const preloadImages = async () => {
        const loadImage = (src: string) => {
          return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
          });
        };

        try {
          await Promise.all(frames.map(src => loadImage(src)));
        } catch (error) {
          console.error('Error preloading images:', error);
        }
      };

      preloadImages().then(() => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = '';

        const frameElements = frames.map((src, i) => {
          const img = document.createElement('img');
          img.src = src;
          img.className = 'absolute inset-0 w-full h-full object-contain';
          img.style.opacity = i === 0 ? '1' : '0';
          img.style.willChange = 'opacity';
          img.style.backfaceVisibility = 'hidden';
          img.style.transform = 'translate3d(0, 0, 0)';
          img.style.imageRendering = 'high-quality';
          containerRef.current?.appendChild(img);
          return img;
        });

        timelineRef.current = gsap.timeline({
          paused: true,
          defaults: {
            duration: frameRate,
            ease: "power1.inOut"
          },
          onComplete: () => {
            gsap.to(frameElements, {
              opacity: 0,
              duration: frameRate,
            });
            gsap.to(frameElements[0], {
              opacity: 1,
              duration: frameRate,
            });
            hasPlayedRef.current = false;
          }
        });

        frameElements.forEach((frame, i) => {
          if (i < frameElements.length - 1) {
            const startTime = i * (frameRate - overlap);
            
            timelineRef.current!.to(frame, {
              opacity: 0,
              duration: frameRate,
            }, startTime);
            
            timelineRef.current!.to(frameElements[i + 1], {
              opacity: 1,
              duration: frameRate,
            }, startTime);
          }
        });

        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 20%",
          onEnter: () => {
            if (!hasPlayedRef.current) {
              timelineRef.current?.play(0);
              hasPlayedRef.current = true;
            }
          },
          onEnterBack: () => {
            if (!hasPlayedRef.current) {
              timelineRef.current?.play(0);
              hasPlayedRef.current = true;
            }
          }
        });
      });
    });

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      ctx.revert();
    };
  }, []);

  return (
    <motion.div 
      ref={containerRef}
      className="relative w-full aspect-video bg-background/50 rounded-xl p-6 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
        maxWidth: '1200px',
        margin: '0 auto'
      }}
    />
  );
};