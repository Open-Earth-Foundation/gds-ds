import { render, screen } from '@testing-library/react';
import { AppShell } from './AppShell';

describe('AppShell', () => {
  it('renders landmarks and marks the current nav item', () => {
    render(
      <AppShell.Root>
        <AppShell.TopBar brand="Digital Service" />
        <AppShell.SideNav>
          <AppShell.NavGroup>Journey</AppShell.NavGroup>
          <AppShell.NavItem href="#plan" current step="1 of 4">
            Plan
          </AppShell.NavItem>
          <AppShell.NavItem href="#monitor">Monitor</AppShell.NavItem>
        </AppShell.SideNav>
        <AppShell.Main>
          <AppShell.Breadcrumb items={['Salvador', 'Plan']} />
          <AppShell.PageHeader title="Plan" />
          <AppShell.Empty title="Nothing here yet" />
        </AppShell.Main>
      </AppShell.Root>,
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Main' })).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Plan/ })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('heading', { level: 1, name: 'Plan' })).toBeInTheDocument();
  });
});
