import React from 'react';
import Checkbox from './index';

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    label: { control: 'text' | React.ReactNode },
    defaultChecked: { control: 'boolean' },
    onChange: {
      action: 'onChange',
    },
    id: { control: 'text' },
  },
};

export const Default = {
  args: {
    label: 'Checkbox',
    defaultChecked: false,
    id: 'checkbox',
    onChange: (e) => {
      console.log(e);
      e.target.checked = !e.target.checked;
    },
  },
};
