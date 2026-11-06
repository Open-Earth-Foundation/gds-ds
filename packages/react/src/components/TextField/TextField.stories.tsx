import type { Meta, StoryObj } from '@storybook/react-vite';
import { TextField } from './TextField';

const meta = {
  title: 'Core/TextField',
  component: TextField,
  args: {
    label: 'Population',
    description: 'Latest census or official estimate',
    placeholder: '2 900 000',
  },
} satisfies Meta<typeof TextField>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };
export const WithSuffix: Story = {
  args: { label: 'Scope 2 emissions', suffix: 'tCO₂e', description: undefined },
};
export const Invalid: Story = {
  args: { error: 'Enter a whole number without separators', defaultValue: '2.9M' },
};
export const Disabled: Story = { args: { disabled: true, defaultValue: 'Salvador' } };
