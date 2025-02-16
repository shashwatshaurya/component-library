import React from 'react';
import Chip from './index';

export default {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    closable: {
      control: 'boolean',
      description: 'Show close button',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for chip',
    },
    onCloseClick: {
      action: 'close clicked',
      description: 'Click handler for close button',
    },
    wrapperClass: {
      control: 'text',
      description: 'Additional CSS classes',
    },
    children: {
      control: 'text',
      description: 'Chip content',
    },
  },
};

const Template = (args) => <Chip {...args} />;

export const Default = Template.bind({});
Default.args = {
  children: 'Basic Chip',
};

export const Closable = Template.bind({});
Closable.args = {
  children: 'Closable Chip',
  closable: true,
};

export const CustomStyle = Template.bind({});
CustomStyle.args = {
  children: 'Custom Chip',
  wrapperClass: 'bg-secondary-500 text-white',
};

export const ChipGroup = () => (
  <div className="flex gap-2">
    <Chip>Chip 1</Chip>
    <Chip closable>Chip 2</Chip>
    <Chip wrapperClass="bg-red-500">Chip 3</Chip>
  </div>
);
