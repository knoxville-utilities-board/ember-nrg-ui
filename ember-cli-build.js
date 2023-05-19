/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const env = process.env.EMBER_ENV;
const addonsToExclude = env === 'production' ? ['ember-freestyle'] : [];

module.exports = function (defaults) {
  const app = new EmberAddon(defaults, {
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
    addons: {
      exclude: addonsToExclude,
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
