import { type IconName } from '@canadian-lawn/ui-kit';

import { ROUTES } from '@/config/routes';

export type NavLinkType = {
  url: string;
  text: string;
  iconName: IconName;
};

export const NavLinksItems: NavLinkType[] = [
  {
    url: ROUTES.technique.url,
    text: 'Техника Б/У',
    iconName: 'navigation/tractor',
  },
  {
    url: ROUTES.lawn.url,
    text: 'Семена',
    iconName: 'navigation/grass',
  },
  {
    url: '/',
    text: 'Семена со скидкой',
    iconName: 'navigation/coin',
  },
  {
    url: '/',
    text: 'Быстрорастущие семена',
    iconName: 'navigation/volt',
  },
  {
    url: '/',
    text: 'Мятлик',
    iconName: 'navigation/star',
  },
];
