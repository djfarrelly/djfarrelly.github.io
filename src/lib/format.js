export const DOMAIN = "https://danfarrelly.com";

// Dates are plain YYYY, YYYY-MM, or YYYY-MM-DD — parse and format them in UTC,
// otherwise the build machine's timezone shifts the displayed day.
export function formatDate(date) {
  if (!date) return null;
  if (date.length === 4) return date;
  const d = new Date(`${date}${date.length === 7 ? "-01" : ""}T00:00:00Z`);
  if (date.length === 7) {
    return new Intl.DateTimeFormat("en-US", {
      month: "long",
      year: "numeric",
      timeZone: "UTC",
    }).format(d);
  }
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export const parseDate = (date) => new Date(`${date}T00:00:00Z`);

export const getPostUrl = (slug) => `/blog/${slug}/`;

export const getFullPostUrl = (slug) => `${DOMAIN}${getPostUrl(slug)}`;

export const getFullImageUrl = (image) =>
  image && image.startsWith("/") ? `${DOMAIN}${image}` : image;