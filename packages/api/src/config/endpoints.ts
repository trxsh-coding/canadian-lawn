export const ENDPOINTS = {
  common: {
    technique: '/techniques',
    user: '/users',
    partners: '/partners',
    lawn: '/lawns',
    lawnFilters: '/filters',
    contacts: '/contact-page',
    about: '/about-page',
    register: '/auth/local/register',
    me: '/users/me',
    lawnBySlug: (slug: string) => `/lawn/getBySlug/${slug}`,
  },
  telegram: (token: string) => `https://api.telegram.org/bot${token}/sendMessage`,
};
