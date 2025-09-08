'use client';

import { signOut, useSession } from 'next-auth/react';
import React from 'react';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { LeftContent } from '@/components/sections/Profile/LeftContent';
import { Orders } from '@/components/sections/Profile/Orders';
import { Personal } from '@/components/sections/Profile/Personal';
import { ROUTES } from '@/config/routes';
import { profileTabsOptions } from '@/const/tabs';
import { useMe } from '@/hooks/api/useMe';
import { AuthStatus } from '@/types/enums';

export const Profile = () => {
  const [tab, setTab] = React.useState(profileTabsOptions[0]);
  const { data, status } = useSession();

  const { useHook: user } = useMe({
    jwt: data?.user?.jwt,
    enabled: status === AuthStatus.Authenticated,
  });

  const onLogout = React.useCallback(() => signOut({ callbackUrl: ROUTES.home.url }), []);

  const userData = user();

  if (userData.isLoading) {
    return <MapleSpinner />;
  }

  const tabComponents: Record<string, React.ReactNode> = {
    personal: <Personal user={userData.data} />,
    orders: <Orders />,
  };

  return (
    <LayoutWrapper
      mainWrapperClassName="!px-0 !b-0"
      mainContentClassName="!rounded-sm"
      mainContainerClassName="px-0 !mb-0"
      title="Профиль"
      asideContent={
        <LeftContent
          options={profileTabsOptions}
          tab={tab}
          onClick={(tab) => setTab(tab)}
          onButtonClick={onLogout}
        />
      }
    >
      {tabComponents[tab.key]}
    </LayoutWrapper>
  );
};
