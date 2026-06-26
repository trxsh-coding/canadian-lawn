import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { MachineryProductDetail } from '@/components/sections/Product';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useProductDetail as productDetailQuery } from '@/hooks/api/useProductDetail';

export const revalidate = 1000;

export default async function TraktorDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = getSsrQueryClient();
  await productDetailQuery({ slug }).prefetch(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MachineryProductDetail slug={slug} />
    </HydrationBoundary>
  );
}
