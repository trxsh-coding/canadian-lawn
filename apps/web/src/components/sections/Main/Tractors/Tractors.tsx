'use client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Card } from '@canadian-lawn/ui-kit';
import { useTechnique } from '@/hooks/useTechnique';
import { getImageUrl } from '@/utils/image';
import cn from '@/utils/cnMerge';

type TractorsProps = {
  className?: string;
};
export const Tractors = ({ className }: TractorsProps) => {
  const { useHook: technique } = useTechnique();

  const { data: techniqueData } = technique();

  return (
    <SectionWrapper className={cn('mb-section', className)} headline="Свежие объявления">
      {techniqueData?.data.map(({ price, title, description, id, image }) => (
        <Card
          key={id}
          price={price}
          subtitle={description}
          title={title}
          image={getImageUrl(image!.url)}
        />
      ))}
    </SectionWrapper>
  );
};
