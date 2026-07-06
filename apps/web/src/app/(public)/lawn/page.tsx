import { lawnProductSchema, PRODUCT_POPULATE_LAWN, ProductType } from '@canadian-lawn/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { Lawns } from '@/components/sections/Lawns';
import { LawnFilters } from '@/components/sections/Lawns/LawnFilters';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useLawnFilters as lawnFiltersQuery } from '@/hooks/api/useLawnFilters';
import { useProducts as productsQuery } from '@/hooks/api/useProducts';
import { buildSSRFilters } from '@/utils/filters';

export const revalidate = 1000;

export default async function LawnDetailPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const filters = buildSSRFilters(params);

  const queryClient = getSsrQueryClient();
  await Promise.all([
    productsQuery({
      filters: { ...filters, type: ProductType.Lawn },
      populate: { ...PRODUCT_POPULATE_LAWN },
      schema: lawnProductSchema,
    }).prefetch(queryClient),
    lawnFiltersQuery(ProductType.Lawn).prefetch(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutWrapper
        asideContent={<LawnFilters productType={ProductType.Lawn} />}
        asideClassName="bg-transparent mt-4 px-0 lg:bg-baseWhite lg:my-section"
        contentWrapperClassName="py-4 !bg-baseBg"
      >
        <Lawns productType={ProductType.Lawn} />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}
