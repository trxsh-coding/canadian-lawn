import React from 'react';
import ContentLoader from 'react-content-loader';

import { AdaptiveSkeleton } from '@/components/atoms/AdaptiveSkeleton';

export const TechniqueCardLoader = ({ uniqueKey }: { uniqueKey: string }) => {
  return (
    <AdaptiveSkeleton
      tabletContent={
        <ContentLoader
          speed={2}
          width={358}
          height={198}
          viewBox="0 0 358 198"
          backgroundColor="#EBE9F3"
          foregroundColor="#ffffff"
          uniqueKey={`${uniqueKey}-tablet`}
        >
          <rect x="0" y="0" rx="9999" ry="9999" width="86" height="86" />
          <rect x="110" y="0" rx="4" ry="4" width="228" height="63" />
          <rect x="110" y="110" rx="4" ry="4" width="228" height="63" />
        </ContentLoader>
      }
      desktopContent={
        <ContentLoader
          speed={2}
          width={480}
          height={240}
          viewBox="0 0 480 240"
          backgroundColor="#EBE9F3"
          foregroundColor="#ffffff"
          uniqueKey={`${uniqueKey}-desktop`}
        >
          <rect x="0" y="0" rx="9999" ry="9999" width="134" height="134" />
          <rect x="153" y="0" rx="6" ry="6" width="278" height="77" />
          <rect x="153" y="110" rx="6" ry="6" width="278" height="77" />
        </ContentLoader>
      }
      mobileContent={
        <ContentLoader
          speed={2}
          width={220}
          height={320}
          viewBox="0 0 220 320"
          backgroundColor="#EBE9F3"
          foregroundColor="#ffffff"
          uniqueKey={`${uniqueKey}-mobile`}
        >
          <rect x="0" y="0" rx="9999" ry="9999" width="104" height="104" />
          <rect x="0" y="120" rx="4" ry="6" width="188" height="77" />
          <rect x="0" y="230" rx="4" ry="6" width="188" height="66" />
        </ContentLoader>
      }
      withBg
    />
  );
};
