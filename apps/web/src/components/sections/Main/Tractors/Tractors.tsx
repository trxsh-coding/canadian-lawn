'use client';

import { Card } from '@canadian-lawn/ui-kit';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useTechnique } from '@/hooks/useTechnique';
import cn from '@/utils/cnMerge';
import { getImageUrl } from '@/utils/image';

type TractorsProps = {
  className?: string;
};

export const Tractors = ({ className }: TractorsProps) => {
  const { useHook: technique } = useTechnique();

  const { data: techniqueData, isError, isLoading } = technique();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return null;

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
