import { lawnProductSchema, PRODUCT_POPULATE_LAWN } from '@canadian-lawn/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { Lawns } from '@/components/sections/Lawns';
import { LawnFilters } from '@/components/sections/Lawns/LawnFilters';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useLawnFilters as lawnFiltersQuery } from '@/hooks/api/useLawnFilters';
import { useProducts as productsQuery } from '@/hooks/api/useProducts';
import { getParams, lawnFilters } from '@/utils/filters';

export const revalidate = 1000;

export default async function LawnDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const partnerTypes = getParams(params.partnerTypes);
  const lawnTypes = getParams(params.lawnTypes);

  const filters = lawnFilters({ partnerTypes, lawnTypes });
  console.log(filters);
  const queryClient = getSsrQueryClient();
  await productsQuery({
    filters,
    populate: {
      ...PRODUCT_POPULATE_LAWN,
    },
    schema: lawnProductSchema,
  }).prefetch(queryClient);
  await lawnFiltersQuery().prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper
        asideContent={<LawnFilters />}
        asideContentClassName="bg-transparent mt-4 px-0  lg:bg-baseWhite lg:my-section"
        mainWrapperClassName="py-4 !bg-baseBg"
      >
        <Lawns />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}
