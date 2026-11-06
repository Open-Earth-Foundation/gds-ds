import type { Meta, StoryObj } from '@storybook/react-vite';
import { AppShell } from './AppShell';
import { Button } from '../Button/Button';
import { Badge } from '../Badge/Badge';
import { Card } from '../Card/Card';
import { KeyFigure } from '../KeyFigure/KeyFigure';
import { TextField } from '../TextField/TextField';
import { Checkbox } from '../Checkbox/Checkbox';
import { ChevronDownIcon } from '../../icons';

const Mark = () => (
  <span
    aria-hidden
    style={{
      width: 'var(--gds-size-icon-lg)',
      height: 'var(--gds-size-icon-lg)',
      borderRadius: 'var(--gds-radius-control)',
      background: 'var(--gds-color-surface-inverse)',
    }}
  />
);

const Shell = ({ children }: { children: React.ReactNode }) => (
  <AppShell.Root style={{ height: '100vh' }}>
    <AppShell.TopBar
      brand={
        <>
          <Mark /> Digital Service
        </>
      }
      switcher={
        <Button variant="secondary" size="sm" iconEnd={<ChevronDownIcon />}>
          Salvador, BA
        </Button>
      }
      actions={
        <>
          <Button variant="ghost" size="sm">
            Help
          </Button>
          <Button variant="ghost" size="sm">
            CG
          </Button>
        </>
      }
    />
    <AppShell.SideNav>
      <AppShell.NavGroup>Journey</AppShell.NavGroup>
      <AppShell.NavItem href="#" step="1">
        Plan
      </AppShell.NavItem>
      <AppShell.NavItem href="#" step="2">
        Implement
      </AppShell.NavItem>
      <AppShell.NavItem href="#" current step="3">
        Monitor
      </AppShell.NavItem>
      <AppShell.NavItem href="#" step="4">
        Report
      </AppShell.NavItem>
      <AppShell.NavGroup>Data</AppShell.NavGroup>
      <AppShell.NavItem href="#">Inventories</AppShell.NavItem>
      <AppShell.NavItem href="#">Risk assessment</AppShell.NavItem>
      <AppShell.NavItem href="#">Settings</AppShell.NavItem>
    </AppShell.SideNav>
    <AppShell.Main>{children}</AppShell.Main>
  </AppShell.Root>
);

const meta = {
  title: 'Shell/AppShell',
  component: AppShell.Root,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof AppShell.Root>;
export default meta;
type Story = StoryObj<typeof meta>;

export const BlankCanvas: Story = {
  render: () => (
    <Shell>
      <AppShell.Breadcrumb
        items={[
          <a key="c" href="#">
            Salvador
          </a>,
          'Monitor',
        ]}
      />
      <AppShell.PageHeader
        title="Monitor"
        subtitle="How the 2024 commitments are going"
        actions={<Button>Add update</Button>}
      />
      <AppShell.Empty title="This module has nothing to show yet">
        <p>
          Modules mount here. The shell owns the top bar, the navigation and the page header;
          everything below the header is the module's.
        </p>
      </AppShell.Empty>
    </Shell>
  ),
};

export const WithContent: Story = {
  render: () => (
    <Shell>
      <AppShell.Breadcrumb
        items={[
          <a key="c" href="#">
            Salvador
          </a>,
          'Monitor',
        ]}
      />
      <AppShell.PageHeader
        title="Monitor"
        subtitle="How the 2024 commitments are going"
        actions={
          <>
            <Button variant="secondary">Export</Button>
            <Button>Add update</Button>
          </>
        }
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(14rem, 1fr))',
          gap: 'var(--gds-space-gap-md)',
        }}
      >
        <Card>
          <KeyFigure
            label="Total emissions"
            value="1.24"
            unit="MtCO₂e"
            delta="−4.2 % vs 2023"
            deltaTone="good"
            provenance="Reported, 2024 inventory"
          />
        </Card>
        <Card>
          <KeyFigure
            label="Actions on track"
            value="18"
            unit="of 27"
            delta="+3 since Q2"
            deltaTone="good"
            provenance="Updated 2 Nov"
          />
        </Card>
        <Card>
          <KeyFigure
            label="Not estimated"
            value="3"
            unit="sub-sectors"
            provenance="Needs a value or a notation key"
          />
        </Card>
      </div>
      <Card
        eyebrow="Commitment"
        title="Renewable share of municipal electricity"
        actions={
          <Badge kind="warning" dot>
            Behind
          </Badge>
        }
      >
        Target 60 % by 2030; 34 % in 2024. The procurement action has not started.
      </Card>
    </Shell>
  ),
};

export const Login: Story = {
  render: () => (
    <div
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background: 'var(--gds-color-surface-subtle)',
        padding: 'var(--gds-space-inset-lg)',
      }}
    >
      <Card
        elevated
        style={{ width: 'min(100%, 24rem)' }}
        title="Sign in"
        eyebrow="Digital Service"
      >
        <form
          style={{ display: 'grid', gap: 'var(--gds-space-gap-md)' }}
          onSubmit={(e) => e.preventDefault()}
        >
          <TextField
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@city.gov.br"
          />
          <TextField label="Password" type="password" autoComplete="current-password" />
          <Checkbox>Keep me signed in on this device</Checkbox>
          <Button type="submit">Sign in</Button>
          <Button variant="ghost" size="sm">
            Forgot your password?
          </Button>
        </form>
      </Card>
    </div>
  ),
};
