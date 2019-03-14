/* eslint-env node */
'use strict';

const marky = require('marky-markdown');

module.exports = function processMarkdown(markdown) {
  const compiledMarkdown = marky(markdown, {
    enableHeadingLinkIcons: false,
  });
  return `<div class="ui segment markdown-body">${compiledMarkdown}</div>`;
};
