import { Button, Input, Typography } from '@canadian-lawn/ui-kit';
import React from 'react';
type CheckoutSidebarProps = {
  price: number;
  amount: number;
};

export const CheckoutSidebar = ({ price, amount }: CheckoutSidebarProps) => {
  const [value, setValue] = React.useState<string>('');

  return (
    <div className="flex flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex justify-between">
        <Typography view="large1">Всего</Typography>
        <Typography view="large1" color="secondary-red">
          {price}
        </Typography>
      </div>
      <div className="flex justify-between">
        <Typography view="card-price">Ваш заказ</Typography>
        <Typography view="regular" color="secondary-grey">
          {amount} товаров
        </Typography>
      </div>
      <div>
        <Input
          value={value}
          className="!bg-baseBg"
          placeholder="Введите промокод"
          inputType="default"
          suffixIcon="common/telegram"
          onChangeValue={setValue}
        />
      </div>
      <div>
        <Button>Перейти к оформлению</Button>
      </div>
    </div>
  );
};
