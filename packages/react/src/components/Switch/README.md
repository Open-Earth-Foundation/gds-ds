# Switch

A setting that takes effect immediately. Base UI `Switch`.

## Anatomy

```
label.gds-switch
  .gds-switch__track[data-checked|data-unchecked][data-disabled]   (Base UI Switch.Root, role=switch)
    .gds-switch__thumb                                              (Base UI Switch.Thumb)
  .gds-switch__text
```

## Props

`children` (label, required), `checked`, `defaultChecked`, `onCheckedChange`, `disabled`, `name`.

## Tokens

`color.interactive.selected.bg` when on, `color.border.strong` when off, `elevation.raised` on the thumb, `size.icon.md` / `size.icon.sm` for the geometry.

If the change needs a Save button, use Checkbox instead.
