'use client';

import { LayoutWrapper } from '@/components/layout/LayoutWrapper';

type ProductDetailWrapperProps = {
  topContent: React.ReactNode;
  children: React.ReactNode;
};

export const ProductDetailWrapper = ({ topContent, children }: ProductDetailWrapperProps) => {
  return (
    <LayoutWrapper topContentClassName="lg:py-section" topContent={topContent}>
      {children}
    </LayoutWrapper>
  );
};
