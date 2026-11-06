import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tooltip, TooltipProvider } from './Tooltip';
import { Button } from '../Button/Button';

const meta = {
  title: 'Core/Tooltip',
  component: Tooltip,
  args: {
    content: 'Scope 2 uses the 2024 national grid factor.',
    children: <Button variant="secondary">Grid factor</Button>,
  },
  render: () => (
    <TooltipProvider>
      <Tooltip content="Scope 2 uses the 2024 national grid factor.">
        <Button variant="secondary">Grid factor</Button>
      </Tooltip>
    </TooltipProvider>
  ),
} satisfies Meta<typeof Tooltip>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
