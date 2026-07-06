import { Pic, Typography } from '@/lib';
import cn from '@/lib/utils/cnMerge';

type CardProps = {
  title: string;
  subtitle: string | null;
  price: number;
  image?: string;
  placeholder?: string;
  className?: string;
  onTitleClick?: () => void;
};

export const Card = ({
  title,
  className,
  subtitle,
  price,
  image,
  placeholder,
  onTitleClick,
}: CardProps) => {
  return (
    <div
      className={cn(
        'ui:rounded-sm ui:bg-baseWhite ui:flex ui:flex-col ui:max-w-[220px] ui:lg:max-w-[315px]',
        className
      )}
    >
      <Pic
        src={image}
        skeleton={placeholder}
        fit="contain"
        childClassName="ui:w-full ui:h-full ui:!absolute ui:top-0 ui:left-0 z-10"
        className={cn(
          'ui:rounded-sm ui:relative ui:w-[220px] ui:h-[124px] ui:lg:w-[315px] ui:lg:h-[174px]',
          !image && 'bg-'
        )}
      />
      <div className="ui:flex ui:flex-col ui:p-4 ui:lg:p-6 ui:justify-between ui:min-h-[149px] ui:lg:min-h-[188px]">
        <div className="ui:flex ui:flex-col ui:gap-3">
          <Typography
            view="card-price"
            className={cn(
              'ui:font-golosBold',
              onTitleClick && 'ui:cursor-pointer ui:hover:underline'
            )}
            onClick={onTitleClick}
          >
            {title}
          </Typography>
          <Typography view="small">{subtitle}</Typography>
        </div>
        <div>
          <Typography view="card-price" family="golosBold" color="tertiary">
            {price}₽
          </Typography>
        </div>
      </div>
    </div>
  );
};
