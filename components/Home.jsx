import React from 'react';
import Head from './Head';
import Body from './Body';
import { formatDate, getPostUrl } from '../lib/utils';

class Home extends React.Component {
  render() {
    return (
      <html>
        <Head />
        <Body>
          {this.props.posts.map((post, idx) => {
            return <div key={idx}>
              <div className="post-header">
                <h1 className="post-title">
                  <a href={getPostUrl(post)}>{post.title}</a>
                </h1>
                <p className="post-date">{formatDate(post.date)}</p>
              </div>
              <div
                className="post-body"
                dangerouslySetInnerHTML={{ __html: post.snippet }}
              ></div>
            </div>
          })}
        </Body>
      </html>
    );
  }
}

export default Home;
