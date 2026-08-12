import Head from "./Head.jsx";
import Body from "./Body.jsx";
import { formatDate, getFullPostUrl, getFullImageUrl } from "../lib/utils.js";

const AUTHOR = { "@type": "Person", name: "Dan Farrelly" };

export default function Post({
  slug,
  title,
  date,
  description,
  image,
  canonical,
  canonicalSource,
  xImpressions,
  html,
}) {
  const url = getFullPostUrl({ slug });
  const imageUrl = getFullImageUrl(image);
  // Posts first published elsewhere point their canonical URL at the original;
  // everything else is canonical to itself.
  const canonicalUrl = canonical || url;

  const structuredData = {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    url,
    headline: title,
    datePublished: date,
    image: imageUrl,
    author: AUTHOR,
    publisher: AUTHOR,
  };

  return (
    <html>
      <Head>
        <title>{`${title} - Dan Farrelly`}</title>
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={description} />
        {!!imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta property="og:type" content="article" />
        <meta property="og:article:author" content="https://danfarrelly.com/" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:creator" content="@djfarrelly" />
      </Head>
      <Body>
        <div>
          <div className="post-header">
            <h1 className="post-title">{title}</h1>
            {date && (
              <p className="post-date">
                <time dateTime={date}>{formatDate(date)}</time> by Dan Farrelly
              </p>
            )}
          </div>
          {canonical && (
            <div className="post-canonical">
              <em>
                This article was originally posted on the{" "}
                <a href={canonical}>{canonicalSource}</a>
                {xImpressions ? ` (${xImpressions}+ views)` : ""}.
              </em>
            </div>
          )}
          <div className="post-body" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Body>
    </html>
  );
}
