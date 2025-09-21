'use client';

import { Typography } from '@canadian-lawn/ui-kit';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { TextBlocks } from '@/components/atoms/TextBlocks';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { useBlogDetail } from '@/hooks/api/useBlogDetail';

export const Blog = ({ slug }: { slug: string }) => {
  const { useHook: blog } = useBlogDetail({ slug });
  const { data, isError, isLoading } = blog();
  const blogData = data?.data;

  if (isLoading)
    return (
      <div className="h-[100vh] w-[100vh]">
        <MapleSpinner />
      </div>
    );
  if (isError) return null;

  return (
    <LayoutWrapper image={blogData?.image?.url}>
      <Typography view="large1" weight="bold" className="pb-1 lg:p-2">
        {blogData?.title}
      </Typography>
      <Typography view="regular" className="pb-3 lg:p-4">
        {blogData?.date}
      </Typography>
      <TextBlocks htmlText={blogData?.blocks} />
    </LayoutWrapper>
  );
};
