# GDS: the GCoM Digital Service design system

One token source, one set of components in code (and in Figma from the same file), built so that every module of the Digital Service reads as one service and so that the GCoM brand lands as a change of values, not a redesign.

v1 is due 18 December 2026. This repository holds v0.1: the token rules and files, the build that turns them into CSS, TypeScript, Figma variables and a Highcharts theme, the first components on [Base UI](https://base-ui.com) with CSS Modules, and the checks that keep all of it honest.

| Package                                                                       | What                                                                                                                               | Import                                                                                                                                                                  |
| ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`@open-earth-foundation/gds-tokens`](./packages/tokens)                      | DTCG token files, rules, checker, generated outputs                                                                                | `@open-earth-foundation/gds-tokens`, `@open-earth-foundation/gds-tokens/css`, `@open-earth-foundation/gds-tokens/highcharts`, `@open-earth-foundation/gds-tokens/figma` |
| [`@open-earth-foundation/gds-react`](./packages/react)                        | Components: Button, TextField, Checkbox, RadioGroup, Switch, Tabs, Card, Badge, Alert, Dialog, Table, Tooltip, KeyFigure, AppShell | `@open-earth-foundation/gds-react`, `@open-earth-foundation/gds-react/styles.css`                                                                                       |
| [`@open-earth-foundation/gds-charts`](./packages/charts)                      | Highcharts theme and the conventions every chart follows                                                                           | `@open-earth-foundation/gds-charts`                                                                                                                                     |
| [`@open-earth-foundation/stylelint-plugin-gds`](./tools/stylelint-plugin-gds) | The lint rule that rejects raw values in component styles (private)                                                                |                                                                                                                                                                         |

## Use it in an app

Packages are on GitHub Packages, private to the OEF organisation. Once your repo has the `.npmrc` lines from [`docs/releasing.md`](./docs/releasing.md):

```bash
pnpm add @open-earth-foundation/gds-tokens @open-earth-foundation/gds-react
```

```tsx
import '@open-earth-foundation/gds-tokens/css'; // --gds-* variables, light and dark
import '@open-earth-foundation/gds-react/styles.css'; // component styles
import { Button, TextField } from '@open-earth-foundation/gds-react';
```

Dark mode follows `prefers-color-scheme`; set `data-theme="dark"` or `"light"` on `<html>` to force one.

## How it is built

Three tiers of tokens. Primitives hold raw values and are the only thing a brand replaces. Semantic roles name a job and come in ladders (`surface.base / subtle / muted / emphasized`), so "a bit darker" has one answer everywhere. Component aliases point at roles and never at values. The rule in one sentence: **anyone can create an alias, nobody can create a value.** [`packages/tokens/TOKENS.md`](./packages/tokens/TOKENS.md) has the full set.

Components take behavior from Base UI (headless, accessible, state exposed as data attributes) and take every visual value from the tokens through CSS Modules. One root class per component (`gds-button`), parts as `gds-button__icon`, variants and sizes as `data-variant` / `data-size`, state as Base UI sets it (`data-disabled`, `data-checked`, `data-active`, `data-open`). [`docs/component-conventions.md`](./docs/component-conventions.md) spells it out.

Three things fail the build: a raw value outside primitives, a token referencing the wrong tier, and a light/dark mismatch (`tools/check.py`); a raw colour, length or duration in a component stylesheet (`gds/no-raw-values`); a contrast ratio below the rule for its ramp step.

## Work in this repository

```bash
pnpm install
pnpm verify        # check + build + lint + typecheck + test, what CI runs
pnpm storybook     # every component, every state, light and dark
```

Branches `feature/<thing>` or `fix/<thing>`, one reviewer, the pull request template asks for the reason. A change to a published package adds a changeset (`pnpm changeset`). A change to a rule is recorded in the [decision log](https://app.notion.com/p/40ceb557728b8163be19fb3472bd19a0). [CONTRIBUTING.md](./CONTRIBUTING.md) has the rest.

## Where the thinking lives

- [Design principles](https://claude.ai/artifact/YXpw4QWUCALTg9r4HBDaA8): the 17 principles, the brand-application checklist, the timeline.
- [Tokens, visually](https://claude.ai/artifact/GHkWLkqbgxJWoTEDcr1QJp): naming, ladders, component anatomy with live previews.
- [Brand swap simulator](https://claude.ai/artifact/T9J1LKgcwtS4ELpxFjxEBa): what December looks like before December.
- [Decision log](https://app.notion.com/p/40ceb557728b8163be19fb3472bd19a0) (Notion, OEF).
- [Everything in one place](https://claude.ai/artifact/VKoUYR4mszTj4XDE1Z4B7s).

## Status and licence

v0.1, placeholder primitives (Radix Colors, Okabe-Ito, system fonts). The GCoM brand from Parallel is expected early December and replaces `primitives.tokens.json` only.

MIT. Base UI and the Radix Colors scales are MIT; the categorical data palette is Okabe-Ito.
