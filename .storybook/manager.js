import { addons } from '@storybook/manager-api';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'light',
  brandTitle: 'Component Library',
  brandUrl: 'https://your-website.com',
  brandTarget: '_self',
  colorPrimary: '#ff6347', // Your primary color
  colorSecondary: '#4caf50', // Your secondary color
});

addons.setConfig({
  theme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['other'],
  },
  toolbar: {
    title: { hidden: false },
    zoom: { hidden: false },
    eject: { hidden: false },
    copy: { hidden: false },
    fullscreen: { hidden: false },
  },
  panelPosition: 'bottom',
  // Enable a11y and viewport addons by default
  enableShortcuts: true,
  showToolbar: true,
});
