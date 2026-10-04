# Guilherme.dev

Personal blog built with Jekyll, using the Neo-Comic Brutalism layout from `layout/`.

## Run locally

```bash
bundle install
bundle exec jekyll serve --livereload
# http://localhost:4000
```

## Where things live

| What | File |
|---|---|
| Site info, author, social links, newsletter | `_config.yml` |
| Articles | `_posts/YYYY-MM-DD-slug.md` |
| Projects | `_data/projects.yml` |
| Snippets | `_snippets/*.md` |
| Home stats | `_data/stats.yml` |
| About: tech stack / career timeline | `_data/arsenal.yml`, `_data/experience.yml` |
| Navigation | `_data/navigation.yml` |
| Shared styles / behavior | `assets/css/main.css`, `assets/js/site.js` |

## Writing a post

```yaml
---
title: "My Post Title"
title_highlight: Post        # optional: word(s) of the title shown as a yellow sticker
description: One-line summary shown on cards and under the title.
category: AI                 # chip color comes from category_colors in _config.yml
tags: [AI, Rust]
label: FIELD REPORT #04      # optional corner badge
companions:                  # optional sidebar links
  - { title: repo, kind: GitHub, url: "https://github.com/...", description: "..." }
---
```

Markdown extras:

- `## Headings` are auto-numbered and fill the sidebar table of contents.
- `> quote` renders as a yellow "Sticker of Truth".
- Add `{: .callout .callout-tip}` (or `-alert`, `-success`) on the line after a paragraph for a callout box.
- Add `{: data-title="file.rs"}` after a fenced code block to set the terminal window title.

## Styling note

Tailwind is loaded from the Play CDN so the classes match the original `layout/` HTML exactly, with no build step.
For production you may want to compile Tailwind with the CLI instead.
