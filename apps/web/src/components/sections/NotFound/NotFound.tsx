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
      mainContainerClassName="!m-0 !p-0 relative"
      mainWrapperClassName="!p-0 !mx-0 bg-primary h-full min-h-[400px] lg:min-h-auto"
      mainContentClassName="!h-full flex lg:px-section lg:!my-0 flex-col-reverse lg:flex-col px-4 bg-primary"
    >
      <>
        <div className="bg-primary relative flex h-full w-full items-start justify-start lg:justify-end">
          <div
            style={{ backgroundImage: `url(${NotFoundImage.src})` }}
            className="absolute bottom-[-40%] left-0 h-full w-full bg-contain bg-bottom bg-no-repeat lg:bottom-0 lg:w-[50%] lg:bg-left"
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
      </>
    </LayoutWrapper>
  );
};
