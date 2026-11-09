import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { SegmentedControl } from './SegmentedControl';

const Example = ({ disabledTable = false }: { disabledTable?: boolean }) => {
  const [view, setView] = useState<'chart' | 'table'>('chart');
  return (
    <>
      <SegmentedControl.Root value={view} onValueChange={setView} aria-label="View">
        <SegmentedControl.Item value="chart">Chart</SegmentedControl.Item>
        <SegmentedControl.Item value="table" disabled={disabledTable}>
          Table
        </SegmentedControl.Item>
      </SegmentedControl.Root>
      <p>Showing {view}</p>
    </>
  );
};

describe('SegmentedControl', () => {
  it('is a named group with the selected option pressed', () => {
    render(<Example />);
    expect(screen.getByRole('group', { name: 'View' })).toBeInTheDocument();
    const chart = screen.getByRole('button', { name: 'Chart' });
    expect(chart).toHaveAttribute('aria-pressed', 'true');
    expect(chart).toHaveAttribute('data-pressed');
    expect(screen.getByRole('button', { name: 'Table' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('selects another option on click', async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Table' }));
    expect(screen.getByRole('button', { name: 'Table' })).toHaveAttribute('data-pressed');
    expect(screen.getByRole('button', { name: 'Chart' })).not.toHaveAttribute('data-pressed');
    expect(screen.getByText('Showing table')).toBeInTheDocument();
  });

  it('never ends up empty: pressing the selected option keeps it selected', async () => {
    render(<Example />);
    await userEvent.click(screen.getByRole('button', { name: 'Chart' }));
    expect(screen.getByRole('button', { name: 'Chart' })).toHaveAttribute('data-pressed');
    expect(screen.getByText('Showing chart')).toBeInTheDocument();
  });

  it('moves focus with the arrow keys and selects with Enter', async () => {
    render(<Example />);
    await userEvent.tab();
    expect(screen.getByRole('button', { name: 'Chart' })).toHaveFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(screen.getByRole('button', { name: 'Table' })).toHaveFocus();
    await userEvent.keyboard('{Enter}');
    expect(screen.getByText('Showing table')).toBeInTheDocument();
  });

  it('does not select a disabled option', async () => {
    render(<Example disabledTable />);
    const table = screen.getByRole('button', { name: 'Table' });
    expect(table).toHaveAttribute('data-disabled');
    await userEvent.click(table);
    expect(screen.getByText('Showing chart')).toBeInTheDocument();
  });
});
