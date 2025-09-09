'use client';

import { LawnCard } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import React from 'react';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { detailRoutes } from '@/config/routes';
import { useLawns } from '@/hooks/api/useLawns';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { lawnLimit } from '@/utils/filters';

export const Lawns: React.FunctionComponent = () => {
  const { useHook: lawns } = useLawns({
    limit: lawnLimit,
  });
  const router = useRouter();

  const { data: lawnsData, isError, isLoading } = lawns();
  const { isTablet } = useBreakpoints();

  const onLawnClick = React.useCallback(
    (slug: string) => router.push(detailRoutes.lawn(slug)),
    [router]
  );

  if (isLoading)
    return (
      <div>
        <MapleSpinner />
      </div>
    );
  return (
    <SectionWrapper
      color="light"
      wrapperClassName="!pr-0"
      className="pt-section !pr-0 !pb-0"
      headline="Популярные семена"
      withLink={isTablet}
      isError={isError}
      isSection
    >
      <div className="flex gap-3">
        {lawnsData?.data.map(({ image, slug, name, price, resistance, speed }, index) => (
          <LawnCard
            className="!max-w-[380px] xl:!max-w-[480px]"
            key={index}
            image={image?.url || ''}
            name={name}
            slug={slug || ''}
            price={price[0]}
            resistance={resistance || 0}
            growth={speed || 0}
            handleButtonChange={() => null}
            handleButtonClick={() => null}
            handleCardClick={onLawnClick}
            value={0}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
