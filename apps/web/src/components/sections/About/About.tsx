'use client';

import AboutPage from '@/assets/img/about.webp';
import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { AboutMainContent } from '@/components/sections/About/MainContent';
import { TopContent } from '@/components/sections/About/TopContent';
import { useAbout } from '@/hooks/api/useAbout';

export const About = () => {
  const { useHook: about } = useAbout();

  const aboutData = about();

  const data = aboutData.data?.data;

  return (
    <LayoutWrapper
      title="О компании"
      headerContentClassName="pt-[30px]"
      topContent={<TopContent text={data?.description} pic={data?.image?.url || AboutPage.src} />}
    >
      {data?.items.length && <AboutMainContent items={data?.items} />}
    </LayoutWrapper>
  );
};
