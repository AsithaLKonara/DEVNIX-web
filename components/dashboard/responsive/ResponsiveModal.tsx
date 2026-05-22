'use client';

import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useIsMobile } from '@/hooks/useIsMobile';

interface ResponsiveModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function ResponsiveModal({ isOpen, onClose, title, children, footer }: ResponsiveModalProps) {
  const isMobile = useIsMobile();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          {isMobile ? (
            /* Mobile Bottom Sheet */
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="relative w-full max-h-[85vh] bg-[#1a1a2e] border-t border-[#2d2d4e] rounded-t-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              {/* Swipe handle indicator */}
              <div className="mx-auto my-3 w-12 h-1 bg-gray-600 rounded-full" />
              
              {/* Header */}
              <div className="px-5 pb-4 border-b border-[#2d2d4e] flex items-center justify-between">
                <h3 className="text-base font-bold text-white tracking-tight">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#2d2d4e]/50 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable content */}
              <div className="p-5 overflow-y-auto flex-grow text-sm text-gray-300">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="p-4 border-t border-[#2d2d4e] bg-[#0f0f1a] flex justify-end gap-3">
                  {footer}
                </div>
              )}
            </motion.div>
          ) : (
            /* Tablet/Desktop Centered Modal */
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full max-w-lg bg-[#1a1a2e] border border-[#2d2d4e] rounded-2xl shadow-2xl flex flex-col z-10 overflow-hidden"
              role="dialog"
              aria-modal="true"
            >
              {/* Header */}
              <div className="p-5 border-b border-[#2d2d4e] flex items-center justify-between bg-[#1a1a2e]/90">
                <h3 className="text-lg font-bold text-white tracking-tight">{title}</h3>
                <button
                  onClick={onClose}
                  className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-[#2d2d4e]/50 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[60vh] text-sm text-gray-300">
                {children}
              </div>

              {/* Footer */}
              {footer && (
                <div className="p-4 border-t border-[#2d2d4e] bg-[#0f0f1a] flex justify-end gap-3">
                  {footer}
                </div>
              )}
            </motion.div>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}
export default ResponsiveModal;
