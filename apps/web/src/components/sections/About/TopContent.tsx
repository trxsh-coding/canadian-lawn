'use client';

import { BlocksContentInput } from '@canadian-lawn/api';
import { Pic } from '@canadian-lawn/ui-kit';

import { TextBlocks } from '@/components/atoms/TextBlocks';

type TopContentProps = {
  text?: BlocksContentInput;
  pic?: string;
};

export const TopContent = ({ text, pic }: TopContentProps) => {
  return (
    <div className="flex w-full items-end">
      <div className="flex-1">
        <TextBlocks htmlText={text} />
      </div>
      <div className="flex-1 rounded-sm">
        {pic && <Pic className="w-full rounded-sm lg:h-[350px]" src={pic} />}
      </div>
    </div>
  );
};
