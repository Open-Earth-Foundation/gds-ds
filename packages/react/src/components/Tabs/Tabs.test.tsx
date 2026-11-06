import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tabs } from './Tabs';

const Example = () => (
  <Tabs.Root defaultValue="stationary">
    <Tabs.List aria-label="Sectors">
      <Tabs.Tab value="stationary" count={12}>
        Stationary energy
      </Tabs.Tab>
      <Tabs.Tab value="transport">Transport</Tabs.Tab>
    </Tabs.List>
    <Tabs.Panel value="stationary">Stationary panel</Tabs.Panel>
    <Tabs.Panel value="transport">Transport panel</Tabs.Panel>
  </Tabs.Root>
);

describe('Tabs', () => {
  it('shows the panel of the active tab and switches on click', async () => {
    render(<Example />);
    const tabs = screen.getAllByRole('tab');
    expect(tabs[0]).toHaveAttribute('data-active');
    expect(screen.getByText('Stationary panel')).toBeVisible();
    await userEvent.click(screen.getByRole('tab', { name: /Transport/ }));
    expect(tabs[1]).toHaveAttribute('data-active');
    expect(screen.getByText('Transport panel')).toBeVisible();
    expect(screen.queryByText('Stationary panel')).not.toBeInTheDocument();
  });
});
