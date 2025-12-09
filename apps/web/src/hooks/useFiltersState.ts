import { useCallback, useMemo } from 'react';

import { useQueryParams } from '@/hooks/useUrlArrayParam';
import { debounce } from '@/utils/debounce';

export type FilterState<T extends { id: number }> = {
  selectedIds: number[];
  selectedItems: T[];
  onChange: (item: T) => void;
  reset: () => void;
};

export function useFilterState<T extends { id: number }>(
  items: T[] = [],
  filterKey: string
): FilterState<T> {
  const { getNumericArrayParam, setNumericArrayParam } = useQueryParams();

  const selectedIds = useMemo(
    () => getNumericArrayParam(filterKey),
    [getNumericArrayParam, filterKey]
  );

  const debouncedSet = useMemo(
    () =>
      debounce((values: number[]) => {
        setNumericArrayParam(filterKey, values);
      }, 300),
    [setNumericArrayParam, filterKey]
  );

  const onChange = useCallback(
    (item: T) => {
      const newSelectedIds: number[] = selectedIds.includes(item.id)
        ? selectedIds.filter((id) => id !== item.id)
        : [...selectedIds, item.id];
      debouncedSet(newSelectedIds);
    },
    [selectedIds, debouncedSet]
  );

  const reset = useCallback(() => {
    setNumericArrayParam(filterKey, []);
  }, [setNumericArrayParam, filterKey]);

  const selectedItems = useMemo(
    () => items.filter((item) => selectedIds.includes(item.id)),
    [items, selectedIds]
  );

  return { selectedIds, selectedItems, onChange, reset };
}
