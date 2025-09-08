import { Button, CopyPaste, Typography, BaseClickable } from '@canadian-lawn/ui-kit';

type RequisiteCardProps = {
  title?: string;
  firstValue?: string | null;
  thirdValueTitle?: string | null;
  secondValueTitle?: string | null;
  firstValueTitle?: string | null;
  secondValue?: string | null;
  thirdValue?: string | number | null;
  buttonText?: string;
  buttonLink?: string;
};

export const RequisiteCard = ({
  title,
  thirdValue,
  thirdValueTitle,
  secondValue,
  secondValueTitle,
  firstValue,
  firstValueTitle,
  buttonLink,
  buttonText = 'Выписка из ЕГРЮЛ',
}: RequisiteCardProps) => {
  const CopyItem = ({ value, title }: { value: string; title: string }) => {
    return (
      <div className="flex gap-10">
        <Typography color="base-white" view="regular" className="w-[30px]">
          {title}
        </Typography>
        <CopyPaste value={value}></CopyPaste>
      </div>
    );
  };

  return (
    <div className="bg-primary flex flex-col rounded-sm p-6 lg:w-[427px]">
      <Typography view="heading3" family="gothic" color="base-white" className="mb-6">
        {title}
      </Typography>
      <div className="flex flex-col gap-2">
        {firstValue && <CopyItem value={firstValue} title={firstValueTitle || ''} />}
        {secondValue && <CopyItem value={secondValue} title={secondValueTitle || ''} />}
        {thirdValue && <CopyItem value={thirdValue.toString()} title={thirdValueTitle || ''} />}
      </div>
      <BaseClickable as="a" target="_blank" href={buttonLink} className="flex w-full">
        <Button
          width="fill"
          iconName="common/download"
          className="mt-6 !w-full"
          color="secondary"
          iconClassName="text-baseWhite"
        >
          {buttonText}
        </Button>
      </BaseClickable>
    </div>
  );
};
