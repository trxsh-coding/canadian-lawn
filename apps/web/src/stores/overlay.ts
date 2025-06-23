import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';

import { OverlayType } from '@/types/enums';

interface AppState {
  activeOverlays: Map<OverlayType, true>;
  addOverlay: (key: OverlayType) => void;
  removeOverlay: (key: OverlayType) => void;
  getTopOverlay: () => OverlayType | undefined;
  isOverlayActive: (key: OverlayType) => boolean;
}

export const useOverlayStore = create<AppState>()(
  devtools(
    subscribeWithSelector((set, get) => ({
      activeOverlays: new Map(),
      addOverlay: (key) =>
        set((state) => {
          const next = new Map(state.activeOverlays);
          next.set(key, true);
          return { activeOverlays: next };
        }),
      removeOverlay: (key) =>
        set((state) => {
          const next = new Map(state.activeOverlays);
          next.delete(key);
          return { activeOverlays: next };
        }),
      getTopOverlay: () => {
        const keys = Array.from(get().activeOverlays.keys());
        return keys.length ? keys[keys.length - 1] : undefined;
      },
      isOverlayActive: (key) => get().activeOverlays.has(key),
    }))
  )
);

export const useHasOverlays = () => useOverlayStore((state) => state.activeOverlays.size > 0);

export const useTopOverlay = () => useOverlayStore((state) => state.getTopOverlay());
