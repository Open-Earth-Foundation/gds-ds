import { render, screen } from '@testing-library/react';
import { Alert } from './Alert';

describe('Alert', () => {
  it('uses role=status for non-critical and role=alert for critical', () => {
    const { rerender } = render(<Alert kind="warning" title="3 sub-sectors have no data" />);
    expect(screen.getByRole('status')).toHaveAttribute('data-kind', 'warning');
    rerender(
      <Alert kind="critical" title="Import failed">
        Row 42 has a unit the template does not accept.
      </Alert>,
    );
    expect(screen.getByRole('alert')).toHaveTextContent('Row 42');
  });
});
