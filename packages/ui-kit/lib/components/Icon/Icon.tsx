import type { IconProps } from '@/lib';

export const Icon = ({
  name,
  className,
  viewBox,
  width = 24,
  height = 24,
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
