import { Filter } from '@canadian-lawn/api';
import React from 'react';

import { useFilterState } from '@/hooks/useFiltersState';
import { useQueryParams } from '@/hooks/useUrlArrayParam';

export interface FiltersWithQueryReturn {
  selectedIds: number[];
  selectedItems: { id: number; name: string }[];
  onChange: (item: Filter) => void;
  apply: () => void;
  reset: () => void;
}
interface FilterType {
  id: number;
  name: string;
}

export function useFiltersWithQuery(
  items: FilterType[],
  filterKey: string
): FiltersWithQueryReturn {
  const { setNumericArrayParam } = useQueryParams();
  const filter = useFilterState(items, filterKey);

  return React.useMemo(
    () => ({
      selectedIds: filter.selectedIds,
      selectedItems: filter.selectedItems,
      onChange: filter.onChange,
      apply: () => {
        try {
          setNumericArrayParam(filterKey, filter.selectedIds);
        } catch (error) {
          console.error(`Failed to apply filter for ${filterKey}:`, error);
        }
      },
      reset: () => {
        try {
          filter.reset();
          setNumericArrayParam(filterKey, []);
        } catch (error) {
          console.error(`Failed to reset filter for ${filterKey}:`, error);
        }
      },
    }),
    [filter, filterKey, setNumericArrayParam]
  );
}
