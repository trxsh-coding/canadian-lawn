'use client';

import React from 'react';

import { CheckboxFiltersList } from '@/components/layout/CheckboxFiltersList';
import { useLawnFilters } from '@/hooks/api/useLawnFilters';
import { useFilterState } from '@/hooks/useFiltersState';

export const LawnFilters = () => {
  const { useHook: lawnsFilters } = useLawnFilters();

  const lawnFilters = lawnsFilters();

  const data = lawnFilters?.data?.data;

  const partnerTypeFilter = useFilterState(data?.partnerTypes || []);
  const lawnTypesFilter = useFilterState(data?.lawnTypes || []);
  const lawnBrands = useFilterState(data?.brands || []);
  const lawnFeatures = useFilterState(data?.features || []);

  if (lawnFilters.isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-8 p-4">
      <CheckboxFiltersList
        items={data?.partnerTypes || []}
        title="Назначение"
        selectedIds={partnerTypeFilter.selectedIds}
        onChange={partnerTypeFilter.onChange}
        selectedItems={partnerTypeFilter.selectedItems}
      />
      <CheckboxFiltersList
        items={data?.lawnTypes || []}
        title="Растения в составе"
        selectedIds={lawnTypesFilter.selectedIds}
        onChange={lawnTypesFilter.onChange}
        selectedItems={lawnTypesFilter.selectedItems}
      />
      <CheckboxFiltersList
        items={data?.features || []}
        title="Особенности"
        selectedIds={lawnFeatures.selectedIds}
        onChange={lawnFeatures.onChange}
        selectedItems={lawnFeatures.selectedItems}
      />
      <CheckboxFiltersList
        items={data?.brands || []}
        title="Растения в составе"
        selectedIds={lawnBrands.selectedIds}
        onChange={lawnBrands.onChange}
        selectedItems={lawnBrands.selectedItems}
      />
    </div>
  );
};
