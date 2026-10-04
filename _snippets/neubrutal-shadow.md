---
title: Neubrutalist Shadow Utility
file: neubrutal.css
lang_label: CSS
badges: [CSS, Design System]
category: css
date: 2026-10-04
description: Zero-blur hard-offset shadow with a physical push on click — the button style used all over this blog.
tags: [css, animation]
---
```css
.neo-btn {
  border: 3px solid #18181b;
  box-shadow: 4px 4px 0 #18181b;
  transition: all 0.1s ease-in-out;
}
.neo-btn:hover {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #18181b;
}
.neo-btn:active {
  transform: translate(4px, 4px);
  box-shadow: 0 0 0 #18181b;
}
```
