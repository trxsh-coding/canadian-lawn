'use client';

import { Button, Input } from '@canadian-lawn/ui-kit';
import React from 'react';

import { AdaptiveModal } from '@/components/layout/AdaptiveModal/AdaptiveModal';

export type DeliveryAddress = {
  city: string;
  street: string;
  apartment: string;
  intercom: string;
  entrance: string;
  floor: string;
};

const emptyAddress: DeliveryAddress = {
  city: '',
  street: '',
  apartment: '',
  intercom: '',
  entrance: '',
  floor: '',
};

export const formatDeliveryAddress = (address: DeliveryAddress) =>
  [
    [address.city, address.street].filter(Boolean).join(', '),
    address.apartment && `кв./офис ${address.apartment}`,
    address.entrance && `подъезд ${address.entrance}`,
    address.floor && `этаж ${address.floor}`,
    address.intercom && `домофон ${address.intercom}`,
  ]
    .filter(Boolean)
    .join(', ');

type DeliveryAddressModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValue: DeliveryAddress | null;
  onConfirm: (address: DeliveryAddress) => void;
};

export const DeliveryAddressModal = ({
  open,
  onOpenChange,
  initialValue,
  onConfirm,
}: DeliveryAddressModalProps) => {
  const [address, setAddress] = React.useState<DeliveryAddress>(initialValue ?? emptyAddress);

  React.useEffect(() => {
    if (open) setAddress(initialValue ?? emptyAddress);
  }, [open, initialValue]);

  const setField = (field: keyof DeliveryAddress) => (value: string) =>
    setAddress((prev) => ({ ...prev, [field]: value }));

  const canConfirm = address.city.trim().length > 0 && address.street.trim().length > 0;

  const handleConfirm = () => {
    onConfirm(address);
    onOpenChange(false);
  };

  return (
    <AdaptiveModal
      open={open}
      onOpenChange={onOpenChange}
      title="Адрес доставки"
      className="sm:max-w-[500px]"
    >
      <div className="flex flex-col gap-2 py-2">
        <Input
          inputType="default"
          className="!bg-baseBg"
          placeholder="Город"
          value={address.city}
          onChangeValue={setField('city')}
        />

        <Input
          inputType="default"
          className="!bg-baseBg"
          placeholder="Улица и дом"
          value={address.street}
          onChangeValue={setField('street')}
        />

        <div className="flex gap-2">
          <Input
            inputType="default"
            className="!bg-baseBg"
            placeholder="Кв/офис"
            value={address.apartment}
            onChangeValue={setField('apartment')}
          />
          <Input
            inputType="default"
            className="!bg-baseBg"
            placeholder="Домофон"
            value={address.intercom}
            onChangeValue={setField('intercom')}
          />
        </div>

        <div className="flex gap-2">
          <Input
            inputType="default"
            className="!bg-baseBg"
            placeholder="Подъезд"
            value={address.entrance}
            onChangeValue={setField('entrance')}
          />
          <Input
            inputType="default"
            className="!bg-baseBg"
            placeholder="Этаж"
            value={address.floor}
            onChangeValue={setField('floor')}
          />
        </div>

        <Button className="mt-2" disabled={!canConfirm} onClick={handleConfirm}>
          Привезти сюда
        </Button>
      </div>
    </AdaptiveModal>
  );
};
