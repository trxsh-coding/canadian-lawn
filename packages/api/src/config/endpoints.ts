export const ENDPOINTS = {
  common: {
    technique: '/techniques',
    user: '/users',
    partners: '/partners',
    lawn: '/lawns',
    lawnFilters: '/filters',
    lawnBySlug: (slug: string) => `/lawn/getBySlug/${slug}`,
  },
  telegram: (token: string) => `https://api.telegram.org/bot${token}/sendMessage`,
};
