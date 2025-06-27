'use client';

import React from 'react';

import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { useLawn } from '@/hooks/useLawn';
import { featureFilter, lawnLimit } from '@/utils/filters';

export const Lawns: React.FunctionComponent = () => {
  const { useHook: lawns } = useLawn({
    limit: lawnLimit,
    filter: featureFilter,
  });
  const { data: lawnsData, isError, isLoading } = lawns();
  const { isTablet } = useBreakpoints();
  console.log(lawnsData);
  if (isLoading) return <div>Loading...</div>;

  return (
    <Container backgroundColor="base">
      <SectionWrapper
        backgroundColor="white"
        headline="Популярные семена"
        withLink={isTablet}
        isError={isError}
      >
        <div />
      </SectionWrapper>
    </Container>
  );
};
