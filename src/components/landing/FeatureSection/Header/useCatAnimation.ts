import { useState, useEffect } from 'react';

export const useCatAnimation = () => {
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    // Create animation interval
    const interval = setInterval(() => {
      setIsClicked(prev => !prev);
    }, 1000);

    // Cleanup interval on unmount
    return () => {
      clearInterval(interval);
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return { isClicked };
};