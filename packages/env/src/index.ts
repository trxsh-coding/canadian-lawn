export const ENV = {
  STRAPI_HOST: process.env.NEXT_PUBLIC_STRAPI_HOST ?? '',
  STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL ?? '',
  STRAPI_TOKEN: process.env.NEXT_PUBLIC_STRAPI_TOKEN ?? '',
  BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
  GOOGLE_MAPS_TOKEN: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API ?? '',
  GOOGLE_MAP_ID: process.env.NEXT_PUBLIC_GOOGLE_MAP_ID ?? '',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ?? '',
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID ?? '',
  TELEGRAM_ORDER_THREAD_ID: Number(process.env.TELEGRAM_ORDER_THREAD_ID ?? 0),
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
  IS_DEVELOPMENT: process.env.NODE_ENV === 'development',
};
