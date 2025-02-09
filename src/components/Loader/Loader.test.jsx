import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from './index';

describe('Loader', () => {
  it('renders loader component', () => {
    render(<Loader />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('has correct role for accessibility', () => {
    render(<Loader />);
    expect(screen.getByText('Loading...')).toHaveAttribute('role', 'status');
  });

  it('matches snapshot', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
