'use client';

import { Lawn, Media, months } from '@canadian-lawn/api';
import { Button, DateRange, Pic, Progress, Typography } from '@canadian-lawn/ui-kit';
import React from 'react';

import { MonthKey, monthsLocale } from '@/const/months';
import cn from '@/utils/cnMerge';

type TopContentProps = {
  lawn?: Lawn;
};

export const TopContent = ({ lawn }: TopContentProps) => {
  const [weight, setWeight] = React.useState<{
    price: number;
    weight: number;
  } | null>(lawn?.price?.[0] || null);
  const [image, setImage] = React.useState<Media | null>(lawn?.gallery?.[0] || lawn?.image || null);

  const active: MonthKey[] = Object.keys(lawn?.landing ?? {}).filter(
    (key) => lawn?.landing?.[key as MonthKey]
  ) as MonthKey[];

  const rangeSuffix =
    active &&
    `${monthsLocale.months[active[0]]?.slice(0, 3)}-${monthsLocale.months[active[active.length - 1]].slice(0, 3)}`;

  return (
    <div className="flex flex-col gap-2 lg:flex-row">
      <div className="bg-baseWhite rounded-sm p-4 lg:rounded-lg lg:p-6 lg:py-[30px]">
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col-reverse lg:flex-row">
            <div className="flex items-center gap-5 lg:flex-col">
              {lawn?.gallery?.map((item) => (
                <Pic
                  key={item.id}
                  className={cn(
                    'h-[82px] w-[82px] cursor-pointer rounded-sm p-4',
                    item.id === image?.id && 'bg-baseSilvery'
                  )}
                  src={item.url}
                  onClick={() => setImage(item)}
                />
              ))}
            </div>
            <div className="flex w-full justify-center">
              <Pic src={image?.url} className="h-[180px] w-[180px] lg:h-[300px] lg:w-[300px]" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <Typography view="large1">{lawn?.name}</Typography>
            <div className="flex w-full max-w-full gap-4">
              {lawn?.speed && (
                <Progress
                  progress={lawn?.speed}
                  titleClassName="!text-baseBlack"
                  title="скорость роста"
                  className="ui:max-w-full"
                />
              )}
              {lawn?.resistance && (
                <Progress
                  progress={lawn.resistance}
                  titleClassName="!text-baseBlack"
                  title="устойчивость"
                />
              )}
            </div>
            {lawn?.type.map((type) => (
              <div key={type.lawnType?.id} className="flex w-[80%] justify-between">
                <Typography>{type.lawnType?.name}:</Typography>
                <Typography>{type.percent}%</Typography>
              </div>
            ))}
            <DateRange prefix="Посадка" suffix={rangeSuffix} list={months} active={active} />
            <div className="flex gap-1">
              {lawn?.price.map((price, index) => (
                <Button
                  key={index}
                  disabled={weight?.weight !== price.weight}
                  radius="large"
                  width="fit"
                  onClick={() => setWeight(price)}
                >
                  {price.weight}кг
                </Button>
              ))}
            </div>
            <div>
              <Typography color="secondary-grey">
                {weight?.weight} кг за {weight?.price} руб
              </Typography>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-4 ml-2 flex flex-col gap-4">
        <Typography color="base-white" view="large1">
          {weight?.price}₽
        </Typography>
        <Button suffixIconName="common/cart">Добавить в корзину</Button>
      </div>
    </div>
  );
};
