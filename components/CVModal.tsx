'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink } from 'lucide-react';
import { useEffect } from 'react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            id="cv-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center"
            style={{ background: 'rgba(2, 8, 23, 0.9)', backdropFilter: 'blur(8px)' }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            id="cv-modal"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-4 sm:inset-8 z-[101] flex flex-col rounded-2xl overflow-hidden"
            style={{
              background: 'var(--glass-bg)',
              border: '1px solid rgba(0,212,255,0.3)',
              boxShadow: '0 0 80px rgba(0,212,255,0.1), 0 24px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-6 py-4 border-b flex-shrink-0"
              style={{ borderColor: 'var(--glass-border)', background: 'var(--accent-dim)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: 'var(--accent)', boxShadow: '0 0 8px var(--accent)' }}
                />
                <span
                  className="font-display font-semibold text-sm"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Mohamed Osama — Curriculum Vitae
                </span>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href="/profile/cv.pdf"
                  download="Mohamed_Osama_CV.pdf"
                  className="flex items-center gap-2 btn-outline py-2 px-4 text-xs"
                  title="Download CV"
                >
                  <Download size={13} />
                  Download
                </a>
                <button
                  id="cv-modal-close"
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-red-500/10 hover:text-red-400"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label="Close CV viewer"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 relative">
              <iframe
                src="/profile/cv.pdf"
                title="Mohamed Osama CV"
                className="w-full h-full border-0"
                style={{ minHeight: '400px' }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
