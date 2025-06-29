/**
 * lawn controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::lawn.lawn', ({ strapi }) => ({
  async findOneBySlug(ctx) {
    const { slug } = ctx.params;

    const sanitizedQuery = await this.sanitizeQuery(ctx);

    const result = await strapi.service('api::lawn.lawn').findOneBySlug(slug, {
      populate: sanitizedQuery.populate,
    });

    const sanitizedResults = await this.sanitizeOutput(result, ctx);

    return this.transformResponse(sanitizedResults);
  },
}));
