import useEmblaCarousel from 'embla-carousel-react';
import React from 'react';

import { Button } from '@/lib/components/Button/Button';
import cn from '@/lib/utils/cnMerge';

type CarouselProps = {
  children: React.ReactNode;
  className?: string;
  gap?: string;
};

export const Carousel = ({ children, className, gap = 'ui:gap-4' }: CarouselProps) => {
  const [carouselRef, carouselApi] = useEmblaCarousel({ align: 'start', dragFree: true });
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const update = React.useCallback(() => {
    if (!carouselApi) return;
    setCanPrev(carouselApi.canScrollPrev());
    setCanNext(carouselApi.canScrollNext());
  }, [carouselApi]);

  React.useEffect(() => {
    if (!carouselApi) return;
    carouselApi.on('select', update);
    carouselApi.on('reInit', update);
    update();
    return () => {
      carouselApi.off('select', update);
      carouselApi.off('reInit', update);
    };
  }, [carouselApi, update]);

  return (
    <div className={cn('ui:flex ui:items-center ui:gap-2', className)}>
      {canPrev ? (
        <Button
          iconName="common/back-arrow"
          buttonType="icon"
          color="secondary"
          onClick={() => carouselApi?.scrollPrev()}
          className="ui:flex-shrink-0"
        />
      ) : (
        <div className="ui:flex-shrink-0 ui:w-10" />
      )}

      <div className="ui:overflow-hidden ui:flex-1" ref={carouselRef}>
        <div className={cn('ui:flex', gap)}>{children}</div>
      </div>

      {canNext ? (
        <Button
          iconName="common/back-arrow"
          buttonType="icon"
          color="secondary"
          onClick={() => carouselApi?.scrollNext()}
          className="ui:flex-shrink-0"
          iconClassName="ui:scale-x-[-1]"
        />
      ) : (
        <div className="ui:flex-shrink-0 ui:w-10" />
      )}
    </div>
  );
};
