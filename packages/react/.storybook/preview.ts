import type { Preview } from '@storybook/react-vite';
import '@open-earth-foundation/gds-tokens/css';
import '../src/styles/base.css';

const preview: Preview = {
  globalTypes: {
    theme: {
      description: 'Color mode',
      toolbar: { title: 'Theme', items: ['light', 'dark'], dynamicTitle: true },
    },
  },
  initialGlobals: { theme: 'light' },
  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = String(context.globals.theme ?? 'light');
      return Story();
    },
  ],
  parameters: { layout: 'centered' },
};
export default preview;
