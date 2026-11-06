import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { CheckIcon, CloseIcon } from '../../icons';

const meta = {
  title: 'Core/Button',
  component: Button,
  args: { children: 'Save draft', variant: 'primary', size: 'md' },
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'ghost', 'destructive'] },
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
  },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Destructive: Story = {
  args: { variant: 'destructive', children: 'Delete inventory' },
};
export const Disabled: Story = { args: { disabled: true } };
export const WithIcon: Story = { args: { iconStart: <CheckIcon />, children: 'Submitted' } };
export const IconOnly: Story = {
  args: { iconOnly: true, 'aria-label': 'Close', children: <CloseIcon /> },
};
export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: 'flex', gap: 'var(--gds-space-gap-sm)', alignItems: 'center' }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
  ),
};
