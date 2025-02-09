import React from 'react';
import Loader from './index';

export default {
  title: 'Components/Loader',
  component: Loader,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size of the loader',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'error'],
      description: 'Color of the loader',
    },
  },
};

const Template = (args) => <Loader {...args} />;

export const Default = Template.bind({});
Default.args = {
  size: 'md',
  color: 'primary',
};

export const Small = Template.bind({});
Small.args = {
  size: 'sm',
  color: 'primary',
};

export const Large = Template.bind({});
Large.args = {
  size: 'lg',
  color: 'primary',
};

export const CustomColor = Template.bind({});
CustomColor.args = {
  size: 'md',
  color: 'secondary',
};

export const LoaderGroup = () => (
  <div className="flex space-x-4">
    <Loader size="sm" />
    <Loader size="md" />
    <Loader size="lg" />
  </div>
);
