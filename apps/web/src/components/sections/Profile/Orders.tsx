'use client';

import { OrderHistoryItem } from '@canadian-lawn/api';
import { Button, Typography, TypographyColor } from '@canadian-lawn/ui-kit';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { ROUTES } from '@/config/routes';
import { useOrders } from '@/hooks/api/useOrders';

const deliveryLabels: Record<string, string> = {
  russia: 'Доставка по России',
  courier: 'Курьер по Москве и Подмосковью',
  pickup: 'Самовывоз',
};

const paymentLabels: Record<string, string> = {
  invoice: 'Счёт фактура',
  online: 'Онлайн оплата СБП, Картой, QR',
};

const orderStatusLabels: Record<string, string> = {
  new: 'Новый',
  confirmed: 'Подтверждён',
  paid: 'Оплачен',
  completed: 'Выполнен',
  cancelled: 'Отменён',
};

const orderStatusColors: Record<string, TypographyColor> = {
  new: 'secondary-grey',
  confirmed: 'tertiary',
  paid: 'tertiary',
  completed: 'tertiary',
  cancelled: 'secondary-red',
};

const formatDate = (date: string | null) =>
  date
    ? new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : '—';

const OrderCard = ({ order }: { order: OrderHistoryItem }) => (
  <div className="bg-baseWhite flex flex-col gap-4 rounded-sm p-4 lg:p-6">
    <div className="flex items-start justify-between gap-2">
      <div>
        <Typography view="card-price" weight="semibold">
          Заказ №{order.id}
        </Typography>
        <Typography view="small" color="secondary-grey">
          {formatDate(order.date)}
        </Typography>
      </div>
      <div className="flex flex-col items-end gap-1">
        <Typography view="card-price" weight="semibold">
          {order.total} ₽
        </Typography>
        {order.order_status && (
          <Typography view="small" weight="semibold" color={orderStatusColors[order.order_status]}>
            {orderStatusLabels[order.order_status] ?? order.order_status}
          </Typography>
        )}
      </div>
    </div>

    <div className="flex flex-col gap-2">
      {order.items.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-2">
          <Typography view="regular">
            {item.product.name}
            {item.packageWeight ? ` (${item.packageWeight} ${item.packageUnit ?? 'кг'})` : ''} ×
            {item.quantity}
          </Typography>
          <Typography view="regular" weight="semibold" whiteSpace="nowrap">
            {item.price * item.quantity} ₽
          </Typography>
        </div>
      ))}
    </div>

    <div className="bg-baseBg flex flex-col gap-1 rounded-xs p-3">
      {order.delivery_type && (
        <Typography view="small" color="secondary-grey">
          {deliveryLabels[order.delivery_type] ?? order.delivery_type}
          {order.delivery_address ? `: ${order.delivery_address}` : ''}
        </Typography>
      )}
      {order.payment_type && (
        <Typography view="small" color="secondary-grey">
          {paymentLabels[order.payment_type] ?? order.payment_type}
        </Typography>
      )}
    </div>
  </div>
);

export const Orders = () => {
  const { data: session } = useSession();
  const { useHook } = useOrders(session?.user.jwt);
  const { data: orders, isLoading } = useHook();

  if (isLoading) {
    return <MapleSpinner />;
  }

  if (!orders?.length) {
    return (
      <div className="bg-baseWhite flex flex-col items-center gap-4 rounded-sm p-6 py-12 text-center lg:my-[25px]">
        <Typography view="large1" weight="bold">
          У вас еще нет заказов
        </Typography>
        <Typography color="secondary-grey">
          Воспользуйтесь каталогом, чтобы оформить первый заказ
        </Typography>
        <Button as={Link} href={ROUTES.lawn.url}>
          К покупкам
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 lg:my-[25px]">
      {orders.map((order) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </div>
  );
};
