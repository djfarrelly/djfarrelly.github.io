import React from 'react';
import Layout from './Layout';
import { formatDate } from '../lib/utils';


class Home extends React.Component {
  render() {
    return (
      <Layout>
        {this.props.posts.map((post, idx) => {
          return <div key={idx}>
            <div className="post-header">
              <h1 className="post-title">
                <a href={`/blog/${post.slug}/`}>{post.title}</a>
              </h1>
              <p className="post-date">{formatDate(post.date)}</p>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.snippet }}></div>
          </div>
        })}
      </Layout>
    );
  }
}

export default Home;
