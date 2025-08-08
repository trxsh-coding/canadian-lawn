'use client';

import { LawnCard } from '@canadian-lawn/ui-kit';
import React from 'react';

import { useLawns } from '@/hooks/api/useLawns';

export const Lawns: React.FunctionComponent = () => {
  const { useHook: lawns } = useLawns();

  const lawn = lawns();

  if (lawn.isLoading) return <div>Loading...</div>;
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
      {lawn?.data?.data.map(({ image, name, price, resistance, speed }, index) => (
        <LawnCard
          className="!max-w-full self-center lg:!max-w-[480px]"
          buttonClassName="sm:!max-w-[50%] md:max-w-full sm:!w-[50%] md:!w-full"
          key={index}
          image={image?.url || ''}
          name={name}
          price={price[0]}
          resistance={resistance || 0}
          growth={speed || 0}
          handleButtonChange={() => null}
          handleButtonClick={() => null}
          handleCardClick={() => null}
          value={0}
        />
      ))}
    </div>
  );
};
