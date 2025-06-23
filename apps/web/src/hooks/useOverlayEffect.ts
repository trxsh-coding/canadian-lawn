import { useEffect } from 'react';

import { useOverlayStore } from '@/stores';
import { OverlayType } from '@/types/enums';

export const useOverlay = (key: OverlayType, isActive: boolean, onClose?: VoidFunction) => {
  const { addOverlay, removeOverlay, activeOverlays } = useOverlayStore();

  // Управление добавлением и удалением оверлея
  useEffect(() => {
    if (isActive && !activeOverlays.has(key)) {
      addOverlay(key);
    } else if (!isActive && activeOverlays.has(key)) {
      removeOverlay(key);
    }
  }, [isActive, key, addOverlay, removeOverlay, activeOverlays]);

  useEffect(() => {
    if (isActive && !activeOverlays.has(key)) {
      onClose?.();
    }
  }, [isActive, activeOverlays, key, onClose]);
};
