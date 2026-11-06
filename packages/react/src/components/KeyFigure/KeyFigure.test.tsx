import { render, screen } from '@testing-library/react';
import { KeyFigure } from './KeyFigure';
import styles from './KeyFigure.module.css';

describe('KeyFigure', () => {
  it('renders label, value, delta tone and provenance', () => {
    render(
      <KeyFigure
        label="Total emissions"
        value="1.24"
        unit="MtCO₂e"
        delta="−4.2 % vs 2023"
        deltaTone="good"
        provenance="Reported, 2024 inventory"
      />,
    );
    expect(screen.getByText('Total emissions')).toHaveClass(styles.label!);
    expect(screen.getByText('−4.2 % vs 2023')).toHaveAttribute('data-tone', 'good');
    expect(screen.getByText('Reported, 2024 inventory')).toHaveClass(styles.provenance!);
  });
});
