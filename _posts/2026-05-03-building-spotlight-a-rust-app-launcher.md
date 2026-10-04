---
title: "Building Spotlight: A Cross-Platform App Launcher in Rust"
title_highlight: Spotlight
description: How I built a tiny ALT+D launcher with egui, a global hotkey thread and platform-specific app discovery — and what it taught me about Rust.
category: Rust
tags: [Rust, egui, CrossPlatform]
label: FIELD REPORT #01
companions:
  - { title: spotlight_rs, kind: GitHub, url: "https://github.com/guilhermefmotta/spotlight_rs", description: "Full source code of the launcher." }
  - { title: hotkey.rs, kind: Snippet, url: "/snippets/", description: "The global hotkey listener, ready to copy." }
---

I wanted a launcher that opens with **ALT+D** on any machine I sit at — Linux at home, Windows at work — and gets out of the way. So I wrote one in Rust over a weekend. It's called [Spotlight](https://github.com/guilhermefmotta/spotlight_rs).

## The shape of the app

Spotlight is a single binary with three moving parts:

1. A **background thread** listening for global keyboard events with `rdev`.
2. An **egui window** that starts hidden and toggles when the hotkey fires.
3. An **app index** built once at startup from whatever the OS knows about.

The thread and the UI talk through a `std::sync::mpsc` channel, which turned out to be the cleanest way to cross from "the OS just told me something" to "the UI should redraw".

```rust
let (tx, rx) = std::sync::mpsc::channel();
spawn_hotkey_listener(tx);

// inside the egui update loop
if rx.try_recv().is_ok() {
    self.visible = !self.visible;
}
```
{: data-title="main.rs"}

> A launcher that takes more than a blink to open is just another app you have to launch.

## One function, two operating systems

Discovering installed apps is completely different per platform. On Linux I parse `.desktop` files from the FreeDesktop directories (Flatpak and Snap included). On Windows I read the `Uninstall` keys from the Registry with `winreg`.

Rust's conditional compilation makes this painless — same signature, two bodies, and the compiler only builds the one for your target:

```rust
#[cfg(target_os = "linux")]
fn scan_apps() -> Vec<App> { /* parse *.desktop */ }

#[cfg(target_os = "windows")]
fn scan_apps() -> Vec<App> { /* read the Registry */ }
```

The `winreg` dependency itself is also gated to Windows in `Cargo.toml`, so Linux builds never pull it in.

## What I learned

| Concept | Where it showed up |
|---|---|
| Threads | Global hotkey listener |
| Channels (`mpsc`) | Hotkey → UI messaging |
| `#[cfg(...)]` | Linux vs Windows app discovery |
| `std::process::Command` | Launching the selected app |
| Immediate-mode UI | The whole egui window |

The biggest surprise was how little code it took. The entire app lives in one `main.rs`, and the release pipeline on GitHub Actions builds Linux and Windows binaries on every tag.
{: .callout .callout-success}

Next step: fuzzy ranking that learns which apps I open most.
