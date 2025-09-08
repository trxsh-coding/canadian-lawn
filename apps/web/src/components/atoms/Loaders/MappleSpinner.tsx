'use client';

import { Icon } from '@canadian-lawn/ui-kit';
import React from 'react';

export const MapleSpinner = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Icon name="common/logo" className="animate-wiggle h-24 w-24 text-red-600" />
    </div>
  );
};
