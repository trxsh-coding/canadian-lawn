import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';

import { Spinner } from '@/lib';

import { Button } from '@/lib';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    backgrounds: {
      default: 'grey',
      values: [
        { name: 'light', value: '#ffffff' },
        { name: 'grey', value: '#f5f5f5' },
      ],
    },
  },
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: [
        'primary',
        'secondary',
        'tertiary',
        'quaternary',
        'inverse',
        'outlined',
        'icon-primary',
      ],
      values: [{ name: 'brand', value: '#f5f5f5' }],
    },
    width: {
      control: 'select',
      options: ['fit', 'fill'],
    },
    effect: {
      control: 'select',
      options: ['ripple', 'none'],
    },
    loading: {
      control: 'boolean',
    },
    iconPos: {
      control: 'select',
      options: ['left', 'right'],
    },
    as: {
      control: 'select',
      options: ['div', 'a', 'button'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: 'primary',
    width: 'fill',
    children: 'Кнопка',
  },
};

export const Secondary: Story = {
  args: {
    color: 'secondary',
    width: 'fit',
    children: 'Кнопка',
  },
};

export const Loading: Story = {
  args: {
    color: 'primary',
    loading: true,
    children: React.createElement(Spinner),
  },
};

export const WithRippleEffect: Story = {
  args: {
    color: 'primary',
    effect: 'ripple',
    children: 'Кнопка',
  },
};
