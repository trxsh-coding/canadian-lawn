import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Blogs } from '@/components/sections/Blogs/Blogs';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useBlog as blogQuery } from '@/hooks/api/useBlog';

export const revalidate = 1000;

export default async function LawnDetailPage() {
  const queryClient = getSsrQueryClient();
  await blogQuery().prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Blogs />
    </HydrationBoundary>
  );
}
