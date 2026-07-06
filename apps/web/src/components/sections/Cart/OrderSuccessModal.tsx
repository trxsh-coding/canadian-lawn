'use client';

import { Button, Icon, Typography } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';

import { AdaptiveModal } from '@/components/layout/AdaptiveModal/AdaptiveModal';
import { ROUTES } from '@/config/routes';

type OrderSuccessModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const OrderSuccessModal = ({ open, onOpenChange }: OrderSuccessModalProps) => {
  const router = useRouter();

  return (
    <AdaptiveModal open={open} onOpenChange={onOpenChange} className="sm:max-w-[400px]">
      <div className="flex flex-col items-center gap-6 py-2 text-center">
        <Icon name="common/check" className="text-tertiary h-16 w-20" />

        <div className="flex flex-col gap-3">
          <Typography view="heading2" textAlign="center">
            Заказ оформлен
          </Typography>
          <Typography view="regular" textAlign="center">
            Информация о заказе отправлена на вашу почту. Менеджеры свяжутся с вами в течение 24
            часов для подтверждения и оплаты.
          </Typography>
        </div>

        <Button width="fill" onClick={() => router.push(ROUTES.home.url)}>
          На главную
        </Button>
      </div>
    </AdaptiveModal>
  );
};
