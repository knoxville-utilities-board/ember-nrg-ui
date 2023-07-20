/* eslint-env node */
'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const env = process.env.EMBER_ENV;

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    snippetSearchPaths: ['tests', 'app'],
    snippetRegexes: {
      begin: /{{!\s+BEGIN-SNIPPET\s+(\S+)\s+}}/,
      end: /{{!\s+END-SNIPPET\s+}}/,
    },
    fingerprint: {
      enabled: env === 'review' || env === 'production',
      prepend: process.env.rootURL || '/',
      exclude: ['images/nrg-logo'],
      extensions: ['js', 'css', 'png', 'jpg', 'gif', 'map', 'svg'],
    },
    'ember-cli-babel': {
      includePolyfill: true,
    },
    'ember-prism': {
      components: ['markup', 'handlebars', 'javascript', 'markup-templating'],
    },
  });

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
