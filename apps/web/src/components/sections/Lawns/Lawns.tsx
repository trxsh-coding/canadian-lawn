'use client';

import {
  LawnProduct,
  lawnProductSchema,
  PRODUCT_POPULATE_LAWN,
  ProductType,
} from '@canadian-lawn/api';
import { LawnCard } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';

import { Spinner } from '@/components/atoms/Loaders/Spinner';
import { detailRoutes } from '@/config/routes';
import { useProducts } from '@/hooks/api/useProducts';
import { useQueryParams } from '@/hooks/useUrlArrayParam';
import { getParams, lawnFilters } from '@/utils/filters';

const lawnFilter = {
  type: ProductType.Lawn,
};

export const Lawns = () => {
  const { pageParams } = useQueryParams();
  const partnerTypes = getParams(pageParams.partnerTypes as string);
  const lawnTypes = getParams(pageParams.lawnTypes as string);
  const router = useRouter();
  const filters = React.useMemo(
    () => lawnFilters({ partnerTypes, lawnTypes }),
    [partnerTypes, lawnTypes]
  );

  const handleClick = React.useCallback(
    (slug: string | null) => {
      if (slug) {
        router.push(detailRoutes.lawn(slug));
      }
    },
    [router]
  );

  const { useHook } = useProducts<z.ZodType<LawnProduct>>({
    populate: {
      ...PRODUCT_POPULATE_LAWN,
    },
    schema: lawnProductSchema,
    filters: {
      ...filters,
      ...lawnFilter,
    },
  });
  const lawn = useHook();

  if (lawn.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (lawn.isError) return null;
  return (
    <div className="relative">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {lawn?.data?.data.map(({ name, images, slug, id, lawn }) => {
          return (
            <LawnCard
              slug={slug || ''}
              key={id}
              className="!max-w-full self-center lg:!max-w-[480px]"
              buttonClassName="sm:!max-w-[50%] md:max-w-full sm:!w-[50%] md:!w-full"
              image={images?.[0].url || ''}
              name={name}
              price={{
                price: lawn?.package?.[0].price || 0,
                weight: lawn?.package?.[0].weight || 0,
              }}
              resistance={lawn?.resistance || 0}
              growth={lawn?.speed || 0}
              handleButtonChange={() => null}
              handleButtonClick={() => null}
              handleCardClick={() => (slug ? handleClick(slug) : null)}
              value={0}
            />
          );
        })}
      </div>
    </div>
  );
};
