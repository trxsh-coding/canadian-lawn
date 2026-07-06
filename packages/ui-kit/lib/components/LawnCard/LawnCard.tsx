import React from 'react';

import lawnCardPlaceholder from '@/assets/images/lawn-placeholder.png';
import { ButtonGroup, Pic, Typography } from '@/lib';
import { ButtonCounter } from '@/lib/components/ButtonCounter';
import { Progress } from '@/lib/components/Progress';
import cn from '@/lib/utils/cnMerge';

type Package = {
  unit?: string;
  weight: number;
  price: number;
};

type LawnCardProps = {
  className?: string;
  buttonClassName?: string;
  image: string;
  placeholder?: string;
  name: string;
  slug: string;
  buttonText?: string;
  resistance: number;
  growth: number;
  handleButtonChange: (value: number) => void;
  handleButtonClick: (value: boolean) => void;
  handleCardClick: (slug: string) => void;
  value: number;
  packages: Package[];
  price?: number;
  onTypeChange?: (type: string) => void;
};

export const LawnCard = ({
  image,
  placeholder,
  name,
  growth,
  packages,
  slug,
  value,
  price,
  handleCardClick,
  handleButtonClick,
  resistance,
  handleButtonChange,
  className,
  buttonClassName,
  onTypeChange,
}: LawnCardProps) => {
  const [selectedWeight, setSelectedWeight] = React.useState(packages[0]?.weight);

  const packageOptions = React.useMemo(
    () =>
      packages.map((pkg) => ({
        value: String(pkg.weight),
        label: `${pkg.weight} ${pkg.unit}`,
      })),
    [packages]
  );

  const selectedPackage = React.useMemo(
    () => packages.find((pkg) => pkg.weight === selectedWeight) || packages[0],
    [packages, selectedWeight]
  );

  const handlePackageChange = React.useCallback(
    (value: string | string[]) => {
      const weightValue = Array.isArray(value) ? value[0] : value;
      const weight = Number(weightValue);
      setSelectedWeight(weight);
      onTypeChange?.(weightValue);
    },
    [onTypeChange]
  );

  const shouldShowPackages = packages.length > 1 && onTypeChange;

  return (
    <div
      className={cn(
        'ui:relative ui:max-w-full ui:min-w-0 ui:rounded-sm ui:bg-baseWhite ui:gap-3 ui:lg:gap-5 ui:2xl:p-6 ui:md:gap-3 ui:flex ui:xs:flex-row ui:p-6',
        className
      )}
    >
      <div className="ui:2xl:flex">
        <div className="ui:flex ui:flex-col ui:justify-between ui:gap-3">
          <Pic
            className="ui:h-[104px] ui:w-[104px] ui:md:h-[86px] ui:md:w-[85px] ui:2xl:h-[133px] ui:2xl:w-[133px]"
            src={image || lawnCardPlaceholder}
            skeleton={placeholder}
            alt="Газон"
          />
          {shouldShowPackages && (
            <ButtonGroup
              options={packageOptions}
              value={String(selectedWeight)}
              onChange={handlePackageChange}
              className="ui:flex"
            />
          )}
        </div>
      </div>
      <div className="ui:flex ui:flex-1 ui:min-w-0 ui:flex-col ui:justify-between ui:w-full">
        <div className="ui:flex ui:flex-col ui:justify-between">
          <Typography
            view="card-price"
            className="ui:mb-3 ui:cursor-pointer ui:hover:underline"
            onClick={() => handleCardClick(slug)}
          >
            {name}
          </Typography>
          <div className="ui:flex ui:gap-4 ui:mb-[30px] ui:max-w-full ui:w-full">
            <Progress progress={growth} title="скорость роста" className="ui:max-w-full" />
            <Progress progress={resistance} title="устойчивость" />
          </div>

          <div className="ui:flex ui:gap-1 ui:mb-3">
            {selectedPackage ? (
              <>
                <Typography view="card-price" color="tertiary">
                  {selectedPackage.weight} {selectedPackage.unit}
                </Typography>
                <Typography view="card-price"> от {selectedPackage.price} ₽</Typography>
              </>
            ) : (
              <Typography view="card-price"> от {price} ₽</Typography>
            )}
          </div>
        </div>
        <ButtonCounter
          className={cn('', buttonClassName)}
          onChange={handleButtonChange}
          value={value}
          max={20}
          min={0}
          text="заказать"
          onClick={() => handleButtonClick(true)}
          onSuffixIconClick={() => handleButtonClick(true)}
          onIconClick={() => handleButtonClick(false)}
        />
      </div>
    </div>
  );
};
