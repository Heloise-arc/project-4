import { useState, useEffect } from 'react';
import { LOADING_MESSAGES } from './constants';

export const useLoadingMessage = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((current) => (current + 1) % LOADING_MESSAGES.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return LOADING_MESSAGES[messageIndex];
};