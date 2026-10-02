# danfarrelly.com

Static site built with [Astro](https://astro.build): markdown posts rendered at
build time to plain HTML. Tailwind CSS v4 for styling, no client-side JS
beyond Google Analytics.

## Setup

```
pnpm i
pnpm dev
```

## Scripts

| Command        | Description                                              |
| -------------- | -------------------------------------------------------- |
| `pnpm dev`     | Dev server with live reload at http://localhost:4321     |
| `pnpm build`   | Build the site to `dist/` (pages, `rss.xml`, sitemap)   |
| `pnpm preview` | Serve the built site at http://localhost:4321            |

## Layout

```
src/
  content/blog/     Blog posts — YAML frontmatter + markdown, one file per page
  data/             Structured data (speaking-press.yaml)
  layouts/          BaseLayout (shell, head/SEO/GA), PageLayout (markdown pages)
  pages/            index, about, speaking-and-press, blog/[slug], rss.xml
  styles/           global.css — Tailwind v4 theme + prose + view transitions
  lib/              Date/URL helpers, custom hast plugins (heading ids, links)
  assets/           Favicons (hashed by Vite)
public/            Served as-is: images/, robots.txt, _redirects
```

## Writing a post

Add `src/content/blog/<slug>.md`. The filename is the slug, and the page is
published at `/blog/<slug>/`. Posts are ordered by `date`, newest first.

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
- `draft: true` — excluded from the build, feed, homepage, and sitemap.

## Speaking & press

Add an entry to `src/data/speaking-press.yaml` (one list item per entry):

```yaml
- id: my-talk
  type: talk # talk | podcast | interview | press | feature
  title: "Talk title"
  source: "Event or outlet"
  date: "2026-07" # optional: YYYY, YYYY-MM, or YYYY-MM-DD
  links:
    - label: "Video"
      url: "https://youtube.com/..."
```

## Hosting

Deployed on Cloudflare Pages (framework preset: Astro, build `pnpm build`,
output `dist`). Custom domain and redirects are configured in the Cloudflare
dashboard; `public/_redirects` handles legacy URL redirects.
