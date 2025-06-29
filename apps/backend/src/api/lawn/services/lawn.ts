/**
 * lawn service
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreService('api::lawn.lawn', ({ strapi }) => ({
  async findOneBySlug(slug, { populate }) {
    return strapi.db.query('api::lawn.lawn').findOne({
      where: {
        slug: slug,
      },
      populate,
    });
  },
}));
