'use client';

import { Filters } from '@canadian-lawn/api';
import { Button } from '@canadian-lawn/ui-kit';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

import { CheckboxFiltersList } from '@/components/layout/CheckboxFiltersList';
import { filtersTypes } from '@/const';
import { useLawnFilters } from '@/hooks/api/useLawnFilters';
import { useFiltersWithQuery } from '@/hooks/useFiltersWithQuery';

import { getFiltersConfig } from './config';

export const LawnFilters = () => {
  const router = useRouter();
  const pathname = usePathname();

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

  const handleReset = React.useCallback(() => router.replace(pathname), [pathname, router]);

  if (lawnFilters.isError) return <div>Error...</div>;

  return (
    <div className="flex flex-col gap-8 p-4">
      {filtersConfig.map((config) => {
        const filter = filters[config.key as keyof typeof filters];
        if (!data || !data[config.dataKey]?.length) {
          return null;
        }
        return (
          <CheckboxFiltersList
            key={config.key}
            items={config.items}
            title={config.title}
            selectedIds={filter.selectedIds}
            onChange={(item) => filter.onChange(item)}
            selectedItems={filter.selectedItems}
          />
        );
      })}

      <div className="flex flex-col gap-4">
        <Button color="secondary" buttonType="button" onClick={handleReset}>
          Сбросить
        </Button>
      </div>
    </div>
  );
};
