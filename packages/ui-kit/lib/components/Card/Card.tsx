import { Pic, Typography } from '@/lib';
type CardProps = {
  title: string;
  subtitle: string | null;
  price: number;
  image?: string;
};

export const Card = ({ title, subtitle, price, image }: CardProps) => {
  return (
    <div className="ui:rounded-sm ui:bg-baseWhite ui:flex ui:flex-col ui:max-w-[220px] ui:lg:max-w-[315px]">
      {image && (
        <Pic
          src={image}
          fit="contain"
          childClassName="ui:w-full ui:h-full ui:!absolute ui:top-0 ui:left-0 z-10"
          className="ui:rounded-sm ui:relative ui:w-[220px] ui:h-[124px] ui:lg:w-[315px] ui:lg:h-[174px]"
        />
      )}
      <div className="ui:flex ui:flex-col ui:p-4 ui:lg:p-6 ui:justify-between ui:min-h-[149px] ui:lg:min-h-[188px]">
        <div className="ui:flex ui:flex-col ui:gap-3">
          <Typography view="card-price" className="ui:font-golosBold">
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
