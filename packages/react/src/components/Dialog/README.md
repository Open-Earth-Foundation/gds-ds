# Dialog

A modal decision or a short task over the page. Base UI `Dialog`: focus trap, scroll lock, Escape, return focus.

## Anatomy

```
Dialog.Root
  Dialog.Trigger[data-popup-open]            (Base UI; `render` to compose a Button)
  Dialog.Popup                                (portal + backdrop + popup)
    .gds-dialog__backdrop[data-open|data-closed]
    .gds-dialog[role=dialog][data-open|data-closed]
      .gds-dialog__header  .gds-dialog__title  .gds-dialog__close?
      .gds-dialog__description?
      .gds-dialog__body?
      .gds-dialog__footer?
```

## Usage

```tsx
<Dialog.Root>
  <Dialog.Trigger render={<Button />}>Open</Dialog.Trigger>
  <Dialog.Popup
    title="…"
    description="…"
    footer={<Dialog.Close render={<Button />}>Done</Dialog.Close>}
  >
    …
  </Dialog.Popup>
</Dialog.Root>
```

## Tokens

`dialog.bg`, `dialog.scrim`, `dialog.radius`, `dialog.elevation`, `dialog.padding`, `dialog.title-type`, `dialog.duration`; width capped by `size.reading-width`.

Title asks the question; the primary button answers it with a verb ("Delete", not "Yes"). Reduced motion removes the transitions through the base stylesheet.
