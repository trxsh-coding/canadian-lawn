import { CartResponse } from '@canadian-lawn/api';
import { create } from 'zustand';

export const useCartStore = create((set) => ({
  cart: null,
  setCart: (cart: CartResponse) => set({ cart }),
}));
