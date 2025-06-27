import cn from '@/utils/cnMerge';

type ContainerProps = {
  children?: React.ReactNode;
  backgroundColor?: 'green' | 'light-green' | 'base';
  className?: string;
};

export const Container = ({ children, backgroundColor, className }: ContainerProps) => {
  return (
    <div
      className={cn(
        'bg-baseWhite w-full',
        backgroundColor === 'green' && 'bg-secondary',
        backgroundColor === 'light-green' && 'bg-primary',
        backgroundColor === 'base' && 'bg-baseSecondaryBg',
        className
      )}
    >
      {children}
    </div>
  );
};
