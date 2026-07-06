'use client';

import { OrderFormData, orderSchema } from '@canadian-lawn/api';
import { Button, Input, Typography } from '@canadian-lawn/ui-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { ROUTES } from '@/config/routes';
import { useCheckout } from '@/hooks/api/useCheckout';
import { useCartStore } from '@/stores/cart';
import { AuthStatus } from '@/types/enums';

export const CheckoutPage = () => {
  const router = useRouter();
  const { status, data: session } = useSession();
  const { clearGuestItems, clearCart } = useCartStore();
  const checkout = useCheckout();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: { deliveryType: 'pickup', name: '', phone: '', email: '' },
  });

  const deliveryType = watch('deliveryType');

  const onSubmit = React.useCallback(
    async (formData: OrderFormData) => {
      if (status === AuthStatus.loading) return;

      // Read at call-time — avoids stale closure and hydration race
      const token = session?.user.jwt;
      const isGuest = !token;
      const currentGuestItems = useCartStore.getState().guestItems ?? [];

      try {
        await checkout.mutateAsync({
          ...formData,
          token,
          items: isGuest
            ? currentGuestItems.map((i) => ({
                productId: i.productId,
                quantity: i.quantity,
                price: i.price,
              }))
            : undefined,
        });

        if (isGuest) clearGuestItems();
        else clearCart();

        router.push('/checkout/success');
      } catch {
        toast.error('Ошибка при оформлении заказа. Попробуйте ещё раз.');
      }
    },
    [checkout, status, session, clearGuestItems, clearCart, router]
  );

  return (
    <div className="bg-baseBg min-h-screen px-4 py-8 lg:px-16 lg:py-12">
      <div className="mx-auto max-w-[600px]">
        <Typography view="large1" className="mb-8">
          Оформление заказа
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div className="bg-baseWhite flex flex-col gap-4 rounded-sm p-6">
            <Typography view="card-price" weight="bold">
              Контактные данные
            </Typography>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  inputType="default"
                  placeholder="Имя *"
                  value={field.value}
                  onChangeValue={(v) => field.onChange(v)}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  inputType="default"
                  placeholder="Телефон *"
                  type="tel"
                  value={field.value}
                  onChangeValue={(v) => field.onChange(v)}
                  errorMessage={errors.phone?.message}
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  inputType="default"
                  placeholder="Email (необязательно)"
                  value={field.value ?? ''}
                  onChangeValue={(v) => field.onChange(v)}
                  errorMessage={errors.email?.message}
                />
              )}
            />
          </div>

          <div className="bg-baseWhite flex flex-col gap-4 rounded-sm p-6">
            <Typography view="card-price" weight="bold">
              Способ получения
            </Typography>

            <Controller
              name="deliveryType"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-3">
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      value="pickup"
                      checked={field.value === 'pickup'}
                      onChange={() => field.onChange('pickup')}
                      className="accent-green-600"
                    />
                    <Typography>Самовывоз</Typography>
                  </label>
                  <label className="flex cursor-pointer items-center gap-3">
                    <input
                      type="radio"
                      value="courier"
                      checked={field.value === 'courier'}
                      onChange={() => field.onChange('courier')}
                      className="accent-green-600"
                    />
                    <Typography>Доставка</Typography>
                  </label>
                </div>
              )}
            />

            {deliveryType === 'courier' && (
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <Input
                    inputType="default"
                    placeholder="Адрес доставки"
                    value={field.value ?? ''}
                    onChangeValue={(v) => field.onChange(v)}
                    errorMessage={errors.address?.message}
                  />
                )}
              />
            )}
          </div>

          <div className="flex gap-3">
            <Button
              color="secondary"
              width="fill"
              type="button"
              onClick={() => router.push(ROUTES.cart.url)}
            >
              Назад
            </Button>
            <Button
              width="fill"
              type="submit"
              disabled={checkout.isPending || status === AuthStatus.loading}
            >
              {checkout.isPending ? 'Оформляем...' : 'Подтвердить заказ'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
