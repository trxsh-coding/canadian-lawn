import { Button, Pic, Typography } from '@canadian-lawn/ui-kit';
import Link from 'next/link';

import { Constraints } from '@/components/layout/Constraints';
import { ROUTES } from '@/config/routes';

import EmptyCartImage from './images/empty.png';

export const EmptyCart = () => (
  <Constraints className="bg-baseWhite" wrapperClassName="bg-baseWhite">
    <div className="flex flex-col items-center justify-center lg:flex-row">
      <Pic
        src={EmptyCartImage.src}
        className="bg-transparent md:h-[300px] md:w-[300px] lg:h-[450px] lg:w-[450px]"
      />
      <div className="flex flex-col items-center gap-4">
        <Typography view="large1" className="!normal-case" weight="bold">
          У вас еще не добавлены товары
        </Typography>
        <Typography color="secondary-grey" className="!text-[13px] lg:!text-[15px]">
          Воспользуйтесь поиском или перейдите к каталогу
        </Typography>
        <Button
          iconName="common/cart"
          color="primary"
          width="fill"
          className="!text-baseWhite w-full rounded-xl"
          as={Link}
          href={ROUTES.lawn.url}
        >
          К покупкам
        </Button>
      </div>
    </div>
  </Constraints>
);
