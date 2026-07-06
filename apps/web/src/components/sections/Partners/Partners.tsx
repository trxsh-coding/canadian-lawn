'use client';

import { Partner } from '@canadian-lawn/api';
import { Pic, Typography } from '@canadian-lawn/ui-kit';
import React from 'react';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { AdaptiveModal } from '@/components/layout/AdaptiveModal/AdaptiveModal';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { MainContent } from '@/components/sections/Partners/MainContent';
import { TopContent } from '@/components/sections/Partners/TopContent';
import { usePartners } from '@/hooks/api/usePartners';
import { featureFilter } from '@/utils/filters';

const PartnerInfo = ({ partner }: { partner: Partner }) => (
  <div className="flex flex-col gap-4 p-4">
    {partner.logo?.url && <Pic src={partner.logo.url} fit="contain" className="h-[120px] w-full" />}
    <Typography view="large1" weight="bold">
      {partner.name}
    </Typography>
    {partner.phone && (
      <div className="flex flex-col gap-1">
        <Typography color="secondary-grey">Телефон</Typography>
        <Typography>{partner.phone}</Typography>
      </div>
    )}
    {partner.workingHours && (
      <div className="flex flex-col gap-1">
        <Typography color="secondary-grey">Режим работы</Typography>
        <Typography>{partner.workingHours}</Typography>
      </div>
    )}
    {partner.openOnWeekends != null && (
      <Typography color="secondary-grey">
        {partner.openOnWeekends ? 'Работает в выходные' : 'Не работает в выходные'}
      </Typography>
    )}
    {partner.website && (
      <div className="flex flex-col gap-1">
        <Typography color="secondary-grey">Сайт</Typography>
        <a href={partner.website} target="_blank" rel="noreferrer">
          <Typography color="tertiary">{partner.website}</Typography>
        </a>
      </div>
    )}
    {partner.howToGet && (
      <div className="flex flex-col gap-1">
        <Typography color="secondary-grey">Как добраться</Typography>
        <Typography>{partner.howToGet}</Typography>
      </div>
    )}
  </div>
);

export const Partners = () => {
  const { useHook: partners } = usePartners({
    filter: featureFilter,
  });
  const { data, isLoading, isError } = partners();
  const partnerData = data?.data;

  const [selectedPartner, setSelectedPartner] = React.useState<Partner | null>(null);

  const handleMarkerClick = React.useCallback((partner: Partner) => {
    setSelectedPartner(partner);
  }, []);

  if (isLoading) return <MapleSpinner />;

  if (isError) return null;

  return (
    <>
      <LayoutWrapper
        title="Нам доверяют 500+ объектов в России"
        contentWrapperClassName="bg-primary"
        mainClassName="bg-primary"
        contentContainerClassName="bg-primary"
        topContent={
          <TopContent
            partners={partnerData}
            onPartnerClick={(p) => handleMarkerClick(p as unknown as Partner)}
          />
        }
      >
        {partnerData && <MainContent partners={partnerData} onMarkerClick={handleMarkerClick} />}
      </LayoutWrapper>

      <AdaptiveModal
        open={!!selectedPartner}
        onOpenChange={(open) => !open && setSelectedPartner(null)}
        title={selectedPartner?.name}
      >
        {selectedPartner && <PartnerInfo partner={selectedPartner} />}
      </AdaptiveModal>
    </>
  );
};
