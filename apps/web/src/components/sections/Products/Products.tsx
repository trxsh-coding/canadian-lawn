'use client';

import { MachineryProduct, machineryProductSchema } from '@canadian-lawn/api';
import { Card } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';

import { Spinner } from '@/components/atoms/Loaders/Spinner';
import { detailRoutes } from '@/config/routes';
import { useProducts } from '@/hooks/api/useProducts';
import { useQueryParams } from '@/hooks/useUrlArrayParam';
import { STRAPI_FILTER_MAP } from '@/utils/filters';

const productDetailRoute: Record<string, (slug: string) => string> = {
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
  }).useHook();

  if (products.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (products.isError) return null;

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
      {products.data?.data.map((product) => {
        const getRoute = productDetailRoute[productType];
        const slug = product.slug ?? '';
        return (
          <div
            key={product.id}
            className="cursor-pointer"
            onClick={() => getRoute && slug && router.push(getRoute(slug))}
          >
            <Card
              title={product.name}
              subtitle={product.sku || null}
              price={product.price}
              image={product.image?.url}
            />
          </div>
        );
      })}
    </div>
  );
};
