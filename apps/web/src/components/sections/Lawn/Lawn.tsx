'use client';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { LawnDetails } from '@/components/sections/Lawn/LawnDetails';
import { TopContent } from '@/components/sections/Lawn/TopContent';
import { useLawnDetail } from '@/hooks/api/useLawnDetail';

export const Lawn = ({ slug }: { slug: string }) => {
  const { useHook: lawns } = useLawnDetail({ slug });
  const { data, isError, isLoading } = lawns();
  const lawnData = data?.data;

  if (isLoading)
    return (
      <div className="h-[100vh] w-[100vh]">
        <MapleSpinner />
      </div>
    );
  if (isError) return null;

  return (
    <LayoutWrapper topContentClassName="lg:py-section" topContent={<TopContent lawn={lawnData} />}>
      <LawnDetails lawn={lawnData} />
    </LayoutWrapper>
  );
};
