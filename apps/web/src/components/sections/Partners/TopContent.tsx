'use client';

import { PartnerInput } from '@canadian-lawn/api';
import { PartnerCard } from '@canadian-lawn/ui-kit';

type TopContentProps = {
  partners?: PartnerInput[];
};

export const TopContent = ({ partners }: TopContentProps) => {
  return (
    <div className="mt-5 flex flex-col gap-4 lg:flex-row">
      {partners?.map((partner) => (
        <PartnerCard key={partner.id} title={partner.name} image={partner.logo?.url} />
      ))}
    </div>
  );
};
