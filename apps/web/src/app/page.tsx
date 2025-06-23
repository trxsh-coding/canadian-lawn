import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/react-query';

import { Blur } from '@/components/layout/Blur';
import { MainLayout } from '@/components/sections/Main';
import { usePartners as partnersQuery } from '@/hooks/usePartners';
import { useTechnique as techniqueQuery } from '@/hooks/useTechnique';
import { useUsers as usersQuery } from '@/hooks/useUsers';
import { featureFilter, partnerLimit, roleFilter } from '@/utils/filters';

export const revalidate = 1000;

export default async function Home() {
  const queryClient = new QueryClient();
  await techniqueQuery().prefetch(queryClient);
  await usersQuery(roleFilter).prefetch(queryClient);
  await partnersQuery({
    filter: featureFilter,
    limit: partnerLimit,
  }).prefetch(queryClient);

  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <Blur />
      <HydrationBoundary state={dehydratedState}>
        <MainLayout />
      </HydrationBoundary>
    </>
  );
}
