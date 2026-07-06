'use client';

import { Pic, Typography } from '@canadian-lawn/ui-kit';

import { MapleSpinner } from '@/components/atoms/Loaders/MappleSpinner';
import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { FeedbackForm } from '@/components/sections/Feedback';
import { useUsers } from '@/hooks/api/useUsers';
import cn from '@/utils/cnMerge';

export const Feedback = ({
  className,
  wrapperClassName,
}: {
  className?: string;
  wrapperClassName?: string;
}) => {
  const { useHook: useUserHook } = useUsers();

  const { data: userData, isError, isLoading } = useUserHook();

  if (isLoading) return <MapleSpinner />;

  if (isError) {
    return null;
  }

  return (
    <Container className={cn('!bg-section-gradient', wrapperClassName)}>
      <SectionWrapper
        withLink={false}
        headline="свяжитесь с нами"
        headlineClassName="!text-baseWhite"
        className={cn('pt-section !bg-section-gradient lg:px-0', className)}
        color="green"
      >
        <div className="bg-secondary gap-section flex w-full flex-col justify-between rounded-lg p-10 lg:flex-row lg:gap-0">
          <div className="gap-section flex w-full max-w-[329px] flex-col justify-between lg:gap-0">
            <Typography view="card-price" color="base-white">
              Мы ответим на ваши вопросы и подберём смесь под ваши нужды
            </Typography>
            <div className="m-[-10px] flex gap-5">
              <div className="flex">
                {userData?.map(
                  ({ avatar, username }, index) =>
                    avatar &&
                    index < 2 && (
                      <div className="-ml-4 flex nth-1:m-0" key={avatar.url}>
                        <Pic
                          key={username}
                          className="h-[55px] w-[55px] rounded-full"
                          src={avatar.url}
                        />
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
          <FeedbackForm className="max-w-[571px]" />
        </div>
      </SectionWrapper>
    </Container>
  );
};
