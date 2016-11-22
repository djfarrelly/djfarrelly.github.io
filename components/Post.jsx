import React from 'react';
import Head from './Head';
import Body from './Body';
import { formatDate, getPostUrl } from '../lib/utils';

class Post extends React.Component {
  render() {
    const AUTHOR = {
      "@type": "Person",
      name: "Dan Farrelly"
    };
    const MARKUP = {
      "@context": "http://schema.org",
      "@type": "BlogPosting",
      url: getPostUrl(this.props),
      headline: this.props.title,
      datePublished: this.props.date,
      image: this.props.image,
      author: AUTHOR,
      publisher: AUTHOR
    };
    return (
      <html>
        <Head>
          <meta property="og:title" content={this.props.title} />
          <meta property="og:url" content={getPostUrl(this.props)} />
          <meta property="og:description" content={this.props.description} />
          {!!this.props.image && <meta property="og:image" content={this.props.image} />}
          <meta property="og:type" content='article' />
          <meta property="og:article:author" content='https://www.facebook.com/danfarrelly' />
        </Head>
        <Body>
          <div>
            <div className="post-header">
              <h1 className="post-title">
                {this.props.title}
              </h1>
              <p className="post-date">
                <time>{formatDate(this.props.date)}</time> by Dan Farrelly
              </p>
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
