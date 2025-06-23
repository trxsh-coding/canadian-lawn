'use client';
import React from 'react';

import { Footer } from '@/components/layout/Footer';
import { Feedback } from '@/components/sections/Main/Feedback';
import { Partners } from '@/components/sections/Main/Partners';
import { Preview } from '@/components/sections/Main/Preview';
import { Technique } from '@/components/sections/Main/Technique';

export const MainLayout = () => {
  return (
    <div className="bg-baseSecondaryBg flex flex-col">
      <Preview />
      <Technique className="mt-section" />
      <Partners />
      <Technique className="mt-section" />
      <Feedback />
      <Footer />
    </div>
  );
};
