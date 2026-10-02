// Matches the previous site's renderer: absolute http(s) links open in a new
// tab, internal links stay in place.
const externalBlank = () => ({
  name: "external-link-blank",
  element: {
    filter: ["a"],
    visit(node, ctx) {
      const href = node.properties?.href;
      if (typeof href === "string" && href.startsWith("http")) {
        ctx.setProperty(node, "target", "_blank");
      }
    },
  },
});

export default externalBlank;