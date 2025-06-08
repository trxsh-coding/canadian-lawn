import type { IconProps } from './Icon.types';

export const Icon = ({
  name,
  className,
  viewBox,
  width = 16,
  height = 16,
  ...props
}: IconProps) => {
  const [spriteName, iconName] = name.split('/');

  return (
    <svg
      aria-hidden
      className={className}
      focusable="false"
      viewBox={viewBox}
      width={width}
      height={height}
      {...props}
    >
      <use xlinkHref={`/sprites/${spriteName}.svg#${iconName}`} />
    </svg>
  );
};
