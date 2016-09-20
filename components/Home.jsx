import React from 'react';
import Head from './Head';
import Body from './Body';
import { formatDate, getPostUrl } from '../lib/utils';

class Home extends React.Component {
  render() {
    return (
      <html>
        <Head />
        <Body hideFooterName={true}>
          <div className="post-list">
            {this.props.posts.map((post, idx) => {
              return <div key={idx}>
                <div className="post-header">
                  <h2 className="post-title">
                    <a href={getPostUrl(post)}>{post.title}</a>
                  </h2>
                  <p className="post-date">{formatDate(post.date)}</p>
                </div>
                <p>{post.description}</p>
                <p>
                  <a href={getPostUrl(post)}><strong>Read more...</strong></a>
                </p>
              </div>
            })}
          </div>
        </Body>
      </html>
    );
  }
}

export default Home;
