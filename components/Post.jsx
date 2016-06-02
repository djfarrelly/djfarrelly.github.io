import React from 'react';
import Layout from './Layout';
import { formatDate } from '../lib/utils';


class Post extends React.Component {
  render() {
    return (
      <Layout showLinks={false}>
        <div className="post-header">
          <h1 className="post-title">
            {this.props.title}
          </h1>
          <p className="post-date">{formatDate(this.props.date)}</p>
        </div>
        <div className="post-body" dangerouslySetInnerHTML={{ __html: this.props.html }}></div>
      </Layout>
    );
  }
}

export default Post;
