# KeyFigure

One number that matters, with its unit, its change and where it comes from.

## Anatomy

```
.gds-key-figure
  .gds-key-figure__label
  .gds-key-figure__value (+ .gds-key-figure__unit)
  .gds-key-figure__delta[data-tone]?
  .gds-key-figure__provenance?
```

## Tokens

`key-figure.value-type`, `key-figure.label-type`, `key-figure.label-fg`, `key-figure.delta-good`, `key-figure.delta-bad`, `provenance.*`.

`deltaTone` is about meaning, not sign: fewer emissions is `good` even though the number is negative. Every figure says where it comes from (principle 4).
