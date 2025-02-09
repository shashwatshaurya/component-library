import React from 'react';
import Card from './index';
import Button from '../Button';

export default {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['basic', 'elevated', 'interactive'],
    },
    direction: {
      control: 'radio',
      options: ['vertical', 'horizontal'],
    },
  },
};

const Template = (args) => <Card {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  title: 'Card Title',
  children: 'Card content goes here',
};

export const WithMedia = Template.bind({});
WithMedia.args = {
  media: <img src="https://picsum.photos/400/200" alt="Sample" />,
  title: 'Media Card',
  children: 'Card with media content',
};

export const Interactive = Template.bind({});
Interactive.args = {
  interactive: true,
  title: 'Click me',
  children: 'Interactive card example',
  onClick: () => alert('Card clicked!'),
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
};

export const Multiple = {
  render: () => {
    return (
      <div className="flex gap-2">
        <Card
          media={<img src="https://picsum.photos/400/200" alt="Sample" />}
          title="Media Card"
          className="!max-w-sm"
          children="Card with media content. Lorem ipsum dolor sit amet consectetur adipisicing. sfsd rrw3rewf fasfdf rgtertqtw sgsfsdff"
          footer="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero quasi nemo perferendis!"
        />
        <Card
          media={<img src="https://picsum.photos/400/200" alt="Sample" />}
          title="Media Card"
          className="!max-w-sm"
          children="Card with media content"
          footer="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero quasi nemo perferendis!"
        />
        <Card
          header="Header"
          media={
            <video width="320" height="240" autoPlay loop>
              <source
                src="https://v.ftcdn.net/07/57/66/12/700_F_757661265_8TDCNChZ08MjCZ1XiNPv6TfA2UU6yatV_ST.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          }
          title="Video Media Card"
          subtitle="Subtitle 2025"
          actions={<Button>Click Me</Button>}
          children="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus, repellendus odit. Ea illo ipsum dolore delectus minus omnis inventore sunt."
          footer="Video Card"
        />
      </div>
    );
  },
};
