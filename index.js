import fs from 'fs';
import async from 'async';
import marked from 'marked';
import React from 'react';
import { renderToString } from 'react-dom/server';

import Home from './components/Home';

import postConfig from './posts.json';

const postFiles = postConfig.map((p) => `./posts/${p.slug}.md`);

const readFile = (file, callback) => fs.readFile(file, 'utf8', callback)
const prependDoctype = (html) => `<!DOCTYPE html>${html}`;

async.map(postFiles, readFile, (err, postMarkdown) => {

  const postHtml = postMarkdown.map((md) => marked(md));

  const posts = postConfig.map((post, idx) => {
    post.html = postHtml[idx];
    return post;
  })

  const homepageHtml = renderToString(React.createElement(Home, { posts }));

  fs.writeFile('./index.html', prependDoctype(homepageHtml), (err) => {
    if (err) throw err;
    console.log('Done');
  });

});
