'use client';

import { MachineryProduct, ProductType } from '@canadian-lawn/api';
import { Button, Pic, Typography } from '@canadian-lawn/ui-kit';
import { useSession } from 'next-auth/react';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { ProductDetailWrapper } from '@/components/sections/Product/ProductDetailWrapper';
import { useAddItemToCart } from '@/hooks/api/useCart';
import { useProductDetail } from '@/hooks/api/useProductDetail';
import { AuthStatus } from '@/types/enums';

const TopContent = ({ product }: { product: MachineryProduct }) => {
  const session = useSession();
  const addItemMutation = useAddItemToCart(session.data?.user.jwt);

  const handleAdd = useCallback(() => {
    if (session.status !== AuthStatus.Authenticated) {
      toast.error('Войдите в аккаунт, чтобы добавить товар в корзину');
      return;
    }
    addItemMutation.mutate(
      { productId: product.id, quantity: 1, price: product.price },
      {
        onSuccess: () => toast.success(`${product.name} добавлен в корзину`),
        onError: (error) => toast.error(`Ошибка: ${error.message}`),
      }
    );
  }, [session.status, addItemMutation, product]);

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <div className="bg-baseWhite rounded-sm p-4 lg:rounded-lg lg:p-6 lg:py-[30px]">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex w-full justify-center lg:justify-start">
            <Pic
              src={product.image?.url}
              className="h-[180px] w-[180px] lg:h-[300px] lg:w-[300px]"
            />
          </div>
          <div className="flex flex-col gap-5">
            <Typography view="large1">{product.name}</Typography>
            {product.sku && <Typography color="secondary-grey">Артикул: {product.sku}</Typography>}
            <Typography view="large1">{product.price} ₽</Typography>
            {product.old_price && (
              <Typography color="secondary-grey" className="line-through">
                {product.old_price} ₽
              </Typography>
            )}
          </div>
        </div>
      </div>
      <div className="mt-4 ml-2 flex flex-col gap-4">
        <Button suffixIconName="common/cart" onClick={handleAdd}>
          Добавить в корзину
        </Button>
      </div>
    </div>
  );
};

const DetailContent = ({ product }: { product: MachineryProduct }) => (
  <div className="bg-baseWhite flex flex-col gap-8 rounded-sm p-8">
    <div className="flex flex-col gap-4">
      <Typography view="card-price" weight="bold">
        Описание
      </Typography>
      <Typography>{product.description}</Typography>
    </div>
    {product.quantity != null && (
      <Typography color="secondary-grey">В наличии: {product.quantity} шт.</Typography>
    )}
  </div>
);

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
