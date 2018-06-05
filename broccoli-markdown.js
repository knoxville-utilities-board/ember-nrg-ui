/* eslint-env node */
'use strict';
const Filter = require('broccoli-filter');
const marky = require('marky-markdown');

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
  return marky(markdown, {
    enableHeadingLinkIcons: false,
  });
};

module.exports = MarkdownFilter;
