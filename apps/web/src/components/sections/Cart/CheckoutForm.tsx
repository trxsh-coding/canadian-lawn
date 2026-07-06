'use client';

import { OrderFormData, orderSchema } from '@canadian-lawn/api';
import { Checkbox, Input, Typography } from '@canadian-lawn/ui-kit';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  DeliveryAddress,
  DeliveryAddressModal,
  formatDeliveryAddress,
} from '@/components/sections/Cart/DeliveryAddressModal';
import { useCheckout } from '@/hooks/api/useCheckout';
import { useMe } from '@/hooks/api/useMe';
import { useCartStore } from '@/stores/cart';
import { AuthStatus } from '@/types/enums';
import cn from '@/utils/cnMerge';

type CheckoutFormProps = {
  registerSubmit: (fn: () => void) => void;
  onSubmittingChange: (v: boolean) => void;
  onSuccess: () => void;
};

type RadioRowProps = {
  selected: boolean;
  title: string;
  subtitle?: string;
  note?: string;
  onSelect: () => void;
};

const RadioRow = ({ selected, title, subtitle, note, onSelect }: RadioRowProps) => (
  <label className="flex w-full cursor-pointer items-start justify-between gap-3 py-2">
    <div className="flex flex-1 items-start gap-3">
      <span
        className={cn(
          'mt-[3px] flex size-6 shrink-0 items-center justify-center rounded-full border-2',
          selected ? 'border-tertiary' : 'border-baseSilvery'
        )}
      >
        {selected && <span className="bg-tertiary size-3 rounded-full" />}
        <input type="radio" checked={selected} onChange={onSelect} className="sr-only" />
      </span>
      <div className="flex flex-1 flex-col gap-2">
        <Typography view="card-price" weight="semibold">
          {title}
        </Typography>
        {subtitle && (
          <Typography view="small" color="secondary-grey">
            {subtitle}
          </Typography>
        )}
      </div>
    </div>
    {note && (
      <Typography view="regular" weight="semibold" whiteSpace="nowrap">
        {note}
      </Typography>
    )}
  </label>
);

const Divider = () => <div className="bg-baseBg h-px w-full" />;

