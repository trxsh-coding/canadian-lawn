import { Alien } from '@strapi/icons';
import type { StrapiApp } from '@strapi/strapi/admin';

export default {
  config: {
    locales: [
      'ru',
      // 'ar',
      // 'fr',
      // 'cs',
      // 'de',
      // 'dk',
      // 'es',
      // 'he',
      // 'id',
      // 'it',
      // 'ja',
      // 'ko',
      // 'ms',
      // 'nl',
      // 'no',
      // 'pl',
      // 'pt-BR',
      // 'pt',
      // 'ru',
      // 'sk',
      // 'sv',
      // 'th',
      // 'tr',
      // 'uk',
      // 'vi',
      // 'zh-Hans',
      // 'zh',
    ],
  },
  register(app: StrapiApp) {
    app.addMenuLink({
      to: '/contact-dashboard',
      icon: Alien,
      intlLabel: {
        id: 'contact-dashboard.title',
        defaultMessage: 'Contact Dashboard',
      },
      Component: () => import('./pages/contact-dashboard').then((m) => ({ default: m.default })),
      permissions: [
        {
          action: 'plugin::content-manager.explorer.read',
          subject: 'api::contact-request.contact-request',
        },
      ],
    });
  },
  bootstrap(app: StrapiApp) {
    console.log(app);
  },
};
