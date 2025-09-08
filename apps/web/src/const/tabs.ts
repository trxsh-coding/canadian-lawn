import { OptionEntity } from '@canadian-lawn/ui-kit';

import { LawnDetailsTabs, ProfileTabs } from '@/types/enums';

export const profileTabsOptions: OptionEntity[] = [
  {
    key: ProfileTabs.Personal,
    title: 'Личные данные',
  },
  {
    key: ProfileTabs.Orders,
    title: 'Заказы',
  },
];

export const LawnDetailOptions: OptionEntity[] = [
  {
    key: LawnDetailsTabs.About,
    title: 'О товаре',
  },
  {
    key: LawnDetailsTabs.Documents,
    title: 'Документы',
  },
];
