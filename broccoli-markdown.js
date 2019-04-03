/* eslint-env node */
'use strict';
const Filter = require('broccoli-filter');
const MarkdownIt = require('markdown-it');

function MarkdownFilter(inputTree, options) {
  this.options = options || {};
  Filter.call(this, inputTree, options);
  this.inputTree = inputTree;
}

MarkdownFilter.prototype = Object.create(Filter.prototype);
MarkdownFilter.prototype.constructor = MarkdownFilter;
MarkdownFilter.prototype.extensions = ['md'];
MarkdownFilter.prototype.targetExtension = 'html';

MarkdownFilter.prototype.processString = function(markdown) {
  const markdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
  });
  return markdownIt.render(markdown);
};

module.exports = MarkdownFilter;
