---
title: "Git Crab: Building an IntelliJ-Style Merge Resolver with Tauri"
title_highlight: Git Crab
description: Why I wrote my own Git GUI in Rust + React, and the tricks behind a three-pane conflict editor that stays aligned.
category: Desktop
tags: [Tauri, Rust, React, Git]
label: FIELD REPORT #02
companions:
  - { title: git-crab, kind: GitHub, url: "https://github.com/guilhermefmotta/git-crab", description: "Fast native Git GUI — Tauri, git2 and React." }
---

The one feature that kept me inside a heavy IDE was its merge conflict resolver. Every lightweight Git client I tried either skipped it or showed raw `<<<<<<<` markers. So I built [Git Crab](https://github.com/guilhermefmotta/git-crab): a native Git GUI with Tauri 2, `git2` (libgit2) on the Rust side and React on the front.

## The stack

| Layer | Tech |
|---|---|
| Desktop shell | Tauri 2 |
| Git backend | git2 (libgit2 bindings) |
| UI | React 18 + TypeScript, Tailwind, Radix |
| Editor | CodeMirror 6 |
| State | Zustand |

Every Git operation is a Tauri command in Rust that returns plain serializable structs. The React side never shells out to `git`.

## Three panes, one scroll

The resolver shows **Ours** on the left, the editable **Merged** result in the middle and **Theirs** on the right. The hard part isn't rendering three editors — it's keeping them vertically aligned when hunks have different lengths.

The trick is *phantom alignment lines*: when one side of a conflict has fewer lines than the other, I pad it with non-editable blank lines so every hunk starts at the same height in all three panes.

> If your eyes have to hunt for the matching line, the tool has already failed.

On top of that, each conflict gets gutter buttons — Accept Ours, Accept Theirs, Accept Both — plus bulk actions, a resolved/total counter and full undo/redo history.

## Testing a desktop app end-to-end

Git Crab is tested with WebdriverIO and `tauri-driver`, driving the real binary:

```bash
npm run tauri build -- --debug
npx wdio run wdio.conf.ts
```

Building the debug binary first is required — `tauri-driver` launches the actual app, not a dev server.
{: .callout .callout-tip}

## What's next

Better performance on huge repos (the commit graph already uses a virtualized list) and interactive rebase.
