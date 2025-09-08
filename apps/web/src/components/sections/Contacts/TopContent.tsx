'use client';
import { Button, Typography } from '@canadian-lawn/ui-kit';
import React from 'react';

import { Spinner } from '@/components/atoms/Loaders/Spinner';
import { useContacts } from '@/hooks/api/useContacts';

export const TopContent = () => {
  const { useHook: contacts } = useContacts();

  const contact = contacts();

  const { data } = contact;

  const contactData = data?.data;

  if (contact.isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }
  if (contact.isError) return null;

  return (
    <div className="relative">
      <div className="flex h-full w-full flex-col items-center justify-between gap-4 lg:flex-row">
        <Button className="mt-5 w-full min-w-[250px] lg:mt-0 lg:w-auto lg:self-end">
          Связатся с нами
        </Button>
        <div className="text-baseWhite mr-auto flex flex-col gap-4 lg:ml-auto">
          {contactData?.requestMail && (
            <div className="flex flex-col gap-2">
              <Typography view="regular" color="silvery">
                Для заявок и коммерческих запросов
              </Typography>
              <Typography view="large2" className="!font-normal !lowercase">
                {contactData.requestMail}
              </Typography>
            </div>
          )}
          {contactData?.offerMail && (
            <div className="flex flex-col gap-2">
              <Typography view="regular" color="silvery">
                Для заявок и коммерческих запросов
              </Typography>
              <Typography view="large2" className="!lowercase">
                {contactData.offerMail}
              </Typography>
            </div>
          )}
          <div className="flex flex-col gap-2"></div>
        </div>
      </div>
    </div>
  );
};
