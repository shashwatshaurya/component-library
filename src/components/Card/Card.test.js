import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from './index';

describe('Card', () => {
  const setup = (props = {}) => {
    return render(<Card {...props} />);
  };

  it('renders basic card', () => {
    setup({ title: 'Test Card' });
    expect(screen.getByText('Test Card')).toBeInTheDocument();
  });

  it('applies variant classes correctly', () => {
    const { container } = setup({ variant: 'elevated' });
    expect(container.firstChild).toHaveClass('shadow-lg');
  });

  it('renders in horizontal direction', () => {
    const { container } = setup({ direction: 'horizontal' });
    expect(container.firstChild).toHaveClass('flex-row');
  });

  it('handles interactive state', () => {
    const handleClick = jest.fn();
    setup({ interactive: true, onClick: handleClick });
    const card = screen.getByRole('button');
    fireEvent.click(card);
    expect(handleClick).toHaveBeenCalled();
  });

  it('shows loading state', () => {
    const { container } = setup({ loading: true });
    expect(container.firstChild).toHaveClass('animate-pulse');
  });

  it('renders media content', () => {
    setup({
      media: <img src="test.jpg" alt="test" />,
    });
    expect(screen.getByAltText('test')).toBeInTheDocument();
  });

  it('renders header and footer', () => {
    setup({
      header: <div>Header</div>,
      footer: <div>Footer</div>,
    });
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders action buttons', () => {
    setup({
      actions: <button>Action</button>,
    });
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  it('has correct accessibility role', () => {
    setup({ interactive: true });
    expect(screen.getByRole('button')).toBeInTheDocument();

    setup({ interactive: false });
    expect(screen.getByRole('article')).toBeInTheDocument();
  });
});
