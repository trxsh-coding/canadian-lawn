'use client';

import React from 'react';

import AuthGuard from '@/connector/AuthGuard';

export default function PrivateLayout({ children }: React.PropsWithChildren) {
  return <AuthGuard>{children}</AuthGuard>;
}
