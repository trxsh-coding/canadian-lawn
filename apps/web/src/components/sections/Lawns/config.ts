import { Filters } from '@canadian-lawn/api';

import { filtersTypes } from '@/const';

export const getFiltersConfig = (data: Filters) => [
  {
    key: filtersTypes.PARTNER_TYPES,
    title: 'Назначение',
    items: data?.partnerTypes || [],
    dataKey: 'partnerTypes' as const,
  },
  {
    key: filtersTypes.LAWN_TYPES,
    title: 'Растения в составе',
    items: data?.lawnTypes || [],
    dataKey: 'lawnTypes' as const,
  },
  {
    key: filtersTypes.FEATURES,
    title: 'Особенности',
    items: data?.features || [],
    dataKey: 'features' as const,
  },
  {
    key: filtersTypes.BRANDS,
    title: 'Бренды',
    items: data?.brands || [],
    dataKey: 'brands' as const,
  },
];

export type FilterConfig = ReturnType<typeof getFiltersConfig>[number];
