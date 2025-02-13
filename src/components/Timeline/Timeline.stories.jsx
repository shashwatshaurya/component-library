import React from 'react';
import Timeline from './index';
import { FaCheck, FaClock, FaStar } from 'react-icons/fa';

export default {
  title: 'Components/Timeline',
  component: Timeline,
  tags: ['autodocs'],
  argTypes: {
    alignment: {
      description: 'Alignment of timeline items',
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    timelineItems: {
      control: 'object',
      description: 'Array of timeline items',
    },
  },
};

const timelineItems = [
  {
    id: '1',
    icon: <FaCheck className="text-green-500" />,
    title: 'Step 1 Done',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde tenetur nisi animi.',
    hasTooltip: true,
    tooltipContent: 'Lorem ipsum dolor sit.',
  },
  {
    id: '2',
    icon: <FaClock className="text-yellow-500" />,
    title: 'Step 2 In Progress',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde tenetur nisi animi.',
    hasTooltip: true,
    tooltipContent: 'Lorem ipsum dolor sit.',
    tooltipWrapperClass: '!bg-gray-200',
  },
  {
    id: '3',
    icon: <FaStar className="text-gray-500" />,
    title: 'Step 3 Pending',
    content:
      'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Unde tenetur nisi animi.',
    hasTooltip: false,
  },
];

export const Vertical = {
  args: {
    alignment: 'vertical',
    timelineItems,
  },
};

export const Horizontal = {
  args: {
    alignment: 'horizontal',
    timelineItems,
  },
};
