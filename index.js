import fs from "fs";
import path from "path";
import async from "async";
import mkdirp from "mkdirp";
import marked from "marked";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import RSS from "rss";

import Home from "./components/Home";
import Post from "./components/Post";
import { getPostUrl } from "./lib/utils";

import postConfig from "./posts.json";

const renderer = new marked.Renderer();

const domain = "https://danfarrelly.com";

renderer.link = (href, title, text) => {
  let attr = title ? `title=${title}` : "";
  if (href.search(/^http/) > -1) {
    attr = `${attr} target="_blank"`;
  }
  return `<a href="${href}" ${attr}>${text}</a>`;
};

const postList = postConfig.filter((p) => !p.draft);

const postFiles = postList.map((p) => `./posts/${p.slug}.md`);

const readFile = (file, callback) => fs.readFile(file, "utf8", callback);
const prependDoctype = (html) => `<!DOCTYPE html>${html}`;
const writeFile = (info, callback) => {
  const filepath = info.slug ? `blog/${info.slug}/index.html` : `index.html`;
  const dir = path.dirname(filepath);
  if (dir === ".") {
    fs.writeFile(filepath, prependDoctype(info.html), callback);
  } else {
    mkdirp(dir, (err) =>
      fs.writeFile(filepath, prependDoctype(info.html), callback)
    );
  }
};

const extractSnippet = (html) => {
  const idx = html.search(/<\/p>/);
  return html.substr(0, idx + 4);
};

async.map(postFiles, readFile, (err, postMarkdown) => {
  const posts = postList.map((post, idx) => {
    const html = marked(postMarkdown[idx], { renderer });
    post.snippet = extractSnippet(html);
    const props = Object.assign({ html: html }, post);
    post.html = renderToStaticMarkup(React.createElement(Post, props));
    return post;
  });

  const visiblePosts = posts.filter((p) => !p.draft && p.slug !== "about");

  const homepageHtml = renderToStaticMarkup(
    React.createElement(Home, { posts: visiblePosts })
  );

  let files = [{ html: homepageHtml }];

  files = files.concat(posts);

  const feed = new RSS({
    title: "Dan Farrelly's blog",
    feed_url: `${domain}/rss.xml`,
    site_url: domain,
  });

  posts
    .map((post) => {
      return {
        url: `${domain}${getPostUrl(post)}`,
        title: post.title,
        description: post.description,
        date: post.date,
        author: "Dan Farrelly",
        categories: post.tags,
      };
    })
    .map(feed.item.bind(feed));

  async.map(files, writeFile, (err) => {
    if (err) throw err;
    fs.writeFile("rss.xml", feed.xml({ indent: true }), (err) => {
      console.log("Done");
    });
  });
});
