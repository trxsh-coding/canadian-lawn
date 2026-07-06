'use client';

import { ProductCard } from '@canadian-lawn/ui-kit';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';

import Placeholder from '@/assets/img/lawn.png';
import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { Steps } from '@/components/layout/Steps/Steps';
import { CheckoutSidebar } from '@/components/sections/Cart/Checkout';
import { CheckoutForm } from '@/components/sections/Cart/CheckoutForm';
import { EmptyCart } from '@/components/sections/Cart/EmptyCart';
import { OrderSuccessModal } from '@/components/sections/Cart/OrderSuccessModal';
import { detailRoutes } from '@/config/routes';
import { useCart, useRemoveCartItem, useUpdateCartItem } from '@/hooks/api/useCart';
import { useCartStore } from '@/stores/cart';
import { AuthStatus } from '@/types/enums';
import cn from '@/utils/cnMerge';

export type CartStep = 'cart' | 'checkout';

const productDetailRoute: Partial<Record<string, (slug: string) => string>> = {
  lawn: detailRoutes.lawn,
  'lawn-mix': detailRoutes.lawnMix,
  tractor: detailRoutes.traktor,
  technique: detailRoutes.technique,
};

export const Cart = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const step = (searchParams.get('step') as CartStep) ?? 'cart';
  const setStep = (s: CartStep) => router.push(`?step=${s}`);

  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = React.useState(false);
  const submitRef = React.useRef<() => void>(() => {});

  const { status, data: session } = useSession();
  const { cart, guestItems, updateGuestItemQuantity, removeGuestItem } = useCartStore();

  const isSessionResolving = status === AuthStatus.loading;
  const isGuest = status === AuthStatus.UnAuthenticated;
  const token = session?.user.jwt;

  const updateItem = useUpdateCartItem(token);
  const removeItem = useRemoveCartItem(token);
  // Reads the same query cache CartConnector populates — avoids the one-tick lag
  // from mirroring isLoading into the zustand store via an effect.
  const { isLoading: isCartLoading } = useCart({
    enabled: status === AuthStatus.Authenticated,
    token,
  }).useHook();

  const items = React.useMemo(
    () =>
      isGuest
        ? guestItems.map((item) => ({
            id: `${item.productId}-${item.packageWeight ?? 'base'}`,
            cartItemId: item.productId,
            name: item.name,
            slug: item.slug,
            type: item.type,
            price: item.price,
            quantity: item.quantity,
            image: item.image,
            packageWeight: item.packageWeight ?? undefined,
            packageUnit: item.packageUnit ?? undefined,
          }))
        : (cart?.items ?? []).map((item) => ({
            id: String(item.id),
            cartItemId: item.id,
            name: item.product.name,
            slug: item.product.slug,
            type: item.product.type,
            price: item.price,
            quantity: item.quantity,
            image: item.product.image?.url,
            packageWeight: item.packageWeight ?? undefined,
            packageUnit: item.packageUnit ?? undefined,
          })),
    [isGuest, guestItems, cart?.items]
  );

  const total = React.useMemo(
    () => items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [items]
  );

  const handleQuantityChange = React.useCallback(
    (id: number, quantity: number, packageWeight?: number) => {
      if (isGuest) {
        if (quantity <= 0) removeGuestItem(id, packageWeight);
        else updateGuestItemQuantity(id, quantity, packageWeight);
      } else {
        if (quantity <= 0) removeItem.mutate(id);
        else updateItem.mutate({ id, data: { quantity } });
      }
    },
    [isGuest, updateGuestItemQuantity, removeGuestItem, updateItem, removeItem]
  );

  const handleDelete = React.useCallback(
    (id: number, packageWeight?: number) => {
      if (isGuest) removeGuestItem(id, packageWeight);
      else removeItem.mutate(id);
    },
    [isGuest, removeGuestItem, removeItem]
  );

  const registerSubmit = React.useCallback((fn: () => void) => {
    submitRef.current = fn;
  }, []);

  const isEmpty = items.length === 0;
  const showLoader = isSessionResolving || (!isGuest && isCartLoading);

  const stepComponents: Record<CartStep, React.ReactNode> = {
    cart: (
      <div className="flex flex-col gap-4">
        {items.map((item) => {
          const getRoute = item.type ? productDetailRoute[item.type] : undefined;
          const slug = item.slug;

          return (
            <ProductCard
              key={item.id}
              image={item.image || Placeholder.src}
              title={
                item.packageWeight
                  ? `${item.name}, ${item.packageWeight} ${item.packageUnit ?? 'кг'}`
                  : item.name
              }
              price={item.price * item.quantity}
              imageClassName="max-w-[200px] max-h-[156px]"
              onTitleClick={getRoute && slug ? () => router.push(getRoute(slug)) : undefined}
              count={item.quantity}
              handleButtonChange={(value) =>
                handleQuantityChange(item.cartItemId, value, item.packageWeight)
              }
              handleButtonClick={(increment) =>
                handleQuantityChange(
                  item.cartItemId,
                  increment ? item.quantity + 1 : item.quantity - 1,
                  item.packageWeight
                )
              }
              onDelete={() => handleDelete(item.cartItemId, item.packageWeight)}
            />
          );
        })}
      </div>
    ),
    checkout: (
      <CheckoutForm
        registerSubmit={registerSubmit}
        onSubmittingChange={setIsSubmitting}
        onSuccess={() => setIsOrderSuccessOpen(true)}
      />
    ),
  };

  return (
    <>
      <LayoutWrapper
        contentWrapperClassName={cn(
          '!px-0 !b-0 flex-reverse bg-primary !p-4',
          isEmpty && 'bg-baseWhite'
        )}
        contentContainerClassName={cn(
          '!rounded-sm lg:!p-section !bg-primary flex-col-reverse lg:flex',
          isEmpty && '!bg-baseWhite'
        )}
        title="Корзина"
        asideClassName="w-auto self-start lg:flex-[0.5] rounded-xl"
        mainClassName={cn(
          'lg:!mt-auto !flex-col-reverse lg:!flex-col bg-primary',
          isEmpty && '!bg-baseWhite'
        )}
        asideContent={
          !showLoader &&
          !isEmpty && (
            <CheckoutSidebar
              price={total}
              amount={items.length}
              step={step}
              isSubmitting={isSubmitting}
              onNext={() => setStep('checkout')}
              onBack={() => setStep('cart')}
              onSubmit={() => submitRef.current()}
            />
          )
        }
        asideReversed
      >
        {showLoader ? (
          <div className="bg-primary relative h-56 w-full rounded-sm">
            <MapleSpinner />
          </div>
        ) : isEmpty ? (
          <EmptyCart />
        ) : (
          <Steps steps={stepComponents} activeStep={step} />
        )}
      </LayoutWrapper>

      <OrderSuccessModal open={isOrderSuccessOpen} onOpenChange={setIsOrderSuccessOpen} />
    </>
  );
};
