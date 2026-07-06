import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { MainLayout } from '@/components/sections/Main';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { usePartners as partnersQuery } from '@/hooks/api/usePartners';
import { useUsers as usersQuery } from '@/hooks/api/useUsers';
import { featureFilter, partnerLimit, roleFilter } from '@/utils/filters';

export const revalidate = 1000;

export default async function Home() {
  const queryClient = getSsrQueryClient();
  await usersQuery(roleFilter).prefetch(queryClient);
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
