import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Chip from './index';

describe('Chip', () => {
  const setup = (props = {}) => {
    return render(<Chip {...props}>Test Chip</Chip>);
  };

  it('renders chip with children', () => {
    setup();
    expect(screen.getByText('Test Chip')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    setup({ onClick: handleClick });
    fireEvent.click(screen.getByText('Test Chip'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('renders close button when closable is true', () => {
    setup({ closable: true });
    expect(screen.getByRole('button', { name: /remove/i })).toBeInTheDocument();
  });

  it('handles close button click', () => {
    const handleClose = jest.fn();
    setup({ closable: true, onCloseClick: handleClose });
    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(handleClose).toHaveBeenCalled();
  });

  it('applies custom wrapper class', () => {
    const { container } = setup({ wrapperClass: 'custom-class' });
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('prevents close click from triggering chip click', () => {
    const handleClick = jest.fn();
    const handleClose = jest.fn();
    setup({
      closable: true,
      onClick: handleClick,
      onCloseClick: handleClose,
    });

    fireEvent.click(screen.getByRole('button', { name: /remove/i }));
    expect(handleClose).toHaveBeenCalled();
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('has correct accessibility attributes', () => {
    setup({ closable: true });
    expect(screen.getByRole('button')).toHaveAttribute('tabIndex', '0');
    expect(screen.getByRole('button', { name: /remove/i })).toHaveAttribute(
      'tabIndex',
      '0'
    );
  });
});
