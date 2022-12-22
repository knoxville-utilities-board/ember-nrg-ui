/* eslint-env node */
'use strict';
const path = require('path');
const walkSync = require('walk-sync');

module.exports = {
  name: 'ember-nrg-ui',

  included: function (app) {
    this._super.included.apply(this, arguments);

    const cssSource = 'node_modules/fomantic-ui-css';
    app.import({
      development: path.join(cssSource, 'semantic.css'),
      production: path.join(cssSource, 'semantic.min.css'),
    });

    const fontSource = 'node_modules/fomantic-ui-css/themes/default/assets/fonts';
    const fontFiles = walkSync(fontSource, { directories: false });
    const fontOptions = {
      destDir: 'assets/themes/default/assets/fonts',
    };
    for (let font of fontFiles) {
      app.import(path.join(fontSource, font), fontOptions);
    }
  },

  setupPreprocessorRegistry(type, registry) {
    const MarkdownTemplateCompiler = require('./lib/preprocessors/markdown-template-compiler');
    const plugin = new MarkdownTemplateCompiler();
    registry.instantiatedPlugins.push(plugin);
    registry.registeredForType('template').unshift(plugin);
  },
};
