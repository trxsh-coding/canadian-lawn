// import type { Core } from '@strapi/strapi';

import { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register({ strapi }: { strapi: Core.Strapi }) {
    strapi
      .plugin('users-permissions')
      .service('providers-registry')
      .add('yandex', {
        icon: 'yandex',
        enabled: true,
        grantConfig: {
          key: strapi.config.get('server.yandex_secret'),
          secret: strapi.config.get('server.yandex_client_id'),
          callback: `${strapi.config.server.url}/auth/yandex/callback`,
          scope: ['login:email'],
          authorize_url: 'https://oauth.yandex.ru/authorize',
          access_url: 'https://oauth.yandex.ru/token',
          oauth: 2,
        },
        async authCallback({ accessToken, purest }) {
          try {
            const yandex = purest({ provider: 'yandex' });

            const response = await yandex
              .get('https://login.yandex.ru/info')
              .auth(accessToken)
              .request();

            const userData = response.body;

            return {
              username: userData.login || userData.default_email?.split('@')[0],
              email: userData.default_email,
              firstname: userData.first_name,
              lastname: userData.last_name,
            };
          } catch (error) {
            console.error('Yandex auth error:', error);
            throw new Error('Failed to fetch user data from Yandex');
          }
        },
      });
  },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  bootstrap(/* { strapi }: { strapi: Core.Strapi } */) {},
};
