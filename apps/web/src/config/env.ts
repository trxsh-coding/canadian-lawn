export const IS_PRODUCTION = process.env.NODE_ENV === 'production';

export const IS_DEVELOPMENT = process.env.NODE_ENV === 'development';

export const ENV = {
  strapi: process.env.NEXT_PUBLIC_STRAPI_URL,
};
