# @open-earth-foundation/gds-react

## 0.1.2

### Patch Changes

- bacab9a: Tokens and components now agree. `input.radius` is `radius.control` (it was the pill, against its own description), and `input.padding-x` is the inset on both sides of a field. `button.padding-x` is the value the Button uses (24px at md), with `button.padding-x-sm` and `button.padding-x-lg` for the other sizes. Button and Badge labels are always one line, 40 characters at most: in a space too narrow for it, a label ends in an ellipsis instead of pushing out of its container. A tab's label is one line too, three words at most.
- Updated dependencies [bacab9a]
  - @open-earth-foundation/gds-tokens@0.1.2

## 0.1.1

### Patch Changes

- e6ec3ea: Publish to GitHub Packages under the `@open-earth-foundation` scope (previously `@oef`, never published). First version available to install.
- Updated dependencies [e6ec3ea]
  - @open-earth-foundation/gds-tokens@0.1.1

## 0.1.0

First version. See the repository README for what is included. From here on, entries are written by `changeset version` from the changesets merged into `main`.
