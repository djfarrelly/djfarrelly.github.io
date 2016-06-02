import fs from 'fs';
import path from 'path';
import async from 'async';
import mkdirp from 'mkdirp';
import marked from 'marked';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Home from './components/Home';
import Post from './components/Post';

import postConfig from './posts.json';

const postFiles = postConfig.map((p) => `./posts/${p.slug}.md`);

const readFile = (file, callback) => fs.readFile(file, 'utf8', callback)
const prependDoctype = (html) => `<!DOCTYPE html>${html}`;
const writeFile = (info, callback) => {
  const filepath = info.slug ? `blog/${info.slug}/index.html` : `index.html`;
  const dir = path.dirname(filepath);
  if (dir === '.') {
    fs.writeFile(filepath, prependDoctype(info.html), callback);  
  } else {
    mkdirp(dir, (err) => fs.writeFile(filepath, prependDoctype(info.html), callback));
  }
}

async.map(postFiles, readFile, (err, postMarkdown) => {

  const posts = postConfig.map((post, idx) => {
    const html = marked(postMarkdown[idx]);
    post.snippet = html;
    const props = Object.assign({ html: html }, post);
    post.html = renderToString(React.createElement(Post, props));
    return post;
  });

  const homepageHtml = renderToString(React.createElement(Home, { posts }));

  let files = [{ html: homepageHtml }];

  files = files.concat(posts);

  async.map(files, writeFile, (err) => {
    if (err) throw err;
    console.log('Done');
  });

});
