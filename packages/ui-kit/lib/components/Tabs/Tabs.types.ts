export type TabsProps<O extends OptionEntity = OptionEntity> = {
  options: O[];
  value: O | null;
  className?: string;
  tabItemClassName?: string;
  testId?: string;
  tabItemTestId?: string;
  view?: 'normal' | 'inverse';
  tabName?: string;
  onChange: (option: O) => void;
  onSetPosition?: (position: number) => void;
  tabsPosition?: number;
};

export type OptionEntity<K extends string | number = string> = {
  key: K;
  title: string;
};
