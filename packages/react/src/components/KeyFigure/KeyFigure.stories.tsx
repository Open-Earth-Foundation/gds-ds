import type { Meta, StoryObj } from '@storybook/react-vite';
import { KeyFigure } from './KeyFigure';

const meta = {
  title: 'Data/KeyFigure',
  component: KeyFigure,
  args: {
    label: 'Total emissions',
    value: '1.24',
    unit: 'MtCO₂e',
    delta: '−4.2 % vs 2023',
    deltaTone: 'good',
    provenance: 'Reported, 2024 inventory',
  },
} satisfies Meta<typeof KeyFigure>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Estimated: Story = {
  args: {
    value: '0.31',
    delta: '+1.8 % vs 2023',
    deltaTone: 'bad',
    provenance: 'AI estimate, not yet confirmed',
  },
};
