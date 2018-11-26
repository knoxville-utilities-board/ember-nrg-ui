/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const env = process.env.EMBER_ENV;

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, {
    snippetSearchPaths: ['tests', 'app'],
    fingerprint: {
      enabled: env === 'review' || env === 'production',
      prepend: process.env.rootURL || '/',
      exclude: ['images/nrg-logo'],
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
    },
  });

  return app.toTree();
};
