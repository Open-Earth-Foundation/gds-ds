import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TextField } from './TextField';
import styles from './TextField.module.css';

describe('TextField', () => {
  it('labels the input and shows the description', () => {
    render(<TextField label="City" description="As registered with GCoM" placeholder="Salvador" />);
    expect(screen.getByRole('textbox', { name: 'City' })).toBeInTheDocument();
    expect(screen.getByText('As registered with GCoM')).toBeInTheDocument();
  });

  it('marks the field invalid when an error is given', () => {
    const { container } = render(<TextField label="Population" error="Enter a whole number" />);
    expect(container.querySelector(`.${styles.root}`)).toHaveAttribute('data-invalid');
    expect(screen.getByText('Enter a whole number')).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('propagates disabled to the input', async () => {
    render(<TextField label="City" disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
    await userEvent.type(input, 'x');
    expect(input).toHaveValue('');
  });
});
