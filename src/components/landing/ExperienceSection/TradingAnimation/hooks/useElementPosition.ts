import { useEffect, useRef, useState } from 'react';

export interface ElementPosition {
  x: number;
  y: number;
  width: number;
  height: number;
}

export function useElementPosition() {
  const elementRef = useRef<HTMLElement | null>(null);
  const [position, setPosition] = useState<ElementPosition | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    const updatePosition = () => {
      if (!elementRef.current) return;
      
      const element = elementRef.current;
      const container = element.closest('.trading-animation');
      
      if (container) {
        const elementRect = element.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        setPosition({
          x: elementRect.left - containerRect.left,
          y: elementRect.top - containerRect.top,
          width: elementRect.width,
          height: elementRect.height
        });
      }
    };

    // Create ResizeObserver
    observerRef.current = new ResizeObserver(updatePosition);
    
    // Observe both element and container
    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
      const container = elementRef.current.closest('.trading-animation');
      if (container) {
        observerRef.current.observe(container);
      }
    }

    // Initial position update
    updatePosition();

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return { elementRef, position };
}