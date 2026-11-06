# Changesets

Every pull request that changes a published package adds a changeset: `pnpm changeset`, pick the packages, pick the bump, write one line a consumer would want to read. `changeset version` turns them into CHANGELOG entries and version bumps; `pnpm release` publishes. The three packages are linked, so they always share a version.
