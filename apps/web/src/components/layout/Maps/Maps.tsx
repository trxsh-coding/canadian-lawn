'use client';

import { Button } from '@canadian-lawn/ui-kit';
import { APIProvider, Map, AdvancedMarker, useMap } from '@vis.gl/react-google-maps';
import React from 'react';

type MarkerData = {
  lat: number;
  lng: number;
  icon?: string;
};

type Props = {
  lat?: number;
  lng?: number;
  markers?: MarkerData[];
  height?: number | string;
  width?: number | string;
  onMarkerClick: (open: boolean) => void;
  withZoom?: boolean;
  withMarkers?: boolean;
};

const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!;
const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAP_ID!;

const ZoomControls = () => {
  const map = useMap();

  const handleZoomIn = React.useCallback(() => {
    if (map) {
      map.setZoom(map.getZoom()! + 1);
    }
  }, [map]);

  const handleZoomOut = React.useCallback(() => {
    if (map) {
      map.setZoom(map.getZoom()! - 1);
    }
  }, [map]);

  return (
    <div className="absolute right-20 bottom-10 flex gap-2">
      <Button
        className="!bg-primary"
        iconName="common/plus"
        color="icon-primary"
        buttonType="icon"
        onClick={handleZoomIn}
      />
      <Button
        className="!bg-primary"
        color="icon-primary"
        buttonType="icon"
        iconName="common/minus"
        onClick={handleZoomOut}
      />
    </div>
  );
};

export const Maps = ({
  lat,
  lng,
  markers = [],
  width = '100%',
  height = '640px',
  withZoom = true,
  withMarkers = false,
}: Props) => {
  const allMarkers: MarkerData[] =
    withMarkers && markers.length > 0
      ? markers
      : lat && lng
        ? [{ lat, lng, icon: '/icons/point.png' }]
        : [];

  const center =
    allMarkers.length > 0
      ? { lat: allMarkers[0].lat, lng: allMarkers[0].lng }
      : { lat: 55.751244, lng: 37.618423 };

  const MarkerIcon = ({ url }: { url: string }) => {
    return (
      <div
        style={{
          backgroundImage: `url(${url})`,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
        className="relative h-[70px] w-[70px] rounded-full border-[6px] bg-white"
      />
    );
  };

  return (
    <div style={{ width, height }} className="overflow-hidden rounded-sm">
      <APIProvider apiKey={API_KEY}>
        <Map mapId={MAP_ID} defaultZoom={10} defaultCenter={center} disableDefaultUI>
          {allMarkers.map((marker, index) => (
            <AdvancedMarker key={index} position={{ lat: marker.lat, lng: marker.lng }}>
              <MarkerIcon url={marker.icon || '/sprites/point.svg'} />
            </AdvancedMarker>
          ))}
          {withZoom && <ZoomControls />}
        </Map>
      </APIProvider>
    </div>
  );
};
