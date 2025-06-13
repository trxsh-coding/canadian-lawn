import type { Meta, StoryObj } from '@storybook/react';

import { Typography } from '@/lib';

const meta = {
  title: 'Components/Typography',
  component: Typography,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    view: {
      control: 'select',
      options: [
        'heading1',
        'heading2',
        'heading3',
        'button',
        'regular',
        'card-header',
        'card-price',
        'small',
        'large1',
        'large2',
      ],
    },
    color: {
      control: 'select',
      options: [
        'current-color',
        'primary',
        'secondary',
        'tertiary',
        'base-bg',
        'base-white',
        'base-black',
        'base-grey',
        'secondary-grey',
      ],
    },
    weight: {
      control: 'select',
      options: ['bold', 'normal', 'medium', 'semibold'],
    },
    textAlign: {
      control: 'select',
      options: ['left', 'center', 'right'],
    },
    whiteSpace: {
      control: 'select',
      options: ['pre-line', 'nowrap'],
    },
    family: {
      control: 'select',
      options: ['golos', 'golosBold', 'gothic'],
    },
    Element: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'div', 'span', 'label', 'p'],
    },
  },
  args: { children: 'Пример текста' },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Heading1: Story = {
  args: { view: 'heading1', color: 'primary' },
};

export const Heading2: Story = {
  args: { view: 'heading2', color: 'primary' },
};

export const Heading3: Story = {
  args: { view: 'heading3', color: 'primary' },
};

export const Regular: Story = {
  args: { view: 'regular', color: 'secondary' },
};

export const Button: Story = {
  args: { view: 'button', color: 'primary' },
};

export const Small: Story = {
  args: { view: 'small', color: 'tertiary' },
};

export const Large1: Story = {
  args: { view: 'large1', color: 'primary' },
};

export const Large2: Story = {
  args: { view: 'large2', color: 'base-white' },
};

export const CardHeader: Story = {
  args: { view: 'card-header', color: 'base-grey' },
};

export const CardPrice: Story = {
  args: { view: 'card-price', color: 'secondary-grey', children: '999 ₽' },
};
