import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { Blog } from '@/components/sections/Blog';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useBlogDetail as blogQuery } from '@/hooks/api/useBlogDetail';

export const revalidate = 1000;

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const queryClient = getSsrQueryClient();
  await blogQuery({ slug }).prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Blog slug={slug} />
    </HydrationBoundary>
  );
}
