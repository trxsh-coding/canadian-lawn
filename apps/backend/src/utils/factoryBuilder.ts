import { factories, UID } from '@strapi/strapi';

import { extendCoreRouter } from './index';

export const createSlugAPI = (name: string) => {
  const contentType = `api::${name}.${name}` as UID.ContentType;

  const service = factories.createCoreService(contentType, ({ strapi }) => ({
    async findOneBySlug(slug: string, { populate }: { populate?: never } = {}) {
      return strapi.db.query(contentType).findOne({
        where: { slug },
        populate,
      });
    },
  }));

  const controller = factories.createCoreController(contentType, ({ strapi }) => ({
    async findOneBySlug(ctx) {
      const { slug } = ctx.params;
      const sanitizedQuery = await this.sanitizeQuery(ctx);

      const result = await strapi.service(contentType).findOneBySlug(slug, {
        populate: sanitizedQuery.populate,
      });

      const sanitizedResults = await this.sanitizeOutput(result, ctx);
      return this.transformResponse(sanitizedResults);
    },
  }));

  const customRoutes = [
    {
      method: 'GET',
      path: `/${name}/getBySlug/:slug`,
      handler: `${contentType}.findOneBySlug`,
    },
  ];

  const router = extendCoreRouter(factories.createCoreRouter(contentType), customRoutes);

  return { service, controller, routes: customRoutes, router };
};
