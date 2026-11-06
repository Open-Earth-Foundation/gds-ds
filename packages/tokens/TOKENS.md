# GDS token rules

Rules for the token files of the GCoM Digital Service design system (GDS). Read this before touching any file in `tokens/`. The files are the source of truth; Figma variables, CSS variables, TypeScript constants and the Highcharts theme are generated from them and never edited by hand.

## 1. Format

- Files follow the W3C Design Tokens format, version 2025.10: every token has `$type` and `$value`, optionally `$description`, `$deprecated` and `$extensions`. File names end in `.tokens.json`.
- Colors are written as hex strings (`#RRGGBB` or `#RRGGBBAA`). The build converts to other spaces when an output needs it. No `rgb()`, `hsl()` or `oklch()` in the files.
- Dimensions use `{ "value": n, "unit": "rem" | "px" }`. Type sizes, spacing and line lengths are in `rem` (16px base). Border widths, radii, shadows and anything that must not scale with the user's font size are in `px`.
- Durations are in `ms`. Easing curves are `cubicBezier` arrays. Typography and shadows are composite tokens of the spec's `typography` and `shadow` types.
- References use `{path.to.token}` with dots. A reference may point only one tier down (see §3).

## 2. Files

```
tokens/
  primitives.tokens.json           # tier 1: raw values; the only file a brand replaces
  semantic/
    base.tokens.json               # tier 2, mode-independent: type, space, radius, elevation, motion
    color.light.tokens.json        # tier 2, color roles for light mode
    color.dark.tokens.json         # tier 2, color roles for dark mode; same paths as light
  components.tokens.json           # tier 3: aliases into tier 2 only
```

`color.light` and `color.dark` must contain exactly the same set of paths. CI fails the build if a path exists in one and not the other.

## 3. Tiers

| Tier         | File         | May contain                                                | May reference | Who changes it                                       |
| ------------ | ------------ | ---------------------------------------------------------- | ------------- | ---------------------------------------------------- |
| 1 Primitives | `primitives` | Raw values only                                            | Nothing       | Brand application; OEF design when a ramp is missing |
| 2 Semantic   | `semantic/*` | References into tier 1; composite tokens built from tier 1 | Tier 1 only   | OEF design, with a written reason, through review    |
| 3 Component  | `components` | References into tier 2 only                                | Tier 2 only   | Anyone building a component, through review          |

The one sentence to remember: **anyone can create an alias, nobody can create a value.** A raw value outside `primitives.tokens.json` fails the build. A tier 3 token that references tier 1 fails the build. A tier 2 token that references tier 3 fails the build.

## 4. Naming

Paths are lower-case, words separated by hyphens inside a segment, segments separated by dots. Digits allowed. No underscores, no camelCase, no abbreviations that are not on the list below.

Grammar by tier:

```
tier 1   {category}.{scale}.{mode?}.{step}          color.neutral.light.9   font.size.300   space.4
tier 2   {category}.{role}.{emphasis}.{state?}       color.surface.subtle    color.interactive.default.hover
tier 3   {component}.{part}.{property}.{state?}      button.primary.bg.hover   table.row.striped.bg
```

Allowed categories: `color`, `font`, `space`, `size`, `radius`, `border`, `shadow`, `motion`, `opacity`, `z`. Allowed abbreviations: `bg`, `fg`, `sm`, `md`, `lg`, `xl`, `xs`.

Every ladder in tier 2 uses the same emphasis words, in the same order, so that a reader knows what "subtle" means everywhere:

- surfaces: `base`, `subtle`, `muted`, `emphasized`, `inverse`, `overlay`
- text and icons: `primary`, `secondary`, `tertiary`, `disabled`, `inverse`, `link`
- borders: `subtle`, `default`, `strong`, `focus`
- interactive: `default`, `hover`, `active`, `disabled`, plus `subtle.*` for secondary controls, plus `fg` for what sits on top
- status: `good`, `warning`, `critical`, `info`, each with `bg`, `border`, `fg`, `solid`
- data: `categorical.1..8`, `sequential.1..5`, `diverging.negative | neutral | positive`, `reference`, `axis`, `grid`

