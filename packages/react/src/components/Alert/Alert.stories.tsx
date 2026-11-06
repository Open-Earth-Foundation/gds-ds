import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';
import { Button } from '../Button/Button';

const meta = {
  title: 'Core/Alert',
  component: Alert,
  args: {
    kind: 'info',
    title: 'Reporting window opens 1 February',
    children: 'You can keep editing until then. Submitted data is locked for review.',
  },
  argTypes: { kind: { control: 'select', options: ['info', 'good', 'warning', 'critical'] } },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 36rem)' }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {};
export const Good: Story = {
  args: {
    kind: 'good',
    title: 'Inventory submitted',
    children: 'Your reviewer has been notified.',
  },
};
export const Warning: Story = {
  args: {
    kind: 'warning',
    title: '3 sub-sectors have no data',
    children: 'They will be reported as "not estimated" unless you add a value or a notation key.',
    action: (
      <Button size="sm" variant="secondary">
        Review
      </Button>
    ),
  },
};
export const Critical: Story = {
  args: {
    kind: 'critical',
    title: 'Import failed',
    children: 'Row 42 has a unit the template does not accept.',
  },
};
