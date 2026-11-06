import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Core/Badge',
  component: Badge,
  args: { children: 'In review', kind: 'info', dot: true },
  argTypes: {
    kind: { control: 'select', options: ['good', 'warning', 'critical', 'info', 'neutral', 'ai'] },
  },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AllKinds: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 'var(--gds-space-gap-sm)' }}>
      {(['subtle', 'solid'] as const).map((variant) => (
        <div
          key={variant}
          style={{ display: 'flex', gap: 'var(--gds-space-gap-sm)', flexWrap: 'wrap' }}
        >
          <Badge kind="good" variant={variant} dot>
            Approved
          </Badge>
          <Badge kind="warning" variant={variant} dot>
            3 missing
          </Badge>
          <Badge kind="critical" variant={variant} dot>
            Rejected
          </Badge>
          <Badge kind="info" variant={variant} dot>
            In review
          </Badge>
          <Badge kind="neutral" variant={variant} dot>
            Draft
          </Badge>
          <Badge kind="ai" variant={variant} dot>
            AI suggested
          </Badge>
        </div>
      ))}
    </div>
  ),
};
