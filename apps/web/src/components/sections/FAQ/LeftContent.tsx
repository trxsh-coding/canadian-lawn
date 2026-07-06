import { OptionEntity, Tabs } from '@canadian-lawn/ui-kit';

type LeftContentProps = {
  onClick: (value: OptionEntity) => void;
  tab: OptionEntity;
  options: OptionEntity[];
};

export const LeftContent = ({ options, onClick, tab }: LeftContentProps) => {
  return (
    <div className="flex min-w-0 items-start gap-5 overflow-x-auto pt-2 lg:flex-col lg:overflow-visible">
      <Tabs
        className="flex min-w-0 flex-nowrap lg:flex-col"
        tabItemClassName="ui:lg:min-w-0 ui:lg:w-full ui:lg:max-w-full"
        titleClassName="ui:w-fit ui:lg:w-full ui:lg:max-w-full ui:lg:truncate"
        options={options}
        value={tab}
        onChange={onClick}
      ></Tabs>
    </div>
  );
};
