import { Constraints } from '@/components/layout/Constraints';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import cn from '@/utils/cnMerge';

export type LayoutWrapperProps = {
  topContent?: React.ReactNode;
  children?: React.ReactNode;
  asideContent?: React.ReactNode;
  mainContentClassName?: string;
  topContentClassName?: string;
  asideContentClassName?: string;
};

export const LayoutWrapper = ({
  children,
  topContent,
  asideContent,
  topContentClassName,
  mainContentClassName,
  asideContentClassName,
}: LayoutWrapperProps) => {
  return (
    <div className="bg-baseBg flex h-full min-h-screen w-full flex-col gap-[30px]">
      <Constraints className="mb-section relative">
        <div className={cn('bg-primary flex flex-col py-5 lg:py-[35px]')}>
          <Header className="w-full" headerClassName="md:!rounded-b-sm" />
          <div className={topContentClassName}>{topContent}</div>
        </div>
      </Constraints>

      <Constraints
        color="light"
        wrapperClassName="flex flex-1 min-h-0 gap-5 xl:px-section"
        className="flex gap-5"
      >
        <aside
          className={cn(
            'bg-baseWhite hidden w-[248px] shrink-0 rounded-sm xl:!block',
            asideContentClassName
          )}
        >
          {asideContent}
        </aside>
        <main className={cn('flex flex-1 flex-col overflow-auto', mainContentClassName)}>
          {children}
        </main>
      </Constraints>
      <Footer />
    </div>
  );
};
