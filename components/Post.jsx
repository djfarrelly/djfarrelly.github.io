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
          <meta property="og:article:auther" content='https://www.facebook.com/danfarrelly' />
        </Head>
        <Body>
          <div className="post-header">
            <h1 className="post-title">
              {this.props.title}
            </h1>
            <p className="post-date">{formatDate(this.props.date)}</p>
          </div>
          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: this.props.html }}
          ></div>
        </Body>
      </html>
    );
  }
}

export default Post;
