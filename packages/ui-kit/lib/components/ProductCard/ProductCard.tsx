import { Button, Pic, Typography } from '@/lib';
import { ButtonCounter } from '@/lib/components/ButtonCounter';

type ProductCardType = {
  image: string;
  title: string;
  handleButtonChange: (value: number) => void;
  handleButtonClick: (value: boolean) => void;
  count: number;
  buttonClassName?: string;
};

export const ProductCard = ({
  image,
  title,
  count,
  handleButtonChange,
  handleButtonClick,
  buttonClassName,
}: ProductCardType) => {
  return (
    <div className="ui:p-4 ui:lg:p-6 ui:rounded-sm ui:bg-baseWhite">
      <div className="ui:flex ui:lg:gap-5 ui:gap-3 ui:h-full">
        <div className="ui:flex ui:flex-col ui:justify-between ui:h-full">
          <Pic src={image} className="ui:min-h-[78px] ui:min-w-[78px]" />
          <Button
            iconName="common/garbage"
            color="secondary"
            buttonType="icon"
            className="ui:rounded-sm ui:p-0 ui:2xl:mt-[20px]"
          />
        </div>
        <div className="ui:flex-col ui:flex ui:justify-between ui:max-h-full">
          <Typography view="card-header">{title}</Typography>
          <ButtonCounter
            className={buttonClassName}
            onChange={handleButtonChange}
            value={count}
            max={20}
            min={0}
            text="500 м²"
            onClick={() => handleButtonClick(true)}
            onSuffixIconClick={() => handleButtonClick(true)}
            onIconClick={() => handleButtonClick(false)}
          />
        </div>
      </div>
    </div>
  );
};
