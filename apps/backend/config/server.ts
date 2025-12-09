export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  yandex_secret: env('YANDEX_CLIENT_SECRET'),
  yandex_client_id: env('YANDEX_CLIENT_ID'),
  app: {
    keys: env.array('APP_KEYS'),
  },
  transfer: {
    token: {
      salt: env('STRAPI_TRANSFER_TOKEN_SALT'),
    },
    remote: {
      enabled: true,
    },
  },
  features: ['deepFilters'],
});
