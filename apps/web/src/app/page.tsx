import { MainLayout } from '@/components/sections/Main';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useTechnique } from '@/hooks/useTechnique';

export const revalidate = 1000;

export default async function Home() {
  const queryClient = getSsrQueryClient();

  const dehydratedState = dehydrate(queryClient);

  const technique = useTechnique();

  await technique.prefetch(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <MainLayout />
      </HydrationBoundary>
    </>
  );
}
