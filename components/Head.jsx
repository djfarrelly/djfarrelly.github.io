import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// Content hash, so the cache buster only changes when the asset does. Favicons
// are cached even harder than stylesheets, and browsers already hold the old
// blue mark, so they need the same treatment to ever pick up a redesign.
const version = (file) =>
  createHash("sha256")
    .update(readFileSync(new URL(file, import.meta.url)))
    .digest("hex")
    .slice(0, 8);

const CSS_VERSION = version("../css/style.css");
const ICON_SVG_VERSION = version("../images/favicon.svg");
const ICON_PNG_VERSION = version("../images/favicon.png");

export default function Head({ children }) {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta id="theme-color" name="theme-color" content="#546B41" />

      <link rel="stylesheet" href={`/css/style.css?v=${CSS_VERSION}`} />

      {/* SVG first: browsers that support it use it and ignore the PNG, which
          is left as the fallback for the ones that don't. */}
      <link
        rel="icon"
        type="image/svg+xml"
        href={`/images/favicon.svg?v=${ICON_SVG_VERSION}`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`/images/favicon.png?v=${ICON_PNG_VERSION}`}
      />
      {/* iOS masks this into its own squircle, so the source is a full-bleed
          square -- baking in rounded corners here would double-round it. */}
      <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
      <link
        rel="alternate"
        type="application/rss+xml"
        title="Dan Farrelly's blog"
        href="/rss.xml"
      />
      {children}
    </head>
  );
}
