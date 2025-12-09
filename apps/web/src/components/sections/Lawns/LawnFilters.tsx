'use client';

import { Filter, Filters } from '@canadian-lawn/api';
import { BottomSheet, Button } from '@canadian-lawn/ui-kit';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import { useToggle } from 'usehooks-ts';

import { FilterList } from '@/components/layout/CheckboxFiltersList';
import { filtersTypes } from '@/const';
import { useLawnFilters } from '@/hooks/api/useLawnFilters';
import { FiltersWithQueryReturn, useFiltersWithQuery } from '@/hooks/useFiltersWithQuery';

import { FiltersConfigType, getFiltersConfig } from './config';

interface RenderFilterProps {
  config: FiltersConfigType;
  filter: FiltersWithQueryReturn;
  view: 'desktop' | 'mobile';
}

export const LawnFilters = () => {
  const router = useRouter();

  const pathname = usePathname();

  const [bottomSheetOpen, toggle] = useToggle();

  const { useHook: lawnsFilters } = useLawnFilters();

  const lawnFilters = lawnsFilters();

  const data = lawnFilters?.data?.data;

  const filtersConfig = React.useMemo(() => getFiltersConfig(data as Filters), [data]);

  const filters = {
    partnerTypes: useFiltersWithQuery(data?.partnerTypes || [], filtersTypes.PARTNER_TYPES),
    lawnTypes: useFiltersWithQuery(data?.lawnTypes || [], filtersTypes.LAWN_TYPES),
    brands: useFiltersWithQuery(data?.brands || [], filtersTypes.BRANDS),
    features: useFiltersWithQuery(data?.features || [], filtersTypes.FEATURES),
  };

  const RenderFilter = ({ config, filter, view }: RenderFilterProps) => {
    const props = {
      key: config.key,
      items: config.items,
      title: config.title,
      selectedIds: filter.selectedIds,
      onChange: (item: Filter) => filter.onChange(item),
      selectedItems: filter.selectedItems,
    };

    return <FilterList view={view} {...props} />;
  };

  const RenderFilters = ({ view }: { view: 'mobile' | 'desktop' }) => {
    return filtersConfig.map((config) => {
      const filter = filters[config.key as keyof typeof filters];
      return !data || !data[config.dataKey]?.length ? null : (
        <RenderFilter key={config.key} config={config} filter={filter} view={view} />
      );
    });
  };

  const handleReset = React.useCallback(() => router.replace(pathname), [pathname, router]);

  if (lawnFilters.isError) return <div>Error...</div>;

  return (
    <>
      <div className="mb-4 lg:hidden">
        <BottomSheet
          open={bottomSheetOpen}
          onOpenChange={toggle}
          title="Фильтры"
          mainContent={<RenderFilters view="mobile" />}
        >
          <Button iconName="common/filter" radius="large" className="!text-baseBlack" />
        </BottomSheet>
      </div>
      <div className="hidden flex-col gap-4 p-4 lg:flex">
        <RenderFilters view="desktop" />
        <Button color="secondary" buttonType="button" onClick={handleReset}>
          Сбросить
        </Button>
      </div>
    </>
  );
};
