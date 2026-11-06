import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radio, RadioGroup } from './RadioGroup';

const meta = {
  title: 'Core/RadioGroup',
  component: RadioGroup,
  args: { label: 'Reporting basis', defaultValue: 'basic' },
  render: (args) => (
    <RadioGroup {...args}>
      <Radio value="basic">GPC BASIC</Radio>
      <Radio value="basic-plus">GPC BASIC+</Radio>
      <Radio value="custom" disabled>
        Custom (not available for this membership)
      </Radio>
    </RadioGroup>
  ),
} satisfies Meta<typeof RadioGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
