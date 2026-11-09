# SegmentedControl

Switches between views of the same content, such as a chart and its table, or month / quarter /
year. Single-select and never empty. Base UI `ToggleGroup` and `Toggle`.

## Anatomy

```
.gds-segmented-control[role=group][data-disabled]          (Base UI ToggleGroup)
  .gds-segmented-control__item[data-pressed][data-disabled]*  (Base UI Toggle, aria-pressed)
```

The selected state is Base UI's `data-pressed`, kept as is rather than renamed.

## Usage

```tsx
const [view, setView] = useState<'chart' | 'table'>('chart');

<SegmentedControl.Root value={view} onValueChange={setView} aria-label="Results view">
  <SegmentedControl.Item value="chart">Chart</SegmentedControl.Item>
  <SegmentedControl.Item value="table">Table</SegmentedControl.Item>
</SegmentedControl.Root>;
```

## Props

Root: `value` and `onValueChange` (required, controlled), `aria-label` (required, names the
group), `disabled`, `orientation`, `loopFocus`. Item: `value`, `disabled`, children.

It is controlled only, so the component holds no state of its own. Use it inside a client
component that owns the value.

## Tokens

`color.surface.subtle` and `color.border.default` on the track, `color.interactive.selected.subtle.bg`
/ `.fg` on the selected option, `color.text.secondary` / `.primary` / `.disabled` for the labels,
`size.control.sm`, `radius.pill`, `type.label.md`.

## Do and don't

- Use it for 2–5 views of the **same** content. For sections of a page use Tabs; for a form choice
  use RadioGroup; for an on/off setting use Switch.
- Keep labels to one or two words. The group always needs an `aria-label`.
- Don't use it for navigation between pages.

## Accessibility

Each option is a button with `aria-pressed`. The group takes one tab stop, and the arrow keys move
between options (Base UI roving focus). Enter or Space selects.
