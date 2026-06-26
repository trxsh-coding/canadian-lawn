'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import { useCart } from '@/hooks/api/useCart';
import { useCartStore } from '@/stores/cart';
import { AuthStatus } from '@/types/enums';

export const CartConnector = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();
  const { setCart, setLoading, setError } = useCartStore();

  const cartQuery = useCart({
    id: session.data?.user.id,
    enabled: session.status === AuthStatus.Authenticated,
    token: session.data?.user.jwt,
  });

  const { data: cartData, isLoading, error } = cartQuery.useHook();

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
