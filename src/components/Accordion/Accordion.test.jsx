import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from './index';
import { FaChevronDown } from 'react-icons/fa';

describe('Accordion', () => {
  const mockItems = [
    { title: 'Section 1', content: 'Content 1', id: '1' },
    { title: 'Section 2', content: 'Content 2', id: '2' },
  ];

  const setup = (props = {}) => {
    return render(
      <Accordion items={mockItems} icon={<FaChevronDown />} {...props} />
    );
  };

  it('renders all accordion items', () => {
    setup();
    expect(screen.getByText('Section 1')).toBeInTheDocument();
    expect(screen.getByText('Section 2')).toBeInTheDocument();
  });

  it('expands item on click', async () => {
    setup();
    const firstButton = screen.getByText('Section 1');
    await userEvent.click(firstButton);
    expect(screen.getByText('Content 1')).toBeVisible();
  });

  it('collapses other items in single mode', async () => {
    setup({ allowMultiple: false });
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[1]);
    expect(screen.getByText('Content 1')).not.toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('allows multiple items open when allowMultiple is true', async () => {
    setup({ allowMultiple: true });
    const buttons = screen.getAllByRole('button');
    await userEvent.click(buttons[0]);
    await userEvent.click(buttons[1]);
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.getByText('Content 2')).toBeVisible();
  });

  it('sets correct aria attributes', () => {
    setup();
    const buttons = screen.getAllByRole('button');
    expect(buttons[0]).toHaveAttribute('aria-expanded', 'false');
    expect(buttons[0]).toHaveAttribute('aria-controls', 'accordion-content-0');
  });

  it('opens default sections', () => {
    setup({ defaultOpen: [0] });
    expect(screen.getByText('Content 1')).toBeVisible();
    expect(screen.getByText('Content 2')).not.toBeVisible();
  });

  it('rotates icon when section is open', async () => {
    setup();
    const button = screen.getByText('Section 1');
    await userEvent.click(button);
    const icon = screen.querySelector('span');
    expect(icon).toHaveClass('rotate-180');
  });
});
