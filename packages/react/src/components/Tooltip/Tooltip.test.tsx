import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tooltip, TooltipProvider } from './Tooltip';
import { Button } from '../Button/Button';

describe('Tooltip', () => {
  it('shows the content on focus and labels the trigger', async () => {
    render(
      <TooltipProvider delay={0}>
        <Tooltip content="Scope 2 uses the 2024 national grid factor">
          <Button variant="ghost">Grid factor</Button>
        </Tooltip>
      </TooltipProvider>,
    );
    await userEvent.tab();
    const popup = await screen.findByText('Scope 2 uses the 2024 national grid factor');
    expect(popup).toHaveAttribute('data-open');
    expect(screen.getByRole('button')).toHaveAttribute('data-popup-open');
  });
});
