import { BlockContentItem } from '@canadian-lawn/api';

import { AccordionItemContent } from '@/components/atoms/AccordionItem';

type AboutMainContentProps = {
  items: BlockContentItem[];
};

export const AboutMainContent = ({ items }: AboutMainContentProps) => (
  <div className="py-section flex w-full flex-col">
    {items.map((item) => (
      <AccordionItemContent key={item.id} title={item.title} text={item.block} />
    ))}
  </div>
);
