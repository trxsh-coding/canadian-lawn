import { Accordion, Button, Typography } from '@canadian-lawn/ui-kit';
import { BlocksContent } from '@strapi/blocks-react-renderer';
import React from 'react';
import { useToggle } from 'usehooks-ts';

import { TextBlocks } from '@/components/atoms/TextBlocks';

type AccordionItemProps = {
  title: string;
  text: BlocksContent;
  isOpen?: boolean;
};

export const AccordionItemContent = ({ title, text, isOpen }: AccordionItemProps) => {
  const [open, toggle] = useToggle(isOpen);

  return (
    <div className="bg-baseWhite flex flex-col justify-center rounded-lg p-4 lg:p-6">
      <div className="flex items-center">
        <Typography family="gothic" className="flex-1 shrink-0" view="heading3">
          {title}
        </Typography>
        <Button
          buttonType="icon"
          iconName={open ? 'common/minus' : 'common/plus'}
          onClick={toggle}
        />
      </div>
      <Accordion isOpen={open} details={<TextBlocks htmlText={text}></TextBlocks>}></Accordion>
    </div>
  );
};
