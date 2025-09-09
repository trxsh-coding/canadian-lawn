'use client';
import { Lawn } from '@canadian-lawn/api';
import { OptionEntity, Tabs } from '@canadian-lawn/ui-kit';
import React from 'react';

import { AboutLawn } from '@/components/sections/Lawn/About';
import { LawnDetailOptions } from '@/const/tabs';
import { LawnDetailsTabs } from '@/types/enums';

export const LawnDetails = ({ lawn }: { lawn?: Lawn }) => {
  const [tab, setTab] = React.useState<OptionEntity>(LawnDetailOptions[0]);

  const tabComponents: Record<string, React.ReactNode> = {
    [LawnDetailsTabs.About]: <AboutLawn lawn={lawn} />,
    [LawnDetailsTabs.Documents]: <div />,
  };

  return (
    <div className="flex flex-col gap-2 lg:py-[30px]">
      <Tabs
        className="bg-baseWhite flex w-full flex-row px-4 pt-4 lg:rounded-sm lg:px-[25px]"
        options={LawnDetailOptions}
        value={tab}
        onChange={(tab) => setTab(tab)}
      />
      <div className="bg-baseWhite rounded-sm p-8">{tabComponents[tab.key]}</div>
    </div>
  );
};
