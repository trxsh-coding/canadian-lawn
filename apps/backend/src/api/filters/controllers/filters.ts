/**
 * A set of functions called "actions" for `filters`
 */
import type { Context } from 'koa';

export default {
  async getFilters(ctx: Context) {
    const [brands, lawnTypes, partnerTypes, purposes, features, lawns] = await Promise.all([
      strapi.entityService.findMany('api::brand.brand', {
        fields: ['id', 'name'],
      }),
      strapi.entityService.findMany('api::lawn-type.lawn-type', {
        fields: ['id', 'name'],
      }),
      strapi.entityService.findMany('api::partners-type.partners-type', {
        fields: ['id', 'name'],
      }),
      strapi.entityService.findMany('api::purpose.purpose', {
        fields: ['id', 'name', 'slug'],
      }),
      strapi.entityService.findMany('api::feature.feature', {
        fields: ['id', 'name', 'slug'],
      }),
      strapi.entityService.findMany('api::lawn.lawn', {
        fields: ['speed', 'resistance'],
        limit: -1,
      }),
    ]);

    const getMinMax = (arr: number[], fallback: [number, number] = [0, 0]) => {
      const nums = arr.filter((n) => typeof n === 'number' && !isNaN(n));
      return nums.length
        ? {
            min: Math.min(...nums),
            max: Math.max(...nums),
          }
        : { min: fallback[0], max: fallback[1] };
    };

    const speedRange = getMinMax(
      lawns.map((l) => l.speed ?? 0),
      [0, 30]
    );
    const resistanceRange = getMinMax(
      lawns.map((l) => l.resistance ?? 0),
      [0, 30]
    );

    ctx.body = {
      data: {
        brands,
        lawnTypes,
        partnerTypes,
        purposes,
        features,
        seedRiseDays: speedRange,
        coveringWeeks: resistanceRange,
      },
    };
  },
};
