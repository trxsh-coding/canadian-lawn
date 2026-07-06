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

import CardPlaceholder from '@/assets/img/card-placeholder.png';
import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { detailRoutes } from '@/config/routes';
import { useProducts } from '@/hooks/api/useProducts';
import { useAddToCart } from '@/hooks/useAddToCart';
import { useInfiniteScrollTrigger } from '@/hooks/useInfiniteScrollTrigger';
import { useQueryParams } from '@/hooks/useUrlArrayParam';
import { STRAPI_FILTER_MAP } from '@/utils/filters';

interface LawnsProps {
  productType: string;
}

const LawnCardItem = ({ product, productType }: { product: LawnProduct; productType: string }) => {
  const { addToCart } = useAddToCart();
  const router = useRouter();
  const packages = product.lawn?.package ?? [];
  const [selectedWeight, setSelectedWeight] = React.useState(packages[0]?.weight);
  const selected = packages.find((pkg) => pkg.weight === selectedWeight);

  return (
    <LawnCard
      slug={product.slug || ''}
      className="!max-w-full self-center lg:!max-w-[480px]"
      image={product.image?.url || ''}
      placeholder={CardPlaceholder.src}
      name={product.name}
      packages={packages}
      price={product.price}
      resistance={product.lawn?.resistance ?? 0}
      growth={product.lawn?.speed ?? 0}
      onTypeChange={(value) => setSelectedWeight(Number(value))}
      handleButtonChange={() => null}
      handleButtonClick={() =>
        addToCart({
          productId: product.id,
          name: product.name,
          slug: product.slug,
          type: product.type,
          price: selected?.price ?? product.price,
          quantity: 1,
          image: product.image?.url,
          packageWeight: selected?.weight,
          packageUnit: selected?.unit,
        })
      }
      handleCardClick={() =>
        router.push(
          productType === ProductType.LawnMix
            ? detailRoutes.lawnMix(product.slug || '')
            : detailRoutes.lawn(product.slug || '')
        )
      }
      value={0}
    />
  );
};

export const Lawns = ({ productType }: LawnsProps) => {
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

  const lawn = useProducts<z.ZodType<LawnProduct>>({
    populate: { ...PRODUCT_POPULATE_LAWN },
    schema: lawnProductSchema,
    filters: { ...filters, type: productType },
  }).useInfiniteHook();

  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage, isFetchingNextPage } =
    lawn;

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

  return (
    <div className="relative flex flex-col gap-5">
      {isFetching && !isFetchingNextPage && (
        <div className="absolute inset-0 z-10 bg-white/60">
          <MapleSpinner />
        </div>
      )}
      <div className="grid grid-cols-[repeat(auto-fill,minmax(320px,1fr))] gap-5 lg:grid-cols-[repeat(auto-fill,minmax(480px,1fr))]">
        {items.map((product) => (
          <LawnCardItem key={product.id} product={product} productType={productType} />
        ))}
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
