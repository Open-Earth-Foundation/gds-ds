import { render, screen } from '@testing-library/react';
import { Table } from './Table';

describe('Table', () => {
  it('renders semantic table markup with convention attributes', () => {
    render(
      <Table.Root striped>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Sub-sector</Table.HeaderCell>
            <Table.HeaderCell numeric>tCO₂e</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row selected>
            <Table.Cell>Residential</Table.Cell>
            <Table.Cell numeric>412 300</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>,
    );
    expect(screen.getByRole('table')).toHaveAttribute('data-striped');
    expect(screen.getByRole('columnheader', { name: 'tCO₂e' })).toHaveAttribute('data-numeric');
    expect(screen.getByRole('cell', { name: '412 300' })).toHaveAttribute('data-numeric');
    expect(screen.getByRole('row', { selected: true })).toHaveTextContent('Residential');
  });
});
