'use client';

import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';

import { useAddItemToCart } from '@/hooks/api/useCart';
import { GuestCartItem, useCartStore } from '@/stores/cart';
import { AuthStatus } from '@/types/enums';

type AddToCartPayload = GuestCartItem;

export const useAddToCart = () => {
  const session = useSession();
  const addItemMutation = useAddItemToCart(session.data?.user.jwt);
  const addGuestItem = useCartStore((s) => s.addGuestItem);

  const addToCart = React.useCallback(
    (item: AddToCartPayload) => {
      if (session.status === AuthStatus.Authenticated) {
        addItemMutation.mutate(
          {
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            packageWeight: item.packageWeight,
            packageUnit: item.packageUnit,
          },
          {
            onSuccess: () => toast.success(`${item.name} добавлен в корзину`),
            onError: (error) => toast.error(`Ошибка: ${error.message}`),
          }
        );
      } else {
        addGuestItem(item);
        toast.success(`${item.name} добавлен в корзину`);
      }
    },
    [session.status, addItemMutation, addGuestItem]
  );

  return { addToCart, isPending: addItemMutation.isPending };
};
