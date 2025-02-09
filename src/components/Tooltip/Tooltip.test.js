import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Tooltip from './index';

describe('Tooltip', () => {
  const setup = (props = {}) => {
    const ref = React.createRef();
    const utils = render(
      <Tooltip componentRef={ref} toolMessage="Test tooltip" {...props}>
        <div ref={ref}>Hover me</div>
      </Tooltip>
    );
    return {
      ...utils,
      ref,
      tooltipTrigger: screen.getByText('Hover me'),
    };
  };

  it('renders children', () => {
    const { tooltipTrigger } = setup();
    expect(tooltipTrigger).toBeInTheDocument();
  });

  it('shows tooltip on hover', () => {
    const { tooltipTrigger } = setup();
    fireEvent.mouseOver(tooltipTrigger);
    expect(screen.getByText('Test tooltip')).toHaveClass('opacity-100');
  });

  it('hides tooltip on mouse out', () => {
    const { tooltipTrigger } = setup();
    fireEvent.mouseOver(tooltipTrigger);
    fireEvent.mouseOut(tooltipTrigger);
    expect(screen.getByText('Test tooltip')).toHaveClass('opacity-0');
  });

  it('applies custom wrapper class', () => {
    const { tooltipTrigger } = setup({
      messageWrapperClass: 'custom-class',
    });
    fireEvent.mouseOver(tooltipTrigger);
    expect(screen.getByText('Test tooltip')).toHaveClass('custom-class');
  });

  it('handles node type tooltip message', () => {
    const { tooltipTrigger } = setup({
      toolMessage: <span>Custom tooltip</span>,
    });
    fireEvent.mouseOver(tooltipTrigger);
    expect(screen.getByText('Custom tooltip')).toBeInTheDocument();
  });
});
