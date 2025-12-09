import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { About } from '@/components/sections/About';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useAbout as aboutQuery } from '@/hooks/api/useAbout';

export const revalidate = 1000;

export default async function LawnDetailPage() {
  const queryClient = getSsrQueryClient();
  await aboutQuery().prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <About />
    </HydrationBoundary>
  );
}
