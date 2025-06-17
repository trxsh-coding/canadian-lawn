import * as React from 'react';

import cn from '@/lib/utils/cnMerge';

export type PicProps = React.PropsWithChildren<{
  src?: string | null;
  alt?: string | null;
  className?: string;
  childClassName?: string;
  fit?: 'cover' | 'contain';
  shape?: 'fill' | 'circle';
  fade?: boolean;
  skeleton?: React.ReactNode;
  withBackdrop?: boolean;
}>;

export const Pic = ({
  src,
  alt,
  className,
  childClassName,
  fit = 'cover',
  shape,
  skeleton,
  children,
  withBackdrop,
}: PicProps) => {
  const [loaded, setLoaded] = React.useState(false);

  const containerClassName = cn(
    'ui:relative ui:overflow-hidden ui:flex-shrink-0 ui:bg-bg',
    shape === 'fill' && 'ui:w-full ui:h-full',
    shape === 'circle' && 'ui:rounded-full',
    className
  );

  const imgClassName = cn(
    'ui:object-center ui:relative ui:w-full ui:h-full',
    fit === 'cover' && 'ui:object-cover',
    fit === 'contain' && 'ui:object-contain'
  );

  if (!loaded && skeleton) return skeleton;

  return (
    <div className={containerClassName}>
      {src && withBackdrop && (
        <div
          className="ui:absolute ui:top-0 ui:left-0 ui:w-full ui:h-full ui:z-0"
          style={{
            backgroundImage: `url(${src})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'blur(3px)',
          }}
        />
      )}

      {src && (
        <img
          src={src}
          alt={alt || ''}
          className={cn(imgClassName, 'ui:z-10')}
          onLoad={() => setLoaded(true)}
        />
      )}

      {children && <div className={cn('ui:relative ui:z-20', childClassName)}>{children}</div>}
    </div>
  );
};
