import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Import all swing frames using URL constructor
const swingFrames = [
  new URL('../../../assets/images/swing-1.png', import.meta.url).href,
  new URL('../../../assets/images/swing-2.png', import.meta.url).href,
  new URL('../../../assets/images/swing-3.png', import.meta.url).href,
  new URL('../../../assets/images/swing-4.png', import.meta.url).href,
  new URL('../../../assets/images/swing-5.png', import.meta.url).href,
  new URL('../../../assets/images/swing-6.png', import.meta.url).href,
  new URL('../../../assets/images/swing-7.png', import.meta.url).href,
];

const SwingAnimation: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const hasPlayedRef = useRef<boolean>(false);
  const totalFrames = 7;
  const frameRate = 0.15;
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
          await Promise.all(swingFrames.map(src => loadImage(src)));
        } catch (error) {
          console.error('Error preloading images:', error);
        }
      };

      preloadImages().then(() => {
        if (!containerRef.current) return;
        containerRef.current.innerHTML = '';

        const frames = swingFrames.map((src, i) => {
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

        // Create timeline that ends on last frame
        timelineRef.current = gsap.timeline({
          paused: true,
          defaults: {
            duration: frameRate,
            ease: "power1.inOut"
          }
        });

        // Create overlapping transitions that end on final frame
        frames.forEach((frame, i) => {
          if (i < frames.length - 1) {
            const startTime = i * (frameRate - overlap);
            
            timelineRef.current!.to(frame, {
              opacity: 0,
              duration: frameRate,
            }, startTime);
            
            timelineRef.current!.to(frames[i + 1], {
              opacity: 1,
              duration: frameRate,
            }, startTime);
          }
        });

        // ScrollTrigger setup
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
          onLeave: () => {
            // Reset to first frame when completely leaving the section
            gsap.to(frames, {
              opacity: 0,
              duration: frameRate,
            });
            gsap.to(frames[0], {
              opacity: 1,
              duration: frameRate,
            });
            hasPlayedRef.current = false;
          },
          onEnterBack: () => {
            if (!hasPlayedRef.current) {
              timelineRef.current?.play(0);
              hasPlayedRef.current = true;
            }
          },
          onLeaveBack: () => {
            // Reset to first frame when scrolling back up past the section
            gsap.to(frames, {
              opacity: 0,
              duration: frameRate,
            });
            gsap.to(frames[0], {
              opacity: 1,
              duration: frameRate,
            });
            hasPlayedRef.current = false;
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
    <div 
      ref={containerRef}
      className="relative w-full aspect-video bg-background/50 rounded-xl p-6 overflow-hidden"
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d'
      }}
    />
  );
};

export default SwingAnimation;