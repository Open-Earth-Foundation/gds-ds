# RadioGroup and Radio

One of a few mutually exclusive choices, all visible. Base UI `RadioGroup` and `Radio`.

## Anatomy

```
.gds-radio-group[role=radiogroup]
  .gds-radio-group__legend
  label.gds-radio-group__item*
    .gds-radio-group__control[data-checked|data-unchecked][data-disabled]   (Base UI Radio.Root)
      .gds-radio-group__indicator                                            (Base UI Radio.Indicator)
    .gds-radio-group__text
```

## Props

RadioGroup: `label` (required), `value`, `defaultValue`, `onValueChange`, `name`, `disabled`. Radio: `value` (required), `children` (label), `disabled`.

## Tokens

Same as Checkbox, with `radius.pill` for the circle.

Use a Select when there are more than five options or the list is long.
