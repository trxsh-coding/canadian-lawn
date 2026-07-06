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
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { detailRoutes } from '@/config/routes';
import { useProducts } from '@/hooks/api/useProducts';
import { useAddToCart } from '@/hooks/useAddToCart';

const LawnCardItem = ({ product }: { product: LawnProduct }) => {
  const { addToCart } = useAddToCart();
  const router = useRouter();
  const packages = product.lawn?.package ?? [];
  const [selectedWeight, setSelectedWeight] = React.useState(packages[0]?.weight);
  const selected = packages.find((pkg) => pkg.weight === selectedWeight);

  return (
    <LawnCard
      image={product.image?.url || ''}
      placeholder={CardPlaceholder.src}
      name={product.name}
      slug={product.slug || ''}
      resistance={product.lawn?.resistance || 0}
      growth={product.lawn?.speed || 0}
      packages={packages}
      price={product.price}
      onTypeChange={(value) => setSelectedWeight(Number(value))}
      handleCardClick={(slug) => router.push(detailRoutes.lawn(slug))}
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
      value={0}
    />
  );
};

export const Lawns: React.FunctionComponent = () => {
  const { useHook } = useProducts<z.ZodType<LawnProduct>>({
    schema: lawnProductSchema,
    filters: { type: ProductType.Lawn },
    populate: PRODUCT_POPULATE_LAWN,
    limit: 3,
  });

  const { data, isLoading, isError } = useHook();

  if (isLoading)
    return (
      <div>
        <MapleSpinner />
      </div>
    );

  return (
    <SectionWrapper color="light" className="py-12" headline="Популярные семена" isError={isError}>
      <div className="flex flex-col flex-nowrap gap-3 px-7 md:grid md:grid-cols-2 2xl:grid-cols-3">
        {data?.data.map((product) => (
          <LawnCardItem key={product.id} product={product} />
        ))}
      </div>
    </SectionWrapper>
  );
};
