import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Switch } from './Switch';

describe('Switch', () => {
  it('is a switch role that toggles from the label', async () => {
    render(<Switch>Show estimated values</Switch>);
    const s = screen.getByRole('switch', { name: 'Show estimated values' });
    expect(s).toHaveAttribute('data-unchecked');
    await userEvent.click(screen.getByText('Show estimated values'));
    expect(s).toHaveAttribute('data-checked');
    expect(s).toHaveAttribute('aria-checked', 'true');
  });
});
