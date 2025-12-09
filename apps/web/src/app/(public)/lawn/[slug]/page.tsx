import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Lawn } from '@/components/sections/Lawn/Lawn';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useLawnDetail as lawnQuery } from '@/hooks/api/useLawnDetail';

export const revalidate = 1000;

export default async function LawnDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = getSsrQueryClient();
  await lawnQuery({ slug }).prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Lawn slug={slug} />
    </HydrationBoundary>
  );
}
