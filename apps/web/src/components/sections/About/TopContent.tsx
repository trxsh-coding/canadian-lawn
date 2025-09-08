'use client';

import { BlocksContentInput } from '@canadian-lawn/api';

import { TextBlocks } from '@/components/atoms/TextBlocks';

type TopContentProps = {
  text?: BlocksContentInput;
};

export const TopContent = ({ text }: TopContentProps) => {
  return (
    <div>
      <TextBlocks htmlText={text} />
    </div>
  );
};
