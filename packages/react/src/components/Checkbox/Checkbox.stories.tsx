import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Core/Checkbox',
  component: Checkbox,
  args: { children: 'Include Scope 3 estimates' },
} satisfies Meta<typeof Checkbox>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Indeterminate: Story = {
  args: { indeterminate: true, children: 'Some sub-sectors selected' },
};
export const Disabled: Story = { args: { disabled: true } };
