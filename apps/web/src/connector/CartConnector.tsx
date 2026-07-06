'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import { useAddItemToCart, useCart } from '@/hooks/api/useCart';
import { useCartStore } from '@/stores/cart';
import { AuthStatus } from '@/types/enums';

export const CartConnector = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const { setCart, setLoading, setError, guestItems, clearGuestItems } = useCartStore();

  const addItemMutation = useAddItemToCart(session.data?.user.jwt);

  const cartQuery = useCart({
    id: session.data?.user.id,
    enabled: session.status === AuthStatus.Authenticated,
    token: session.data?.user.jwt,
  });

  const { data: cartData, isLoading, error } = cartQuery.useHook();

  const prevStatus = React.useRef(session.status);

  // Sync guest cart to Strapi on login
  React.useEffect(() => {
    if (
      prevStatus.current !== AuthStatus.Authenticated &&
      session.status === AuthStatus.Authenticated &&
      guestItems.length > 0
    ) {
      Promise.all(
        guestItems.map((item) =>
          addItemMutation.mutateAsync({
            productId: item.productId,
            quantity: item.quantity,
            price: item.price,
            packageWeight: item.packageWeight,
            packageUnit: item.packageUnit,
          })
        )
      ).finally(() => clearGuestItems());
    }
    prevStatus.current = session.status;
  }, [session.status]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  React.useEffect(() => {
    if (error) {
      setError(error.message);
    }
  }, [error, setError]);

  React.useEffect(() => {
    if (cartData) {
      setCart(cartData);
      setError(null);
    }
  }, [cartData, setCart, setError]);

  return children;
};
