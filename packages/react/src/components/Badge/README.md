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

`badge.<kind>.bg` / `.fg`, `badge.radius`, `badge.padding-x`, `badge.type`; `ai` reads `ai-marker.*`; solid reads `color.status.<kind>.solid`. The label's line is capped at half of `size.reading-width`.

## Do and don't

- A label is one line, 40 characters at most, and shorter is better: a badge is a status word, not a sentence. It never wraps. If the space is still too narrow, the label ends in an ellipsis rather than pushing out of the badge.

The word carries the meaning. `ai` marks content a model proposed and a person has not confirmed (principle 9).
