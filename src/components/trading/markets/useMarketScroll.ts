import { useEffect, useRef, RefObject } from 'react';
import gsap from 'gsap';
import { ScrollConfig } from './types';

export const useMarketScroll = (
  scrollRef: RefObject<HTMLDivElement>,
  config: ScrollConfig
) => {
  const timeline = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!scrollRef.current) return;

    const totalWidth = (config.width + config.gap) * config.totalCards;
    const duration = totalWidth / (config.speed || 50); // Default speed: 50px/s
    
    timeline.current = gsap.timeline({
      repeat: -1,
      defaults: { ease: 'none' }
    });

    timeline.current.to(scrollRef.current, {
      x: -totalWidth / 2, // Only scroll half since we duplicate cards
      duration,
      ease: 'none'
    });

    const handleHover = () => timeline.current?.pause();
    const handleLeave = () => timeline.current?.play();

    scrollRef.current.addEventListener('mouseenter', handleHover);
    scrollRef.current.addEventListener('mouseleave', handleLeave);

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener('mouseenter', handleHover);
        scrollRef.current.removeEventListener('mouseleave', handleLeave);
      }
      timeline.current?.kill();
    };
  }, [config]);

  return timeline;
};