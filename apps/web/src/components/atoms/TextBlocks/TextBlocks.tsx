import { BlocksContentInput } from '@canadian-lawn/api';
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import * as React from 'react';
import sanitize from 'sanitize-html';

type Props = {
  htmlText?: string | BlocksContentInput;
  type?: 'block' | 'text';
};

export const TextBlocks = React.memo(({ htmlText = '', type = 'block' }: Props) => {
  if (typeof htmlText === 'string') {
    return <div dangerouslySetInnerHTML={{ __html: sanitize(htmlText) }} />;
  }

  if (type === 'block') {
    return (
      <div>
        <BlocksRenderer content={htmlText as BlocksContent} />
      </div>
    );
  }
});

TextBlocks.displayName = 'TextBlocks';
