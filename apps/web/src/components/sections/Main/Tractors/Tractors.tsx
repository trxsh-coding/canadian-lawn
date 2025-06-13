import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@canadian-lawn/ui-kit';
import { Technique } from '@canadian-lawn/api';
import { ENV } from '@/config/env';

type TractorsProps = {
  className?: string;
  items: Technique[];
};
export const Tractors = ({ items, className }: TractorsProps) => {
  return (
    <SectionWrapper className={className} headline="Свежие объявления">
      {items.map(({ price, title, description, id, image }) => (
        <Card
          key={id}
          price={price}
          subtitle={description}
          title={title}
          image={ENV.strapi?.concat(image!.url)}
        />
      ))}
    </SectionWrapper>
  );
};
