# Card

A bounded group of related content. Plain markup, no behavior.

## Anatomy

```
section.gds-card[data-elevated]
  header.gds-card__header?
    .gds-card__eyebrow?  .gds-card__title (h3)
    .gds-card__actions?
  .gds-card__body
  footer.gds-card__footer?
```

## Props

`eyebrow`, `title`, `actions`, `footer`, `elevated`, `children`, plus `<section>` props.

## Tokens

`card.bg`, `card.border`, `card.radius`, `card.padding`, `card.elevation`, `card.title-type`.

Border by default; elevation only when the card floats over content (a dashboard tile over a map). Never nest cards.
