import { useFilterState } from '@/hooks/useFiltersState';
import { useQueryParams } from '@/hooks/useUrlArrayParam';

export function useFiltersWithQuery<T extends { id: number }>(items: T[], filterKey: string) {
  const { setNumericArrayParam } = useQueryParams();
  const filter = useFilterState(items, filterKey);

  return {
    ...filter,
    apply: () => {
      setNumericArrayParam(filterKey, filter.selectedIds);
    },
    resetWithUrl: () => {
      filter.reset();
      setNumericArrayParam(filterKey, []);
    },
  };
}
