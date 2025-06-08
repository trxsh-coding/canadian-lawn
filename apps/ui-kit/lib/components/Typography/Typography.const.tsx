import {
  type TypographyAlignTextKeys,
  type TypographyColorsKeys,
  type TypographyFamilyKeys,
  type TypographyViewsKeys,
  type TypographyWeightKeys,
  type TypographyWhiteSpaceKeys,
} from './Typography.types';

export const colors: TypographyColorsKeys = {
  'current-color': 'text-current',
  primary: 'text-base-black',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
  'base-bg': 'text-base-bg',
  'base-white': 'text-base-white',
  'base-grey': 'text-base-grey',
  'secondary-grey': 'text-base-grey',
  'secondary-red': 'text-secondary-red',
};

export const views: TypographyViewsKeys = {
  heading1:
    'text-xl leading-[120%] uppercase tracking-[-4%] font-gothic lg:text-9 lg:leading-[117%]',
  heading2: 'text-lg leading-normal uppercase font-gothic lg:text lg:text-8 lg:leading-[130%]',
  heading3: 'text-sm leading-[126%] uppercase font-gothic lg:text-lg lg:leading-[130%]',
  button: 'text-xs font-semibold lg:text-md',
  regular: 'text-xl leading-[140%] tracking-[-4%] lg:text-sm',
  'card-header': 'text-sm font-semibold lg:text-sm',
  'card-price': 'text-sm leading-[110%] font-semibold lg:text-lg lg:leading-[100%]',
  small: 'text-xs font-semibold lg:text-sm',
  large1: 'text-xl font-semibold lg:text-[25px]',
  large2: 'text-lg leading-[120%] uppercase tracking-[-4%] lg:text-[33px] lg:leading-[122%]',
};

export const weights: TypographyWeightKeys = {
  bold: 'font-bold',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
};
export const families: TypographyFamilyKeys = {
  gothic: 'font-gothic',
  golos: 'font-golosRegular',
  golosBold: 'font-golosBold',
};

export const textAligns: TypographyAlignTextKeys = {
  center: 'text-center',
  left: 'text-left',
  right: 'text-right',
};

export const whiteSpaces: TypographyWhiteSpaceKeys = {
  'pre-line': 'whitespace-pre-line',
  nowrap: 'whitespace-nowrap',
};
