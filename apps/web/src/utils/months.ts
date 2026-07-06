import { months, Months } from '@canadian-lawn/api';

import { monthsLocale, MonthKey } from '@/const/months';

export const formatPlantingPeriod = (landing?: Months | null): string | undefined => {
  if (!landing) return undefined;

  const activeKeys = months.map(({ key }) => key as MonthKey).filter((key) => landing[key]);

  if (activeKeys.length === 0) return undefined;

  const toLabel = (key: MonthKey) => monthsLocale.months[key].toLowerCase();

  return activeKeys.length === 1
    ? toLabel(activeKeys[0])
    : `${toLabel(activeKeys[0])}–${toLabel(activeKeys[activeKeys.length - 1])}`;
};
