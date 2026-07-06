'use client';

import { LawnProduct, Media } from '@canadian-lawn/api';
import { Button, Pic, Progress, Typography } from '@canadian-lawn/ui-kit';
import Link from 'next/link';
import React from 'react';

import Placeholder from '@/assets/img/lawn-placeholder.png';
import { PlantingPeriodRange } from '@/components/atoms/PlantingPeriodRange';
import { detailRoutes } from '@/config/routes';
import cn from '@/utils/cnMerge';

type TopContentProps = {
  product?: LawnProduct;
};

export const TopContent = ({ product }: TopContentProps) => {
  const packages = product?.lawn?.package ?? [];
  const [selectedPkg, setSelectedPkg] = React.useState(packages[0] ?? null);
  const [image, setImage] = React.useState<Media | null>(
    product?.images?.[0] ?? product?.image ?? null
  );
  return (
    <div className="flex flex-1 flex-col gap-2 lg:flex-row">
      <div className="bg-baseWhite flex-1 rounded-sm p-4 lg:rounded-lg lg:p-6 lg:py-[30px]">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="flex items-center gap-5 lg:flex-col">
              {product?.images?.map((item) => (
                <Pic
                  key={item.id}
                  className={cn(
                    'h-[82px] w-[82px] cursor-pointer rounded-sm p-4',
                    item.id === image?.id && 'bg-baseSilvery'
                  )}
                  src={item.url}
                  onClick={() => setImage(item)}
                />
              ))}
            </div>
            <div className="flex w-full justify-center">
              <Pic
                src={image?.url || Placeholder.src}
                className="h-[180px] w-[180px] lg:h-[300px] lg:w-[300px]"
              />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Typography view="large1">{product?.name}</Typography>
            <div className="flex w-full max-w-full gap-4">
              {product?.lawn?.speed && (
                <Progress
                  progress={product.lawn.speed}
                  titleClassName="!text-baseBlack"
                  title="скорость роста"
                  className="ui:max-w-full"
                />
              )}
              {product?.lawn?.resistance && (
                <Progress
                  progress={product.lawn.resistance}
                  titleClassName="!text-baseBlack"
                  title="устойчивость"
                />
              )}
            </div>
            {product?.lawn?.mix?.map((item, i) => {
              const slug = item.product?.slug;

              return (
                <div key={i} className="flex w-[80%] justify-between">
                  {slug ? (
                    <Link href={detailRoutes.lawn(slug)}>
                      <Typography color="base-black" className="hover:underline">
                        {item.product?.name}:
                      </Typography>
                    </Link>
                  ) : (
                    <Typography>{item.product?.name}:</Typography>
                  )}
                  <Typography>{item.percent}%</Typography>
                </div>
              );
            })}
            <PlantingPeriodRange landing={product?.lawn?.landing} />
            <div className="flex gap-1">
              {packages.map((pkg, i) => (
                <Button
                  key={i}
                  disabled={selectedPkg?.weight !== pkg.weight}
                  radius="large"
                  width="fit"
                  onClick={() => setSelectedPkg(pkg)}
                >
                  {pkg.weight} {pkg.unit ?? 'кг'}
                </Button>
              ))}
            </div>
            <div>
              <Typography color="secondary-grey">
                {selectedPkg
                  ? `${selectedPkg.weight} ${selectedPkg.unit ?? 'кг'} за ${selectedPkg.price} руб`
                  : `${product?.price} руб`}
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 ml-2 flex flex-col gap-4">
        <Typography color="base-white" view="large1">
          {selectedPkg?.price ?? product?.price} ₽
        </Typography>
        <Button suffixIconName="common/cart">Добавить в корзину</Button>
      </div>
    </div>
  );
};
