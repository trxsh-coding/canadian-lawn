'use client';

import { LawnProduct, ProductType } from '@canadian-lawn/api';
import { Button, Pic, Progress, Typography } from '@canadian-lawn/ui-kit';
import Link from 'next/link';
import React from 'react';

import CardPlaceholder from '@/assets/img/lawn-placeholder.png';
import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { PlantingPeriodRange } from '@/components/atoms/PlantingPeriodRange';
import { ProductDetailWrapper } from '@/components/sections/Product/ProductDetailWrapper';
import { detailRoutes } from '@/config/routes';
import { useProductDetail } from '@/hooks/api/useProductDetail';
import { useAddToCart } from '@/hooks/useAddToCart';
import cn from '@/utils/cnMerge';
import { formatPlantingPeriod } from '@/utils/months';

type SelectedPackage = { weight: number; price: number; unit?: string };

const TopContent = ({ product }: { product: LawnProduct }) => {
  const { addToCart } = useAddToCart();
  const packages = product.lawn?.package ?? [];
  const [selected, setSelected] = React.useState<SelectedPackage | null>(packages[0] ?? null);
  const [image, setImage] = React.useState(product.images?.[0] ?? product.image ?? null);

  const handleAdd = React.useCallback(() => {
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
    });
  }, [addToCart, product, selected]);

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <div className="bg-baseWhite flex-1 rounded-sm p-4 lg:rounded-lg lg:p-6 lg:py-[30px] xl:flex-[0.7]">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="flex items-center gap-5 lg:flex-col">
              {product.images?.map((item) => (
                <Pic
                  key={item.id}
                  className={cn(
                    'h-[82px] w-[82px] cursor-pointer rounded-sm p-4',
                    item.id === image?.id && 'bg-baseSilvery'
                  )}
                  src={item.url}
                  skeleton={CardPlaceholder.src}
                  onClick={() => setImage(item)}
                />
              ))}
            </div>
            <div className="flex w-full justify-center">
              <Pic
                src={image?.url}
                skeleton={CardPlaceholder.src}
                className="h-[180px] w-[180px] lg:h-[300px] lg:w-[300px]"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-5">
            <Typography view="large1">{product.name}</Typography>
            <div className="flex w-full max-w-full gap-4">
              {product.lawn?.speed != null && (
                <Progress
                  progress={product.lawn.speed}
                  titleClassName="!text-baseBlack"
                  title="скорость роста"
                  className="ui:max-w-full"
                />
              )}
              {product.lawn?.resistance != null && (
                <Progress
                  progress={product.lawn.resistance}
                  titleClassName="!text-baseBlack"
                  title="устойчивость"
                />
              )}
            </div>
            {product.lawn?.mix?.map((item, i) => {
              const slug = item.product?.slug;

              return (
                <div key={i} className="flex w-[80%] justify-between">
                  {slug ? (
                    <Link href={detailRoutes.lawn(slug)}>
                      <Typography color="primary" className="hover:underline">
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
            <PlantingPeriodRange landing={product.lawn?.landing} />
            {packages.length > 0 && (
              <div className="flex gap-1">
                {packages.map((pkg, i) => (
                  <Button
                    key={i}
                    disabled={selected?.weight !== pkg.weight}
                    radius="large"
                    width="fit"
                    onClick={() => setSelected(pkg)}
                  >
                    {pkg.weight} {pkg.unit ?? 'кг'}
                  </Button>
                ))}
              </div>
            )}
            <Typography color="secondary-grey">
              {selected
                ? `${selected.weight} ${selected.unit ?? 'кг'} за ${selected.price} руб`
                : `${product.price} руб`}
            </Typography>
          </div>
        </div>
      </div>
      <div className="mt-4 ml-2 flex flex-col gap-4">
        <Typography color="base-white" view="large1">
          {selected?.price ?? product.price} ₽
        </Typography>
        <Button suffixIconName="common/cart" onClick={handleAdd}>
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
};

const DetailContent = ({ product }: { product: LawnProduct }) => {
  const lawn = product.lawn;
  const purpose = product.categories
    ?.map((category) => category.name)
    .filter(Boolean)
    .join(', ');
  const plantingPeriod = formatPlantingPeriod(lawn?.landing);

  const DetailsItem = ({ label, value }: { label: string; value?: string | number | null }) =>
    value ? (
      <div className="flex">
        <Typography color="secondary-grey" className="flex-[0.5]">
          {label}
        </Typography>
        <Typography>{value}</Typography>
      </div>
    ) : null;

  return (
    <div className="bg-baseWhite flex flex-col gap-8 rounded-sm p-8">
      <div className="flex flex-col gap-4">
        <Typography view="card-price" weight="bold">
          Описание
        </Typography>
        <Typography>{product.description}</Typography>
      </div>
      {lawn && (
        <div className="flex flex-col gap-4">
          <Typography view="card-price" weight="bold">
            Характеристики
          </Typography>
          <div className="flex flex-col gap-3">
            <DetailsItem label="Назначение" value={purpose} />
            <DetailsItem label="Сезонность" value={lawn.seasonality} />
            <DetailsItem label="Время первых всходов, дни" value={lawn.germinition_time} />
            <DetailsItem
              label="Время до полного покрытия участка, недели"
              value={lawn.full_cover_time}
            />
            <DetailsItem label="Плотность (количество побегов на 1 м²)" value={lawn.density} />
            <DetailsItem label="Теневыносливость" value={lawn.shade_tolerance} />
            <DetailsItem label="Период высадки" value={plantingPeriod} />
          </div>
        </div>
      )}
      {product.sku && <Typography color="secondary-grey">Артикул: {product.sku}</Typography>}
    </div>
  );
};

export const LawnProductDetail = ({ slug }: { slug: string }) => {
  const { useHook } = useProductDetail({ slug });
  const { data, isLoading, isError } = useHook();
  const product = data?.data;

  if (isLoading) return <MapleSpinner />;
  if (isError || !product) return null;

  if (product.type !== ProductType.Lawn && product.type !== ProductType.LawnMix) return null;

  return (
    <ProductDetailWrapper topContent={<TopContent product={product} />}>
      <DetailContent product={product} />
    </ProductDetailWrapper>
  );
};
