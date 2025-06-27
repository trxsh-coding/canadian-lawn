'use client';

import { PartnerCard } from '@canadian-lawn/ui-kit';
import React from 'react';

import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useBreakpoints } from '@/hooks/useBreakpoints';
import { usePartners } from '@/hooks/usePartners';
import { featureFilter, partnerLimit } from '@/utils/filters';

export const Partners: React.FunctionComponent = () => {
  const { useHook: partners } = usePartners({
    limit: partnerLimit,
    filter: featureFilter,
  });
  const { data: partnersData, isError, isLoading } = partners();

  const { isTablet } = useBreakpoints();

  if (isLoading) return <div>Loading...</div>;

  return (
    <Container backgroundColor="light-green">
      <SectionWrapper
        backgroundColor="light-green"
        headline="Более 100 бизнес-клиентов Уже доверяют нам"
        className="text-baseWhite"
        withLink={isTablet}
        isError={isError}
      >
        <div className="flex w-full flex-col gap-3 md:flex-row md:gap-5">
          {partnersData?.data.map(({ name, logo, id }) => (
            <PartnerCard key={id} className="flex-1 grow" title={name} image={logo?.url} />
          ))}
        </div>
      </SectionWrapper>
    </Container>
  );
};
