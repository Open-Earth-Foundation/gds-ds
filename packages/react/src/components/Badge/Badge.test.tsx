import { render, screen } from '@testing-library/react';
import { Badge } from './Badge';
import styles from './Badge.module.css';

describe('Badge', () => {
  it('carries kind and variant as data attributes and keeps the text', () => {
    render(
      <Badge kind="good" variant="solid" dot>
        Submitted
      </Badge>,
    );
    const b = screen.getByText('Submitted').closest(`.${styles.root}`)!;
    expect(b).toHaveAttribute('data-kind', 'good');
    expect(b).toHaveAttribute('data-variant', 'solid');
    expect(b.querySelector(`.${styles.dot}`)).toBeInTheDocument();
  });
});
