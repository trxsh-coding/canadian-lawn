/**
 * product controller
 */

import { factories } from '@strapi/strapi';
import type { Context } from 'koa';

import { buildProductFilters } from '../utils/buildProductFilters';

const LAWN_POPULATE: Record<string, unknown> = {
  image: true,
  partner: true,
  lawn_type: true,
  brand: true,
  features: true,
  lawn: {
    populate: {
      type: true,
      package: true,
      landing: true,
      mix: {
        populate: { product: { populate: ['images'] } },
      },
    },
  },
};

export default factories.createCoreController('api::product.product', ({ strapi }) => ({
  async findOneBySlug(ctx) {
    const { slug } = ctx.params;

    const sanitizedQuery = await this.sanitizeQuery(ctx);

    const result = await strapi.service('api::product.product').findOneBySlug(slug, {
      populate: sanitizedQuery.populate,
    });

    const sanitizedResults = await this.sanitizeOutput(result, ctx);

    return this.transformResponse(sanitizedResults);
  },

  async findLawns(ctx: Context) {
    const { lawnTypes, partnerTypes, brands, features } = ctx.query;

    const filters = buildProductFilters('lawn', { lawnTypes, partnerTypes, brands, features });

    const [data, total] = await Promise.all([
      strapi.entityService.findMany('api::product.product', {
        filters,
        populate: LAWN_POPULATE,
      }),
      strapi.entityService.count('api::product.product', { filters }),
    ]);

    ctx.body = { data, meta: { total } };
  },
}));
