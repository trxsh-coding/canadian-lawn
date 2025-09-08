'use client';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { TopContent } from '@/components/sections/About/TopContent';
import { useAbout } from '@/hooks/api/useAbout';

export const About = () => {
  const { useHook: about } = useAbout();

  const aboutData = about();

  return (
    <LayoutWrapper
      topContent={<TopContent text={aboutData?.data?.data.description} />}
    ></LayoutWrapper>
  );
};
