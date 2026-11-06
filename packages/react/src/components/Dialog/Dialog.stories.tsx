import type { Meta, StoryObj } from '@storybook/react-vite';
import { Dialog } from './Dialog';
import { Button } from '../Button/Button';

const meta = {
  title: 'Core/Dialog',
  component: Dialog.Root,
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="destructive" />}>Delete inventory</Dialog.Trigger>
      <Dialog.Popup
        title="Delete the 2024 inventory?"
        description="This removes 43 entries and their evidence. It cannot be undone."
        footer={
          <>
            <Dialog.Close render={<Button variant="secondary" />}>Keep it</Dialog.Close>
            <Dialog.Close render={<Button variant="destructive" />}>Delete</Dialog.Close>
          </>
        }
      />
    </Dialog.Root>
  ),
} satisfies Meta<typeof Dialog.Root>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Confirm: Story = {};
