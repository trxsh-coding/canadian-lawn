import { Button, Pic } from '@/lib';
import cn from '@/lib/utils/cnMerge';
type CardProps = {
  title: string;
  image?: string;
  className?: string;
  imageClassName?: string;
};

export const PartnerCard = ({ title, image, className, imageClassName }: CardProps) => {
  return (
    <div
      className={cn(
        'ui:rounded-sm ui:bg-baseWhite ui:flex ui:w-full ui:flex-col ui:lg:justify-between ui:md:max-w-[426px] ui:p-4 ui:lg:p-6 ui:lg:gap-5 lg:h-[229px]',
        className
      )}
    >
      {image && (
        <Pic
          src={image}
          fit="contain"
          className={cn('ui:md:!h-[130px] ui:h-[124px] z-10', imageClassName)}
        />
      )}
      <Button
        buttonType="text"
        className="w-full justify-between"
        iconWrapperClassName="w-full justify-between"
        iconClassName="w-4 h-4 "
      >
        {title}
      </Button>
    </div>
  );
};
