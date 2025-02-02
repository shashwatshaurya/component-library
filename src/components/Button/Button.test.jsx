import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('Button', () => {
  describe('Rendering', () => {
    it('should render children correctly', () => {
      render(<Button>Test Button</Button>);
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });

    it('should apply default props', () => {
      render(<Button>Default Button</Button>);
      const button = screen.getByText('Default Button');
      expect(button).toHaveClass(
        'bg-primary',
        'text-white',
        'px-4',
        'py-2',
        'text-base'
      );
    });
  });

  describe('Variants', () => {
    it('should render primary variant', () => {
      render(<Button variant="primary">Primary</Button>);
      expect(screen.getByText('Primary')).toHaveClass(
        'bg-primary',
        'text-white'
      );
    });

    it('should render secondary variant', () => {
      render(<Button variant="secondary">Secondary</Button>);
      expect(screen.getByText('Secondary')).toHaveClass(
        'bg-secondary',
        'text-white'
      );
    });

    it('should render outlined variant', () => {
      render(<Button variant="outlined-primary">Outlined</Button>);
      expect(screen.getByText('Outlined')).toHaveClass(
        'bg-white',
        'text-primary',
        'border',
        'border-primary'
      );
    });
  });

  describe('Sizes', () => {
    it('should render small size', () => {
      render(<Button size="sm">Small</Button>);
      expect(screen.getByText('Small')).toHaveClass('px-2', 'py-1', 'text-sm');
    });

    it('should render large size', () => {
      render(<Button size="lg">Large</Button>);
      expect(screen.getByText('Large')).toHaveClass('px-6', 'py-3', 'text-lg');
    });
  });

  describe('States', () => {
    it('should show loading state', () => {
      render(<Button loading>Loading</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('cursor-wait');
      expect(button.querySelector('.animate-shimmer')).toBeInTheDocument();
    });

    it('should show disabled state', () => {
      render(<Button disable>Disabled</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass(
        'bg-gray-300',
        'text-gray-500',
        'cursor-not-allowed'
      );
    });
  });

  describe('Interactions', () => {
    it('should call onClick when clicked', () => {
      const handleClick = jest.fn();
      render(<Button onClick={handleClick}>Click Me</Button>);
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', () => {
      const handleClick = jest.fn();
      render(
        <Button onClick={handleClick} disable>
          Click Me
        </Button>
      );
      fireEvent.click(screen.getByText('Click Me'));
      expect(handleClick).not.toHaveBeenCalled();
    });
  });
});
