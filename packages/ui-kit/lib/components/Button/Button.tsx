import { BaseClickable, type ButtonProps, Icon, Spinner, views } from '@/lib';
import cn from '@/lib/utils/cnMerge';

export const Button = ({
  className,
  children,
  color = 'primary',
  width = 'fill',
  loading = false,
  iconName,
  iconPos = 'right',
  iconClassName,
  iconWrapperClassName,
  buttonType = 'button',
  htmlType = 'button',
  ...clickActionProps
}: ButtonProps) => {
  const Content = () => {
    if (iconName || buttonType === 'text') {
      return (
        <div className={cn('ui:gap-1 ui:flex ui:flex-row', iconWrapperClassName)}>
          {children}
          <Icon
            className={cn(
              color === 'icon-primary' && 'ui:text-baseWhite',
              color === 'tertiary' && 'ui:text-tertiary',
              buttonType === 'text' && 'ui:text-baseBlack ui:scale-x-[-1]',
              iconClassName
            )}
            name={iconName ? iconName : 'common/arrow'}
          />
        </div>
      );
    }
    return children;
  };

  return (
    <BaseClickable
      as="button"
      type={htmlType}
      className={cn(
        'ui:flex ui:cursor-pointer ui:items-center ui:justify-center ui:transition-colors ui:text-center ui:outline-none',
        buttonType === 'button' && 'ui:px-[30px] ui:rounded-xs ui:h-10',
        loading && 'ui:pointer-events-none ui:cursor-none',
        color === 'primary' && 'ui:text-baseWhite ui:bg-tertiary',
        color === 'secondary' && 'ui:text-baseBlack ui:bg-baseBg',
        width === 'fill' && 'ui:max-w-full',
        width === 'fit' && 'ui:max-w-fit',
        buttonType === 'text' &&
          color === 'primary' &&
          'ui:text-baseBlack ui:bg-transparent ui:flex ui:gap-1',
        buttonType === 'text' &&
          color === 'secondary' &&
          'ui:text-tertiary ui:bg-transparent ui:flex ui:gap-1',
        views['button'],
        iconName &&
          `ui:flex ui:h-6 ui:w-6 ui:px-0 ui:items-center ui:justify-center ${children && 'ui:gap-2 ui:w-auto ui:px-3 sm:ui:w-auto md:ui:px-5'} ${iconPos === 'left' && 'ui:flex-row-reverse'}`,
        className
      )}
      {...clickActionProps}
    >
      {loading ? (
        <div className="ui:flex ui:items-center ui:justify-center">
          <Spinner />
        </div>
      ) : (
        <Content />
      )}
    </BaseClickable>
  );
};
