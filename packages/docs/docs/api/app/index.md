---
id: "index"
title: "app"
sidebar_label: "README"
---

[app](index.md) › [Globals](globals.md)

# Pixatore App

## Updating

From the `/packages/app` directory update tauri.js:

```bash
yarn upgrade vue-cli-plugin-tauri --latest
```

Then update tauri-bundler

```bash
cargo install tauri-bundler
```

Then `cd src-tauri` and update `Cargo.toml` to have the latest version for the `tauri` dependency.

```bash
caro update -p tauri
```

Back in `packages/app` can check everything is up to date by running

```bash
yarn tauri info
```

See https://tauri.studio/docs/usage/development/updating for more.