All tiers share one namespace in the build, so a full path exists in exactly one tier. Tier 1 groups are scales (`space.4`, `size.px.40`, `radius.2`, `shadow.1`); tier 2 groups are roles (`space.inset.md`, `size.control.md`, `radius.control`, `elevation.raised`). CI fails a path that appears in two tiers.

Output names are derived, never written: CSS `--gds-color-surface-subtle`; Figma `color/surface/subtle` in the collection of its tier; TypeScript `tokens.color.surface.subtle`. The `gds` prefix lives in the build config.

## 5. Primitive ramps

Color ramps have 12 steps, one ramp per hue per mode. Each step has a job, and tier 2 maps onto those jobs:

| Steps   | Job                                        |
| ------- | ------------------------------------------ |
| 1, 2    | App and subtle backgrounds                 |
| 3, 4, 5 | Component backgrounds: rest, hover, active |
| 6, 7, 8 | Borders: subtle, default, strong           |
| 9, 10   | Solid fills: rest, hover                   |
| 11, 12  | Text: low contrast, high contrast          |

Step 11 on step 1 or 2 must meet 4.5:1. Step 12 on steps 1 to 5 must meet 4.5:1. Step 9 must meet 3:1 against steps 1 and 2 as a non-text contrast. A ramp that fails these is not accepted, whichever brand delivered it.

v0.1 placeholders use the Radix Colors scales (MIT) for neutral and the four functional hues. They exist so the kit works today; they carry no brand meaning and every one of them is replaced in December except where the brand has no equivalent (functional status hues may stay).

Data colors are a separate primitive group, not a ramp: eight categorical colors chosen for color-vision safety, five sequential steps, and a diverging triple. The brand may propose replacements; the color-vision check decides.

## 6. Modes

Only color has modes. `color.light` and `color.dark` define the same roles; the build emits one CSS variable set per mode, switched by `[data-theme="dark"]` and `prefers-color-scheme`, and one Figma mode per file. Type, space, radius, elevation and motion are the same in both modes. Density modes (compact tables) are not in v1; if they come, they follow the same pattern as color modes.

## 7. Adding, changing, removing

- **Adding a tier 3 alias**: open a PR with the alias and the component that uses it. No design review needed if it references an existing tier 2 token. Expect a one-line question if the role looks wrong.
- **Adding a tier 2 role or step**: open a PR with the token, its value in both modes, and the reason it cannot be expressed with an existing ladder. OEF design reviews. Adding a step to a ladder means adding it to every ladder of that kind, or explaining why not.
- **Adding a tier 1 value**: only during brand application, or when a ramp is missing a hue the brand defines. Never to fix a component.
- **Renaming**: never. Add the new token, mark the old one `"$deprecated": "Use color.surface.subtle"`, keep it for two minor versions, then remove.
- **Removing**: only after deprecation and a search showing no uses in the front end.

## 8. Enforcement

CI runs on every PR to `tokens/` and to `packages/react`:

1. Schema check: every token has a valid `$type` and `$value`; references resolve; no cycles.
2. Tier check: tier 3 references tier 2 only; tier 2 references tier 1 only; tier 1 has no references.
3. Mode parity: light and dark color files have identical path sets.
4. Contrast: the rules in §5 on every ramp; the tier 2 text-on-surface pairs at 4.5:1.
5. Stylelint on `*.module.css`: any literal color, any `px`/`rem` length outside `0`, `1px` and `100%`, any `font-size` or `font-family` literal, and any `var(--…)` not starting with `--gds-` fails.
6. Naming: paths match the grammar in §4.

## 9. Versioning

The token package follows semver. Adding a token is minor. Changing a value is minor when it is a brand or placeholder change and major when it changes a ladder's meaning. Removing or renaming is major. The brand swap in December is a minor release: values change, paths do not.
