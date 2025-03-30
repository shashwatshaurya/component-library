import React from 'react';
import Dropdown from './index';

export default {
  title: 'Components/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  argTypes: {
    isSearchable: {
      control: 'boolean',
      description: 'Enable search functionality',
    },
    isMultiple: {
      control: 'boolean',
      description: 'Allow multiple selections',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the dropdown',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
  },
};

const sampleOptions = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
];

const Template = (args) => {
  const [value, setValue] = React.useState(args.value);
  return (
    <div className="w-64">
      <Dropdown {...args} value={value} onChange={setValue} />
    </div>
  );
};

export const Basic = Template.bind({});
Basic.args = {
  options: sampleOptions,
  placeholder: 'Select an option',
};

export const Searchable = Template.bind({});
Searchable.args = {
  ...Basic.args,
  isSearchable: true,
};

export const MultiSelect = Template.bind({});
MultiSelect.args = {
  ...Basic.args,
  placeholder: 'Select all applicable options',
  isMultiple: true,
  value: [],
};

export const Disabled = Template.bind({});
Disabled.args = {
  ...Basic.args,
  disabled: true,
};

export const WithPreselectedValue = Template.bind({});
WithPreselectedValue.args = {
  ...Basic.args,
  value: sampleOptions[0],
};
