import { type IconName } from '@canadian-lawn/ui-kit';

export type NavLinkType = {
  url: string;
  text: string;
  iconName: IconName;
};

export const NavLinksItems: NavLinkType[] = [
  {
    url: '/',
    text: 'Техника Б/У',
    iconName: 'navigation/tractor',
  },
  {
    url: '/',
    text: 'Новая техника',
    iconName: 'navigation/tractor',
  },
  {
    url: '/',
    text: 'Семена Оптом',
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
