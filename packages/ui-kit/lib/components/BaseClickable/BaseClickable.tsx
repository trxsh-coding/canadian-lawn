import type {
  ElementType,
  ComponentPropsWithoutRef,
  PropsWithChildren,
  CSSProperties,
} from 'react';

import cn from '@/lib/utils/cnMerge';

type SharedProps = {
  className?: string;
  style?: CSSProperties;
  testId?: string;
  withHoverOpacity?: boolean;
};

export type BaseClickableProps<T extends ElementType = 'div'> = PropsWithChildren<
  SharedProps & {
    as?: T;
  } & ComponentPropsWithoutRef<T>
>;

export function BaseClickable<T extends ElementType = 'div'>({
  as,
  className,
  style,
  testId,
  withHoverOpacity = true,
  ...rest
}: BaseClickableProps<T>) {
  const Component = as || 'div';

  return (
    <Component
      data-testid={testId}
      style={style}
      className={cn('ui:no-underline', withHoverOpacity && 'ui:cursor-pointer', className)}
      {...rest}
    />
  );
}
