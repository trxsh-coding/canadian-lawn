import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Lawn } from '@/components/sections/Lawn/Lawn';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useProductDetail as productDetailQuery } from '@/hooks/api/useProductDetail';

export const revalidate = 1000;

export default async function LawnDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = getSsrQueryClient();
  await productDetailQuery({ slug }).prefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Lawn slug={slug} />
    </HydrationBoundary>
  );
}
