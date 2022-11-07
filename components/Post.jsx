import React from 'react';
import Head from './Head';
import Body from './Body';
import { formatDate, getFullPostUrl } from '../lib/utils';

class Post extends React.Component {
  render() {
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
      image: this.props.image,
      author: AUTHOR,
      publisher: AUTHOR
    };
    const title = `${this.props.title} - Dan Farrelly`
    return (
      <html>
        <Head>
          <title>{title}</title>
          <link rel="canonical" href={getFullPostUrl(this.props)}/>
          <meta property="og:title" content={this.props.title} />
          <meta property="og:url" content={getFullPostUrl(this.props)} />
          <meta property="og:description" content={this.props.description} />
          {!!this.props.image && <meta property="og:image" content={this.props.image} />}
          <meta property="og:type" content='article' />
          <meta property="og:article:author" content='https://www.facebook.com/danfarrelly' />
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
