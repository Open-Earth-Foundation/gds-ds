import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card/Card';
import { KeyFigure } from '../KeyFigure/KeyFigure';
import { Table } from '../Table/Table';
import { MissingValue, type MissingReason } from './MissingValue';

const meta = {
  title: 'Data/MissingValue',
  component: MissingValue,
} satisfies Meta<typeof MissingValue>;
export default meta;
type Story = StoryObj<typeof meta>;

const reasons: MissingReason[] = [
  'not-estimated',
  'not-occurring',
  'included-elsewhere',
  'confidential',
  'pending',
  'not-applicable',
];

export const AllReasons: Story = {
  render: () => (
    <ul style={{ display: 'grid', gap: '0.75rem', margin: 0, padding: 0, listStyle: 'none' }}>
      {reasons.map((r) => (
        <li key={r}>
          <MissingValue reason={r} />
        </li>
      ))}
    </ul>
  ),
};

export const InTable: Story = {
  render: () => (
    <div style={{ width: 'min(100%, 40rem)' }}>
      <Table.Root striped>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Sub-sector</Table.HeaderCell>
            <Table.HeaderCell numeric>Scope 1</Table.HeaderCell>
            <Table.HeaderCell numeric>Scope 2</Table.HeaderCell>
            <Table.HeaderCell numeric>Scope 3</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Residential buildings</Table.Cell>
            <Table.Cell numeric>610 000</Table.Cell>
            <Table.Cell numeric>1 920 000</Table.Cell>
            <Table.Cell numeric>140 000</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Manufacturing</Table.Cell>
            <Table.Cell numeric>330 000</Table.Cell>
            <Table.Cell numeric>110 000</Table.Cell>
            <Table.Cell numeric>
              <MissingValue />
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Fugitive emissions</Table.Cell>
            <Table.Cell numeric>20 000</Table.Cell>
            <Table.Cell numeric>
              <MissingValue reason="not-occurring" />
            </Table.Cell>
            <Table.Cell numeric>
              <MissingValue reason="included-elsewhere" />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  ),
};

export const InKeyFigure: Story = {
  render: () => (
    <Card style={{ width: '18rem' }}>
      <KeyFigure
        label="AFOLU emissions"
        value={<MissingValue />}
        provenance="Not reported in the 2024 inventory"
      />
    </Card>
  ),
};

export const TranslatedLabel: Story = {
  render: () => <MissingValue reason="pending">pendiente</MissingValue>,
};
