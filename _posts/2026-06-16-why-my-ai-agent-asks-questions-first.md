---
title: "Why My AI Agent Asks Questions Before Writing Code"
title_highlight: Asks Questions
description: The four-phase pipeline behind ContextOS — Planning, Grilling, Spec, Execution — and why a diff review beats blind trust.
category: AI
tags: [AI, Agents, ContextOS, Tauri]
label: FIELD REPORT #03
companions:
  - { title: ContextOS, kind: GitHub, url: "https://github.com/guilhermefmotta/contextos", description: "AI-native engineering workspace (GPL-3.0)." }
---

Most AI coding tools jump straight from your prompt to a wall of code. When the prompt was ambiguous — and it usually is — you get a confident answer to the wrong question. [ContextOS](https://github.com/guilhermefmotta/contextos) is my attempt to fix that.

## Four phases, not one

Every request in ContextOS goes through four controlled phases, each with its own agent:

1. **Planning** — proposes an approach, the affected files and key decisions.
2. **Grilling** — asks *one blocking question at a time* until nothing is ambiguous.
3. **Spec** — produces a complete, unambiguous implementation spec.
4. **Execution** — writes the actual changes as structured `FILE_EDIT` / `FILE_CREATE` blocks.

If grilling drags on, you can jump straight to Spec. But in practice the questions are where the value is.

> The cheapest bug to fix is the one the agent asked you about before writing it.

## Never write blind

Nothing touches the disk until you've seen it. Changes appear as side-by-side diffs, and you can accept everything, reject everything, or apply file by file.

The execution agent also reads the *actual* current file contents before generating a `FIND` block, so the text it searches for is verbatim from disk — no hallucinated function signatures. When a match still fails, the path resolver falls back through a few normalizations:

- model-prepended project name prefixes
- Windows backslashes → forward slashes
- CRLF → LF
- indentation drift and internal whitespace differences

And if all of that fails, an error shows up in the Changed Files panel instead of silently doing nothing.
{: .callout .callout-alert}

## Bring your own model

ContextOS works with Anthropic, OpenAI, GitHub Copilot, Groq, Ollama for local models, or any OpenAI-compatible endpoint. The backend is Rust (tokio, rusqlite, git2, rustls — no system OpenSSL needed) and the UI is React 19 with CodeMirror 6 and a real PTY terminal via xterm.js.

```bash
git clone https://github.com/guilhermefmotta/contextos
cd contextos
npm install
npm run tauri dev
```

## Being the next developer

The lesson for me: the skill isn't prompting harder, it's designing the *conversation* — where the agent must stop and ask, and where a human must review. That's what I want to keep writing about here.
