import { BlocksContentInput } from '@canadian-lawn/api';
import { BlocksContent, BlocksRenderer } from '@strapi/blocks-react-renderer';
import * as React from 'react';
import sanitize from 'sanitize-html';
import 'ckeditor5/ckeditor5-content.css';

import { sanitizeConfig } from '@/components/atoms/TextBlocks/config';

type Props = {
  htmlText?: string | BlocksContentInput;
  type?: 'block' | 'text';
};

export const TextBlocks = React.memo(({ htmlText = '', type = 'block' }: Props) => {
  if (typeof htmlText === 'string') {
    return (
      <div
        className="ck-content"
        dangerouslySetInnerHTML={{ __html: sanitize(htmlText, sanitizeConfig) }}
      />
    );
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
