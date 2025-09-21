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
    feedback: '/contact-requests',
    me: '/users/me',
    blog: '/blogs',
    faq: '/faqs',
    getBySlug: (slug: string, route: string) => `/${route}/getBySlug/${slug}`,
  },
  telegram: (token: string) => `https://api.telegram.org/bot${token}/sendMessage`,
};
