/* eslint-env node */
'use strict';

const stew = require('broccoli-stew');
const processMarkdown = require('../utils/process-markdown');

module.exports = class MarkdownTemplateCompiler {
  constructor() {
    this.name = 'markdown-template-compiler';
    this.ext = ['md', 'markdown'];
  }

  toTree(tree) {
    const compiled = stew.map(tree, `**/*.{${this.ext}}`, (string) =>
      processMarkdown(string)
    );
    return stew.rename(compiled, '.md', '.hbs');
  }
};
