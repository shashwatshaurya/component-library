import Button from './index';

export default {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'outlined'],
      },
      description: 'The visual style of the button',
    },
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg'],
      },
      description: 'The size of the button',
    },
    onClick: {
      action: 'clicked',
      description: 'Function called when button is clicked',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading state',
    },
    disable: {
      control: 'boolean',
      description: 'Disables the button',
    },
    customClass: {
      control: 'text',
      description: 'Custom CSS classes',
    },
  },
};

// Variant Stories
export const Primary = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'md',
  },
};

export const OutlinedPrimary = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined-primary',
    size: 'md',
  },
};

export const OutlinedSecondary = {
  args: {
    children: 'Outlined Button',
    variant: 'outlined-secondary',
    size: 'md',
  },
};

// Size Stories
export const Small = {
  args: {
    children: 'Small Button',
    variant: 'primary',
    size: 'sm',
  },
};

export const Medium = {
  args: {
    children: 'Medium Button',
    variant: 'primary',
    size: 'md',
  },
};

export const Large = {
  args: {
    children: 'Large Button',
    variant: 'primary',
    size: 'lg',
  },
};

// State Stories
export const Loading = {
  args: {
    children: 'Loading Button',
    variant: 'primary',
    size: 'md',
    loading: true,
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    size: 'md',
    disable: true,
  },
};
