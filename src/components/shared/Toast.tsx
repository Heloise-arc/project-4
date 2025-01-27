import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertTriangle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
}

const icons = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info
};

const colors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500'
};

export const Toast: React.FC<ToastProps> = ({ type, message, onClose }) => {
  const Icon = icons[type];

  return (
    <motion.div
      className="fixed bottom-4 right-4 z-50"
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.9 }}
    >
      <div className={`${colors[type]} text-white rounded-lg shadow-lg p-4 pr-12 max-w-sm`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full"
        >
          <X className="w-4 h-4" />
        </button>
        
        <div className="flex items-start gap-3">
          <Icon className="w-5 h-5 mt-0.5" />
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </motion.div>
  );
};