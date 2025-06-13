'use client';

import { Preview } from '@/components/sections/Main/Preview';
import React from 'react';
import { Tractors } from '@/components/sections/Main/Tractors';
import { useTechnique } from '@/hooks/useTechnique';

export const MainLayout = () => {
  const { useHook } = useTechnique();

  const { data } = useHook();

  return (
    <div className="gap-section bg-baseSecondaryBg flex flex-col">
      <Preview />
      {data && <Tractors items={data.data} className="mt-section" />}
    </div>
  );
};
