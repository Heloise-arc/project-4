import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/theme.css';
import { checkTranslations } from './utils/translationChecker';
import { checkImagePaths } from './utils/imageChecker';

// Initialize theme before rendering
document.documentElement.setAttribute('data-theme', 'dark');

// Always check images in both dev and prod
checkImagePaths().then(results => {
  console.group('Image Path Check Results');
  
  // Log failing images
  const failing = results.filter(r => !r.exists);
  if (failing.length > 0) {
    console.warn('⚠️ Failed to load images:', failing);
  }
  
  // Log successful images
  const success = results.filter(r => r.exists);
  console.log('✅ Successfully loaded images:', success);
  
  console.groupEnd();
}).catch(error => {
  console.error('❌ Error checking images:', error);
});

// Development-only checks
if (process.env.NODE_ENV === 'development') {
  checkTranslations();
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);