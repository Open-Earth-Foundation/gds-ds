# @open-earth-foundation/gds-react

React components for the GCoM Digital Service. Behavior from [Base UI](https://base-ui.com), every visual value from `@open-earth-foundation/gds-tokens` through CSS Modules.

```tsx
import '@open-earth-foundation/gds-tokens/css';
import '@open-earth-foundation/gds-react/styles.css';
import { AppShell, Button, TextField, Table } from '@open-earth-foundation/gds-react';
```

## Components

| Component                    | Base UI           | Notes                                                                                                                                                    |
| ---------------------------- | ----------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`                     | Button            | primary, secondary, ghost, destructive; sm, md, lg; icons; icon-only                                                                                     |
| `TextField`                  | Field + Input     | label, description or error, suffix; state on the field                                                                                                  |
| `Checkbox`                   | Checkbox          | label is the hit area; indeterminate                                                                                                                     |
| `RadioGroup`, `Radio`        | RadioGroup, Radio |                                                                                                                                                          |
| `Switch`                     | Switch            | immediate settings                                                                                                                                       |
| `Tabs`                       | Tabs              | `Tabs.Root/List/Tab/Panel`; sliding indicator; counts                                                                                                    |
| `Card`                       |                   | eyebrow, title, actions, footer, elevated                                                                                                                |
| `Badge`                      |                   | good, warning, critical, info, neutral, ai; subtle or solid                                                                                              |
| `Alert`                      |                   | info, good, warning, critical; action slot                                                                                                               |
| `Dialog`                     | Dialog            | `Dialog.Root/Trigger/Popup/Close`; focus trap, scroll lock                                                                                               |
| `Table`                      |                   | `Table.Root/Head/Body/Row/HeaderCell/Cell/Empty`; striped, numeric, selected                                                                             |
| `Tooltip`, `TooltipProvider` | Tooltip           |                                                                                                                                                          |
| `KeyFigure`                  |                   | value, unit, delta with tone, provenance                                                                                                                 |
| `AppShell`                   |                   | `Root/TopBar/SideNav/NavGroup/NavItem/Main/Breadcrumb/PageHeader/Empty`: the service frame, including the blank canvas and (as a story) the login screen |

Each component folder has a README with anatomy, props, tokens read, do and don't. Conventions for all of them: [`docs/component-conventions.md`](../../docs/component-conventions.md).

## Scripts

`pnpm build` (Vite library build, `dist/index.js` + `dist/gds-react.css` + types), `pnpm test` (Vitest, jsdom, Testing Library), `pnpm lint` (stylelint `gds/no-raw-values` + ESLint), `pnpm typecheck`, `pnpm storybook`.

## Class names

CSS Modules are compiled to the convention names rather than hashes, so the DOM reads as documented: `.root` → `gds-button`, `.icon` → `gds-button__icon`. They are still module-scoped in source; do not target them from app code, use the component props.
