'use client';

import React from 'react';

import { Preview } from '@/components/sections/Main/Preview';
import { Tractors } from '@/components/sections/Main/Tractors';
import { Feedback } from '@/components/sections/Main/Feedback';
import { Footer } from '@/components/layout/Footer';
import { Partners } from '@/components/sections/Main/Partners';

export const MainLayout = () => {
  return (
    <div className="bg-baseSecondaryBg flex flex-col">
      <Preview />
      <Tractors className="mt-section" />
      <Partners />
      <Tractors className="mt-section" />
      <Feedback />
      <Footer />
    </div>
  );
};
