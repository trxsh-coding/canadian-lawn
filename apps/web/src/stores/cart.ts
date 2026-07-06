import { CartItem, CartResponse } from '@canadian-lawn/api';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type Cart = CartResponse;

export type GuestCartItem = {
  productId: number;
  name: string;
  slug?: string;
  type?: string;
  price: number;
  quantity: number;
  image?: string;
  packageWeight?: number;
  packageUnit?: string;
};

const isSameGuestItem = (a: GuestCartItem, b: { productId: number; packageWeight?: number }) =>
  a.productId === b.productId && (a.packageWeight ?? null) === (b.packageWeight ?? null);

interface CartState {
  // State
  cart: Cart | null;
  guestItems: GuestCartItem[];
  isLoading: boolean;
  error: string | null;

  // Setters
  setCart: (cart: CartResponse) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;

  // Cart Actions
  addItem: (item: CartItem) => void;
  removeItem: (itemId: number) => void;
  updateItemQuantity: (itemId: number, quantity: number) => void;
  clearCart: () => void;

  // Guest cart actions
  addGuestItem: (item: GuestCartItem) => void;
  removeGuestItem: (productId: number, packageWeight?: number) => void;
  updateGuestItemQuantity: (productId: number, quantity: number, packageWeight?: number) => void;
  clearGuestItems: () => void;

  // Selectors (computed values)
  getTotalItems: () => number;
  getTotalPrice: () => number;
  getItemById: (itemId: number) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
  persist(
    devtools(
      (set, get) => ({
        // Initial State
        cart: null,
        guestItems: [],
        isLoading: false,
        error: null,

        // Setters
        setCart: (response: CartResponse) => set({ cart: response, error: null }, false, 'setCart'),

        setLoading: (isLoading: boolean) => set({ isLoading }, false, 'setLoading'),

        setError: (error: string | null) => set({ error }, false, 'setError'),

        // Cart Actions
        addItem: (newItem: CartItem) =>
          set(
            (state) => {
              if (!state.cart) return state;

              const existingItemIndex = state.cart.items.findIndex(
                (item) => item.product.id === newItem.product.id
              );

              let updatedItems: CartItem[];

              if (existingItemIndex >= 0) {
                updatedItems = state.cart.items.map((item, index) =>
                  index === existingItemIndex
                    ? {
                        ...item,
                        quantity: item.quantity + newItem.quantity,
                        total: (item.quantity + newItem.quantity) * item.price,
                      }
                    : item
                );
              } else {
                updatedItems = [
                  ...state.cart.items,
                  { ...newItem, total: newItem.quantity * newItem.price },
                ];
              }

              const total = updatedItems.reduce((sum, item) => sum + (item.total || 0), 0);

              return {
                cart: {
                  ...state.cart,
                  items: updatedItems,
                  total,
                },
              };
            },
            false,
            'addItem'
          ),

        removeItem: (itemId: number) =>
          set(
            (state) => {
              if (!state.cart) return state;

              const updatedItems = state.cart.items.filter((item) => item.id !== itemId);
              const total = updatedItems.reduce((sum, item) => sum + (item.total || 0), 0);

              return {
                cart: {
                  ...state.cart,
                  items: updatedItems,
                  total,
                },
              };
            },
            false,
            'removeItem'
          ),

        updateItemQuantity: (itemId: number, quantity: number) =>
          set(
            (state) => {
              if (!state.cart) return state;

              if (quantity <= 0) {
                // Remove item if quantity is 0 or less
                const updatedItems = state.cart.items.filter((item) => item.id !== itemId);
                const total = updatedItems.reduce((sum, item) => sum + (item.total || 0), 0);

                return {
                  cart: {
                    ...state.cart,
                    items: updatedItems,
                    total,
                  },
                };
              }

              const updatedItems = state.cart.items.map((item) =>
                item.id === itemId ? { ...item, quantity, total: quantity * item.price } : item
              );

              const total = updatedItems.reduce((sum, item) => sum + (item.total || 0), 0);

              return {
                cart: {
                  ...state.cart,
                  items: updatedItems,
                  total,
                },
              };
            },
            false,
            'updateItemQuantity'
          ),

        clearCart: () =>
          set(
            (state) => {
              if (!state.cart) return state;

              return {
                cart: {
                  ...state.cart,
                  items: [],
                  total: 0,
                },
              };
            },
            false,
            'clearCart'
          ),

        addGuestItem: (newItem: GuestCartItem) =>
          set(
            (state) => {
              const existing = state.guestItems.find((i) => isSameGuestItem(i, newItem));
              if (existing) {
                return {
                  guestItems: state.guestItems.map((i) =>
                    isSameGuestItem(i, newItem)
                      ? { ...i, quantity: i.quantity + newItem.quantity }
                      : i
                  ),
                };
              }
              return { guestItems: [...state.guestItems, newItem] };
            },
            false,
            'addGuestItem'
          ),

        removeGuestItem: (productId: number, packageWeight?: number) =>
          set(
            (state) => ({
              guestItems: state.guestItems.filter(
                (i) => !isSameGuestItem(i, { productId, packageWeight })
              ),
            }),
            false,
            'removeGuestItem'
          ),

        updateGuestItemQuantity: (productId: number, quantity: number, packageWeight?: number) =>
          set(
            (state) => ({
              guestItems:
                quantity <= 0
                  ? state.guestItems.filter(
                      (i) => !isSameGuestItem(i, { productId, packageWeight })
                    )
                  : state.guestItems.map((i) =>
                      isSameGuestItem(i, { productId, packageWeight }) ? { ...i, quantity } : i
                    ),
            }),
            false,
            'updateGuestItemQuantity'
          ),

        clearGuestItems: () => set({ guestItems: [] }, false, 'clearGuestItems'),

        getTotalItems: () => {
          const state = get();
          if (!state.cart) return 0;
          return state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
        },

        getTotalPrice: () => {
          const state = get();
          return state.cart?.total || 0;
        },

        getItemById: (itemId: number) => {
          const state = get();
          return state.cart?.items.find((item) => item.id === itemId);
        },
      }),
      { name: 'CartStore' }
    ),
    {
      name: 'cart-storage',
      partialize: (state) => ({
        cart: state.cart,
        guestItems: state.guestItems,
      }),
    }
  )
);
