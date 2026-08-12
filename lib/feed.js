import { DOMAIN, getFullPostUrl, parseDate } from "./utils.js";

const TITLE = "Dan Farrelly's blog";
const AUTHOR = "Dan Farrelly";
const FEED_URL = `${DOMAIN}/rss.xml`;

const ESCAPES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&apos;",
};
const escape = (value) => String(value ?? "").replace(/[&<>"']/g, (c) => ESCAPES[c]);

const rfc822 = (date) => parseDate(date).toUTCString();

const renderItem = (post) => {
  const url = getFullPostUrl(post);
  return `        <item>
            <title>${escape(post.title)}</title>
            <description>${escape(post.description)}</description>
            <link>${escape(url)}</link>
            <guid isPermaLink="true">${escape(url)}</guid>
${(post.tags ?? []).map((tag) => `            <category>${escape(tag)}</category>`).join("\n")}
            <dc:creator>${escape(AUTHOR)}</dc:creator>
            <pubDate>${rfc822(post.date)}</pubDate>
        </item>`;
};

// `posts` is expected to be sorted newest first; lastBuildDate tracks the newest
// post rather than the wall clock so that rebuilds are deterministic.
export function renderFeed(posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
    <channel>
        <title>${escape(TITLE)}</title>
        <description>${escape(TITLE)}</description>
        <link>${DOMAIN}</link>
        <language>en-us</language>
        <lastBuildDate>${rfc822(posts[0].date)}</lastBuildDate>
        <atom:link href="${FEED_URL}" rel="self" type="application/rss+xml"/>
${posts.map(renderItem).join("\n")}
    </channel>
</rss>
`;
}
