import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/layout/ThemeProvider';
import { Navigation } from './components/layout/Navigation';
import { ErrorBoundary } from './components/layout/ErrorBoundary';
import { LoadingScreen } from './components/layout/LoadingScreen';
import { usePageLoading } from './hooks/usePageLoading';
import { AppRoutes } from './routes';
import { CursorEffect } from './components/cursor/CursorEffect';
import { FeatureRequestForm } from './components/landing/FeatureRequestForm';
import { ToastProvider } from './components/shared/ToastProvider';
import { SkipToContent } from './components/layout/SkipToContent';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { useImagePreloader } from './utils/ImagePreloader';
import { TranslationProvider } from './contexts/TranslationProvider';

const App: React.FC = () => {
  const { imagesLoaded } = useImagePreloader();
  const isLoading = usePageLoading();

  if (!imagesLoaded) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <ThemeProvider>
          <ToastProvider>
            <TranslationProvider>
              {isLoading ? (
                <LoadingScreen isLoading={true} />
              ) : (
                <div className="min-h-screen bg-background text-text">
                  <SkipToContent />
                  <Navigation />
                  <main id="main-content" className="min-h-screen pt-20">
                    <AppRoutes />
                  </main>
                  <CursorEffect />
                  <FeatureRequestForm />
                  <ScrollToTop />
                </div>
              )}
            </TranslationProvider>
          </ToastProvider>
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;