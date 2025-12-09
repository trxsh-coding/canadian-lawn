'use client';

import { useSession } from 'next-auth/react';
import React from 'react';

import { useCart } from '@/hooks/api/useCart';

export const CartConnector = ({ children }: { children: React.ReactNode }) => {
  const session = useSession();

  useCart({
    id: session.data?.user.id,
    enabled: Boolean(session.data?.user.id),
  });

  return children;
};
