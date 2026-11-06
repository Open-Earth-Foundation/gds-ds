# Badge

A short status word. Six kinds, two variants. No behavior.

## Anatomy

```
span.gds-badge[data-kind][data-variant]
  .gds-badge__dot?
  .gds-badge__label
```

## Props

`kind`: `good` `warning` `critical` `info` `neutral` `ai` (default `neutral`). `variant`: `subtle` (default) or `solid`. `dot`.

## Tokens

`badge.<kind>.bg` / `.fg`, `badge.radius`, `badge.padding-x`, `badge.type`; `ai` reads `ai-marker.*`; solid reads `color.status.<kind>.solid`.

The word carries the meaning. `ai` marks content a model proposed and a person has not confirmed (principle 9).
