import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { DOMAIN } from "../lib/format.js";

const FEED_TITLE = "Dan Farrelly's blog";
const AUTHOR = "Dan Farrelly";

export async function GET(context) {
  // Newest first. lastBuildDate tracks the newest post rather than the wall
  // clock so that rebuilds are deterministic.
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => (b.data.date ?? "").localeCompare(a.data.date ?? ""),
  );

  const lastBuildDate = posts[0]?.data.date
    ? new Date(`${posts[0].data.date}T00:00:00Z`).toUTCString()
    : new Date().toUTCString();

  return rss({
    title: FEED_TITLE,
    description: FEED_TITLE,
    site: context.site,
    xmlns: {
      dc: "http://purl.org/dc/elements/1.1/",
      atom: "http://www.w3.org/2005/Atom",
    },
    customData: [
      `<language>en-us</language>`,
      `<lastBuildDate>${lastBuildDate}</lastBuildDate>`,
      `<atom:link href="${DOMAIN}/rss.xml" rel="self" type="application/rss+xml"/>`,
    ].join(""),
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: new Date(`${post.data.date}T00:00:00Z`),
      link: `/blog/${post.id}/`,
      categories: post.data.tags.length ? post.data.tags : undefined,
      customData: `<dc:creator>${AUTHOR}</dc:creator>`,
    })),
  });
}