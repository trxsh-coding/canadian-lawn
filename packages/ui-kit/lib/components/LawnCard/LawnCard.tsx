import { Button, Pic, Typography } from '@/lib';
import { ButtonCounter } from '@/lib/components/ButtonCounter';
import { Progress } from '@/lib/components/Progress';

type LawnCardProps = {
  image: string;
  name: string;
  price: {
    weight: number;
    price: number;
  };
  buttonText?: string;
  resistance: number;
  growth: number;
  handleButtonChange: (value: number) => void;
  handleButtonClick: (value: boolean) => void;
  handleCardClick: VoidFunction;
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
  value,
  handleCardClick,
  handleButtonClick,
  resistance,
  handleButtonChange,
}: LawnCardProps) => {
  return (
    <div
      className="ui:rounded-sm ui:bg-baseWhite ui:lg:gap-5 ui:lg:p-6 ui:md:gap-3 ui:w-fit ui:flex ui:flex-col ui:md:flex-row ui:w-max-[220px] ui:max-h-[320px] ui:md:w-max-[358px] ui:md:max-h-[190px] ui:lg:max-h-[240px] ui:p-6"
      onClick={handleCardClick}
    >
      <div className="ui:lg:flex">
        <div className="ui:flex ui:flex-col ui:justify-between">
          <Pic
            className="ui:h-[104px] ui:mb-3 ui:md:mb-0 ui:w-[104px] ui:md:h-[86px] ui:md:w-[85px] ui:lg:h-[133px] ui:lg:w-[133px]"
            src={image}
            alt="Газон"
          />
          <Button
            iconName="common/garbage"
            color="secondary"
            buttonType="icon"
            className="ui:rounded-sm ui:p-0 ui:lg:mt-[20px]"
          />
        </div>
      </div>
      <div className="ui:flex ui:flex-col ui:justify-between">
        <div className="ui:flex ui:flex-col ui:justify-between">
          <Typography view="card-price" className="ui:mb-3">
            {name}
          </Typography>
          <div className="ui:flex ui:gap-4 ui:mb-[30px]">
            <Progress progress={growth} title="скорость роста" />
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
          onChange={handleButtonChange}
          value={value}
          max={20}
          min={0}
          text="Товары 265 штук"
          onClick={() => handleButtonClick(true)}
          onSuffixIconClick={() => handleButtonClick(true)}
          onIconClick={() => handleButtonClick(false)}
        />
      </div>
    </div>
  );
};
