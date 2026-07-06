'use client';

import { Button, Typography } from '@canadian-lawn/ui-kit';
import React from 'react';

import { CartStep } from '@/components/sections/Cart/Cart';

type CheckoutSidebarProps = {
  price: number;
  amount: number;
  step: CartStep;
  isSubmitting: boolean;
  onNext: () => void;
  onBack: () => void;
  onSubmit: () => void;
};

export const CheckoutSidebar = ({
  price,
  amount,
  step,
  isSubmitting,
  onNext,
  onBack,
  onSubmit,
}: CheckoutSidebarProps) => {
  return (
    <div className="overflow-none flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between">
        <Typography view="large1">Всего</Typography>
        <Typography view="large1" color="secondary-red">
          {price} ₽
        </Typography>
      </div>
      <div className="flex justify-between">
        <Typography view="card-price">Ваш заказ</Typography>
        <Typography view="regular" color="secondary-grey">
          {amount} товаров
        </Typography>
      </div>

      {/*{step === 'cart' && (*/}
      {/*  <div>*/}
      {/*    <Input*/}
      {/*      value={promo}*/}
      {/*      className="!bg-baseBg"*/}
      {/*      placeholder="Введите промокод"*/}
      {/*      inputType="default"*/}
      {/*      suffixIcon="common/telegram"*/}
      {/*      onChangeValue={setPromo}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}

      {step === 'cart' ? (
        <Button onClick={onNext}>Перейти к оформлению</Button>
      ) : (
        <div className="flex flex-col gap-3">
          <Button color="secondary" onClick={onBack} disabled={isSubmitting}>
            Назад
          </Button>
          <Button onClick={onSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Оформляем...' : 'Подтвердить заказ'}
          </Button>
        </div>
      )}
    </div>
  );
};
