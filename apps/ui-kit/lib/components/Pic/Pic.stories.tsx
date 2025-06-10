import type { Meta, StoryObj } from '@storybook/react';
import { Pic } from './Pic';
import TestPicture from '@/assets/images/test.png?url';

const meta = {
  title: 'Components/Pic',
  component: Pic,
  tags: ['autodocs'],
  argTypes: {
    src: {
      control: 'text',
    },
    alt: {
      control: 'text',
    },
    fit: {
      control: 'select',
      options: ['cover', 'contain'],
    },
    shape: {
      control: 'select',
      options: ['fill', 'circle'],
    },
    backgroundColor: {
      control: 'color',
    },
    isLoading: {
      control: 'boolean',
    },
  },
  args: {
    src: TestPicture,
    alt: 'Пример изображения',
    fit: 'cover',
    className: 'h-[150px] w-[150px]',
    shape: 'fill',
    backgroundColor: '#f0f0f0',
  },
} satisfies Meta<typeof Pic>;

export const Default: Story = {};

export const WithCircle: Story = {
  args: {
    shape: 'circle',
  },
};

export const WithChildren: Story = {
  args: {
    children: (
      <span className="absolute right-1 bottom-1 rounded bg-black/60 px-1 text-xs text-white">
        Label
      </span>
    ),
    shape: 'fill',
  },
};

export const WithSkeleton: Story = {
  args: {
    src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBkJigufyq00dk5hZq_acK0ix6Gq5LMj59Kg&s',
    skeleton: <div className="h-[150px] w-[150px] animate-pulse rounded-md bg-gray-200" />,
  },
};

export const ContainFit: Story = {
  args: {
    fit: 'contain',
    backgroundColor: '#eee',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;
