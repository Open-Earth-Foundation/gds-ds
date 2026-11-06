import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('toggles from the label and reflects state as data-checked', async () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox onCheckedChange={onCheckedChange}>Include Scope 3</Checkbox>);
    const box = screen.getByRole('checkbox', { name: 'Include Scope 3' });
    expect(box).toHaveAttribute('data-unchecked');
    await userEvent.click(screen.getByText('Include Scope 3'));
    expect(box).toHaveAttribute('data-checked');
    expect(onCheckedChange).toHaveBeenCalledWith(true, expect.anything());
  });

  it('does not toggle when disabled', async () => {
    render(<Checkbox disabled>Locked</Checkbox>);
    const box = screen.getByRole('checkbox');
    await userEvent.click(box);
    expect(box).toHaveAttribute('data-unchecked');
    expect(box).toHaveAttribute('data-disabled');
  });
});
