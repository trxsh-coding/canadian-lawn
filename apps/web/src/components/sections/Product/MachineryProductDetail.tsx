'use client';

import { MachineryProduct, machineryProductSchema, ProductType } from '@canadian-lawn/api';
import { Button, Card, Carousel, Pic, Typography } from '@canadian-lawn/ui-kit';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { z } from 'zod';

import CardPlaceholder from '@/assets/img/card-placeholder.png';
import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { ProductDetailWrapper } from '@/components/sections/Product/ProductDetailWrapper';
import { detailRoutes, ROUTES } from '@/config/routes';
import { useProductDetail } from '@/hooks/api/useProductDetail';
import { useProducts } from '@/hooks/api/useProducts';
import { useAddToCart } from '@/hooks/useAddToCart';
import cn from '@/utils/cnMerge';

type MachineryType = ProductType.Tractor | ProductType.Technique;

const productDetailRoute: Record<MachineryType, (slug: string) => string> = {
  [ProductType.Tractor]: detailRoutes.traktor,
  [ProductType.Technique]: detailRoutes.technique,
};

const RelatedProducts = ({
  title,
  type,
  excludeId,
}: {
  title: string;
  type: MachineryType;
  excludeId?: number;
}) => {
  const router = useRouter();

  const { useHook } = useProducts<z.ZodType<MachineryProduct>>({
    schema: machineryProductSchema,
    filters: { type },
    populate: { image: true },
    limit: 10,
  });

  const { data, isError } = useHook();
  const items = data?.data.filter((item) => item.id !== excludeId) ?? [];

  if (isError || !items.length) return null;

  const getRoute = productDetailRoute[type];

  return (
    <div className="flex flex-col gap-4">
      <Typography view="heading2" weight="bold">
        {title}
      </Typography>
      <Carousel>
        {items.map((item) => (
          <div key={item.id} className="w-[280px] flex-shrink-0">
            <Card
              title={item.name}
              subtitle={item.sku || null}
              price={item.price}
              image={item.image?.url}
              placeholder={CardPlaceholder.src}
              onTitleClick={item.slug ? () => router.push(getRoute(item.slug!)) : undefined}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

const TopContent = ({ product }: { product: MachineryProduct }) => {
  const { addToCart } = useAddToCart();
  const images = product.images?.length ? product.images : product.image ? [product.image] : [];
  const [image, setImage] = React.useState(images[0] ?? null);
  const subtitle = product.description?.split('\n')[0];

  const handleAdd = useCallback(() => {
    addToCart({
      productId: product.id,
      name: product.name,
      slug: product.slug,
      type: product.type,
      price: product.price,
      quantity: 1,
      image: product.image?.url,
    });
  }, [addToCart, product]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 lg:flex-row">
        <div className="bg-baseWhite flex flex-col gap-5 rounded-sm p-4 lg:rounded-lg lg:p-6">
          <div className="flex flex-col gap-2">
            <Typography view="large1" weight="semibold">
              {product.name}
            </Typography>
            {subtitle && <Typography color="secondary-grey">{subtitle}</Typography>}
          </div>
          <Pic
            src={image?.url}
            skeleton={CardPlaceholder.src}
            className="h-[220px] w-full rounded-sm lg:h-[352px] lg:w-[625px]"
          />
          {images.length > 1 && (
            <div className="flex flex-wrap gap-1">
              {images.map((item) => (
                <div
                  key={item.id}
                  className={cn(
                    'cursor-pointer rounded-sm p-2',
                    image?.id === item.id && 'bg-baseBg'
                  )}
                  onClick={() => setImage(item)}
                >
                  <Pic
                    src={item.url}
                    skeleton={CardPlaceholder.src}
                    className="h-[50px] w-[75px] rounded-xs"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-4 ml-2 flex flex-col gap-4 lg:w-[300px]">
          <div className="flex flex-col gap-1">
            <Typography view="large1">{product.price} ₽</Typography>
            {product.old_price && (
              <Typography color="secondary-grey" className="line-through">
                {product.old_price} ₽
              </Typography>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button suffixIconName="common/cart" onClick={handleAdd}>
              Добавить в корзину
            </Button>
            <Button color="secondary" as={Link} href={ROUTES.contact.url}>
              Заказать звонок
            </Button>
          </div>
          <Typography color="secondary-grey" className="!text-sm">
            Доставка по России или самовывоз из склада в Москве. Гарантия производителя 5 лет.
            Возможность лизинга и оплаты частями.
          </Typography>
        </div>
      </div>
      <RelatedProducts title="Подходит к модели" type={product.type} excludeId={product.id} />
    </div>
  );
};

const DetailsItem = ({ label, value }: { label: string; value?: string | number | null }) =>
  value != null ? (
    <div className="flex">
      <Typography color="secondary-grey" className="flex-[0.5]">
        {label}
      </Typography>
      <Typography>{value}</Typography>
    </div>
  ) : null;

const DetailContent = ({ product }: { product: MachineryProduct }) => {
  const characteristics = product.characteristic ?? [];

  return (
    <div className="flex flex-col gap-8">
      <div className="bg-baseWhite flex flex-col gap-8 rounded-sm p-8">
        <div className="flex flex-col gap-4">
          <Typography view="card-price" weight="bold">
            Описание
          </Typography>
          <Typography>{product.description}</Typography>
        </div>
        {(product.sku || product.quantity != null) && (
          <div className="flex flex-col gap-3">
            <DetailsItem label="Артикул" value={product.sku} />
            <DetailsItem
              label="В наличии"
              value={product.quantity != null ? `${product.quantity} шт.` : null}
            />
          </div>
        )}
      </div>

      {characteristics.length > 0 && (
        <div className="bg-baseWhite flex flex-col gap-6 rounded-sm p-8">
          <Typography view="card-price" weight="bold">
            Характеристики
          </Typography>
          <div className="flex flex-col gap-3">
            {characteristics.map((item) => (
              <DetailsItem key={item.id} label={item.name ?? ''} value={item.value} />
            ))}
          </div>
        </div>
      )}

      <RelatedProducts title="Тракторы" type={ProductType.Tractor} excludeId={product.id} />
      <RelatedProducts title="Техника" type={ProductType.Technique} excludeId={product.id} />
    </div>
  );
};

export const MachineryProductDetail = ({ slug }: { slug: string }) => {
  const { useHook } = useProductDetail({ slug });
  const { data, isLoading, isError } = useHook();
  const product = data?.data;

  if (isLoading) return <MapleSpinner />;
  if (isError || !product) return null;

  if (product.type !== ProductType.Tractor && product.type !== ProductType.Technique) return null;

  return (
    <ProductDetailWrapper topContent={<TopContent product={product} />}>
      <DetailContent product={product} />
    </ProductDetailWrapper>
  );
};
