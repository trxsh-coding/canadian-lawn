'use client';

import { Button, Input, Pic, Typography } from '@canadian-lawn/ui-kit';
import React from 'react';
import { useForm, Controller } from 'react-hook-form';

import { Container } from '@/components/layout/Container';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { useUsers } from '@/hooks/api/useUsers';
import cn from '@/utils/cnMerge';

interface FormValues {
  name: string;
  email: string;
  phone: string;
  question: string;
}

export const Feedback = ({ className }: { className?: string }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const { useHook: useUserHook } = useUsers();

  const { data: userData, isError, isLoading } = useUserHook();

  const onSubmit = async () => null;

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    return null;
  }

  return (
    <Container className="!bg-section-gradient">
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
              <div className="flex flex-col gap-1">
                <Typography view="card-header" color="base-white">
                  Яна и Кирилл
                </Typography>
                <Typography view="regular" color="base-white">
                  Менеджеры по продажам
                </Typography>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full max-w-[571px] flex-1 flex-col space-y-4"
          >
            <Controller
              name="name"
              control={control}
              rules={{ required: 'Введите имя' }}
              render={({ field }) => (
                <Input
                  {...field}
                  onChangeValue={field.onChange}
                  errorMessage={errors.name?.message}
                  placeholder="Ваше имя*"
                />
              )}
            />

            <Controller
              name="email"
              control={control}
              rules={{
                required: 'Введите почту',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Некорректная почта',
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  onChangeValue={field.onChange}
                  errorMessage={errors.email?.message}
                  placeholder="Почта*"
                />
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChangeValue={field.onChange}
                  errorMessage={errors.phone?.message}
                  placeholder="Телефон"
                />
              )}
            />

            <Controller
              name="question"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  onChangeValue={field.onChange}
                  errorMessage={errors.question?.message}
                  placeholder="Ваш вопрос"
                />
              )}
            />

            <Button color="primary" type="submit" className="w-full max-w-full">
              Отправить
            </Button>
          </form>
        </div>
      </SectionWrapper>
    </Container>
  );
};
