/* eslint-env node */
'use strict';
const path = require('path');

module.exports = {
  name: 'ember-nrg-ui',

  blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },

  included: function(app) {
    this._super.included.apply(this, arguments);

    const jsSource = 'node_modules/semantic-ui-calendar/dist';
    app.import({
      development: path.join(jsSource, 'calendar.js'),
      production: path.join(jsSource, 'calendar.min.js')
    });
  },

  setupPreprocessorRegistry(type, registry) {
    if (type === 'parent') {
      const MarkdownTemplateCompiler = require('./lib/preprocessors/markdown-template-compiler');
      const plugin = new MarkdownTemplateCompiler();
      registry.instantiatedPlugins.push(plugin);
      registry.registeredForType('template').unshift(plugin);
    }
  },
};
