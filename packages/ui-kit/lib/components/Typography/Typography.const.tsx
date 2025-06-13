import {
  type TypographyAlignTextKeys,
  type TypographyColorsKeys,
  type TypographyFamilyKeys,
  type TypographyViewsKeys,
  type TypographyWeightKeys,
  type TypographyWhiteSpaceKeys,
} from '@/lib';

export const colors: TypographyColorsKeys = {
  'current-color': 'ui:text-current',
  primary: 'ui:text-baseBlack',
  secondary: 'ui:text-secondary',
  tertiary: 'ui:text-tertiary',
  'base-bg': 'ui:ui:text-baseBg',
  'base-white': 'ui:text-baseWhite',
  'base-grey': 'ui:text-baseGrey',
  'secondary-grey': 'ui:text-baseGrey',
  'secondary-red': 'ui:text-secondaryRed',
};

export const views: TypographyViewsKeys = {
  heading1:
    'ui:text-xl ui:leading-[120%] ui:uppercase ui:tracking-[-4%] ui:font-gothic lg:ui:text-9 lg:ui:leading-[117%]',
  heading2:
    'ui:text-lg ui:leading-normal ui:uppercase ui:font-gothic lg:ui:text lg:ui:text-8 lg:ui:leading-[130%]',
  heading3:
    'ui:text-sm ui:leading-[126%] ui:uppercase ui:font-gothic lg:ui:text-lg lg:ui:leading-[130%]',
  button: 'ui:text-xs ui:font-semibold lg:ui:text-md',
  regular: 'ui:text-[12px] ui:leading-[130%] ui:tracking-[-4%] lg:ui:text-sm',
  'card-header': 'ui:text-sm ui:font-semibold lg:ui:text-sm',
  'card-price': 'ui:text-sm ui:leading-[110%] ui:font-semibold lg:ui:text-lg lg:ui:leading-[100%]',
  small: 'ui:text-xs ui:font-semibold lg:ui:text-sm',
  large1: 'ui:text-xl ui:font-semibold lg:ui:text-[25px]',
  large2:
    'ui:text-lg ui:leading-[120%] ui:uppercase ui:tracking-[-4%] lg:ui:text-[33px] lg:ui:leading-[122%]',
};

export const weights: TypographyWeightKeys = {
  bold: 'font-bold',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
};

export const families: TypographyFamilyKeys = {
  gothic: 'ui:font-gothic',
  golos: 'ui:font-golosRegular',
  golosBold: 'ui:font-golosBold',
};

export const textAligns: TypographyAlignTextKeys = {
  center: 'ui:text-center',
  left: 'ui:text-left',
  right: 'ui:text-right',
};

export const whiteSpaces: TypographyWhiteSpaceKeys = {
  'pre-line': 'ui:whitespace-pre-line',
  nowrap: 'ui:whitespace-nowrap',
};
