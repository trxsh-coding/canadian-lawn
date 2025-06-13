import * as React from 'react';

import { colors, textAligns, views, weights, whiteSpaces, families } from '@/lib';
import type {
  TypographyView,
  TypographyElement,
  TypographyColor,
  TypographyWeight,
  TypographyAlignText,
  TypographyWhiteSpace,
  TypographyFamily,
} from '@/lib';

import cnMerge from '../../utils/cnMerge';

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
  family = 'golos',
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
        view ? views[view] : 'ui:[font-size:inherit]',
        family ? families[family] : 'ui:[font-golosRegular]',
        weight && weights[weight],
        ellipsis && 'ui:block ui:truncate',
        textAlign ? textAligns[textAlign] : 'ui:[text-align:inherit]',
        whiteSpace && whiteSpaces[whiteSpace],
        className
      )}
      data-view={view || null}
    >
      {children}
    </Element>
  );
};
