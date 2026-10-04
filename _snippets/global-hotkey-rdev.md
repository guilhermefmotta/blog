---
title: Global Hotkey Listener
file: hotkey.rs
lang_label: Rust
badges: [Rust, rdev]
category: rust
date: 2026-05-02
description: Listen for ALT+D system-wide on a background thread and signal the UI through an mpsc channel. Straight from Spotlight.
tags: [daemon, concurrency]
featured: true
---
```rust
use rdev::{listen, EventType, Key};
use std::sync::mpsc::{channel, Sender};

fn spawn_hotkey_listener(tx: Sender<()>) {
    std::thread::spawn(move || {
        let mut alt_down = false;
        listen(move |event| match event.event_type {
            EventType::KeyPress(Key::Alt) => alt_down = true,
            EventType::KeyRelease(Key::Alt) => alt_down = false,
            EventType::KeyPress(Key::KeyD) if alt_down => {
                let _ = tx.send(()); // toggle the launcher window
            }
            _ => {}
        })
        .expect("failed to listen for global keyboard events");
    });
}

fn main() {
    let (tx, rx) = channel();
    spawn_hotkey_listener(tx);
    for _ in rx {
        println!("ALT+D pressed — show/hide window");
    }
}
```
