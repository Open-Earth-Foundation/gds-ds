import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';
import styles from './Button.module.css';

describe('Button', () => {
  it('renders a native button with the convention attributes', () => {
    render(
      <Button variant="secondary" size="sm">
        Save
      </Button>,
    );
    const b = screen.getByRole('button', { name: 'Save' });
    expect(b.tagName).toBe('BUTTON');
    expect(b).toHaveClass(styles.root!);
    expect(b).toHaveAttribute('data-variant', 'secondary');
    expect(b).toHaveAttribute('data-size', 'sm');
  });

  it('exposes disabled through data-disabled and blocks clicks', async () => {
    const onClick = vi.fn();
    render(
      <Button disabled onClick={onClick}>
        Save
      </Button>,
    );
    const b = screen.getByRole('button', { name: 'Save' });
    expect(b).toHaveAttribute('data-disabled');
    await userEvent.click(b);
    expect(onClick).not.toHaveBeenCalled();
  });

  it('marks icon-only buttons and keeps the accessible name', () => {
    render(
      <Button iconOnly aria-label="Close">
        <svg />
      </Button>,
    );
    expect(screen.getByRole('button', { name: 'Close' })).toHaveAttribute('data-icon-only');
  });
});
