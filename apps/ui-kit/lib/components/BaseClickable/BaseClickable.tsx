import type * as Link from 'next/link';
import React from 'react';
import cn from '@/lib/utils/cnMerge';

/**
 * Универсальные экшен пропсы для всего кликабельного
 * Если ничего не будет передано в Element, будем считать, что это 'div'
 */
export type ClickActionProps = {
  withHoverOpacity?: boolean;
} & (
  | ({
      Element: typeof Link.default;
      href: string;
      onClick?: React.MouseEventHandler;
      onMouseDown?: React.MouseEventHandler;
      onTouchStart?: React.TouchEventHandler;
      nextLinkProps?: Pick<Link.LinkProps, 'prefetch'>;
    } & Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'rel' | 'target' | 'tabIndex'>)
  | ({
      Element: 'a';
      onClick?: React.MouseEventHandler;
      onMouseDown?: React.MouseEventHandler;
      onTouchStart?: React.TouchEventHandler;
    } & Pick<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'rel' | 'href' | 'target' | 'tabIndex'>)
  | ({
      Element?: 'button' | 'div';
      onClick?: React.MouseEventHandler;
      onMouseDown?: React.MouseEventHandler;
      onTouchStart?: React.TouchEventHandler;
    } & Pick<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type' | 'disabled' | 'tabIndex'>)
);

export type BaseClickableProps = React.PropsWithChildren<
  {
    className?: string;
    testId?: string;
    style?: React.CSSProperties;
    nextLinkProps?: Pick<Link.LinkProps, 'prefetch'>;
  } & ClickActionProps
>;

export const BaseClickable = ({
  Element = 'div',
  withHoverOpacity = true,
  className,
  nextLinkProps,
  testId,
  ...props
}: BaseClickableProps) => {
  return (
    // @ts-expect-error TS не может определить здесь условные типы, без игнорирования пришлось бы вручную поддерживать через switch-case каждый вариант Element
    <Element
      data-testid={testId}
      className={cn('ui:no-underline', withHoverOpacity && 'ui:cursor-pointer', className)}
      {...props}
      {...nextLinkProps}
    />
  );
};
