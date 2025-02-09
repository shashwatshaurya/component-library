import React, { useRef } from 'react';
import Tooltip from './index.jsx';

export default {
  title: 'Components/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
  argTypes: {
    componentRef: {
      description: 'Reference to the component that triggers tooltip',
      type: { name: 'object', required: true },
    },
    toolMessage: {
      control: 'text',
      description: 'Content to show in tooltip',
    },
    messageWrapperClass: {
      control: 'text',
      description: 'Wrapper Class for message',
    },
  },
};

const HoverableComponent = () => {
  const componentRef = useRef(null);
  return (
    <Tooltip toolMessage="Hover me!" componentRef={componentRef}>
      <div ref={componentRef} className="p-4 bg-gray-100 rounded">
        Hover over me
      </div>
    </Tooltip>
  );
};

export const Basic = {
  render: () => <HoverableComponent />,
};

export const CustomContent = {
  render: () => {
    const ref = useRef(null);
    return (
      <Tooltip
        toolMessage={
          <div className="p-2">
            <h4 className="font-bold">Custom Content</h4>
            <p>With multiple elements</p>
          </div>
        }
        messageWrapperClass="!bg-gray-200 !text-black-600"
        componentRef={ref}
      >
        <button ref={ref} className="px-4 py-2 bg-blue-500 text-white rounded">
          Hover for custom tooltip
        </button>
      </Tooltip>
    );
  },
};
