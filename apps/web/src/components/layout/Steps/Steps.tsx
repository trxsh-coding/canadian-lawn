'use client';

import React from 'react';

type StepsProps<T extends string> = {
  steps: Record<T, React.ReactNode>;
  activeStep: T;
};

export const Steps = <T extends string>({ steps, activeStep }: StepsProps<T>) => (
  <>{steps[activeStep] ?? null}</>
);
