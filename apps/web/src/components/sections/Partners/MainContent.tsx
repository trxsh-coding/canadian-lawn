import { Partner, PartnerInput } from '@canadian-lawn/api';
import { Typography } from '@canadian-lawn/ui-kit';
import React from 'react';

import { Maps } from '@/components/layout/Maps';

type MainContentProps = {
  partners: PartnerInput[];
  onMarkerClick: (partner: Partner) => void;
};

export const MainContent = ({ partners, onMarkerClick }: MainContentProps) => {
  const partnersMarker = React.useMemo(() => {
    return partners?.map((partner) => ({
      icon: partner.logo?.url,
      lat: partner.location?.coordinates?.lat || 0,
      lng: partner.location?.coordinates?.lng || 0,
    }));
  }, [partners]);

  const handleMarkerClick = React.useCallback(
    (index: number) => {
      const partner = partners[index];
      if (partner) onMarkerClick(partner as unknown as Partner);
    },
    [partners, onMarkerClick]
  );

  return (
    <div className="bg-primary flex flex-col gap-4 lg:gap-5">
      <Typography view="heading2" color="base-white" family="gothic">
        Магазины-партнёры
      </Typography>
      <div className="rounded-sm">
        <Maps
          markers={partnersMarker}
          lng={partnersMarker[0].lng}
          lat={partnersMarker[0].lat}
          withMarkers
          onMarkerClick={handleMarkerClick}
        />
      </div>
    </div>
  );
};
