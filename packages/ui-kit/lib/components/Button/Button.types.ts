import React from 'react';

import { type BaseClickableProps, type IconName } from '@/lib';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'inverse'
  | 'outlined'
  | 'silvery'
  | 'icon-primary';

export type ButtonType = 'text' | 'button' | 'icon';

export type ButtonProps = React.PropsWithChildren<
  {
    className?: string;
    width?: 'fit' | 'fill';
    color?: ButtonColor;
    loading?: boolean;
    inactive?: boolean;
    suffixIconName?: IconName;
    suffixIconClassName?: string;
    iconName?: IconName;
    iconClassName?: string;
    iconWrapperClassName?: string;
    buttonType?: ButtonType;
    htmlType?: NativeButtonType;
    onIconClick?: VoidFunction;
    onSuffixIconClick?: VoidFunction;
  } & Exclude<BaseClickableProps<'button'>, 'onTouchStart'>
>;

export type NativeButtonType = 'button' | 'submit' | 'reset';
