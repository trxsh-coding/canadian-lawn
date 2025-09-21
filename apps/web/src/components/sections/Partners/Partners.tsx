'use client';

import React from 'react';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { MainContent } from '@/components/sections/Partners/MainContent';
import { TopContent } from '@/components/sections/Partners/TopContent';
import { usePartners } from '@/hooks/api/usePartners';
import { featureFilter, partnerLimit } from '@/utils/filters';

export const Partners = () => {
  const { useHook: partners } = usePartners({
    limit: partnerLimit,
    filter: featureFilter,
  });
  const { data, isLoading, isError } = partners();
  const partnerData = data?.data;

  const handleMarkerClick = React.useCallback(() => {}, []);

  if (isLoading) return <MapleSpinner />;

  if (isError) return null;

  return (
    <LayoutWrapper
      title="Нам доверяют 500+ объектов в России"
      mainWrapperClassName="bg-primary"
      mainContainerClassName="bg-primary"
      mainContentClassName="bg-primary"
      topContent={<TopContent partners={partnerData} />}
    >
      {partnerData && <MainContent partners={partnerData} onMarkerClick={handleMarkerClick} />}
    </LayoutWrapper>
  );
};
