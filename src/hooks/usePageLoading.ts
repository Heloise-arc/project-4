import { useState, useEffect } from 'react';

export const usePageLoading = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 3200); // Increased to allow for complete animation sequence

    return () => clearTimeout(loadingTimer);
  }, []);

  return isLoading;
};