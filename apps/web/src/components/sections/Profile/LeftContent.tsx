import { BaseClickable, OptionEntity, Tabs, Typography } from '@canadian-lawn/ui-kit';

type LeftContentProps = {
  onClick: (value: OptionEntity) => void;
  tab: OptionEntity;
  onButtonClick?: VoidFunction;
  options: OptionEntity[];
};

export const LeftContent = ({ onClick, tab, options, onButtonClick }: LeftContentProps) => {
  return (
    <div className="flex items-start justify-center gap-5 lg:flex-col">
      <Tabs className="flex lg:flex-col" options={options} value={tab} onChange={onClick}></Tabs>
      <BaseClickable>
        <Typography view="button" color="tertiary" weight="bold" onClick={onButtonClick}>
          Выйти
        </Typography>
      </BaseClickable>
    </div>
  );
};
