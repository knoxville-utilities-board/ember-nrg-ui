/* eslint-env node */
'use strict';

const MarkdownIt = require('markdown-it');

module.exports = function processMarkdown(markdown) {
  const markdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true
  });
  const compiledMarkdown = markdownIt.render(markdown);
  return `<div class="ui segment markdown-body">${compiledMarkdown}</div>`;
};
