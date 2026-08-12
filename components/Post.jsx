import React from 'react';
import Head from './Head';
import Body from './Body';
import { formatDate, getFullPostUrl, getFullImageUrl } from '../lib/utils';

class Post extends React.Component {
  render() {
    const image = getFullImageUrl(this.props.image);
    const AUTHOR = {
      "@type": "Person",
      name: "Dan Farrelly"
    };
    const MARKUP = {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url: getFullPostUrl(this.props),
      headline: this.props.title,
      datePublished: this.props.date,
      image: image,
      author: AUTHOR,
      publisher: AUTHOR
    };
    const canonical = this.props.canonical || getFullPostUrl(this.props);
    const title = `${this.props.title} - Dan Farrelly`
    return (
      <html>
        <Head>
          <title>{title}</title>
          <link rel="canonical" href={canonical}/>
          <meta property="og:title" content={this.props.title} />
          <meta property="og:url" content={getFullPostUrl(this.props)} />
          <meta property="og:description" content={this.props.description} />
          {!!image && <meta property="og:image" content={image} />}
          <meta property="og:type" content='article' />
          <meta property="og:article:author" content='https://danfarrelly.com/' />
          <meta name="twitter:card" content="summary"></meta>
          <meta name="twitter:creator" content="@djfarrelly" />
        </Head>
        <Body>
          <div>
            <div className="post-header">
              <h1 className="post-title">
                {this.props.title}
              </h1>
              {this.props.date && (
                <p className="post-date">
                  <time>{formatDate(this.props.date)}</time> by Dan Farrelly
                </p>
              )}
            </div>
            {canonical && (
              <div className="post-canonical">
                <em>This article was originally posted on the <a href={canonical}>{this.props.canonical_source}</a> {this.props.x_impressions ? `(${this.props.x_impressions}+ views)` : ''}.</em>
              </div>
            )}
            <div
              className="post-body"
              dangerouslySetInnerHTML={{ __html: this.props.html }}
            ></div>
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(MARKUP) }}
          ></script>
        </Body>
      </html>
    );
  }
}

export default Post;
