import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { Lawns } from '@/components/sections/Lawns';
import { LawnFilters } from '@/components/sections/Lawns/LawnFilters';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useLawnFilters as lawnFiltersQuery } from '@/hooks/api/useLawnFilters';
import { useLawns as lawnQuery } from '@/hooks/api/useLawns';
import { getParams, lawnFilters } from '@/utils/filters';

export const revalidate = 1000;

export default async function LawnDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const partnerTypes = getParams(params.partnerTypes);
  const lawnTypes = getParams(params.lawnTypes);

  const filters = lawnFilters({ partnerTypes, lawnTypes });

  const queryClient = getSsrQueryClient();
  await lawnQuery({ filters }).prefetch(queryClient);
  await lawnFiltersQuery().prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper
        asideContent={<LawnFilters />}
        asideContentClassName="bg-transparent lg:bg-baseWhite"
        mainWrapperClassName="py-4 !bg-baseBg"
      >
        <Lawns />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}
