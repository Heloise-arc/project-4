import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
  retryCount?: number;
  retryDelay?: number;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  fallback = '/assets/images/placeholder.png',
  retryCount = 3,
  retryDelay = 1000,
  className,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [retries, setRetries] = useState(0);

  // Log initial mount
  useEffect(() => {
    console.log(`[ImageWithFallback] Mounting with src:`, src);
  }, []);

  useEffect(() => {
    if (error && retries < retryCount) {
      const timer = setTimeout(() => {
        console.log(`[ImageWithFallback] Retrying image load (${retries + 1}/${retryCount}):`, src);
        setError(false);
        // Try alternative paths
        const altPath = currentSrc.startsWith('/') ? 
          currentSrc.slice(1) : 
          `/${currentSrc}`;
        setCurrentSrc(altPath);
        setRetries(r => r + 1);
      }, retryDelay);
      
      return () => clearTimeout(timer);
    }
  }, [error, retries, retryCount, retryDelay, src, currentSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    console.error(`[ImageWithFallback] Error loading image:`, {
      src: currentSrc,
      error: e,
      retries,
      element: e.currentTarget
    });

    if (retries >= retryCount) {
      console.warn(`[ImageWithFallback] Failed to load image after ${retryCount} retries:`, src);
      setCurrentSrc(fallback);
      setError(true);
      setIsLoading(false);
    } else {
      setError(true);
    }
  };

  const handleLoad = () => {
    console.log(`[ImageWithFallback] Successfully loaded image:`, currentSrc);
    setIsLoading(false);
    setError(false);
  };

  return (
    <div className="relative">
      {isLoading && (
        <motion.div
          className="absolute inset-0 bg-primary/10 rounded animate-pulse"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
      <motion.img
        src={currentSrc}
        alt={alt}
        className={className}
        onLoad={handleLoad}
        onError={handleError}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        {...props}
      />
    </div>
  );
};