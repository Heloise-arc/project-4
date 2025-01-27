import React, { useLayoutEffect } from 'react';
import { useThemeStore } from '../../store/themeStore';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { initializeTheme } = useThemeStore();

  // Use useLayoutEffect to prevent flash of wrong theme
  useLayoutEffect(() => {
    initializeTheme();
  }, [initializeTheme]);

  return <>{children}</>;
};