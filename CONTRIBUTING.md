# Contributing

## Setup

Node 22 (`.nvmrc`), pnpm 10 (`corepack enable` gives you the pinned version), Python 3 for the token checker.

```bash
pnpm install
pnpm verify
pnpm storybook
```

## Branches and pull requests

- `main` is always releasable. Work on `feature/<thing>` or `fix/<thing>`.
- One reviewer is enough; token changes route to design through CODEOWNERS.
- Fill the pull request template. The "why" is not optional: a token or component change without a reason is not reviewed.
- CI runs `pnpm verify`, formatting, and a Storybook build. Green is required to merge.

## Changing tokens

Read [`packages/tokens/TOKENS.md`](./packages/tokens/TOKENS.md). Short version:

1. Find the tier. Brand value: primitives. New job or emphasis: semantic, with a reason. Component need: an alias into semantic.
2. Edit the source file, never `dist/`. Light and dark together.
3. `pnpm check` (rules), `pnpm build`, `pnpm test`.
4. A rename or removal is a deprecation first (`$deprecated` with the replacement), a removal one minor version later.

## Adding a component

One folder under `packages/react/src/components/<Name>/` with:

| File                 | Holds                                                                                 |
| -------------------- | ------------------------------------------------------------------------------------- |
| `<Name>.tsx`         | The React component on Base UI; `className` from the module; props as data attributes |
| `<Name>.module.css`  | Styles; every value a `var(--gds-…)`; the lint rule enforces it                       |
| `<Name>.test.tsx`    | Behavior and accessibility: roles, names, state attributes, keyboard                  |
| `<Name>.stories.tsx` | Every variant and state                                                               |
| `README.md`          | Purpose, anatomy, props, tokens read, do and don't, accessibility                     |

Then export it from `src/index.ts`. [`docs/component-conventions.md`](./docs/component-conventions.md) has the naming rules; a component is done when it meets the checklist at the end of that page.

## Commits and releases

Plain messages, present tense, what and why: `Add Switch; raise checkbox box to size.icon.md`. Published packages are versioned together through changesets: `pnpm changeset` in your branch, the release workflow does the rest. The whole flow: [`docs/releasing.md`](./docs/releasing.md).

## Where decisions go

Rules and structure: the [decision log](https://app.notion.com/p/40ceb557728b8163be19fb3472bd19a0). Delivery work: Linear. GitHub issues: component proposals, token changes, bugs (templates provided).
