'use client';

import { LawnProduct, ProductType } from '@canadian-lawn/api';
import { Button, Pic, Progress, Typography } from '@canadian-lawn/ui-kit';
import { useSession } from 'next-auth/react';
import React from 'react';
import { toast } from 'sonner';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { ProductDetailWrapper } from '@/components/sections/Product/ProductDetailWrapper';
import { useAddItemToCart } from '@/hooks/api/useCart';
import { useProductDetail } from '@/hooks/api/useProductDetail';
import { AuthStatus } from '@/types/enums';

type SelectedPackage = { weight: number; price: number; unit?: string };

const TopContent = ({ product }: { product: LawnProduct }) => {
  const session = useSession();
  const addItemMutation = useAddItemToCart(session.data?.user.jwt);
  const packages = product.lawn?.package ?? [];
  const [selected, setSelected] = React.useState<SelectedPackage | null>(packages[0] ?? null);
  const [image, setImage] = React.useState(product.images?.[0] ?? product.image ?? null);

  const handleAdd = React.useCallback(() => {
    if (session.status !== AuthStatus.Authenticated) {
      toast.error('Войдите в аккаунт, чтобы добавить товар в корзину');
      return;
    }
    addItemMutation.mutate(
      { productId: product.id, quantity: 1, price: selected?.price ?? product.price },
      {
        onSuccess: () => toast.success(`${product.name} добавлен в корзину`),
        onError: (error) => toast.error(`Ошибка: ${error.message}`),
      }
    );
  }, [session.status, addItemMutation, product, selected]);

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <div className="bg-baseWhite rounded-sm p-4 lg:rounded-lg lg:p-6 lg:py-[30px]">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="flex items-center gap-5 lg:flex-col">
              {product.images?.map((item) => (
                <Pic
                  key={item.id}
                  className="h-[82px] w-[82px] cursor-pointer rounded-sm p-4"
                  src={item.url}
                  onClick={() => setImage(item)}
                />
              ))}
            </div>
            <div className="flex w-full justify-center">
              <Pic src={image?.url} className="h-[180px] w-[180px] lg:h-[300px] lg:w-[300px]" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
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
            {product.lawn?.mix?.map((item, i) => (
              <div key={i} className="flex w-[80%] justify-between">
                <Typography>{item.product?.name}:</Typography>
                <Typography>{item.percent}%</Typography>
              </div>
            ))}
            {packages.length > 0 && (
              <div className="flex gap-1">
                {packages.map((pkg, i) => (
                  <Button
                    key={i}
                    disabled={selected?.weight === pkg.weight}
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
            <DetailsItem label="Сезонность" value={lawn.seasonality} />
            <DetailsItem label="Время первых всходов, дни" value={lawn.germinition_time} />
            <DetailsItem label="Время до полного покрытия, недели" value={lawn.full_cover_time} />
            <DetailsItem label="Плотность (побегов на 1 м²)" value={lawn.density} />
            <DetailsItem label="Теневыносливость" value={lawn.shade_tolerance} />
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
