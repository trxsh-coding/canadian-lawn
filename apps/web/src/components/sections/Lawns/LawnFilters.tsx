'use client';

import { CheckboxFilter, FilterItem, FilterValue, RangeFilter } from '@canadian-lawn/api';
import { Button, SliderRange } from '@canadian-lawn/ui-kit';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useToggle } from 'usehooks-ts';

import { AdaptiveModal } from '@/components/layout/AdaptiveModal/AdaptiveModal';
import { FilterList } from '@/components/layout/CheckboxFiltersList';
import { useLawnFilters } from '@/hooks/api/useLawnFilters';
import { useFilterState } from '@/hooks/useFiltersState';
import { useQueryParams } from '@/hooks/useUrlArrayParam';

const CheckboxFilterItem = ({
  filter,
  view,
}: {
  filter: CheckboxFilter;
  view: 'desktop' | 'mobile';
}) => {
  const state = useFilterState<FilterValue>(filter.values, filter.field);

  return (
    <FilterList
      view={view}
      title={filter.title}
      items={filter.values}
      selectedIds={state.selectedIds}
      onChange={state.onChange}
      selectedItems={state.selectedItems}
    />
  );
};

const RangeFilterItem = ({ filter }: { filter: RangeFilter }) => {
  const { getNumericArrayParam, setNumericArrayParam } = useQueryParams();

  const values = getNumericArrayParam(filter.field);
  const value: [number, number] =
    values.length === 2 ? [values[0], values[1]] : [filter.min, filter.max];

  const onChange = React.useCallback(
    (val: [number, number]) => {
      if (val[0] === filter.min && val[1] === filter.max) {
        setNumericArrayParam(filter.field, []);
      } else {
        setNumericArrayParam(filter.field, [...val]);
      }
    },
    [filter.field, filter.min, filter.max, setNumericArrayParam]
  );

  return (
    <SliderRange
      label={filter.title}
      min={filter.min}
      max={filter.max}
      value={value}
      onChange={onChange}
    />
  );
};

const FilterRenderer = ({ filter, view }: { filter: FilterItem; view: 'desktop' | 'mobile' }) => {
  if (filter.type === 'range') return <RangeFilterItem filter={filter} />;
  return <CheckboxFilterItem filter={filter} view={view} />;
};

interface LawnFiltersProps {
  productType: string;
}

export const LawnFilters = ({ productType }: LawnFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const [bottomSheetOpen, toggle] = useToggle();

  const { useHook } = useLawnFilters(productType);
  const { data, isError } = useHook();

  const filters = data?.data ?? [];

  const handleReset = React.useCallback(() => router.replace(pathname), [pathname, router]);

  if (isError) return <div>Error...</div>;

  return (
    <>
      <div className="mb-4 lg:hidden">
        <AdaptiveModal
          open={bottomSheetOpen}
          onOpenChange={toggle}
          title="Фильтры"
          trigger={<Button iconName="common/filter" radius="large" className="!text-baseBlack" />}
          disableTrigger={false}
        >
          {filters.map((filter) => (
            <FilterRenderer key={filter.field} filter={filter} view="mobile" />
          ))}
        </AdaptiveModal>
      </div>
      <div className="hidden flex-col gap-4 p-4 lg:flex">
        {filters.map((filter) => (
          <FilterRenderer key={filter.field} filter={filter} view="desktop" />
        ))}
        <Button color="secondary" buttonType="button" onClick={handleReset}>
          Сбросить
        </Button>
      </div>
    </>
  );
};
