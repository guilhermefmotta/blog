---
title: Tauri Command over git2
file: commands.rs
lang_label: Rust + Tauri
badges: [Tauri 2, git2]
category: rust typescript
date: 2026-05-20
description: Expose a libgit2 call to the React frontend as a typed Tauri command, mapping errors to strings for the UI.
tags: [tauri, git]
---
```rust
use git2::Repository;

#[derive(serde::Serialize)]
pub struct BranchInfo { name: String, is_head: bool }

#[tauri::command]
pub fn list_branches(path: String) -> Result<Vec<BranchInfo>, String> {
    let repo = Repository::open(&path).map_err(|e| e.to_string())?;
    let branches = repo
        .branches(Some(git2::BranchType::Local))
        .map_err(|e| e.to_string())?
        .filter_map(Result::ok)
        .filter_map(|(b, _)| Some(BranchInfo {
            is_head: b.is_head(),
            name: b.name().ok()??.to_string(),
        }))
        .collect();
    Ok(branches)
}
```
