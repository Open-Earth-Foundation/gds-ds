# Alert

An inline message about the state of the page or a section. Four kinds. Says what happened and what to do next.

## Anatomy

```
.gds-alert[data-kind][role=status|alert]
  .gds-alert__icon
  .gds-alert__body
    .gds-alert__title
    .gds-alert__text?
  .gds-alert__action?
```

## Props

`kind`: `info` (default) `good` `warning` `critical`. `title` (required), `children` (text), `action`.

## Tokens

`alert.<kind>.bg` / `.border` / `.fg`, `alert.radius`, `alert.padding`.

`critical` gets `role="alert"` and is announced immediately; everything else is `role="status"`. For a transient confirmation use a Toast; for a decision use a Dialog.
