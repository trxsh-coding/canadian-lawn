import React from 'react';

import {
  BaseClickable,
  type ButtonProps,
  Icon,
  type IconName,
  Spinner,
  Typography,
  views,
} from '@/lib';
import cn from '@/lib/utils/cnMerge';

type ButtonIconProps = {
  className?: string;
  name: IconName;
  onIconClick?: VoidFunction;
  radius?: 'small' | 'medium' | 'large';
};

export const Button = React.memo(
  ({
    className,
    children,
    radius,
    disabled,
    color = 'primary',
    width = 'fill',
    loading = false,
    iconWrapperClassName,
    suffixIconName,
    suffixIconClassName,
    iconClassName,
    iconName,
    inactive = false,
    buttonType = 'button',
    htmlType = 'button',
    onIconClick,
    onSuffixIconClick,
    ...clickActionProps
  }: ButtonProps) => {
    const ButtonIcon = React.useCallback(
      ({ className, name, onIconClick }: ButtonIconProps) => (
        <Icon
          className={cn(
            color === 'icon-primary' && 'ui:text-baseWhite',
            color === 'tertiary' && 'ui:text-tertiary',
            buttonType === 'text' && 'ui:text-baseBlack ui:scale-x-[-1]',
            className
          )}
          name={name}
          onClick={onIconClick}
        />
      ),
      [color, buttonType]
    );

    const Content = React.useMemo(() => {
      if (buttonType === 'icon' && iconName) {
        return <ButtonIcon name={iconName} className={iconClassName} radius={radius} />;
      }

      if (iconName || suffixIconName) {
        return (
          <div
            className={cn('ui:gap-2.5 ui:flex ui:flex-row ui:items-center', iconWrapperClassName)}
          >
            {iconName && (
              <ButtonIcon
                radius={radius}
                name={iconName}
                className={cn(iconClassName, radius === 'large' && 'ui:rounded-lg')}
                onIconClick={onIconClick}
              />
            )}
            {children}
            {suffixIconName && (
              <ButtonIcon
                radius={radius}
                name={suffixIconName}
                className={suffixIconClassName}
                onIconClick={onSuffixIconClick}
              />
            )}
          </div>
        );
      }

      if (buttonType === 'text') {
        return (
          <div
            className={cn(
              'ui:gap-2.5 ui:flex ui:flex-row ui:items-center ui:group-hover:text-secondaryRe ui:group-hover:!transition-none',
              iconWrapperClassName
            )}
          >
            <Typography
              view="button"
              weight="bold"
              className="ui:transition-none ui:group-hover:delay-[0]"
            >
              {children}
            </Typography>
            <ButtonIcon
              radius={radius}
              name="common/arrow"
              className={cn(
                'ui:group-hover:text-secondaryRed ui:group-hover:delay-75',
                iconClassName
              )}
            />
          </div>
        );
      }

      return children;
    }, [
      buttonType,
      iconName,
      suffixIconName,
      children,
      ButtonIcon,
      iconClassName,
      iconWrapperClassName,
      radius,
      onIconClick,
      suffixIconClassName,
      onSuffixIconClick,
    ]);

    return (
      <BaseClickable
        as="button"
        type={htmlType}
        className={cn(
          radius === 'small' && 'ui:!rounded-sm',
          radius === 'medium' && 'ui:!rounded-md',
          radius === 'large' && 'ui:!rounded-lg',
          'ui:flex ui:group ui:cursor-pointer ui:transition-all ui:delay-75 ui:items-center ui:justify-center ui:text-center ui:outline-none ui:ease-linear',
          buttonType === 'button' && 'ui:px-[30px] ui:rounded-xs ui:h-10',
          loading && 'ui:pointer-events-none ui:cursor-none',
          color === 'primary' &&
            `ui:text-baseWhite ui:bg-tertiary ${!inactive && 'ui:hover:bg-secondaryRed'}`,
          color === 'secondary' &&
            `ui:text-baseBlack ui:bg-baseBg ${!inactive && 'ui:hover:bg-baseBlack ui:hover:text-baseWhite'}`,
          width === 'fill' && 'ui:max-w-full',
          width === 'fit' && 'ui:max-w-fit',
          buttonType === 'text' &&
            'ui:max-w-fit ui:hover:bg-transparent ui:hover:!text-secondaryRed',
          buttonType === 'text' &&
            color === 'primary' &&
            'ui:text-baseBlack ui:bg-transparent ui:flex ui:gap-1 ui:transition-none',
          buttonType === 'text' &&
            color === 'secondary' &&
            'ui:text-tertiary ui:bg-transparent ui:flex ui:gap-1',
          views['button'],
          (suffixIconName || iconName) && `ui:flex ui:items-center ui:justify-center`,
          buttonType === 'icon' &&
            `ui:p-4 ui:rounded-full ui:max-w-fit ui:bg-baseBg ui:text-baseBlack ui:hover:text-baseBlack ${!inactive && 'ui:hover:bg-baseSilvery'} ${iconName === 'common/cross' && 'ui:text-secondaryRed ui:p-1 ui:lg:p-[9px]'}`,
          inactive && 'ui:opacity-60',
          disabled && 'ui:bg-baseSilvery',
          className
        )}
        {...clickActionProps}
      >
        {loading ? (
          <div className="ui:flex ui:items-center ui:justify-center">
            <Spinner />
          </div>
        ) : (
          Content
        )}
      </BaseClickable>
    );
  }
);
