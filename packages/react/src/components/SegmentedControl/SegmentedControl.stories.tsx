import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

const meta = {
  title: 'Core/SegmentedControl',
  component: SegmentedControl.Root,
  // The component is controlled, so each story owns the state in a small demo component.
  args: { value: 'chart', onValueChange: () => {} },
} satisfies Meta<typeof SegmentedControl.Root>;
export default meta;
type Story = StoryObj<typeof meta>;

function ChartOrTableDemo() {
  const [view, setView] = useState('chart');
  return (
    <SegmentedControl.Root value={view} onValueChange={setView} aria-label="Results view">
      <SegmentedControl.Item value="chart">Chart</SegmentedControl.Item>
      <SegmentedControl.Item value="table">Table</SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}

function ThreeOptionsDemo() {
  const [period, setPeriod] = useState('year');
  return (
    <SegmentedControl.Root value={period} onValueChange={setPeriod} aria-label="Period">
      <SegmentedControl.Item value="month">Month</SegmentedControl.Item>
      <SegmentedControl.Item value="quarter">Quarter</SegmentedControl.Item>
      <SegmentedControl.Item value="year">Year</SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}

function DisabledOptionDemo() {
  const [level, setLevel] = useState('basic');
  return (
    <SegmentedControl.Root value={level} onValueChange={setLevel} aria-label="Inventory level">
      <SegmentedControl.Item value="basic">BASIC</SegmentedControl.Item>
      <SegmentedControl.Item value="basic-plus" disabled>
        BASIC+
      </SegmentedControl.Item>
    </SegmentedControl.Root>
  );
}

export const ChartOrTable: Story = { render: () => <ChartOrTableDemo /> };

export const ThreeOptions: Story = { render: () => <ThreeOptionsDemo /> };

export const DisabledOption: Story = { render: () => <DisabledOptionDemo /> };

export const Disabled: Story = {
  render: () => (
    <SegmentedControl.Root value="chart" onValueChange={() => {}} aria-label="View" disabled>
      <SegmentedControl.Item value="chart">Chart</SegmentedControl.Item>
      <SegmentedControl.Item value="table">Table</SegmentedControl.Item>
    </SegmentedControl.Root>
  ),
};
