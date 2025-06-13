import type { SVGProps } from 'react';

import type { SpritesMap } from '@/lib/sprite.h';

export type IconName = {
  [Key in keyof SpritesMap]: `${Key}/${SpritesMap[Key]}`;
}[keyof SpritesMap];

type IconOptions = {
  name: IconName;
};

export type IconProps = IconOptions & Omit<SVGProps<SVGSVGElement>, 'name' | 'type'>;
