import { useCallback, useState } from 'react';

export type FilterState<T extends { id: number }> = {
  selectedIds: number[];
  selectedItems: T[];
  onChange: (item: T) => void;
  reset: () => void;
};

export function useFilterState<T extends { id: number }>(initialItems: T[] = []): FilterState<T> {
  const [selected, setSelected] = useState<number[]>([]);

  const onChange = useCallback((item: T) => {
    setSelected((prev) =>
      prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
    );
  }, []);

  const reset = useCallback(() => {
    setSelected([]);
  }, []);

  const selectedItems = initialItems.filter((item) => selected.includes(item.id));

  return {
    selectedIds: selected,
    selectedItems,
    onChange,
    reset,
  };
}
