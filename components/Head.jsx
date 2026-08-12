import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

// Content hash, so the cache buster only changes when the stylesheet does.
const CSS_VERSION = createHash("sha256")
  .update(readFileSync(new URL("../css/style.css", import.meta.url)))
  .digest("hex")
  .slice(0, 8);

export default function Head({ children }) {
  return (
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta id="theme-color" name="theme-color" content="#246B9C" />

      <link rel="stylesheet" href={`/css/style.css?v=${CSS_VERSION}`} />
      <link rel="icon" type="image/png" href="/images/favicon.png" />
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
