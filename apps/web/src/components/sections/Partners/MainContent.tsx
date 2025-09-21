import { PartnerInput } from '@canadian-lawn/api';
import { Typography } from '@canadian-lawn/ui-kit';
import React from 'react';

import { Maps } from '@/components/layout/Maps';

type MainContentProps = {
  partners: PartnerInput[];
  onMarkerClick: (open: boolean) => void;
};

export const MainContent = ({ partners, onMarkerClick }: MainContentProps) => {
  const partnersMarker = React.useMemo(() => {
    return partners?.map((partner) => ({
      icon: partner.logo?.url,
      lat: partner.location?.coordinates?.lat || 0,
      lng: partner.location?.coordinates?.lng || 0,
    }));
  }, [partners]);

  return (
    <div className="flex flex-col gap-4 lg:gap-5">
      <Typography view="heading2" color="base-white" family="gothic">
        Магазины-партнёры
      </Typography>
      <div className="rounded-sm">
        <Maps markers={partnersMarker} withMarkers height={500} onMarkerClick={onMarkerClick} />
      </div>
    </div>
  );
};
