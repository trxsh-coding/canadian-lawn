import { Filter } from '@canadian-lawn/api';

export type FilterProps = {
  title: string;
  items: Filter[];
  selectedIds: number[];
  onChange: (value: Filter) => void;
  maxVisibleItems?: number;
  selectedItems: Filter[];
};
