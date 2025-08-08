import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { Lawns } from '@/components/sections/Lawns';
import { LawnFilters } from '@/components/sections/Lawns/LawnFilters';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useLawnFilters as lawnFiltersQuery } from '@/hooks/api/useLawnFilters';
import { useLawns as lawnQuery } from '@/hooks/api/useLawns';

export const revalidate = 1000;

export default async function LawnDetailPage() {
  const queryClient = getSsrQueryClient();
  await lawnQuery().prefetch(queryClient);
  await lawnFiltersQuery().prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper asideContent={<LawnFilters />}>
        <Lawns />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}
