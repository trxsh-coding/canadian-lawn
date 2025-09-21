'use client';

import { LawnCard } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Spinner } from '@/components/atoms/Loaders/Spinner';
import { detailRoutes } from '@/config/routes';
import { useLawns } from '@/hooks/api/useLawns';
import { useQueryParams } from '@/hooks/useUrlArrayParam';
import { getParams, lawnFilters } from '@/utils/filters';

export const Lawns = () => {
  const { pageParams } = useQueryParams();
  const partnerTypes = getParams(pageParams.partnerTypes as string);
  const lawnTypes = getParams(pageParams.lawnTypes as string);
  const router = useRouter();
  const filters = React.useMemo(
    () => lawnFilters({ partnerTypes, lawnTypes }),
    [partnerTypes, lawnTypes]
  );

  const handleClick = React.useCallback(
    (slug: string | null) => {
      if (slug) {
        router.push(detailRoutes.lawn(slug));
      }
    },
    [router]
  );

  const { useHook: lawns } = useLawns({ filters });

  const lawn = lawns();

  if (lawn.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (lawn.isError) return null;

  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {lawn?.data?.data.map(({ image, name, price, resistance, slug, speed }, index) => (
          <LawnCard
            slug={slug || ''}
            key={index}
            className="!max-w-full self-center lg:!max-w-[480px]"
            buttonClassName="sm:!max-w-[50%] md:max-w-full sm:!w-[50%] md:!w-full"
            image={image?.url || ''}
            name={name}
            price={price[0]}
            resistance={resistance || 0}
            growth={speed || 0}
            handleButtonChange={() => null}
            handleButtonClick={() => null}
            handleCardClick={() => handleClick(slug)}
            value={0}
          />
        ))}
      </div>
    </div>
  );
};
