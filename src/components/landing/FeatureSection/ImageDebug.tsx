import React, { useEffect } from 'react';

// Test all possible image paths
const imagePaths = {
  // Direct import
  buttonClick1Direct: new URL('../../../../assets/images/button-click-1.svg', import.meta.url).href,
  buttonClick2Direct: new URL('../../../../assets/images/button-click-2.svg', import.meta.url).href,
  
  // Alternative paths
  buttonClick1Alt: new URL('/assets/images/button-click-1.svg', import.meta.url).href,
  buttonClick2Alt: new URL('/assets/images/button-click-2.svg', import.meta.url).href,
  
  // Absolute paths
  buttonClick1Abs: '/assets/images/button-click-1.svg',
  buttonClick2Abs: '/assets/images/button-click-2.svg',
};

export const ImageDebug: React.FC = () => {
  useEffect(() => {
    console.log('🔍 Debug Image Paths:', imagePaths);
    
    // Test image loading
    Object.entries(imagePaths).forEach(([key, path]) => {
      const img = new Image();
      img.onload = () => console.log(`✅ Image loaded successfully: ${key} -> ${path}`);
      img.onerror = () => console.error(`❌ Image failed to load: ${key} -> ${path}`);
      img.src = path;
    });
  }, []);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs">
      <h3>Image Debug Panel</h3>
      {Object.entries(imagePaths).map(([key, path]) => (
        <div key={key} className="mt-2">
          <div>{key}:</div>
          <div className="text-green-400 truncate">{path}</div>
        </div>
      ))}
    </div>
  );
}; 