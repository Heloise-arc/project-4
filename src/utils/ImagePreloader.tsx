import React, { useEffect, useState } from 'react';

// Import all images
import buttonClick1 from '../assets/images/button-click-1.svg';
import buttonClick2 from '../assets/images/button-click-2.svg';
import logoTextDark from '../assets/images/logo-text-dark.svg';
import logoTextLight from '../assets/images/logo-text-light.svg';
import logoDark from '../assets/images/logo-dark.svg';
import logoLight from '../assets/images/logo-light.svg';
import loadingCat from '../assets/images/loading-cat.svg';

const images = {
  buttonClick1,
  buttonClick2,
  logoTextDark,
  logoTextLight,
  logoDark,
  logoLight,
  loadingCat
};

export const useImagePreloader = () => {
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    const loadImage = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => {
          console.log(`✅ Loaded image: ${src}`);
          resolve();
        };
        img.onerror = () => {
          console.error(`❌ Failed to load image: ${src}`);
          reject();
        };
      });
    };

    Promise.all(Object.values(images).map(src => loadImage(src)))
      .then(() => {
        console.log('🎉 All images preloaded successfully');
        setImagesLoaded(true);
      })
      .catch(error => {
        console.error('❌ Error preloading images:', error);
        // Still set as loaded to prevent blocking the app
        setImagesLoaded(true);
      });
  }, []);

  return { imagesLoaded, images };
};

export const imageUrls = images; 