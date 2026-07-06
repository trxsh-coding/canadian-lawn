import { machineryProductSchema, ProductType } from '@canadian-lawn/api';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { LawnFilters } from '@/components/sections/Lawns/LawnFilters';
import { Products } from '@/components/sections/Products';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useLawnFilters as lawnFiltersQuery } from '@/hooks/api/useLawnFilters';
import { useProducts as productsQuery } from '@/hooks/api/useProducts';
import { buildSSRFilters } from '@/utils/filters';

export const revalidate = 1000;

export default async function TraktorPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const params = await searchParams;
  const filters = buildSSRFilters(params);

  const queryClient = getSsrQueryClient();
  await Promise.all([
    productsQuery({
      filters: { ...filters, type: ProductType.Tractor },
      populate: { image: true, images: true, categories: true, partner: true },
      schema: machineryProductSchema,
    }).prefetch(queryClient),
    lawnFiltersQuery(ProductType.Tractor).prefetch(queryClient),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LayoutWrapper
        asideContent={<LawnFilters productType={ProductType.Tractor} />}
        asideClassName="bg-transparent mt-4 px-0 lg:bg-baseWhite lg:my-section"
        contentWrapperClassName="py-4 !bg-baseBg"
      >
        <Products productType={ProductType.Tractor} />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}
