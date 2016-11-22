import React from 'react';
import Head from './Head';
import Body from './Body';
import { formatDate, getPostUrl } from '../lib/utils';

class Home extends React.Component {
  render() {
    return (
      <html>
        <Head>
          <meta property="og:title" content="Dan Farrelly" />
          <meta property="og:url" content="http://danfarrelly.nyc" />
          <meta property="og:description" content="Dan Farrelly is the architect at Buffer leading the team's transition to a service-oriented architecture" />
        </Head>
        <Body hideFooterName={true}>
          <div
            className="post-list"
            itemProp="blog"
            itemScope="itemscope"
            itemType="http://schema.org/Blog"
          >
            {this.props.posts.map((post, idx) => {
              return <div
                key={idx}
                itemProp="blogPost"
                itemScope="itemscope"
                itemType="http://schema.org/BlogPosting"
              >
                <div className="post-header">
                  <h2 className="post-title" itemProp="name headline">
                    <a href={getPostUrl(post)}>{post.title}</a>
                  </h2>
                  <p className="post-date">
                    <time dateTime={this.props.date} itemProp="datePublished">
                      {formatDate(this.props.date)}
                    </time>
                    <span style={{display:"none"}} itemProp="author publisher" itemScope="" itemType="http://schema.org/Person">
                      <span itemProp="name">Dan Farrelly</span>
                    </span>
                  </p>
                </div>
                <p itemProp="description">{post.description}</p>
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
