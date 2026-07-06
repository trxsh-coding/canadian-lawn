'use client';

import { MachineryProduct, machineryProductSchema } from '@canadian-lawn/api';
import { Card } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';

import CardPlaceholder from '@/assets/img/card-placeholder.png';
import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { detailRoutes } from '@/config/routes';
import { useProducts } from '@/hooks/api/useProducts';
import { useInfiniteScrollTrigger } from '@/hooks/useInfiniteScrollTrigger';
import { useQueryParams } from '@/hooks/useUrlArrayParam';
import { STRAPI_FILTER_MAP } from '@/utils/filters';

const productDetailRoute: Partial<Record<string, (slug: string) => string>> = {
  tractor: detailRoutes.traktor,
  technique: detailRoutes.technique,
};

interface ProductsProps {
  productType: string;
}

export const Products = ({ productType }: ProductsProps) => {
  const router = useRouter();
  const { pageParams } = useQueryParams();

  const filters = React.useMemo(() => {
    const result: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(pageParams)) {
      if (typeof value !== 'string') continue;

      const mapper = STRAPI_FILTER_MAP[key];
      if (mapper) {
        const ids = value
          .split(',')
          .map(Number)
          .filter((n) => !isNaN(n));
        if (ids.length) Object.assign(result, mapper(ids));
        continue;
      }

      if (key === 'price') {
        const parts = value.split(',').map(Number);
        if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
          result.price = { $gte: parts[0], $lte: parts[1] };
        }
      }
    }

    return result;
  }, [pageParams]);

  const products = useProducts<z.ZodType<MachineryProduct>>({
    populate: { image: true, images: true, categories: true, partner: true },
    schema: machineryProductSchema,
    filters: { ...filters, type: productType },
  }).useInfiniteHook();

  const { data, isLoading, isError, fetchNextPage, hasNextPage, isFetchingNextPage } = products;

  const sentinelRef = useInfiniteScrollTrigger(() => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage();
  }, Boolean(hasNextPage));

  if (isLoading) {
    return (
      <div className="relative h-[50vh] w-full">
        <MapleSpinner />
      </div>
    );
  }

  if (isError) return null;

  const items = data?.pages.flatMap((page) => page.data) ?? [];
  const getRoute = productDetailRoute[productType];

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-5 lg:grid-cols-[repeat(auto-fill,minmax(315px,1fr))]">
        {items.map((product) => {
          const slug = product.slug ?? '';
          return (
            <Card
              className="!max-w-full"
              key={product.id}
              title={product.name}
              subtitle={product.sku || null}
              price={product.price}
              image={product.image?.url}
              placeholder={CardPlaceholder.src}
              onTitleClick={getRoute && slug ? () => router.push(getRoute(slug)) : undefined}
            />
          );
        })}
      </div>
      <div ref={sentinelRef} />
      {isFetchingNextPage && (
        <div className="relative h-16 w-full">
          <MapleSpinner />
        </div>
      )}
    </div>
  );
};
