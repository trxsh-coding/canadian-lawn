import { Button, Pic, Typography } from '@/lib';
import { ButtonCounter } from '@/lib/components/ButtonCounter';
import { Progress } from '@/lib/components/Progress';
import cn from '@/lib/utils/cnMerge';

type LawnCardProps = {
  className?: string;
  buttonClassName?: string;
  image: string;
  name: string;
  slug: string;
  price: {
    weight: number;
    price: number;
  };
  buttonText?: string;
  resistance: number;
  growth: number;
  handleButtonChange: (value: number) => void;
  handleButtonClick: (value: boolean) => void;
  handleCardClick: (slug: string) => void;
  value: number;
  types?: {
    name?: string;
    price?: number;
  }[];
};

export const LawnCard = ({
  image,
  name,
  growth,
  price,
  slug,
  value,
  handleCardClick,
  handleButtonClick,
  resistance,
  handleButtonChange,
  className,
  buttonClassName,
}: LawnCardProps) => {
  return (
    <div
      className={cn(
        'ui:cursor-pointer ui:relative ui:max-w-full ui:min-w-0 ui:rounded-sm ui:bg-baseWhite ui:gap-3 ui:lg:gap-5 ui:2xl:p-6 ui:md:gap-3 ui:flex ui:xs:flex-row ui:p-6',
        className
      )}
      onClick={() => handleCardClick(slug)}
    >
      <div className="ui:2xl:flex">
        <div className="ui:flex ui:flex-col ui:justify-between">
          <Pic
            className="ui:h-[104px] ui:mb-3 ui:md:mb-0 ui:w-[104px] ui:md:h-[86px] ui:md:w-[85px] ui:2xl:h-[133px] ui:2xl:w-[133px]"
            src={image}
            alt="Газон"
          />
          <Button
            iconName="common/garbage"
            color="secondary"
            buttonType="icon"
            className="ui:rounded-sm ui:p-0 ui:2xl:mt-[20px]"
          />
        </div>
      </div>
      <div className="ui:flex ui:flex-col ui:justify-between ui:w-full">
        <div className="ui:flex ui:flex-col ui:justify-between">
          <Typography view="card-price" className="ui:mb-3">
            {name}
          </Typography>
          <div className="ui:flex ui:gap-4 ui:mb-[30px] ui:max-w-full ui:w-full">
            <Progress progress={growth} title="скорость роста" className="ui:max-w-full" />
            <Progress progress={resistance} title="устойчивость" />
          </div>

          <div className="ui:flex ui:gap-1 ui:mb-3">
            <Typography view="card-price" color="tertiary">
              {price.weight} кг
            </Typography>
            <Typography view="card-price"> от {price.price} ₽</Typography>
          </div>
        </div>
        <ButtonCounter
          className={buttonClassName}
          onChange={handleButtonChange}
          value={value}
          max={20}
          min={0}
          text="500 м²"
          onClick={() => handleButtonClick(true)}
          onSuffixIconClick={() => handleButtonClick(true)}
          onIconClick={() => handleButtonClick(false)}
        />
      </div>
    </div>
  );
};
