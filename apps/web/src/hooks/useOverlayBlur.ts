import React from 'react';

import { useOverlayStore } from '@/stores';
import { OverlayType } from '@/types/enums';

export const useOverlayBlur = (open: boolean, key: OverlayType = OverlayType.Modal) => {
  const { addOverlay, removeOverlay } = useOverlayStore();

  React.useEffect(() => {
    if (open) addOverlay(key);
    else removeOverlay(key);

    return () => removeOverlay(key);
  }, [open, key, addOverlay, removeOverlay]);
};
