'use client';

import React from 'react';

import { QueryConnector } from '@/connector/QueryConnector';

export default function Providers({ children }: { children: React.ReactNode }) {
  return <QueryConnector>{children}</QueryConnector>;
}
