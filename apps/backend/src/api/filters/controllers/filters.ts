/**
 * A set of functions called "actions" for `filters`
 */
import type { Context } from 'koa';

export default {
  async getFilters(ctx: Context) {
    const { productType } = ctx.query as { productType?: string };

    if (productType === 'lawn' || productType === 'lawn-mix') {
      const [brands, lawnTypes, partnerTypes, features, minPriceArr, maxPriceArr] =
        await Promise.all([
          strapi.entityService.findMany('api::brand.brand', {
            fields: ['id', 'name'],
          }),
          strapi.entityService.findMany('api::lawn-type.lawn-type', {
            fields: ['id', 'name'],
          }),
          strapi.entityService.findMany('api::partners-type.partners-type', {
            fields: ['id', 'name'],
          }),
          strapi.entityService.findMany('api::feature.feature', {
            fields: ['id', 'name'],
          }),
          strapi.entityService.findMany('api::product.product', {
            filters: { type: productType },
            sort: ['price:asc'],
            limit: 1,
            fields: ['price'],
          }),
          strapi.entityService.findMany('api::product.product', {
            filters: { type: productType },
            sort: ['price:desc'],
            limit: 1,
            fields: ['price'],
          }),
        ]);

      const minPrice = (minPriceArr[0] as { price: number } | undefined)?.price ?? 0;
      const maxPrice = (maxPriceArr[0] as { price: number } | undefined)?.price ?? 100000;

      ctx.body = {
        data: [
          { field: 'partnerTypes', type: 'checkbox', title: 'Назначение', values: partnerTypes },
          { field: 'lawnTypes', type: 'checkbox', title: 'Растения в составе', values: lawnTypes },
          { field: 'features', type: 'checkbox', title: 'Особенности', values: features },
          { field: 'brands', type: 'checkbox', title: 'Бренды', values: brands },
          { field: 'price', type: 'range', title: 'Цена', min: minPrice, max: maxPrice },
        ],
      };
      return;
    }

    ctx.body = { data: [] };
  },
};
