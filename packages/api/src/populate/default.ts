import { PRODUCT_POPULATE_LAWN } from '@/populate/lawn';
import { PRODUCT_COMPONENTS } from '@/types';

export const PRODUCT_POPULATE_BASE = {
  images: true,
  categories: true,
};

export const getProductPopulate = (type?: 'base' | 'lawn' | 'full'): ProductPopulate => {
  switch (type) {
    case 'lawn':
      return PRODUCT_POPULATE_LAWN;
    case 'full':
      return PRODUCT_POPULATE_FULL;
    default:
      return PRODUCT_POPULATE_BASE;
  }
};

export type Populate = boolean | '*' | string[] | PopulateObject;

export type PopulateObject = {
  [key: string]: Populate;
};

export type ProductPopulate = PopulateObject | '*';

export const PRODUCT_POPULATE_FULL = {
  seo: true,
  brand: true,
  related: {
    populate: ['images'],
  },
};

export const PRODUCT_POPULATE_DYNAMIC_ZONE = {
  attributes: {
    on: {
      [PRODUCT_COMPONENTS.LAWN_SINGLE]: {
        populate: '*',
      },
    },
  },
};
