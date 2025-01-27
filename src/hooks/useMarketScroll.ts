import { useEffect, useRef, RefObject } from 'react';
import { ScrollConfig } from '../types/trading';

export const useMarketScroll = (
  scrollRef: RefObject<HTMLDivElement>,
  config: ScrollConfig
) => {
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>();
  const currentXRef = useRef(0);

  useEffect(() => {
    if (!scrollRef.current) return;

    const totalWidth = (config.width + config.gap) * config.totalCards;
    const halfWidth = totalWidth / 2;
    const pixelsPerSecond = config.speed || 50;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = timestamp;
      }

      const elapsed = timestamp - startTimeRef.current;
      const distance = (elapsed * pixelsPerSecond) / 1000;
      
      currentXRef.current = -distance % halfWidth;

      if (scrollRef.current) {
        scrollRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };

    const handleMouseLeave = () => {
      startTimeRef.current = performance.now() - (currentXRef.current / pixelsPerSecond) * 1000;
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const element = scrollRef.current;
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [config]);
};