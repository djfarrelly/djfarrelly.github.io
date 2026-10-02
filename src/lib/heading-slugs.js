// Heading IDs generated with the same format as the previous site's renderer:
// lowercase, non-word characters collapsed to dashes, dashes trimmed from the
// edges. github-slugger (satteri's built-in) slugs differently — e.g. "What's"
// becomes "whats" there but "what-s" here — and existing deep links may point
// at the old format, so keep generating it exactly. Runs before the built-in
// heading-ids plugin, which respects pre-existing ids.
const headingSlugs = () => ({
  name: "heading-slug-parity",
  element: {
    filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
    visit(node, ctx) {
      const text = ctx.textContent(node) ?? "";
      const id = text
        .toLowerCase()
        .replace(/[^\w]+/g, "-")
        .replace(/^-|-$/g, "");
      if (id) ctx.setProperty(node, "id", id);
    },
  },
});

export default headingSlugs;