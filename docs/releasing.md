# Versioning and releasing

Nobody creates a release by hand. Versions come out of the work through [changesets](../.changeset/README.md).

## The flow

1. **Change on a branch, open a pull request.**
2. **If a published package changed, add a changeset:** `pnpm changeset`. It asks which packages, what kind of bump, and one line for the changelog, and writes a file into `.changeset/` that goes into the pull request.

   | Bump  | Means                          | Example                            |
   | ----- | ------------------------------ | ---------------------------------- |
   | patch | nothing changes for a consumer | a colour value, a bug in a story   |
   | minor | something new, nothing removed | a new component, a new token       |
   | major | a consumer's code could break  | a token or prop renamed or removed |

   Changes to CI, docs, tooling or tests need no changeset.

3. **Merge the pull request.** Nothing is versioned yet.
4. **The release workflow opens a pull request named "Version packages"** and keeps it updated as more changesets land: version bumps for the three packages together (they are linked and always share a number), changelog entries, changeset files removed.
5. **Merging "Version packages" is the release.** The workflow tags the commit (`v0.2.0`), publishes the packages once a registry and token are configured, and the tag can carry a GitHub release with the generated outputs attached for designers: `variables.css`, `figma.variables.json`, `highcharts.ts`.

## Planned versions

| Version | When           | What                                                                               |
| ------- | -------------- | ---------------------------------------------------------------------------------- |
| 0.1.0   | 6 Nov 2026     | Tokens, build, checker, first components, CI                                       |
| 0.2.0   | week of 17 Nov | Brand dry run with an invented palette; components added for the shell flows       |
| 1.0.0   | 18 Dec 2026    | v1, contract deliverable D1: GCoM brand applied, core components in Figma and code |

## Deprecating a token

Rename or removal is a two-step change (TOKENS.md section 7): mark the old path `$deprecated` with the replacement in the same minor, remove it one minor later. The checker warns on deprecated paths still referenced.

## Where consumers get the packages

GitHub Packages, private to the OEF organisation (decided 9 Nov 2026, Milan and Pablo). The release workflow publishes with its own `GITHUB_TOKEN`; no secret to manage. Package names carry the org as scope: `@open-earth-foundation/gds-tokens`, `@open-earth-foundation/gds-react`, `@open-earth-foundation/gds-charts`.

To install in the Digital Service (or any OEF repo):

1. `.npmrc` in the consuming repo:
   ```
   @open-earth-foundation:registry=https://npm.pkg.github.com
   //npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
   ```
2. Locally, `GITHUB_TOKEN` is a personal access token with `read:packages` (classic) or a fine-grained token with package read on the org. In GitHub Actions the workflow's own `GITHUB_TOKEN` works once the workflow has `packages: read`.
3. `pnpm add @open-earth-foundation/gds-tokens @open-earth-foundation/gds-react`.

Each version is also attached to its GitHub release as a zip of the generated outputs, for designers and anyone without a package manager.
