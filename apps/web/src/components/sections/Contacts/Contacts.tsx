'use client';
import { Typography } from '@canadian-lawn/ui-kit';
import React from 'react';

import { Spinner } from '@/components/atoms/Loaders/Spinner';
import { Maps } from '@/components/layout/Maps';
import { RequisiteCard } from '@/components/layout/RequisiteCard';
import { Feedback } from '@/components/sections/Main/Feedback';
import { useContacts } from '@/hooks/api/useContacts';
import cn from '@/utils/cnMerge';

export const Contacts = () => {
  const { useHook: contacts } = useContacts();

  const contact = contacts();

  const { data } = contact;
  const contactData = data?.data;
  const mapData = data?.data.address?.coordinates;

  const handleClick = React.useCallback(() => {
    return null;
  }, []);

  const InfoCard = ({
    inverse,
    title,
    description,
  }: {
    inverse?: boolean;
    title: string;
    description: string;
  }) => (
    <div
      className={cn(
        'bg-baseSilvery flex flex-col p-[30px] pt-[25px]',
        inverse && 'bg-tertiary text-white'
      )}
    >
      <Typography view="regular">{title}</Typography>
      <Typography family="gothic" view="heading2">
        {description}
      </Typography>
    </div>
  );

  if (contact.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (contact.isError) return null;

  return (
    <div className="relative">
      <div className="flex flex-col gap-5 md:flex-row lg:mb-10">
        <RequisiteCard
          title={contactData?.companyName || ''}
          firstValueTitle="ИНН"
          secondValueTitle="КПП"
          thirdValueTitle="ОГРН"
          buttonLink={contactData?.document?.url}
          firstValue={contactData?.inn}
          secondValue={contactData?.kpp}
          thirdValue={contactData?.PSRN?.value}
        />
        <div className="flex flex-wrap gap-2 lg:flex-[0.7] 2xl:flex-[0.5]">
          <InfoCard title="Опыт" description="9 лет" inverse />
          <InfoCard title="Всего сделок" description="15 000+" />
          <InfoCard title="Госзакупки" description="9 контрактов" />
          <InfoCard title="Крупные партнёры" description="1000+" />
        </div>
      </div>
      {mapData?.lat && mapData?.lng && (
        <Maps
          onMarkerClick={handleClick}
          withMarkers={false}
          lat={mapData?.lat}
          lng={mapData.lng}
        />
      )}
      <Feedback wrapperClassName="overflow-hidden w-full !rounded-sm lg:mt-10" />
    </div>
  );
};
