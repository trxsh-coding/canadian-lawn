'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

import { Toast } from '@/components/atoms/Toast';
import { CartConnector } from '@/connector/CartConnector';
import { QueryConnector } from '@/connector/QueryConnector';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryConnector>
      <SessionProvider>
        <CartConnector>{children}</CartConnector>
      </SessionProvider>
      <Toast />
    </QueryConnector>
  );
}
