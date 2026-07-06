'use client';

import { PartnerInput } from '@canadian-lawn/api';
import { Carousel, PartnerCard } from '@canadian-lawn/ui-kit';

import PartnersImage from '@/assets/img/partners.png';
type TopContentProps = {
  partners?: PartnerInput[];
  onPartnerClick?: (partner: PartnerInput) => void;
};

export const TopContent = ({ partners, onPartnerClick }: TopContentProps) => {
  return (
    <Carousel className="mt-5">
      {partners?.map((partner) => (
        <div
          key={partner.id}
          className="w-full flex-shrink-0 sm:w-[calc((100%-1rem)/2)] lg:w-[calc((100%-2rem)/3)]"
        >
          <PartnerCard
            title={partner.name}
            image={partner.logo?.url || PartnersImage.src}
            onClick={() => onPartnerClick?.(partner)}
          />
        </div>
      ))}
    </Carousel>
  );
};
