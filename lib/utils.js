export const DOMAIN = "https://danfarrelly.com";

// Dates in frontmatter are plain YYYY-MM-DD, so parse and format them in UTC —
// otherwise the build machine's timezone shifts the displayed day.
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export const parseDate = (date) => new Date(`${date}T00:00:00Z`);
export const formatDate = (date) => dateFormatter.format(parseDate(date));

export const getPostUrl = (post) => `/blog/${post.slug}/`;
export const getFullPostUrl = (post) => `${DOMAIN}${getPostUrl(post)}`;
export const getFullImageUrl = (image) =>
  image && image.startsWith("/") ? `${DOMAIN}${image}` : image;
