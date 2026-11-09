# Component conventions

Every component in `@open-earth-foundation/gds-react` follows the same shape, so a reader of the DOM, the stylesheet or the Figma file sees the same names.

## Behavior from Base UI, looks from tokens

A component takes its behavior (keyboard, focus, ARIA, open/close, controlled and uncontrolled state) from a [Base UI](https://base-ui.com) primitive and never re-implements it. It takes every visual value from a token through `var(--gds-…)`. Nothing else goes in a module file: `gds/no-raw-values` fails the build on a colour, length or duration literal.

## Names

| Thing               | Convention                                        | Example                                                                                                                                                    |
| ------------------- | ------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Root                | `gds-<component>`                                 | `gds-button`, `gds-text-field`                                                                                                                             |
| Part                | `gds-<component>__<part>`                         | `gds-button__icon`, `gds-card__footer`                                                                                                                     |
| Variant, size, kind | data attribute set by a prop                      | `data-variant="secondary"`, `data-size="sm"`, `data-kind="warning"`                                                                                        |
| Boolean prop        | present/absent data attribute                     | `data-elevated`, `data-striped`, `data-icon-only`                                                                                                          |
| State               | Base UI's own attribute, never renamed            | `data-disabled`, `data-checked`, `data-active` (tabs), `data-open` (dialog, tooltip), `data-popup-open` (trigger), `data-invalid` / `data-focused` (field) |
| Focus               | global `:focus-visible` rule in `styles/base.css` |                                                                                                                                                            |

In source, the module file uses `.root` and `.part`; the build maps them (`vite.config.ts`, `scopedName`). Parts written in camelCase become hyphenated (`headerCell` → `gds-table__header-cell`).

Container state lives on the wrapper: a field is invalid, not its input; a table row is selected, not its cells.

## Tokens a component may read

Component aliases first (`button.primary.bg`), semantic roles when no alias exists (`color.text.disabled`, `space.gap.sm`, `size.icon.md`). Never a primitive. If a component needs a value that no role covers, the fix is a new role in `semantic/` with a reason, not a literal.

Typography is set with the shorthand plus letter-spacing: `font: var(--gds-button-type); letter-spacing: var(--gds-button-type-letter-spacing);`.

## Files

```
Button/
  Button.tsx          component, props as data attributes, doc comment with the anatomy
  Button.module.css   styles, tokens only
  Button.test.tsx     roles, names, state attributes, keyboard
  Button.stories.tsx  every variant and state
  README.md           purpose, anatomy, props, tokens, do and don't, accessibility
```

## Done means

- [ ] Anatomy in the doc comment and the README match the DOM
- [ ] Every variant and state has a story; light and dark both checked
- [ ] Tests cover the role, the accessible name, the state attributes and keyboard use
- [ ] `pnpm verify` green
- [ ] Figma component built from the same tokens, one page, same name (once the Figma library exists)
