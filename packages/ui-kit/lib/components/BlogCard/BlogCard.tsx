import { Pic, Typography } from '@/lib';
import cn from '@/lib/utils/cnMerge';

type BlogCardProps = {
  title: string;
  date: string;
  image?: string;
  className?: string;
  picClassName?: string;
  onClick?: VoidFunction;
};

export const BlogCard = ({
  title,
  image,
  date,
  picClassName,
  className,
  onClick,
}: BlogCardProps) => {
  return (
    <div
      className={cn('ui:cursor-pointer ui:flex ui:w-full ui:flex-col ui:lg:w-[426px]', className)}
      onClick={onClick}
    >
      <Pic
        className={cn(
          'ui:w-full ui:h-[223px] ui:mb-3 ui:lg:h-[290px] ui:lg:mb-5 ui:rounded-sm mb-3',
          picClassName
        )}
        src={image}
      />
      <Typography view="regular" className="ui:mb-2" color="secondary-grey">
        {date}
      </Typography>
      <Typography view="heading3" family="gothic">
        {title}
      </Typography>
    </div>
  );
};
