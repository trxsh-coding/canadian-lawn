import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { FAQ } from '@/components/sections/FAQ';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useFaq as faqQuery } from '@/hooks/api/useFaq';

export const revalidate = 1000;

export default async function FaqPage() {
  const queryClient = getSsrQueryClient();

  await faqQuery().prefetch(queryClient);

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <FAQ />
    </HydrationBoundary>
  );
}
