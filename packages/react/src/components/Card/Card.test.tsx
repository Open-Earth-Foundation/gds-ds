import { render, screen } from '@testing-library/react';
import { Card } from './Card';
import styles from './Card.module.css';

describe('Card', () => {
  it('renders header parts and marks elevation as a data attribute', () => {
    render(
      <Card
        eyebrow="Stationary energy"
        title="Residential buildings"
        elevated
        footer={<span>footer</span>}
      >
        body
      </Card>,
    );
    expect(
      screen.getByRole('heading', { level: 3, name: 'Residential buildings' }),
    ).toBeInTheDocument();
    expect(screen.getByText('Stationary energy')).toHaveClass(styles.eyebrow!);
    expect(screen.getByText('body').closest(`.${styles.root}`)).toHaveAttribute('data-elevated');
  });

  it('omits the header when nothing is given', () => {
    const { container } = render(<Card>only body</Card>);
    expect(container.querySelector('header')).toBeNull();
  });
});
