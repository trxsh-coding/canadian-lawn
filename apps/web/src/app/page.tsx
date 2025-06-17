import { MainLayout } from '@/components/sections/Main';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useTechnique } from '@/hooks/useTechnique';
import { useUsers } from '@/hooks/useUsers';
import { featureFilter, partnerLimit, roleFilter } from '@/utils/filters';
import { usePartners } from '@/hooks/usePartners';

export const revalidate = 1000;

export default async function Home() {
  const queryClient = getSsrQueryClient();

  const technique = useTechnique();
  const user = useUsers(roleFilter);
  const partner = usePartners({
    filter: featureFilter,
    limit: partnerLimit,
  });

  await technique.prefetch(queryClient);
  await user.prefetch(queryClient);
  const data = await partner.prefetch(queryClient);
  console.log({ data });
  const dehydratedState = dehydrate(queryClient);

  return (
    <>
      <HydrationBoundary state={dehydratedState}>
        <MainLayout />
      </HydrationBoundary>
    </>
  );
}
