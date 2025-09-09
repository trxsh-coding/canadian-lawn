'use client';

import { Button, Typography } from '@canadian-lawn/ui-kit';
import { useRouter } from 'next/navigation';
import React from 'react';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { ROUTES } from '@/config/routes';

import NotFoundImage from './image/not-found.webp';

export const NotFoundPage = () => {
  const router = useRouter();
  const handleClick = React.useCallback(() => router.push(ROUTES.lawn.url), [router]);
  return (
    <LayoutWrapper
      mainContainerClassName="flex-1 !m-0"
      mainContentClassName="flex-1 flex flex-col-reverse lg:flex-col"
    >
      <div className="bg-primary relative flex min-h-[400px] w-full flex-1 items-start justify-start lg:flex-auto lg:justify-end">
        <div
          className="lg:left-[-30%} xs:bg-[length:70%_100%] absolute bottom-[-45%] z-0 h-full w-full bg-[length:100%_100%] bg-[position:center_bottom] bg-no-repeat md:bottom-[-40%] lg:bg-[length:40%_100%] lg:bg-left"
          style={{ backgroundImage: `url(${NotFoundImage.src})` }}
        />
        <div className="z-1 mb-5 flex w-full flex-col gap-4 text-white lg:w-[50%] lg:flex-[0.6] lg:items-end lg:self-end">
          <Typography view="large1" className="lg:!text-right">
            К сожалению, указанная страница не найдена
          </Typography>
          <Typography view="regular">Воспользуйтесь каталогом товаров</Typography>
          <Button className="w-full px-5 lg:w-auto" width="fill" onClick={handleClick}>
            В каталог семян
          </Button>
        </div>
      </div>
    </LayoutWrapper>
  );
};
