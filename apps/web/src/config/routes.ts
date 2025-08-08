export type RoutesType = {
  [key: string]: {
    url: string;
    name: string;
    desktopHide?: boolean;
  };
};

export const ROUTES: RoutesType = {
  home: {
    url: '/',
    name: 'Главная',
  },
  lawn: {
    url: '/lawn',
    name: 'Семена',
  },
  partners: {
    url: '/partners',
    name: 'Партнеры',
  },
  blog: {
    url: '/blog',
    name: 'Главная',
  },
  about: {
    url: '/about',
    name: 'О нас',
  },
  contact: {
    url: '/contact',
    name: 'Контакты',
  },
  faq: {
    url: '/faq',
    name: 'faq',
  },
  profile: {
    url: '/profile',
    name: 'Профиль',
    desktopHide: true,
  },
};

export const detailRoutes = {
  lawn: (slug: string) => `/lawn/${slug}`,
};
