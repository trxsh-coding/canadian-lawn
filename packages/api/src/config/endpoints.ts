export const ENDPOINTS = {
  common: {
    technique: '/techniques',
    user: '/users',
    partners: '/partners',
    lawn: '/lawns',
  },
  telegram: (token: string) => `https://api.telegram.org/bot${token}/sendMessage`,
};
