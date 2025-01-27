import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Eye, EyeOff, Grid, PaintBucket } from 'lucide-react';

export const ChartSettings: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState({
    showVolume: true,
    showGrid: true,
    theme: 'dark'
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: typeof prev[key] === 'boolean' ? !prev[key] : prev[key]
    }));
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 rounded ${
          isOpen ? 'bg-primary text-background' : 'bg-primary/10 hover:bg-primary/20'
        }`}
      >
        <Settings className="w-4 h-4" />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Settings Menu */}
            <motion.div
              className="absolute right-0 mt-2 w-64 p-4 bg-background border border-primary/10 rounded-lg shadow-lg z-50"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <h3 className="text-sm font-medium mb-4">Chart Settings</h3>
              
              <div className="space-y-3">
                <button
                  onClick={() => toggleSetting('showVolume')}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-primary/10"
                >
                  <div className="flex items-center gap-2">
                    {settings.showVolume ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                    <span>Volume</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full transition-colors ${
                    settings.showVolume ? 'bg-primary' : 'bg-primary/20'
                  }`}>
                    <div className={`w-4 h-4 rounded-full bg-background border border-primary/10 transition-transform ${
                      settings.showVolume ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </div>
                </button>

                <button
                  onClick={() => toggleSetting('showGrid')}
                  className="flex items-center justify-between w-full p-2 rounded hover:bg-primary/10"
                >
                  <div className="flex items-center gap-2">
                    <Grid className="w-4 h-4" />
                    <span>Grid</span>
                  </div>
                  <div className={`w-8 h-4 rounded-full transition-colors ${
                    settings.showGrid ? 'bg-primary' : 'bg-primary/20'
                  }`}>
                    <div className={`w-4 h-4 rounded-full bg-background border border-primary/10 transition-transform ${
                      settings.showGrid ? 'translate-x-4' : 'translate-x-0'
                    }`} />
                  </div>
                </button>

                <div className="border-t border-primary/10 pt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <PaintBucket className="w-4 h-4" />
                    <span>Theme</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, theme: 'dark' }))}
                      className={`p-2 rounded text-sm ${
                        settings.theme === 'dark'
                          ? 'bg-primary text-background'
                          : 'bg-primary/10 hover:bg-primary/20'
                      }`}
                    >
                      Dark
                    </button>
                    <button
                      onClick={() => setSettings(prev => ({ ...prev, theme: 'light' }))}
                      className={`p-2 rounded text-sm ${
                        settings.theme === 'light'
                          ? 'bg-primary text-background'
                          : 'bg-primary/10 hover:bg-primary/20'
                      }`}
                    >
                      Light
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};