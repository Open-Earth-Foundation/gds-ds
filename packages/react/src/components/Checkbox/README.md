# Checkbox

One on/off choice, or one of many in a list. Base UI `Checkbox` inside a `<label>` so the text is part of the hit area.

## Anatomy

```
label.gds-checkbox
  .gds-checkbox__box[data-checked|data-unchecked][data-indeterminate][data-disabled]   (Base UI Checkbox.Root)
    .gds-checkbox__indicator   (Base UI Checkbox.Indicator, mounted when checked)
  .gds-checkbox__text
```

## Props

`children` (the label, required), `checked`, `defaultChecked`, `onCheckedChange`, `indeterminate`, `disabled`, `name`, `value`, `required`.

## Tokens

`color.interactive.selected.*` for the checked state, `color.border.strong` at rest, `radius.control`, `size.icon.md` for the box.

For a single setting that takes effect immediately, use Switch instead. For one-of-many, use RadioGroup.
