/* eslint-env node */
'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const env = process.env.EMBER_ENV;

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
    'ember-dayjs': {
      plugins: [
        // Case-sensitive
        'customParseFormat',
        'duration',
        'isBetween',
        'isSameOrAfter',
        'isSameOrBefore',
        'localizedFormat',
        'objectSupport',
        'relativeTime',
        'weekday',
      ],
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
