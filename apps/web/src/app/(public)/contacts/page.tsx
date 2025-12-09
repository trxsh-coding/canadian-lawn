import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';
import { Contacts } from '@/components/sections/Contacts/Contacts';
import { TopContent } from '@/components/sections/Contacts/TopContent';
import { getSsrQueryClient } from '@/config/queryClientConfig';
import { useContacts as contactsQuery } from '@/hooks/api/useContacts';

export const revalidate = 1000;

export default async function LawnDetailPage() {
  const queryClient = getSsrQueryClient();
  await contactsQuery().prefetch(queryClient);
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <LayoutWrapper
        topContentClassName="lg:mb-[60px]"
        mainWrapperClassName="!px-0 !b-0 !items-center"
        mainContainerClassName="!mb-0 !px-0"
        title="Контакты"
        topContent={<TopContent />}
      >
        <Contacts />
      </LayoutWrapper>
    </HydrationBoundary>
  );
}
