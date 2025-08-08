'use client';
import { useLawnDetail } from '@/hooks/api/useLawnDetail';

export const LawnDetails = ({ slug }: { slug: string }) => {
  const { useHook: lawns } = useLawnDetail({ slug });
  const { data: lawnsData, isError, isLoading } = lawns();
  if (isError || lawnsData || isLoading) return;
  return <div></div>;
};
