import 'dotenv/config';

export const ENV = {
  STRAPI_HOST: process.env.NEXT_PUBLIC_STRAPI_HOST ?? '',
  STRAPI_TOKEN: process.env.NEXT_PUBLIC_STRAPI_TOKEN ?? '',
  TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN ?? '',
  TELEGRAM_CHAT_ID: process.env.TELEGRAM_CHAT_ID ?? '',
  TELEGRAM_ORDER_THREAD_ID: process.env.TELEGRAM_ORDER_THREAD_ID ?? '',
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000',
};
