---
title: Platform-Specific Code with cfg
file: apps.rs
lang_label: Rust
badges: [Rust, cfg]
category: rust
date: 2026-05-01
description: One function signature, two implementations — the compiler only builds the one for your target OS.
tags: [cross-platform, linux, windows]
---
```rust
pub struct App { pub name: String, pub exec: String }

#[cfg(target_os = "linux")]
pub fn scan_apps() -> Vec<App> {
    // parse *.desktop files from /usr/share/applications, ~/.local/share/...
    todo!()
}

#[cfg(target_os = "windows")]
pub fn scan_apps() -> Vec<App> {
    // read HKLM\Software\Microsoft\Windows\CurrentVersion\Uninstall via winreg
    todo!()
}
```
