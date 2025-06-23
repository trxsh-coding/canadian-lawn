'use client';
import { motion } from 'framer-motion';
import React from 'react';

import { useHasOverlays, useOverlayStore, useTopOverlay } from '@/stores';

export const Blur: React.FC = () => {
  const hasOverlays = useHasOverlays();
  const topOverlay = useTopOverlay();
  const removeOverlay = useOverlayStore((state) => state.removeOverlay);

  if (!hasOverlays) return null;

  return (
    <motion.div
      className="fixed top-0 right-0 bottom-0 left-0 z-40 h-screen w-screen backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => {
        if (topOverlay) removeOverlay(topOverlay);
      }}
    />
  );
};
