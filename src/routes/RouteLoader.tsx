import React from 'react';
import { LoadingScreen } from "../components/layout/LoadingScreen";

interface RouteLoaderProps {
  children: React.ReactNode;
}

export const RouteLoader: React.FC<RouteLoaderProps> = ({ children }) => {
  return (
    <React.Suspense fallback={<LoadingScreen isLoading={true} />}>
      {children}
    </React.Suspense>
  );
};