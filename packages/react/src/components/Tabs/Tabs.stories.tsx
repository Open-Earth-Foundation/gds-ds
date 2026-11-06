import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const meta = {
  title: 'Core/Tabs',
  component: Tabs.Root,
  render: () => (
    <Tabs.Root defaultValue="stationary" style={{ width: 'min(100%, 36rem)' }}>
      <Tabs.List aria-label="Sectors">
        <Tabs.Tab value="stationary" count={12}>
          Stationary energy
        </Tabs.Tab>
        <Tabs.Tab value="transport" count={7}>
          Transport
        </Tabs.Tab>
        <Tabs.Tab value="waste" count={3}>
          Waste
        </Tabs.Tab>
        <Tabs.Tab value="afolu" disabled>
          AFOLU
        </Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="stationary">Twelve sub-sectors, nine with data.</Tabs.Panel>
      <Tabs.Panel value="transport">Seven sub-sectors, all with data.</Tabs.Panel>
      <Tabs.Panel value="waste">Three sub-sectors, one estimated.</Tabs.Panel>
    </Tabs.Root>
  ),
} satisfies Meta<typeof Tabs.Root>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