export const CheckoutForm = ({
  registerSubmit,
  onSubmittingChange,
  onSuccess,
}: CheckoutFormProps) => {
  const { status, data: session } = useSession();
  const { clearGuestItems, clearCart } = useCartStore();
  const checkout = useCheckout();
  const { useHook: useMeHook } = useMe(session?.user.jwt);
  const { data: currentUser } = useMeHook();

  const [isAddressModalOpen, setIsAddressModalOpen] = React.useState(false);
  const [deliveryAddress, setDeliveryAddress] = React.useState<DeliveryAddress | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      paymentType: 'online',
      deliveryType: 'pickup',
      name: '',
      surname: '',
      patronymic: '',
      phone: '',
      email: '',
      comment: '',
      consentPersonalData: true,
      consentAds: false,
    },
  });

  const deliveryType = watch('deliveryType');
  const comment = watch('comment');

  React.useEffect(() => {
    setValue(
      'address',
      deliveryType === 'courier' && deliveryAddress ? formatDeliveryAddress(deliveryAddress) : '',
      { shouldValidate: true }
    );
  }, [deliveryType, deliveryAddress, setValue]);

  const appliedUserDefaults = React.useRef(false);

  React.useEffect(() => {
    if (appliedUserDefaults.current || !currentUser) return;

    appliedUserDefaults.current = true;

    if (currentUser.firstname) setValue('name', currentUser.firstname);
    if (currentUser.lastname) setValue('surname', currentUser.lastname);
    if (currentUser.patronymic) setValue('patronymic', currentUser.patronymic);
    if (currentUser.phone != null) setValue('phone', String(currentUser.phone));
    if (currentUser.email) setValue('email', currentUser.email);
    if (currentUser.address) {
      setDeliveryAddress({
        city: '',
        street: currentUser.address,
        apartment: '',
        intercom: '',
        entrance: '',
        floor: '',
      });
    }
  }, [currentUser, setValue]);

  const onSubmit = React.useCallback(
    async (formData: OrderFormData) => {
      if (status === AuthStatus.loading) return;

      const token = session?.user.jwt;
      const isGuest = !token;
      const currentGuestItems = useCartStore.getState().guestItems ?? [];

      onSubmittingChange(true);
      try {
        await checkout.mutateAsync({
          ...formData,
          token,
          items: isGuest
            ? currentGuestItems.map((i) => ({
                productId: i.productId,
                quantity: i.quantity,
                price: i.price,
                packageWeight: i.packageWeight,
                packageUnit: i.packageUnit,
              }))
            : undefined,
        });

        if (isGuest) clearGuestItems();
        else clearCart();

        onSuccess();
      } catch {
        toast.error('Ошибка при оформлении заказа. Попробуйте ещё раз.');
      } finally {
        onSubmittingChange(false);
      }
    },
    [checkout, status, session, clearGuestItems, clearCart, onSubmittingChange, onSuccess]
  );

  // Always keep ref to latest submit so parent calls current version
  const latestSubmitRef = React.useRef<() => void>(() => {});
  React.useEffect(() => {
    latestSubmitRef.current = handleSubmit(onSubmit);
  });
  React.useEffect(() => {
    registerSubmit(() => latestSubmitRef.current());
  }, [registerSubmit]);

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-baseWhite flex flex-col gap-5 rounded-sm p-6">
        <Typography view="large1">Способ оплаты</Typography>

        <Controller
          name="paymentType"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-4">
              <RadioRow
                selected={field.value === 'invoice'}
                onSelect={() => field.onChange('invoice')}
                title="Счёт фактура"
                subtitle="Юридические лица (НКО,ООО, АО, ИП и др.)"
                note="без комиссии"
              />
              <Divider />
              <RadioRow
                selected={field.value === 'online'}
                onSelect={() => field.onChange('online')}
                title="Онлайн оплата СБП, Картой, QR"
                subtitle="Физлица"
                note="4% комиссия банка"
              />
            </div>
          )}
        />
      </div>

      <div className="bg-baseWhite flex flex-col gap-5 rounded-sm p-6">
        <Typography view="large1">Способ получения</Typography>

        <Controller
          name="deliveryType"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-4">
              <RadioRow
                selected={field.value === 'russia'}
                onSelect={() => field.onChange('russia')}
                title="Доставка по России"
                subtitle="Деловые линии"
                note="Рассчитает менеджер"
              />
              <Divider />
              <RadioRow
                selected={field.value === 'courier'}
                onSelect={() => field.onChange('courier')}
                title="Курьер по Москве и Подмосковью"
                subtitle="не более 15 км от МКАДа, в течение 12–48 часов"
                note="от 500 ₽"
              />

              {field.value === 'courier' && (
                <div
                  className="bg-baseBg -mt-2 ml-9 flex cursor-pointer items-center justify-between gap-3 rounded-xs px-3 py-2.5"
                  onClick={() => setIsAddressModalOpen(true)}
                >
                  <Typography
                    view="small"
                    color={errors.address ? 'secondary-red' : 'secondary-grey'}
                  >
                    {deliveryAddress
                      ? formatDeliveryAddress(deliveryAddress)
                      : (errors.address?.message ?? 'Укажите адрес доставки')}
                  </Typography>
                  <Typography view="small" weight="semibold" color="tertiary" className="shrink-0">
                    {deliveryAddress ? 'Изменить' : 'Указать'}
                  </Typography>
                </div>
              )}

              <Divider />
              <RadioRow
                selected={field.value === 'pickup'}
                onSelect={() => field.onChange('pickup')}
                title="Самовывоз"
                subtitle="Наши склады в Москве"
                note="Бесплатно"
              />
            </div>
          )}
        />
      </div>

      <div className="bg-baseWhite flex flex-col gap-5 rounded-sm p-6">
        <Typography view="large1">Контакты</Typography>

        <div className="flex flex-col gap-3">
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <Input
                inputType="default"
                className="!bg-baseBg"
                placeholder="Почта* (для отправки документов и статуса заявки)"
                value={field.value ?? ''}
                onChangeValue={(v) => field.onChange(v)}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <Input
                inputType="default"
                className="!bg-baseBg"
                placeholder="Телефон* (для связи)"
                type="tel"
                value={field.value}
                onChangeValue={(v) => field.onChange(v)}
                errorMessage={errors.phone?.message}
              />
            )}
          />
        </div>

        <Typography view="card-price" weight="semibold">
          Данные для связи и получения заказа
        </Typography>

        <div className="flex flex-col gap-3">
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                inputType="default"
                className="!bg-baseBg"
                placeholder="Имя*"
                value={field.value}
                onChangeValue={(v) => field.onChange(v)}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            name="surname"
            control={control}
            render={({ field }) => (
              <Input
                inputType="default"
                className="!bg-baseBg"
                placeholder="Фамилия*"
                value={field.value}
                onChangeValue={(v) => field.onChange(v)}
                errorMessage={errors.surname?.message}
              />
            )}
          />

          <Controller
            name="patronymic"
            control={control}
            render={({ field }) => (
              <Input
                inputType="default"
                className="!bg-baseBg"
                placeholder="Отчество (обязательно при доставке по России)"
                value={field.value ?? ''}
                onChangeValue={(v) => field.onChange(v)}
                errorMessage={deliveryType === 'russia' ? errors.patronymic?.message : undefined}
              />
            )}
          />

          <Controller
            name="comment"
            control={control}
            render={({ field }) => (
              <div className="bg-baseBg relative flex flex-col gap-2 rounded-xs px-3 py-2.5">
                <textarea
                  {...field}
                  maxLength={1000}
                  placeholder="Комментарий к заказу — информация для менеджера"
                  className="min-h-[80px] w-full resize-none border-0 bg-transparent text-sm focus:outline-none"
                />
                <Typography
                  view="small"
                  color="secondary-grey"
                  className="self-end"
                >{`${comment?.length ?? 0}/1000`}</Typography>
              </div>
            )}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Controller
            name="consentPersonalData"
            control={control}
            render={({ field }) => (
              <label className="flex cursor-pointer items-start gap-2">
                <Checkbox active={field.value} onClick={() => field.onChange(!field.value)} />
                <Typography view="regular">
                  Я даю согласие на обработку персональных данных в соответствии с Политикой
                  обработки персональных данных
                </Typography>
              </label>
            )}
          />

          <Controller
            name="consentAds"
            control={control}
            render={({ field }) => (
              <label className="flex cursor-pointer items-start gap-2">
                <Checkbox active={!!field.value} onClick={() => field.onChange(!field.value)} />
                <Typography view="regular">
                  Я даю согласие на получение рекламных рассылок в виде e-mail, СМС, push или в
                  мессенджерах
                </Typography>
              </label>
            )}
          />
        </div>
      </div>

      <DeliveryAddressModal
        open={isAddressModalOpen}
        onOpenChange={setIsAddressModalOpen}
        initialValue={deliveryAddress}
        onConfirm={setDeliveryAddress}
      />
    </div>
  );
};
