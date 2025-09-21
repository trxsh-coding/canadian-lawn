'use client';

import { SessionProvider } from 'next-auth/react';
import React from 'react';

import { Toast } from '@/components/atoms/Toast';
import { QueryConnector } from '@/connector/QueryConnector';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryConnector>
      <SessionProvider>{children}</SessionProvider>
      <Toast />
    </QueryConnector>
  );
}
