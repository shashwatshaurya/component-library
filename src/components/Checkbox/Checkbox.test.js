import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './index';

describe('Checkbox', () => {
  it('renders checkbox with label', () => {
    render(<Checkbox id="test" label="Test Label" />);
    expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
  });

  it('renders checkbox checked by default', () => {
    render(<Checkbox id="test" label="Test Label" defaultChecked={true} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('toggles checkbox state when clicked', async () => {
    render(<Checkbox id="test" label="Test Label" defaultChecked={true} />);
    const checkbox = screen.getByRole('checkbox');
    await userEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('calls onChange handler when clicked', () => {
    const handleChange = jest.fn();
    render(<Checkbox id="test" label="Test Label" onChange={handleChange} />);
    fireEvent.click(screen.getByRole('checkbox'));
    expect(handleChange).toHaveBeenCalled();
  });

  it('respects defaultChecked prop', () => {
    render(<Checkbox id="test" label="Test Label" defaultChecked={false} />);
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });
});
