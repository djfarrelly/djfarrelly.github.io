# danfarrelly.com

A small static site generator: markdown posts rendered through React components
to plain HTML. No client-side JS, no bundler.

## Setup

Node is pinned via [Volta](https://volta.sh) (the `volta` field in
`package.json`), so it switches automatically in this directory. pnpm is pinned
via corepack, so enable it once:

```
corepack enable
```

Then:

```
pnpm i
pnpm build
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm build` | Render `index.html`, `blog/<slug>/index.html`, and `rss.xml` |
| `pnpm watch` | Rebuild on changes to posts, components, lib, or CSS |
| `pnpm serve` | Serve the built site at http://localhost:8080 |

## Layout

```
build.js          Generator entrypoint
posts/*.md        Content — YAML frontmatter + markdown, one file per page
components/*.jsx  Templates, rendered with renderToStaticMarkup
lib/              Frontmatter parsing, RSS generation, URL/date helpers
css/style.css     The only stylesheet, served as-is
images/           Served as-is; per-post assets live in images/posts/<slug>/
```

## Writing a post

Add `posts/<slug>.md`. The filename is the slug, and the page is published at
`/blog/<slug>/`. Posts are ordered by `date`, newest first.

```markdown
---
title: "Post title"
date: "2026-08-12"
description: "Shown on the homepage, in the feed, and as og:description."
image: "/images/posts/<slug>/featured-image.png"
tags:
  - "tag one"
  - "tag two"
---

Body content...
```

Optional frontmatter:

- `canonical` / `canonicalSource` — for posts first published elsewhere. Sets
  `<link rel="canonical">` and shows an attribution note above the body.
- `xImpressions` — view count appended to that attribution note.
- `page: true` — give it a URL but keep it off the homepage and out of the feed
  (this is how `about.md` works).
- `draft: true` — skip it entirely.
