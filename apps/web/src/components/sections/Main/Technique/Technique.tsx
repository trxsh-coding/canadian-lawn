'use client';

import { Card } from '@canadian-lawn/ui-kit';

import { TechniqueCardLoader } from '@/components/atoms/Loaders/TechniqueLoader';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useResponsiveValue } from '@/hooks/useResponsiveCounts';
import { useTechnique } from '@/hooks/useTechnique';
import cn from '@/utils/cnMerge';
import { getImageUrl } from '@/utils/image';

type TractorsProps = {
  className?: string;
};

export const Technique = ({ className }: TractorsProps) => {
  const { useHook: technique } = useTechnique();
  const { data: techniqueData, isError, isLoading } = technique();

  const count = useResponsiveValue({ desktop: 3, mobile: 1, tablet: 2, mobileSm: 3 });

  const LoadingList = () =>
    Array.from({ length: count }).map((_, index) => (
      <div className="flex gap-5 overflow-scroll" key={index}>
        <TechniqueCardLoader uniqueKey={`technique-loader-${index}`} />
      </div>
    ));

  return (
    <SectionWrapper
      className={cn('mb-section', className)}
      headline="Свежие объявления"
      isError={isError}
    >
      {!isLoading ? (
        techniqueData?.data.map(({ price, title, description, id, image }) => (
          <Card
            key={id}
            price={price}
            subtitle={description}
            title={title}
            image={getImageUrl(image!.url)}
          />
        ))
      ) : (
        <LoadingList />
      )}
    </SectionWrapper>
  );
};
