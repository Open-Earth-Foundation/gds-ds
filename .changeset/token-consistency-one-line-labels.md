---
'@open-earth-foundation/gds-tokens': patch
'@open-earth-foundation/gds-react': patch
---

Tokens and components now agree. `input.radius` is `radius.control` (it was the pill, against its own description), and `input.padding-x` is the inset on both sides of a field. `button.padding-x` is the value the Button uses (24px at md), with `button.padding-x-sm` and `button.padding-x-lg` for the other sizes. Button and Badge labels are always one line, 40 characters at most: in a space too narrow for it, a label ends in an ellipsis instead of pushing out of its container.
