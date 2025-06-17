export const ENDPOINTS = {
  common: {
    technique: '/techniques',
    user: '/users',
    partners: '/partners',
  },
  telegram: (token: string) => `https://api.telegram.org/bot${token}/sendMessage`,
};
