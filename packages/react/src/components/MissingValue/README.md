# MissingValue

What goes where a value would be when there is none. "— not estimated", never a blank cell or a
zero (principle 10: absence of data is data). No Base UI primitive; it is plain markup.

## Anatomy

```
span.gds-missing-value[data-reason]
  .gds-missing-value__dash   (aria-hidden)
  .gds-missing-value__label
```

## Reasons

| `reason`             | Word               | GPC notation key (title) |
| -------------------- | ------------------ | ------------------------ |
| `not-estimated`      | not estimated      | NE                       |
| `not-occurring`      | not occurring      | NO                       |
| `included-elsewhere` | included elsewhere | IE                       |
| `confidential`       | confidential       | C                        |
| `pending`            | pending            | —                        |
| `not-applicable`     | not applicable     | —                        |

The default is `not-estimated`.

## Usage

```tsx
<Table.Cell numeric>{value ?? <MissingValue reason="not-estimated" />}</Table.Cell>

<KeyFigure label="AFOLU emissions" value={<MissingValue />} provenance="Not reported in 2024" />

<MissingValue reason="pending">{t('pending')}</MissingValue>   // translated word
```

## Props

`reason` (default `not-estimated`), `children` (replaces the English word, for translation),
`title` (replaces the generated "not estimated (NE)"), and any `span` attribute.

## Tokens

`color.text.secondary` for the word, which is essential text and needs 4.5:1. `color.text.tertiary`
for the dash. `type.text.sm`, `space.gap.xs`.

## Do and don't

- Use the reason that is true. "Not occurring" and "not estimated" mean different things in a GPC
  report.
- Pass a translated word as `children`. The defaults are English.
- Don't add colour or an icon. If the state needs a call to action, add a Badge or an Alert next
  to it.

## Accessibility

The dash is hidden from screen readers, so they read only the word. The GPC code sits in the
`title` (hover) for experts; the visible word never depends on it.
