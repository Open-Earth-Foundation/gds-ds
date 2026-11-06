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

To confirm with Pablo (decision log, "Packaging"). Options:

- **GitHub Packages**, private to the OEF org, no extra secret (the workflow's own `GITHUB_TOKEN` publishes). Requires the scope to match the org: `@open-earth-foundation/gds-tokens`.
- **npm**, public under `@oef` (needs the scope claimed on npmjs.com and an automation token in the `NPM_TOKEN` secret) or private (paid npm org plan).

Until one is configured, the packages exist only as this repository: the Digital Service can depend on them through the workspace (same monorepo) or a git dependency, and the generated outputs are attached to each GitHub release.
