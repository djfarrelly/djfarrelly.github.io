import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { marked } from "marked";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createHighlighter } from "shiki";

import Home from "./components/Home.jsx";
import Post from "./components/Post.jsx";
import { parseFrontmatter } from "./lib/frontmatter.js";
import { renderFeed } from "./lib/feed.js";

const POSTS_DIR = "posts";
const THEME = "github-light";

// Shiki bakes the colors in as inline styles at build time, so highlighting
// costs the reader no CSS and no JS. Creating the highlighter is the only async
// part -- codeToHtml itself is sync, which is what marked.parse needs. Add a
// language here before using it in a fence; unlisted ones render unhighlighted.
const highlighter = await createHighlighter({
  themes: [THEME],
  langs: ["typescript", "tsx", "python"],
});
const languages = new Set(highlighter.getLoadedLanguages());

// Renderer methods receive a token, not positional args.
marked.use({
  renderer: {
    // Open external links in a new tab.
    link(token) {
      const text = this.parser.parseInline(token.tokens);
      const title = token.title ? ` title="${token.title}"` : "";
      const target = token.href.startsWith("http") ? ' target="_blank"' : "";
      return `<a href="${token.href}"${title}${target}>${text}</a>`;
    },
    // marked dropped built-in heading ids in v8. Existing posts link to these
    // anchors, so keep generating them with the original slug format.
    heading(token) {
      const text = this.parser.parseInline(token.tokens);
      const id = token.text
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/^-|-$/g, "");
      return `<h${token.depth} id="${id}">${text}</h${token.depth}>\n`;
    },
    // Returning false falls through to marked's plain <pre><code>, which keeps
    // fences with no (or an unloaded) language looking like they always have.
    code(token) {
      const lang = token.lang?.trim().split(/\s+/)[0];
      if (!lang || !languages.has(lang)) return false;
      return highlighter.codeToHtml(token.text, {
        lang,
        theme: THEME,
        // The theme's background is #fff; no token color in it is, so this only
        // repaints the block to match an unhighlighted <pre>.
        colorReplacements: { "#fff": "#f0f5f9" },
      });
    },
  },
});

// Every entry is one posts/<slug>.md file: YAML frontmatter for the metadata,
// markdown for the body. The slug comes from the filename.
async function loadEntries() {
  const files = (await readdir(POSTS_DIR)).filter((file) => file.endsWith(".md"));

  const entries = await Promise.all(
    files.map(async (file) => {
      const source = await readFile(path.join(POSTS_DIR, file), "utf8");
      const { data, content } = parseFrontmatter(source);
      return { ...data, slug: path.basename(file, ".md"), html: marked.parse(content) };
    })
  );

  return entries
    .filter((entry) => !entry.draft)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

async function writePage(filepath, html) {
  await mkdir(path.dirname(filepath), { recursive: true });
  await writeFile(filepath, `<!DOCTYPE html>${html}`);
}

const render = (component, props) =>
  renderToStaticMarkup(createElement(component, props));

const entries = await loadEntries();
// Pages (currently just About) get their own URL but stay out of the homepage
// listing and the feed.
const posts = entries.filter((entry) => !entry.page);

await Promise.all([
  writePage("index.html", render(Home, { posts })),
  ...entries.map((entry) => writePage(`blog/${entry.slug}/index.html`, render(Post, entry))),
  writeFile("rss.xml", renderFeed(posts)),
]);

console.log(`Built ${entries.length} pages and rss.xml`);
