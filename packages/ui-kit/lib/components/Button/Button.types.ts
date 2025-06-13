import { type ClickActionProps, type IconName } from '@/lib';

export type ButtonColor =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'quaternary'
  | 'inverse'
  | 'outlined'
  | 'silvery'
  | 'icon-primary';

export type ButtonType = 'text' | 'button';

export type ButtonProps = React.PropsWithChildren<
  {
    className?: string;
    width?: 'fit' | 'fill';
    color?: ButtonColor;
    loading?: boolean;
    iconName?: IconName;
    iconPos?: 'left' | 'right';
    iconClassName?: string;
    effect?: 'ripple' | 'none';
    buttonType?: ButtonType;
  } & Exclude<ClickActionProps, 'onTouchStart'>
>;
