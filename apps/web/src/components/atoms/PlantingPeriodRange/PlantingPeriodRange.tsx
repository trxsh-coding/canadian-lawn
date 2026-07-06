import { Months, months } from '@canadian-lawn/api';
import { DateRange } from '@canadian-lawn/ui-kit';

import { MonthKey, monthsLocale } from '@/const/months';

type PlantingPeriodRangeProps = {
  landing?: Months | null;
  prefix?: string;
};

export const PlantingPeriodRange = ({ landing, prefix = 'Посадка' }: PlantingPeriodRangeProps) => {
  const active: MonthKey[] = Object.keys(landing ?? {}).filter(
    (key) => landing?.[key as MonthKey]
  ) as MonthKey[];

  if (active.length === 0) return null;

  const rangeSuffix = `${monthsLocale.months[active[0]]?.slice(0, 3)}-${monthsLocale.months[active[active.length - 1]]?.slice(0, 3)}`;

  return <DateRange prefix={prefix} suffix={rangeSuffix} list={months} active={active} />;
};
