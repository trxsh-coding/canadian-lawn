/**
 * lawn router
 */
import { factories } from '@strapi/strapi';

import { extendCoreRouter } from '../../../utils/index';

import extendedRoutes from './01-custom-routes';

const defaultRoutes = factories.createCoreRouter('api::lawn.lawn');

export default extendCoreRouter(defaultRoutes, extendedRoutes);
