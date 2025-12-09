'use client';

import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { ROUTES } from '@/config/routes';
import { AuthStatus } from '@/types/enums';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === AuthStatus.loading)
    return (
      <div className="absolute inset-0 flex items-center justify-center">
        <MapleSpinner />
      </div>
    );

  if (status === AuthStatus.UnAuthenticated) {
    redirect(ROUTES.home.url);
  }

  return <>{children}</>;
}
