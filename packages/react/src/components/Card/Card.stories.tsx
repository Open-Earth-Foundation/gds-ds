import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from './Card';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';

const meta = {
  title: 'Core/Card',
  component: Card,
  args: {
    eyebrow: 'Stationary energy',
    title: 'Residential buildings',
    children: 'Electricity and fuel use in homes. Nine of twelve sub-sectors have data for 2024.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 28rem)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Elevated: Story = { args: { elevated: true } };
export const WithActionsAndFooter: Story = {
  args: {
    actions: <Badge kind="warning">3 missing</Badge>,
    footer: (
      <>
        <Button variant="ghost" size="sm">
          Skip
        </Button>
        <Button size="sm">Add data</Button>
      </>
    ),
  },
};
