'use client';

import { Button, Typography } from '@canadian-lawn/ui-kit';

import Grass from '@/assets/img/preview-grass.png';
import { Constraints } from '@/components/layout/Constraints';
import { Header } from '@/components/layout/Header';
import { NavLinks } from '@/components/layout/NavLinks';

export const Preview = () => {
  return (
    <Constraints className="mb-section relative">
      <div
        className="bg-secondary bg-p relative z-50 flex h-[400px] translate-y-[50px] flex-col rounded-sm bg-size-[auto_50%] bg-bottom bg-no-repeat lg:bg-size-[auto_80%] lg:bg-right-bottom"
        style={{ backgroundImage: `url(${Grass.src})` }}
      >
        <Header />
        <div className="z-50 mt-20 flex flex-col gap-5 p-5">
          <Typography
            color="base-white"
            view="large1"
            textAlign="left"
            family="gothic"
            className="uppercase lg:m-0"
          >
            семена газонов <br /> от производителя
          </Typography>
          <Button width="fit">
            <Typography color="base-white" view="button" family="golos">
              Смотреть каталог
            </Typography>
          </Button>
        </div>
        <NavLinks />
      </div>
    </Constraints>
  );
};
