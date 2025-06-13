export interface SpritesMap {
  common:
    | 'arrow-button'
    | 'arrow'
    | 'back-arrow'
    | 'box'
    | 'cart'
    | 'check'
    | 'cross'
    | 'download'
    | 'grass'
    | 'info'
    | 'logo'
    | 'menu'
    | 'plus-menu'
    | 'share'
    | 'zoom';
  navigation: 'coin' | 'grass' | 'star' | 'tractor' | 'volt';
}
export const SPRITES_META: {
  common: Array<
    | 'arrow-button'
    | 'arrow'
    | 'back-arrow'
    | 'box'
    | 'cart'
    | 'check'
    | 'cross'
    | 'download'
    | 'grass'
    | 'info'
    | 'logo'
    | 'menu'
    | 'plus-menu'
    | 'share'
    | 'zoom'
  >;
  navigation: Array<'coin' | 'grass' | 'star' | 'tractor' | 'volt'>;
} = {
  common: [
    'arrow-button',
    'arrow',
    'back-arrow',
    'box',
    'cart',
    'check',
    'cross',
    'download',
    'grass',
    'info',
    'logo',
    'menu',
    'plus-menu',
    'share',
    'zoom',
  ],
  navigation: ['coin', 'grass', 'star', 'tractor', 'volt'],
};
