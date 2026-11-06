import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';

describe('Dialog', () => {
  it('opens from the trigger, labels itself, and closes from the footer', async () => {
    render(
      <Dialog.Root>
        <Dialog.Trigger render={<Button variant="destructive" />}>Delete inventory</Dialog.Trigger>
        <Dialog.Popup
          title="Delete 2024 inventory?"
          description="This removes 43 entries. It cannot be undone."
          footer={<Dialog.Close render={<Button variant="secondary" />}>Keep it</Dialog.Close>}
        />
      </Dialog.Root>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Delete inventory' }));
    const dialog = screen.getByRole('dialog', { name: 'Delete 2024 inventory?' });
    expect(dialog).toHaveAccessibleDescription('This removes 43 entries. It cannot be undone.');
    await userEvent.click(screen.getByRole('button', { name: 'Keep it' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
