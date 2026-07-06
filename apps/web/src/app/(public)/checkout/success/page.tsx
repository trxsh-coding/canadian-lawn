'use client';

import { Button, Typography } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';

import { ROUTES } from '@/config/routes';

export default function OrderSuccess() {
  const router = useRouter();

  return (
    <div className="bg-baseBg flex min-h-screen flex-col items-center justify-center gap-6 px-4 text-center">
      <Typography view="large1">Заказ оформлен!</Typography>
      <Typography color="secondary-grey">
        Мы свяжемся с вами в ближайшее время для подтверждения.
      </Typography>
      <Button onClick={() => router.push(ROUTES.home.url)}>На главную</Button>
    </div>
  );
}
