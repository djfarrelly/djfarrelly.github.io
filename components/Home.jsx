import Head from "./Head.jsx";
import Body from "./Body.jsx";
import { formatDate, getPostUrl } from "../lib/utils.js";

const DESCRIPTION =
  "Founder at Inngest.com, former CTO at Buffer.com. Built Timezone.io & Maildev as side projects.";

const PostSummary = ({ post }) => {
  const url = getPostUrl(post);
  return (
    <div
      className="post"
      itemProp="blogPost"
      itemScope="itemscope"
      itemType="http://schema.org/BlogPosting"
    >
      <div className="post-header">
        <h2 className="post-title" itemProp="name headline">
          <a href={url}>{post.title}</a>
        </h2>
        <p className="post-date">
          <time dateTime={post.date} itemProp="datePublished">
            {formatDate(post.date)}
          </time>
          <span
            style={{ display: "none" }}
            itemProp="author publisher"
            itemScope=""
            itemType="http://schema.org/Person"
          >
            <span itemProp="name">Dan Farrelly</span>
          </span>
        </p>
      </div>
      <p itemProp="description">{post.description}</p>
    </div>
  );
};

export default function Home({ posts }) {
  return (
    <html>
      <Head>
        <title>Dan Farrelly</title>
        <meta name="description" content={DESCRIPTION} />
        <meta property="og:title" content="Dan Farrelly" />
        <meta property="og:url" content="https://danfarrelly.com" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta
          name="google-site-verification"
          content="MKYWJyvqSUEJDS-W42zXoEUZOggAoyKsobl6XU6-uCw"
        />
      </Head>
      <Body hideFooterName={true}>
        <div
          className="post-list"
          itemProp="blog"
          itemScope="itemscope"
          itemType="http://schema.org/Blog"
        >
          {posts.map((post) => (
            <PostSummary key={post.slug} post={post} />
          ))}
        </div>
      </Body>
    </html>
  );
}
