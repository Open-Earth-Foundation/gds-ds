# Button

The one action control. Four variants, three sizes, optional icons. Behavior from Base UI `Button` (native `<button>`, `data-disabled`, focusable-when-disabled if needed).

## Anatomy

```
.gds-button[data-variant][data-size][data-icon-only][data-disabled]
  .gds-button__icon?   (iconStart)
  .gds-button__label   (children)   or .gds-button__icon when iconOnly
  .gds-button__icon?   (iconEnd)
```

## Props

| Prop                   | Values                                      | Default   |
| ---------------------- | ------------------------------------------- | --------- |
| `variant`              | `primary` `secondary` `ghost` `destructive` | `primary` |
| `size`                 | `sm` `md` `lg`                              | `md`      |
| `iconStart`, `iconEnd` | ReactNode                                   |           |
| `iconOnly`             | boolean; requires `aria-label`              | `false`   |
| `disabled`             | boolean                                     | `false`   |
| `render`               | Base UI render prop, e.g. render as `<a>`   |           |

## Tokens

`button.primary.*`, `button.secondary.*`, `button.destructive.*`, `button.height.*`, `button.padding-x` (md) with `button.padding-x-sm` and `button.padding-x-lg`, `button.radius`, `button.type`; ghost reads `color.interactive.subtle.*` directly. The label's line is capped at half of `size.reading-width`.

## Do and don't

- One primary per view. Secondary for the rest, ghost inside dense surfaces (table rows, toolbars).
- Destructive only for actions that remove data; pair with a confirmation dialog.
- Label is a verb phrase: "Save draft", not "OK".
- A label is one line, 40 characters at most. It never wraps. If the space is still too narrow, the label ends in an ellipsis rather than pushing out of the button: shorten the label or give the button room.

## Accessibility

Native button semantics. Icon-only buttons must pass `aria-label`. Focus ring is the global `:focus-visible` rule.
