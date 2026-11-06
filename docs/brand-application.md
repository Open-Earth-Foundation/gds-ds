# Brand application

The GCoM brand guidelines from Parallel are expected between 30 November and 5 December 2026. What happens then, and what does not.

## What changes

`packages/tokens/tokens/primitives.tokens.json`, and only that file:

- colour ramps: neutral and the functional hues, twelve steps each, light and dark, meeting the contrast rule for each step (`TOKENS.md` section 5)
- the data palette, if the brand proposes one that passes the colour-vision check; otherwise Okabe-Ito stays
- font families, and weights if the brand font lacks one we use
- radii, if the brand has a stated corner language
- shadows and motion only if the brand states them

## What does not change

Semantic roles, component aliases, component code, stories, tests. If applying the brand needs a change outside primitives, that is a finding to record, not a change to make silently.

## How it is checked

1. The new primitives pass `pnpm check` (contrast per ramp step, parity, namespace).
2. The [brand swap simulator](https://claude.ai/artifact/T9J1LKgcwtS4ELpxFjxEBa) with the same values shows the same picture as Storybook with the new file.
3. Storybook, light and dark, every component, against the [checklist on the principles page](https://claude.ai/artifact/YXpw4QWUCALTg9r4HBDaA8).
4. The diff of the pull request touches one file.

## Who

Indhold's designer applies the brand and runs the checklist; OEF reviews and accepts (work plan, SOW #1 section 4). A dry run with an invented palette is planned for the week of 17 November so the process is exercised before the real values arrive.
