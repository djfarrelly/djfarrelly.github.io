import { parse } from "yaml";

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function parseFrontmatter(source) {
  const match = source.match(FRONTMATTER);
  if (!match) return { data: {}, content: source };
  return { data: parse(match[1]) ?? {}, content: source.slice(match[0].length) };
}
