import * as React from 'react';
import cn from '@/lib/utils/cnMerge';

export type PicProps = React.PropsWithChildren<{
  src?: string | null;
  alt?: string | null;
  className?: string;
  fit?: 'cover' | 'contain';
  shape?: 'fill' | 'circle';
  'data-testid'?: string;
  backgroundColor?: string;
  skeleton?: React.ReactNode;
  isLoading?: boolean;
}>;

export const Pic = ({
  src,
  alt,
  className,
  fit = 'cover',
  shape,
  backgroundColor,
  skeleton,
  children,
  ...props
}: PicProps) => {
  const [loaded, setLoaded] = React.useState<boolean>(false);

  const containerClassName = cn(
    'ui:flex-shrink-0 ui:overflow-hidden ui:relative ui:bg-bg',
    shape === 'fill' && 'ui:w-full ui:h-full',
    shape === 'circle' && 'ui:rounded-full',
    className
  );
  const hasChildren = Boolean(children);

  const imgClassName = cn(
    !hasChildren && containerClassName,
    'ui:object-center',
    fit === 'cover' && 'object-cover',
    fit === 'contain' && 'object-contain',
    hasChildren && 'ui:absolute ui:top-0 ui:right-0 ui:w-full ui:h-full ui:z-1'
  );

  const imgNode = (
    <img
      data-testid={props['data-testid']}
      src={src || ''}
      alt={alt || ''}
      className={imgClassName}
      style={{ backgroundColor }}
      onLoad={() => setLoaded(true)}
    />
  );

  React.useEffect(() => {
    if (!src) return;

    const img = new Image();
    img.src = src;

    const handleLoad = () => setLoaded(true);

    img.addEventListener('load', handleLoad);

    return () => {
      img.removeEventListener('load', handleLoad);
    };
  }, [src]);

  if (!loaded && skeleton) return skeleton;

  if (hasChildren) {
    return (
      <div className={containerClassName}>
        {src && imgNode}
        <div className="ui:relative ui:z-2">{children}</div>
      </div>
    );
  }

  return imgNode;
};
