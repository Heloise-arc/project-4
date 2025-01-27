import React from 'react';
import { useThemeStore } from '../../../../store/themeStore';
import { motion } from 'framer-motion';
import { useCatAnimation } from './useCatAnimation';
import { useTranslation } from '../../../../hooks/useTranslation';
import { ImageDebug } from '../ImageDebug';

// Import images directly
import buttonClick1Url from '../../../../assets/images/button-click-1.svg';
import buttonClick2Url from '../../../../assets/images/button-click-2.svg';

console.log('🖼️ Direct Image URLs:', {
  buttonClick1Url,
  buttonClick2Url
});

export const Header: React.FC = () => {
  const { theme } = useThemeStore();
  const { isClicked } = useCatAnimation();
  const { t } = useTranslation();
  const textColor = theme === 'dark' ? '#4E9F3D' : '#1E5128';

  return (
    <div className="w-full flex justify-center mb-16 relative">
      <h2 className="text-5xl font-mono tracking-tight relative">
        <span style={{ color: textColor }}>
          {t('landing.features.title')}
        </span>
        <div 
          className="absolute" 
          style={{ 
            bottom: '45px',
            left: '140px',
            transform: 'scaleX(-1)'
          }}
        >
          <div className="relative w-[160px]">
            <motion.img
              src={buttonClick1Url}
              alt="Cat Before Click"
              className="w-full h-auto absolute"
              animate={{ opacity: isClicked ? 0 : 1 }}
              transition={{ duration: 0.1 }}
              onError={(e) => {
                console.error('❌ Failed to load button click 1:', {
                  src: buttonClick1Url,
                  error: e
                });
              }}
              onLoad={() => console.log('✅ Button click 1 loaded successfully')}
            />
            <motion.img
              src={buttonClick2Url}
              alt="Cat After Click"
              className="w-full h-auto absolute"
              animate={{ opacity: isClicked ? 1 : 0 }}
              transition={{ duration: 0.1 }}
              onError={(e) => {
                console.error('❌ Failed to load button click 2:', {
                  src: buttonClick2Url,
                  error: e
                });
              }}
              onLoad={() => console.log('✅ Button click 2 loaded successfully')}
            />
          </div>
        </div>
      </h2>
      
      {process.env.NODE_ENV === 'development' && <ImageDebug />}
    </div>
  );
};