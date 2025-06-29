'use client';

import { LawnCard } from '@canadian-lawn/ui-kit';
import React from 'react';

import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useLawn } from '@/hooks/useLawn';
import { lawnLimit } from '@/utils/filters';

export const Lawns: React.FunctionComponent = () => {
  const { useHook: lawns } = useLawn({
    limit: lawnLimit,
  });
  const { data: lawnsData, isError, isLoading } = lawns();
  const { isTablet } = useBreakpoints();
  if (isLoading) return <div>Loading...</div>;
  return (
    <Container backgroundColor="base">
      <SectionWrapper
        backgroundColor="white"
        headline="Популярные семена"
        withLink={isTablet}
        isError={isError}
      >
        <div className="flex gap-3">
          {lawnsData?.data.map(({ image, name, price, resistance, speed }, index) => (
            <LawnCard
              key={index}
              image={image?.url || ''}
              name={name}
              price={price[0]}
              resistance={resistance || 0}
              growth={speed || 0}
              handleButtonChange={function (value: number): void {
                console.log('Function not implemented.', value);
              }}
              handleButtonClick={function (value: boolean): void {
                console.log('Function not implemented.', value);
              }}
              handleCardClick={() => null}
              value={0}
            />
          ))}
        </div>
      </SectionWrapper>
    </Container>
  );
};
