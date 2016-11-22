import React from 'react';
import Head from './Head';
import Body from './Body';
import { formatDate, getPostUrl } from '../lib/utils';

class Post extends React.Component {
  render() {
    return (
      <html>
        <Head>
          <meta property="og:title" content={this.props.title} />
          <meta property="og:url" content={getPostUrl(this.props)} />
          <meta property="og:description" content={this.props.description} />
          <meta property="og:type" content='article' />
          <meta property="og:article:author" content='https://www.facebook.com/danfarrelly' />
        </Head>
        <Body>
          <div
            itemProp="blogPost"
            itemScope="itemscope"
            itemType="http://schema.org/BlogPosting"
          >
            <div className="post-header">
              <h1 className="post-title" itemProp="name headline">
                {this.props.title}
              </h1>
              <p className="post-date">
                <time dateTime={this.props.date} itemProp="datePublished">
                  {formatDate(this.props.date)}
                </time>
                {" by "}
                <span itemProp="author" itemScope="" itemType="http://schema.org/Person">
                  <span itemProp="name">Dan Farrelly</span>
                </span>
              </p>
            </div>
            <div
              className="post-body"
              itemProp="articleBody"
              dangerouslySetInnerHTML={{ __html: this.props.html }}
            ></div>
          </div>
        </Body>
      </html>
    );
  }
}

export default Post;
