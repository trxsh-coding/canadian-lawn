'use client';

import { Card } from '@canadian-lawn/ui-kit';

import CardPlaceholder from '@/assets/img/card-placeholder.png';
import { TechniqueCardLoader } from '@/components/atoms/Loaders/TechniqueLoader';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useTechnique } from '@/hooks/api/useTechnique';
import { useResponsiveValue } from '@/hooks/useResponsiveCounts';
import cn from '@/utils/cnMerge';

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
      color="light"
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
            image={image?.url}
            placeholder={CardPlaceholder.src}
          />
        ))
      ) : (
        <LoadingList />
      )}
    </SectionWrapper>
  );
};
