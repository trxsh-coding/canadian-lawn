import { OptionEntity, Tabs } from '@canadian-lawn/ui-kit';

type LeftContentProps = {
  onClick: (value: OptionEntity) => void;
  tab: OptionEntity;
  options: OptionEntity[];
};

export const LeftContent = ({ options, onClick, tab }: LeftContentProps) => {
  return (
    <div className="flex items-start justify-center gap-5 pt-2 lg:flex-col">
      <Tabs className="flex lg:flex-col" options={options} value={tab} onChange={onClick}></Tabs>
    </div>
  );
};
