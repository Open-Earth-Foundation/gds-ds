# Tooltip

A short explanation on hover or focus. Base UI `Tooltip`, positioned by its Positioner.

## Anatomy

```
Tooltip.Root
  Trigger (your element, data-popup-open)
  Portal > .gds-tooltip__positioner[data-side] > .gds-tooltip[role=tooltip][data-open|data-closed]
```

## Props

`content` (required), `children` (one focusable element), `side` (`top` default), plus Base UI Root props (`delay`, `open`, `onOpenChange`). Wrap the app once in `TooltipProvider`.

## Tokens

`tooltip.bg`, `tooltip.fg`, `tooltip.radius`, `tooltip.padding-*`, `tooltip.type`; `z.popover`.

Never put the only copy of important information in a tooltip; it is not reachable on touch. Provenance and units belong next to the value.
