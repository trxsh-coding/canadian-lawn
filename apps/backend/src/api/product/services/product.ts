/**
 * product service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::product.product', ({ strapi }) => ({
  async findOneBySlug(slug, { populate }) {
    return strapi.db.query('api::product.product').findOne({
      where: { slug },
      populate,
    });
  },
}));
