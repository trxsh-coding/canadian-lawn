'use client';

import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

import { grayMapStyle } from '@/components/layout/Maps/theme';

type Props = {
  lat: number;
  lng: number;
  height?: number | string;
  width?: number | string;
};

export const Maps = ({ lat, lng, width = '100%', height = '640px' }: Props) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API!,
  });

  const center = { lat, lng };

  const containerStyle = { width, height };

  if (!isLoaded) return <p>Загрузка карты...</p>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      options={{ styles: grayMapStyle, disableDefaultUI: true }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
