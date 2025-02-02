import React from 'react';
import { FaChevronDown, FaPlus } from 'react-icons/fa';
import Accordion from './index';

export default {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  argTypes: {
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple sections to be open simultaneously',
    },
    defaultOpen: {
      control: 'array',
      description: 'Array of indices to be open by default',
    },
    icon: {
      control: 'select',
      options: ['chevron', 'plus', 'none'],
      mapping: {
        chevron: <FaChevronDown className="text-secondary-500" />,
        plus: <FaPlus className="text-secondary-500" />,
        none: null,
      },
    },
    iconClass: {
      control: 'text',
      description: 'Custom classes for icon styling',
    },
  },
};

const Template = (args) => <Accordion {...args} />;

export const Default = Template.bind({});
Default.args = {
  items: [
    {
      title: 'Section 1',
      content: 'This is the content for section 1',
      id: '1',
    },
    {
      title: 'Section 2',
      content: 'This is the content for section 2',
      id: '2',
    },
  ],
  icon: <FaChevronDown className="text-secondary-500" />,
};

export const MultipleOpen = Template.bind({});
MultipleOpen.args = {
  ...Default.args,
  allowMultiple: true,
  defaultOpen: [0, 1],
};

export const CustomIcon = Template.bind({});
CustomIcon.args = {
  ...Default.args,
  icon: <FaPlus className="text-secondary-500" />,
  iconClass: 'transform transition-all duration-300',
};

export const CustomContent = Template.bind({});
CustomContent.args = {
  items: [
    {
      title: 'Custom Section',
      content: (
        <div className="p-4 bg-gray-100 rounded">
          <h4 className="font-bold">Custom Content</h4>
          <p>This section demonstrates custom JSX content</p>
        </div>
      ),
      id: 'custom1',
    },
  ],
};
