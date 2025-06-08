import * as React from 'react';

import cnMerge from '../../utils/cnMerge';

import { colors, textAligns, views, weights, whiteSpaces, families } from './Typography.const';
import type {
  TypographyView,
  TypographyElement,
  TypographyColor,
  TypographyWeight,
  TypographyAlignText,
  TypographyWhiteSpace,
  TypographyFamily,
} from './Typography.types';

export type TypographyProps = React.PropsWithChildren<{
  Element?: TypographyElement;
  view?: TypographyView;
  color?: TypographyColor;
  weight?: TypographyWeight;
  family?: TypographyFamily;
  className?: string;
  ellipsis?: boolean;
  whiteSpace?: TypographyWhiteSpace;
  textAlign?: TypographyAlignText;
}> &
  Omit<React.HTMLProps<HTMLElement>, 'ref'>;

export const Typography = ({
  children,
  className,
  view = 'regular',
  color = 'primary',
  weight,
  family,
  Element = 'div',
  ellipsis,
  textAlign,
  whiteSpace,
  ...props
}: TypographyProps) => {
  return (
    <Element
      {...props}
      className={cnMerge(
        colors[color],
        view ? views[view] : '[font-size:inherit]',
        family ? families[family] : '[font-golosRegular]',
        weight && weights[weight],
        ellipsis && 'ui-block ui-truncate',
        textAlign ? textAligns[textAlign] : '[text-align:inherit]',
        whiteSpace && whiteSpaces[whiteSpace],
        className
      )}
      data-view={view || null}
    >
      {children}
    </Element>
  );
};
