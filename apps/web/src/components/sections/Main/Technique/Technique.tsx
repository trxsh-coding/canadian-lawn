'use client';

import { TractorProduct, tractorProductSchema, ProductType } from '@canadian-lawn/api';
import { Card } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import React from 'react';
import { z } from 'zod';

import CardPlaceholder from '@/assets/img/card-placeholder.png';
import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { detailRoutes } from '@/config/routes';
import { useProducts } from '@/hooks/api/useProducts';
import cn from '@/utils/cnMerge';

type TractorsProps = {
  className?: string;
};

export const Technique = ({ className }: TractorsProps) => {
  const router = useRouter();

  const { useHook } = useProducts<z.ZodType<TractorProduct>>({
    schema: tractorProductSchema,
    filters: { type: ProductType.Tractor },
    populate: { image: true, images: true },
    limit: 4,
  });

  const { data, isLoading, isError } = useHook();

  if (isLoading)
    return (
      <div>
        <MapleSpinner />
      </div>
    );

  return (
    <SectionWrapper
      className={cn('lg:mb-section', className)}
      color="light"
      headline="Тракторы и техника"
      isSection
      isError={isError}
    >
      <div className="flex gap-6">
        {data?.data.map((product) => (
          <div key={product.id} className="flex-shrink-0">
            <Card
              title={product.name}
              subtitle={product.sku || null}
              price={product.price}
              image={product.image?.url}
              placeholder={CardPlaceholder.src}
              onTitleClick={
                product.slug ? () => router.push(detailRoutes.traktor(product.slug!)) : undefined
              }
            />
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
