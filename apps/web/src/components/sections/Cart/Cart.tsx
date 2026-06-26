'use client';

import { ProductCard } from '@canadian-lawn/ui-kit';
import React from 'react';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { CheckoutSidebar } from '@/components/sections/Cart/Checkout';
import { EmptyCart } from '@/components/sections/Cart/EmptyCart';
import { useCartStore } from '@/stores/cart';
import cn from '@/utils/cnMerge';

export const Cart = () => {
  const { cart } = useCartStore();

  const isEmpty = React.useMemo(() => !cart?.items.length, [cart?.items.length]);

  const total = React.useMemo(
    () => cart?.total || cart?.items.reduce((acc, item) => acc + item.price, 0),
    [cart?.items, cart?.total]
  );

  return (
    <LayoutWrapper
      contentWrapperClassName={cn('!px-0 !b-0 flex-reverse', isEmpty && 'bg-baseWhite')}
      contentContainerClassName={cn('!rounded-sm lg:!p-section', isEmpty && 'bg-baseWhite')}
      title="Корзина"
      asideClassName="w-auto flex-[0.5]"
      mainClassName="lg:!mt-auto "
      asideContent={
        !isEmpty && <CheckoutSidebar price={total || 0} amount={cart?.items.length || 0} />
      }
      asideReversed
    >
      {isEmpty ? (
        <EmptyCart />
      ) : (
        <div>
          {cart?.items.map(({ product, quantity }) => (
            <ProductCard
              image={product.image?.url || ''}
              title={product.name}
              handleButtonChange={() => null}
              handleButtonClick={() => null}
              count={quantity}
            />
          ))}
        </div>
      )}
    </LayoutWrapper>
  );
};
