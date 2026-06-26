'use client';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { LawnDetails } from '@/components/sections/Lawn/LawnDetails';
import { TopContent } from '@/components/sections/Lawn/TopContent';
import { useProductDetail } from '@/hooks/api/useProductDetail';

export const Lawn = ({ slug }: { slug: string }) => {
  const { useHook } = useProductDetail({ slug });
  const { data, isError, isLoading } = useHook();
  const product = data?.data;

  if (isLoading)
    return (
      <div className="h-[100vh] w-[100vh]">
        <MapleSpinner />
      </div>
    );
  if (isError || !product) return null;

  return (
    <LayoutWrapper
      topContentClassName="lg:py-section"
      topContent={<TopContent product={product} />}
    >
      <LawnDetails product={product} />
    </LayoutWrapper>
  );
};
