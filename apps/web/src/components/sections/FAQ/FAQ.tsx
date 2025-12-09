'use client';

import { Typography } from '@canadian-lawn/ui-kit';
import React from 'react';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { TextBlocks } from '@/components/atoms/TextBlocks';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { LeftContent } from '@/components/sections/FAQ/LeftContent';
import { useFaq } from '@/hooks/api/useFaq';

export const FAQ = () => {
  const { useHook: faq } = useFaq();
  const { data, isError, isLoading } = faq();

  const options = data?.data.map(
    (item) => ({
      key: item.slug,
      title: item.title,
    }),
    []
  );
  const [tab, setTab] = React.useState(options?.[0]);

  const content = React.useMemo(
    () => data?.data.find((item) => item.slug === tab?.key),
    [data?.data, tab?.key]
  );

  if (isError) return null;

  if (isLoading)
    return (
      <div className="h-[100vh] w-[100vh]">
        <MapleSpinner />
      </div>
    );
  if (isError) return null;

  return (
    <LayoutWrapper
      mainContentClassName="p-0 lg:mt-0"
      mainWrapperClassName="lg:my-section"
      topContentWrapperClassName="lg:my-0"
      asideContent={
        options &&
        tab && (
          <LeftContent
            onClick={(value) => {
              setTab(value);
            }}
            tab={tab}
            options={options}
          />
        )
      }
    >
      <div className="bg-baseWhite flex flex-col gap-4 rounded-sm p-4 lg:p-8">
        <Typography view="large1" weight="semibold">
          {tab?.title}
        </Typography>
        <TextBlocks htmlText={content?.blocks || ''}></TextBlocks>
      </div>
    </LayoutWrapper>
  );
};
