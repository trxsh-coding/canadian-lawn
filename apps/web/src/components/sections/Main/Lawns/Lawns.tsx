'use client';

import { LawnCard } from '@canadian-lawn/ui-kit';
import React from 'react';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useLawns } from '@/hooks/api/useLawns';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { lawnLimit } from '@/utils/filters';

export const Lawns: React.FunctionComponent = () => {
  const { useHook: lawns } = useLawns({
    limit: lawnLimit,
  });

  const { data: lawnsData, isError, isLoading } = lawns();
  const { isTablet } = useBreakpoints();
  if (isLoading) return <div>Loading...</div>;
  return (
    <SectionWrapper
      color="light"
      className="pt-section !pb-0"
      headline="Популярные семена"
      withLink={isTablet}
      isError={isError}
    >
      <div className="flex gap-3">
        {lawnsData?.data.map(({ image, name, price, resistance, speed }, index) => (
          <LawnCard
            className="!max-w-[380px] xl:!max-w-[480px]"
            key={index}
            image={image?.url || ''}
            name={name}
            price={price[0]}
            resistance={resistance || 0}
            growth={speed || 0}
            handleButtonChange={() => null}
            handleButtonClick={() => null}
            handleCardClick={() => null}
            value={0}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};
