import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Radio, RadioGroup } from './RadioGroup';

describe('RadioGroup', () => {
  it('selects one option at a time', async () => {
    const onValueChange = vi.fn();
    render(
      <RadioGroup label="Reporting basis" defaultValue="gpc" onValueChange={onValueChange}>
        <Radio value="gpc">GPC BASIC</Radio>
        <Radio value="basic-plus">GPC BASIC+</Radio>
      </RadioGroup>,
    );
    expect(screen.getByRole('radiogroup', { name: 'Reporting basis' })).toBeInTheDocument();
    const [a, b] = screen.getAllByRole('radio');
    expect(a).toHaveAttribute('data-checked');
    await userEvent.click(screen.getByText('GPC BASIC+'));
    expect(b).toHaveAttribute('data-checked');
    expect(a).toHaveAttribute('data-unchecked');
    expect(onValueChange).toHaveBeenCalledWith('basic-plus', expect.anything());
  });
});
