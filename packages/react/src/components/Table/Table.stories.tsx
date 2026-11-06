import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import { Badge } from '../Badge/Badge';

const rows = [
  { name: 'Residential buildings', value: '412 300', status: 'good', label: 'Reported' },
  { name: 'Commercial buildings', value: '198 040', status: 'good', label: 'Reported' },
  { name: 'Manufacturing', value: '77 915', status: 'ai', label: 'AI estimate' },
  { name: 'Energy industries', value: '—', status: 'warning', label: 'Not estimated' },
] as const;

const meta = {
  title: 'Core/Table',
  component: Table.Root,
  render: () => (
    <div style={{ width: 'min(100%, 40rem)' }}>
      <Table.Root striped>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Sub-sector</Table.HeaderCell>
            <Table.HeaderCell numeric>tCO₂e</Table.HeaderCell>
            <Table.HeaderCell>Status</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {rows.map((r) => (
            <Table.Row key={r.name} selected={r.name === 'Manufacturing'}>
              <Table.Cell>{r.name}</Table.Cell>
              <Table.Cell numeric>{r.value}</Table.Cell>
              <Table.Cell>
                <Badge kind={r.status} dot>
                  {r.label}
                </Badge>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  ),
} satisfies Meta<typeof Table.Root>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const EmptyState: Story = {
  render: () => (
    <div style={{ width: 'min(100%, 40rem)' }}>
      <Table.Root>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Sub-sector</Table.HeaderCell>
            <Table.HeaderCell numeric>tCO₂e</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Empty colSpan={2}>
            No entries for 2024 yet. Import a file or add a value.
          </Table.Empty>
        </Table.Body>
      </Table.Root>
    </div>
  ),
};
