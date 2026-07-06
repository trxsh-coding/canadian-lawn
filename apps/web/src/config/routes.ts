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
  lawnMix: {
    url: '/lawn-mix',
    name: 'Травосмеси',
  },
  partners: {
    url: '/partners',
    name: 'Партнеры',
  },
  technique: {
    url: '/technique',
    name: 'Техника',
  },
  blogs: {
    url: '/blogs',
    name: 'Блог',
  },
  about: {
    url: '/about',
    name: 'О нас',
  },
  contact: {
    url: '/contacts',
    name: 'Контакты',
  },
  faq: {
    url: '/faq',
    name: 'faq',
  },
  cart: {
    url: '/cart',
    name: 'Корзина',
  },
  profile: {
    url: '/profile',
    name: 'Профиль',
    desktopHide: true,
  },
};

export const detailRoutes = {
  lawn: (slug: string) => `/lawn/${slug}`,
  blog: (slug: string) => `/blogs/${slug}`,
  lawnMix: (slug: string) => `/lawn-mix/${slug}`,
  mix: (slug: string) => `/mix/${slug}`,
  traktor: (slug: string) => `/traktor/${slug}`,
  technique: (slug: string) => `/technique/${slug}`,
};
