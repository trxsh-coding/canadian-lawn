export const PRODUCT_POPULATE_LAWN = {
  images: true,
  categories: true,
  partner: true,
  lawn: {
    populate: {
      mix: {
        populate: {
          product: {
            populate: ['images'],
          },
        },
      },
      package: true,
      landing: true,
      type: true,
    },
  },
};
