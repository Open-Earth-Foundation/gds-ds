# @open-earth-foundation/gds-tokens

The design tokens of the GCoM Digital Service design system (GDS). The source of truth is the W3C Design Tokens (DTCG 2025.10) files in `tokens/`; everything else is generated.

```
tokens/
  primitives.tokens.json          tier 1: raw values; the only file a brand replaces
  semantic/base.tokens.json       tier 2: type, space, size, radius, border, elevation, motion
  semantic/color.light.tokens.json  tier 2: color roles, light
  semantic/color.dark.tokens.json   tier 2: color roles, dark (same paths as light)
  components.tokens.json          tier 3: component aliases, references only
```

The rules for these files, including naming, tiers, ramps and how to change a token, are in [TOKENS.md](./TOKENS.md). The one sentence: **anyone can create an alias, nobody can create a value.**

## Outputs

| Import                                         | What                                                                                                                                                                     |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@open-earth-foundation/gds-tokens/css`        | `variables.css`: every token as `--gds-*`. Light in `:root`; dark under `:root[data-theme="dark"]` and `prefers-color-scheme: dark` (opt out with `data-theme="light"`). |
| `@open-earth-foundation/gds-tokens`            | `light`, `dark`, `tokens`, `paths`, and `cssVar('color.surface.base')` → `var(--gds-color-surface-base)`. Typed: `TokenPath` is a union of every path.                   |
| `@open-earth-foundation/gds-tokens/highcharts` | `highchartsTheme(mode)`: a Highcharts options object built from the `chart.*` tokens.                                                                                    |
| `@open-earth-foundation/gds-tokens/figma`      | `figma.variables.json`: three collections (Primitives with light/dark modes, Semantic aliasing Primitives, Component aliasing Semantic) plus composite styles.           |
| `@open-earth-foundation/gds-tokens/tokens/*`   | The raw source files.                                                                                                                                                    |

Typography tokens become one shorthand and five longhands: `--gds-type-text-md` (for `font:`) plus `-font-family`, `-font-size`, `-font-weight`, `-line-height`, `-letter-spacing`.

## Scripts

| Command      | Does                                                                                                                    |
| ------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `pnpm check` | `tools/check.py`: tier direction, light/dark parity, namespace, naming grammar, contrast. Fails the build on any error. |
| `pnpm build` | Resolves references and writes `dist/`.                                                                                 |
| `pnpm lint`  | Same as build without writing.                                                                                          |
| `pnpm test`  | Checks the generated outputs.                                                                                           |

## Changing a token

1. Read the section of `TOKENS.md` that covers the tier you are touching.
2. Edit the source file. Never edit `dist/`.
3. `pnpm check && pnpm build && pnpm test`.
4. Add a changeset (`pnpm changeset` at the root) and open a pull request. The template asks for the reason.

## Placeholders

The v0.1 primitives are placeholders so the kit works today: Radix Colors scales (MIT) for the neutral and functional hues, Okabe-Ito for the eight categorical data colors, system font stacks. The GCoM brand replaces `primitives.tokens.json` when it arrives; nothing in the other files changes.
