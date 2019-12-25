// https://github.com/ElemeFE/element/blob/dev/build/md-loader/config.js
const Config = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor');
const slugify = require('transliteration').slugify;
const containers = require('./containers');
const overWriteFenceRule = require('./fence');

const toc = require('markdown-it-table-of-contents');

const config = new Config();

config
  .options.html(true).end()

  .plugin('anchor').use(anchorPlugin, [
    {
      level: 2,
      slugify: slugify,
      permalink: false,
      permalinkBefore: true
    }
  ]).end()

  .plugin('toc').use(toc, [
      {
        includeLevel: [1, 2, 3],
        slugify: slugify
      }
    ]).end()

  .plugin('containers').use(containers).end();


const md = config.toMd();
overWriteFenceRule(md);

module.exports = md;