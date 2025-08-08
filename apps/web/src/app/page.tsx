import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { MainLayout } from '@/components/sections/Main';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useLawns as lawnsQuery } from '@/hooks/api/useLawns';
import { usePartners as partnersQuery } from '@/hooks/api/usePartners';
import { useTechnique as techniqueQuery } from '@/hooks/api/useTechnique';
import { useUsers as usersQuery } from '@/hooks/api/useUsers';
import { featureFilter, partnerLimit, roleFilter } from '@/utils/filters';

export const revalidate = 1000;

export default async function Home() {
  const queryClient = getSsrQueryClient();
  await techniqueQuery().prefetch(queryClient);
  await usersQuery(roleFilter).prefetch(queryClient);
  await lawnsQuery().prefetch(queryClient);
  await partnersQuery({
    filter: featureFilter,
    limit: partnerLimit,
  }).prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <MainLayout />
      </HydrationBoundary>
    </>
  );
}
