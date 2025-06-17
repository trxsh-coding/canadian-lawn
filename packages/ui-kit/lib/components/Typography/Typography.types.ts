export type TypographyView =
  | 'heading1'
  | 'large1'
  | 'heading2'
  | 'heading3'
  | 'button'
  | 'regular'
  | 'card-header'
  | 'card-price'
  | 'small'
  | 'tiny'
  | 'large2';

export type TypographyViewsKeys = { [key in TypographyView]: string };

export type TypographyColor =
  | 'current-color'
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'base-white'
  | 'base-bg'
  | 'base-grey'
  | 'base-black'
  | 'secondary-red'
  | 'secondary-grey';

export type TypographyColorsKeys = { [key in TypographyColor]: string };

export type TypographyWeight = 'normal' | 'medium' | 'semibold' | 'bold';

export type TypographyWeightKeys = { [key in TypographyWeight]: string };

export type TypographyFamily = 'gothic' | 'golosBold' | 'golos';

export type TypographyFamilyKeys = { [key in TypographyFamily]: string };

export type TypographyWhiteSpace = 'pre-line' | 'nowrap';

export type TypographyWhiteSpaceKeys = {
  [key in TypographyWhiteSpace]: string;
};

export type TypographyAlignText = 'left' | 'center' | 'right';

export type TypographyAlignTextKeys = { [key in TypographyAlignText]: string };

export type TypographyElement =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'div'
  | 'span'
  | 'label'
  | 'p';
