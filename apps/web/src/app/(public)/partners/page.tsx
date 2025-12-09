import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Partners } from '@/components/sections/Partners';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { usePartners as partnerQuery } from '@/hooks/api/usePartners';
import { featureFilter, partnerLimit } from '@/utils/filters';

export const revalidate = 1000;

export default async function LawnDetailPage() {
  const queryClient = getSsrQueryClient();
  await partnerQuery({
    filter: featureFilter,
    limit: partnerLimit,
  }).prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Partners />
    </HydrationBoundary>
  );
}
